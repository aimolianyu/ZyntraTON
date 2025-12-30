var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d2 = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d2;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d2, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d2, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d2 = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d2, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d2, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d2] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer11;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer11.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer11.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer11.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer11.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer11.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer11.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer11.prototype);
      return buf;
    }
    function Buffer11(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer11.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer11.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer11.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer11.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer11.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer11, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer11.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer11.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer11.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer11.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer11.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer11.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer11.alloc(+length);
    }
    Buffer11.isBuffer = function isBuffer4(b) {
      return b != null && b._isBuffer === true && b !== Buffer11.prototype;
    };
    Buffer11.compare = function compare(a2, b) {
      if (isInstance(a2, Uint8Array)) a2 = Buffer11.from(a2, a2.offset, a2.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer11.from(b, b.offset, b.byteLength);
      if (!Buffer11.isBuffer(a2) || !Buffer11.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a2 === b) return 0;
      let x = a2.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a2[i] !== b[i]) {
          x = a2[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer11.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer11.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer11.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer11.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer11.isBuffer(buf)) buf = Buffer11.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer11.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer11.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer11.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer11.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer11.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer11.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer11.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer11.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer11.prototype.toLocaleString = Buffer11.prototype.toString;
    Buffer11.prototype.equals = function equals(b) {
      if (!Buffer11.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer11.compare(this, b) === 0;
    };
    Buffer11.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer11.prototype[customInspectSymbol] = Buffer11.prototype.inspect;
    }
    Buffer11.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer11.from(target, target.offset, target.byteLength);
      }
      if (!Buffer11.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer11.from(val, encoding);
      }
      if (Buffer11.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer11.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer11.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer11.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer11.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer11.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer11.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer11.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer11.prototype.readUintLE = Buffer11.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul2 = 1;
      let i = 0;
      while (++i < byteLength2 && (mul2 *= 256)) {
        val += this[offset + i] * mul2;
      }
      return val;
    };
    Buffer11.prototype.readUintBE = Buffer11.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul2 = 1;
      while (byteLength2 > 0 && (mul2 *= 256)) {
        val += this[offset + --byteLength2] * mul2;
      }
      return val;
    };
    Buffer11.prototype.readUint8 = Buffer11.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer11.prototype.readUint16LE = Buffer11.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer11.prototype.readUint16BE = Buffer11.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer11.prototype.readUint32LE = Buffer11.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer11.prototype.readUint32BE = Buffer11.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer11.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer11.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer11.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul2 = 1;
      let i = 0;
      while (++i < byteLength2 && (mul2 *= 256)) {
        val += this[offset + i] * mul2;
      }
      mul2 *= 128;
      if (val >= mul2) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer11.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul2 = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul2 *= 256)) {
        val += this[offset + --i] * mul2;
      }
      mul2 *= 128;
      if (val >= mul2) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer11.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer11.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer11.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer11.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer11.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer11.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer11.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer11.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer11.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer11.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer11.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer11.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer11.prototype.writeUintLE = Buffer11.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul2 = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul2 *= 256)) {
        this[offset + i] = value / mul2 & 255;
      }
      return offset + byteLength2;
    };
    Buffer11.prototype.writeUintBE = Buffer11.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul2 = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul2 *= 256)) {
        this[offset + i] = value / mul2 & 255;
      }
      return offset + byteLength2;
    };
    Buffer11.prototype.writeUint8 = Buffer11.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer11.prototype.writeUint16LE = Buffer11.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer11.prototype.writeUint16BE = Buffer11.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer11.prototype.writeUint32LE = Buffer11.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer11.prototype.writeUint32BE = Buffer11.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer11.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer11.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer11.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul2 = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul2 *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul2 >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer11.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul2 = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul2 *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul2 >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer11.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer11.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer11.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer11.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer11.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer11.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer11.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer11.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer11.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer11.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer11.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer11.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer11.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer11.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer11.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer11.isBuffer(val) ? val : Buffer11.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/poseidon-lite/poseidon/index.js
var require_poseidon = __commonJS({
  "node_modules/poseidon-lite/poseidon/index.js"(exports, module) {
    "use strict";
    var F = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");
    var N_ROUNDS_F = 8;
    var N_ROUNDS_P = [56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68];
    var pow5 = (v) => {
      let o = v * v;
      return v * o * o % F;
    };
    function mix(state, M) {
      const out = [];
      for (let x = 0; x < state.length; x++) {
        let o = 0n;
        for (let y = 0; y < state.length; y++) {
          o = o + M[x][y] * state[y];
        }
        out.push(o % F);
      }
      return out;
    }
    function poseidon(_inputs, opt, nOuts = 1) {
      const inputs = _inputs.map((i) => BigInt(i));
      if (inputs.length <= 0) {
        throw new Error("poseidon-lite: Not enough inputs");
      }
      if (inputs.length > N_ROUNDS_P.length) {
        throw new Error("poseidon-lite: Too many inputs");
      }
      const t = inputs.length + 1;
      const nRoundsF = N_ROUNDS_F;
      const nRoundsP = N_ROUNDS_P[t - 2];
      const {
        C,
        M
      } = opt;
      if (M.length !== t) {
        throw new Error(`poseidon-lite: Incorrect M length, expected ${t} got ${M.length}`);
      }
      let state = [0n, ...inputs];
      for (let x = 0; x < nRoundsF + nRoundsP; x++) {
        for (let y = 0; y < state.length; y++) {
          state[y] = state[y] + C[x * t + y];
          if (x < nRoundsF / 2 || x >= nRoundsF / 2 + nRoundsP) state[y] = pow5(state[y]);
          else if (y === 0) state[y] = pow5(state[y]);
        }
        state = mix(state, M);
      }
      if (typeof nOuts !== "number") throw new Error(`poseidon-lite: expected nOuts to be number got ${typeof nOuts}`);
      if (nOuts === 1) {
        return state[0];
      } else if (nOuts <= state.length) {
        return state.slice(0, nOuts);
      } else {
        throw new Error(`poseidon-lite: Invalid number of outputs requested ${nOuts}, max ${state.length}`);
      }
    }
    module.exports = poseidon;
  }
});

// node_modules/poseidon-lite/poseidon/unstringify.js
var require_unstringify = __commonJS({
  "node_modules/poseidon-lite/poseidon/unstringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = unstringifyBigInts;
    function unstringifyBigInts(o) {
      if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
      } else if (typeof o == "object") {
        const res = {};
        for (const [key, val] of Object.entries(o)) {
          res[key] = unstringifyBigInts(val);
        }
        return res;
      }
      const byteArray = Uint8Array.from(atob(o), (c) => c.charCodeAt(0));
      const hex = [...byteArray].map((x) => x.toString(16).padStart(2, "0")).join("");
      return BigInt(`0x${hex}`);
    }
  }
});

