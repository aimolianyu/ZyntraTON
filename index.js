require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { Group } = require('@semaphore-protocol/group');
const { verifyProof } = require('@semaphore-protocol/proof');

const app = express();
const PORT = parseInt(process.env.PORT || '4001', 10);
const GROUP_DEPTH = parseInt(process.env.GROUP_DEPTH || '20', 10);
const GROUP_ID = BigInt(process.env.GROUP_ID || '1234');
const DATA_PATH = path.join(__dirname, 'data.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TG_INITDATA_MAX_AGE = parseInt(process.env.TG_INITDATA_MAX_AGE || '86400', 10); // 默认 24h

function resolveArtifactPath(envKey, candidates) {
    if (process.env[envKey]) {
        return process.env[envKey];
    }
    for (const rel of candidates) {
        const p = path.join(__dirname, 'artifacts', rel);
        if (fs.existsSync(p)) {
            return p;
        }
    }
    return path.join(__dirname, 'artifacts', candidates[0]);
}

const ZKEY_PATH = resolveArtifactPath('ZKEY_PATH', ['semaphore20.zkey', 'semaphore.zkey']);
const VKEY_PATH = resolveArtifactPath('VKEY_PATH', ['verification_key.json', 'verification-keys.json']);

app.use(cors());
app.use(express.json({ limit: '256kb' }));
app.use('/artifacts', express.static(path.join(__dirname, 'artifacts')));
if (fs.existsSync(PUBLIC_DIR)) {
    app.use(express.static(PUBLIC_DIR));
}

function loadJson(filePath, fallback) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (e) {
        console.error('loadJson error', e);
    }
    return fallback;
}

function saveJson(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error('saveJson error', e);
    }
}

// 初始化数据
const persisted = loadJson(DATA_PATH, { commitments: [], reports: [] });
let reports = Array.isArray(persisted.reports) ? persisted.reports : [];
let commitments = Array.isArray(persisted.commitments) ? persisted.commitments : [];

// 初始化 Group
const group = new Group(commitments.map((c) => BigInt(c)));

// 注意：@semaphore-protocol/proof@4.x 的 verifyProof 内置了 verification key，
// 后端只需要校验 root/scope/nullifier 等业务约束。

if (!fs.existsSync(ZKEY_PATH)) {
    console.error('未找到 zkey 文件（前端生成证明时需要），请确认路径:', ZKEY_PATH);
}

if (!fs.existsSync(VKEY_PATH)) {
    console.error('未找到 verification_key 文件（可选/兼容保留），请确认路径:', VKEY_PATH);
}

function persistState() {
    saveJson(DATA_PATH, {
        commitments,
        reports,
    });
}

function generateAnonId() {
    return crypto.randomUUID();
}

function validateTelegramInitData(initDataRaw) {
    if (!TELEGRAM_BOT_TOKEN || !initDataRaw) {
        return { ok: false, error: 'bot token 未配置或 initData 缺失' };
    }
    try {
        const debugMode = process.env.DEBUG_TG === '1';
        const params = new URLSearchParams(initDataRaw);
        const hash = params.get('hash');
        if (!hash) {
            return { ok: false, error: 'hash 缺失' };
        }
        params.delete('hash');
        const pairs = [];
        for (const [key, value] of params.entries()) {
            pairs.push(`${key}=${value}`);
        }
        pairs.sort();
        const dataCheckString = pairs.join('\n');
        const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
        const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
        const debugData = {
            tokenHead: TELEGRAM_BOT_TOKEN.slice(0, 8),
            dataCheckString,
            hashHead: hash.slice(0, 16),
            hmacHead: hmac.slice(0, 16),
        };
        if (debugMode) {
            console.log('[tg-debug] token head', TELEGRAM_BOT_TOKEN.slice(0, 8));
            console.log('[tg-debug] dataCheckString', dataCheckString);
            console.log('[tg-debug] hash from client', hash.slice(0, 16));
            console.log('[tg-debug] hmac calculated', hmac.slice(0, 16));
        }
        const ok = hmac === hash;
        if (!ok) {
            return { ok: false, error: 'hash 校验失败', debug: debugMode ? debugData : undefined };
        }
        const authDate = Number(params.get('auth_date') || 0);
        if (Number.isFinite(authDate)) {
            const now = Math.floor(Date.now() / 1000);
            if (now - authDate > TG_INITDATA_MAX_AGE) {
                return { ok: false, error: 'initData 已过期' };
            }
        }
        let user;
        try {
            user = JSON.parse(params.get('user') || '{}');
        } catch {
            user = {};
        }
        return { ok: true, user, debug: debugMode ? debugData : undefined };
    } catch (e) {
        console.error('validateTelegramInitData error', e);
        return { ok: false, error: '校验异常' };
    }
}

app.get('/health', (_req, res) => {
    res.json({
        ok: true,
        service: 'anon-wall',
        ts: Date.now(),
        groupDepth: GROUP_DEPTH,
        commitments: commitments.length,
    });
});

app.get('/config', (_req, res) => {
    res.json({
        ok: true,
        groupId: GROUP_ID.toString(),
        groupDepth: GROUP_DEPTH,
        root: group.root.toString(),
        allowScopePrefix: String(process.env.ALLOW_SCOPE_PREFIX || '') === '1',
        telegram: {
            enabled: Boolean(TELEGRAM_BOT_TOKEN),
            initDataMaxAge: TG_INITDATA_MAX_AGE,
        },
    });
});

