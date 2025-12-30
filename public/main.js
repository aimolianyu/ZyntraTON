import { Identity } from './lib/identity.bundle.js';
import { generateProof } from './lib/proof.bundle.js';

const API_BASE = '';
const STORAGE_IDENTITY_KEY = 'zyntraton_identity';
const WASM_PATH = '/artifacts/semaphore-20.wasm';
const ZKEY_PATH = '/artifacts/semaphore-20.zkey';
const DEFAULT_MESSAGE_PREFIX = 'zyntraton';

const modalEl = document.getElementById('modal');
const modalTitleEl = document.getElementById('modal-title');
const modalDescEl = document.getElementById('modal-desc');
const postModalEl = document.getElementById('post-modal');
const postModalCloseEl = document.getElementById('post-modal-close');

function toast(msg, type = 'info') {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.toggle('show', true);
  el.style.borderColor = type === 'error' ? 'var(--error)' : 'var(--border)';
  setTimeout(() => el.classList.remove('show'), 2000);
}

const walletStatusEl = document.getElementById('wallet-status');
const tgStatusEl = document.getElementById('tg-status');
const tgUserEl = document.getElementById('tg-user');
const reportsEl = document.getElementById('reports');
const zkOutputEl = document.getElementById('zk-output');
const postOutputEl = document.getElementById('post-output');
let tonConnectUI;

function showModal(title, desc, autoHide = false) {
  if (!modalEl) return;
  modalTitleEl.textContent = title || 'Notice';
  modalDescEl.textContent = desc || '';
  modalEl.classList.remove('hidden');
  if (autoHide) {
    setTimeout(() => hideModal(), 1800);
  }
}

function hideModal() {
  if (!modalEl) return;
  modalEl.classList.add('hidden');
}

async function fetchJson(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

function loadLocalIdentity() {
  try {
    const raw = localStorage.getItem(STORAGE_IDENTITY_KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      return new Identity(obj.secret);
    }
  } catch (_) {
    /* ignore */
  }
  return null;
}

function persistIdentity(identity) {
  try {
    localStorage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify({ secret: identity.secret }));
  } catch (_) {
    /* ignore */
  }
}

async function ensureIdentity() {
  let identity = loadLocalIdentity();
  if (!identity) {
    identity = new Identity();
    persistIdentity(identity);
    toast('Generated local identity');
  }
  return identity;
}

async function loadReports() {
  reportsEl.innerHTML = '<p class="muted">Loading...</p>';
  try {
    const data = await fetchJson('/reports');
    if (!data.items || !data.items.length) {
      reportsEl.innerHTML = '<p class="muted">No posts yet</p>';
      return;
    }
    reportsEl.innerHTML = data.items
      .map(
        (r) => `
        <div class="item">
          <div class="item-head">
            <strong>${r.title}</strong>
            <button class="ghost small" onclick="window.location.href='/post.html?id=${encodeURIComponent(r.id)}'">View</button>
          </div>
          <p class="muted clamp-2">${r.content}</p>
          <p class="muted mono ellipsis">nullifier: ${r.nullifierHash}</p>
          <p class="muted">${new Date(r.createdAt).toLocaleString()}</p>
        </div>`
      )
      .join('');
  } catch (e) {
    reportsEl.innerHTML = `<p class="muted">Load failed: ${e.message}</p>`;
    toast(`Fetch list failed: ${e.message}`, 'error');
  }
}

async function registerCommitment() {
  const input = document.getElementById('commitment-input');
  const v = (input.value || '').trim();
  if (!v) return toast('Please input commitment');
  zkOutputEl.textContent = 'Submitting...';
  try {
    const data = await fetchJson('/identity-commitment', {
      method: 'POST',
      body: JSON.stringify({ commitment: v }),
    });
    zkOutputEl.textContent = JSON.stringify(data, null, 2);
    toast('Registered');
  } catch (e) {
    zkOutputEl.textContent = `Error: ${e.message}`;
    toast(`Register failed: ${e.message}`, 'error');
  }
}

async function fetchMerkleProof() {
  const input = document.getElementById('merkle-input');
  const v = (input.value || '').trim();
  if (!v) return toast('Please input commitment');
  zkOutputEl.textContent = 'Fetching...';
  try {
    const data = await fetchJson(`/merkle-proof?commitment=${encodeURIComponent(v)}`);
    zkOutputEl.textContent = JSON.stringify(data, null, 2);
    toast('Fetched');
  } catch (e) {
    zkOutputEl.textContent = `Error: ${e.message}`;
    toast(`Fetch failed: ${e.message}`, 'error');
  }
}

async function ensureCommitmentRegistered(commitment) {
  await fetchJson('/identity-commitment', {
    method: 'POST',
    body: JSON.stringify({ commitment }),
  });
}

async function getMerkleProof(commitment) {
  const data = await fetchJson(`/merkle-proof?commitment=${encodeURIComponent(commitment)}`);
  if (!data.ok || !data.proof) {
    throw new Error('Failed to get Merkle proof');
  }
  return data.proof;
}