// node_modules/poseidon-lite/constants/5.js
var require__ = __commonJS({
  "node_modules/poseidon-lite/constants/5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      C: ["FEhhRZjgD5jnrn3qRfvYO9loZT74OQzeLoa3Bq1AxlE=", "CreykTiOXJ5DwNwfWR+4Ps22UCLhtwr0O4p7QMHf98M=", "K3y7IXiW9SyajAiOZUryHoTN51SjzvWxXE1UZmEtat8=", "K8aw3b4dcBtlcEKL3Byhvw2ln/O7u5X8K8ccDG5nplw=", "EjpVoxmAOE89ILLOy8RO1gw4wR99IOknHvq5qQXu/Tw=", "A3UBzIydyBkwmnafTfCY5YiwGFi8jrfieeKIO+n7jFM=", "HCEW5H4DqGuxFpWwpfbatrmkYLHrlRqwHCWeyj/UfVE=", "LBghNIkDLoWpyMuOmmWDm/rtE+V7wPrknb2uv1T1b5M=", "Luj+09TSxxoEKer9jl2xcY8p4iJ5hf3yrYcDyDW54DE=", "KMZNj17XqsAEySAp2em/kbqUNtHM6UuTFtERxwoMFxQ=", "GKAdn/t0euDePoPHB/iyT2gshPFav1cbNCVKA0eGZeA=", "HCHZK+8ZfnOyNOR3e2DbFOZCpWzucVFdVOGscc3nK9M=", "CtQEzLyx4ZWJfLYMgJgeu51mpmd9u+2ti2RV/mLYB7E=", "Cptt6DMGT5O2rbma9sAFlFy2VMt70UyLl6+LYMwfs4c=", "ExKeP5MK7W1HaQMx/wncUWDvpY3c4sPmGA1FvsOqOm8=", "DXphTImRUIqxzkiVgTuxyC8Yv3v8nigMzKGAeYOTh/E=", "BTL37DbjAEGwSGmGh1yROkm93y9a9f6+jDHy9AlP/qU=", "BrvLjo4YAgEpPnEvSVDxsLvugIydZCY8hNnYrhVcuJI=", "D1WKTbGjrAf2Hi5r7pR/c1hr9A8hHOtPaHylZ4qdyzM=", "K+FApgtbXy+O3XioGKlpsgxkPkGbzwtXfCSg0Oes/pg=", "HEnEuanwn3ua1fdOusxxBRK46Ge6zifLDeoG6JuW9jE=", "FwwacychsSzefzPkdqOaGqd6gcBuLqxQOEewDVl2Uts=", "GcJ9DlL2XKNPTjGgaOSTMca/w52SQfnUwwIEFhXPJ/E=", "LxvcUlT5Igwacx/FJ2lk2rJrOF+kC2sEvtmWDiVDugg=", "BbQtL7zL9NOdK+kznKvp0Nxtkh6FXNkRVLY50o1KHPA=", "EiAEBxWkGtWfT0EODAWkLF/TKsUv6dBviBiNcfYeCTU=", "JflSZSYVW4OUZgn3u5UH3Ukl74cd7pFtkUTrtOzhNDw=", "AXv+QoQpmud0C20OIElR4xSopdBFJBkUeXipWzR0JEQ=", "Kl1HZAIcpx14qWdMtnCPFYjSzq81eMQRHPizWe7wic8=", "F/Atq3RfvjwIEyH+XO+EXnuNBwslFNKbKnt9icwIFdo=", "GdpiYm23GZtl9K3PV/pKPbqhdkp70VVwjubzeMie8BM=", "D4jilfou2BtCbJH6aTZqc+33Xzm/GGNM0mbsQDiCngU=", "H+McVUhUbHlI/k7hvXQS4ygO/30gywmqhfSfJ2YUgBc=", "EP3BYTvb9n84vd5WGy+R5MxItZ+Y1kNjj9wK+tv+Em4=", "HyYYwuvpV0UIucUvAADjPr/drRoD/da8pu9/AJMSe+8=", "Ep/n/D76xqirI9um2IbzlNoR9ZU8+Y4oJpoNuip0XdM=", "Fa/UzfHk+CDBYx1KuFykujuvz+5yvq3p+uYFIxAkSOM=", "Hyx0ulw2fjcNco5x4VsmiFGnu4tFUoy3NJVgeayZsBI=", "ETDhhy128vk2nPWble35zhnwH6icnDaybgne9nhtrTw=", "E1I9Fz9+a623O2P8HJu9vuJCxhvGhlZJMydTOlwbHco=", "FNpA0K9CemXxhBta3JZThlM2j3JUy1Zn3a27rXpXTNQ=", "AJH5ZADkKX6oW7GGwXswToJjjlf9Yx/2MVl24aXdi4Y=", "MDMpv5AxxVFbmjTUmmS7agJnvHtUoN7KXEUCd6ACzcs=", "FO1H5VwdocLwXTwaGy5sGFCfyDNuz+nbc3kW4oP6ghs=", "EWHxCzV3ddgQrVO8xKINWt0rAyUcdH3rBO6UxWXljWs=", "F6ilCucs5wfyK8Bw65koUcqRTrlMxo6vu4qWpxTrgiE=", "Gmxh15Xbr2L5klCzfsXfiGRaHBU3kdtjErky3CUOT2I=", "H4vSq4qoQGZMTu4ZjEaE3EsFdyuyoIadpnIrFfRHoTM=", "H/y4UqTwAnqXmfExzXS5jM+4y8BjSdj+/MYvEMj7Pi8=", "A150LsUvGbNtSJxyD0Z/+td81TvC213dskayMCH3nxg=", "Hfqu5BvflNeDqin8Yrfse1VnOqgY0wX9QtF1oF8uPYY=", "KCE3hHegLplQBaVjUIhUCUW9Mz8tFFXwOKIZuMR5azo=", "HbSk0PI4pXCxBhxu7IHALzH/3Up8GedjF08jjQSJdCE=", "FL94iUV7ILehNns0o6U4IX1pO1JCav9ApLtyiTsXhMo=", "LO1Swr8pb4fldBDD7JqUg6eW0WT2BJEnEJ/w06nAhGU=", "Hd6sWAWn9K2k0EQe0QjjFJ1M5lhPSa5b39RtZ2buozQ=", "Lja05enJe0YjBOjitfnciOHJ8hYboEBnP5ERI/BCrnA=", "DGhA0csGZtxZ6JsYZSddihZLRHxe1kNHyu5jUCwjjV4=", "E34uPonnHUYfTJvD6PEhgyYqTR21XFibLK6qwBI49Yw=", "JQky57CtzyyE7Uv7YKNra4LlWqlHURV7HUV5Swgciq0=", "FwpykvVjTAbdO/CatcnE7NSwDVzi81+XK0VVOR8WtC0=", "DWjLvnconnjVy/UdcPG3W6IV30570BSdELLFDypPO4E=", "DK90VjuQUl9kWm0gNuzRMG+h3GgLSdnOTtJMl0mXMXg=", "IKfRwKJ/zOeP/jcvTFgwaxZvlFbtRs3rJV45W30w1Co=", "BiPzImtUcLJ4m4pTBA5ERDOF6Wuc+gvk01AVFYpGhGU=", "FjIwhojCXnkPV9aKU1AkEkKlYwU0feSlAJzka4zcuR8=", "LeR5Om+ZzRTj9mQiEfTQt7z6NhWXxUT/y1pWfpB29H8=", "HU0G0Z6hsJyteQhtUb3hFyWlVPqZVZyi8J87tz1yjGY=", "BIDnR5pmp82ephyLKJdDiZCDUKvEqvwYzXXjPdEwwUQ=", "MEMLAzaOvKqRJGlgSQvPkX14aBRj4ufXRL+0QzXawk0=", "C1ezcyASfUxQ8mkSSw29yysfE1IkGl0SEDKD4InAx0I=", "LPSJBlDSckDhlfYKT2mO2iSbjdYUsjN2tQF40t9tK48=", "HiIcVSaJi/0S3oaFGg2XA3UaLyOQCKtfm307aRHGQYQ=", "KOB0ha19mS7RpY8ynKEq3OTsaT6927KVLlTTOfLuvaU=", "L0TWT4TeFtxnvV6tUe+x3IOByEUgwShU3V7zoHms1OA=", "BQp2vDLr0d/ivjMPME7ces5xZ6t7oVFvQCHGLPDU+sI=", "L1jEXl1lmmfXgTZyQfbDXYy0Y2HZeyiUfSlCHCcFlKk=", "JejamuDkLoQOBLIwNw54K9tnU0hEMlujb8fl4WDGanQ=", "L+xzTaIP4yAD6gTxJ/hEck84o2i6EMKVRCUr55YED38=", "KIpnePOoOYio7Rcn8V6TtMsU9OOju7kd1tH6yv/9Xu8=", "INzGx1/Yklm+f0BnULPbZ5olqM0nFdJFuRdTkKySLIQ=", "F/QroQlC3yXLilQXgqGLb9Mc+WXREXjHsErEW03qXdM=", "Ao7rhdEVqQQCDgxhSO7GYD6c7avGZKvudkqv1FWYa6U=", "Cx187POnmyrT+imPbOp66V2AwCmezJGOn4ycPTjVnUA=", "BEAznJdkzsecFu/bg0omJh244/Es4c9yLSPA4R/0zwc=", "BspkfClyfBlioAIXfaLVBPSwel9+tXx5uI5reru9rVw=", "LqEgqGT1xAk90ali6PATx7jvd4sE0rpb/DyrKGGbqeM=", "K7c3VGxK7nwMwrqHwRV+KnfEeev7Xcdq27Oc+Gl2M/0=", "DjDaZJBiXTPnnNUBdvVo+aLCjC9EmivVGiXRVoaAOpM=", "DffKcnihNlC5GdhUl7LrsPcQNafCBDDUEx2QOrf1dSE=", "J8xYn1v1hXlKus5Yn7inSi94TAmQuA/KppRAl/hw4tU=", "IlXDajjIc13kXO30Uq+oQjMtMwQveOYMQ8dFVCGzJb8=", "Ez2WAr0zeNafaBwnsFvf/Ji32GzKY9c6YMrtSFeE0Ic=", "DhVI6UKunT4mhgaZuTcnyBeplIYWyT70rM2YGx3D14o=", "DyDw5V2TaJ/gnsMS9q9HYnSC5L3goWAqjiyNboTopq4=", "LlIyhIPLW3/y605FsS5RsmIyybwXtykpVMCp9r+lG7k=", "ArIWLVM+BZpu2iq7dHEu2zp4YL7qld2KSr/JV2YIBPQ=", "GeCSdxXRzG04lCmUf7Nzfa1zOXTGsuE+Wz1DJRlRbHQ=", "DTqABFfXd4VjYwO4uU8X3P/LRgSIcqyfdO9/J+5XNwU=", "LJdNGVJVehqsX3uuSZZhbaYZtz9EHE5QTcj+nPtVnjI=", "B2a/7u3izPNwjhtP8wcUwiwdQ0zb6PVVFLq8LdXZe+8=", "I9rI6lQIL8Ex4XOuVeRjDNTKfIcbKgpHnB505/GR5iw=", "F9X7bCyzcBDj41irLVdTdocO0zGGuOrkmtO0fjQKjX8=", "F13Kx22KgSYTm1g644hTKQJG5D54P6aQPsgAfxeMACM=", "DE/Qj+3l0iGtt6v1SYmMkeW+foW/H9KmEb8YLMLnFlU=", "J3k0uQnnLTo0dbsex2arejitWbEoMD/FAC8Cplvf5yk=", "Dog0mZjf5wPxsYRST5w5TWAEzKz5y5UolujP2wsHi2g=", "HxsgeLYLD84Hgk4qK8jK6O5nNRSwBwqLRXEMx4y7mUI=", "LrFVlWbFNt28MW9kgtUfo0BVdldwD1uKhG6BKg7TNNE=", "HE29wzXPZ2Q1Ugi0ydJD00VB1iPGad7Cw7oGa76vZ3M=", "I3SmstpvjKuOXP6NgF3Tot/KHot+ul3IV0Ah/RJB47Q=", "Gd00JTPMxgOplzjj+1pWm5TvcbPkn5D7h09hYXMwcvQ=", "IX1m22x/s+/6UIgAWH0us8bQPYOFEy8vzOfzXycFzM8=", "CBX7hZH+AQOM06OziyNvnvynfGGNO/xsKn+okpbH5k8=", "K7lDtAwr1FamwXhTscqI6w/zb1l0sv+aX1CT6b9joW8=", "EaUVP85llRPufLmXSubLpYHjtM0UVwxXCf7D2NP8guk=", "G3K/0HY12FAbLv+HhaJJW650x2U8+Q5tXJ8URCaDbfQ=", "FJAsBwDuyJeuF4uoyvhQ15Px2HUSvqDs6jnPax/uIz0=", "CcE4xuCmFqSf+Q1DprBD87dFt4hlhW3EwaReL9hMs/Q=", "BbWKPc5XsoGicdaYlQUtiHRYpxV4PoMX4CSmGjXsELw=", "K+jSlSXAz91eazEl473jv1WOVfvoZ/AkRXqWdlR00Dc=", "Bh1y948bqdxrTX93hCJdaoG9/Bta1sJDafnAVgUj2a0=", "C/GK78rP+r30ES7drcphRXOLSAOzYUW7lRbbUBoGkuk=", "LnPdEF+osuyTHYzfKexnnjqYAakwcafV6jBlklXwO8Y=", "D4RA72Z8mugTN7pdjJJ6U0fecpaGCyEcrR7L+101mO8=", "AE0wOy3qYnsnMb6D+TrDTn0U0XihOABVjKc5Y5XrEY8=", "I0VBrXIECnDaKZajUmkjDJRpnu8xOk1IBQgAjLw9N8E=", "DRI/HnLSa5K92P1z0UKGwxKtTCOstGsuCMFXEEQJ4XQ=", "L7Ngd28N551wmO56pBI8Be5rBai+Rgp3TzoEjhOFRbs=", "A2hcB5Q04WcnbFfTzHlwO339xBwVbqHot/mbaValUyY=", "Jgrw4P/8yXcsFjGxeTRFZrR6qto2geuQNMb3XDcFwcc=", "KGK0E3T4m2lSdLM7dz8lVJFuK/+f9nJUX8L0lWP2J2c=", "AqmRL+FwMQInGJ6h5pHQNi8Ys4tACw7/GSyllRPrqNU=", "COUTreaUoNisHz6/GpZEDTLHE9UFjhIk4HA0jCgfSm8=", "FApKQx4u55QA7XRll42EdzITxigmT/gPIax6a2c9Cas=", "KWr00BnLXffZWbKdVJw/BxICtOuotT3F7pee0UM3eSc=", "AYMuKEp/TIFhSIK2k5/A8YVXO9ICPj5QV2VHC7gSs0k=", "GoTVame/3T2WWr3NMpqnjU/pNDRJby0QOGH9GdZtcmA=", "BAy4KEd3OSfSrv3AdIkDep0fdjHsp1yfsN2gy5294UM=", "AQ3PCEzCnLfK7PJqpjO85O0rAZ8oh87nsaePidP6vi8=", "B+3CKgkR6iFEJe9UK3dtsjsP5YF4ENQMcsqYqr2a+oM=", "LupKsIrsd18hSEeeo2+7lpNtpYuki9HS06zUgXOqq+c=", "HkDA6CV/5KYQBc3PrRSM9/R9G1z936oIJzhpVRgkXxk=", "I6J4CVg70epR9DbeVEPhCPadRM31HcHwPiGUi0mAuHY=", "LkZSsETb/kDmO2sjL81fPzmr+9IFHuaK3HVAgNSSUKk=", "Eeer227Lr8Ln2M3v6ce5xQR160dds8LK9/fWf0hXdfI=", "GZ1SNQzDDoxzgh+AIJbw5UehNVGye/a4mTlvY6xc+Oc=", "D1ddbuZ8vs2YNFYk4DKjfIWafL7zCz/dyUnNCXhIQQE=", "HEtvmiritBjmJlrLqclrBhhNBwKOX7eE80da53cv8Fc=", "Lctc+Ilt458ijhV8DFWT9GJvubwiUgY4PbIDYKvwySU=", "E0CrufThExhr3CbL30vMpQtTGhB/hjylRFdePPhw+OE=", "I2jmkrcnh8uIcOqIjnFOAG9Z0rRGDPt0xIqMxzsdGls=", "H6ua3ZuqSk9W8jFld1xvLZIqdjKpT5Y3S33IUnVvVLY=", "DH97gjANPGzj+JV7oeSt1UxMAV4g2XZdIgVxwWq4aA8=", "FdY+hr6s2Txgg2iOXZyPPGlHkp+fH5mrV4pMOpIu/wM=", "C+hDrl+bB+UlcheK99ro7QXTaxLAYHhikpNV6nQCPZ4=", "EzJ0nFI2lMtpNeCWOgfoGwWWfOHZUMC3MQWOySp6DJo=", "JUOUCIEOB0wL3UWYuYFf7okruVylECns8Am/+lubloI=", "BX6NGd2ZmpGNopsJQLODup/RXbCw9kmW3/Z/61X5p0I=", "HgFON+mxF887SHDZmfK1XTU00Ka+mOnjV/pD8B5wop0=", "Gk7STm4DrrzWvbEAUz3JZll6/hXIUbS4Y/boiQhMZHk=", "JTQgAHCD8aqGOtR2CQXBA57UERyfBT8ncQRS+DzjapA=", "InahRBlxcJr/5tKpkyAAHsRexyFVxXXd7srA4ydZqwY=", "KJV90SGOp5n9NBHrGTJYU633rorhKB91MwL+fTHfp7A=", "L9klcmq3lMiL11eWqj5/HmaS8pFM+AImfd8B43kCoAg=", "HPilycdqhLFHyCONklPNVbR8DEPYKWbEY2ooZ0cF/Zo=", "A3PLvDBuG6uecHc2hxXmIwtLLi5KHbnGdLjDWaQekQg=", "BgKD0v5/I9/1E9kRCz3GJEi8SPUxzgweq1kgvyMpCkA=", "DatGXW2RB0DzPvbMDq3HG/gRm9/Vo1J9yLv636pAJjw=", "DLp7y8giSyqOSroXl3IwpobNZCHcDKU0bzRGtiQ5xMM=", "HkNl2weQycT0RbBlPEZv8h25bDi0B2uovWi8tN6mkR0=", "G7LbohmamrO8hu9fnef2xcoT1g6rQs7WjemPxkOACo0=", "CtPBhwxtbvQO661SEjzRopE9nWLoC/usroEuCCAh+co=", "AbCYyR57DLtcNFiAd8Dd+VMA3fYUk1YwwM46JickUwg=", "Gf1cDqwU+udZi9TO6jseKZiwwWhJO21yrkG1duVbnD8=", "DUdJ15zBY/FxEKQEpG/kJ8ZDTz/me357TM+mq5W9fhg=", "Hrv+gRSkG7gJ4LMzmSQSMuuUCthyjIpRbUCtpEDb/c8=", "JwTlthM9l2TW0/F9SdgzIj45N/gOufrqu/upuvS0wbg=", "IWXhyAJzBbGuDjI1cWNeXVQNE9cQw/mjkLaRPxTQNeM=", "LjSX5NNf2llsBq+mO8Og8uVdTuukrOtg5lCBrWOqi4o=", "Ax2kNF7s1ttsD3sHx4Fdet0f4FRtc49NeatcV6qEHt8=", "CJ7OVOR6pckI5D5fCHN8FDaWcIkAasqxyc0Z6sSiCHY=", "L1PBXire0zxH9VoHBIPmzH84Ifv4qkBnfQVS7Z0Q2Ec=", "FCqjT0suitDfeiGz45wAyLCqKFcJSAHqr9cr7+0Hf5M=", "F66k2kx7zw11iLAU64tAl53Scl7aTmrOMxmCRnx/8r8=", "DpcMGdGXSNjEZRBNjwIgA2P5pBeG8C8YJ3QrINwNFyc=", "BLytnlU3lWQvWbr3FKa9tDL8RaCgt38aujqYI0dt+bk=", "JCwL+82qdvcV29S6glxx/P7WccGxkB+khMh/gQMV0M4=", "JdsTQ8JBBAcQI/tu002ZCQeDEeHv6FrwoRsZEU+p55A=", "L/5NnEIKWenNx8Masr81GHyhR8uJijlC3rNnd4YDaoA=", "EluwOvPizxi75vW1kOs7+NDRumO+aWSD6Y8oO8fNB6M=", "CBa+QnRbfbtM7/5bjiTqYP2LcZ3rpQA3rHt1lIdFxrw=", "ERFg+az27DYNG2pxIxOg28viPmRCAFVHHS7kxd7bNdQ=", "E3eXjhsfaokl+o57eUG9+PtZq5VCNCQZKD2CA0Nck5E=", "De/B2IghZu88zeU6TyNvuoPThGIZN87lfkIaUT0NM5c=", "L4+lx4xwbjpdSgPyp6OVMEbX6Uy4in7zUOZ7W6Dw3r8=", "GiqVfsCnI9phwhNLqwvxe+sA5tzYRpDCMNy55Y2pSCc=", "HN+HEJlfXgNBK0p/aZUy+f0B8OoWeo38Hd834oBa3e8=", "Jv0xRxgow2rjbCe3SAVLDAxP5SObMBaZ43Ze6+zBiUY=", "B3XZlswsRFbzA6LB+QB2R+Eakh2f6j97kmFDuZ0voL4=", "AW+5M3cIymOM39qRvQ2uprlyJO97IGJnKt3RvRi7iQA=", "LDkvvn0/3kL8pPlHi7Q5MxJYJVNW8YSvb3bxGQVBF9c=", "GHoqO/eaafo+UInvnx/Vb9tHxV7s53qiKKo94bSGvLE=", "AnGoY6KAoyZB/6M1ELLt0njJhjA1lTLz5Qaydf1dIM4=", "FVdFnJx0yUqgDlr2mh4xEvtpU3zol+wMcYlY2WUW8qs=", "Ko4myo1kfZpjiFFuqdz/iQg9U55YFowqUMba4w8QnyE=", "Ict1IZTPQ/O1GULrAEDrqd4rz7HCo/rpeSS3EPJoMs0=", "LCba+Za+JHrNbdSsrWDTi1pHHmMiGI0CwTfny0hDd+w=", "AkAXbuDnmC7r6Spo0+OjjCaCGswPXQWM+ME3vKLSbxs=", "JjbglzyGXBvZdN142qqNCoTNr2vhrUfs8qDRjxFzGPI=", "GehPTyWnmUlgQWYdxdl1toH24GdEzuibe+XZ/eF0SsA=", "Dr+JBko68kfKHzb281cBiOJx4LMmxPsmZk6J4UVMoRA=", "Jcfpe0db4A6LVZo4xFI2T0ycUx/suKxpj3/XPOIucew=", "BETJnlkjU+WuyqMCrdkBwU2MVScKFgr+1EKe9VmK108=", "E424iHgwVl8mk9Dg8C5OeeFEln8LpTsDUZq6dktcmUo=", "JNQPRiEU/p7gKq/PdLT8ok4a42XcdcO1K7E8u7LyHt0=", "IeZdbY7kN2C8pA5zC130xM86inMtsUj0spUbTGHWjow=", "JI3XlmnsCdvwNQoV1sdcapvarO/KFNUTAJePE9GrbRw=", "K4I4wVSPnL4p/TXPkee0jw69p+Y57faf6NWrp5JNU2I=", "JDn9I5JX84GBx7489RPxv3I166lPa4lCqUy93s9vYvc=", "IAlYI1KBphuixL4KoygqGMdLbSYvXefC4z0rs+iT3+w=", "Dh7KXfiO5fYM+n4f5b77txn62CEfqbLQL8wjMZDBfxI=", "JrU0J/mz6ix2nZxmD8YIgaFpwScy0AG3FY7ksbhCyiQ=", "IPOz9Kyv6fivPgZmGzqPd4+igSUiudcKZ0As/42ysbQ=", "IR5dKznWJSCnpifs6MrLrJ+XUG3vTsKGkoumwn1GOxc=", "C7dD7jSAISnFVnMa7Z0wLc0IUxPOVy9iQtE4MuU2tLQ=", "I8smYbSI7nHkx1P/I65L0l2KRAlPZrZTKXfiIUDrpcs=", "A6NaoxI5Ec20U1uu0zWfX2pSBbnJPvMdNTI6R4B7i8k=", "J4A4SKCu2WqT+pQ7ZjXkUCF+E39K3nSmLXkXMicUtpc=", "DLN4OcLJp/95iEy+x19B6b5eR8dtYVOCMb2BYpltb2c=", "HwAm0L8fjh3VQjzC/sH7XNqh7NxMPLIY287vd8ANL5M=", "AqfXu5cLim7S7mb6u7qVa22jsQD1tfuSju9C+XCCc8k=", "DP1/QhXkNMjaF+wyWLC8YFrRqy6QqklDUeTuQLvEkfo=", "GAsRtyBiKhVoSdxvf25/VxZZvmloIjDF7ZrDOXAKfN4=", "BOlqllvOPToKJKSkV8lRWCyHE0nOfu4aq/5XipTGUBE=", "FZMfeCtF9/tlbyzb0fdwXDU6I/4dMKWkahUi7RYN860=", "LiluV8l6Uwms0m/r9VrJY6VETBxfcDrYig17l7ndOLE=", "JhV7zreOhGu7Ji+aHgbUJxveWlvOjwQZlS+X/9E+rKg=", "IZTriYR9aw8Yl/Z18ZwMVrYbEySO/zyjbjT7nRx57kM=", "I1C/NUd2VomRUa193pbqeFfhVQFEcAjatrPSfI/6J08=", "GkhvCuWRys2vCcWKScTReVQFQ1NAgZ4APwRp0RC3dSs=", "G1bc92+yPMSoNNRVpAZeEzVxQCt98wnVm8MQXUKowwE=", "GnSdeWSvC3ICkT7yBMZT8rS/tlzqt7aFIzq1nOO7aSU=", "GK5ZAHP5aWlq92L/pOjw67+X+Mx4fjfN3R8yG+O+rbs=", "IcR7J12C3eZGDV52mplCEUSxxanaWSlK3py7MXED8kk=", "BHPdvVLnN+UnNk6OtjIHl1w41f1swysnIQKwgs0VGPs=", "CxL6yVttOogdiSZXyEJOZFrE5rAFFfkC1ZRXQwKybgI=", "CK52FqJgz2ZX+Pc6woRYjSxfB/9CXYN6p83O9j4+IQM=", "A52vaHYoC4Doc78qMv0oNKg8aXV7rdWKiI74Gekmzig=", "Jeex10cKPHXxPwtWVGyOCfLY7+/wbvdm+ceDyoadEw0=", "Ho/TY0w/92QYTQNDX5hYSxG1sVrrnHUmLaPx6iwqnno=", "JB3MUaw3gIpBXdHjwoHwWv8ReJ3Ayv3XejVITgmT+aQ=", "H/wxU8Vu+XVZMs6ivgVzdJva/hxPoHgaS4tAeM6ddUc=", "F2MNYtmj5RDIik1Dw2D5K8D6ALZgMa3sKb2VQ/06F+4=", "KYBADt0ddOPWnbVFjSzNX6vbI27BaoKkMBoKtZ6kpuk=", "MDT7JDZhI+xtyvytNXJtv7FhlMA23NZI+mlDm/zQDNQ=", "Gqfo9Bicqd/z2yq3ZIvgojkplc5GBB4EaA3KitcjLfA=", "H6GV+DSmnmI3L2DrSX2hZ2RurhQVPYA7OdxdEfXXgAs=", "DyPxx01fv2GVrVpq7l5WmTxUd+hFP1uToNe6/TMwNtM=", "AWVW+sk0inNatQqgiclxUbPKrwogo0+52TcFBaFRVyk=", "I9kreTZIEQ/Fru8GM/DHfKyw27yhh5uKb25d9EXl9ws=", "LkwQ7F5l4vI5u8Q8EwMd8mhqtA/XmjBLBdYRuCPyO3M=", "EkGLv9d7Y61eFoZK2cMv+/xaPdm3jsK3kyn+XgqNKVM=", "HkqKrOFavB1bdqnoSEMdLAanj3K2vrsSk+bFjlGFaW0=", "Dz6WEH3s29aHLCDqCaz5LN8Xo+4dEzFIgJLZYXbet1U=", "ASw3gCB/OVzCHesKvZUWge6jJJjdumzol6j58MI1cGc=", "E+qxtOZyuhscG7kBdpMB8eVlnQPqEMYd4kd/8KwiFCE=", "INxmSrsgt0VsBmKc43oeyxonpOiyTjG0i5xGNaowMj4=", "LGseLP6njiw2eF52qM+xsFfpRx8k9bORF1w97LAeAA8=", "GIySYlX1t689qWNVcpwqhnCrTCxwQASBsqyQN0Dgxas=", "L5kTII4J49bp5vumOE/QdquJ8mYpduPjDghwuzDrVPI=", "KzOAPZCIlwbnFPcgtWKNJvtgtUWh8+nOSaaukSsCQIY=", "JsyrwQ6wQyfLXMPd4quzbwlwhsl+c4wTPJ9XB350iwk=", "GxauDXxUQIy3X9kx8kZ1HysMPcINeegqJTG3bCK01d8=", "EdC7RhvYryhE9J8PhAyU75UYslETRHQtH1Q4/j1BWuQ=", "IzAxhHtHa+rQEY09szjokTPsQg1nPlBK1kclnfZVVx4=", "H4TpeJW+5DjrPJLcmxhGya0pwWQ4ewautu0YQe2MTco=", "J39/m1QvDCu19FvtBU8JYkU2AQw8+UUtInMZMyf4AdY=", "HvyckGnlBouqwT0uZkVkG30n6A/CMHcWFTXERoLuV6k=", "DW7Ed3YeLvusTxSzvz1SV6meZMPyX+EE+vmIsg/l/0Q=", "Dg59fFUBmZt9Fhc7WbfK4fIDvvIa6/ACUYgUOcz5MBM=", "IXvvL08SxtzJHCBYojORy3feU8puRNzcbqPTb+oybqY=", "BXgMiK3wFTG1D4F+P+RER9KbNaqKOJxx6M8SJqzvaLo=", "GHM4h6ays7TJDY5JkBluI0ReR9fqWTnr+4mj7j1ntL0=", "ILrOY6z8rgscnyvuJLjp2oW6WX03sJBXIMTxXbIxsHo=", "Fm6llTdaZ4asUn7p7O1z7Wv1UIdqvK86yStCyAiwDY8=", "MEJiqe/0BArPQ+Mi1vUmdq4vhT7C56gNsAxIjPkXx04=", "ImuscFAWbl9tt4zQsS028wW26MmgVRFK13Ceb1ckW2s=", "JrL1OcVzgp9qypG6qVRQW8XD604d8dY4WCcX+98jiMw=", "BqD79M1S6Tul5MbEr2XbAu6WKX+K0gDy8c/yUudptVE=", "LLnCQRLTU0Gs6siDYPtSiSTli27KwyG5+ynmqjNo/yM=", "IOiKTWB1Jt0H/gijVSpEZpEp64f8wLE6rI/or9kwFSE=", "FURkmivXPjunLzlt+R3WVAHdj69R3jJfuu251TatlPw=", "GYAHdFeZVxLETafhdxMljj+Os1S/2A7Z6vPsuvaWAQU=", "JdHSL/E+dwXTwIX5f8Tk9pFLgv+qXSCR7GTaxCN2Xvc=", "L+yZDvVW7+EDWkZP9VgedAZ0Rc1Uq8r2uMA5n+DSTPw=", "G9lWNQbZVE7z5IMOE1RQEsV5N5wtzBMwQWxK5JvE7GE=", "AK/80XumADxW36hVcfwpc3siWoDUgOfdft7AHxTyMBA=", "I2cNuu+WaIHwf5GaLYgxKMeyPPdnpHeysuB2K8DbwYs=", "H5OlMpFzlMfiL9F6vupjicZv164t2fAvhg9tlpR/Dt0=", "LeQun1N7fWGwITdxwOdPVVUSvge2pQk0c04sW+tAvjc=", "JcVX9FuZeBzTfTuyKTFmKmf3izd4LIhbRWu5bVXohAQ=", "IHTItwlwXJiIU4p/ijxK/2R3Mb0W+OJU+nTqnyvnZiw=", "Jzg1WVYpgTiUnkQhcdak5LdO8gZXQNt8/DoLYP1XOss=", "E9Nq0KTr64GWl3hkllnGXLfQxBzFGYcf23Gp6moMqlY=", "CKLBi6QTgTSMGs+/lhdxaAa0YqFpG8LjQ7ebgIXjdrA=", "BZCS/Dla7ShYB7v1V62aEEH1nAeYIrEIhFeIL+57YSw=", "FhkkFRtaWtLYysEZUiqZGpBvFehTHccFZ/ayg3HMJOM=", "HGjKj3qhdlkHVAXvY0G45popi5pNcvO7hUswnkuoehs=", "J/XQO8ocggf3I5pLLPc65VmhWqN+e93fOqsF7sXOVZI=", "Dsv/SEaWKpddNH6pqPxGX7RoYVV2IvLCVkp+Y5gzwWk=", "J3xN4jY9i1tFbPxaf/jkb/LsjapZhV9a1kvAUh86xWc=", "GxGGLFKs01G3pGR5P0+7V/7Jn4MrYyJvldF1yNL8CLI=", "BqcZxYTHT/vdchjrVly0yL2GyS49+zxz4VJyAapRI04=", "Iw5K3uy3mYd/fOmljINrmdUzWEoZXB13oxOr4cfRJr0=", "ELEJuGSAnEdnoTPM5sutbIhigXO46lHozKhYMMp95SI=", "DiEReXDc+9SxUmslNjbzd1ONO0+q61qLJL9iANFMxZE=", "Jmc0mXhAE2L2sXk57rDmT/VWB+vbNccHHbRrs+e6R3g=", "BQAPpf2lBeApoTv+MEwmew2GxywDm6v20/8C7iRr4C4=", "Jk2eCUrtX0GmAkIiCjSihAiQh7JDapv86BdMyb6MLiA=", "CAdvnEdD3mEw/2Is9AHt0skvJL/hFPPF5ySJF0YxXEc=", "EyNwq927Cx3VfypSDCUza9fO3pS5W79cIVHW2I5kG2Q=", "CP8RFreiJ7/f1EZaZ4kIgrYVyMTBfyjY0klY7fYC3cs=", "K8sLDbi54+ArfpwclGD92cbNmFYjMuZI2KPgq5RZdSA=", "EupozmiBvsrX+KaxF7A6uXb3q9WX+QOwvyMNINIalDo=", "J0OcmKdmiAZ6CXsZtv3X141fiOJ04Nj+peprdAb92n8=", "AvQNCtBfVlLjHvlECtcevIQZ45NJOTfwXwBJnQKpnjY=", "L78EKEMn7k9oDwa9OQ4wnQ0TrMdLnFsUtjBZuMx6v/U=", "G+aG1T4qitV6gosGUUJc/Gl4xwJ+2/JH9rZyPCHfhuc=", "JoO0JehaUI+WhS8UtCIPz+n3rYsXv+/A40jEfKeLtX8=", "FtrOmy6AEuMdscfr5nLYa75hoao+FpPg7d/A3gqd2VE=", "J6Mh+MfTyQIuli9/7y48hItFOdu3WqE58wQw/lRbzts=", "BszXIQ3uHWsOIreeEtGQgtgHi3iNcQB7leendO2GplE=", "CkHdQiIWU3Ur7zUPbXSpF7bLsf12o6EhZvTQvpeOQCY=", "IgoCiB5NR6yU2VDN+DhidNF4LifL0NhFl43uyRKY8WU=", "DiFVpUX+Xzy7Y5dgZYnqwZzZJjkznGsBcpikrTQItLk=", "Dw8ZxikeUVRqJnxgzHdOX7nQiLrFMHgtiR7Br0uEcHM=", "DpJbzRxt20o6HGfsje771AxTwNM+eu7xtGeVrtWUPJ0=", "KtAAsXSKu4Es1uVBEoa5/z7wpb09JZo25F7wW561vus=", "CmWqIy0y7W6N5j0c3/68Lz+mFkZcJ6r5fozT3P9khlI=", "AmPYRwq0scYddNjoliQvTyYdyxZ6OgaSOJPXyyyT1qE=", "KQHZRq3clLBA/VgATZpfjNGSZUDHqGEs7BxYy2DCs6U=", "GInPqCCfSVLfkCLbncWDtXF6BpbaQc7mSTfQzWMh5pM=", "I2Bk1xy2xkyEdHrCX8+NiBUC5fA7/4dWG4WhFrHzmso=", "L/ehdP/Owphi4E9dvcc+vzZhVwAzV2KQwMH2zYztJ64=", "GeckoddCyrEDRV8AQO33RaJpanEITJPjInFUUN1Nb1s=", "A+7TiStvDmxdoQWcXzeTmFg1qig1AKgSmQSpTIfxYb8=", "COK4Jzv6MMGshQMG2R5Gip6NBQkq7ky8gMaHJIRjujA=", "B63Mp22DN3KIOaG2rDs+1Cr7h9cq+Y9S9Bby7FiyjOw=", "Fx7zeJa64rECCgpYOb1ReEzhG7QjfVSMFxFp0y+hm0A=", "IP/fy4b00AUGTtvClpGMMy0y++/xcp3lBWomq7w6Nfo=", "COzXpvFzXu2GuqCU5gj0iPONuzmPz+1LmUODoMqORkc=", "HD9dhuWSH96YkBifHYxhh1QohgDmkovBgqxNXkyfDMs=", "KcYRhO2dRg8zdVihr2Oap+PAl15AFO2OvK1KJdUeq/M=", "De/UWyiVhygiituy29rval6bGmSQKnNPQCuM77irO1Y=", "CnTqItigkzYGBhAXmsHYL/+pSS33be7U6mDgEzsIEag=", "A6N78S2vFADSl6xKwTuiTBfcJi2xbIUj3u5ODM3ppoA=", "Ef4XkNWrv1k1/yIxjk9//mmWatovkTa1T4MOrLCmU2g=", "AYFlhC9AY3XyNGaGkVr7FL8f4FZMiFjuO94Kuj3l9o8=", "Jh2yXnz/Wp+3LydrH5JgtmcwD7fTYbUP1cDotplbBfk=", "KjrDMUsrZueW++Nt93jF5GlyMgzEPsgHBIgmtnBLp8Q=", "I8qkuA7PqZ6dP+orvB2782nRv8iTfQPQdAYcMP2M12s=", "J9smAIXiJImN8UXyP2NfIGbY5OEk5YHoxiYZKbHf4Qc=", "J09sX9NKeE1rkV7wXUJO5sC6u/Np55qxOLgWe1YY7H8=", "LDop4TqE0moJEckona8apM9YQKraBwHVfiPfx5babaE=", "HqIQ8gAaM00+gB9OUycNQtp6rzF6VTtCgqp46qIoLm0=", "JU2+tSiEtpnBun+g1ugNYQkDsYo+UJw2NRzMOwJJRuM=", "BZ54HWWJbr4OS6JtwvKZB/R7ze2kososcT2FBeox/V0=", "C1sc7GPULV5hXcJpuIWiTO8wPseMly3RfNuz6RXMT/s=", "KnwBXpw7LFfKi30m05obzIXW/6y32fvWbSqPHWTtDJI=", "Kbc2uRHXGnnPY9im94bxG9Wr7iQWHcVnp8hR6uHkO1E=", "KFdFqQp/49Ca9agIcEvGnG8XAeVzkS31zB4mXVlsQUE=", "LZAbgZXDyWyMNuuZ/sATTsK4MEroEL0w2lVOMICCZxU=", "GQXTUYNV6rp4WbWR7XuMnCU5gPBFDb31TXp3groFg5I=", "I+gTAm/AuABk0ZtcVCiUL99+/qgL+o7ECVJyv9t7TJ8=", "I8ChmiUsh+axwcIbGnmAAgDD+/8+MwDn5VaAcd6e+4E=", "EcSuYHuuSSQTv2LNqiwoaO0f7G3AYxsGfKYPqxJbnio=", "LNBV67fuRoY2XepFDwRv9iQF+uGxr8n7AXB8+B2g47k=", "BTyf7y4CH6miD62iL96hUFtYoxWbu0czfb95GyFbFFI=", "CjW9dOh8urqr6JrRMZ0snoY7TGMcIZOMmlOVv5eHKp8=", "HBFQVlOc4gzVoE0aXEPisA++g7JZAb429d3EZm/Dg/4=", "JClUBH5Xcv073tWQ7IvrTFQvLiZMjD4oTNxHNQXFGpA=", "Diq9MVtHwNyThJwM3yZ+gRy9vbIApufCtn7ffLAXQhQ=", "KCs3AgwIkNdRw/12lQ2AaGaOHf6uYh3VUtLeiH2i6nU=", "KJM4UiZrUtnqa1u5I9nZTy5aW+XHeOdeB5QsI0tkO9k=", "CZq2dlUFuhGY7xQOd7eVTU++eaBWznK6zjnASMANo88=", "KvIR2OCsLY/af4SbjyKaIlxhhrVXYsensq4tHdhcV8s=", "DNBw8jQBSigJq5DHHB2mHpipYyL+3Zm2qq4coQTz+s8=", "Jnk+KryNPDDGBib7qhWPJjWH1r0Vgz1EixFiZLkwJWo=", "IlvjbtDuheH4Ra2oTldIpWaZFSET/2G1BWtti95gwZ0=", "AhdPSe2wLVFU0r7KLckrnMWVOD2h/ejwnkte4+paBl4=", "D2SJHCyLAg5Gw1lMt1jwvdzb0JvQMIgW+0FzSoaYcsM=", "GSqEyi+Z02mR4tKx3v85idHBVsI54Q6fVhQOGFRXYGc=", "Kd/Ne2PwWr8nU6jDQda3pgxiQ7BMmhuLMyC7oEpNR4c=", "HuJ61rm1qGdzOvxhorPnalK6PkvV5let6R/AOIGduls=", "CrR3PxUMP4rTvJU49DzsOVp+NzGulz/v62I6CSF+ZMc=", "E8NSoC9ZUYYgLLC5n6WMVUKrZ/m206Cv0QPe7/bYD0E=", "KpfPLBDEv7/SmfZ8UqFp+SwFt9rFakHE3U/ofIJGzhQ=", "AL7LtHBCvX+Mn2u0IhYtGu0ImihIL3/RarBqEyhf5wI=", "AI5E2iHXOGkbiBdX7zftKcW9n3pEUPz1MpCpLMLKIXY=", "KyBai21LcGPZMfO7XTRkBThD/n++S4PBeIP4ZSeIKhg=", "LZ4yp8kFVv4QjSVawB513zOPzWOyv4TBkoDUJymIY/w=", "KaMiqEwlvS3fbi5CACKNlavWNJoCJmrB27pSBzjOypc=", "BnjJv8by3wEvT+VeM7torBTO0d8NAhUnkgidBG2CjEM=", "D6/zpedCV5T+IKfg62FbixdgOUt/IwQoajrkAJEk2yM=", "H49bYRr5/rnOqGwIQFgSBVPkBBA67iE/WkHR0CVBwNM=", "Fgh12EeWAvlvQKzC0ELuUsFYi2op3kKEllptxskw6gc=", "Fth6UYOjFqHXCvyVHv4s1mfHcyj8/aRYy/X+MEX0bZ4="],
      M: [["EkZm+AVh7VkW8vBwsb0kjG1T9E0nPZVqDIe5F2kqTRg=", "EZJPAv0ZsJJVqqHPRuoFGOPXv+70dCFglJEBHbC9CwI=", "JH+n8CIwShmU/1BUVsIgHvm3FzaUmNP/zkRmAe2d+EU=", "A/17Ge8shh8i93/4EPVOJ3vJTrdsAtedmGvj3N8FHD8=", "GL1BI5w+cVeaZ3RD7P+9VVqB7u6mk1Kmi2fIVjwMKgY=", "LXjDpdKN6f81vwoldjUZblcwyn9ASTJ3B4zXXai069w="], ["ClFKXCJ/TOyV36Ap6N0STDSJWqRrsnwJEfN4DVAVVAo=", "GS4W0X2VayV7haZS7v3y7glYnqxb6AkVd1cj0ssdoG0=", "KYzgweMRO7k1xwWOd3K1M7GqnbDAkmvciRflYFyjrBA=", "CUy06DYhr9Jx5BvHFyfwFY69YSI5rJ1pixf+S+Bbf8g=", "A9iAOVvpPCfWSa9f0ULnazORjLiEHVooFzvVz30yh5E=", "KO6ua1hmrWjkQ7uvkWgNt9fiswN+OP72G0LLzP/OyoE="], ["J4u0mntORK6kbrD4gstpKAGm5g/dW1wjxjzWXMzk/go=", "Bj7ewb7YMfUGr422SNb96hRTRYh+i9z/EJA1odm2dNc=", "G67xy1UJtSakIGH7U2V/mbMjJQDoVRksvoyUDgaMR18=", "EyRWSse9+eIhZOmFjX+o42ixZerqPa9Otn7lnA3y5dQ=", "AFdhuMauyxqMpOpN/CyDdgZKSoAEzu2iEKVSQFYt3BM=", "EMnigxWdWMtMsuNf3oOjuh/cKAAu2ZY9KpnxhheKFI0="], ["DDmen2eqQHB6ID/u+wuVi72tzsXKNJAdJT0CaiQZ9qI=", "CD8N8/GgNR0DMOw/9gLKjMNTt/bnYscQcYTNe0I0SfY=", "Gmdk1ZQ/xKcgtMChn9uMcRmEMHKHpYubX59dWCEssmM=", "ARpjom/qv4f6Zr3mbMJakiyWOC12xqf/SPFTe+rtaDo=", "CMp7ZGV8NUjzK+9bY60kKIpBwLJRCZrSf5Q0MH4+ZNQ=", "AZmCcEcek2GVVEawzbi+qRXsBnXxzWSN3LBDA1B6RIk="], ["HWs9X26jacJvgl0jYpM+qjHqNewKd8H72eAcoVI+RDI=", "EZ7xiLs90NMjBpdsGZQehmS+aH56aWkton2iFabwbUA=", "LZ4KtcBok9/f0DSBOBuoa25ikt9WCdcfLGSy2aefgJ4=", "JfFmMb93Bg9+o0CHwCW/E1eEMZ7wjNouMUGe4KUp5lg=", "FEx6EdpafF2rrj8z+9A8rYbRi8WUx5pJfsuYlO21VPE=", "D5cRYmJ3I/P+rayyiwwQTLj3TeUIdS+o18DbKvE96O4="], ["JL5RAJVDYgbdCr0LDLuVyIOrMEqlJZixppMG7JgaaI0=", "IRYQ4q1KN3Qm+t9waLDBpsKZoWTBwaYD6u2USHDQubk=", "FaZ9mBBBsfbwnz+evv2GTnedOvCBV3hqwHdQXlDsefw=", "BJMn+nnSjBKiyCQGlH938Gd1sCh0aLMTaHdwHb58lZg=", "IwlA3MUjJlj/nClpej/UFtFw6MmY8aqF3qDELXn5Uao=", "GxIcBJzRFZ4okAfgydqZlcxLq0wm+4iOw5cqii5laWQ="]]
    };
    exports.default = _default;
  }
});