// 注册身份 commitment（只存 commitment，不含身份秘密）
app.post('/identity-commitment', (req, res) => {
    const commitment = req.body && req.body.commitment;
    if (!commitment) {
        return res.status(400).json({ ok: false, error: 'commitment 缺失' });
    }
    let commitmentBigInt;
    try {
        commitmentBigInt = BigInt(commitment);
    } catch (e) {
        return res.status(400).json({ ok: false, error: 'commitment 非法' });
    }

    if (commitments.find((c) => BigInt(c) === commitmentBigInt)) {
        return res.json({ ok: true, message: '已注册过' });
    }

    group.addMember(commitmentBigInt);
    commitments.push(commitmentBigInt.toString());
    persistState();
    return res.json({ ok: true, message: '注册成功', root: group.root.toString() });
});

// 获取群根
app.get('/group-root', (_req, res) => {
    res.json({ ok: true, root: group.root.toString() });
});

app.get('/merkle-proof', (req, res) => {
    const commitment = (req.query && req.query.commitment ? String(req.query.commitment) : '').trim();
    if (!commitment) {
        return res.status(400).json({ ok: false, error: 'commitment 缺失' });
    }
    let c;
    try {
        c = BigInt(commitment);
    } catch (e) {
        return res.status(400).json({ ok: false, error: 'commitment 非法' });
    }

    const idx = group.indexOf(c);
    if (idx < 0) {
        return res.status(404).json({ ok: false, error: 'commitment 未注册' });
    }

    const proof = group.generateMerkleProof(idx);
    return res.json({
        ok: true,
        proof: {
            root: proof.root.toString(),
            leaf: proof.leaf ? proof.leaf.toString() : c.toString(),
            index: proof.index,
            siblings: (proof.siblings || []).map((x) => BigInt(x).toString()),
        },
    });
});

app.get('/reports', (_req, res) => {
    res.json({ ok: true, items: reports });
});

app.get('/reports/:id', (req, res) => {
    const { id } = req.params || {};
    const item = reports.find((r) => r.id === id);
    if (!item) {
        return res.status(404).json({ ok: false, error: 'Not found' });
    }
    return res.json({ ok: true, item });
});

app.post('/reports', async (req, res) => {
    const content = (req.body && req.body.content || '').trim();
    const proof = req.body && req.body.proof;
    const category = (req.body && req.body.category || 'other').trim();
    const title = (req.body && req.body.title || '').trim();

    if (!content || !title) {
        return res.status(400).json({ ok: false, error: '标题和内容不能为空' });
    }
    if (!proof) {
        return res.status(400).json({ ok: false, error: '缺少 ZK 证明' });
    }

    try {
        // @semaphore-protocol/proof@4.x proof 格式：
        // { merkleTreeDepth, merkleTreeRoot, nullifier, message, scope, points }
        const merkleTreeDepth = Number(proof.merkleTreeDepth);
        const merkleTreeRoot = String(proof.merkleTreeRoot);
        const nullifier = String(proof.nullifier);
        const scope = String(proof.scope);

        if (!Number.isFinite(merkleTreeDepth) || merkleTreeDepth !== GROUP_DEPTH) {
            return res.status(400).json({ ok: false, error: 'merkleTreeDepth 不匹配' });
        }

        // root 必须与当前服务端 group.root 一致
        if (BigInt(merkleTreeRoot) !== BigInt(group.root)) {
            return res.status(400).json({ ok: false, error: '组根不匹配，请刷新身份/重试' });
        }

        // scope 作为 externalNullifier：默认固定为 GROUP_ID。
        // 测试模式允许使用 "{GROUP_ID}:{...}" 前缀，便于同一身份多次发布（会降低防刷能力）。
        const baseScope = GROUP_ID.toString();
        const allowScopePrefix = String(process.env.ALLOW_SCOPE_PREFIX || '') === '1';
        // 允许测试模式前缀：以 baseScope 开头即可（兼容带冒号或直接拼接数字）
        const scopeOk = scope === baseScope || (allowScopePrefix && scope.startsWith(baseScope));
        if (!scopeOk) {
            console.warn('scope mismatch', { scope, baseScope, allowScopePrefix });
            return res.status(400).json({ ok: false, error: `scope 不匹配 (allowScopePrefix=${allowScopePrefix}, scope=${scope})` });
        }

        // 防重：nullifier 已用过则拒绝
        if (reports.some((r) => r.nullifierHash === nullifier)) {
            return res.status(429).json({ ok: false, error: '重复提交（nullifier 已存在）' });
        }

        const isValid = await verifyProof(proof);

        if (!isValid) {
            return res.status(400).json({ ok: false, error: 'ZK 证明校验失败' });
        }

        const item = {
            id: generateAnonId(),
            anonId: generateAnonId(),
            title,
            content,
            createdAt: new Date().toISOString(),
            nullifierHash: nullifier,
            category,
        };
        reports.unshift(item);
        persistState();

        return res.json({ ok: true, item });
    } catch (e) {
        console.error('verify proof error', e);
        return res.status(500).json({ ok: false, error: e && e.message ? e.message : '服务器错误' });
    }
});

app.post('/tg/verify', (req, res) => {
    const initData = req.body && req.body.initData;
    const result = validateTelegramInitData(initData);
    if (!result.ok) {
        return res.status(400).json(result);
    }
    return res.json({ ok: true, user: result.user || null });
});

app.listen(PORT, () => {
    console.log(`anon-wall service listening on :${PORT}`);
});