async function autoPost() {
  const title = (document.getElementById('post-title').value || '').trim();
  const content = (document.getElementById('post-content').value || '').trim();
  if (!title || !content) {
    return toast('Title and content are required', 'error');
  }
  postOutputEl.textContent = 'Preparing...';
  showModal('Generating & submitting...', 'Building identity, registering commitment, creating ZK proof and posting');
  try {
    const identity = await ensureIdentity();
    const commitment = identity.commitment.toString();
    // register commitment
    await ensureCommitmentRegistered(commitment);
    // fetch merkle proof
    const merkleProof = await getMerkleProof(commitment);
    // fetch config
    const cfg = await fetchJson('/config');
    const scope = cfg.groupId;
    const merkleTreeDepth = cfg.groupDepth;
    // message uses prefix + title snippet to keep short
    const message = `${DEFAULT_MESSAGE_PREFIX}:${title.slice(0, 32)}`;
    showModal('Generating & submitting...', 'Building identity, registering commitment, creating ZK proof and posting');
    const proof = await generateProof(
      identity,
      {
        root: BigInt(merkleProof.root),
        leaf: BigInt(merkleProof.leaf),
        index: merkleProof.index,
        siblings: merkleProof.siblings.map((s) => BigInt(s)),
      },
      message,
      scope,
      merkleTreeDepth,
      { wasm: WASM_PATH, zkey: ZKEY_PATH },
    );
    const res = await fetchJson('/reports', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        category: 'general',
        proof,
      }),
    });
    postOutputEl.textContent = JSON.stringify(res, null, 2);
    toast('Posted successfully');
    loadReports();
    showModal('Post submitted', 'Your anonymous post has been submitted.', true);
  } catch (e) {
    postOutputEl.textContent = `Error: ${e.message}`;
    toast(`Post failed: ${e.message}`, 'error');
    showModal('Post failed', e.message || 'Unknown error', true);
  }
}

async function verifyTelegram() {
  if (tgUserEl) {
    tgUserEl.textContent = '';
  }
  if (!window.Telegram || !window.Telegram.WebApp) {
    tgStatusEl.textContent = 'Not Telegram environment';
    tgStatusEl.className = 'pill error';
    return;
  }
  const initData = window.Telegram.WebApp.initData || '';
  tgStatusEl.textContent = 'Verifying...';
  tgStatusEl.className = 'pill warning';
  try {
    const data = await fetchJson('/tg/verify', {
      method: 'POST',
      body: JSON.stringify({ initData }),
    });
    tgStatusEl.textContent = 'Verified';
    tgStatusEl.className = 'pill success';
    if (tgUserEl) tgUserEl.textContent = '';
    toast('Telegram verified');
  } catch (e) {
    tgStatusEl.textContent = 'Verify failed';
    tgStatusEl.className = 'pill error';
    toast(`Telegram verify failed: ${e.message}`, 'error');
  }
}

function resetIdentity() {
  try {
    localStorage.removeItem(STORAGE_IDENTITY_KEY);
    toast('Identity reset. Next post will generate a new one');
    showModal('Identity reset', 'Next post will generate a new local identity. Click close to continue.', false);
  } catch (e) {
    toast('Reset failed', 'error');
  }
}

function initTonConnect() {
  tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
    buttonRootId: 'ton-connect-btn',
  });

  const setStatus = (connected, wallet) => {
    if (connected) {
      walletStatusEl.textContent = `Connected: ${wallet.device.appName}`;
      walletStatusEl.className = 'pill success';
    } else {
      walletStatusEl.textContent = 'Not connected';
      walletStatusEl.className = 'pill warning';
    }
  };

  tonConnectUI.onStatusChange((wallet) => {
    setStatus(!!wallet, wallet || {});
  });

  tonConnectUI.connectionRestored.then((wallet) => {
    setStatus(!!wallet, wallet || {});
  });
}

async function openTonConnect() {
  if (!tonConnectUI) {
    try {
      initTonConnect();
      // give TonConnect a tick to mount
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (e) {
      toast('TonConnect init failed', 'error');
      return;
    }
  }
  if (!tonConnectUI) {
    toast('TonConnect not ready', 'error');
    return;
  }
  try {
    await tonConnectUI.connectWallet();
  } catch (e) {
    toast(`Connect failed: ${e.message || e}`, 'error');
  }
}

async function disconnectTonConnect() {
  if (!tonConnectUI) return;
  await tonConnectUI.disconnect();
}

function bindEvents() {
  const refreshBtn = document.getElementById('refresh-reports');
  if (refreshBtn) refreshBtn.addEventListener('click', loadReports);
  const postBtn = document.getElementById('post-submit');
  if (postBtn) postBtn.addEventListener('click', autoPost);
  const resetBtn = document.getElementById('reset-identity');
  if (resetBtn) resetBtn.addEventListener('click', resetIdentity);
  const tgBtn = document.getElementById('tg-verify-btn');
  if (tgBtn) tgBtn.addEventListener('click', verifyTelegram);
  const tonOpenTop = document.getElementById('ton-connect-open-top');
  if (tonOpenTop) tonOpenTop.addEventListener('click', openTonConnect);
  const walletStatus = document.getElementById('wallet-status');
  if (walletStatus) walletStatus.addEventListener('click', openTonConnect);
  const openPostModalBtn = document.getElementById('open-post-modal');
  if (openPostModalBtn) openPostModalBtn.addEventListener('click', () => {
    if (postModalEl) postModalEl.classList.remove('hidden');
  });
  if (postModalCloseEl) {
    postModalCloseEl.addEventListener('click', () => {
      if (postModalEl) postModalEl.classList.add('hidden');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  loadReports();
  verifyTelegram();
  initTonConnect();
  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => hideModal());
  }
});