// node_modules/poseidon-lite/poseidon5.js
var require_poseidon5 = __commonJS({
  "node_modules/poseidon-lite/poseidon5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.poseidon5 = poseidon52;
    var _poseidon = _interopRequireDefault(require_poseidon());
    var _unstringify = _interopRequireDefault(require_unstringify());
    var _ = _interopRequireDefault(require__());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var c = (0, _unstringify.default)(_.default);
    function poseidon52(inputs, nOuts) {
      return (0, _poseidon.default)(inputs, c, nOuts);
    }
  }
});

// node_modules/poseidon-lite/constants/2.js
var require__2 = __commonJS({
  "node_modules/poseidon-lite/constants/2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      C: ["DumlkrqalRjQWYbWVvQMIRTEmTwRuymTjSHUcwTNjm4=", "APFEUjXyFIxZhlhxafwbzYh7CNTQCGjfVpb/9AlW6GQ=", "CN/zSH6KyZ4fKaBY0PqAuTDHKHMLerNs6HnziQ7Pc/U=", "Lye+aQ/a7kbDzij3UysTyFbDU0LIS9puIJZjEPrcAdA=", "KyrhrPaLe40kFr6/PU9iNLdj/gS4BD7ki4MnvryhbPI=", "AxnQYgcr737MperAb5fU1VlSwXWrawPq5ktEx9vxHPo=", "KIE9yuuuqoKKN234evSmO8i3vyetScYpjvezh78oUm0=", "JydnOyzLyQPxgb844cHUDSAzhlIAw1K8FQkord35y3g=", "I07EXKJ3J8LnSr0rKhSUzW771D40BYfWuPueMeZcxjI=", "FbUlNAMa4Y9/hiyyz3z3YKsQqBUKM3sczZn/boeX1Cg=", "Dcj61tnks19e2aPRhrec444Oio0bWLEy1wHU7s9o0fY=", "G82V/8IR+8pgD3BfrT+1Z+pOs3j2Lh/sl4BVGKR+TZw=", "EFILCrchyt/p7/gbAW/DTcdto2wleJN4F8uXjQad5Vk=", "H21IFJuOf32bJX2O1fu69CkySYB1/tCs6IqeuB9WJ/Y=", "HZZV9lIwkBTSngDvNaIIm//43ByBbw3JyjS9tUYMhwU=", "BN9aVv+VvK+wUfexzUOpm6cx/2fkcDIFj+PUGFaXzH0=", "BnLZlfj/9kAVGz0pDO2vFIaQoQqMhCSn9uwoK25L6Cg=", "CZlStBSIRFSyEgDX/6/dXwyancwG8nCOn8HYIJtcdbk=", "BSy6IlXf0Ax8SDFDuo1GlEjkNYaptM2Rg/0OhDprn6Y=", "C4ut7mkK246wvXRxK3mZr4LeVXByUa13Fgd8uTxGTdw=", "EZsVkPEzB69aHuZRAgwHx0nBXWBoOoBQuWPQqOSyvdE=", "AxULfNbV0XslKdNr4PZ7gyxKz8iE707lzhW+C/tKjQk=", "LMYYLF4UVG488ZUfFzkSNVN077g9gImKvmnLMXyepWU=", "AFAyVR5jeMRQz+EppASzdkIYyt7awU4rktLNcxEb8Pk=", "IzI34yibqjS7FH6XLry5UWRpw5n8wGn7iPnaLMKCdrU=", "Bcj09OvUpuPJgNMWdL++YyMDfyGzSuWk6AwtTCTWAoA=", "CnsdsTBC05a6BdgYoxnyUlK8817zru2R7h8JslkPxls=", "KnO3H5shDPWxQpZXLJ0y2/FW4rCG/0fcXfVCNlpATsA=", "GsmwQXq8yaGTUQfp/8kdw+wY8sTb5/Ipdqdgu1xQxGA=", "EsAzmuCDdII/q7B2cH70eSafPk1ssQQ0kBXuBG3JP8A=", "C3R1sQKhZa1/WxjbTh5wT1KQCqMlO6rGgkZoLlbpoo4=", "A3woSeGRyj7bHF5J9ui4kXyEPjeTZvLqMqs6qI1/hEg=", "BaaBH4VW8BTpJnRmHiF+m9UgbFyToH3BRf2xdqcWNG8=", "KaeV59mAKJRulHt11U6fBEB26Hp7KIO0e2de9fOL1m4=", "IEOaDISzIutFo4V6/Bj1gm6Mc4LIoVhcUHvhmZgf0i8=", "Lguo2U2ez0qU7CBQxzcf8btQ8neZqEttSipvKgmCyIc=", "FD/RFc4I+yfKOOt8zoIrRReCLNIQkEjS5tDdzKF9ccg=", "DGTL7LHHNLhXlo273PgTzfhhFlkyPby/yEMjYjvpyvE=", "AoowWEfGg/ZG/KklwWP/WudPNI1iwrZw8UJs75QD2lM=", "Lk71EP8Lb9pfqUCrTEOA8mpry2TYlCe4JNZ1W1254ww=", "AIHJW8QzhOZj15JwyVbOO4kltPbQM7B4uWOE9QV5QA4=", "LtXwyRy9l0kYfi+t5ofgXuJJGzScA5oLuoqfQCOguzg=", "MFCZkfiNo1BLvzdO1ari8DRIoix2I0yMmQ8B8zpzUgY=", "HD8g/VVAmlMiG3xNSaNWufChEZ+yBntBp1KQlEJOxq0=", "ELTn86td8AMElRRFm24Y7sRrsiE+jhMeFwiHtH3cuWw=", "KhmCl5w/9/Q93VQ9iRwqvd2A+ATAd9d1A5qjUC5Dre8=", "HHTuZPFeHbb+3b6tVtbVXbpDHrw5bJr5XK0PExW9XJE=", "B1M+yFC6f5jquTA8rOAbS55PLouCcIz6nC/kWgrhRqA=", "IVdrQ45QBEmhUeTurxexVChcaPQtQsGAihGr83ZMB1A=", "LxfAVZuP55YIrVyhk9YvELzoOEyBXwkGdD1pMINtSp4=", "LUd+OGLQdwinnoqulGFwvJd1pCATGEdK5mWwsbficw4=", "Fi9SQ5ZwZMOQ4JVXeYTyka+6ImbDj1q82Jvg9bJ0fqs=", "K0yyM+3pukgmTs0siuUNGteoWWqH8p+Kd3enAJI5MxE=", "LI+8st2Fc9wduvj0YihUd22y7s5thcTPQlTnw14DsHo=", "HW80dyXkgWry/0U/DNVrGZ4bYen2Aemt5eiNuHCUnak=", "IEsMOX9OvnHrwtiz31uRPfnmrAK2jTEyTNSa9cRWVSk=", "DEy53DxP2BdPEUmzxjw8L57LgnzX3CVTT/j7dbx5xQI=", "F0rWGhRIyJmiVBZHT0kwMB5cSUdSeeBjmmFt3EW8e1Q=", "GpYXe89NjYn3Wd9OwvPN4uqqKMF3zA+hOpgW1Jo40u8=", "Bm0EskMx1xzQ74BUvGDE/wUgLBJqIzwagkKs42C4owo=", "KkxPxuwLDPUhlXgoccbdOzgcxl9y4CrVJwN6Yqob2AQ=", "E6stE2zPN9RH6fLhSnztyV5yf4RG9tnX5Vr8ASGf1kk=", "ESFVL8omBhYZ0k2EPcgnacGwT87Cb1UZTC4+hprMapo=", "AO9lMyKxPWyIm8gXFcN9d6bNJn1ZXEqJCaVUbHyXz/E=", "DiVIPkWmZSCLJh2Lp0BR5kAMd21lJZXZhFrKNdijl9M=", "KfU23LnddoIkUmRlnhXYjjlaw9Td6S2MRkSNuXnuuok=", "KlbvnyxT/rrf2jNXXb29iFoSTieAu+oXDkVrqs4Ppb4=", "HINhx461z13s+3otF7XECfKuKZmkZ2Lo7kFiQKjLmvE=", "FRr/XziyCg/ARzCJqvAga4Po5op2RQe/09CrS+dDGcU=", "BMYYfkHtiB3BsjnIj3+dQ6n1L8jIts3R525HYVtR8QA=", "E7N72A9NJ/sQ2EMx9vttU0uBxh7RV3ZEnoAbfdycKWc=", "AaXFNic8LZ31eL+9MsF7eizjZkwqUgMskyHOscToqOQ=", "KrNWGDTKc4Na0F9desuVC0qaLGZrlybagyI5Blt8OwI=", "HU2OwpHnINsgD+bWhsDWE6yvavTpXTv2n37VFqWXtkY=", "BBKU0sxITSKPV4T+eRn9K7klNRJAoEtxFRTJyAtlrx0=", "FUrJjgFwjGEcT6cVmR8ASJj1eTnRJuOSBClx3ZDoH8Y=", "CzOdisyn1Pg+7dhAk671EFCzaEyI+LCwRSRWO8bqTaQ=", "CVXknmYQyUJUpPhM+6s0RZjw5x6v9Kfdge2VtQg5yC4=", "BnRqYVbrpUQmueIiBvFavKmm9B5vU1xvNSVAHqBlRiY=", "Dxj1oOzRQjxJbzggxUnCeDjleQ4r0KGWrJF8f/Mgd/s=", "BPbuyhdR9zCKxZ7/W+smHku1Y1g+3nvJKnOCI9b3bhM=", "K1aXM2TExPXBo+xNo83OA4gR6xFvs+RbwXaNJvwLN1g=", "Ejdp3UnVsFTc12uJgEsby44TkrOFcWpdg/62XUN/Ke8=", "IUe0JPxIyAqI7lK5EWmqzqmJ9kRkcRUJlCV7L7AcY+k=", "D9wfWFSLhXAabFUF6jMqKWR+bzStQkPC6lStiXzr5U0=", "Ejc6glH+oATfaKvPD3eG1Lzv8oxdu+DDlE9oXMCgsfI=", "IeT06l81+FutfqUv90LJ6KZCdWtq9EID3YofNcGpADU=", "FiQ5FtadLKPftHIiJNTEYrVzZkkvRekNioGTTxvDsUc=", "HvvkbdeleLT2b5rbyItDeKvCFWbhoEU8oTpBWcrASsI=", "B+pehTfPXdCIhgIOI6fzh9Ro1VJb5m+FO2csyWqIlpo=", "BajE+ZaLiqO3tHijD5pbY2UPGadefOEcqf4WwLdsALw=", "IPBXcSzCFlT7/lm9NF6NrD94GMcBuceILZ1Xtyoy6D8=", "BKEu3tqd/WiWcvjGf+4xY23NjojQHUkBm9kLM+sz22k=", "J+iNjBXzfc7kTx5UJaUd7L0TbOUJGmdn5J7JVEzNEBo=", "L+7Re4QoXtm4pcjF6VpB9m4JZhmncDIjF2xB7kM95NE=", "HtfMdu30XHxAQkFCD3Kc85TllCkRMSoNaXK4vVOv8rg=", "FXQumbm/oyMVf/jFhvVmDqxng0dhRM3K3yh0vkVGaxo=", "GqwoU4f2XoLIlfxoh930BXcQdFTG7AMXKE8DPyfQx4U=", "JYUcPIRdR5D53a29tgVzV4MuLnpJd19x7HWpZVTWfHc=", "FaWCFWXMLsLOeEV9sZft81O367osVSM3DdzMPZ8Uamc=", "JBHVekgTuZgO+n4xodtZZtz2TzYEQndQLxVIXyjHFyc=", "AC5vjWUgzUcT4zW4wLbS5kfpqY4S9M0lWIKLXvbLTJs=", "L/e8j0OAzemX2gC2FrD80a+PDpHi/h7XOYg0YJ4DFdI=", "ALmDG5SFJVle4CckRxvNGC6VIfa3u2jx6Tvk/rsNPL4=", "Ci9TdouOv2qGkTsOV8BOARykCGSKR0OofXetvwycNRI=", "ACSBVhQv0Dc6R5+R/yOelg9Zn/fpS+abfyopAwXhGY0=", "Fx1WILh7+xMoz4wCqz8MmjlxlqpqVCwjUOtRKisrzak=", "FwpPVVNvfclwCHx8ENb612DJUhct1U3ZnRBF5Ow0qAg=", "KaujP3mf5mwu8xNK6gQzbsw344wc0hG6SC7KF+Lb+uE=", "HpvBeaT911j90bsZRQiNR+cNEUoD9qDotbplA2nmSXM=", "HdJpeZtmD61Y9/SJLfsLWv6q2GmpxLRPnJ4cQ72vjwk=", "Is28i3ARetFAEYHQLhVFnnzNQm/oacfJXR3Syw8krzg=", "DvBC5FR3HFM6n1elXFA/zv0xUPUu2Up81bqTucfazv0=", "EWCeBq1sj+Lyh/MDYDfohRMY6LCKA1mgOzBP/KYugoQ=", "EWbZ5VRhbbqedT7qQnwXt/7NWMB23+QnCLCPW3g6qa8=", "LeUpiUMahZWTQTAmNUQT2xd/v0zSrAtW+FWoiDV+5GY=", "MAbrT/x6hYGabaSS86isHfUa7lsXuOiddL8Bz19x6a0=", "KvQfu2G6ioD9z2//nj9vQimT/o8KRjn5YjRMgiUUUIY=", "EZ5oTeR2FV/lprQajryF24cYqyeInoXngbIUus5IJ8M=", "GDW3huLokl4Yi+pZrjY1N7USSMI4KPBHz/eEuXs/2AA=", "KCAaNMWU36NNeUmWxkM6INFSusKnkFySbEDihasy7rY=", "CD79eifRdRCU6A/vr3iwAIZMgutXEYdySnYfiMIsxOc=", "C2+Io1dxmVJhWOYc7qJ76BHBbfd3TdhRngeVZPYf0Ts=", "Dsho5tFeUdlkT2bh1kcalFiVEcoA0p4QFDkObuQlT1s=", "KvM+P4ZncScawMmz7S4RQuzT50uTnNQNANk3q4TJhZE=", "C1ICEfkEtefQm12WHGrOdzRWjFR91oWLNkzl5HlR8Xg=", "Cy1yLQkZoarY21jxAGKpLqDFasQnDoIsyiKGIBiKHUA=", "H3kNTX+M8JTZgM6zfCRT6Ve1SpmRyji74AYdHtblYtQ=", "AXHrld+/fR6uqXzThfeAFQiFwWI1oqao2pLOsB5QQjM=", "DC0OO1/VdUkym/aIXaZrm3kLQN79LIZQdiMFOBsWiHM=", "EWL7KGicJxVOWoIotOcrN3y8r6WJ4oPDXTgDBUQHoY0=", "LxRZtl3uRBtkrThqkegxDygsWpKonhmSFiPvgklxG8A=", "Hm/zIWtojD2ZbXQ2fVzUwbxInUZ1TrcSwkP3DRtTz7s=", "AcqL5zgyuNBoFIfSfRV4AtdBpvNs3CoFdogfkyZHiHU=", "H3c1cG/+n8WG+XbVvfIj3GgChggLEM6gC5td4xX5ZQ4=", "JSK2D06jMHZAoMLc4EH7qSGsEKPV8JbvR0XKg4KF8Bk=", "I/C+4AGxAp1SVQdd3JV/gzQYytT1K2w/jOFsI1VyV1s=", "K8Gui43buB/KrC1EVV7VaF0UJjPp35BfZtlAEJMILVk=", "D5QGuCllZKNzBFB7jbo+0WI3EnOgex/JgBH81q1yIF8=", "I2Co6wzH3vpntymY3pBxThfnWxdKUu5KyxJsjNmV8Kg=", "FYcaXN3q2XaATIA8uu8lXrSBWl6W34sAbcu8J2f4iUg=", "GTpWdmmY7p4KhlLdLzsdoDYvT1T3I3lUT5V8ze77Qg8=", "KjlKQ5NPhpgvm+Vv9PqxcDsuY8itM0g05DCYBed3rg8=", "GFmVTP64aV8+i2NdyzRRkoks0RIjRDuntBZuiHbA0UI=", "BOEYF2MFDlgBNETby5nxkCsRvCXZC73KQI04GfT+0ys=", "D9slPe6Dhp1AwzXqZN6MW7EOuC2wi16LH15VUr/QXyM=", "BYy+ippQJ72qTvtiOt6tYnXwhobxwImEqdfFuum08cA=", "E4Ltzplx4YZJfq2xrrH1KyO0uDvvAjqw0VIotMzspZo=", "A0ZJkPBFxu4IGcpR/RGwvn9huOuZ8Ut34eZjRgHZ6LU=", "I/e/yHINwpb/8ztB+Y/4PG/KtGBdsutaqlvBN663Clg=", "ClmhWOPuwhF+bpTn8OnezxjD/9XhUxqSGWNhWLuvYvI=", "BuxUyAOBwFK1i/I7MS/9POLE66BlQgr49MI+0Adf0Hs=", "EYhy3IMuDrVHa1ZkjoZ+yLCTQPenvLG0li8P+e0fnQE=", "E9afoSfYNBZa1cfLp61Z7VLgsPDkLX/qleGQa1IJIbE=", "FpoXf2PqaBJwscaHenPSG94UOUL7cdxV/YpJ8Z8Qx3s=", "BO9RWRxurZfvQvKHrc5A2Tq+sDK5IvZv+36aWnRQVE0=", "JW4XWh3AeTkOzXynA/suOxnsYYBdTwPO1fRe5t0Paew=", "MBAtKGNqvV/l8q9BL/YAT3XMNg0yBd0toAKBPT4s7rI=", "EJmOQt/NO78cBxS8c+sb9ARDo/qZvvSjH9Mb4YL8x5I=", "GT7djp/PPXYl+n0ktZih2J8zYur01YLv7K12+HnjaGA=", "GBaK/TTy2RXQNozoC3szR9HHpWHOYRQl8mZNeqUfC10=", "KTg8AevTtqsMAXZW6+ZYtqMo7He8M2JuKeLpWzPqYRE=", "EGRtLyYD3jmh9K5ed3GmSnAttuhvt2q2AL9XP5AQxxE=", "C+teB9GycUX1dfE5WlW/Ey+QwltA2ns4ZNAkLcsRF/s=", "FtaFJSB4wTPcDT7K1itciDD5W7LlS1mr3/vwGNlvozY=", "Cmq9HYM5OPM8dBVOBAS0tApVW7vsId36/Wct1iBH8Bo=", "GmefXTbre1yOoSpMLe3I/rEt/+7EUDFycKbxmzTPGGA=", "CYD7IzvUVsI5dNUODr/eRyakI+raTo9v+8dZLj8bk9Y=", "FhtCIy5huEy/GBCvk6OPwM7OPVYoySggA+ustcMSxys=", "CtoQqQx/BSCVD31Hpg1eakk/CXh/FWTl0JID20feGgs=", "GnMNNyMQuoIyA0WimsQjjtPweoorThIbtQ3bmvQH9FE=", "LIEg8mjvBU+BcGTDad2n6pCDd/6rpcTf+9oQ71joxVY=", "HHyIJPdYdT+lfAB4nGhCF7kw6VMTvLc+bnuGSaSWj3A=", "LNntMfX4aRyOOeQHenT6oPQArYtJHrP3tHsn+j/Rz3c=", "I/9PnUaBNFfPYNkvV2GDmaXgIqwyHKVQhUriORiiLuo=", "CZRaXRR6T2bO7OZAXd3Z0K9aLFEDUpQH3/HqWPGAQm0=", "GI2cUoAl1MK2dmDGt3G5D3x9puqinT8mim3SI+xvxjA=", "MFDjeZZZa3+B9oMRQx2HNNun2SbTYzWV4MDY3fTw9H8=", "Fa8RaTloMKkWAMqBAsNcQmzq5UYeP5XYnYKVGNMK/Xg=", "HabQmIVDLqmgbZ83+HPZhdrpM+NRRmspBChNozINisw=", "J5bqkNJpryn1+KzzOSESTk5PrT2+ZYlF5UbuQR3aqcs=", "IC190doPa0sDJcizMHdC8B4VYS7I6TBKfLAxngHTLWA=", "CW1nkNBbt1kVapUromPWcqLX+ceI9Mgxop2s5MD4vl8=", "BU76H2Ww/OKDgIllJ12He0ONojzlsT4ZY3mMsUR9JaQ=", "GxYvg9kX6T7bMwjCmALeudiqaQETsuFIZMz24Y5BZfE=", "IeUkHhJWTdb9nxzdKg3jnu3+/BRmzFaOxc63RaBQbtw=", "HPtWYujPWskiaoDuF7Nqvstzq1+H4WGSe0NJ4Q5L3wg=", "DyEXfjAqdxu65tjR7LNztiyZrzRiIKwBKcU/Zm6yQQA=", "FnFSI3RgaZKv+w3X9xsSvsQjau3mKQVGvO9+H1FcIyA=", "D6PsW5SIJZwutM8kUBv62b4uyeQsXMjM1BnSppLK2HA=", "GTwOBOC9KYNXyyZsFQYIDtNu3OhcZIzAhejFexq1S7o=", "ECrfjvdHNaJ+kSgwbcvDyZ9vcpHNQGV4zhTqKtq6aPg=", "D+CveFjkmFnipU1vGtlFsTFqokv73SOuQKbQy3DD6rE=", "IW9nF7vH3tsIU2oiIIQ/Ti2l8dqp69796KXqc0R5jSI=", "HaVcyQDw0h9KPmlDkZGKGzwjsqx3PGs++I4uQigyUWE="],
      M: [["EJt/QRug5MmytwyvXDansZS+fBGtJDeL/ttoWSuoEYs=", "Fu1B4Tu5wMZq4RlCT928vJMU3J/b3upV1sZFQ9xJA+A=", "K5C7oA/KBYn2F+fcv+guDfcGq2QM6yR7eRqTt042c20="], ["KWnyfu0xpIC5w2x2Q3nbyizI/dFBXD3e1ilAvN4L13E=", "LiQZ+ewC7DlMmHHIMpY9wbiddDyMe5ZAKbIxFoex/iM=", "EBBx8AMjebaXMVh2aQ8FPRSNThCfX7BlyKrMVaD4m/o="], ["FDAh7GhqPzMNX55lRjgGXObNeeKMWzdTMmJE7mWhsac=", "F2zAKWla0CWCpw7/CKb9mdBX4S5Y59e2sWzfq8juKRE=", "GaP8ClZwK/QXun/uOAJZP6ZERwMHBD93cyec1x0l1eA="]]
    };
    exports.default = _default;
  }
});

// node_modules/poseidon-lite/poseidon2.js
var require_poseidon2 = __commonJS({
  "node_modules/poseidon-lite/poseidon2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.poseidon2 = poseidon22;
    var _poseidon = _interopRequireDefault(require_poseidon());
    var _unstringify = _interopRequireDefault(require_unstringify());
    var _ = _interopRequireDefault(require__2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var c = (0, _unstringify.default)(_.default);
    function poseidon22(inputs, nOuts) {
      return (0, _poseidon.default)(inputs, c, nOuts);
    }
  }
});

// node_modules/@zk-kit/baby-jubjub/node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
var import_buffer2 = __toESM(require_buffer(), 1);

// node_modules/@zk-kit/baby-jubjub/node_modules/@zk-kit/utils/dist/lib.esm/type-checks.js
var import_buffer = __toESM(require_buffer(), 1);
var supportedTypes = [
  "number",
  "string",
  "function",
  "Array",
  "Uint8Array",
  "Buffer",
  "object",
  "bigint",
  "stringified-bigint",
  "hexadecimal",
  "bignumber",
  "bignumberish"
];
function isNumber(value) {
  return typeof value === "number";
}
function isString(value) {
  return typeof value === "string";
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return typeof value === "object";
}
function isArray(value) {
  return isObject(value) && Array.isArray(value);
}
function isUint8Array(value) {
  return value instanceof Uint8Array;
}
function isBuffer(value) {
  return import_buffer.Buffer.isBuffer(value);
}
function isBigInt(value) {
  return typeof value === "bigint";
}
function isStringifiedBigInt(value) {
  if (!isString(value)) {
    return false;
  }
  try {
    BigInt(value);
    return true;
  } catch {
    return false;
  }
}
function isHexadecimal(value, prefix = true) {
  if (!isString(value)) {
    return false;
  }
  if (prefix) {
    return /^(0x|0X)[0-9a-fA-F]+$/.test(value);
  }
  return /^[0-9a-fA-F]+$/.test(value);
}
function isBigNumber(value) {
  return isBigInt(value) || isStringifiedBigInt(value);
}
function isBigNumberish(value) {
  return isNumber(value) || isBigInt(value) || isStringifiedBigInt(value) || isHexadecimal(value) || isBuffer(value) || isUint8Array(value);
}
function isType(value, type) {
  switch (type) {
    case "number":
      return isNumber(value);
    case "string":
      return isString(value);
    case "function":
      return isFunction(value);
    case "Array":
      return isArray(value);
    case "Uint8Array":
      return isUint8Array(value);
    case "Buffer":
      return isBuffer(value);
    case "object":
      return isObject(value);
    case "bigint":
      return isBigInt(value);
    case "stringified-bigint":
      return isStringifiedBigInt(value);
    case "hexadecimal":
      return isHexadecimal(value);
    case "bignumber":
      return isBigNumber(value);
    case "bignumberish":
      return isBigNumberish(value);
    default:
      return false;
  }
}
function isSupportedType(type) {
  return supportedTypes.includes(type);
}

// node_modules/@zk-kit/baby-jubjub/node_modules/@zk-kit/utils/dist/lib.esm/error-handlers.js
function requireBigInt(parameterValue, parameterName) {
  if (!isBigInt(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not a bigint, received type: ${typeof parameterValue}`);
  }
}
function requireTypes(parameterValue, parameterName, types) {
  for (const type of types) {
    if (!isSupportedType(type)) {
      throw new Error(`Type '${type}' is not supported`);
    }
  }
  for (const type of types) {
    if (isType(parameterValue, type)) {
      return;
    }
  }
  throw new TypeError(`Parameter '${parameterName}' is none of the following types: ${types.join(", ")}`);
}

// node_modules/@zk-kit/baby-jubjub/node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
function bigIntToHexadecimal(value) {
  requireBigInt(value, "value");
  let hex = value.toString(16);
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`;
  }
  return hex;
}
function leBufferToBigInt(value) {
  requireTypes(value, "value", ["Buffer", "Uint8Array"]);
  return BigInt(`0x${import_buffer2.Buffer.from(value).reverse().toString("hex")}`);
}
function leBigIntToBuffer(value, size) {
  const hex = bigIntToHexadecimal(value);
  const minSize = Math.ceil(hex.length / 2);
  if (!size) {
    size = minSize;
  } else if (size < minSize) {
    throw Error(`Size ${size} is too small, need at least ${minSize} bytes`);
  }
  const buffer = import_buffer2.Buffer.alloc(size, 0);
  const fromHex = import_buffer2.Buffer.from(hex, "hex").reverse();
  fromHex.copy(buffer, 0);
  return buffer;
}

// node_modules/@zk-kit/baby-jubjub/node_modules/@zk-kit/utils/dist/lib.esm/scalar.js
function isZero(a2) {
  return !a2;
}
function isOdd(a2) {
  return (a2 & BigInt(1)) === BigInt(1);
}
function shiftRight(a2, n) {
  return a2 >> n;
}
function bits(n) {
  const res = [];
  let E = n;
  while (E) {
    if (E & BigInt(1)) {
      res.push(1);
    } else {
      res.push(0);
    }
    E >>= BigInt(1);
  }
  return res;
}

// node_modules/@zk-kit/baby-jubjub/node_modules/@zk-kit/utils/dist/lib.esm/f1-field.js
var F1Field = class {
  constructor(order2) {
    this.one = 1n;
    this.zero = 0n;
    this._order = order2;
    this._half = order2 >> this.one;
    this._negone = this._order - this.one;
  }
  /**
   * Ensures a given result falls within the field by applying modular reduction.
   * This method also handles negative inputs, correctly mapping them into the field.
   * @param res The result to be normalized to the field.
   * @returns The equivalent value within the field.
   */
  e(res) {
    res %= this._order;
    return res < 0 ? res + this._order : res;
  }
  /**
   * Performs modular multiplication of two bigint values within the field.
   * @param a The first value.
   * @param b The second value.
   * @returns The product of 'a' and 'b' modulo the field's order.
   */
  mul(a2, b) {
    return a2 * b % this._order;
  }
  /**
   * Subtracts one bigint from another under modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value from which to subtract.
   * @param b The value to be subtracted.
   * @returns The difference of 'a' and 'b' modulo the field's order.
   */
  sub(a2, b) {
    return a2 >= b ? a2 - b : this._order - b + a2;
  }
  /**
   * Adds two bigint values together under modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value.
   * @param b The second value.
   * @returns The sum of 'a' and 'b' modulo the field's order.
   */
  add(a2, b) {
    const res = a2 + b;
    return res >= this._order ? res - this._order : res;
  }
  /**
   * Computes the multiplicative inverse of a given value within the field.
   * This method uses the Extended Euclidean Algorithm to find the inverse,
   * ensuring the result is always a positive value less than the field's order.
   * If the input value is zero, which has no inverse, an error is thrown.
   * @param a The value for which to compute the inverse.
   * @returns The multiplicative inverse of 'a' modulo the field's order.
   * @throws if 'a' is zero.
   */
  inv(a2) {
    if (a2 === this.zero) {
      throw new Error("Zero has no inverse");
    }
    let t = this.zero;
    let r2 = this._order;
    let newt = this.one;
    let newr = a2 % this._order;
    while (newr) {
      const q = r2 / newr;
      [t, newt] = [newt, t - q * newt];
      [r2, newr] = [newr, r2 - q * newr];
    }
    if (t < this.zero) {
      t += this._order;
    }
    return t;
  }
  /**
   * Divides one bigint by another within the field by multiplying the first value
   * by the multiplicative inverse of the second.
   * @param a The dividend.
   * @param b The divisor.
   * @returns The result of the division of 'a' by 'b' modulo the field's order.
   */
  div(a2, b) {
    return this.mul(a2, this.inv(b));
  }
  /**
   * Checks if two bigint values are equal within the context of the field.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' equals 'b', false otherwise.
   */
  eq(a2, b) {
    return a2 === b;
  }
  /**
   * Squares a bigint value within the field.
   * This is a specific case of multiplication where the value is multiplied by itself,
   * optimized for performance where applicable.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value to square.
   * @returns The square of 'a' modulo the field's order.
   */
  square(a2) {
    return a2 * a2 % this._order;
  }
  /**
   * Compares two bigint values to determine if the first is less than the second,
   * taking into account the field's order for modular comparison.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' is less than 'b', false otherwise.
   */
  lt(a2, b) {
    const aa = a2 > this._half ? a2 - this._order : a2;
    const bb = b > this._half ? b - this._order : b;
    return aa < bb;
  }
  /**
   * Compares two bigint values to determine if the first is greater than or equal to the second,
   * considering the field's modular context.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' is greater than or equal to 'b', false otherwise.
   */
  geq(a2, b) {
    const aa = a2 > this._half ? a2 - this._order : a2;
    const bb = b > this._half ? b - this._order : b;
    return aa >= bb;
  }
  /**
   * Computes the negation of a bigint value within the field.
   * The result is the modular additive inverse that, when added to the original value,
   * yields zero in the field's modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value to negate.
   * @returns The negation of 'a' modulo the field's order.
   */
  neg(a2) {
    return a2 ? this._order - a2 : a2;
  }
  /**
   * Checks if a bigint value is zero within the context of the field.
   * @param a The value to check.
   * @returns True if 'a' is zero, false otherwise.
   */
  isZero(a2) {
    return a2 === this.zero;
  }
  /**
   * Raises a base to an exponent within the field, efficiently computing
   * scalar exponentiation using the square-and-multiply algorithm.
   * Supports both positive and negative exponents through the use of the `inv` method for negatives.
   * @param base The base to be exponentiated.
   * @param e The exponent.
   * @returns The result of raising 'base' to the power 'e' modulo the field's order.
   */
  pow(base, e) {
    if (isZero(e)) {
      return this.one;
    }
    if (e < 0n) {
      base = this.inv(base);
      e = -e;
    }
    const n = bits(e);
    if (n.length === 0) {
      return this.one;
    }
    let res = base;
    for (let i = n.length - 2; i >= 0; i -= 1) {
      res = this.square(res);
      if (n[i]) {
        res = this.mul(res, base);
      }
    }
    return res;
  }
};

// node_modules/@zk-kit/baby-jubjub/dist/index.js
var r = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var Fr = new F1Field(r);
var Base8 = [
  Fr.e(BigInt("5299619240641551281634865583518297030282874472190772894086521144482721001553")),
  Fr.e(BigInt("16950150798460657717958625567821834550301663161624707787222815936182638968203"))
];
var a = Fr.e(BigInt("168700"));
var d = Fr.e(BigInt("168696"));
var order = BigInt("21888242871839275222246405745257275088614511777268538073601725287587578984328");
var subOrder = shiftRight(order, BigInt(3));
function addPoint(p1, p2) {
  const beta = Fr.mul(p1[0], p2[1]);
  const gamma = Fr.mul(p1[1], p2[0]);
  const delta = Fr.mul(Fr.sub(p1[1], Fr.mul(a, p1[0])), Fr.add(p2[0], p2[1]));
  const tau = Fr.mul(beta, gamma);
  const dtau = Fr.mul(d, tau);
  const p3x = Fr.div(Fr.add(beta, gamma), Fr.add(Fr.one, dtau));
  const p3y = Fr.div(Fr.add(delta, Fr.sub(Fr.mul(a, beta), gamma)), Fr.sub(Fr.one, dtau));
  return [p3x, p3y];
}
function mulPointEscalar(base, e) {
  let res = [Fr.e(BigInt(0)), Fr.e(BigInt(1))];
  let rem = e;
  let exp = base;
  while (!isZero(rem)) {
    if (isOdd(rem)) {
      res = addPoint(res, exp);
    }
    exp = addPoint(exp, exp);
    rem = shiftRight(rem, BigInt(1));
  }
  return res;
}
function inCurve(p) {
  const x1 = BigInt(p[0]);
  const y1 = BigInt(p[1]);
  const x2 = Fr.square(x1);
  const y2 = Fr.square(y1);
  return Fr.eq(Fr.add(Fr.mul(a, x2), y2), Fr.add(Fr.one, Fr.mul(Fr.mul(x2, y2), d)));
}
function packPoint(unpackedPoint) {
  const buffer = leBigIntToBuffer(unpackedPoint[1], 32);
  if (Fr.lt(unpackedPoint[0], Fr.zero)) {
    buffer[31] |= 128;
  }
  return leBufferToBigInt(buffer);
}

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/index.browser.js
var import_buffer3 = __toESM(require_buffer(), 1);
var import_buffer4 = __toESM(require_buffer(), 1);
function getRandomValues(size) {
  if (size <= 0)
    throw Error(`size ${size} is too small, need at least 1`);
  return crypto.getRandomValues(new Uint8Array(size));
}
var crypto_browser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getRandomValues
});

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
var import_buffer6 = __toESM(require_buffer(), 1);

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/lib.esm/type-checks.js
var import_buffer5 = __toESM(require_buffer(), 1);
var supportedTypes2 = [
  "number",
  "string",
  "function",
  "Array",
  "Uint8Array",
  "Buffer",
  "object",
  "bigint",
  "stringified-bigint",
  "hexadecimal",
  "bignumber",
  "bignumberish"
];
function isNumber2(value) {
  return typeof value === "number";
}
function isString2(value) {
  return typeof value === "string";
}
function isFunction2(value) {
  return typeof value === "function";
}
function isObject2(value) {
  return typeof value === "object";
}
function isArray2(value) {
  return isObject2(value) && Array.isArray(value);
}
function isUint8Array2(value) {
  return value instanceof Uint8Array;
}
function isBuffer2(value) {
  return import_buffer5.Buffer.isBuffer(value);
}
function isBigInt2(value) {
  return typeof value === "bigint";
}
function isStringifiedBigInt2(value) {
  if (!isString2(value)) {
    return false;
  }
  try {
    BigInt(value);
    return true;
  } catch {
    return false;
  }
}
function isHexadecimal2(value, prefix = true) {
  if (!isString2(value)) {
    return false;
  }
  if (prefix) {
    return /^(0x|0X)[0-9a-fA-F]+$/.test(value);
  }
  return /^[0-9a-fA-F]+$/.test(value);
}
function isBigNumber2(value) {
  return isBigInt2(value) || isStringifiedBigInt2(value);
}
function isBigNumberish2(value) {
  return isNumber2(value) || isBigInt2(value) || isStringifiedBigInt2(value) || isHexadecimal2(value) || isBuffer2(value) || isUint8Array2(value);
}
function isType2(value, type) {
  switch (type) {
    case "number":
      return isNumber2(value);
    case "string":
      return isString2(value);
    case "function":
      return isFunction2(value);
    case "Array":
      return isArray2(value);
    case "Uint8Array":
      return isUint8Array2(value);
    case "Buffer":
      return isBuffer2(value);
    case "object":
      return isObject2(value);
    case "bigint":
      return isBigInt2(value);
    case "stringified-bigint":
      return isStringifiedBigInt2(value);
    case "hexadecimal":
      return isHexadecimal2(value);
    case "bignumber":
      return isBigNumber2(value);
    case "bignumberish":
      return isBigNumberish2(value);
    default:
      return false;
  }
}
function isSupportedType2(type) {
  return supportedTypes2.includes(type);
}

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/lib.esm/error-handlers.js
function requireBigInt2(parameterValue, parameterName) {
  if (!isBigInt2(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not a bigint, received type: ${typeof parameterValue}`);
  }
}
function requireBigNumberish2(parameterValue, parameterName) {
  if (!isBigNumberish2(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not a bignumber-ish`);
  }
}
function requireTypes2(parameterValue, parameterName, types) {
  for (const type of types) {
    if (!isSupportedType2(type)) {
      throw new Error(`Type '${type}' is not supported`);
    }
  }
  for (const type of types) {
    if (isType2(parameterValue, type)) {
      return;
    }
  }
  throw new TypeError(`Parameter '${parameterName}' is none of the following types: ${types.join(", ")}`);
}

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
function bigIntToHexadecimal2(value) {
  requireBigInt2(value, "value");
  let hex = value.toString(16);
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`;
  }
  return hex;
}
function beBufferToBigInt(value) {
  requireTypes2(value, "value", ["Buffer", "Uint8Array"]);
  return BigInt(`0x${import_buffer6.Buffer.from(value).toString("hex")}`);
}
function leBufferToBigInt2(value) {
  requireTypes2(value, "value", ["Buffer", "Uint8Array"]);
  return BigInt(`0x${import_buffer6.Buffer.from(value).reverse().toString("hex")}`);
}
function bufferToBigInt(value) {
  return beBufferToBigInt(value);
}
function leBigIntToBuffer2(value, size) {
  const hex = bigIntToHexadecimal2(value);
  const minSize = Math.ceil(hex.length / 2);
  if (!size) {
    size = minSize;
  } else if (size < minSize) {
    throw Error(`Size ${size} is too small, need at least ${minSize} bytes`);
  }
  const buffer = import_buffer6.Buffer.alloc(size, 0);
  const fromHex = import_buffer6.Buffer.from(hex, "hex").reverse();
  fromHex.copy(buffer, 0);
  return buffer;
}
function bigNumberishToBigInt(value) {
  requireBigNumberish2(value, "value");
  if (isBuffer2(value) || isUint8Array2(value)) {
    return bufferToBigInt(value);
  }
  return BigInt(value);
}

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/lib.esm/scalar.js
function isZero2(a2) {
  return !a2;
}
function shiftRight2(a2, n) {
  return a2 >> n;
}
function mul(a2, b) {
  return a2 * b;
}
function bits2(n) {
  const res = [];
  let E = n;
  while (E) {
    if (E & BigInt(1)) {
      res.push(1);
    } else {
      res.push(0);
    }
    E >>= BigInt(1);
  }
  return res;
}

// node_modules/@zk-kit/eddsa-poseidon/node_modules/@zk-kit/utils/dist/lib.esm/f1-field.js
var F1Field2 = class {
  constructor(order2) {
    this.one = 1n;
    this.zero = 0n;
    this._order = order2;
    this._half = order2 >> this.one;
    this._negone = this._order - this.one;
  }
  /**
   * Ensures a given result falls within the field by applying modular reduction.
   * This method also handles negative inputs, correctly mapping them into the field.
   * @param res The result to be normalized to the field.
   * @returns The equivalent value within the field.
   */
  e(res) {
    res %= this._order;
    return res < 0 ? res + this._order : res;
  }
  /**
   * Performs modular multiplication of two bigint values within the field.
   * @param a The first value.
   * @param b The second value.
   * @returns The product of 'a' and 'b' modulo the field's order.
   */
  mul(a2, b) {
    return a2 * b % this._order;
  }
  /**
   * Subtracts one bigint from another under modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value from which to subtract.
   * @param b The value to be subtracted.
   * @returns The difference of 'a' and 'b' modulo the field's order.
   */
  sub(a2, b) {
    return a2 >= b ? a2 - b : this._order - b + a2;
  }
  /**
   * Adds two bigint values together under modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value.
   * @param b The second value.
   * @returns The sum of 'a' and 'b' modulo the field's order.
   */
  add(a2, b) {
    const res = a2 + b;
    return res >= this._order ? res - this._order : res;
  }
  /**
   * Computes the multiplicative inverse of a given value within the field.
   * This method uses the Extended Euclidean Algorithm to find the inverse,
   * ensuring the result is always a positive value less than the field's order.
   * If the input value is zero, which has no inverse, an error is thrown.
   * @param a The value for which to compute the inverse.
   * @returns The multiplicative inverse of 'a' modulo the field's order.
   * @throws if 'a' is zero.
   */
  inv(a2) {
    if (a2 === this.zero) {
      throw new Error("Zero has no inverse");
    }
    let t = this.zero;
    let r2 = this._order;
    let newt = this.one;
    let newr = a2 % this._order;
    while (newr) {
      const q = r2 / newr;
      [t, newt] = [newt, t - q * newt];
      [r2, newr] = [newr, r2 - q * newr];
    }
    if (t < this.zero) {
      t += this._order;
    }
    return t;
  }
  /**
   * Divides one bigint by another within the field by multiplying the first value
   * by the multiplicative inverse of the second.
   * @param a The dividend.
   * @param b The divisor.
   * @returns The result of the division of 'a' by 'b' modulo the field's order.
   */
  div(a2, b) {
    return this.mul(a2, this.inv(b));
  }
  /**
   * Checks if two bigint values are equal within the context of the field.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' equals 'b', false otherwise.
   */
  eq(a2, b) {
    return a2 === b;
  }
  /**
   * Squares a bigint value within the field.
   * This is a specific case of multiplication where the value is multiplied by itself,
   * optimized for performance where applicable.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value to square.
   * @returns The square of 'a' modulo the field's order.
   */
  square(a2) {
    return a2 * a2 % this._order;
  }
  /**
   * Compares two bigint values to determine if the first is less than the second,
   * taking into account the field's order for modular comparison.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' is less than 'b', false otherwise.
   */
  lt(a2, b) {
    const aa = a2 > this._half ? a2 - this._order : a2;
    const bb = b > this._half ? b - this._order : b;
    return aa < bb;
  }
  /**
   * Compares two bigint values to determine if the first is greater than or equal to the second,
   * considering the field's modular context.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' is greater than or equal to 'b', false otherwise.
   */
  geq(a2, b) {
    const aa = a2 > this._half ? a2 - this._order : a2;
    const bb = b > this._half ? b - this._order : b;
    return aa >= bb;
  }
  /**
   * Computes the negation of a bigint value within the field.
   * The result is the modular additive inverse that, when added to the original value,
   * yields zero in the field's modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value to negate.
   * @returns The negation of 'a' modulo the field's order.
   */
  neg(a2) {
    return a2 ? this._order - a2 : a2;
  }
  /**
   * Checks if a bigint value is zero within the context of the field.
   * @param a The value to check.
   * @returns True if 'a' is zero, false otherwise.
   */
  isZero(a2) {
    return a2 === this.zero;
  }
  /**
   * Raises a base to an exponent within the field, efficiently computing
   * scalar exponentiation using the square-and-multiply algorithm.
   * Supports both positive and negative exponents through the use of the `inv` method for negatives.
   * @param base The base to be exponentiated.
   * @param e The exponent.
   * @returns The result of raising 'base' to the power 'e' modulo the field's order.
   */
  pow(base, e) {
    if (isZero2(e)) {
      return this.one;
    }
    if (e < 0n) {
      base = this.inv(base);
      e = -e;
    }
    const n = bits2(e);
    if (n.length === 0) {
      return this.one;
    }
    let res = base;
    for (let i = n.length - 2; i >= 0; i -= 1) {
      res = this.square(res);
      if (n[i]) {
        res = this.mul(res, base);
      }
    }
    return res;
  }
};

// node_modules/@zk-kit/eddsa-poseidon/dist/index.js
var import_buffer7 = __toESM(require_buffer(), 1);
var import_poseidon5 = __toESM(require_poseidon5(), 1);
var zo = import_buffer7.Buffer.from([1]);
var oo = import_buffer7.Buffer.from([129]);
var sigma = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
  [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
  [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
  [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
  [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]
];
var u512 = [
  608135816,
  2242054355,
  320440878,
  57701188,
  2752067618,
  698298832,
  137296536,
  3964562569,
  1160258022,
  953160567,
  3193202383,
  887688300,
  3232508343,
  3380367581,
  1065670069,
  3041331479,
  2450970073,
  2306472731,
  3509652390,
  2564797868,
  805139163,
  3491422135,
  3101798381,
  1780907670,
  3128725573,
  4046225305,
  614570311,
  3012652279,
  134345442,
  2240740374,
  1667834072,
  1901547113
];
var padding = import_buffer7.Buffer.from([
  128,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]);
function rot(v, i, j, n) {
  let hi = v[i * 2] ^ v[j * 2];
  let lo = v[i * 2 + 1] ^ v[j * 2 + 1];
  if (n >= 32) {
    lo ^= hi;
    hi ^= lo;
    lo ^= hi;
    n -= 32;
  }
  if (n === 0) {
    v[i * 2] = hi >>> 0;
    v[i * 2 + 1] = lo >>> 0;
  } else {
    v[i * 2] = (hi >>> n | lo << 32 - n) >>> 0;
    v[i * 2 + 1] = (lo >>> n | hi << 32 - n) >>> 0;
  }
}
function g(v, m, i, a2, b, c, d2, e) {
  let lo;
  lo = v[a2 * 2 + 1] + ((m[sigma[i][e] * 2 + 1] ^ u512[sigma[i][e + 1] * 2 + 1]) >>> 0) + v[b * 2 + 1];
  v[a2 * 2] = v[a2 * 2] + ((m[sigma[i][e] * 2] ^ u512[sigma[i][e + 1] * 2]) >>> 0) + v[b * 2] + ~~(lo / 4294967296) >>> 0;
  v[a2 * 2 + 1] = lo >>> 0;
  rot(v, d2, a2, 32);
  lo = v[c * 2 + 1] + v[d2 * 2 + 1];
  v[c * 2] = v[c * 2] + v[d2 * 2] + ~~(lo / 4294967296) >>> 0;
  v[c * 2 + 1] = lo >>> 0;
  rot(v, b, c, 25);
  lo = v[a2 * 2 + 1] + ((m[sigma[i][e + 1] * 2 + 1] ^ u512[sigma[i][e] * 2 + 1]) >>> 0) + v[b * 2 + 1];
  v[a2 * 2] = v[a2 * 2] + ((m[sigma[i][e + 1] * 2] ^ u512[sigma[i][e] * 2]) >>> 0) + v[b * 2] + ~~(lo / 4294967296) >>> 0;
  v[a2 * 2 + 1] = lo >>> 0;
  rot(v, d2, a2, 16);
  lo = v[c * 2 + 1] + v[d2 * 2 + 1];
  v[c * 2] = v[c * 2] + v[d2 * 2] + ~~(lo / 4294967296) >>> 0;
  v[c * 2 + 1] = lo >>> 0;
  rot(v, b, c, 11);
}
function lengthCarry(arr) {
  for (let j = 0; j < arr.length; j += 1) {
    if (arr[j] < 4294967296)
      break;
    arr[j] -= 4294967296;
    arr[j + 1] += 1;
  }
}
var Blake512 = class {
  /**
   * Initializes a new Blake-512 hash instance with the default parameters.
   */
  constructor() {
    this._h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ];
    this._s = [0, 0, 0, 0, 0, 0, 0, 0];
    this._block = import_buffer7.Buffer.alloc(128);
    this._blockOffset = 0;
    this._length = [0, 0, 0, 0];
    this._nullt = false;
    this._zo = zo;
    this._oo = oo;
  }
  /**
   * The core compression function for Blake-512. It transforms the internal
   * state based on the input block and the current hash parameters.
   */
  _compress() {
    const v = new Array(32);
    const m = new Array(32);
    let i;
    for (i = 0; i < 32; i += 1)
      m[i] = this._block.readUInt32BE(i * 4);
    for (i = 0; i < 16; i += 1)
      v[i] = this._h[i] >>> 0;
    for (i = 16; i < 24; i += 1)
      v[i] = (this._s[i - 16] ^ u512[i - 16]) >>> 0;
    for (i = 24; i < 32; i += 1)
      v[i] = u512[i - 16];
    if (!this._nullt) {
      v[24] = (v[24] ^ this._length[1]) >>> 0;
      v[25] = (v[25] ^ this._length[0]) >>> 0;
      v[26] = (v[26] ^ this._length[1]) >>> 0;
      v[27] = (v[27] ^ this._length[0]) >>> 0;
      v[28] = (v[28] ^ this._length[3]) >>> 0;
      v[29] = (v[29] ^ this._length[2]) >>> 0;
      v[30] = (v[30] ^ this._length[3]) >>> 0;
      v[31] = (v[31] ^ this._length[2]) >>> 0;
    }
    for (i = 0; i < 16; i += 1) {
      g(v, m, i, 0, 4, 8, 12, 0);
      g(v, m, i, 1, 5, 9, 13, 2);
      g(v, m, i, 2, 6, 10, 14, 4);
      g(v, m, i, 3, 7, 11, 15, 6);
      g(v, m, i, 0, 5, 10, 15, 8);
      g(v, m, i, 1, 6, 11, 12, 10);
      g(v, m, i, 2, 7, 8, 13, 12);
      g(v, m, i, 3, 4, 9, 14, 14);
    }
    for (i = 0; i < 16; i += 1) {
      this._h[i % 8 * 2] = (this._h[i % 8 * 2] ^ v[i * 2]) >>> 0;
      this._h[i % 8 * 2 + 1] = (this._h[i % 8 * 2 + 1] ^ v[i * 2 + 1]) >>> 0;
    }
    for (i = 0; i < 8; i += 1) {
      this._h[i * 2] = (this._h[i * 2] ^ this._s[i % 4 * 2]) >>> 0;
      this._h[i * 2 + 1] = (this._h[i * 2 + 1] ^ this._s[i % 4 * 2 + 1]) >>> 0;
    }
  }
  /**
   * Adds padding to the message as per the Blake-512 specification, ensuring
   * the message length is a multiple of the block size.
   */
  _padding() {
    const len = this._length.slice();
    len[0] += this._blockOffset * 8;
    lengthCarry(len);
    const msglen = import_buffer7.Buffer.alloc(16);
    for (let i = 0; i < 4; i += 1)
      msglen.writeUInt32BE(len[3 - i], i * 4);
    if (this._blockOffset === 111) {
      this._length[0] -= 8;
      this.update(this._oo);
    } else {
      if (this._blockOffset < 111) {
        if (this._blockOffset === 0)
          this._nullt = true;
        this._length[0] -= (111 - this._blockOffset) * 8;
        this.update(padding.subarray(0, 111 - this._blockOffset));
      } else {
        this._length[0] -= (128 - this._blockOffset) * 8;
        this.update(padding.subarray(0, 128 - this._blockOffset));
        this._length[0] -= 111 * 8;
        this.update(padding.subarray(1, 1 + 111));
        this._nullt = true;
      }
      this.update(this._zo);
      this._length[0] -= 8;
    }
    this._length[0] -= 128;
    this.update(msglen);
  }
  /**
   * Completes the hash computation and returns the final hash value.
   * This method applies the necessary padding, performs the final compression,
   * and returns the hash output.
   * @returns The Blake-512 hash of the input data.
   */
  digest() {
    this._padding();
    const buffer = import_buffer7.Buffer.alloc(64);
    for (let i = 0; i < 16; i += 1)
      buffer.writeUInt32BE(this._h[i], i * 4);
    return buffer;
  }
  /**
   * Updates the hash with new data. This method can be called multiple
   * times to incrementally add data to the hash computation.
   * @param data The data to add to the hash.
   * @returns This instance, to allow method chaining.
   */
  update(data) {
    const block = this._block;
    let offset = 0;
    while (this._blockOffset + data.length - offset >= block.length) {
      for (let i = this._blockOffset; i < block.length; )
        block[i++] = data[offset++];
      this._length[0] += block.length * 8;
      lengthCarry(this._length);
      this._compress();
      this._blockOffset = 0;
    }
    while (offset < data.length)
      block[this._blockOffset++] = data[offset++];
    return this;
  }
};
function pruneBuffer(buff) {
  buff[0] &= 248;
  buff[31] &= 127;
  buff[31] |= 64;
  return buff;
}
function isPoint(point) {
  return isArray2(point) && point.length === 2 && isBigNumber2(point[0]) && isBigNumber2(point[1]);
}
function isSignature(signature) {
  return isObject2(signature) && Object.prototype.hasOwnProperty.call(signature, "R8") && Object.prototype.hasOwnProperty.call(signature, "S") && isPoint(signature.R8) && isBigNumber2(signature.S);
}
function checkPrivateKey(privateKey) {
  requireTypes2(privateKey, "privateKey", ["Buffer", "Uint8Array", "string"]);
  return import_buffer7.Buffer.from(privateKey);
}
function checkMessage(message) {
  requireTypes2(message, "message", ["bignumberish", "string"]);
  if (isBigNumberish2(message)) {
    return bigNumberishToBigInt(message);
  }
  return bufferToBigInt(import_buffer7.Buffer.from(message));
}
function hash(message) {
  const engine = new Blake512();
  engine.update(import_buffer7.Buffer.from(message));
  return engine.digest();
}
function deriveSecretScalar(privateKey) {
  privateKey = checkPrivateKey(privateKey);
  let hash$1 = hash(privateKey);
  hash$1 = hash$1.slice(0, 32);
  hash$1 = pruneBuffer(hash$1);
  return shiftRight2(leBufferToBigInt2(hash$1), BigInt(3)) % subOrder;
}
function derivePublicKey(privateKey) {
  const s = deriveSecretScalar(privateKey);
  return mulPointEscalar(Base8, s);
}
function signMessage(privateKey, message) {
  privateKey = checkPrivateKey(privateKey);
  message = checkMessage(message);
  const hash$1 = hash(privateKey);
  const sBuff = pruneBuffer(hash$1.slice(0, 32));
  const s = leBufferToBigInt2(sBuff);
  const A = mulPointEscalar(Base8, shiftRight2(s, BigInt(3)));
  const msgBuff = leBigIntToBuffer2(message, 32);
  const rBuff = hash(import_buffer7.Buffer.concat([hash$1.slice(32, 64), msgBuff]));
  const Fr2 = new F1Field2(subOrder);
  const r2 = Fr2.e(leBufferToBigInt2(rBuff));
  const R8 = mulPointEscalar(Base8, r2);
  const hm = (0, import_poseidon5.poseidon5)([R8[0], R8[1], A[0], A[1], message]);
  const S = Fr2.add(r2, Fr2.mul(hm, s));
  return { R8, S };
}
function verifySignature(message, signature, publicKey) {
  if (!isPoint(publicKey) || !isSignature(signature) || !inCurve(signature.R8) || !inCurve(publicKey) || BigInt(signature.S) >= subOrder) {
    return false;
  }
  message = checkMessage(message);
  const _signature = {
    R8: [BigInt(signature.R8[0]), BigInt(signature.R8[1])],
    S: BigInt(signature.S)
  };
  const _publicKey = [BigInt(publicKey[0]), BigInt(publicKey[1])];
  const hm = (0, import_poseidon5.poseidon5)([signature.R8[0], signature.R8[1], publicKey[0], publicKey[1], message]);
  const pLeft = mulPointEscalar(Base8, BigInt(signature.S));
  let pRight = mulPointEscalar(_publicKey, mul(hm, BigInt(8)));
  pRight = addPoint(_signature.R8, pRight);
  return Fr.eq(pLeft[0], pRight[0]) && Fr.eq(pLeft[1], pRight[1]);
}
function packPublicKey(publicKey) {
  if (!isPoint(publicKey) || !inCurve(publicKey)) {
    throw new Error("Invalid public key");
  }
  const _publicKey = [BigInt(publicKey[0]), BigInt(publicKey[1])];
  return packPoint(_publicKey);
}
var EdDSAPoseidon = class {
  /**
   * Initializes a new instance, deriving necessary cryptographic parameters from the provided private key.
   * If the private key is not passed as a parameter, a random 32-byte hexadecimal key is generated.
   *
   * The private key must be an instance of Buffer, Uint8Array or a string. The input will be used to
   * generate entropy and there is no limit in size.
   * The string is used as a set of raw bytes (in UTF-8) and is typically used to pass passwords or secret messages.
   * If you want to pass a bigint, a number or a hexadecimal, be sure to convert them to one of the supported types first.
   * The 'conversions' module in @zk-kit/utils provides a set of functions that may be useful in case you need to convert types.
   *
   * @param privateKey The private key used for signing and public key derivation.
   */
  constructor(privateKey = crypto_browser.getRandomValues(32)) {
    this.privateKey = privateKey;
    this.secretScalar = deriveSecretScalar(privateKey);
    this.publicKey = derivePublicKey(privateKey);
    this.packedPublicKey = packPublicKey(this.publicKey);
  }
  /**
   * Signs a given message using the private key and returns the signature.
   * @param message The message to be signed.
   * @returns The signature of the message.
   */
  signMessage(message) {
    return signMessage(this.privateKey, message);
  }
  /**
   * Verifies a signature against a message and the public key stored in this instance.
   * @param message The message whose signature is to be verified.
   * @param signature The signature to be verified.
   * @returns True if the signature is valid for the message and public key, false otherwise.
   */
  verifySignature(message, signature) {
    return verifySignature(message, signature, this.publicKey);
  }
};

// node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
var import_buffer9 = __toESM(require_buffer(), 1);

// node_modules/@zk-kit/utils/dist/lib.esm/type-checks.js
var import_buffer8 = __toESM(require_buffer(), 1);
var supportedTypes3 = [
  "number",
  "boolean",
  "string",
  "function",
  "Array",
  "Uint8Array",
  "Buffer",
  "object",
  "bigint",
  "stringified-bigint",
  "hexadecimal",
  "bignumber",
  "bignumberish"
];
function isNumber3(value) {
  return typeof value === "number";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isString3(value) {
  return typeof value === "string";
}
function isFunction3(value) {
  return typeof value === "function";
}
function isObject3(value) {
  return typeof value === "object";
}
function isArray3(value) {
  return isObject3(value) && Array.isArray(value);
}
function isUint8Array3(value) {
  return value instanceof Uint8Array;
}
function isBuffer3(value) {
  return import_buffer8.Buffer.isBuffer(value);
}
function isBigInt3(value) {
  return typeof value === "bigint";
}
function isStringifiedBigInt3(value) {
  if (!isString3(value)) {
    return false;
  }
  try {
    BigInt(value);
    return true;
  } catch {
    return false;
  }
}
function isHexadecimal3(value, prefix = true) {
  if (!isString3(value)) {
    return false;
  }
  if (prefix) {
    return /^(0x|0X)[0-9a-fA-F]+$/.test(value);
  }
  return /^[0-9a-fA-F]+$/.test(value);
}
function isBigNumber3(value) {
  return isBigInt3(value) || isStringifiedBigInt3(value);
}
function isBigNumberish3(value) {
  return isNumber3(value) || isBigInt3(value) || isStringifiedBigInt3(value) || isHexadecimal3(value) || isBuffer3(value) || isUint8Array3(value);
}
function isType3(value, type) {
  switch (type) {
    case "number":
      return isNumber3(value);
    case "boolean":
      return isBoolean(value);
    case "string":
      return isString3(value);
    case "function":
      return isFunction3(value);
    case "Array":
      return isArray3(value);
    case "Uint8Array":
      return isUint8Array3(value);
    case "Buffer":
      return isBuffer3(value);
    case "object":
      return isObject3(value);
    case "bigint":
      return isBigInt3(value);
    case "stringified-bigint":
      return isStringifiedBigInt3(value);
    case "hexadecimal":
      return isHexadecimal3(value);
    case "bignumber":
      return isBigNumber3(value);
    case "bignumberish":
      return isBigNumberish3(value);
    default:
      return false;
  }
}
function isSupportedType3(type) {
  return supportedTypes3.includes(type);
}

// node_modules/@zk-kit/utils/dist/lib.esm/error-handlers.js
function requireString3(parameterValue, parameterName) {
  if (!isString3(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not a string, received type: ${typeof parameterValue}`);
  }
}
function requireTypes3(parameterValue, parameterName, types) {
  for (const type of types) {
    if (!isSupportedType3(type)) {
      throw new Error(`Type '${type}' is not supported`);
    }
  }
  for (const type of types) {
    if (isType3(parameterValue, type)) {
      return;
    }
  }
  throw new TypeError(`Parameter '${parameterName}' is none of the following types: ${types.join(", ")}`);
}

// node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
function bufferToBase64(value) {
  requireTypes3(value, "value", ["Buffer", "Uint8Array"]);
  return import_buffer9.Buffer.from(value).toString("base64");
}
function base64ToBuffer(value) {
  requireString3(value, "value");
  return import_buffer9.Buffer.from(value, "base64");
}
function textToBase64(value) {
  requireString3(value, "value");
  return import_buffer9.Buffer.from(value, "utf8").toString("base64");
}

// node_modules/@semaphore-protocol/identity/dist/index.js
var import_poseidon2 = __toESM(require_poseidon2(), 1);
var Identity = class _Identity {
  /**
   * Initializes the class attributes based on a given private key, which must be text or a buffer.
   * If the private key is not passed as a parameter, a random private key will be generated.
   * The EdDSAPoseidon class is used to generate the secret scalar and the public key.
   * Additionally, the constructor computes a commitment of the public key using a hash function (Poseidon).
   *
   * @example
   * // Generates an identity.
   * const { privateKey, publicKey, commitment } = new Identity("private-key")
   * @example
   * // Generates an identity with a random private key.
   * const { privateKey, publicKey, commitment } = new Identity()
   *
   * @param privateKey The private key used to derive the public key (hexadecimal or string).
   */
  constructor(privateKey) {
    const eddsa = new EdDSAPoseidon(privateKey);
    this._privateKey = eddsa.privateKey;
    this._secretScalar = eddsa.secretScalar;
    this._publicKey = eddsa.publicKey;
    this._commitment = (0, import_poseidon2.poseidon2)(this._publicKey);
  }
  /**
   * Returns the private key.
   * @returns The private key as a buffer or text.
   */
  get privateKey() {
    return this._privateKey;
  }
  /**
   * Returns the secret scalar.
   * @returns The secret scalar as a bigint.
   */
  get secretScalar() {
    return this._secretScalar;
  }
  /**
   * Returns the public key as a Baby Jubjub {@link https://zkkit.pse.dev/types/_zk_kit_baby_jubjub.Point.html | Point}.
   * @returns The public key as a point.
   */
  get publicKey() {
    return this._publicKey;
  }
  /**
   * Returns the commitment hash of the public key.
   * @returns The commitment as a bigint.
   */
  get commitment() {
    return this._commitment;
  }
  /**
   * Returns the private key encoded as a base64 string.
   * @returns The private key as a base64 string.
   */
  export() {
    if (isString3(this._privateKey)) {
      return textToBase64(this._privateKey);
    }
    return bufferToBase64(this.privateKey);
  }
  /**
   * Returns a Semaphore identity based on a private key encoded as a base64 string.
   * The private key will be converted to a buffer, regardless of its original type.
   * @param privateKey The private key as a base64 string.
   * @returns The Semaphore identity.
   */
  static import(privateKey) {
    return new _Identity(base64ToBuffer(privateKey));
  }
  /**
   * Generates a signature for a given message using the private key.
   * This method demonstrates how to sign a message and could be used
   * for authentication or data integrity.
   *
   * @example
   * const identity = new Identity()
   * const signature = identity.signMessage("message")
   *
   * @param message The message to be signed.
   * @returns A {@link https://zkkit.pse.dev/types/_zk_kit_eddsa_poseidon.Signature.html | Signature} object containing the signature components.
   */
  signMessage(message) {
    return signMessage(this.privateKey, message);
  }
  /**
   * Verifies a signature against a given message and public key.
   * This static method allows for the verification of signatures without needing
   * an instance of the Identity class. It's useful for cases where you only have
   * the public key, the message and a signature, and need to verify if they match.
   *
   * @example
   * const identity = new Identity()
   * const signature = identity.signMessage("message")
   * Identity.verifySignature("message", signature, identity.publicKey)
   *
   * @param message The message that was signed.
   * @param signature The signature to verify.
   * @param publicKey The public key to use for verification.
   * @returns A boolean indicating whether the signature is valid.
   */
  static verifySignature(message, signature, publicKey) {
    return verifySignature(message, signature, publicKey);
  }
  /**
   * Generates the commitment from the given public key.
   * This static method is particularly useful after signature verification,
   * as it allows retrieval of the corresponding commitment associated with the public key.
   *
   * @example
   * const identity = new Identity()
   * Identity.generateCommitment(identity.publicKey)
   *
   * @param publicKey The public key to generate the commitment.
   * @returns The Semaphore identity commitment.
   */
  static generateCommitment(publicKey) {
    return (0, import_poseidon2.poseidon2)(publicKey);
  }
};
export {
  Identity
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@zk-kit/utils/dist/lib.esm/type-checks.js:
@zk-kit/utils/dist/lib.esm/error-handlers.js:
@zk-kit/utils/dist/lib.esm/conversions.js:
@zk-kit/utils/dist/lib.esm/scalar.js:
@zk-kit/utils/dist/lib.esm/f1-field.js:
@zk-kit/utils/dist/index.browser.js:
@zk-kit/utils/dist/lib.esm/type-checks.js:
@zk-kit/utils/dist/lib.esm/error-handlers.js:
@zk-kit/utils/dist/lib.esm/conversions.js:
@zk-kit/utils/dist/lib.esm/scalar.js:
@zk-kit/utils/dist/lib.esm/f1-field.js:
  (**
   * @module @zk-kit/utils
   * @version 1.2.1
   * @file Essential zero-knowledge utility library for JavaScript developers.
   * @copyright Ethereum Foundation 2024
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils}
  *)

@zk-kit/baby-jubjub/dist/index.js:
  (**
   * @module @zk-kit/baby-jubjub
   * @version 1.0.3
   * @file A JavaScript library for adding points to the curve.
   * @copyright Ethereum Foundation 2024
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/baby-jubjub}
  *)

@zk-kit/eddsa-poseidon/dist/index.js:
  (**
   * @module @zk-kit/eddsa-poseidon
   * @version 1.0.4
   * @file A JavaScript EdDSA library for secure signing and verification using Poseidon the Baby Jubjub elliptic curve.
   * @copyright Ethereum Foundation 2024
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/eddsa-poseidon}
  *)

@zk-kit/utils/dist/lib.esm/type-checks.js:
@zk-kit/utils/dist/lib.esm/error-handlers.js:
@zk-kit/utils/dist/lib.esm/conversions.js:
  (**
   * @module @zk-kit/utils
   * @version 1.3.0
   * @file Essential zero-knowledge utility library for JavaScript developers.
   * @copyright Ethereum Foundation 2025
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils}
  *)

@semaphore-protocol/identity/dist/index.js:
  (**
   * @module @semaphore-protocol/identity
   * @version 4.14.0
   * @file A library to create Semaphore identities.
   * @copyright Ethereum Foundation 2025
   * @license MIT
   * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/identity}
  *)
*/
