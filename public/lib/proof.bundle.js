var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength2;
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
    function byteLength2(b64) {
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
      var output2 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output2.push(tripletToBase64(tmp));
      }
      return output2.join("");
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
    exports.read = function(buffer, offset, isLE2, mLen, nBytes) {
      var e2, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE2 ? nBytes - 1 : 0;
      var d = isLE2 ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e2 = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e2 & (1 << -nBits) - 1;
      e2 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e2 === 0) {
        e2 = 1 - eBias;
      } else if (e2 === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e2 = e2 - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
    };
    exports.write = function(buffer, value, offset, isLE2, mLen, nBytes) {
      var e2, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE2 ? 0 : nBytes - 1;
      var d = isLE2 ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e2 = eMax;
      } else {
        e2 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e2)) < 1) {
          e2--;
          c *= 2;
        }
        if (e2 + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e2++;
          c /= 2;
        }
        if (e2 + eBias >= eMax) {
          m = 0;
          e2 = eMax;
        } else if (e2 + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e2 = e2 + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e2 = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e2 = e2 << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e2 & 255, i += d, e2 /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base642 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
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
      } catch (e2) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
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
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString2(value, encodingOrOffset);
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
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
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
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString2(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength2(string2, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string2, encoding);
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
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
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
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer2(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare2(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
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
    Buffer3.concat = function concat2(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength2(string2, encoding) {
      if (Buffer3.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
        );
      }
      const len = string2.length;
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
            return utf8ToBytes2(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength2;
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
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
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
    Buffer3.prototype.swap64 = function swap64() {
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
    Buffer3.prototype.toString = function toString3() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
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
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
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
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset, length) {
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
      const strLen = string2.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string2, offset, length) {
      return blitBuffer(utf8ToBytes2(string2, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string2, offset, length) {
      return blitBuffer(asciiToBytes(string2), buf, offset, length);
    }
    function base64Write(buf, string2, offset, length) {
      return blitBuffer(base64ToBytes(string2), buf, offset, length);
    }
    function ucs2Write(buf, string2, offset, length) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string2, offset, length, encoding) {
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
      if (string2.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset, length);
          case "base64":
            return base64Write(this, string2, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base642.fromByteArray(buf);
      } else {
        return base642.fromByteArray(buf.slice(start, end));
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
      const bytes2 = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes2.length - 1; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
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
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul2 = 1;
      let i = 0;
      while (++i < byteLength3 && (mul2 *= 256)) {
        val += this[offset + i] * mul2;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length);
      }
      let val = this[offset + --byteLength3];
      let mul2 = 1;
      while (byteLength3 > 0 && (mul2 *= 256)) {
        val += this[offset + --byteLength3] * mul2;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
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
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
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
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul2 = 1;
      let i = 0;
      while (++i < byteLength3 && (mul2 *= 256)) {
        val += this[offset + i] * mul2;
      }
      mul2 *= 128;
      if (val >= mul2) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      let i = byteLength3;
      let mul2 = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul2 *= 256)) {
        val += this[offset + --i] * mul2;
      }
      mul2 *= 128;
      if (val >= mul2) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
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
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
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
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let mul2 = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength3 && (mul2 *= 256)) {
        this[offset + i] = value / mul2 & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let i = byteLength3 - 1;
      let mul2 = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul2 *= 256)) {
        this[offset + i] = value / mul2 & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
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
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i = 0;
      let mul2 = 1;
      let sub2 = 0;
      this[offset] = value & 255;
      while (++i < byteLength3 && (mul2 *= 256)) {
        if (value < 0 && sub2 === 0 && this[offset + i - 1] !== 0) {
          sub2 = 1;
        }
        this[offset + i] = (value / mul2 >> 0) - sub2 & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i = byteLength3 - 1;
      let mul2 = 1;
      let sub2 = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul2 *= 256)) {
        if (value < 0 && sub2 === 0 && this[offset + i + 1] !== 0) {
          sub2 = 1;
        }
        this[offset + i] = (value / mul2 >> 0) - sub2 & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
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
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
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
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
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
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
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
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
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
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
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
        const bytes2 = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes2[i % len];
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
    function checkBounds(buf, offset, byteLength3) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
        boundsError(offset, buf.length - (byteLength3 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength3) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength3 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength3 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength3 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength3);
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
    function utf8ToBytes2(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length = string2.length;
      let leadSurrogate = null;
      const bytes2 = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes2.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes2.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes2.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes2.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
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
      return base642.toByteArray(base64clean(str));
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
      const alphabet2 = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet2[i] + alphabet2[j];
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

// node_modules/@zk-kit/utils/dist/lib.esm/proof-packing.js
function packGroth16Proof(proof) {
  return [
    proof.pi_a[0],
    proof.pi_a[1],
    proof.pi_b[0][1],
    proof.pi_b[0][0],
    proof.pi_b[1][1],
    proof.pi_b[1][0],
    proof.pi_c[0],
    proof.pi_c[1]
  ];
}
function unpackGroth16Proof(proof) {
  return {
    pi_a: [proof[0], proof[1]],
    pi_b: [
      [proof[3], proof[2]],
      [proof[5], proof[4]]
    ],
    pi_c: [proof[6], proof[7]],
    protocol: "groth16",
    curve: "bn128"
  };
}

// node_modules/@semaphore-protocol/utils/dist/lib.esm/semaphore-interface.json.js
var _format = "hh-sol-artifact-1";
var contractName = "Semaphore";
var sourceName = "contracts/Semaphore.sol";
var abi = [
  {
    inputs: [
      {
        internalType: "contract ISemaphoreVerifier",
        name: "_verifier",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "LeafAlreadyExists",
    type: "error"
  },
  {
    inputs: [],
    name: "LeafCannotBeZero",
    type: "error"
  },
  {
    inputs: [],
    name: "LeafDoesNotExist",
    type: "error"
  },
  {
    inputs: [],
    name: "LeafGreaterThanSnarkScalarField",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__CallerIsNotTheGroupAdmin",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__CallerIsNotThePendingGroupAdmin",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__GroupDoesNotExist",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__GroupHasNoMembers",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__InvalidProof",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__MerkleTreeDepthIsNotSupported",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__MerkleTreeRootIsExpired",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__MerkleTreeRootIsNotPartOfTheGroup",
    type: "error"
  },
  {
    inputs: [],
    name: "Semaphore__YouAreUsingTheSameNullifierTwice",
    type: "error"
  },
  {
    inputs: [],
    name: "WrongSiblingNodes",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "GroupAdminPending",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "GroupAdminUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    name: "GroupCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldMerkleTreeDuration",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMerkleTreeDuration",
        type: "uint256"
      }
    ],
    name: "GroupMerkleTreeDurationUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256"
      }
    ],
    name: "MemberAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256"
      }
    ],
    name: "MemberRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newIdentityCommitment",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256"
      }
    ],
    name: "MemberUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startIndex",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "identityCommitments",
        type: "uint256[]"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256"
      }
    ],
    name: "MembersAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeDepth",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifier",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "message",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "scope",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256[8]",
        name: "points",
        type: "uint256[8]"
      }
    ],
    name: "ProofValidated",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    name: "acceptGroupAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      }
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256[]",
        name: "identityCommitments",
        type: "uint256[]"
      }
    ],
    name: "addMembers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "merkleTreeDuration",
        type: "uint256"
      }
    ],
    name: "createGroup",
    outputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "createGroup",
    outputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "createGroup",
    outputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    name: "getGroupAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    name: "getMerkleTreeDepth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    name: "getMerkleTreeRoot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      }
    ],
    name: "getMerkleTreeSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "groupCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "groups",
    outputs: [
      {
        internalType: "uint256",
        name: "merkleTreeDuration",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      }
    ],
    name: "hasMember",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      }
    ],
    name: "indexOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      },
      {
        internalType: "uint256[]",
        name: "merkleProofSiblings",
        type: "uint256[]"
      }
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "updateGroupAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMerkleTreeDuration",
        type: "uint256"
      }
    ],
    name: "updateGroupMerkleTreeDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newIdentityCommitment",
        type: "uint256"
      },
      {
        internalType: "uint256[]",
        name: "merkleProofSiblings",
        type: "uint256[]"
      }
    ],
    name: "updateMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "merkleTreeDepth",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "merkleTreeRoot",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "nullifier",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "message",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "scope",
            type: "uint256"
          },
          {
            internalType: "uint256[8]",
            name: "points",
            type: "uint256[8]"
          }
        ],
        internalType: "struct ISemaphore.SemaphoreProof",
        name: "proof",
        type: "tuple"
      }
    ],
    name: "validateProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      {
        internalType: "contract ISemaphoreVerifier",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "merkleTreeDepth",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "merkleTreeRoot",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "nullifier",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "message",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "scope",
            type: "uint256"
          },
          {
            internalType: "uint256[8]",
            name: "points",
            type: "uint256[8]"
          }
        ],
        internalType: "struct ISemaphore.SemaphoreProof",
        name: "proof",
        type: "tuple"
      }
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
var bytecode = "0x608060405234801561001057600080fd5b5060405161204138038061204183398101604081905261002f91610054565b600380546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b611fae806100936000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80636389e107116100b8578063a9961c941161007c578063a9961c94146102b5578063d0d898dd146102de578063d24924fe146102f1578063da3cda52146102fa578063dabc4d511461030d578063fcf0b6ec1461032057600080fd5b80636389e1071461022c5780636cdd32fe1461024f5780637ee35a0c1461026257806390509d441461028257806396324bd41461029557600080fd5b80634178c4d5116100ff5780634178c4d5146101c8578063456f4188146101db578063568ee826146101fe578063575185ed146102115780635c3f3b601461021957600080fd5b8063042453711461013c57806306dd8485146101515780631783efc3146101775780632b7ac3f31461018a5780632c880363146101b5575b600080fd5b61014f61014a366004611a0e565b610333565b005b61016461015f366004611a5a565b610366565b6040519081526020015b60405180910390f35b61014f610185366004611a5a565b610387565b60035461019d906001600160a01b031681565b6040516001600160a01b03909116815260200161016e565b6101646101c3366004611a98565b6103b8565b61014f6101d6366004611ac2565b6103f0565b6101ee6101e9366004611b23565b610427565b604051901515815260200161016e565b61014f61020c366004611b5d565b61068c565b61016461069a565b610164610227366004611b89565b6106d1565b61016461023a366004611ba4565b60009081526020819052604090206001015490565b61014f61025d366004611bbd565b61070a565b610164610270366004611ba4565b60009081526020819052604090205490565b6101ee610290366004611a5a565b61073f565b6101646102a3366004611ba4565b60046020526000908152604090205481565b61019d6102c3366004611ba4565b6000908152600160205260409020546001600160a01b031690565b61014f6102ec366004611b23565b610761565b61016460055481565b61014f610308366004611ba4565b61084b565b61016461031b366004611ba4565b610857565b61014f61032e366004611a5a565b61087b565b600061034084848461090b565b600094855260046020908152604080872092875260019092019052909320429055505050565b600082815260208190526040812061037e90836109a9565b90505b92915050565b600061039383836109f6565b6000938452600460209081526040808620928652600190920190529092204290555050565b60058054600091826103c983611c26565b9190505590506103d98184610a98565b600081815260046020526040902091909155919050565b60006103ff8686868686610b22565b6000968752600460209081526040808920928952600190920190529095204290555050505050565b60008281526001602052604081205483906001600160a01b031661045e5760405163029f057960e01b815260040160405180910390fd5b60018335108061046f575060208335115b1561048d5760405163767b278960e11b815260040160405180910390fd5b600084815260208190526040812054908190036104bd5760405163c8b02e0160e01b815260040160405180910390fd5b60006104c886610857565b90508085602001351461054d576000868152600460208181526040808420898301358552600181018352908420548a855292909152549091829003610520576040516326994ac360e11b815260040160405180910390fd5b61052a8183611c3f565b42111561054a576040516309581a9960e41b815260040160405180910390fd5b50505b60035460408051808201825260a0880135815260c088013560208083019190915282516080808201855260e08b01358286019081526101008c0135606080850191909152908352855180870187526101208d013581526101408d01358186015283850152855180870187526101608d013581526101808d01358186015286519283018752848d013583528c870135948301949094526001600160a01b039096169563a23f019995929392820190610606908d0135610be9565b81526020016106188c60800135610be9565b90526040516001600160e01b031960e087901b16815261064194939291908c3590600401611cb4565b602060405180830381865afa15801561065e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106829190611d47565b9695505050505050565b6106968282610c20565b5050565b60058054600091826106ab83611c26565b9190505590506106bb8133610a98565b6000818152600460205260409020610e10905590565b60058054600091826106e283611c26565b9190505590506106f28183610a98565b6000818152600460205260409020610e109055919050565b600061071885858585610cb4565b60009586526004602090815260408088209288526001909201905290942042905550505050565b600082815260208181526040808320848452600301909152812054151561037e565b600082815260046020908152604080832084820135845260020190915290205460ff16156107a25760405163041162bd60e31b815260040160405180910390fd5b6107ac8282610427565b6107c95760405163012a9af160e61b815260040160405180910390fd5b6000828152600460209081526040808320848201358085526002909101835292819020805460ff1916600117905551608084013592918401359185917f0c32e14cfe81a05d371c248d22de6b7ae849e981b76a1f8842e7b6da73fc405a9161083f918735919060608901359060a08a0190611d70565b60405180910390a45050565b61085481610d72565b50565b60008181526020818152604080832060018101548452600201909152812054610381565b60008281526001602052604090205482906001600160a01b031633146108b4576040516317737e4f60e31b815260040160405180910390fd5b60008381526004602090815260409182902080549085905582518181529182018590529185917f264b2a8f6763c084235fe832ba903482b2ef1a521336881fc75b987c2dfd29c5910160405180910390a250505050565b60008381526001602052604081205484906001600160a01b03163314610944576040516317737e4f60e31b815260040160405180910390fd5b6000858152602081905260409020805490610960908686610e17565b9250857f61e5e8054e3daf084a0c6c646c065e8bf5e7ca4d5567bda942309bd1652f349d828787876040516109989493929190611d98565b60405180910390a250509392505050565b600081815260038301602052604081205481036109d957604051631c811d5b60e21b815260040160405180910390fd5b600082815260038401602052604090205461037e90600190611dde565b60008281526001602052604081205483906001600160a01b03163314610a2f576040516317737e4f60e31b815260040160405180910390fd5b6000848152602081905260409020805490610a4a9085611344565b604080518381526020810187905290810182905290935085907f19239b3f93cd10558aaf11423af70c77763bf54f52bcc75bfa74d4d13548cde99060600160405180910390a2505092915050565b60008281526001602052604080822080546001600160a01b0319166001600160a01b0385161790555183917ff0adfb94eab6daf835deb69c5738fe636150c3dfd08094a76f39b963dc8cb05a91a26040516001600160a01b0382169060009084907f0ba83579a0e79193ef649b9f5a8759d35af086ba62a3e207b52e4a8ae30d49e3908390a45050565b60008581526001602052604081205486906001600160a01b03163314610b5b576040516317737e4f60e31b815260040160405180910390fd5b6000878152602081905260408120610b7390886109a9565b6000898152602081905260409020909150610b91908888888861150d565b60408051838152602081018a90529081018890526060810182905290935088907fea3588e4a2a0c93d6a0e69dfeaf7496f43ccccf02ad9ce0a5b7627cbca4b61b19060800160405180910390a2505095945050505050565b6000600882604051602001610c0091815260200190565b60408051601f198184030181529190528051602090910120901c92915050565b60008281526001602052604090205482906001600160a01b03163314610c59576040516317737e4f60e31b815260040160405180910390fd5b60008381526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590519091339186917f1018365553cce55d9cb02ef73e18cc9311894f3fe1d1eafd235ac2d26cd8ba5891a4505050565b60008481526001602052604081205485906001600160a01b03163314610ced576040516317737e4f60e31b815260040160405180910390fd5b6000868152602081905260408120610d0590876109a9565b6000888152602081905260409020909150610d22908787876119a9565b604080518381526020810189905290810182905290935087907f3108849c053c77b8073a11256dffb5ffd5b55e93e105a355e1c9061db890d8719060600160405180910390a25050949350505050565b6000818152600260205260409020546001600160a01b03163314610da9576040516334c4245d60e01b815260040160405180910390fd5b60008181526001602090815260408083208054336001600160a01b031980831682179093556002909452828520805490921690915590516001600160a01b0390911692839185917f0ba83579a0e79193ef649b9f5a8759d35af086ba62a3e207b52e4a8ae30d49e391a45050565b8254600090815b83811015610f4857600080516020611f59833981519152858583818110610e4757610e47611c52565b9050602002013510610e6c576040516361c0541760e11b815260040160405180910390fd5b848482818110610e7e57610e7e611c52565b90506020020135600003610ea5576040516314b48df160e11b815260040160405180910390fd5b610eda86868684818110610ebb57610ebb611c52565b9050602002013560009081526003919091016020526040902054151590565b15610ef8576040516312c50cad60e11b815260040160405180910390fd5b80610f04836001611c3f565b610f0e9190611c3f565b866003016000878785818110610f2657610f26611c52565b6020908102929092013583525081019190915260400160002055600101610e1e565b50606084848080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050506001880154919250505b610f918584611c3f565b610f9c826002611ed5565b1015610fb257610fab81611c26565b9050610f87565b60018701819055826000610fc68783611c3f565b9050600182811c90600090610fdb8185611dde565b610fe7911c6001611c3f565b905060005b858110156112d85760006110008484611dde565b905060008167ffffffffffffffff81111561101d5761101d611ee1565b604051908082528060200260200182016040528015611046578160200160208202803683370190505b50905060005b82811015611203576000886110618884611c3f565b61106c906002611ef7565b101561108f578f60020160008681526020019081526020016000205490506110cb565b8a8961109b8985611c3f565b6110a6906002611ef7565b6110b09190611dde565b815181106110c0576110c0611c52565b602002602001015190505b6000886110d88985611c3f565b6110e3906002611ef7565b6110ee906001611c3f565b101561113b578b8a6111008a86611c3f565b61110b906002611ef7565b611116906001611c3f565b6111209190611dde565b8151811061113057611130611c52565b602002602001015190505b600081156111d357604080518082018252848152602081018490529051632b0aac7f60e11b815273__$75f79a42d9bcbdbb69ad79ebd80f556f39$__9163561558fe9161118b9190600401611f0e565b602060405180830381865af41580156111a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111cc9190611f3f565b90506111d6565b50815b808585815181106111e9576111e9611c52565b60200260200101818152505083600101935050505061104c565b5085600116600103611254578860018a5161121e9190611dde565b8151811061122e5761122e611c52565b60200260200101518e60020160008581526020019081526020016000208190555061129f565b60018951111561129f578860028a5161126d9190611dde565b8151811061127d5761127d611c52565b60200260200101518e6002016000858152602001908152602001600020819055505b849650600185901c9450809850839550600180856112bd9190611dde565b6112c9911c6001611c3f565b93508260010192505050610fec565b506112e38988611c3f565b8b55855186906000906112f8576112f8611c52565b60200260200101518b6002016000878152602001908152602001600020819055508560008151811061132c5761132c611c52565b60200260200101519750505050505050509392505050565b6000600080516020611f598339815191528210611374576040516361c0541760e11b815260040160405180910390fd5b81600003611395576040516314b48df160e11b815260040160405180910390fd5b6000828152600384016020526040902054156113c4576040516312c50cad60e11b815260040160405180910390fd5b8254600180850154906113d8908390611c3f565b6113e3826002611ed5565b10156113f5576113f281611c26565b90505b600185018190558360005b828110156114d2578084901c6001166001036114b657604080518082018252600083815260028a0160209081529083902054825281018490529051632b0aac7f60e11b815273__$75f79a42d9bcbdbb69ad79ebd80f556f39$__9163561558fe9161146e9190600401611f0e565b602060405180830381865af415801561148b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114af9190611f3f565b91506114ca565b600081815260028801602052604090208290555b600101611400565b506114dc83611c26565b8087556000928352600287016020908152604080852084905596845260039097019096529390209390935550919050565b6000600080516020611f59833981519152841061153d576040516361c0541760e11b815260040160405180910390fd5b600085815260038701602052604090205461156b57604051631c811d5b60e21b815260040160405180910390fd5b60008481526003870160205260409020541561159a576040516312c50cad60e11b815260040160405180910390fd5b60006115a687876109a9565b8754909150859087906000906115be90600190611dde565b60018b0154909150600090815b81811015611920578087901c60011660010361177e57600080516020611f598339815191528a8a8581811061160257611602611c52565b9050602002013510611627576040516361c0541760e11b815260040160405180910390fd5b73__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808d8d8881811061165e5761165e611c52565b905060200201358152602001898152506040518263ffffffff1660e01b815260040161168a9190611f0e565b602060405180830381865af41580156116a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116cb9190611f3f565b955073__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808d8d8881811061170457611704611c52565b905060200201358152602001888152506040518263ffffffff1660e01b81526004016117309190611f0e565b602060405180830381865af415801561174d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117719190611f3f565b9450826001019250611918565b86811c84821c1461190457600080516020611f598339815191528a8a858181106117aa576117aa611c52565b90506020020135106117cf576040516361c0541760e11b815260040160405180910390fd5b600081815260028e0160205260409020548590036117fb57600081815260028e01602052604090208690555b73__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808981526020018d8d8881811061183857611838611c52565b905060200201358152506040518263ffffffff1660e01b815260040161185e9190611f0e565b602060405180830381865af415801561187b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189f9190611f3f565b955073__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808881526020018d8d888181106118de576118de611c52565b905060200201358152506040518263ffffffff1660e01b81526004016117309190611f0e565b600081815260028e01602052604090208690555b6001016115cb565b5060018c0154600090815260028d016020526040902054841461195657604051631fd4986360e11b815260040160405180910390fd5b600081815260028d016020526040902085905589156119885760008b815260038d016020526040808220548c83529120555b505050600088815260038a0160205260408120555091505095945050505050565b60006119b985856000868661150d565b95945050505050565b60008083601f8401126119d457600080fd5b50813567ffffffffffffffff8111156119ec57600080fd5b6020830191508360208260051b8501011115611a0757600080fd5b9250929050565b600080600060408486031215611a2357600080fd5b83359250602084013567ffffffffffffffff811115611a4157600080fd5b611a4d868287016119c2565b9497909650939450505050565b60008060408385031215611a6d57600080fd5b50508035926020909101359150565b80356001600160a01b0381168114611a9357600080fd5b919050565b60008060408385031215611aab57600080fd5b611ab483611a7c565b946020939093013593505050565b600080600080600060808688031215611ada57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff811115611b0657600080fd5b611b12888289016119c2565b969995985093965092949392505050565b6000808284036101c0811215611b3857600080fd5b833592506101a0601f1982011215611b4f57600080fd5b506020830190509250929050565b60008060408385031215611b7057600080fd5b82359150611b8060208401611a7c565b90509250929050565b600060208284031215611b9b57600080fd5b61037e82611a7c565b600060208284031215611bb657600080fd5b5035919050565b60008060008060608587031215611bd357600080fd5b8435935060208501359250604085013567ffffffffffffffff811115611bf857600080fd5b611c04878288016119c2565b95989497509550505050565b634e487b7160e01b600052601160045260246000fd5b600060018201611c3857611c38611c10565b5060010190565b8082018082111561038157610381611c10565b634e487b7160e01b600052603260045260246000fd5b8060005b6002811015611c8b578151845260209384019390910190600101611c6c565b50505050565b8060005b6004811015611c8b578151845260209384019390910190600101611c95565b6101a08101611cc38288611c68565b6040808301876000805b6002808210611cdc5750611d16565b835185845b83811015611cff578251825260209283019290910190600101611ce1565b505050938501935060209290920191600101611ccd565b5050505050611d2860c0830186611c68565b611d36610100830185611c91565b826101808301529695505050505050565b600060208284031215611d5957600080fd5b81518015158114611d6957600080fd5b9392505050565b8481526020810184905260408101839052610160810161010083606084013795945050505050565b848152606060208201819052810183905260006001600160fb1b03841115611dbf57600080fd5b8360051b80866080850137604083019390935250016080019392505050565b8181038181111561038157610381611c10565b600181815b80851115611e2c578160001904821115611e1257611e12611c10565b80851615611e1f57918102915b93841c9390800290611df6565b509250929050565b600082611e4357506001610381565b81611e5057506000610381565b8160018114611e665760028114611e7057611e8c565b6001915050610381565b60ff841115611e8157611e81611c10565b50506001821b610381565b5060208310610133831016604e8410600b8410161715611eaf575081810a610381565b611eb98383611df1565b8060001904821115611ecd57611ecd611c10565b029392505050565b600061037e8383611e34565b634e487b7160e01b600052604160045260246000fd5b808202811582820484141761038157610381611c10565b60408101818360005b6002811015611f36578151835260209283019290910190600101611f17565b50505092915050565b600060208284031215611f5157600080fd5b505191905056fe30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001a264697066735822122084e705462004ac3836e73fc250636bb9e4adb10992b32ba2998bce788eb1639f64736f6c63430008170033";
var deployedBytecode = "0x608060405234801561001057600080fd5b50600436106101375760003560e01c80636389e107116100b8578063a9961c941161007c578063a9961c94146102b5578063d0d898dd146102de578063d24924fe146102f1578063da3cda52146102fa578063dabc4d511461030d578063fcf0b6ec1461032057600080fd5b80636389e1071461022c5780636cdd32fe1461024f5780637ee35a0c1461026257806390509d441461028257806396324bd41461029557600080fd5b80634178c4d5116100ff5780634178c4d5146101c8578063456f4188146101db578063568ee826146101fe578063575185ed146102115780635c3f3b601461021957600080fd5b8063042453711461013c57806306dd8485146101515780631783efc3146101775780632b7ac3f31461018a5780632c880363146101b5575b600080fd5b61014f61014a366004611a0e565b610333565b005b61016461015f366004611a5a565b610366565b6040519081526020015b60405180910390f35b61014f610185366004611a5a565b610387565b60035461019d906001600160a01b031681565b6040516001600160a01b03909116815260200161016e565b6101646101c3366004611a98565b6103b8565b61014f6101d6366004611ac2565b6103f0565b6101ee6101e9366004611b23565b610427565b604051901515815260200161016e565b61014f61020c366004611b5d565b61068c565b61016461069a565b610164610227366004611b89565b6106d1565b61016461023a366004611ba4565b60009081526020819052604090206001015490565b61014f61025d366004611bbd565b61070a565b610164610270366004611ba4565b60009081526020819052604090205490565b6101ee610290366004611a5a565b61073f565b6101646102a3366004611ba4565b60046020526000908152604090205481565b61019d6102c3366004611ba4565b6000908152600160205260409020546001600160a01b031690565b61014f6102ec366004611b23565b610761565b61016460055481565b61014f610308366004611ba4565b61084b565b61016461031b366004611ba4565b610857565b61014f61032e366004611a5a565b61087b565b600061034084848461090b565b600094855260046020908152604080872092875260019092019052909320429055505050565b600082815260208190526040812061037e90836109a9565b90505b92915050565b600061039383836109f6565b6000938452600460209081526040808620928652600190920190529092204290555050565b60058054600091826103c983611c26565b9190505590506103d98184610a98565b600081815260046020526040902091909155919050565b60006103ff8686868686610b22565b6000968752600460209081526040808920928952600190920190529095204290555050505050565b60008281526001602052604081205483906001600160a01b031661045e5760405163029f057960e01b815260040160405180910390fd5b60018335108061046f575060208335115b1561048d5760405163767b278960e11b815260040160405180910390fd5b600084815260208190526040812054908190036104bd5760405163c8b02e0160e01b815260040160405180910390fd5b60006104c886610857565b90508085602001351461054d576000868152600460208181526040808420898301358552600181018352908420548a855292909152549091829003610520576040516326994ac360e11b815260040160405180910390fd5b61052a8183611c3f565b42111561054a576040516309581a9960e41b815260040160405180910390fd5b50505b60035460408051808201825260a0880135815260c088013560208083019190915282516080808201855260e08b01358286019081526101008c0135606080850191909152908352855180870187526101208d013581526101408d01358186015283850152855180870187526101608d013581526101808d01358186015286519283018752848d013583528c870135948301949094526001600160a01b039096169563a23f019995929392820190610606908d0135610be9565b81526020016106188c60800135610be9565b90526040516001600160e01b031960e087901b16815261064194939291908c3590600401611cb4565b602060405180830381865afa15801561065e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106829190611d47565b9695505050505050565b6106968282610c20565b5050565b60058054600091826106ab83611c26565b9190505590506106bb8133610a98565b6000818152600460205260409020610e10905590565b60058054600091826106e283611c26565b9190505590506106f28183610a98565b6000818152600460205260409020610e109055919050565b600061071885858585610cb4565b60009586526004602090815260408088209288526001909201905290942042905550505050565b600082815260208181526040808320848452600301909152812054151561037e565b600082815260046020908152604080832084820135845260020190915290205460ff16156107a25760405163041162bd60e31b815260040160405180910390fd5b6107ac8282610427565b6107c95760405163012a9af160e61b815260040160405180910390fd5b6000828152600460209081526040808320848201358085526002909101835292819020805460ff1916600117905551608084013592918401359185917f0c32e14cfe81a05d371c248d22de6b7ae849e981b76a1f8842e7b6da73fc405a9161083f918735919060608901359060a08a0190611d70565b60405180910390a45050565b61085481610d72565b50565b60008181526020818152604080832060018101548452600201909152812054610381565b60008281526001602052604090205482906001600160a01b031633146108b4576040516317737e4f60e31b815260040160405180910390fd5b60008381526004602090815260409182902080549085905582518181529182018590529185917f264b2a8f6763c084235fe832ba903482b2ef1a521336881fc75b987c2dfd29c5910160405180910390a250505050565b60008381526001602052604081205484906001600160a01b03163314610944576040516317737e4f60e31b815260040160405180910390fd5b6000858152602081905260409020805490610960908686610e17565b9250857f61e5e8054e3daf084a0c6c646c065e8bf5e7ca4d5567bda942309bd1652f349d828787876040516109989493929190611d98565b60405180910390a250509392505050565b600081815260038301602052604081205481036109d957604051631c811d5b60e21b815260040160405180910390fd5b600082815260038401602052604090205461037e90600190611dde565b60008281526001602052604081205483906001600160a01b03163314610a2f576040516317737e4f60e31b815260040160405180910390fd5b6000848152602081905260409020805490610a4a9085611344565b604080518381526020810187905290810182905290935085907f19239b3f93cd10558aaf11423af70c77763bf54f52bcc75bfa74d4d13548cde99060600160405180910390a2505092915050565b60008281526001602052604080822080546001600160a01b0319166001600160a01b0385161790555183917ff0adfb94eab6daf835deb69c5738fe636150c3dfd08094a76f39b963dc8cb05a91a26040516001600160a01b0382169060009084907f0ba83579a0e79193ef649b9f5a8759d35af086ba62a3e207b52e4a8ae30d49e3908390a45050565b60008581526001602052604081205486906001600160a01b03163314610b5b576040516317737e4f60e31b815260040160405180910390fd5b6000878152602081905260408120610b7390886109a9565b6000898152602081905260409020909150610b91908888888861150d565b60408051838152602081018a90529081018890526060810182905290935088907fea3588e4a2a0c93d6a0e69dfeaf7496f43ccccf02ad9ce0a5b7627cbca4b61b19060800160405180910390a2505095945050505050565b6000600882604051602001610c0091815260200190565b60408051601f198184030181529190528051602090910120901c92915050565b60008281526001602052604090205482906001600160a01b03163314610c59576040516317737e4f60e31b815260040160405180910390fd5b60008381526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590519091339186917f1018365553cce55d9cb02ef73e18cc9311894f3fe1d1eafd235ac2d26cd8ba5891a4505050565b60008481526001602052604081205485906001600160a01b03163314610ced576040516317737e4f60e31b815260040160405180910390fd5b6000868152602081905260408120610d0590876109a9565b6000888152602081905260409020909150610d22908787876119a9565b604080518381526020810189905290810182905290935087907f3108849c053c77b8073a11256dffb5ffd5b55e93e105a355e1c9061db890d8719060600160405180910390a25050949350505050565b6000818152600260205260409020546001600160a01b03163314610da9576040516334c4245d60e01b815260040160405180910390fd5b60008181526001602090815260408083208054336001600160a01b031980831682179093556002909452828520805490921690915590516001600160a01b0390911692839185917f0ba83579a0e79193ef649b9f5a8759d35af086ba62a3e207b52e4a8ae30d49e391a45050565b8254600090815b83811015610f4857600080516020611f59833981519152858583818110610e4757610e47611c52565b9050602002013510610e6c576040516361c0541760e11b815260040160405180910390fd5b848482818110610e7e57610e7e611c52565b90506020020135600003610ea5576040516314b48df160e11b815260040160405180910390fd5b610eda86868684818110610ebb57610ebb611c52565b9050602002013560009081526003919091016020526040902054151590565b15610ef8576040516312c50cad60e11b815260040160405180910390fd5b80610f04836001611c3f565b610f0e9190611c3f565b866003016000878785818110610f2657610f26611c52565b6020908102929092013583525081019190915260400160002055600101610e1e565b50606084848080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050506001880154919250505b610f918584611c3f565b610f9c826002611ed5565b1015610fb257610fab81611c26565b9050610f87565b60018701819055826000610fc68783611c3f565b9050600182811c90600090610fdb8185611dde565b610fe7911c6001611c3f565b905060005b858110156112d85760006110008484611dde565b905060008167ffffffffffffffff81111561101d5761101d611ee1565b604051908082528060200260200182016040528015611046578160200160208202803683370190505b50905060005b82811015611203576000886110618884611c3f565b61106c906002611ef7565b101561108f578f60020160008681526020019081526020016000205490506110cb565b8a8961109b8985611c3f565b6110a6906002611ef7565b6110b09190611dde565b815181106110c0576110c0611c52565b602002602001015190505b6000886110d88985611c3f565b6110e3906002611ef7565b6110ee906001611c3f565b101561113b578b8a6111008a86611c3f565b61110b906002611ef7565b611116906001611c3f565b6111209190611dde565b8151811061113057611130611c52565b602002602001015190505b600081156111d357604080518082018252848152602081018490529051632b0aac7f60e11b815273__$75f79a42d9bcbdbb69ad79ebd80f556f39$__9163561558fe9161118b9190600401611f0e565b602060405180830381865af41580156111a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111cc9190611f3f565b90506111d6565b50815b808585815181106111e9576111e9611c52565b60200260200101818152505083600101935050505061104c565b5085600116600103611254578860018a5161121e9190611dde565b8151811061122e5761122e611c52565b60200260200101518e60020160008581526020019081526020016000208190555061129f565b60018951111561129f578860028a5161126d9190611dde565b8151811061127d5761127d611c52565b60200260200101518e6002016000858152602001908152602001600020819055505b849650600185901c9450809850839550600180856112bd9190611dde565b6112c9911c6001611c3f565b93508260010192505050610fec565b506112e38988611c3f565b8b55855186906000906112f8576112f8611c52565b60200260200101518b6002016000878152602001908152602001600020819055508560008151811061132c5761132c611c52565b60200260200101519750505050505050509392505050565b6000600080516020611f598339815191528210611374576040516361c0541760e11b815260040160405180910390fd5b81600003611395576040516314b48df160e11b815260040160405180910390fd5b6000828152600384016020526040902054156113c4576040516312c50cad60e11b815260040160405180910390fd5b8254600180850154906113d8908390611c3f565b6113e3826002611ed5565b10156113f5576113f281611c26565b90505b600185018190558360005b828110156114d2578084901c6001166001036114b657604080518082018252600083815260028a0160209081529083902054825281018490529051632b0aac7f60e11b815273__$75f79a42d9bcbdbb69ad79ebd80f556f39$__9163561558fe9161146e9190600401611f0e565b602060405180830381865af415801561148b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114af9190611f3f565b91506114ca565b600081815260028801602052604090208290555b600101611400565b506114dc83611c26565b8087556000928352600287016020908152604080852084905596845260039097019096529390209390935550919050565b6000600080516020611f59833981519152841061153d576040516361c0541760e11b815260040160405180910390fd5b600085815260038701602052604090205461156b57604051631c811d5b60e21b815260040160405180910390fd5b60008481526003870160205260409020541561159a576040516312c50cad60e11b815260040160405180910390fd5b60006115a687876109a9565b8754909150859087906000906115be90600190611dde565b60018b0154909150600090815b81811015611920578087901c60011660010361177e57600080516020611f598339815191528a8a8581811061160257611602611c52565b9050602002013510611627576040516361c0541760e11b815260040160405180910390fd5b73__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808d8d8881811061165e5761165e611c52565b905060200201358152602001898152506040518263ffffffff1660e01b815260040161168a9190611f0e565b602060405180830381865af41580156116a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116cb9190611f3f565b955073__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808d8d8881811061170457611704611c52565b905060200201358152602001888152506040518263ffffffff1660e01b81526004016117309190611f0e565b602060405180830381865af415801561174d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117719190611f3f565b9450826001019250611918565b86811c84821c1461190457600080516020611f598339815191528a8a858181106117aa576117aa611c52565b90506020020135106117cf576040516361c0541760e11b815260040160405180910390fd5b600081815260028e0160205260409020548590036117fb57600081815260028e01602052604090208690555b73__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808981526020018d8d8881811061183857611838611c52565b905060200201358152506040518263ffffffff1660e01b815260040161185e9190611f0e565b602060405180830381865af415801561187b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189f9190611f3f565b955073__$75f79a42d9bcbdbb69ad79ebd80f556f39$__63561558fe60405180604001604052808881526020018d8d888181106118de576118de611c52565b905060200201358152506040518263ffffffff1660e01b81526004016117309190611f0e565b600081815260028e01602052604090208690555b6001016115cb565b5060018c0154600090815260028d016020526040902054841461195657604051631fd4986360e11b815260040160405180910390fd5b600081815260028d016020526040902085905589156119885760008b815260038d016020526040808220548c83529120555b505050600088815260038a0160205260408120555091505095945050505050565b60006119b985856000868661150d565b95945050505050565b60008083601f8401126119d457600080fd5b50813567ffffffffffffffff8111156119ec57600080fd5b6020830191508360208260051b8501011115611a0757600080fd5b9250929050565b600080600060408486031215611a2357600080fd5b83359250602084013567ffffffffffffffff811115611a4157600080fd5b611a4d868287016119c2565b9497909650939450505050565b60008060408385031215611a6d57600080fd5b50508035926020909101359150565b80356001600160a01b0381168114611a9357600080fd5b919050565b60008060408385031215611aab57600080fd5b611ab483611a7c565b946020939093013593505050565b600080600080600060808688031215611ada57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff811115611b0657600080fd5b611b12888289016119c2565b969995985093965092949392505050565b6000808284036101c0811215611b3857600080fd5b833592506101a0601f1982011215611b4f57600080fd5b506020830190509250929050565b60008060408385031215611b7057600080fd5b82359150611b8060208401611a7c565b90509250929050565b600060208284031215611b9b57600080fd5b61037e82611a7c565b600060208284031215611bb657600080fd5b5035919050565b60008060008060608587031215611bd357600080fd5b8435935060208501359250604085013567ffffffffffffffff811115611bf857600080fd5b611c04878288016119c2565b95989497509550505050565b634e487b7160e01b600052601160045260246000fd5b600060018201611c3857611c38611c10565b5060010190565b8082018082111561038157610381611c10565b634e487b7160e01b600052603260045260246000fd5b8060005b6002811015611c8b578151845260209384019390910190600101611c6c565b50505050565b8060005b6004811015611c8b578151845260209384019390910190600101611c95565b6101a08101611cc38288611c68565b6040808301876000805b6002808210611cdc5750611d16565b835185845b83811015611cff578251825260209283019290910190600101611ce1565b505050938501935060209290920191600101611ccd565b5050505050611d2860c0830186611c68565b611d36610100830185611c91565b826101808301529695505050505050565b600060208284031215611d5957600080fd5b81518015158114611d6957600080fd5b9392505050565b8481526020810184905260408101839052610160810161010083606084013795945050505050565b848152606060208201819052810183905260006001600160fb1b03841115611dbf57600080fd5b8360051b80866080850137604083019390935250016080019392505050565b8181038181111561038157610381611c10565b600181815b80851115611e2c578160001904821115611e1257611e12611c10565b80851615611e1f57918102915b93841c9390800290611df6565b509250929050565b600082611e4357506001610381565b81611e5057506000610381565b8160018114611e665760028114611e7057611e8c565b6001915050610381565b60ff841115611e8157611e81611c10565b50506001821b610381565b5060208310610133831016604e8410600b8410161715611eaf575081810a610381565b611eb98383611df1565b8060001904821115611ecd57611ecd611c10565b029392505050565b600061037e8383611e34565b634e487b7160e01b600052604160045260246000fd5b808202811582820484141761038157610381611c10565b60408101818360005b6002811015611f36578151835260209283019290910190600101611f17565b50505092915050565b600060208284031215611f5157600080fd5b505191905056fe30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001a264697066735822122084e705462004ac3836e73fc250636bb9e4adb10992b32ba2998bce788eb1639f64736f6c63430008170033";
var linkReferences = {
  "poseidon-solidity/PoseidonT3.sol": {
    PoseidonT3: [
      {
        length: 20,
        start: 4599
      },
      {
        length: 20,
        start: 5338
      },
      {
        length: 20,
        start: 5820
      },
      {
        length: 20,
        start: 5986
      },
      {
        length: 20,
        start: 6288
      },
      {
        length: 20,
        start: 6454
      }
    ]
  }
};
var deployedLinkReferences = {
  "poseidon-solidity/PoseidonT3.sol": {
    PoseidonT3: [
      {
        length: 20,
        start: 4452
      },
      {
        length: 20,
        start: 5191
      },
      {
        length: 20,
        start: 5673
      },
      {
        length: 20,
        start: 5839
      },
      {
        length: 20,
        start: 6141
      },
      {
        length: 20,
        start: 6307
      }
    ]
  }
};
var _interface = {
  _format,
  contractName,
  sourceName,
  abi,
  bytecode,
  deployedBytecode,
  linkReferences,
  deployedLinkReferences
};

// node_modules/@semaphore-protocol/utils/dist/lib.esm/constants.js
var MIN_DEPTH = 1;
var MAX_DEPTH = 32;
var SemaphoreABI = _interface.abi;
var SemaphoreBytecode = _interface.bytecode;

// node_modules/@zk-kit/artifacts/dist/index.browser.js
var Project;
(function(Project2) {
  Project2["POSEIDON"] = "poseidon";
  Project2["SEMAPHORE"] = "semaphore";
  Project2["SEMAPHORE_IDENTITY"] = "semaphore-identity";
})(Project || (Project = {}));
var projects = Object.values(Project).sort();
var BASE_URL = "https://snark-artifacts.pse.dev";
var getBaseUrl = (project, version2) => `${BASE_URL}/${project}/${version2}/${project}`;
async function maybeGetSnarkArtifacts(project, options = {}) {
  if (!projects.includes(project))
    throw new Error(`Project '${project}' is not supported`);
  options.version ?? (options.version = "latest");
  const url = getBaseUrl(project, options.version);
  const parameters = options.parameters ? `-${options.parameters.join("-")}` : "";
  return {
    wasm: `${url}${parameters}.wasm`,
    zkey: `${url}${parameters}.zkey`
  };
}

// node_modules/@zk-kit/utils/dist/lib.esm/type-checks.js
var import_buffer = __toESM(require_buffer(), 1);
var supportedTypes = [
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
function isDefined(value) {
  return typeof value !== "undefined";
}
function isNumber(value) {
  return typeof value === "number";
}
function isBoolean(value) {
  return typeof value === "boolean";
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
    case "boolean":
      return isBoolean(value);
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

// node_modules/@zk-kit/utils/dist/lib.esm/error-handlers.js
function requireDefined(parameterValue, parameterName) {
  if (!isDefined(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not defined`);
  }
}
function requireNumber(parameterValue, parameterName) {
  if (!isNumber(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not a number, received type: ${typeof parameterValue}`);
  }
}
function requireString(parameterValue, parameterName) {
  if (!isString(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not a string, received type: ${typeof parameterValue}`);
  }
}
function requireArray(parameterValue, parameterName) {
  if (!isArray(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not an Array instance`);
  }
}
function requireObject(parameterValue, parameterName) {
  if (!isObject(parameterValue)) {
    throw new TypeError(`Parameter '${parameterName}' is not an object, received type: ${typeof parameterValue}`);
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

// node_modules/snarkjs/node_modules/ffjavascript/build/browser.esm.js
var hexLen = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
function fromString(s, radix) {
  if (!radix || radix == 10) {
    return BigInt(s);
  } else if (radix == 16) {
    if (s.slice(0, 2) == "0x") {
      return BigInt(s);
    } else {
      return BigInt("0x" + s);
    }
  }
}
var e = fromString;
function fromArray(a, radix) {
  let acc = BigInt(0);
  radix = BigInt(radix);
  for (let i = 0; i < a.length; i++) {
    acc = acc * radix + BigInt(a[i]);
  }
  return acc;
}
function bitLength$6(a) {
  const aS = a.toString(16);
  return (aS.length - 1) * 4 + hexLen[parseInt(aS[0], 16)];
}
function isNegative$4(a) {
  return BigInt(a) < BigInt(0);
}
function isZero$1(a) {
  return !a;
}
function shiftLeft(a, n) {
  return BigInt(a) << BigInt(n);
}
function shiftRight(a, n) {
  return BigInt(a) >> BigInt(n);
}
var shl = shiftLeft;
var shr = shiftRight;
function isOdd$5(a) {
  return (BigInt(a) & BigInt(1)) == BigInt(1);
}
function naf(n) {
  let E = BigInt(n);
  const res = [];
  while (E) {
    if (E & BigInt(1)) {
      const z = 2 - Number(E % BigInt(4));
      res.push(z);
      E = E - BigInt(z);
    } else {
      res.push(0);
    }
    E = E >> BigInt(1);
  }
  return res;
}
function bits(n) {
  let E = BigInt(n);
  const res = [];
  while (E) {
    if (E & BigInt(1)) {
      res.push(1);
    } else {
      res.push(0);
    }
    E = E >> BigInt(1);
  }
  return res;
}
function toNumber$1(s) {
  if (s > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Number too big");
  }
  return Number(s);
}
function toArray(s, radix) {
  const res = [];
  let rem = BigInt(s);
  radix = BigInt(radix);
  while (rem) {
    res.unshift(Number(rem % radix));
    rem = rem / radix;
  }
  return res;
}
function add(a, b) {
  return BigInt(a) + BigInt(b);
}
function sub(a, b) {
  return BigInt(a) - BigInt(b);
}
function neg(a) {
  return -BigInt(a);
}
function mul(a, b) {
  return BigInt(a) * BigInt(b);
}
function square$2(a) {
  return BigInt(a) * BigInt(a);
}
function pow(a, b) {
  return BigInt(a) ** BigInt(b);
}
function exp$1(a, b) {
  return BigInt(a) ** BigInt(b);
}
function abs$1(a) {
  return BigInt(a) >= 0 ? BigInt(a) : -BigInt(a);
}
function div(a, b) {
  return BigInt(a) / BigInt(b);
}
function mod(a, b) {
  return BigInt(a) % BigInt(b);
}
function eq(a, b) {
  return BigInt(a) == BigInt(b);
}
function neq(a, b) {
  return BigInt(a) != BigInt(b);
}
function lt(a, b) {
  return BigInt(a) < BigInt(b);
}
function gt(a, b) {
  return BigInt(a) > BigInt(b);
}
function leq(a, b) {
  return BigInt(a) <= BigInt(b);
}
function geq(a, b) {
  return BigInt(a) >= BigInt(b);
}
function band(a, b) {
  return BigInt(a) & BigInt(b);
}
function bor(a, b) {
  return BigInt(a) | BigInt(b);
}
function bxor(a, b) {
  return BigInt(a) ^ BigInt(b);
}
function land(a, b) {
  return BigInt(a) && BigInt(b);
}
function lor(a, b) {
  return BigInt(a) || BigInt(b);
}
function lnot(a) {
  return !BigInt(a);
}
function toRprLE(buff, o, e2, n8) {
  const s = "0000000" + e2.toString(16);
  const v = new Uint32Array(buff.buffer, buff.byteOffset + o, n8 / 4);
  const l = ((s.length - 7) * 4 - 1 >> 5) + 1;
  for (let i = 0; i < l; i++) v[i] = parseInt(s.substring(s.length - 8 * i - 8, s.length - 8 * i), 16);
  for (let i = l; i < v.length; i++) v[i] = 0;
  for (let i = v.length * 4; i < n8; i++) buff[i] = toNumber$1(band(shiftRight(e2, i * 8), 255));
}
function toRprBE(buff, o, e2, n8) {
  const s = "0000000" + e2.toString(16);
  const v = new DataView(buff.buffer, buff.byteOffset + o, n8);
  const l = ((s.length - 7) * 4 - 1 >> 5) + 1;
  for (let i = 0; i < l; i++) v.setUint32(n8 - i * 4 - 4, parseInt(s.substring(s.length - 8 * i - 8, s.length - 8 * i), 16), false);
  for (let i = 0; i < n8 / 4 - l; i++) v[i] = 0;
}
function fromRprLE(buff, o, n8) {
  n8 = n8 || buff.byteLength;
  o = o || 0;
  const v = new Uint32Array(buff.buffer, buff.byteOffset + o, n8 / 4);
  const a = new Array(n8 / 4);
  v.forEach((ch, i) => a[a.length - i - 1] = ch.toString(16).padStart(8, "0"));
  return fromString(a.join(""), 16);
}
function fromRprBE(buff, o, n8) {
  n8 = n8 || buff.byteLength;
  o = o || 0;
  const v = new DataView(buff.buffer, buff.byteOffset + o, n8);
  const a = new Array(n8 / 4);
  for (let i = 0; i < n8 / 4; i++) {
    a[i] = v.getUint32(i * 4, false).toString(16).padStart(8, "0");
  }
  return fromString(a.join(""), 16);
}
function toString(a, radix) {
  return a.toString(radix);
}
function toLEBuff(a) {
  const buff = new Uint8Array(Math.floor((bitLength$6(a) - 1) / 8) + 1);
  toRprLE(buff, 0, a, buff.byteLength);
  return buff;
}
var zero = e(0);
var one = e(1);
var _Scalar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  abs: abs$1,
  add,
  band,
  bitLength: bitLength$6,
  bits,
  bor,
  bxor,
  div,
  e,
  eq,
  exp: exp$1,
  fromArray,
  fromRprBE,
  fromRprLE,
  fromString,
  geq,
  gt,
  isNegative: isNegative$4,
  isOdd: isOdd$5,
  isZero: isZero$1,
  land,
  leq,
  lnot,
  lor,
  lt,
  mod,
  mul,
  naf,
  neg,
  neq,
  one,
  pow,
  shiftLeft,
  shiftRight,
  shl,
  shr,
  square: square$2,
  sub,
  toArray,
  toLEBuff,
  toNumber: toNumber$1,
  toRprBE,
  toRprLE,
  toString,
  zero
});
var _revTable$1 = [];
for (let i = 0; i < 256; i++) {
  _revTable$1[i] = _revSlow$1(i, 8);
}
function _revSlow$1(idx, bits2) {
  let res = 0;
  let a = idx;
  for (let i = 0; i < bits2; i++) {
    res <<= 1;
    res = res | a & 1;
    a >>= 1;
  }
  return res;
}
function exp(F, base, e2) {
  if (isZero$1(e2)) return F.one;
  const n = bits(e2);
  if (n.length == 0) return F.one;
  let res = base;
  for (let i = n.length - 2; i >= 0; i--) {
    res = F.square(res);
    if (n[i]) {
      res = F.mul(res, base);
    }
  }
  return res;
}
function buildSqrt(F) {
  if (F.m % 2 == 1) {
    if (eq(mod(F.p, 4), 1)) {
      if (eq(mod(F.p, 8), 1)) {
        if (eq(mod(F.p, 16), 1)) {
          alg5_tonelliShanks(F);
        } else if (eq(mod(F.p, 16), 9)) {
          alg4_kong(F);
        } else {
          throw new Error("Field withot sqrt");
        }
      } else if (eq(mod(F.p, 8), 5)) {
        alg3_atkin(F);
      } else {
        throw new Error("Field withot sqrt");
      }
    } else if (eq(mod(F.p, 4), 3)) {
      alg2_shanks(F);
    }
  } else {
    const pm2mod4 = mod(pow(F.p, F.m / 2), 4);
    if (pm2mod4 == 1) {
      alg10_adj(F);
    } else if (pm2mod4 == 3) {
      alg9_adj(F);
    } else {
      alg8_complex(F);
    }
  }
}
function alg5_tonelliShanks(F) {
  F.sqrt_q = pow(F.p, F.m);
  F.sqrt_s = 0;
  F.sqrt_t = sub(F.sqrt_q, 1);
  while (!isOdd$5(F.sqrt_t)) {
    F.sqrt_s = F.sqrt_s + 1;
    F.sqrt_t = div(F.sqrt_t, 2);
  }
  let c0 = F.one;
  while (F.eq(c0, F.one)) {
    const c = F.random();
    F.sqrt_z = F.pow(c, F.sqrt_t);
    c0 = F.pow(F.sqrt_z, 2 ** (F.sqrt_s - 1));
  }
  F.sqrt_tm1d2 = div(sub(F.sqrt_t, 1), 2);
  F.sqrt = function(a) {
    const F2 = this;
    if (F2.isZero(a)) return F2.zero;
    let w = F2.pow(a, F2.sqrt_tm1d2);
    const a0 = F2.pow(F2.mul(F2.square(w), a), 2 ** (F2.sqrt_s - 1));
    if (F2.eq(a0, F2.negone)) return null;
    let v = F2.sqrt_s;
    let x = F2.mul(a, w);
    let b = F2.mul(x, w);
    let z = F2.sqrt_z;
    while (!F2.eq(b, F2.one)) {
      let b2k = F2.square(b);
      let k = 1;
      while (!F2.eq(b2k, F2.one)) {
        b2k = F2.square(b2k);
        k++;
      }
      w = z;
      for (let i = 0; i < v - k - 1; i++) {
        w = F2.square(w);
      }
      z = F2.square(w);
      b = F2.mul(b, z);
      x = F2.mul(x, w);
      v = k;
    }
    return F2.geq(x, F2.zero) ? x : F2.neg(x);
  };
}
function alg4_kong(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 4 not implemented");
  };
}
function alg3_atkin(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 3 not implemented");
  };
}
function alg2_shanks(F) {
  F.sqrt_q = pow(F.p, F.m);
  F.sqrt_e1 = div(sub(F.sqrt_q, 3), 4);
  F.sqrt = function(a) {
    if (this.isZero(a)) return this.zero;
    const a1 = this.pow(a, this.sqrt_e1);
    const a0 = this.mul(this.square(a1), a);
    if (this.eq(a0, this.negone)) return null;
    const x = this.mul(a1, a);
    return F.geq(x, F.zero) ? x : F.neg(x);
  };
}
function alg10_adj(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 10 not implemented");
  };
}
function alg9_adj(F) {
  F.sqrt_q = pow(F.p, F.m / 2);
  F.sqrt_e34 = div(sub(F.sqrt_q, 3), 4);
  F.sqrt_e12 = div(sub(F.sqrt_q, 1), 2);
  F.frobenius = function(n, x) {
    if (n % 2 == 1) {
      return F.conjugate(x);
    } else {
      return x;
    }
  };
  F.sqrt = function(a) {
    const F2 = this;
    const a1 = F2.pow(a, F2.sqrt_e34);
    const alfa = F2.mul(F2.square(a1), a);
    const a0 = F2.mul(F2.frobenius(1, alfa), alfa);
    if (F2.eq(a0, F2.negone)) return null;
    const x0 = F2.mul(a1, a);
    let x;
    if (F2.eq(alfa, F2.negone)) {
      x = F2.mul(x0, [F2.F.zero, F2.F.one]);
    } else {
      const b = F2.pow(F2.add(F2.one, alfa), F2.sqrt_e12);
      x = F2.mul(b, x0);
    }
    return F2.geq(x, F2.zero) ? x : F2.neg(x);
  };
}
function alg8_complex(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 8 not implemented");
  };
}
function quarterRound(st, a, b, c, d) {
  st[a] = st[a] + st[b] >>> 0;
  st[d] = (st[d] ^ st[a]) >>> 0;
  st[d] = (st[d] << 16 | st[d] >>> 16 & 65535) >>> 0;
  st[c] = st[c] + st[d] >>> 0;
  st[b] = (st[b] ^ st[c]) >>> 0;
  st[b] = (st[b] << 12 | st[b] >>> 20 & 4095) >>> 0;
  st[a] = st[a] + st[b] >>> 0;
  st[d] = (st[d] ^ st[a]) >>> 0;
  st[d] = (st[d] << 8 | st[d] >>> 24 & 255) >>> 0;
  st[c] = st[c] + st[d] >>> 0;
  st[b] = (st[b] ^ st[c]) >>> 0;
  st[b] = (st[b] << 7 | st[b] >>> 25 & 127) >>> 0;
}
function doubleRound(st) {
  quarterRound(st, 0, 4, 8, 12);
  quarterRound(st, 1, 5, 9, 13);
  quarterRound(st, 2, 6, 10, 14);
  quarterRound(st, 3, 7, 11, 15);
  quarterRound(st, 0, 5, 10, 15);
  quarterRound(st, 1, 6, 11, 12);
  quarterRound(st, 2, 7, 8, 13);
  quarterRound(st, 3, 4, 9, 14);
}
var ChaCha = class {
  constructor(seed) {
    seed = seed || [0, 0, 0, 0, 0, 0, 0, 0];
    this.state = [
      1634760805,
      857760878,
      2036477234,
      1797285236,
      seed[0],
      seed[1],
      seed[2],
      seed[3],
      seed[4],
      seed[5],
      seed[6],
      seed[7],
      0,
      0,
      0,
      0
    ];
    this.idx = 16;
    this.buff = new Array(16);
  }
  nextU32() {
    if (this.idx == 16) this.update();
    return this.buff[this.idx++];
  }
  nextU64() {
    return add(mul(this.nextU32(), 4294967296), this.nextU32());
  }
  nextBool() {
    return (this.nextU32() & 1) == 1;
  }
  update() {
    for (let i = 0; i < 16; i++) this.buff[i] = this.state[i];
    for (let i = 0; i < 10; i++) doubleRound(this.buff);
    for (let i = 0; i < 16; i++) this.buff[i] = this.buff[i] + this.state[i] >>> 0;
    this.idx = 0;
    this.state[12] = this.state[12] + 1 >>> 0;
    if (this.state[12] != 0) return;
    this.state[13] = this.state[13] + 1 >>> 0;
    if (this.state[13] != 0) return;
    this.state[14] = this.state[14] + 1 >>> 0;
    if (this.state[14] != 0) return;
    this.state[15] = this.state[15] + 1 >>> 0;
  }
};
function getRandomBytes(n) {
  let array = new Uint8Array(n);
  {
    if (typeof globalThis.crypto !== "undefined") {
      globalThis.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < n; i++) {
        array[i] = Math.random() * 4294967296 >>> 0;
      }
    }
  }
  return array;
}
function getRandomSeed() {
  const arr = getRandomBytes(32);
  const arrV = new Uint32Array(arr.buffer);
  const seed = [];
  for (let i = 0; i < 8; i++) {
    seed.push(arrV[i]);
  }
  return seed;
}
var threadRng = null;
function getThreadRng() {
  if (threadRng) return threadRng;
  threadRng = new ChaCha(getRandomSeed());
  return threadRng;
}
var FFT = class {
  constructor(G, F, opMulGF) {
    this.F = F;
    this.G = G;
    this.opMulGF = opMulGF;
    let rem = F.sqrt_t || F.t;
    let s = F.sqrt_s || F.s;
    let nqr = F.one;
    while (F.eq(F.pow(nqr, F.half), F.one)) nqr = F.add(nqr, F.one);
    this.w = new Array(s + 1);
    this.wi = new Array(s + 1);
    this.w[s] = this.F.pow(nqr, rem);
    this.wi[s] = this.F.inv(this.w[s]);
    let n = s - 1;
    while (n >= 0) {
      this.w[n] = this.F.square(this.w[n + 1]);
      this.wi[n] = this.F.square(this.wi[n + 1]);
      n--;
    }
    this.roots = [];
    this._setRoots(Math.min(s, 15));
  }
  _setRoots(n) {
    for (let i = n; i >= 0 && !this.roots[i]; i--) {
      let r = this.F.one;
      const nroots = 1 << i;
      const rootsi = new Array(nroots);
      for (let j = 0; j < nroots; j++) {
        rootsi[j] = r;
        r = this.F.mul(r, this.w[i]);
      }
      this.roots[i] = rootsi;
    }
  }
  fft(p) {
    if (p.length <= 1) return p;
    const bits2 = log2$1(p.length - 1) + 1;
    this._setRoots(bits2);
    const m = 1 << bits2;
    if (p.length != m) {
      throw new Error("Size must be multiple of 2");
    }
    const res = __fft(this, p, bits2, 0, 1);
    return res;
  }
  ifft(p) {
    if (p.length <= 1) return p;
    const bits2 = log2$1(p.length - 1) + 1;
    this._setRoots(bits2);
    const m = 1 << bits2;
    if (p.length != m) {
      throw new Error("Size must be multiple of 2");
    }
    const res = __fft(this, p, bits2, 0, 1);
    const twoinvm = this.F.inv(this.F.mulScalar(this.F.one, m));
    const resn = new Array(m);
    for (let i = 0; i < m; i++) {
      resn[i] = this.opMulGF(res[(m - i) % m], twoinvm);
    }
    return resn;
  }
};
function log2$1(V) {
  return ((V & 4294901760) !== 0 ? (V &= 4294901760, 16) : 0) | ((V & 4278255360) !== 0 ? (V &= 4278255360, 8) : 0) | ((V & 4042322160) !== 0 ? (V &= 4042322160, 4) : 0) | ((V & 3435973836) !== 0 ? (V &= 3435973836, 2) : 0) | (V & 2863311530) !== 0;
}
function __fft(PF, pall, bits2, offset, step) {
  const n = 1 << bits2;
  if (n == 1) {
    return [pall[offset]];
  } else if (n == 2) {
    return [
      PF.G.add(pall[offset], pall[offset + step]),
      PF.G.sub(pall[offset], pall[offset + step])
    ];
  }
  const ndiv2 = n >> 1;
  const p1 = __fft(PF, pall, bits2 - 1, offset, step * 2);
  const p2 = __fft(PF, pall, bits2 - 1, offset + step, step * 2);
  const out = new Array(n);
  for (let i = 0; i < ndiv2; i++) {
    out[i] = PF.G.add(p1[i], PF.opMulGF(p2[i], PF.roots[bits2][i]));
    out[i + ndiv2] = PF.G.sub(p1[i], PF.opMulGF(p2[i], PF.roots[bits2][i]));
  }
  return out;
}
var ZqField = class {
  constructor(p) {
    this.type = "F1";
    this.one = BigInt(1);
    this.zero = BigInt(0);
    this.p = BigInt(p);
    this.m = 1;
    this.negone = this.p - this.one;
    this.two = BigInt(2);
    this.half = this.p >> this.one;
    this.bitLength = bitLength$6(this.p);
    this.mask = (this.one << BigInt(this.bitLength)) - this.one;
    this.n64 = Math.floor((this.bitLength - 1) / 64) + 1;
    this.n32 = this.n64 * 2;
    this.n8 = this.n64 * 8;
    this.R = this.e(this.one << BigInt(this.n64 * 64));
    this.Ri = this.inv(this.R);
    const e2 = this.negone >> this.one;
    this.nqr = this.two;
    let r = this.pow(this.nqr, e2);
    while (!this.eq(r, this.negone)) {
      this.nqr = this.nqr + this.one;
      r = this.pow(this.nqr, e2);
    }
    this.s = 0;
    this.t = this.negone;
    while ((this.t & this.one) == this.zero) {
      this.s = this.s + 1;
      this.t = this.t >> this.one;
    }
    this.nqr_to_t = this.pow(this.nqr, this.t);
    buildSqrt(this);
    this.FFT = new FFT(this, this, this.mul.bind(this));
    this.fft = this.FFT.fft.bind(this.FFT);
    this.ifft = this.FFT.ifft.bind(this.FFT);
    this.w = this.FFT.w;
    this.wi = this.FFT.wi;
    this.shift = this.square(this.nqr);
    this.k = this.exp(this.nqr, 2 ** this.s);
  }
  e(a, b) {
    let res;
    if (!b) {
      res = BigInt(a);
    } else if (b == 16) {
      res = BigInt("0x" + a);
    }
    if (res < 0) {
      let nres = -res;
      if (nres >= this.p) nres = nres % this.p;
      return this.p - nres;
    } else {
      return res >= this.p ? res % this.p : res;
    }
  }
  add(a, b) {
    const res = a + b;
    return res >= this.p ? res - this.p : res;
  }
  sub(a, b) {
    return a >= b ? a - b : this.p - b + a;
  }
  neg(a) {
    return a ? this.p - a : a;
  }
  mul(a, b) {
    return a * b % this.p;
  }
  mulScalar(base, s) {
    return base * this.e(s) % this.p;
  }
  square(a) {
    return a * a % this.p;
  }
  eq(a, b) {
    return a == b;
  }
  neq(a, b) {
    return a != b;
  }
  lt(a, b) {
    const aa = a > this.half ? a - this.p : a;
    const bb = b > this.half ? b - this.p : b;
    return aa < bb;
  }
  gt(a, b) {
    const aa = a > this.half ? a - this.p : a;
    const bb = b > this.half ? b - this.p : b;
    return aa > bb;
  }
  leq(a, b) {
    const aa = a > this.half ? a - this.p : a;
    const bb = b > this.half ? b - this.p : b;
    return aa <= bb;
  }
  geq(a, b) {
    const aa = a > this.half ? a - this.p : a;
    const bb = b > this.half ? b - this.p : b;
    return aa >= bb;
  }
  div(a, b) {
    return this.mul(a, this.inv(b));
  }
  idiv(a, b) {
    if (!b) throw new Error("Division by zero");
    return a / b;
  }
  inv(a) {
    if (!a) throw new Error("Division by zero");
    let t = this.zero;
    let r = this.p;
    let newt = this.one;
    let newr = a % this.p;
    while (newr) {
      let q = r / newr;
      [t, newt] = [newt, t - q * newt];
      [r, newr] = [newr, r - q * newr];
    }
    if (t < this.zero) t += this.p;
    return t;
  }
  mod(a, b) {
    return a % b;
  }
  pow(b, e2) {
    return exp(this, b, e2);
  }
  exp(b, e2) {
    return exp(this, b, e2);
  }
  band(a, b) {
    const res = a & b & this.mask;
    return res >= this.p ? res - this.p : res;
  }
  bor(a, b) {
    const res = (a | b) & this.mask;
    return res >= this.p ? res - this.p : res;
  }
  bxor(a, b) {
    const res = (a ^ b) & this.mask;
    return res >= this.p ? res - this.p : res;
  }
  bnot(a) {
    const res = a ^ this.mask;
    return res >= this.p ? res - this.p : res;
  }
  shl(a, b) {
    if (Number(b) < this.bitLength) {
      const res = a << b & this.mask;
      return res >= this.p ? res - this.p : res;
    } else {
      const nb = this.p - b;
      if (Number(nb) < this.bitLength) {
        return a >> nb;
      } else {
        return this.zero;
      }
    }
  }
  shr(a, b) {
    if (Number(b) < this.bitLength) {
      return a >> b;
    } else {
      const nb = this.p - b;
      if (Number(nb) < this.bitLength) {
        const res = a << nb & this.mask;
        return res >= this.p ? res - this.p : res;
      } else {
        return 0;
      }
    }
  }
  land(a, b) {
    return a && b ? this.one : this.zero;
  }
  lor(a, b) {
    return a || b ? this.one : this.zero;
  }
  lnot(a) {
    return a ? this.zero : this.one;
  }
  sqrt_old(n) {
    if (n == this.zero) return this.zero;
    const res = this.pow(n, this.negone >> this.one);
    if (res != this.one) return null;
    let m = this.s;
    let c = this.nqr_to_t;
    let t = this.pow(n, this.t);
    let r = this.pow(n, this.add(this.t, this.one) >> this.one);
    while (t != this.one) {
      let sq = this.square(t);
      let i = 1;
      while (sq != this.one) {
        i++;
        sq = this.square(sq);
      }
      let b = c;
      for (let j = 0; j < m - i - 1; j++) b = this.square(b);
      m = i;
      c = this.square(b);
      t = this.mul(t, c);
      r = this.mul(r, b);
    }
    if (r > this.p >> this.one) {
      r = this.neg(r);
    }
    return r;
  }
  normalize(a, b) {
    a = BigInt(a, b);
    if (a < 0) {
      let na = -a;
      if (na >= this.p) na = na % this.p;
      return this.p - na;
    } else {
      return a >= this.p ? a % this.p : a;
    }
  }
  random() {
    const nBytes = this.bitLength * 2 / 8;
    let res = this.zero;
    for (let i = 0; i < nBytes; i++) {
      res = (res << BigInt(8)) + BigInt(getRandomBytes(1)[0]);
    }
    return res % this.p;
  }
  toString(a, base) {
    base = base || 10;
    let vs;
    if (a > this.half && base == 10) {
      const v = this.p - a;
      vs = "-" + v.toString(base);
    } else {
      vs = a.toString(base);
    }
    return vs;
  }
  isZero(a) {
    return a == this.zero;
  }
  fromRng(rng) {
    let v;
    do {
      v = this.zero;
      for (let i = 0; i < this.n64; i++) {
        v += rng.nextU64() << BigInt(64 * i);
      }
      v &= this.mask;
    } while (v >= this.p);
    v = v * this.Ri % this.p;
    return v;
  }
  fft(a) {
    return this.FFT.fft(a);
  }
  ifft(a) {
    return this.FFT.ifft(a);
  }
  // Returns a buffer with Little Endian Representation
  toRprLE(buff, o, e2) {
    toRprLE(buff, o, e2, this.n64 * 8);
  }
  // Returns a buffer with Big Endian Representation
  toRprBE(buff, o, e2) {
    toRprBE(buff, o, e2, this.n64 * 8);
  }
  // Returns a buffer with Big Endian Montgomery Representation
  toRprBEM(buff, o, e2) {
    return this.toRprBE(buff, o, this.mul(this.R, e2));
  }
  toRprLEM(buff, o, e2) {
    return this.toRprLE(buff, o, this.mul(this.R, e2));
  }
  // Pases a buffer with Little Endian Representation
  fromRprLE(buff, o) {
    return fromRprLE(buff, o, this.n8);
  }
  // Pases a buffer with Big Endian Representation
  fromRprBE(buff, o) {
    return fromRprBE(buff, o, this.n8);
  }
  fromRprLEM(buff, o) {
    return this.mul(this.fromRprLE(buff, o), this.Ri);
  }
  fromRprBEM(buff, o) {
    return this.mul(this.fromRprBE(buff, o), this.Ri);
  }
  toObject(a) {
    return a;
  }
};
var utils$6 = {};
utils$6.bigInt2BytesLE = function bigInt2BytesLE(_a, len) {
  const b = Array(len);
  let v = BigInt(_a);
  for (let i = 0; i < len; i++) {
    b[i] = Number(v & 0xFFn);
    v = v >> 8n;
  }
  return b;
};
utils$6.bigInt2U32LE = function bigInt2BytesLE2(_a, len) {
  const b = Array(len);
  let v = BigInt(_a);
  for (let i = 0; i < len; i++) {
    b[i] = Number(v & 0xFFFFFFFFn);
    v = v >> 32n;
  }
  return b;
};
utils$6.isOcamNum = function(a) {
  if (!Array.isArray(a)) return false;
  if (a.length != 3) return false;
  if (typeof a[0] !== "number") return false;
  if (typeof a[1] !== "number") return false;
  if (!Array.isArray(a[2])) return false;
  return true;
};
var build_int = function buildInt(module, n64, _prefix) {
  const prefix = _prefix || "int";
  if (module.modules[prefix]) return prefix;
  module.modules[prefix] = {};
  const n32 = n64 * 2;
  const n8 = n64 * 8;
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("px", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pr"),
          i * 8,
          c.i64_load(
            c.getLocal("px"),
            i * 8
          )
        )
      );
    }
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pr"),
          i * 8,
          c.i64_const(0)
        )
      );
    }
  }
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.i64_store(
        c.getLocal("pr"),
        0,
        c.i64_const(1)
      )
    );
    for (let i = 1; i < n64; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pr"),
          i * 8,
          c.i64_const(0)
        )
      );
    }
  }
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("px", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    function getCompCode(n) {
      if (n == 0) {
        return c.ret(c.i64_eqz(
          c.i64_load(c.getLocal("px"))
        ));
      }
      return c.if(
        c.i64_eqz(
          c.i64_load(c.getLocal("px"), n * 8)
        ),
        getCompCode(n - 1),
        c.ret(c.i32_const(0))
      );
    }
    f.addCode(getCompCode(n64 - 1));
    f.addCode(c.ret(c.i32_const(0)));
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("px", "i32");
    f.addParam("py", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    function getCompCode(n) {
      if (n == 0) {
        return c.ret(c.i64_eq(
          c.i64_load(c.getLocal("px")),
          c.i64_load(c.getLocal("py"))
        ));
      }
      return c.if(
        c.i64_eq(
          c.i64_load(c.getLocal("px"), n * 8),
          c.i64_load(c.getLocal("py"), n * 8)
        ),
        getCompCode(n - 1),
        c.ret(c.i32_const(0))
      );
    }
    f.addCode(getCompCode(n64 - 1));
    f.addCode(c.ret(c.i32_const(0)));
  }
  function buildGte() {
    const f = module.addFunction(prefix + "_gte");
    f.addParam("px", "i32");
    f.addParam("py", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    function getCompCode(n) {
      if (n == 0) {
        return c.ret(c.i64_ge_u(
          c.i64_load(c.getLocal("px")),
          c.i64_load(c.getLocal("py"))
        ));
      }
      return c.if(
        c.i64_lt_u(
          c.i64_load(c.getLocal("px"), n * 8),
          c.i64_load(c.getLocal("py"), n * 8)
        ),
        c.ret(c.i32_const(0)),
        c.if(
          c.i64_gt_u(
            c.i64_load(c.getLocal("px"), n * 8),
            c.i64_load(c.getLocal("py"), n * 8)
          ),
          c.ret(c.i32_const(1)),
          getCompCode(n - 1)
        )
      );
    }
    f.addCode(getCompCode(n64 - 1));
    f.addCode(c.ret(c.i32_const(0)));
  }
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.setReturnType("i32");
    f.addLocal("c", "i64");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal(
      "c",
      c.i64_add(
        c.i64_load32_u(c.getLocal("x")),
        c.i64_load32_u(c.getLocal("y"))
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("r"),
      c.getLocal("c")
    ));
    for (let i = 1; i < n32; i++) {
      f.addCode(c.setLocal(
        "c",
        c.i64_add(
          c.i64_add(
            c.i64_load32_u(c.getLocal("x"), 4 * i),
            c.i64_load32_u(c.getLocal("y"), 4 * i)
          ),
          c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
        )
      ));
      f.addCode(c.i64_store32(
        c.getLocal("r"),
        i * 4,
        c.getLocal("c")
      ));
    }
    f.addCode(c.i32_wrap_i64(c.i64_shr_u(c.getLocal("c"), c.i64_const(32))));
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.setReturnType("i32");
    f.addLocal("c", "i64");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal(
      "c",
      c.i64_sub(
        c.i64_load32_u(c.getLocal("x")),
        c.i64_load32_u(c.getLocal("y"))
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("r"),
      c.i64_and(
        c.getLocal("c"),
        c.i64_const("0xFFFFFFFF")
      )
    ));
    for (let i = 1; i < n32; i++) {
      f.addCode(c.setLocal(
        "c",
        c.i64_add(
          c.i64_sub(
            c.i64_load32_u(c.getLocal("x"), 4 * i),
            c.i64_load32_u(c.getLocal("y"), 4 * i)
          ),
          c.i64_shr_s(c.getLocal("c"), c.i64_const(32))
        )
      ));
      f.addCode(c.i64_store32(
        c.getLocal("r"),
        i * 4,
        c.i64_and(c.getLocal("c"), c.i64_const("0xFFFFFFFF"))
      ));
    }
    f.addCode(c.i32_wrap_i64(c.i64_shr_s(c.getLocal("c"), c.i64_const(32))));
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
      f.addLocal("y" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const loadX = [];
    const loadY = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadY[j]) {
        Y = c.teeLocal("y" + j, c.i64_load32_u(c.getLocal("y"), j * 4));
        loadY[j] = true;
      } else {
        Y = c.getLocal("y" + j);
      }
      return c.i64_mul(X, Y);
    }
    let c0 = "c0";
    let c1 = "c1";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      for (let i = Math.max(0, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      f.addCode(
        c.i64_store32(
          c.getLocal("r"),
          k * 4,
          c.getLocal(c0)
        )
      );
      [c0, c1] = [c1, c0];
      f.addCode(
        c.setLocal(
          c1,
          c.i64_shr_u(
            c.getLocal(c0),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 * 2 - 4,
        c.getLocal(c0)
      )
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    f.addLocal("c0_old", "i64");
    f.addLocal("c1_old", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const loadX = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadX[j]) {
        Y = c.teeLocal("x" + j, c.i64_load32_u(c.getLocal("x"), j * 4));
        loadX[j] = true;
      } else {
        Y = c.getLocal("x" + j);
      }
      return c.i64_mul(X, Y);
    }
    let c0 = "c0";
    let c1 = "c1";
    let c0_old = "c0_old";
    let c1_old = "c1_old";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      f.addCode(
        c.setLocal(c0, c.i64_const(0)),
        c.setLocal(c1, c.i64_const(0))
      );
      for (let i = Math.max(0, k - n32 + 1); i < k + 1 >> 1 && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      f.addCode(
        c.setLocal(
          c0,
          c.i64_shl(
            c.i64_and(
              c.getLocal(c0),
              c.i64_const(4294967295)
            ),
            c.i64_const(1)
          )
        )
      );
      f.addCode(
        c.setLocal(
          c1,
          c.i64_add(
            c.i64_shl(
              c.getLocal(c1),
              c.i64_const(1)
            ),
            c.i64_shr_u(
              c.getLocal(c0),
              c.i64_const(32)
            )
          )
        )
      );
      if (k % 2 == 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(k >> 1, k >> 1)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k > 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              c.i64_and(
                c.getLocal(c0_old),
                c.i64_const(4294967295)
              )
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.i64_add(
                c.getLocal(c1),
                c.i64_shr_u(
                  c.getLocal(c0),
                  c.i64_const(32)
                )
              ),
              c.getLocal(c1_old)
            )
          )
        );
      }
      f.addCode(
        c.i64_store32(
          c.getLocal("r"),
          k * 4,
          c.getLocal(c0)
        )
      );
      f.addCode(
        c.setLocal(
          c0_old,
          c.getLocal(c1)
        ),
        c.setLocal(
          c1_old,
          c.i64_shr_u(
            c.getLocal(c0_old),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 * 2 - 4,
        c.getLocal(c0_old)
      )
    );
  }
  function buildSquareOld() {
    const f = module.addFunction(prefix + "_squareOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.getLocal("x"), c.getLocal("r")));
  }
  function _buildMul1() {
    const f = module.addFunction(prefix + "__mul1");
    f.addParam("px", "i32");
    f.addParam("y", "i64");
    f.addParam("pr", "i32");
    f.addLocal("c", "i64");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal(
      "c",
      c.i64_mul(
        c.i64_load32_u(c.getLocal("px"), 0, 0),
        c.getLocal("y")
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("pr"),
      0,
      0,
      c.getLocal("c")
    ));
    for (let i = 1; i < n32; i++) {
      f.addCode(c.setLocal(
        "c",
        c.i64_add(
          c.i64_mul(
            c.i64_load32_u(c.getLocal("px"), 4 * i, 0),
            c.getLocal("y")
          ),
          c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
        )
      ));
      f.addCode(c.i64_store32(
        c.getLocal("pr"),
        i * 4,
        0,
        c.getLocal("c")
      ));
    }
  }
  function _buildAdd1() {
    const f = module.addFunction(prefix + "__add1");
    f.addParam("x", "i32");
    f.addParam("y", "i64");
    f.addLocal("c", "i64");
    f.addLocal("px", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal("px", c.getLocal("x")));
    f.addCode(c.setLocal(
      "c",
      c.i64_add(
        c.i64_load32_u(c.getLocal("px"), 0, 0),
        c.getLocal("y")
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("px"),
      0,
      0,
      c.getLocal("c")
    ));
    f.addCode(c.setLocal(
      "c",
      c.i64_shr_u(
        c.getLocal("c"),
        c.i64_const(32)
      )
    ));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.i64_eqz(c.getLocal("c"))
      ),
      c.setLocal(
        "px",
        c.i32_add(
          c.getLocal("px"),
          c.i32_const(4)
        )
      ),
      c.setLocal(
        "c",
        c.i64_add(
          c.i64_load32_u(c.getLocal("px"), 0, 0),
          c.getLocal("c")
        )
      ),
      c.i64_store32(
        c.getLocal("px"),
        0,
        0,
        c.getLocal("c")
      ),
      c.setLocal(
        "c",
        c.i64_shr_u(
          c.getLocal("c"),
          c.i64_const(32)
        )
      ),
      c.br(0)
    )));
  }
  function buildDiv() {
    _buildMul1();
    _buildAdd1();
    const f = module.addFunction(prefix + "_div");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("c", "i32");
    f.addParam("r", "i32");
    f.addLocal("rr", "i32");
    f.addLocal("cc", "i32");
    f.addLocal("eX", "i32");
    f.addLocal("eY", "i32");
    f.addLocal("sy", "i64");
    f.addLocal("sx", "i64");
    f.addLocal("ec", "i32");
    const c = f.getCodeBuilder();
    const Y = c.i32_const(module.alloc(n8));
    const Caux = c.i32_const(module.alloc(n8));
    const Raux = c.i32_const(module.alloc(n8));
    const C = c.getLocal("cc");
    const R = c.getLocal("rr");
    const pr1 = module.alloc(n8 * 2);
    const R1 = c.i32_const(pr1);
    const R2 = c.i32_const(pr1 + n8);
    f.addCode(c.if(
      c.getLocal("c"),
      c.setLocal("cc", c.getLocal("c")),
      c.setLocal("cc", Caux)
    ));
    f.addCode(c.if(
      c.getLocal("r"),
      c.setLocal("rr", c.getLocal("r")),
      c.setLocal("rr", Raux)
    ));
    f.addCode(c.call(prefix + "_copy", c.getLocal("x"), R));
    f.addCode(c.call(prefix + "_copy", c.getLocal("y"), Y));
    f.addCode(c.call(prefix + "_zero", C));
    f.addCode(c.call(prefix + "_zero", R1));
    f.addCode(c.setLocal("eX", c.i32_const(n8 - 1)));
    f.addCode(c.setLocal("eY", c.i32_const(n8 - 1)));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.i32_or(
          c.i32_load8_u(
            c.i32_add(Y, c.getLocal("eY")),
            0,
            0
          ),
          c.i32_eq(
            c.getLocal("eY"),
            c.i32_const(3)
          )
        )
      ),
      c.setLocal("eY", c.i32_sub(c.getLocal("eY"), c.i32_const(1))),
      c.br(0)
    )));
    f.addCode(
      c.setLocal(
        "sy",
        c.i64_add(
          c.i64_load32_u(
            c.i32_sub(
              c.i32_add(Y, c.getLocal("eY")),
              c.i32_const(3)
            ),
            0,
            0
          ),
          c.i64_const(1)
        )
      )
    );
    f.addCode(
      c.if(
        c.i64_eq(
          c.getLocal("sy"),
          c.i64_const(1)
        ),
        c.drop(c.i64_div_u(c.i64_const(0), c.i64_const(0)))
      )
    );
    f.addCode(c.block(c.loop(
      // while (eX>7)&&(Y[eX]==0) ex--;
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_or(
            c.i32_load8_u(
              c.i32_add(R, c.getLocal("eX")),
              0,
              0
            ),
            c.i32_eq(
              c.getLocal("eX"),
              c.i32_const(7)
            )
          )
        ),
        c.setLocal("eX", c.i32_sub(c.getLocal("eX"), c.i32_const(1))),
        c.br(0)
      )),
      c.setLocal(
        "sx",
        c.i64_load(
          c.i32_sub(
            c.i32_add(R, c.getLocal("eX")),
            c.i32_const(7)
          ),
          0,
          0
        )
      ),
      c.setLocal(
        "sx",
        c.i64_div_u(
          c.getLocal("sx"),
          c.getLocal("sy")
        )
      ),
      c.setLocal(
        "ec",
        c.i32_sub(
          c.i32_sub(
            c.getLocal("eX"),
            c.getLocal("eY")
          ),
          c.i32_const(4)
        )
      ),
      // While greater than 32 bits or ec is neg, shr and inc exp
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_and(
            c.i64_eqz(
              c.i64_and(
                c.getLocal("sx"),
                c.i64_const("0xFFFFFFFF00000000")
              )
            ),
            c.i32_ge_s(
              c.getLocal("ec"),
              c.i32_const(0)
            )
          )
        ),
        c.setLocal(
          "sx",
          c.i64_shr_u(
            c.getLocal("sx"),
            c.i64_const(8)
          )
        ),
        c.setLocal(
          "ec",
          c.i32_add(
            c.getLocal("ec"),
            c.i32_const(1)
          )
        ),
        c.br(0)
      )),
      c.if(
        c.i64_eqz(c.getLocal("sx")),
        [
          ...c.br_if(
            2,
            c.i32_eqz(c.call(prefix + "_gte", R, Y))
          ),
          ...c.setLocal("sx", c.i64_const(1)),
          ...c.setLocal("ec", c.i32_const(0))
        ]
      ),
      c.call(prefix + "__mul1", Y, c.getLocal("sx"), R2),
      c.drop(c.call(
        prefix + "_sub",
        R,
        c.i32_sub(R2, c.getLocal("ec")),
        R
      )),
      c.call(
        prefix + "__add1",
        c.i32_add(C, c.getLocal("ec")),
        c.getLocal("sx")
      ),
      c.br(0)
    )));
  }
  function buildInverseMod() {
    const f = module.addFunction(prefix + "_inverseMod");
    f.addParam("px", "i32");
    f.addParam("pm", "i32");
    f.addParam("pr", "i32");
    f.addLocal("t", "i32");
    f.addLocal("newt", "i32");
    f.addLocal("r", "i32");
    f.addLocal("qq", "i32");
    f.addLocal("qr", "i32");
    f.addLocal("newr", "i32");
    f.addLocal("swp", "i32");
    f.addLocal("x", "i32");
    f.addLocal("signt", "i32");
    f.addLocal("signnewt", "i32");
    f.addLocal("signx", "i32");
    const c = f.getCodeBuilder();
    const aux1 = c.i32_const(module.alloc(n8));
    const aux2 = c.i32_const(module.alloc(n8));
    const aux3 = c.i32_const(module.alloc(n8));
    const aux4 = c.i32_const(module.alloc(n8));
    const aux5 = c.i32_const(module.alloc(n8));
    const aux6 = c.i32_const(module.alloc(n8));
    const mulBuff = c.i32_const(module.alloc(n8 * 2));
    const aux7 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("t", aux1),
      c.call(prefix + "_zero", aux1),
      c.setLocal("signt", c.i32_const(0))
    );
    f.addCode(
      c.setLocal("r", aux2),
      c.call(prefix + "_copy", c.getLocal("pm"), aux2)
    );
    f.addCode(
      c.setLocal("newt", aux3),
      c.call(prefix + "_one", aux3),
      c.setLocal("signnewt", c.i32_const(0))
    );
    f.addCode(
      c.setLocal("newr", aux4),
      c.call(prefix + "_copy", c.getLocal("px"), aux4)
    );
    f.addCode(c.setLocal("qq", aux5));
    f.addCode(c.setLocal("qr", aux6));
    f.addCode(c.setLocal("x", aux7));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.call(prefix + "_isZero", c.getLocal("newr"))
      ),
      c.call(prefix + "_div", c.getLocal("r"), c.getLocal("newr"), c.getLocal("qq"), c.getLocal("qr")),
      c.call(prefix + "_mul", c.getLocal("qq"), c.getLocal("newt"), mulBuff),
      c.if(
        c.getLocal("signt"),
        c.if(
          c.getLocal("signnewt"),
          c.if(
            c.call(prefix + "_gte", mulBuff, c.getLocal("t")),
            [
              ...c.drop(c.call(prefix + "_sub", mulBuff, c.getLocal("t"), c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(0))
            ],
            [
              ...c.drop(c.call(prefix + "_sub", c.getLocal("t"), mulBuff, c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(1))
            ]
          ),
          [
            ...c.drop(c.call(prefix + "_add", mulBuff, c.getLocal("t"), c.getLocal("x"))),
            ...c.setLocal("signx", c.i32_const(1))
          ]
        ),
        c.if(
          c.getLocal("signnewt"),
          [
            ...c.drop(c.call(prefix + "_add", mulBuff, c.getLocal("t"), c.getLocal("x"))),
            ...c.setLocal("signx", c.i32_const(0))
          ],
          c.if(
            c.call(prefix + "_gte", c.getLocal("t"), mulBuff),
            [
              ...c.drop(c.call(prefix + "_sub", c.getLocal("t"), mulBuff, c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(0))
            ],
            [
              ...c.drop(c.call(prefix + "_sub", mulBuff, c.getLocal("t"), c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(1))
            ]
          )
        )
      ),
      c.setLocal("swp", c.getLocal("t")),
      c.setLocal("t", c.getLocal("newt")),
      c.setLocal("newt", c.getLocal("x")),
      c.setLocal("x", c.getLocal("swp")),
      c.setLocal("signt", c.getLocal("signnewt")),
      c.setLocal("signnewt", c.getLocal("signx")),
      c.setLocal("swp", c.getLocal("r")),
      c.setLocal("r", c.getLocal("newr")),
      c.setLocal("newr", c.getLocal("qr")),
      c.setLocal("qr", c.getLocal("swp")),
      c.br(0)
    )));
    f.addCode(c.if(
      c.getLocal("signt"),
      c.drop(c.call(prefix + "_sub", c.getLocal("pm"), c.getLocal("t"), c.getLocal("pr"))),
      c.call(prefix + "_copy", c.getLocal("t"), c.getLocal("pr"))
    ));
  }
  buildCopy();
  buildZero();
  buildIsZero();
  buildOne();
  buildEq();
  buildGte();
  buildAdd();
  buildSub();
  buildMul();
  buildSquare();
  buildSquareOld();
  buildDiv();
  buildInverseMod();
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_gte");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_squareOld");
  module.exportFunction(prefix + "_div");
  module.exportFunction(prefix + "_inverseMod");
  return prefix;
};
var build_timesscalar = function buildTimesScalar(module, fnName, elementLen, opAB, opAA, opCopy, opInit) {
  const f = module.addFunction(fnName);
  f.addParam("base", "i32");
  f.addParam("scalar", "i32");
  f.addParam("scalarLength", "i32");
  f.addParam("r", "i32");
  f.addLocal("i", "i32");
  f.addLocal("b", "i32");
  const c = f.getCodeBuilder();
  const aux = c.i32_const(module.alloc(elementLen));
  f.addCode(
    c.if(
      c.i32_eqz(c.getLocal("scalarLength")),
      [
        ...c.call(opInit, c.getLocal("r")),
        ...c.ret([])
      ]
    )
  );
  f.addCode(c.call(opCopy, c.getLocal("base"), aux));
  f.addCode(c.call(opInit, c.getLocal("r")));
  f.addCode(c.setLocal("i", c.getLocal("scalarLength")));
  f.addCode(c.block(c.loop(
    c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
    c.setLocal(
      "b",
      c.i32_load8_u(
        c.i32_add(
          c.getLocal("scalar"),
          c.getLocal("i")
        )
      )
    ),
    ...innerLoop(),
    c.br_if(1, c.i32_eqz(c.getLocal("i"))),
    c.br(0)
  )));
  function innerLoop() {
    const code = [];
    for (let i = 0; i < 8; i++) {
      code.push(
        ...c.call(opAA, c.getLocal("r"), c.getLocal("r")),
        ...c.if(
          c.i32_ge_u(c.getLocal("b"), c.i32_const(128 >> i)),
          [
            ...c.setLocal(
              "b",
              c.i32_sub(
                c.getLocal("b"),
                c.i32_const(128 >> i)
              )
            ),
            ...c.call(opAB, c.getLocal("r"), aux, c.getLocal("r"))
          ]
        )
      );
    }
    return code;
  }
};
var build_batchinverse = buildBatchInverse$3;
function buildBatchInverse$3(module, prefix) {
  const n8 = module.modules[prefix].n64 * 8;
  const f = module.addFunction(prefix + "_batchInverse");
  f.addParam("pIn", "i32");
  f.addParam("inStep", "i32");
  f.addParam("n", "i32");
  f.addParam("pOut", "i32");
  f.addParam("outStep", "i32");
  f.addLocal("itAux", "i32");
  f.addLocal("itIn", "i32");
  f.addLocal("itOut", "i32");
  f.addLocal("i", "i32");
  const c = f.getCodeBuilder();
  const AUX = c.i32_const(module.alloc(n8));
  f.addCode(
    c.setLocal("itAux", c.i32_load(c.i32_const(0))),
    c.i32_store(
      c.i32_const(0),
      c.i32_add(
        c.getLocal("itAux"),
        c.i32_mul(
          c.i32_add(
            c.getLocal("n"),
            c.i32_const(1)
          ),
          c.i32_const(n8)
        )
      )
    )
  );
  f.addCode(
    // aux[0] = a;
    c.call(prefix + "_one", c.getLocal("itAux")),
    // for (i=0;i<n;i++) aux[i] = aux[i-1]*in[i]
    c.setLocal("itIn", c.getLocal("pIn")),
    c.setLocal("itAux", c.i32_add(c.getLocal("itAux"), c.i32_const(n8))),
    c.setLocal("i", c.i32_const(0)),
    c.block(c.loop(
      c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("itIn")),
        c.call(
          prefix + "_copy",
          c.i32_sub(c.getLocal("itAux"), c.i32_const(n8)),
          c.getLocal("itAux")
        ),
        c.call(
          prefix + "_mul",
          c.getLocal("itIn"),
          c.i32_sub(c.getLocal("itAux"), c.i32_const(n8)),
          c.getLocal("itAux")
        )
      ),
      c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.getLocal("inStep"))),
      c.setLocal("itAux", c.i32_add(c.getLocal("itAux"), c.i32_const(n8))),
      c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    )),
    // point to the last
    c.setLocal("itIn", c.i32_sub(c.getLocal("itIn"), c.getLocal("inStep"))),
    c.setLocal("itAux", c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))),
    // itOut = pOut + (n-1)*stepOut   // Point to the last
    c.setLocal(
      "itOut",
      c.i32_add(
        c.getLocal("pOut"),
        c.i32_mul(
          c.i32_sub(c.getLocal("n"), c.i32_const(1)),
          c.getLocal("outStep")
        )
      )
    ),
    // aux[n-1] = 1/aux[n-1]
    c.call(prefix + "_inverse", c.getLocal("itAux"), c.getLocal("itAux")),
    c.block(c.loop(
      c.br_if(1, c.i32_eqz(c.getLocal("i"))),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("itIn")),
        [
          ...c.call(
            prefix + "_copy",
            c.getLocal("itAux"),
            c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))
          ),
          ...c.call(
            prefix + "_zero",
            c.getLocal("itOut")
          )
        ],
        [
          ...c.call(prefix + "_copy", c.i32_sub(c.getLocal("itAux"), c.i32_const(n8)), AUX),
          ...c.call(
            prefix + "_mul",
            c.getLocal("itAux"),
            c.getLocal("itIn"),
            c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))
          ),
          ...c.call(
            prefix + "_mul",
            c.getLocal("itAux"),
            AUX,
            c.getLocal("itOut")
          )
        ]
      ),
      c.setLocal("itIn", c.i32_sub(c.getLocal("itIn"), c.getLocal("inStep"))),
      c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.getLocal("outStep"))),
      c.setLocal("itAux", c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))),
      c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    ))
  );
  f.addCode(
    c.i32_store(
      c.i32_const(0),
      c.getLocal("itAux")
    )
  );
}
var build_batchconvertion = buildBatchConvertion$3;
function buildBatchConvertion$3(module, fnName, internalFnName, sizeIn, sizeOut, reverse) {
  if (typeof reverse === "undefined") {
    if (sizeIn < sizeOut) {
      reverse = true;
    } else {
      reverse = false;
    }
  }
  const f = module.addFunction(fnName);
  f.addParam("pIn", "i32");
  f.addParam("n", "i32");
  f.addParam("pOut", "i32");
  f.addLocal("i", "i32");
  f.addLocal("itIn", "i32");
  f.addLocal("itOut", "i32");
  const c = f.getCodeBuilder();
  if (reverse) {
    f.addCode(
      c.setLocal(
        "itIn",
        c.i32_add(
          c.getLocal("pIn"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeIn)
          )
        )
      ),
      c.setLocal(
        "itOut",
        c.i32_add(
          c.getLocal("pOut"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeOut)
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn"), c.getLocal("itOut")),
        c.setLocal("itIn", c.i32_sub(c.getLocal("itIn"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  } else {
    f.addCode(
      c.setLocal("itIn", c.getLocal("pIn")),
      c.setLocal("itOut", c.getLocal("pOut")),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn"), c.getLocal("itOut")),
        c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_add(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
}
var build_batchop = buildBatchConvertion$2;
function buildBatchConvertion$2(module, fnName, internalFnName, sizeIn, sizeOut, reverse) {
  if (typeof reverse === "undefined") {
    if (sizeIn < sizeOut) {
      reverse = true;
    } else {
      reverse = false;
    }
  }
  const f = module.addFunction(fnName);
  f.addParam("pIn1", "i32");
  f.addParam("pIn2", "i32");
  f.addParam("n", "i32");
  f.addParam("pOut", "i32");
  f.addLocal("i", "i32");
  f.addLocal("itIn1", "i32");
  f.addLocal("itIn2", "i32");
  f.addLocal("itOut", "i32");
  const c = f.getCodeBuilder();
  if (reverse) {
    f.addCode(
      c.setLocal(
        "itIn1",
        c.i32_add(
          c.getLocal("pIn1"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeIn)
          )
        )
      ),
      c.setLocal(
        "itIn2",
        c.i32_add(
          c.getLocal("pIn2"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeIn)
          )
        )
      ),
      c.setLocal(
        "itOut",
        c.i32_add(
          c.getLocal("pOut"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeOut)
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn1"), c.getLocal("itIn2"), c.getLocal("itOut")),
        c.setLocal("itIn1", c.i32_sub(c.getLocal("itIn1"), c.i32_const(sizeIn))),
        c.setLocal("itIn2", c.i32_sub(c.getLocal("itIn2"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  } else {
    f.addCode(
      c.setLocal("itIn1", c.getLocal("pIn1")),
      c.setLocal("itIn2", c.getLocal("pIn2")),
      c.setLocal("itOut", c.getLocal("pOut")),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn1"), c.getLocal("itIn2"), c.getLocal("itOut")),
        c.setLocal("itIn1", c.i32_add(c.getLocal("itIn1"), c.i32_const(sizeIn))),
        c.setLocal("itIn2", c.i32_add(c.getLocal("itIn2"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_add(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
}
var bigint = {};
function compare(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
function square$1(n) {
  return n * n;
}
function isOdd$4(n) {
  return n % 2n !== 0n;
}
function isEven(n) {
  return n % 2n === 0n;
}
function isNegative$3(n) {
  return n < 0n;
}
function isPositive(n) {
  return n > 0n;
}
function bitLength$5(n) {
  if (isNegative$3(n)) {
    return n.toString(2).length - 1;
  } else {
    return n.toString(2).length;
  }
}
function abs(n) {
  return n < 0n ? -n : n;
}
function isUnit(n) {
  return abs(n) === 1n;
}
function modInv$3(a, n) {
  var t = 0n, newT = 1n, r = n, newR = abs(a), q, lastT, lastR;
  while (newR !== 0n) {
    q = r / newR;
    lastT = t;
    lastR = r;
    t = newT;
    r = newR;
    newT = lastT - q * newT;
    newR = lastR - q * newR;
  }
  if (!isUnit(r)) throw new Error(a.toString() + " and " + n.toString() + " are not co-prime");
  if (compare(t, 0n) === -1) {
    t = t + n;
  }
  if (isNegative$3(a)) {
    return -t;
  }
  return t;
}
function modPow$2(n, exp2, mod2) {
  if (mod2 === 0n) throw new Error("Cannot take modPow with modulus 0");
  var r = 1n, base = n % mod2;
  if (isNegative$3(exp2)) {
    exp2 = exp2 * -1n;
    base = modInv$3(base, mod2);
  }
  while (isPositive(exp2)) {
    if (base === 0n) return 0n;
    if (isOdd$4(exp2)) r = r * base % mod2;
    exp2 = exp2 / 2n;
    base = square$1(base) % mod2;
  }
  return r;
}
function compareAbs(a, b) {
  a = a >= 0n ? a : -a;
  b = b >= 0n ? b : -b;
  return a === b ? 0 : a > b ? 1 : -1;
}
function isDivisibleBy(a, n) {
  if (n === 0n) return false;
  if (isUnit(n)) return true;
  if (compareAbs(n, 2n) === 0) return isEven(a);
  return a % n === 0n;
}
function isBasicPrime(v) {
  var n = abs(v);
  if (isUnit(n)) return false;
  if (n === 2n || n === 3n || n === 5n) return true;
  if (isEven(n) || isDivisibleBy(n, 3n) || isDivisibleBy(n, 5n)) return false;
  if (n < 49n) return true;
}
function prev(n) {
  return n - 1n;
}
function millerRabinTest(n, a) {
  var nPrev = prev(n), b = nPrev, r = 0, d, i, x;
  while (isEven(b)) b = b / 2n, r++;
  next: for (i = 0; i < a.length; i++) {
    if (n < a[i]) continue;
    x = modPow$2(BigInt(a[i]), b, n);
    if (isUnit(x) || x === nPrev) continue;
    for (d = r - 1; d != 0; d--) {
      x = square$1(x) % n;
      if (isUnit(x)) return false;
      if (x === nPrev) continue next;
    }
    return false;
  }
  return true;
}
function isPrime$1(p) {
  var isPrime2 = isBasicPrime(p);
  if (isPrime2 !== void 0) return isPrime2;
  var n = abs(p);
  var bits2 = bitLength$5(n);
  if (bits2 <= 64)
    return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
  var logN = Math.log(2) * Number(bits2);
  var t = Math.ceil(logN);
  for (var a = [], i = 0; i < t; i++) {
    a.push(BigInt(i + 2));
  }
  return millerRabinTest(n, a);
}
bigint.bitLength = bitLength$5;
bigint.isOdd = isOdd$4;
bigint.isNegative = isNegative$3;
bigint.abs = abs;
bigint.isUnit = isUnit;
bigint.compare = compare;
bigint.modInv = modInv$3;
bigint.modPow = modPow$2;
bigint.isPrime = isPrime$1;
bigint.square = square$1;
var buildInt2 = build_int;
var utils$5 = utils$6;
var buildExp$2 = build_timesscalar;
var buildBatchInverse$2 = build_batchinverse;
var buildBatchConvertion$1 = build_batchconvertion;
var buildBatchOp = build_batchop;
var { bitLength: bitLength$4, modInv: modInv$2, modPow: modPow$1, isPrime, isOdd: isOdd$3, square } = bigint;
var build_f1m = function buildF1m(module, _q, _prefix, _intPrefix) {
  const q = BigInt(_q);
  const n64 = Math.floor((bitLength$4(q - 1n) - 1) / 64) + 1;
  const n32 = n64 * 2;
  const n8 = n64 * 8;
  const prefix = _prefix || "f1m";
  if (module.modules[prefix]) return prefix;
  const intPrefix = buildInt2(module, n64, _intPrefix);
  const pq = module.alloc(n8, utils$5.bigInt2BytesLE(q, n8));
  const pR2 = module.alloc(utils$5.bigInt2BytesLE(square(1n << BigInt(n64 * 64)) % q, n8));
  const pOne = module.alloc(utils$5.bigInt2BytesLE((1n << BigInt(n64 * 64)) % q, n8));
  const pZero = module.alloc(utils$5.bigInt2BytesLE(0n, n8));
  const _minusOne = q - 1n;
  const _e = _minusOne >> 1n;
  const pe = module.alloc(n8, utils$5.bigInt2BytesLE(_e, n8));
  const _ePlusOne = _e + 1n;
  const pePlusOne = module.alloc(n8, utils$5.bigInt2BytesLE(_ePlusOne, n8));
  module.modules[prefix] = {
    pq,
    pR2,
    n64,
    q,
    pOne,
    pZero,
    pePlusOne
  };
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(intPrefix + "_copy", c.i32_const(pOne), c.getLocal("pr")));
  }
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.call(intPrefix + "_add", c.getLocal("x"), c.getLocal("y"), c.getLocal("r")),
        c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r"))),
        c.if(
          c.call(intPrefix + "_gte", c.getLocal("r"), c.i32_const(pq)),
          c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
        )
      )
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.call(intPrefix + "_sub", c.getLocal("x"), c.getLocal("y"), c.getLocal("r")),
        c.drop(c.call(intPrefix + "_add", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
      )
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(prefix + "_sub", c.i32_const(pZero), c.getLocal("x"), c.getLocal("r"))
    );
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call(prefix + "_fromMontgomery", c.getLocal("x"), AUX),
      c.call(intPrefix + "_gte", AUX, c.i32_const(pePlusOne))
    );
  }
  function buildSign() {
    const f = module.addFunction(prefix + "_sign");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(intPrefix + "_isZero", c.getLocal("x")),
        c.ret(c.i32_const(0))
      ),
      c.call(prefix + "_fromMontgomery", c.getLocal("x"), AUX),
      c.if(
        c.call(intPrefix + "_gte", AUX, c.i32_const(pePlusOne)),
        c.ret(c.i32_const(-1))
      ),
      c.ret(c.i32_const(1))
    );
  }
  function buildMReduct() {
    const carries = module.alloc(n32 * n32 * 8);
    const f = module.addFunction(prefix + "_mReduct");
    f.addParam("t", "i32");
    f.addParam("r", "i32");
    f.addLocal("np32", "i64");
    f.addLocal("c", "i64");
    f.addLocal("m", "i64");
    const c = f.getCodeBuilder();
    const np32 = Number(0x100000000n - modInv$2(q, 0x100000000n));
    f.addCode(c.setLocal("np32", c.i64_const(np32)));
    for (let i = 0; i < n32; i++) {
      f.addCode(c.setLocal("c", c.i64_const(0)));
      f.addCode(
        c.setLocal(
          "m",
          c.i64_and(
            c.i64_mul(
              c.i64_load32_u(c.getLocal("t"), i * 4),
              c.getLocal("np32")
            ),
            c.i64_const("0xFFFFFFFF")
          )
        )
      );
      for (let j = 0; j < n32; j++) {
        f.addCode(
          c.setLocal(
            "c",
            c.i64_add(
              c.i64_add(
                c.i64_load32_u(c.getLocal("t"), (i + j) * 4),
                c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
              ),
              c.i64_mul(
                c.i64_load32_u(c.i32_const(pq), j * 4),
                c.getLocal("m")
              )
            )
          )
        );
        f.addCode(
          c.i64_store32(
            c.getLocal("t"),
            (i + j) * 4,
            c.getLocal("c")
          )
        );
      }
      f.addCode(
        c.i64_store32(
          c.i32_const(carries),
          i * 4,
          c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
        )
      );
    }
    f.addCode(
      c.call(
        prefix + "_add",
        c.i32_const(carries),
        c.i32_add(
          c.getLocal("t"),
          c.i32_const(n32 * 4)
        ),
        c.getLocal("r")
      )
    );
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    f.addLocal("np32", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
      f.addLocal("y" + i, "i64");
      f.addLocal("m" + i, "i64");
      f.addLocal("q" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const np32 = Number(0x100000000n - modInv$2(q, 0x100000000n));
    f.addCode(c.setLocal("np32", c.i64_const(np32)));
    const loadX = [];
    const loadY = [];
    const loadQ = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadY[j]) {
        Y = c.teeLocal("y" + j, c.i64_load32_u(c.getLocal("y"), j * 4));
        loadY[j] = true;
      } else {
        Y = c.getLocal("y" + j);
      }
      return c.i64_mul(X, Y);
    }
    function mulqm(i, j) {
      let Q, M;
      if (!loadQ[i]) {
        Q = c.teeLocal("q" + i, c.i64_load32_u(c.i32_const(0), pq + i * 4));
        loadQ[i] = true;
      } else {
        Q = c.getLocal("q" + i);
      }
      M = c.getLocal("m" + j);
      return c.i64_mul(Q, M);
    }
    let c0 = "c0";
    let c1 = "c1";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      for (let i = Math.max(0, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      for (let i = Math.max(1, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k < n32) {
        f.addCode(
          c.setLocal(
            "m" + k,
            c.i64_and(
              c.i64_mul(
                c.i64_and(
                  c.getLocal(c0),
                  c.i64_const(4294967295)
                ),
                c.getLocal("np32")
              ),
              c.i64_const("0xFFFFFFFF")
            )
          )
        );
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(0, k)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k >= n32) {
        f.addCode(
          c.i64_store32(
            c.getLocal("r"),
            (k - n32) * 4,
            c.getLocal(c0)
          )
        );
      }
      [c0, c1] = [c1, c0];
      f.addCode(
        c.setLocal(
          c1,
          c.i64_shr_u(
            c.getLocal(c0),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 - 4,
        c.getLocal(c0)
      )
    );
    f.addCode(
      c.if(
        c.i32_wrap_i64(c.getLocal(c1)),
        c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r"))),
        c.if(
          c.call(intPrefix + "_gte", c.getLocal("r"), c.i32_const(pq)),
          c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
        )
      )
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    f.addLocal("c0_old", "i64");
    f.addLocal("c1_old", "i64");
    f.addLocal("np32", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
      f.addLocal("m" + i, "i64");
      f.addLocal("q" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const np32 = Number(0x100000000n - modInv$2(q, 0x100000000n));
    f.addCode(c.setLocal("np32", c.i64_const(np32)));
    const loadX = [];
    const loadQ = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadX[j]) {
        Y = c.teeLocal("x" + j, c.i64_load32_u(c.getLocal("x"), j * 4));
        loadX[j] = true;
      } else {
        Y = c.getLocal("x" + j);
      }
      return c.i64_mul(X, Y);
    }
    function mulqm(i, j) {
      let Q, M;
      if (!loadQ[i]) {
        Q = c.teeLocal("q" + i, c.i64_load32_u(c.i32_const(0), pq + i * 4));
        loadQ[i] = true;
      } else {
        Q = c.getLocal("q" + i);
      }
      M = c.getLocal("m" + j);
      return c.i64_mul(Q, M);
    }
    let c0 = "c0";
    let c1 = "c1";
    let c0_old = "c0_old";
    let c1_old = "c1_old";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      f.addCode(
        c.setLocal(c0, c.i64_const(0)),
        c.setLocal(c1, c.i64_const(0))
      );
      for (let i = Math.max(0, k - n32 + 1); i < k + 1 >> 1 && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      f.addCode(
        c.setLocal(
          c0,
          c.i64_shl(
            c.i64_and(
              c.getLocal(c0),
              c.i64_const(4294967295)
            ),
            c.i64_const(1)
          )
        )
      );
      f.addCode(
        c.setLocal(
          c1,
          c.i64_add(
            c.i64_shl(
              c.getLocal(c1),
              c.i64_const(1)
            ),
            c.i64_shr_u(
              c.getLocal(c0),
              c.i64_const(32)
            )
          )
        )
      );
      if (k % 2 == 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(k >> 1, k >> 1)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k > 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              c.i64_and(
                c.getLocal(c0_old),
                c.i64_const(4294967295)
              )
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.i64_add(
                c.getLocal(c1),
                c.i64_shr_u(
                  c.getLocal(c0),
                  c.i64_const(32)
                )
              ),
              c.getLocal(c1_old)
            )
          )
        );
      }
      for (let i = Math.max(1, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k < n32) {
        f.addCode(
          c.setLocal(
            "m" + k,
            c.i64_and(
              c.i64_mul(
                c.i64_and(
                  c.getLocal(c0),
                  c.i64_const(4294967295)
                ),
                c.getLocal("np32")
              ),
              c.i64_const("0xFFFFFFFF")
            )
          )
        );
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(0, k)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k >= n32) {
        f.addCode(
          c.i64_store32(
            c.getLocal("r"),
            (k - n32) * 4,
            c.getLocal(c0)
          )
        );
      }
      f.addCode(
        c.setLocal(
          c0_old,
          c.getLocal(c1)
        ),
        c.setLocal(
          c1_old,
          c.i64_shr_u(
            c.getLocal(c0_old),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 - 4,
        c.getLocal(c0_old)
      )
    );
    f.addCode(
      c.if(
        c.i32_wrap_i64(c.getLocal(c1_old)),
        c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r"))),
        c.if(
          c.call(intPrefix + "_gte", c.getLocal("r"), c.i32_const(pq)),
          c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
        )
      )
    );
  }
  function buildSquareOld() {
    const f = module.addFunction(prefix + "_squareOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.getLocal("x"), c.getLocal("r")));
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.i32_const(pR2), c.getLocal("r")));
  }
  function buildFromMontgomery() {
    const pAux2 = module.alloc(n8 * 2);
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(intPrefix + "_copy", c.getLocal("x"), c.i32_const(pAux2)));
    f.addCode(c.call(intPrefix + "_zero", c.i32_const(pAux2 + n8)));
    f.addCode(c.call(prefix + "_mReduct", c.i32_const(pAux2), c.getLocal("r")));
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_fromMontgomery", c.getLocal("x"), c.getLocal("r")));
    f.addCode(c.call(intPrefix + "_inverseMod", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")));
    f.addCode(c.call(prefix + "_toMontgomery", c.getLocal("r"), c.getLocal("r")));
  }
  let _nqr = 2n;
  if (isPrime(q)) {
    while (modPow$1(_nqr, _e, q) !== _minusOne) _nqr = _nqr + 1n;
  }
  let s2 = 0;
  let _t = _minusOne;
  while (!isOdd$3(_t) && _t !== 0n) {
    s2++;
    _t = _t >> 1n;
  }
  const pt = module.alloc(n8, utils$5.bigInt2BytesLE(_t, n8));
  const _nqrToT = modPow$1(_nqr, _t, q);
  const pNqrToT = module.alloc(utils$5.bigInt2BytesLE((_nqrToT << BigInt(n64 * 64)) % q, n8));
  const _tPlusOneOver2 = _t + 1n >> 1n;
  const ptPlusOneOver2 = module.alloc(n8, utils$5.bigInt2BytesLE(_tPlusOneOver2, n8));
  function buildSqrt2() {
    const f = module.addFunction(prefix + "_sqrt");
    f.addParam("n", "i32");
    f.addParam("r", "i32");
    f.addLocal("m", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    const c = f.getCodeBuilder();
    const ONE = c.i32_const(pOne);
    const C = c.i32_const(module.alloc(n8));
    const T = c.i32_const(module.alloc(n8));
    const R = c.i32_const(module.alloc(n8));
    const SQ = c.i32_const(module.alloc(n8));
    const B = c.i32_const(module.alloc(n8));
    f.addCode(
      // If (n==0) return 0
      c.if(
        c.call(prefix + "_isZero", c.getLocal("n")),
        c.ret(
          c.call(prefix + "_zero", c.getLocal("r"))
        )
      ),
      c.setLocal("m", c.i32_const(s2)),
      c.call(prefix + "_copy", c.i32_const(pNqrToT), C),
      c.call(prefix + "_exp", c.getLocal("n"), c.i32_const(pt), c.i32_const(n8), T),
      c.call(prefix + "_exp", c.getLocal("n"), c.i32_const(ptPlusOneOver2), c.i32_const(n8), R),
      c.block(c.loop(
        c.br_if(1, c.call(prefix + "_eq", T, ONE)),
        c.call(prefix + "_square", T, SQ),
        c.setLocal("i", c.i32_const(1)),
        c.block(c.loop(
          c.br_if(1, c.call(prefix + "_eq", SQ, ONE)),
          c.call(prefix + "_square", SQ, SQ),
          c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
          c.br(0)
        )),
        c.call(prefix + "_copy", C, B),
        c.setLocal("j", c.i32_sub(c.i32_sub(c.getLocal("m"), c.getLocal("i")), c.i32_const(1))),
        c.block(c.loop(
          c.br_if(1, c.i32_eqz(c.getLocal("j"))),
          c.call(prefix + "_square", B, B),
          c.setLocal("j", c.i32_sub(c.getLocal("j"), c.i32_const(1))),
          c.br(0)
        )),
        c.setLocal("m", c.getLocal("i")),
        c.call(prefix + "_square", B, C),
        c.call(prefix + "_mul", T, C, T),
        c.call(prefix + "_mul", R, B, R),
        c.br(0)
      )),
      c.if(
        c.call(prefix + "_isNegative", R),
        c.call(prefix + "_neg", R, c.getLocal("r")),
        c.call(prefix + "_copy", R, c.getLocal("r"))
      )
    );
  }
  function buildIsSquare() {
    const f = module.addFunction(prefix + "_isSquare");
    f.addParam("n", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const ONE = c.i32_const(pOne);
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("n")),
        c.ret(c.i32_const(1))
      ),
      c.call(prefix + "_exp", c.getLocal("n"), c.i32_const(pe), c.i32_const(n8), AUX),
      c.call(prefix + "_eq", AUX, ONE)
    );
  }
  function buildLoad() {
    const f = module.addFunction(prefix + "_load");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    f.addLocal("p", "i32");
    f.addLocal("l", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    const c = f.getCodeBuilder();
    const R = c.i32_const(module.alloc(n8));
    const pAux = module.alloc(n8);
    const AUX = c.i32_const(pAux);
    f.addCode(
      c.call(intPrefix + "_zero", c.getLocal("r")),
      c.setLocal("i", c.i32_const(n8)),
      c.setLocal("p", c.getLocal("scalar")),
      c.block(c.loop(
        c.br_if(1, c.i32_gt_u(c.getLocal("i"), c.getLocal("scalarLen"))),
        c.if(
          c.i32_eq(c.getLocal("i"), c.i32_const(n8)),
          c.call(prefix + "_one", R),
          c.call(prefix + "_mul", R, c.i32_const(pR2), R)
        ),
        c.call(prefix + "_mul", c.getLocal("p"), R, AUX),
        c.call(prefix + "_add", c.getLocal("r"), AUX, c.getLocal("r")),
        c.setLocal("p", c.i32_add(c.getLocal("p"), c.i32_const(n8))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(n8))),
        c.br(0)
      )),
      c.setLocal("l", c.i32_rem_u(c.getLocal("scalarLen"), c.i32_const(n8))),
      c.if(c.i32_eqz(c.getLocal("l")), c.ret([])),
      c.call(intPrefix + "_zero", AUX),
      c.setLocal("j", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("j"), c.getLocal("l"))),
        c.i32_store8(
          c.getLocal("j"),
          pAux,
          c.i32_load8_u(c.getLocal("p"))
        ),
        c.setLocal("p", c.i32_add(c.getLocal("p"), c.i32_const(1))),
        c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
        c.br(0)
      )),
      c.if(
        c.i32_eq(c.getLocal("i"), c.i32_const(n8)),
        c.call(prefix + "_one", R),
        c.call(prefix + "_mul", R, c.i32_const(pR2), R)
      ),
      c.call(prefix + "_mul", AUX, R, AUX),
      c.call(prefix + "_add", c.getLocal("r"), AUX, c.getLocal("r"))
    );
  }
  function buildTimesScalar2() {
    const f = module.addFunction(prefix + "_timesScalar");
    f.addParam("x", "i32");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call(prefix + "_load", c.getLocal("scalar"), c.getLocal("scalarLen"), AUX),
      c.call(prefix + "_toMontgomery", AUX, AUX),
      c.call(prefix + "_mul", c.getLocal("x"), AUX, c.getLocal("r"))
    );
  }
  function buildIsOne() {
    const f = module.addFunction(prefix + "_isOne");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.ret(c.call(intPrefix + "_eq", c.getLocal("x"), c.i32_const(pOne)))
    );
  }
  module.exportFunction(intPrefix + "_copy", prefix + "_copy");
  module.exportFunction(intPrefix + "_zero", prefix + "_zero");
  module.exportFunction(intPrefix + "_isZero", prefix + "_isZero");
  module.exportFunction(intPrefix + "_eq", prefix + "_eq");
  buildIsOne();
  buildAdd();
  buildSub();
  buildNeg();
  buildMReduct();
  buildMul();
  buildSquare();
  buildSquareOld();
  buildToMontgomery();
  buildFromMontgomery();
  buildIsNegative();
  buildSign();
  buildInverse();
  buildOne();
  buildLoad();
  buildTimesScalar2();
  buildBatchInverse$2(module, prefix);
  buildBatchConvertion$1(module, prefix + "_batchToMontgomery", prefix + "_toMontgomery", n8, n8);
  buildBatchConvertion$1(module, prefix + "_batchFromMontgomery", prefix + "_fromMontgomery", n8, n8);
  buildBatchConvertion$1(module, prefix + "_batchNeg", prefix + "_neg", n8, n8);
  buildBatchOp(module, prefix + "_batchAdd", prefix + "_add", n8, n8);
  buildBatchOp(module, prefix + "_batchSub", prefix + "_sub", n8, n8);
  buildBatchOp(module, prefix + "_batchMul", prefix + "_mul", n8, n8);
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_isNegative");
  module.exportFunction(prefix + "_isOne");
  module.exportFunction(prefix + "_sign");
  module.exportFunction(prefix + "_mReduct");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_squareOld");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_inverse");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_load");
  module.exportFunction(prefix + "_timesScalar");
  buildExp$2(
    module,
    prefix + "_exp",
    n8,
    prefix + "_mul",
    prefix + "_square",
    intPrefix + "_copy",
    prefix + "_one"
  );
  module.exportFunction(prefix + "_exp");
  module.exportFunction(prefix + "_batchInverse");
  if (isPrime(q)) {
    buildSqrt2();
    buildIsSquare();
    module.exportFunction(prefix + "_sqrt");
    module.exportFunction(prefix + "_isSquare");
  }
  module.exportFunction(prefix + "_batchToMontgomery");
  module.exportFunction(prefix + "_batchFromMontgomery");
  return prefix;
};
var buildF1m$2 = build_f1m;
var { bitLength: bitLength$3 } = bigint;
var build_f1 = function buildF1(module, _q, _prefix, _f1mPrefix, _intPrefix) {
  const q = BigInt(_q);
  const n64 = Math.floor((bitLength$3(q - 1n) - 1) / 64) + 1;
  const n8 = n64 * 8;
  const prefix = _prefix || "f1";
  if (module.modules[prefix]) return prefix;
  module.modules[prefix] = {
    n64
  };
  const intPrefix = _intPrefix || "int";
  const f1mPrefix = buildF1m$2(module, q, _f1mPrefix, intPrefix);
  const pR2 = module.modules[f1mPrefix].pR2;
  const pq = module.modules[f1mPrefix].pq;
  const pePlusOne = module.modules[f1mPrefix].pePlusOne;
  function buildMul() {
    const pAux1 = module.alloc(n8);
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(f1mPrefix + "_mul", c.getLocal("x"), c.getLocal("y"), c.i32_const(pAux1)));
    f.addCode(c.call(f1mPrefix + "_mul", c.i32_const(pAux1), c.i32_const(pR2), c.getLocal("r")));
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.getLocal("x"), c.getLocal("r")));
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(intPrefix + "_inverseMod", c.getLocal("x"), c.i32_const(pq), c.getLocal("r")));
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(intPrefix + "_gte", c.getLocal("x"), c.i32_const(pePlusOne))
    );
  }
  buildMul();
  buildSquare();
  buildInverse();
  buildIsNegative();
  module.exportFunction(f1mPrefix + "_add", prefix + "_add");
  module.exportFunction(f1mPrefix + "_sub", prefix + "_sub");
  module.exportFunction(f1mPrefix + "_neg", prefix + "_neg");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_inverse");
  module.exportFunction(prefix + "_isNegative");
  module.exportFunction(f1mPrefix + "_copy", prefix + "_copy");
  module.exportFunction(f1mPrefix + "_zero", prefix + "_zero");
  module.exportFunction(f1mPrefix + "_one", prefix + "_one");
  module.exportFunction(f1mPrefix + "_isZero", prefix + "_isZero");
  module.exportFunction(f1mPrefix + "_eq", prefix + "_eq");
  return prefix;
};
var buildExp$1 = build_timesscalar;
var buildBatchInverse$1 = build_batchinverse;
var utils$4 = utils$6;
var build_f2m = function buildF2m(module, mulNonResidueFn, prefix, f1mPrefix) {
  if (module.modules[prefix]) return prefix;
  const f1n8 = module.modules[f1mPrefix].n64 * 8;
  const q = module.modules[f1mPrefix].q;
  module.modules[prefix] = {
    n64: module.modules[f1mPrefix].n64 * 2
  };
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_add", x0, y0, r0),
      c.call(f1mPrefix + "_add", x1, y1, r1)
    );
  }
  function buildTimesScalar2() {
    const f = module.addFunction(prefix + "_timesScalar");
    f.addParam("x", "i32");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_timesScalar", x0, c.getLocal("scalar"), c.getLocal("scalarLen"), r0),
      c.call(f1mPrefix + "_timesScalar", x1, c.getLocal("scalar"), c.getLocal("scalarLen"), r1)
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_sub", x0, y0, r0),
      c.call(f1mPrefix + "_sub", x1, y1, r1)
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_neg", x0, r0),
      c.call(f1mPrefix + "_neg", x1, r1)
    );
  }
  function buildConjugate() {
    const f = module.addFunction(prefix + "_conjugate");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, r0),
      c.call(f1mPrefix + "_neg", x1, r1)
    );
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.if(
        c.call(f1mPrefix + "_isZero", x1),
        c.ret(c.call(f1mPrefix + "_isNegative", x0))
      ),
      c.ret(c.call(f1mPrefix + "_isNegative", x1))
    );
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const A = c.i32_const(module.alloc(f1n8));
    const B = c.i32_const(module.alloc(f1n8));
    const C = c.i32_const(module.alloc(f1n8));
    const D = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_mul", x0, y0, A),
      // A = x0*y0
      c.call(f1mPrefix + "_mul", x1, y1, B),
      // B = x1*y1
      c.call(f1mPrefix + "_add", x0, x1, C),
      // C = x0 + x1
      c.call(f1mPrefix + "_add", y0, y1, D),
      // D = y0 + y1
      c.call(f1mPrefix + "_mul", C, D, C),
      // C = (x0 + x1)*(y0 + y1) = x0*y0+x0*y1+x1*y0+x1*y1
      //  c.call(f1mPrefix + "_mul", B, c.i32_const(pNonResidue), r0),  // r0 = nr*(x1*y1)
      c.call(mulNonResidueFn, B, r0),
      // r0 = nr*(x1*y1)
      c.call(f1mPrefix + "_add", A, r0, r0),
      // r0 = x0*y0 + nr*(x1*y1)
      c.call(f1mPrefix + "_add", A, B, r1),
      // r1 = x0*y0+x1*y1
      c.call(f1mPrefix + "_sub", C, r1, r1)
      // r1 = x0*y0+x0*y1+x1*y0+x1*y1 - x0*y0+x1*y1 = x0*y1+x1*y0
    );
  }
  function buildMul1() {
    const f = module.addFunction(prefix + "_mul1");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y = c.getLocal("y");
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_mul", x0, y, r0),
      // A = x0*y
      c.call(f1mPrefix + "_mul", x1, y, r1)
      // B = x1*y
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const AB = c.i32_const(module.alloc(f1n8));
    const APB = c.i32_const(module.alloc(f1n8));
    const APNB = c.i32_const(module.alloc(f1n8));
    const ABPNAB = c.i32_const(module.alloc(f1n8));
    f.addCode(
      // AB = x0*y1
      c.call(f1mPrefix + "_mul", x0, x1, AB),
      // APB = x0+y1
      c.call(f1mPrefix + "_add", x0, x1, APB),
      // APBN0 = x0 + nr*x1
      c.call(mulNonResidueFn, x1, APNB),
      c.call(f1mPrefix + "_add", x0, APNB, APNB),
      // ABPNAB = ab + nr*ab
      c.call(mulNonResidueFn, AB, ABPNAB),
      c.call(f1mPrefix + "_add", ABPNAB, AB, ABPNAB),
      // r0 = APB * APNB - ABPNAB
      c.call(f1mPrefix + "_mul", APB, APNB, r0),
      c.call(f1mPrefix + "_sub", r0, ABPNAB, r0),
      // r1 = AB + AB
      c.call(f1mPrefix + "_add", AB, AB, r1)
    );
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_toMontgomery", x0, r0),
      c.call(f1mPrefix + "_toMontgomery", x1, r1)
    );
  }
  function buildFromMontgomery() {
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_fromMontgomery", x0, r0),
      c.call(f1mPrefix + "_fromMontgomery", x1, r1)
    );
  }
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, r0),
      c.call(f1mPrefix + "_copy", x1, r1)
    );
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_zero", x0),
      c.call(f1mPrefix + "_zero", x1)
    );
  }
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_one", x0),
      c.call(f1mPrefix + "_zero", x1)
    );
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    f.addCode(
      c.i32_and(
        c.call(f1mPrefix + "_eq", x0, y0),
        c.call(f1mPrefix + "_eq", x1, y1)
      )
    );
  }
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.i32_and(
        c.call(f1mPrefix + "_isZero", x0),
        c.call(f1mPrefix + "_isZero", x1)
      )
    );
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const t0 = c.i32_const(module.alloc(f1n8));
    const t1 = c.i32_const(module.alloc(f1n8));
    const t2 = c.i32_const(module.alloc(f1n8));
    const t3 = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_square", x0, t0),
      c.call(f1mPrefix + "_square", x1, t1),
      // c.call(f1mPrefix+"_mul", t1, c.i32_const(pNonResidue), t2),
      c.call(mulNonResidueFn, t1, t2),
      c.call(f1mPrefix + "_sub", t0, t2, t2),
      c.call(f1mPrefix + "_inverse", t2, t3),
      c.call(f1mPrefix + "_mul", x0, t3, r0),
      c.call(f1mPrefix + "_mul", x1, t3, r1),
      c.call(f1mPrefix + "_neg", r1, r1)
    );
  }
  function buildSign() {
    const f = module.addFunction(prefix + "_sign");
    f.addParam("x", "i32");
    f.addLocal("s", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.setLocal("s", c.call(f1mPrefix + "_sign", x1)),
      c.if(
        c.getLocal("s"),
        c.ret(c.getLocal("s"))
      ),
      c.ret(c.call(f1mPrefix + "_sign", x0))
    );
  }
  function buildIsOne() {
    const f = module.addFunction(prefix + "_isOne");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.ret(c.i32_and(
        c.call(f1mPrefix + "_isOne", x0),
        c.call(f1mPrefix + "_isZero", x1)
      ))
    );
  }
  function buildSqrt2() {
    const f = module.addFunction(prefix + "_sqrt");
    f.addParam("a", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const e34 = c.i32_const(module.alloc(utils$4.bigInt2BytesLE((BigInt(q || 0) - 3n) / 4n, f1n8)));
    const e12 = c.i32_const(module.alloc(utils$4.bigInt2BytesLE((BigInt(q || 0) - 1n) / 2n, f1n8)));
    const a = c.getLocal("a");
    const a1 = c.i32_const(module.alloc(f1n8 * 2));
    const alpha = c.i32_const(module.alloc(f1n8 * 2));
    const a0 = c.i32_const(module.alloc(f1n8 * 2));
    const pn1 = module.alloc(f1n8 * 2);
    const n1 = c.i32_const(pn1);
    const n1a = c.i32_const(pn1);
    const n1b = c.i32_const(pn1 + f1n8);
    const x0 = c.i32_const(module.alloc(f1n8 * 2));
    const b = c.i32_const(module.alloc(f1n8 * 2));
    f.addCode(
      c.call(prefix + "_one", n1),
      c.call(prefix + "_neg", n1, n1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_exp", a, e34, c.i32_const(f1n8), a1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_square", a1, alpha),
      c.call(prefix + "_mul", a, alpha, alpha),
      // const a0 = F.mul(F.frobenius(1, alfa), alfa);
      c.call(prefix + "_conjugate", alpha, a0),
      c.call(prefix + "_mul", a0, alpha, a0),
      // if (F.eq(a0, F.negone)) return null;
      c.if(c.call(prefix + "_eq", a0, n1), c.unreachable()),
      // const x0 = F.mul(a1, a);
      c.call(prefix + "_mul", a1, a, x0),
      // if (F.eq(alfa, F.negone)) {
      c.if(
        c.call(prefix + "_eq", alpha, n1),
        [
          // x = F.mul(x0, [F.F.zero, F.F.one]);
          ...c.call(f1mPrefix + "_zero", n1a),
          ...c.call(f1mPrefix + "_one", n1b),
          ...c.call(prefix + "_mul", n1, x0, c.getLocal("pr"))
        ],
        [
          // const b = F.pow(F.add(F.one, alfa), F.sqrt_e12);
          ...c.call(prefix + "_one", b),
          ...c.call(prefix + "_add", b, alpha, b),
          ...c.call(prefix + "_exp", b, e12, c.i32_const(f1n8), b),
          // x = F.mul(b, x0);
          ...c.call(prefix + "_mul", b, x0, c.getLocal("pr"))
        ]
      )
    );
  }
  function buildIsSquare() {
    const f = module.addFunction(prefix + "_isSquare");
    f.addParam("a", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const e34 = c.i32_const(module.alloc(utils$4.bigInt2BytesLE((BigInt(q || 0) - 3n) / 4n, f1n8)));
    const a = c.getLocal("a");
    const a1 = c.i32_const(module.alloc(f1n8 * 2));
    const alpha = c.i32_const(module.alloc(f1n8 * 2));
    const a0 = c.i32_const(module.alloc(f1n8 * 2));
    const pn1 = module.alloc(f1n8 * 2);
    const n1 = c.i32_const(pn1);
    f.addCode(
      c.call(prefix + "_one", n1),
      c.call(prefix + "_neg", n1, n1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_exp", a, e34, c.i32_const(f1n8), a1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_square", a1, alpha),
      c.call(prefix + "_mul", a, alpha, alpha),
      // const a0 = F.mul(F.frobenius(1, alfa), alfa);
      c.call(prefix + "_conjugate", alpha, a0),
      c.call(prefix + "_mul", a0, alpha, a0),
      // if (F.eq(a0, F.negone)) return null;
      c.if(
        c.call(
          prefix + "_eq",
          a0,
          n1
        ),
        c.ret(c.i32_const(0))
      ),
      c.ret(c.i32_const(1))
    );
  }
  buildIsZero();
  buildIsOne();
  buildZero();
  buildOne();
  buildCopy();
  buildMul();
  buildMul1();
  buildSquare();
  buildAdd();
  buildSub();
  buildNeg();
  buildConjugate();
  buildToMontgomery();
  buildFromMontgomery();
  buildEq();
  buildInverse();
  buildTimesScalar2();
  buildSign();
  buildIsNegative();
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_isOne");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_mul1");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_sign");
  module.exportFunction(prefix + "_conjugate");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_inverse");
  buildBatchInverse$1(module, prefix);
  buildExp$1(
    module,
    prefix + "_exp",
    f1n8 * 2,
    prefix + "_mul",
    prefix + "_square",
    prefix + "_copy",
    prefix + "_one"
  );
  buildSqrt2();
  buildIsSquare();
  module.exportFunction(prefix + "_exp");
  module.exportFunction(prefix + "_timesScalar");
  module.exportFunction(prefix + "_batchInverse");
  module.exportFunction(prefix + "_sqrt");
  module.exportFunction(prefix + "_isSquare");
  module.exportFunction(prefix + "_isNegative");
  return prefix;
};
var buildExp = build_timesscalar;
var buildBatchInverse = build_batchinverse;
var build_f3m = function buildF3m(module, mulNonResidueFn, prefix, f1mPrefix) {
  if (module.modules[prefix]) return prefix;
  const f1n8 = module.modules[f1mPrefix].n64 * 8;
  module.modules[prefix] = {
    n64: module.modules[f1mPrefix].n64 * 3
  };
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const y2 = c.i32_add(c.getLocal("y"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_add", x0, y0, r0),
      c.call(f1mPrefix + "_add", x1, y1, r1),
      c.call(f1mPrefix + "_add", x2, y2, r2)
    );
  }
  function buildTimesScalar2() {
    const f = module.addFunction(prefix + "_timesScalar");
    f.addParam("x", "i32");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_timesScalar", x0, c.getLocal("scalar"), c.getLocal("scalarLen"), r0),
      c.call(f1mPrefix + "_timesScalar", x1, c.getLocal("scalar"), c.getLocal("scalarLen"), r1),
      c.call(f1mPrefix + "_timesScalar", x2, c.getLocal("scalar"), c.getLocal("scalarLen"), r2)
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const y2 = c.i32_add(c.getLocal("y"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_sub", x0, y0, r0),
      c.call(f1mPrefix + "_sub", x1, y1, r1),
      c.call(f1mPrefix + "_sub", x2, y2, r2)
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_neg", x0, r0),
      c.call(f1mPrefix + "_neg", x1, r1),
      c.call(f1mPrefix + "_neg", x2, r2)
    );
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.if(
        c.call(f1mPrefix + "_isZero", x2),
        c.if(
          c.call(f1mPrefix + "_isZero", x1),
          c.ret(c.call(f1mPrefix + "_isNegative", x0)),
          c.ret(c.call(f1mPrefix + "_isNegative", x1))
        )
      ),
      c.ret(c.call(f1mPrefix + "_isNegative", x2))
    );
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const cd = f.getCodeBuilder();
    const a = cd.getLocal("x");
    const b = cd.i32_add(cd.getLocal("x"), cd.i32_const(f1n8));
    const c = cd.i32_add(cd.getLocal("x"), cd.i32_const(2 * f1n8));
    const A = cd.getLocal("y");
    const B = cd.i32_add(cd.getLocal("y"), cd.i32_const(f1n8));
    const C = cd.i32_add(cd.getLocal("y"), cd.i32_const(2 * f1n8));
    const r0 = cd.getLocal("r");
    const r1 = cd.i32_add(cd.getLocal("r"), cd.i32_const(f1n8));
    const r2 = cd.i32_add(cd.getLocal("r"), cd.i32_const(2 * f1n8));
    const aA = cd.i32_const(module.alloc(f1n8));
    const bB = cd.i32_const(module.alloc(f1n8));
    const cC = cd.i32_const(module.alloc(f1n8));
    const a_b = cd.i32_const(module.alloc(f1n8));
    const A_B = cd.i32_const(module.alloc(f1n8));
    const a_c = cd.i32_const(module.alloc(f1n8));
    const A_C = cd.i32_const(module.alloc(f1n8));
    const b_c = cd.i32_const(module.alloc(f1n8));
    const B_C = cd.i32_const(module.alloc(f1n8));
    const aA_bB = cd.i32_const(module.alloc(f1n8));
    const aA_cC = cd.i32_const(module.alloc(f1n8));
    const bB_cC = cd.i32_const(module.alloc(f1n8));
    const AUX = cd.i32_const(module.alloc(f1n8));
    f.addCode(
      cd.call(f1mPrefix + "_mul", a, A, aA),
      cd.call(f1mPrefix + "_mul", b, B, bB),
      cd.call(f1mPrefix + "_mul", c, C, cC),
      cd.call(f1mPrefix + "_add", a, b, a_b),
      cd.call(f1mPrefix + "_add", A, B, A_B),
      cd.call(f1mPrefix + "_add", a, c, a_c),
      cd.call(f1mPrefix + "_add", A, C, A_C),
      cd.call(f1mPrefix + "_add", b, c, b_c),
      cd.call(f1mPrefix + "_add", B, C, B_C),
      cd.call(f1mPrefix + "_add", aA, bB, aA_bB),
      cd.call(f1mPrefix + "_add", aA, cC, aA_cC),
      cd.call(f1mPrefix + "_add", bB, cC, bB_cC),
      cd.call(f1mPrefix + "_mul", b_c, B_C, r0),
      cd.call(f1mPrefix + "_sub", r0, bB_cC, r0),
      cd.call(mulNonResidueFn, r0, r0),
      cd.call(f1mPrefix + "_add", aA, r0, r0),
      cd.call(f1mPrefix + "_mul", a_b, A_B, r1),
      cd.call(f1mPrefix + "_sub", r1, aA_bB, r1),
      cd.call(mulNonResidueFn, cC, AUX),
      cd.call(f1mPrefix + "_add", r1, AUX, r1),
      cd.call(f1mPrefix + "_mul", a_c, A_C, r2),
      cd.call(f1mPrefix + "_sub", r2, aA_cC, r2),
      cd.call(f1mPrefix + "_add", r2, bB, r2)
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const A = c.getLocal("x");
    const B = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const C = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    const s0 = c.i32_const(module.alloc(f1n8));
    const ab = c.i32_const(module.alloc(f1n8));
    const s1 = c.i32_const(module.alloc(f1n8));
    const s2 = c.i32_const(module.alloc(f1n8));
    const bc = c.i32_const(module.alloc(f1n8));
    const s3 = c.i32_const(module.alloc(f1n8));
    const s4 = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_square", A, s0),
      c.call(f1mPrefix + "_mul", A, B, ab),
      c.call(f1mPrefix + "_add", ab, ab, s1),
      c.call(f1mPrefix + "_sub", A, B, s2),
      c.call(f1mPrefix + "_add", s2, C, s2),
      c.call(f1mPrefix + "_square", s2, s2),
      c.call(f1mPrefix + "_mul", B, C, bc),
      c.call(f1mPrefix + "_add", bc, bc, s3),
      c.call(f1mPrefix + "_square", C, s4),
      c.call(mulNonResidueFn, s3, r0),
      c.call(f1mPrefix + "_add", s0, r0, r0),
      c.call(mulNonResidueFn, s4, r1),
      c.call(f1mPrefix + "_add", s1, r1, r1),
      c.call(f1mPrefix + "_add", s0, s4, r2),
      c.call(f1mPrefix + "_sub", s3, r2, r2),
      c.call(f1mPrefix + "_add", s2, r2, r2),
      c.call(f1mPrefix + "_add", s1, r2, r2)
    );
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_toMontgomery", x0, r0),
      c.call(f1mPrefix + "_toMontgomery", x1, r1),
      c.call(f1mPrefix + "_toMontgomery", x2, r2)
    );
  }
  function buildFromMontgomery() {
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_fromMontgomery", x0, r0),
      c.call(f1mPrefix + "_fromMontgomery", x1, r1),
      c.call(f1mPrefix + "_fromMontgomery", x2, r2)
    );
  }
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, r0),
      c.call(f1mPrefix + "_copy", x1, r1),
      c.call(f1mPrefix + "_copy", x2, r2)
    );
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_zero", x0),
      c.call(f1mPrefix + "_zero", x1),
      c.call(f1mPrefix + "_zero", x2)
    );
  }
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_one", x0),
      c.call(f1mPrefix + "_zero", x1),
      c.call(f1mPrefix + "_zero", x2)
    );
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const y2 = c.i32_add(c.getLocal("y"), c.i32_const(2 * f1n8));
    f.addCode(
      c.i32_and(
        c.i32_and(
          c.call(f1mPrefix + "_eq", x0, y0),
          c.call(f1mPrefix + "_eq", x1, y1)
        ),
        c.call(f1mPrefix + "_eq", x2, y2)
      )
    );
  }
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.i32_and(
        c.i32_and(
          c.call(f1mPrefix + "_isZero", x0),
          c.call(f1mPrefix + "_isZero", x1)
        ),
        c.call(f1mPrefix + "_isZero", x2)
      )
    );
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    const t0 = c.i32_const(module.alloc(f1n8));
    const t1 = c.i32_const(module.alloc(f1n8));
    const t2 = c.i32_const(module.alloc(f1n8));
    const t3 = c.i32_const(module.alloc(f1n8));
    const t4 = c.i32_const(module.alloc(f1n8));
    const t5 = c.i32_const(module.alloc(f1n8));
    const c0 = c.i32_const(module.alloc(f1n8));
    const c1 = c.i32_const(module.alloc(f1n8));
    const c2 = c.i32_const(module.alloc(f1n8));
    const t6 = c.i32_const(module.alloc(f1n8));
    const AUX = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_square", x0, t0),
      c.call(f1mPrefix + "_square", x1, t1),
      c.call(f1mPrefix + "_square", x2, t2),
      c.call(f1mPrefix + "_mul", x0, x1, t3),
      c.call(f1mPrefix + "_mul", x0, x2, t4),
      c.call(f1mPrefix + "_mul", x1, x2, t5),
      c.call(mulNonResidueFn, t5, c0),
      c.call(f1mPrefix + "_sub", t0, c0, c0),
      c.call(mulNonResidueFn, t2, c1),
      c.call(f1mPrefix + "_sub", c1, t3, c1),
      c.call(f1mPrefix + "_sub", t1, t4, c2),
      c.call(f1mPrefix + "_mul", x2, c1, t6),
      c.call(f1mPrefix + "_mul", x1, c2, AUX),
      c.call(f1mPrefix + "_add", t6, AUX, t6),
      c.call(mulNonResidueFn, t6, t6),
      c.call(f1mPrefix + "_mul", x0, c0, AUX),
      c.call(f1mPrefix + "_add", AUX, t6, t6),
      c.call(f1mPrefix + "_inverse", t6, t6),
      c.call(f1mPrefix + "_mul", t6, c0, r0),
      c.call(f1mPrefix + "_mul", t6, c1, r1),
      c.call(f1mPrefix + "_mul", t6, c2, r2)
    );
  }
  function buildSign() {
    const f = module.addFunction(prefix + "_sign");
    f.addParam("x", "i32");
    f.addLocal("s", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.setLocal("s", c.call(f1mPrefix + "_sign", x2)),
      c.if(
        c.getLocal("s"),
        c.ret(c.getLocal("s"))
      ),
      c.setLocal("s", c.call(f1mPrefix + "_sign", x1)),
      c.if(
        c.getLocal("s"),
        c.ret(c.getLocal("s"))
      ),
      c.ret(c.call(f1mPrefix + "_sign", x0))
    );
  }
  function buildIsOne() {
    const f = module.addFunction(prefix + "_isOne");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8 * 2));
    f.addCode(
      c.ret(
        c.i32_and(
          c.i32_and(
            c.call(f1mPrefix + "_isOne", x0),
            c.call(f1mPrefix + "_isZero", x1)
          ),
          c.call(f1mPrefix + "_isZero", x2)
        )
      )
    );
  }
  buildIsZero();
  buildIsOne();
  buildZero();
  buildOne();
  buildCopy();
  buildMul();
  buildSquare();
  buildAdd();
  buildSub();
  buildNeg();
  buildSign();
  buildToMontgomery();
  buildFromMontgomery();
  buildEq();
  buildInverse();
  buildTimesScalar2();
  buildIsNegative();
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_isOne");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_sign");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_inverse");
  buildBatchInverse(module, prefix);
  buildExp(
    module,
    prefix + "_exp",
    f1n8 * 3,
    prefix + "_mul",
    prefix + "_square",
    prefix + "_copy",
    prefix + "_one"
  );
  module.exportFunction(prefix + "_exp");
  module.exportFunction(prefix + "_timesScalar");
  module.exportFunction(prefix + "_batchInverse");
  module.exportFunction(prefix + "_isNegative");
  return prefix;
};
var build_timesscalarnaf = function buildTimesScalarNAF(module, fnName, elementLen, opAB, opAA, opAmB, opCopy, opInit) {
  const f = module.addFunction(fnName);
  f.addParam("base", "i32");
  f.addParam("scalar", "i32");
  f.addParam("scalarLength", "i32");
  f.addParam("r", "i32");
  f.addLocal("old0", "i32");
  f.addLocal("nbits", "i32");
  f.addLocal("i", "i32");
  f.addLocal("last", "i32");
  f.addLocal("cur", "i32");
  f.addLocal("carry", "i32");
  f.addLocal("p", "i32");
  const c = f.getCodeBuilder();
  const aux = c.i32_const(module.alloc(elementLen));
  function getBit(IDX) {
    return c.i32_and(
      c.i32_shr_u(
        c.i32_load(
          c.i32_add(
            c.getLocal("scalar"),
            c.i32_and(
              c.i32_shr_u(
                IDX,
                c.i32_const(3)
              ),
              c.i32_const(4294967292)
            )
          )
        ),
        c.i32_and(
          IDX,
          c.i32_const(31)
        )
      ),
      c.i32_const(1)
    );
  }
  function pushBit(b) {
    return [
      ...c.i32_store8(
        c.getLocal("p"),
        c.i32_const(b)
      ),
      ...c.setLocal(
        "p",
        c.i32_add(
          c.getLocal("p"),
          c.i32_const(1)
        )
      )
    ];
  }
  f.addCode(
    c.if(
      c.i32_eqz(c.getLocal("scalarLength")),
      [
        ...c.call(opInit, c.getLocal("r")),
        ...c.ret([])
      ]
    ),
    c.setLocal("nbits", c.i32_shl(c.getLocal("scalarLength"), c.i32_const(3))),
    c.setLocal("old0", c.i32_load(c.i32_const(0))),
    c.setLocal("p", c.getLocal("old0")),
    c.i32_store(
      c.i32_const(0),
      c.i32_and(
        c.i32_add(
          c.i32_add(
            c.getLocal("old0"),
            c.i32_const(32)
          ),
          c.getLocal("nbits")
        ),
        c.i32_const(4294967288)
      )
    ),
    c.setLocal("i", c.i32_const(1)),
    c.setLocal("last", getBit(c.i32_const(0))),
    c.setLocal("carry", c.i32_const(0)),
    c.block(c.loop(
      c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("nbits"))),
      c.setLocal("cur", getBit(c.getLocal("i"))),
      c.if(
        c.getLocal("last"),
        c.if(
          c.getLocal("cur"),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(1)
            ],
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(255)
            ]
          ),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(255)
            ],
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(1)
            ]
          )
        ),
        c.if(
          c.getLocal("cur"),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(0)
            ],
            [
              ...c.setLocal("last", c.i32_const(1)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(0)
            ]
          ),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(1)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(0)
            ],
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(0)
            ]
          )
        )
      ),
      c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    )),
    c.if(
      c.getLocal("last"),
      c.if(
        c.getLocal("carry"),
        [
          ...pushBit(255),
          ...pushBit(0),
          ...pushBit(1)
        ],
        [
          ...pushBit(1)
        ]
      ),
      c.if(
        c.getLocal("carry"),
        [
          ...pushBit(0),
          ...pushBit(1)
        ]
      )
    ),
    c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
    // p already points to the last bit
    c.call(opCopy, c.getLocal("base"), aux),
    c.call(opInit, c.getLocal("r")),
    c.block(c.loop(
      c.call(opAA, c.getLocal("r"), c.getLocal("r")),
      c.setLocal(
        "cur",
        c.i32_load8_u(
          c.getLocal("p")
        )
      ),
      c.if(
        c.getLocal("cur"),
        c.if(
          c.i32_eq(c.getLocal("cur"), c.i32_const(1)),
          c.call(opAB, c.getLocal("r"), aux, c.getLocal("r")),
          c.call(opAmB, c.getLocal("r"), aux, c.getLocal("r"))
        )
      ),
      c.br_if(1, c.i32_eq(c.getLocal("old0"), c.getLocal("p"))),
      c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
      c.br(0)
    )),
    c.i32_store(c.i32_const(0), c.getLocal("old0"))
  );
};
var build_multiexp = function buildMultiexp(module, prefix, fnName, opAdd, n8b) {
  const n64g = module.modules[prefix].n64;
  const n8g = n64g * 8;
  function buildGetChunk() {
    const f = module.addFunction(fnName + "_getChunk");
    f.addParam("pScalar", "i32");
    f.addParam("scalarSize", "i32");
    f.addParam("startBit", "i32");
    f.addParam("chunkSize", "i32");
    f.addLocal("bitsToEnd", "i32");
    f.addLocal("mask", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "bitsToEnd",
        c.i32_sub(
          c.i32_mul(
            c.getLocal("scalarSize"),
            c.i32_const(8)
          ),
          c.getLocal("startBit")
        )
      ),
      c.if(
        c.i32_gt_s(
          c.getLocal("chunkSize"),
          c.getLocal("bitsToEnd")
        ),
        c.setLocal(
          "mask",
          c.i32_sub(
            c.i32_shl(
              c.i32_const(1),
              c.getLocal("bitsToEnd")
            ),
            c.i32_const(1)
          )
        ),
        c.setLocal(
          "mask",
          c.i32_sub(
            c.i32_shl(
              c.i32_const(1),
              c.getLocal("chunkSize")
            ),
            c.i32_const(1)
          )
        )
      ),
      c.i32_and(
        c.i32_shr_u(
          c.i32_load(
            c.i32_add(
              c.getLocal("pScalar"),
              c.i32_shr_u(
                c.getLocal("startBit"),
                c.i32_const(3)
              )
            ),
            0,
            // offset
            0
            // align to byte.
          ),
          c.i32_and(
            c.getLocal("startBit"),
            c.i32_const(7)
          )
        ),
        c.getLocal("mask")
      )
    );
  }
  function buildMutiexpChunk() {
    const f = module.addFunction(fnName + "_chunk");
    f.addParam("pBases", "i32");
    f.addParam("pScalars", "i32");
    f.addParam("scalarSize", "i32");
    f.addParam("n", "i32");
    f.addParam("startBit", "i32");
    f.addParam("chunkSize", "i32");
    f.addParam("pr", "i32");
    f.addLocal("nChunks", "i32");
    f.addLocal("itScalar", "i32");
    f.addLocal("endScalar", "i32");
    f.addLocal("itBase", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("nTable", "i32");
    f.addLocal("pTable", "i32");
    f.addLocal("idx", "i32");
    f.addLocal("pIdxTable", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.i32_eqz(c.getLocal("n")),
        [
          ...c.call(prefix + "_zero", c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      // Allocate memory
      c.setLocal(
        "nTable",
        c.i32_shl(
          c.i32_const(1),
          c.getLocal("chunkSize")
        )
      ),
      c.setLocal("pTable", c.i32_load(c.i32_const(0))),
      c.i32_store(
        c.i32_const(0),
        c.i32_add(
          c.getLocal("pTable"),
          c.i32_mul(
            c.getLocal("nTable"),
            c.i32_const(n8g)
          )
        )
      ),
      // Reset Table
      c.setLocal("j", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("j"),
            c.getLocal("nTable")
          )
        ),
        c.call(
          prefix + "_zero",
          c.i32_add(
            c.getLocal("pTable"),
            c.i32_mul(
              c.getLocal("j"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
        c.br(0)
      )),
      // Distribute elements
      c.setLocal("itBase", c.getLocal("pBases")),
      c.setLocal("itScalar", c.getLocal("pScalars")),
      c.setLocal(
        "endScalar",
        c.i32_add(
          c.getLocal("pScalars"),
          c.i32_mul(
            c.getLocal("n"),
            c.getLocal("scalarSize")
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("itScalar"),
            c.getLocal("endScalar")
          )
        ),
        c.setLocal(
          "idx",
          c.call(
            fnName + "_getChunk",
            c.getLocal("itScalar"),
            c.getLocal("scalarSize"),
            c.getLocal("startBit"),
            c.getLocal("chunkSize")
          )
        ),
        c.if(
          c.getLocal("idx"),
          [
            ...c.setLocal(
              "pIdxTable",
              c.i32_add(
                c.getLocal("pTable"),
                c.i32_mul(
                  c.i32_sub(
                    c.getLocal("idx"),
                    c.i32_const(1)
                  ),
                  c.i32_const(n8g)
                )
              )
            ),
            ...c.call(
              opAdd,
              c.getLocal("pIdxTable"),
              c.getLocal("itBase"),
              c.getLocal("pIdxTable")
            )
          ]
        ),
        c.setLocal("itScalar", c.i32_add(c.getLocal("itScalar"), c.getLocal("scalarSize"))),
        c.setLocal("itBase", c.i32_add(c.getLocal("itBase"), c.i32_const(n8b))),
        c.br(0)
      )),
      c.call(fnName + "_reduceTable", c.getLocal("pTable"), c.getLocal("chunkSize")),
      c.call(
        prefix + "_copy",
        c.getLocal("pTable"),
        c.getLocal("pr")
      ),
      c.i32_store(
        c.i32_const(0),
        c.getLocal("pTable")
      )
    );
  }
  function buildMultiexp3() {
    const f = module.addFunction(fnName);
    f.addParam("pBases", "i32");
    f.addParam("pScalars", "i32");
    f.addParam("scalarSize", "i32");
    f.addParam("n", "i32");
    f.addParam("pr", "i32");
    f.addLocal("chunkSize", "i32");
    f.addLocal("nChunks", "i32");
    f.addLocal("itScalar", "i32");
    f.addLocal("endScalar", "i32");
    f.addLocal("itBase", "i32");
    f.addLocal("itBit", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("nTable", "i32");
    f.addLocal("pTable", "i32");
    f.addLocal("idx", "i32");
    f.addLocal("pIdxTable", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8g));
    const pTSizes2 = module.alloc([
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      16,
      16,
      15,
      14,
      13,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      1,
      1,
      1
    ]);
    f.addCode(
      c.call(prefix + "_zero", c.getLocal("pr")),
      c.if(
        c.i32_eqz(c.getLocal("n")),
        c.ret([])
      ),
      c.setLocal("chunkSize", c.i32_load8_u(c.i32_clz(c.getLocal("n")), pTSizes2)),
      c.setLocal(
        "nChunks",
        c.i32_add(
          c.i32_div_u(
            c.i32_sub(
              c.i32_shl(
                c.getLocal("scalarSize"),
                c.i32_const(3)
              ),
              c.i32_const(1)
            ),
            c.getLocal("chunkSize")
          ),
          c.i32_const(1)
        )
      ),
      // Allocate memory
      c.setLocal(
        "itBit",
        c.i32_mul(
          c.i32_sub(
            c.getLocal("nChunks"),
            c.i32_const(1)
          ),
          c.getLocal("chunkSize")
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_lt_s(
            c.getLocal("itBit"),
            c.i32_const(0)
          )
        ),
        // Double nChunk times
        c.if(
          c.i32_eqz(c.call(prefix + "_isZero", c.getLocal("pr"))),
          [
            ...c.setLocal("j", c.i32_const(0)),
            ...c.block(c.loop(
              c.br_if(
                1,
                c.i32_eq(
                  c.getLocal("j"),
                  c.getLocal("chunkSize")
                )
              ),
              c.call(prefix + "_double", c.getLocal("pr"), c.getLocal("pr")),
              c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
              c.br(0)
            ))
          ]
        ),
        c.call(
          fnName + "_chunk",
          c.getLocal("pBases"),
          c.getLocal("pScalars"),
          c.getLocal("scalarSize"),
          c.getLocal("n"),
          c.getLocal("itBit"),
          c.getLocal("chunkSize"),
          aux
        ),
        c.call(
          prefix + "_add",
          c.getLocal("pr"),
          aux,
          c.getLocal("pr")
        ),
        c.setLocal("itBit", c.i32_sub(c.getLocal("itBit"), c.getLocal("chunkSize"))),
        c.br(0)
      ))
    );
  }
  function buildReduceTable() {
    const f = module.addFunction(fnName + "_reduceTable");
    f.addParam("pTable", "i32");
    f.addParam("p", "i32");
    f.addLocal("half", "i32");
    f.addLocal("it1", "i32");
    f.addLocal("it2", "i32");
    f.addLocal("pAcc", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.i32_eq(c.getLocal("p"), c.i32_const(1)),
        c.ret([])
      ),
      c.setLocal(
        "half",
        c.i32_shl(
          c.i32_const(1),
          c.i32_sub(
            c.getLocal("p"),
            c.i32_const(1)
          )
        )
      ),
      c.setLocal("it1", c.getLocal("pTable")),
      c.setLocal(
        "it2",
        c.i32_add(
          c.getLocal("pTable"),
          c.i32_mul(
            c.getLocal("half"),
            c.i32_const(n8g)
          )
        )
      ),
      c.setLocal(
        "pAcc",
        c.i32_sub(
          c.getLocal("it2"),
          c.i32_const(n8g)
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("it1"),
            c.getLocal("pAcc")
          )
        ),
        c.call(
          prefix + "_add",
          c.getLocal("it1"),
          c.getLocal("it2"),
          c.getLocal("it1")
        ),
        c.call(
          prefix + "_add",
          c.getLocal("pAcc"),
          c.getLocal("it2"),
          c.getLocal("pAcc")
        ),
        c.setLocal("it1", c.i32_add(c.getLocal("it1"), c.i32_const(n8g))),
        c.setLocal("it2", c.i32_add(c.getLocal("it2"), c.i32_const(n8g))),
        c.br(0)
      )),
      c.call(
        fnName + "_reduceTable",
        c.getLocal("pTable"),
        c.i32_sub(
          c.getLocal("p"),
          c.i32_const(1)
        )
      ),
      c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
      c.block(c.loop(
        c.br_if(1, c.i32_eqz(c.getLocal("p"))),
        c.call(prefix + "_double", c.getLocal("pAcc"), c.getLocal("pAcc")),
        c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
        c.br(0)
      )),
      c.call(prefix + "_add", c.getLocal("pTable"), c.getLocal("pAcc"), c.getLocal("pTable"))
    );
  }
  buildGetChunk();
  buildReduceTable();
  buildMutiexpChunk();
  buildMultiexp3();
  module.exportFunction(fnName);
  module.exportFunction(fnName + "_chunk");
};
var buildTimesScalarNAF2 = build_timesscalarnaf;
var buildBatchConvertion = build_batchconvertion;
var buildMultiexp$1 = build_multiexp;
var build_curve_jacobian_a0 = function buildCurve(module, prefix, prefixField, pB) {
  const n64 = module.modules[prefixField].n64;
  const n8 = n64 * 8;
  if (module.modules[prefix]) return prefix;
  module.modules[prefix] = {
    n64: n64 * 3
  };
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("p1", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_isZero",
      c.i32_add(
        c.getLocal("p1"),
        c.i32_const(n8 * 2)
      )
    ));
  }
  function buildIsZeroAffine() {
    const f = module.addFunction(prefix + "_isZeroAffine");
    f.addParam("p1", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.i32_and(
        c.call(
          prefixField + "_isZero",
          c.getLocal("p1")
        ),
        c.call(
          prefixField + "_isZero",
          c.i32_add(
            c.getLocal("p1"),
            c.i32_const(n8)
          )
        )
      )
    );
  }
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("ps", "i32");
    f.addParam("pd", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64 * 3; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pd"),
          i * 8,
          c.i64_load(
            c.getLocal("ps"),
            i * 8
          )
        )
      );
    }
  }
  function buildCopyAffine() {
    const f = module.addFunction(prefix + "_copyAffine");
    f.addParam("ps", "i32");
    f.addParam("pd", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64 * 2; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pd"),
          i * 8,
          c.i64_load(
            c.getLocal("ps"),
            i * 8
          )
        )
      );
    }
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_zero",
      c.getLocal("pr")
    ));
    f.addCode(c.call(
      prefixField + "_one",
      c.i32_add(
        c.getLocal("pr"),
        c.i32_const(n8)
      )
    ));
    f.addCode(c.call(
      prefixField + "_zero",
      c.i32_add(
        c.getLocal("pr"),
        c.i32_const(n8 * 2)
      )
    ));
  }
  function buildZeroAffine() {
    const f = module.addFunction(prefix + "_zeroAffine");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_zero",
      c.getLocal("pr")
    ));
    f.addCode(c.call(
      prefixField + "_zero",
      c.i32_add(
        c.getLocal("pr"),
        c.i32_const(n8)
      )
    ));
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.setReturnType("i32");
    f.addLocal("z1", "i32");
    f.addLocal("z2", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    f.addCode(c.setLocal("z2", c.i32_add(c.getLocal("p2"), c.i32_const(n8 * 2))));
    const z2 = c.getLocal("z2");
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const Z2Z2 = c.i32_const(module.alloc(n8));
    const U1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const Z2_cubed = c.i32_const(module.alloc(n8));
    const S1 = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        c.ret(c.call(prefix + "_isZero", c.getLocal("p2")))
      ),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p2")),
        c.ret(c.i32_const(0))
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        c.ret(c.call(prefix + "_eqMixed", c.getLocal("p2"), c.getLocal("p1")))
      ),
      c.if(
        c.call(prefixField + "_isOne", z2),
        c.ret(c.call(prefix + "_eqMixed", c.getLocal("p1"), c.getLocal("p2")))
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_square", z2, Z2Z2),
      c.call(prefixField + "_mul", x1, Z2Z2, U1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", z2, Z2Z2, Z2_cubed),
      c.call(prefixField + "_mul", y1, Z2_cubed, S1),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", U1, U2),
        c.if(
          c.call(prefixField + "_eq", S1, S2),
          c.ret(c.i32_const(1))
        )
      ),
      c.ret(c.i32_const(0))
    );
  }
  function buildEqMixed() {
    const f = module.addFunction(prefix + "_eqMixed");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.setReturnType("i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        c.ret(c.call(prefix + "_isZeroAffine", c.getLocal("p2")))
      ),
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p2")),
        c.ret(c.i32_const(0))
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        c.ret(c.call(prefix + "_eqAffine", c.getLocal("p1"), c.getLocal("p2")))
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", x1, U2),
        c.if(
          c.call(prefixField + "_eq", y1, S2),
          c.ret(c.i32_const(1))
        )
      ),
      c.ret(c.i32_const(0))
    );
  }
  function buildDouble() {
    const f = module.addFunction(prefix + "_double");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const A = c.i32_const(module.alloc(n8));
    const B = c.i32_const(module.alloc(n8));
    const C = c.i32_const(module.alloc(n8));
    const D = c.i32_const(module.alloc(n8));
    const E = c.i32_const(module.alloc(n8));
    const F = c.i32_const(module.alloc(n8));
    const G = c.i32_const(module.alloc(n8));
    const eightC = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z),
        [
          ...c.ret(c.call(prefix + "_doubleAffine", c.getLocal("p1"), c.getLocal("pr"))),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_square", x, A),
      c.call(prefixField + "_square", y, B),
      c.call(prefixField + "_square", B, C),
      c.call(prefixField + "_add", x, B, D),
      c.call(prefixField + "_square", D, D),
      c.call(prefixField + "_sub", D, A, D),
      c.call(prefixField + "_sub", D, C, D),
      c.call(prefixField + "_add", D, D, D),
      c.call(prefixField + "_add", A, A, E),
      c.call(prefixField + "_add", E, A, E),
      c.call(prefixField + "_square", E, F),
      c.call(prefixField + "_mul", y, z, G),
      c.call(prefixField + "_add", D, D, x3),
      c.call(prefixField + "_sub", F, x3, x3),
      c.call(prefixField + "_add", C, C, eightC),
      c.call(prefixField + "_add", eightC, eightC, eightC),
      c.call(prefixField + "_add", eightC, eightC, eightC),
      c.call(prefixField + "_sub", D, x3, y3),
      c.call(prefixField + "_mul", y3, E, y3),
      c.call(prefixField + "_sub", y3, eightC, y3),
      c.call(prefixField + "_add", G, G, z3)
    );
  }
  function buildDoubleAffine() {
    const f = module.addFunction(prefix + "_doubleAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const XX = c.i32_const(module.alloc(n8));
    const YY = c.i32_const(module.alloc(n8));
    const YYYY = c.i32_const(module.alloc(n8));
    const S = c.i32_const(module.alloc(n8));
    const M = c.i32_const(module.alloc(n8));
    const eightYYYY = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p1")),
        [
          ...c.call(prefix + "_toJacobian", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      // XX = X1^2
      c.call(prefixField + "_square", x, XX),
      // YY = Y1^2
      c.call(prefixField + "_square", y, YY),
      // YYYY = YY^2
      c.call(prefixField + "_square", YY, YYYY),
      // S = 2*((X1+YY)^2-XX-YYYY)
      c.call(prefixField + "_add", x, YY, S),
      c.call(prefixField + "_square", S, S),
      c.call(prefixField + "_sub", S, XX, S),
      c.call(prefixField + "_sub", S, YYYY, S),
      c.call(prefixField + "_add", S, S, S),
      // M = 3*XX+a  (Hera a=0)
      c.call(prefixField + "_add", XX, XX, M),
      c.call(prefixField + "_add", M, XX, M),
      // Z3 = 2*Y1
      c.call(prefixField + "_add", y, y, z3),
      // T = M^2-2*S
      // X3 = T
      c.call(prefixField + "_square", M, x3),
      c.call(prefixField + "_sub", x3, S, x3),
      c.call(prefixField + "_sub", x3, S, x3),
      // Y3 = M*(S-T)-8*YYYY
      c.call(prefixField + "_add", YYYY, YYYY, eightYYYY),
      c.call(prefixField + "_add", eightYYYY, eightYYYY, eightYYYY),
      c.call(prefixField + "_add", eightYYYY, eightYYYY, eightYYYY),
      c.call(prefixField + "_sub", S, x3, y3),
      c.call(prefixField + "_mul", y3, M, y3),
      c.call(prefixField + "_sub", y3, eightYYYY, y3)
    );
  }
  function buildEqAffine() {
    const f = module.addFunction(prefix + "_eqAffine");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.setReturnType("i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.ret(c.i32_and(
        c.call(
          prefixField + "_eq",
          c.getLocal("p1"),
          c.getLocal("p2")
        ),
        c.call(
          prefixField + "_eq",
          c.i32_add(c.getLocal("p1"), c.i32_const(n8)),
          c.i32_add(c.getLocal("p2"), c.i32_const(n8))
        )
      ))
    );
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_toMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 3; i++) {
      f.addCode(c.call(
        prefixField + "_toMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildToMontgomeryAffine() {
    const f = module.addFunction(prefix + "_toMontgomeryAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_toMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 2; i++) {
      f.addCode(c.call(
        prefixField + "_toMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildFromMontgomery() {
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_fromMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 3; i++) {
      f.addCode(c.call(
        prefixField + "_fromMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildFromMontgomeryAffine() {
    const f = module.addFunction(prefix + "_fromMontgomeryAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_fromMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 2; i++) {
      f.addCode(c.call(
        prefixField + "_fromMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    f.addLocal("z1", "i32");
    f.addLocal("z2", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    f.addCode(c.setLocal("z2", c.i32_add(c.getLocal("p2"), c.i32_const(n8 * 2))));
    const z2 = c.getLocal("z2");
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const Z2Z2 = c.i32_const(module.alloc(n8));
    const U1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const Z2_cubed = c.i32_const(module.alloc(n8));
    const S1 = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    const H = c.i32_const(module.alloc(n8));
    const S2_minus_S1 = c.i32_const(module.alloc(n8));
    const I = c.i32_const(module.alloc(n8));
    const J = c.i32_const(module.alloc(n8));
    const r = c.i32_const(module.alloc(n8));
    const r2 = c.i32_const(module.alloc(n8));
    const V = c.i32_const(module.alloc(n8));
    const V2 = c.i32_const(module.alloc(n8));
    const S1_J2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p2"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p2")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        [
          ...c.call(prefix + "_addMixed", x2, x1, x3),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z2),
        [
          ...c.call(prefix + "_addMixed", x1, x2, x3),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_square", z2, Z2Z2),
      c.call(prefixField + "_mul", x1, Z2Z2, U1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", z2, Z2Z2, Z2_cubed),
      c.call(prefixField + "_mul", y1, Z2_cubed, S1),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", U1, U2),
        c.if(
          c.call(prefixField + "_eq", S1, S2),
          [
            ...c.call(prefix + "_double", c.getLocal("p1"), c.getLocal("pr")),
            ...c.ret([])
          ]
        )
      ),
      c.call(prefixField + "_sub", U2, U1, H),
      c.call(prefixField + "_sub", S2, S1, S2_minus_S1),
      c.call(prefixField + "_add", H, H, I),
      c.call(prefixField + "_square", I, I),
      c.call(prefixField + "_mul", H, I, J),
      c.call(prefixField + "_add", S2_minus_S1, S2_minus_S1, r),
      c.call(prefixField + "_mul", U1, I, V),
      c.call(prefixField + "_square", r, r2),
      c.call(prefixField + "_add", V, V, V2),
      c.call(prefixField + "_sub", r2, J, x3),
      c.call(prefixField + "_sub", x3, V2, x3),
      c.call(prefixField + "_mul", S1, J, S1_J2),
      c.call(prefixField + "_add", S1_J2, S1_J2, S1_J2),
      c.call(prefixField + "_sub", V, x3, y3),
      c.call(prefixField + "_mul", y3, r, y3),
      c.call(prefixField + "_sub", y3, S1_J2, y3),
      c.call(prefixField + "_add", z1, z2, z3),
      c.call(prefixField + "_square", z3, z3),
      c.call(prefixField + "_sub", z3, Z1Z1, z3),
      c.call(prefixField + "_sub", z3, Z2Z2, z3),
      c.call(prefixField + "_mul", z3, H, z3)
    );
  }
  function buildAddMixed() {
    const f = module.addFunction(prefix + "_addMixed");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    const H = c.i32_const(module.alloc(n8));
    const HH = c.i32_const(module.alloc(n8));
    const S2_minus_y1 = c.i32_const(module.alloc(n8));
    const I = c.i32_const(module.alloc(n8));
    const J = c.i32_const(module.alloc(n8));
    const r = c.i32_const(module.alloc(n8));
    const r2 = c.i32_const(module.alloc(n8));
    const V = c.i32_const(module.alloc(n8));
    const V2 = c.i32_const(module.alloc(n8));
    const y1_J2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copyAffine", c.getLocal("p2"), c.getLocal("pr")),
          ...c.call(prefixField + "_one", c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p2")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        [
          ...c.call(prefix + "_addAffine", x1, x2, x3),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", x1, U2),
        c.if(
          c.call(prefixField + "_eq", y1, S2),
          [
            ...c.call(prefix + "_doubleAffine", c.getLocal("p2"), c.getLocal("pr")),
            ...c.ret([])
          ]
        )
      ),
      c.call(prefixField + "_sub", U2, x1, H),
      c.call(prefixField + "_sub", S2, y1, S2_minus_y1),
      c.call(prefixField + "_square", H, HH),
      c.call(prefixField + "_add", HH, HH, I),
      c.call(prefixField + "_add", I, I, I),
      c.call(prefixField + "_mul", H, I, J),
      c.call(prefixField + "_add", S2_minus_y1, S2_minus_y1, r),
      c.call(prefixField + "_mul", x1, I, V),
      c.call(prefixField + "_square", r, r2),
      c.call(prefixField + "_add", V, V, V2),
      c.call(prefixField + "_sub", r2, J, x3),
      c.call(prefixField + "_sub", x3, V2, x3),
      c.call(prefixField + "_mul", y1, J, y1_J2),
      c.call(prefixField + "_add", y1_J2, y1_J2, y1_J2),
      c.call(prefixField + "_sub", V, x3, y3),
      c.call(prefixField + "_mul", y3, r, y3),
      c.call(prefixField + "_sub", y3, y1_J2, y3),
      c.call(prefixField + "_add", z1, H, z3),
      c.call(prefixField + "_square", z3, z3),
      c.call(prefixField + "_sub", z3, Z1Z1, z3),
      c.call(prefixField + "_sub", z3, HH, z3)
    );
  }
  function buildAddAffine() {
    const f = module.addFunction(prefix + "_addAffine");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const H = c.i32_const(module.alloc(n8));
    const HH = c.i32_const(module.alloc(n8));
    const y2_minus_y1 = c.i32_const(module.alloc(n8));
    const I = c.i32_const(module.alloc(n8));
    const J = c.i32_const(module.alloc(n8));
    const r = c.i32_const(module.alloc(n8));
    const r2 = c.i32_const(module.alloc(n8));
    const V = c.i32_const(module.alloc(n8));
    const V2 = c.i32_const(module.alloc(n8));
    const y1_J2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copyAffine", c.getLocal("p2"), c.getLocal("pr")),
          ...c.call(prefixField + "_one", c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p2")),
        [
          ...c.call(prefix + "_copyAffine", c.getLocal("p1"), c.getLocal("pr")),
          ...c.call(prefixField + "_one", c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_eq", x1, x2),
        c.if(
          c.call(prefixField + "_eq", y1, y2),
          [
            ...c.call(prefix + "_doubleAffine", c.getLocal("p2"), c.getLocal("pr")),
            ...c.ret([])
          ]
        )
      ),
      c.call(prefixField + "_sub", x2, x1, H),
      c.call(prefixField + "_sub", y2, y1, y2_minus_y1),
      c.call(prefixField + "_square", H, HH),
      c.call(prefixField + "_add", HH, HH, I),
      c.call(prefixField + "_add", I, I, I),
      c.call(prefixField + "_mul", H, I, J),
      c.call(prefixField + "_add", y2_minus_y1, y2_minus_y1, r),
      c.call(prefixField + "_mul", x1, I, V),
      c.call(prefixField + "_square", r, r2),
      c.call(prefixField + "_add", V, V, V2),
      c.call(prefixField + "_sub", r2, J, x3),
      c.call(prefixField + "_sub", x3, V2, x3),
      c.call(prefixField + "_mul", y1, J, y1_J2),
      c.call(prefixField + "_add", y1_J2, y1_J2, y1_J2),
      c.call(prefixField + "_sub", V, x3, y3),
      c.call(prefixField + "_mul", y3, r, y3),
      c.call(prefixField + "_sub", y3, y1_J2, y3),
      c.call(prefixField + "_add", H, H, z3)
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    f.addCode(
      c.call(prefixField + "_copy", x, x3),
      c.call(prefixField + "_neg", y, y3),
      c.call(prefixField + "_copy", z, z3)
    );
  }
  function buildNegAffine() {
    const f = module.addFunction(prefix + "_negAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    f.addCode(
      c.call(prefixField + "_copy", x, x3),
      c.call(prefixField + "_neg", y, y3)
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8 * 3));
    f.addCode(
      c.call(prefix + "_neg", c.getLocal("p2"), AUX),
      c.call(prefix + "_add", c.getLocal("p1"), AUX, c.getLocal("pr"))
    );
  }
  function buildSubMixed() {
    const f = module.addFunction(prefix + "_subMixed");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8 * 3));
    f.addCode(
      c.call(prefix + "_negAffine", c.getLocal("p2"), AUX),
      c.call(prefix + "_addMixed", c.getLocal("p1"), AUX, c.getLocal("pr"))
    );
  }
  function buildSubAffine() {
    const f = module.addFunction(prefix + "_subAffine");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8 * 3));
    f.addCode(
      c.call(prefix + "_negAffine", c.getLocal("p2"), AUX),
      c.call(prefix + "_addAffine", c.getLocal("p1"), AUX, c.getLocal("pr"))
    );
  }
  function buildNormalize() {
    const f = module.addFunction(prefix + "_normalize");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const Z_inv = c.i32_const(module.alloc(n8));
    const Z2_inv = c.i32_const(module.alloc(n8));
    const Z3_inv = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        c.call(prefix + "_zero", c.getLocal("pr")),
        [
          ...c.call(prefixField + "_inverse", z, Z_inv),
          ...c.call(prefixField + "_square", Z_inv, Z2_inv),
          ...c.call(prefixField + "_mul", Z_inv, Z2_inv, Z3_inv),
          ...c.call(prefixField + "_mul", x, Z2_inv, x3),
          ...c.call(prefixField + "_mul", y, Z3_inv, y3),
          ...c.call(prefixField + "_one", z3)
        ]
      )
    );
  }
  function buildToAffine() {
    const f = module.addFunction(prefix + "_toAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const Z_inv = c.i32_const(module.alloc(n8));
    const Z2_inv = c.i32_const(module.alloc(n8));
    const Z3_inv = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefixField + "_zero", x3),
          ...c.call(prefixField + "_zero", y3)
        ],
        [
          ...c.call(prefixField + "_inverse", z, Z_inv),
          ...c.call(prefixField + "_square", Z_inv, Z2_inv),
          ...c.call(prefixField + "_mul", Z_inv, Z2_inv, Z3_inv),
          ...c.call(prefixField + "_mul", x, Z2_inv, x3),
          ...c.call(prefixField + "_mul", y, Z3_inv, y3)
        ]
      )
    );
  }
  function buildToJacobian() {
    const f = module.addFunction(prefix + "_toJacobian");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p1")),
        c.call(prefix + "_zero", c.getLocal("pr")),
        [
          ...c.call(prefixField + "_one", z3),
          ...c.call(prefixField + "_copy", y, y3),
          ...c.call(prefixField + "_copy", x, x3)
        ]
      )
    );
  }
  function buildBatchToAffine() {
    const f = module.addFunction(prefix + "_batchToAffine");
    f.addParam("pIn", "i32");
    f.addParam("n", "i32");
    f.addParam("pOut", "i32");
    f.addLocal("pAux", "i32");
    f.addLocal("itIn", "i32");
    f.addLocal("itAux", "i32");
    f.addLocal("itOut", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const tmp = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("pAux", c.i32_load(c.i32_const(0))),
      c.i32_store(
        c.i32_const(0),
        c.i32_add(
          c.getLocal("pAux"),
          c.i32_mul(c.getLocal("n"), c.i32_const(n8))
        )
      ),
      c.call(
        prefixField + "_batchInverse",
        c.i32_add(c.getLocal("pIn"), c.i32_const(n8 * 2)),
        c.i32_const(n8 * 3),
        c.getLocal("n"),
        c.getLocal("pAux"),
        c.i32_const(n8)
      ),
      c.setLocal("itIn", c.getLocal("pIn")),
      c.setLocal("itAux", c.getLocal("pAux")),
      c.setLocal("itOut", c.getLocal("pOut")),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.if(
          c.call(prefixField + "_isZero", c.getLocal("itAux")),
          [
            ...c.call(prefixField + "_zero", c.getLocal("itOut")),
            ...c.call(prefixField + "_zero", c.i32_add(c.getLocal("itOut"), c.i32_const(n8)))
          ],
          [
            ...c.call(
              prefixField + "_mul",
              c.getLocal("itAux"),
              c.i32_add(c.getLocal("itIn"), c.i32_const(n8)),
              tmp
            ),
            ...c.call(
              prefixField + "_square",
              c.getLocal("itAux"),
              c.getLocal("itAux")
            ),
            ...c.call(
              prefixField + "_mul",
              c.getLocal("itAux"),
              c.getLocal("itIn"),
              c.getLocal("itOut")
            ),
            ...c.call(
              prefixField + "_mul",
              c.getLocal("itAux"),
              tmp,
              c.i32_add(c.getLocal("itOut"), c.i32_const(n8))
            )
          ]
        ),
        c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.i32_const(n8 * 3))),
        c.setLocal("itOut", c.i32_add(c.getLocal("itOut"), c.i32_const(n8 * 2))),
        c.setLocal("itAux", c.i32_add(c.getLocal("itAux"), c.i32_const(n8))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      )),
      c.i32_store(
        c.i32_const(0),
        c.getLocal("pAux")
      )
    );
  }
  function buildReverseBytes() {
    const f = module.addFunction(prefix + "__reverseBytes");
    f.addParam("pIn", "i32");
    f.addParam("n", "i32");
    f.addParam("pOut", "i32");
    f.addLocal("itOut", "i32");
    f.addLocal("itIn", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "itOut",
        c.i32_sub(
          c.i32_add(
            c.getLocal("pOut"),
            c.getLocal("n")
          ),
          c.i32_const(1)
        )
      ),
      c.setLocal(
        "itIn",
        c.getLocal("pIn")
      ),
      c.block(c.loop(
        c.br_if(1, c.i32_lt_s(c.getLocal("itOut"), c.getLocal("pOut"))),
        c.i32_store8(
          c.getLocal("itOut"),
          c.i32_load8_u(c.getLocal("itIn"))
        ),
        c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.i32_const(1))),
        c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildLEMtoC() {
    const f = module.addFunction(prefix + "_LEMtoC");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    const c = f.getCodeBuilder();
    const tmp = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("pIn")),
        [
          ...c.call(prefixField + "_zero", c.getLocal("pOut")),
          ...c.i32_store8(
            c.getLocal("pOut"),
            c.i32_const(64)
          ),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_fromMontgomery", c.getLocal("pIn"), tmp),
      c.call(prefix + "__reverseBytes", tmp, c.i32_const(n8), c.getLocal("pOut")),
      c.if(
        c.i32_eq(
          c.call(prefixField + "_sign", c.i32_add(c.getLocal("pIn"), c.i32_const(n8))),
          c.i32_const(-1)
        ),
        c.i32_store8(
          c.getLocal("pOut"),
          c.i32_or(
            c.i32_load8_u(c.getLocal("pOut")),
            c.i32_const(128)
          )
        )
      )
    );
  }
  function buildLEMtoU() {
    const f = module.addFunction(prefix + "_LEMtoU");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    const c = f.getCodeBuilder();
    const pTmp = module.alloc(n8 * 2);
    const tmp = c.i32_const(pTmp);
    const tmpX = c.i32_const(pTmp);
    const tmpY = c.i32_const(pTmp + n8);
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("pIn")),
        [
          ...c.call(prefix + "_zeroAffine", c.getLocal("pOut")),
          ...c.ret([])
        ]
      ),
      c.call(prefix + "_fromMontgomeryAffine", c.getLocal("pIn"), tmp),
      c.call(prefix + "__reverseBytes", tmpX, c.i32_const(n8), c.getLocal("pOut")),
      c.call(prefix + "__reverseBytes", tmpY, c.i32_const(n8), c.i32_add(c.getLocal("pOut"), c.i32_const(n8)))
    );
  }
  function buildUtoLEM() {
    const f = module.addFunction(prefix + "_UtoLEM");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    const c = f.getCodeBuilder();
    const pTmp = module.alloc(n8 * 2);
    const tmp = c.i32_const(pTmp);
    const tmpX = c.i32_const(pTmp);
    const tmpY = c.i32_const(pTmp + n8);
    f.addCode(
      c.if(
        c.i32_and(c.i32_load8_u(c.getLocal("pIn")), c.i32_const(64)),
        [
          ...c.call(prefix + "_zeroAffine", c.getLocal("pOut")),
          ...c.ret([])
        ]
      ),
      c.call(prefix + "__reverseBytes", c.getLocal("pIn"), c.i32_const(n8), tmpX),
      c.call(prefix + "__reverseBytes", c.i32_add(c.getLocal("pIn"), c.i32_const(n8)), c.i32_const(n8), tmpY),
      c.call(prefix + "_toMontgomeryAffine", tmp, c.getLocal("pOut"))
    );
  }
  function buildCtoLEM() {
    const f = module.addFunction(prefix + "_CtoLEM");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    f.addLocal("firstByte", "i32");
    f.addLocal("greatest", "i32");
    const c = f.getCodeBuilder();
    const pTmp = module.alloc(n8 * 2);
    const tmpX = c.i32_const(pTmp);
    const tmpY = c.i32_const(pTmp + n8);
    f.addCode(
      c.setLocal("firstByte", c.i32_load8_u(c.getLocal("pIn"))),
      c.if(
        c.i32_and(
          c.getLocal("firstByte"),
          c.i32_const(64)
        ),
        [
          ...c.call(prefix + "_zeroAffine", c.getLocal("pOut")),
          ...c.ret([])
        ]
      ),
      c.setLocal(
        "greatest",
        c.i32_and(
          c.getLocal("firstByte"),
          c.i32_const(128)
        )
      ),
      c.call(prefixField + "_copy", c.getLocal("pIn"), tmpY),
      c.i32_store8(tmpY, c.i32_and(c.getLocal("firstByte"), c.i32_const(63))),
      c.call(prefix + "__reverseBytes", tmpY, c.i32_const(n8), tmpX),
      c.call(prefixField + "_toMontgomery", tmpX, c.getLocal("pOut")),
      c.call(prefixField + "_square", c.getLocal("pOut"), tmpY),
      c.call(prefixField + "_mul", c.getLocal("pOut"), tmpY, tmpY),
      c.call(prefixField + "_add", tmpY, c.i32_const(pB), tmpY),
      c.call(prefixField + "_sqrt", tmpY, tmpY),
      c.call(prefixField + "_neg", tmpY, tmpX),
      c.if(
        c.i32_eq(
          c.call(prefixField + "_sign", tmpY),
          c.i32_const(-1)
        ),
        c.if(
          c.getLocal("greatest"),
          c.call(prefixField + "_copy", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8))),
          c.call(prefixField + "_neg", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8)))
        ),
        c.if(
          c.getLocal("greatest"),
          c.call(prefixField + "_neg", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8))),
          c.call(prefixField + "_copy", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8)))
        )
      )
    );
  }
  function buildInCurveAffine() {
    const f = module.addFunction(prefix + "_inCurveAffine");
    f.addParam("pIn", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("pIn");
    const y = c.i32_add(c.getLocal("pIn"), c.i32_const(n8));
    const y2 = c.i32_const(module.alloc(n8));
    const x3b = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call(prefixField + "_square", y, y2),
      c.call(prefixField + "_square", x, x3b),
      c.call(prefixField + "_mul", x, x3b, x3b),
      c.call(prefixField + "_add", x3b, c.i32_const(pB), x3b),
      c.ret(
        c.call(prefixField + "_eq", y2, x3b)
      )
    );
  }
  function buildInCurve() {
    const f = module.addFunction(prefix + "_inCurve");
    f.addParam("pIn", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8 * 2));
    f.addCode(
      c.call(prefix + "_toAffine", c.getLocal("pIn"), aux),
      c.ret(
        c.call(prefix + "_inCurveAffine", aux)
      )
    );
  }
  buildIsZeroAffine();
  buildIsZero();
  buildZeroAffine();
  buildZero();
  buildCopyAffine();
  buildCopy();
  buildToJacobian();
  buildEqAffine();
  buildEqMixed();
  buildEq();
  buildDoubleAffine();
  buildDouble();
  buildAddAffine();
  buildAddMixed();
  buildAdd();
  buildNegAffine();
  buildNeg();
  buildSubAffine();
  buildSubMixed();
  buildSub();
  buildFromMontgomeryAffine();
  buildFromMontgomery();
  buildToMontgomeryAffine();
  buildToMontgomery();
  buildToAffine();
  buildInCurveAffine();
  buildInCurve();
  buildBatchToAffine();
  buildNormalize();
  buildReverseBytes();
  buildLEMtoU();
  buildLEMtoC();
  buildUtoLEM();
  buildCtoLEM();
  buildBatchConvertion(module, prefix + "_batchLEMtoU", prefix + "_LEMtoU", n8 * 2, n8 * 2);
  buildBatchConvertion(module, prefix + "_batchLEMtoC", prefix + "_LEMtoC", n8 * 2, n8);
  buildBatchConvertion(module, prefix + "_batchUtoLEM", prefix + "_UtoLEM", n8 * 2, n8 * 2);
  buildBatchConvertion(module, prefix + "_batchCtoLEM", prefix + "_CtoLEM", n8, n8 * 2, true);
  buildBatchConvertion(module, prefix + "_batchToJacobian", prefix + "_toJacobian", n8 * 2, n8 * 3, true);
  buildMultiexp$1(module, prefix, prefix + "_multiexp", prefix + "_add", n8 * 3);
  buildMultiexp$1(module, prefix, prefix + "_multiexpAffine", prefix + "_addMixed", n8 * 2);
  buildTimesScalarNAF2(
    module,
    prefix + "_timesScalar",
    n8 * 3,
    prefix + "_add",
    prefix + "_double",
    prefix + "_sub",
    prefix + "_copy",
    prefix + "_zero"
  );
  buildTimesScalarNAF2(
    module,
    prefix + "_timesScalarAffine",
    n8 * 2,
    prefix + "_addMixed",
    prefix + "_double",
    prefix + "_subMixed",
    prefix + "_copyAffine",
    prefix + "_zero"
  );
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_isZeroAffine");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_eqMixed");
  module.exportFunction(prefix + "_eqAffine");
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_copyAffine");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_zeroAffine");
  module.exportFunction(prefix + "_double");
  module.exportFunction(prefix + "_doubleAffine");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_addMixed");
  module.exportFunction(prefix + "_addAffine");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_negAffine");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_subMixed");
  module.exportFunction(prefix + "_subAffine");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_fromMontgomeryAffine");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_toMontgomeryAffine");
  module.exportFunction(prefix + "_timesScalar");
  module.exportFunction(prefix + "_timesScalarAffine");
  module.exportFunction(prefix + "_normalize");
  module.exportFunction(prefix + "_LEMtoU");
  module.exportFunction(prefix + "_LEMtoC");
  module.exportFunction(prefix + "_UtoLEM");
  module.exportFunction(prefix + "_CtoLEM");
  module.exportFunction(prefix + "_batchLEMtoU");
  module.exportFunction(prefix + "_batchLEMtoC");
  module.exportFunction(prefix + "_batchUtoLEM");
  module.exportFunction(prefix + "_batchCtoLEM");
  module.exportFunction(prefix + "_toAffine");
  module.exportFunction(prefix + "_toJacobian");
  module.exportFunction(prefix + "_batchToAffine");
  module.exportFunction(prefix + "_batchToJacobian");
  module.exportFunction(prefix + "_inCurve");
  module.exportFunction(prefix + "_inCurveAffine");
  return prefix;
};
var { isOdd: isOdd$2, modInv: modInv$1, modPow } = bigint;
var utils$3 = utils$6;
var build_fft = function buildFFT(module, prefix, gPrefix, fPrefix, opGtimesF) {
  const n64f = module.modules[fPrefix].n64;
  const n8f = n64f * 8;
  const n64g = module.modules[gPrefix].n64;
  const n8g = n64g * 8;
  const q = module.modules[fPrefix].q;
  let rem = q - 1n;
  let maxBits = 0;
  while (!isOdd$2(rem)) {
    maxBits++;
    rem = rem >> 1n;
  }
  let nr = 2n;
  while (modPow(nr, q >> 1n, q) === 1n) nr = nr + 1n;
  const w = new Array(maxBits + 1);
  w[maxBits] = modPow(nr, rem, q);
  let n = maxBits - 1;
  while (n >= 0) {
    w[n] = modPow(w[n + 1], 2n, q);
    n--;
  }
  const bytes2 = [];
  const R = (1n << BigInt(n8f * 8)) % q;
  for (let i = 0; i < w.length; i++) {
    const m = w[i] * R % q;
    bytes2.push(...utils$3.bigInt2BytesLE(m, n8f));
  }
  const ROOTs = module.alloc(bytes2);
  const i2 = new Array(maxBits + 1);
  i2[0] = 1n;
  for (let i = 1; i <= maxBits; i++) {
    i2[i] = i2[i - 1] * 2n;
  }
  const bytesi2 = [];
  for (let i = 0; i <= maxBits; i++) {
    const m = modInv$1(i2[i], q) * R % q;
    bytesi2.push(...utils$3.bigInt2BytesLE(m, n8f));
  }
  const INV2 = module.alloc(bytesi2);
  const shift = modPow(nr, 2n, q);
  const bytesShiftToSmallM = [];
  const bytesSConst = [];
  for (let i = 0; i <= maxBits; i++) {
    const shiftToSmallM = modPow(shift, 2n ** BigInt(i), q);
    const sConst = modInv$1(q + 1n - shiftToSmallM, q);
    bytesShiftToSmallM.push(...utils$3.bigInt2BytesLE(shiftToSmallM * R % q, n8f));
    bytesSConst.push(...utils$3.bigInt2BytesLE(sConst * R % q, n8f));
  }
  const SHIFT_TO_M = module.alloc(bytesShiftToSmallM);
  const SCONST = module.alloc(bytesSConst);
  function rev(x) {
    let r = 0;
    for (let i = 0; i < 8; i++) {
      if (x & 1 << i) {
        r = r | 128 >> i;
      }
    }
    return r;
  }
  const rtable = Array(256);
  for (let i = 0; i < 256; i++) {
    rtable[i] = rev(i);
  }
  const REVTABLE = module.alloc(rtable);
  function buildLog2() {
    const f = module.addFunction(prefix + "__log2");
    f.addParam("n", "i32");
    f.setReturnType("i32");
    f.addLocal("bits", "i32");
    f.addLocal("aux", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "aux",
        c.i32_shr_u(
          c.getLocal("n"),
          c.i32_const(1)
        )
      )
    );
    f.addCode(c.setLocal("bits", c.i32_const(0)));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.i32_eqz(c.getLocal("aux"))
      ),
      c.setLocal(
        "aux",
        c.i32_shr_u(
          c.getLocal("aux"),
          c.i32_const(1)
        )
      ),
      c.setLocal(
        "bits",
        c.i32_add(
          c.getLocal("bits"),
          c.i32_const(1)
        )
      ),
      c.br(0)
    )));
    f.addCode(c.if(
      c.i32_ne(
        c.getLocal("n"),
        c.i32_shl(
          c.i32_const(1),
          c.getLocal("bits")
        )
      ),
      c.unreachable()
    ));
    f.addCode(c.if(
      c.i32_gt_u(
        c.getLocal("bits"),
        c.i32_const(maxBits)
      ),
      c.unreachable()
    ));
    f.addCode(c.getLocal("bits"));
  }
  function buildFFT3() {
    const f = module.addFunction(prefix + "_fft");
    f.addParam("px", "i32");
    f.addParam("n", "i32");
    f.addLocal("bits", "i32");
    const c = f.getCodeBuilder();
    const One = c.i32_const(module.alloc(n8f));
    f.addCode(
      c.setLocal(
        "bits",
        c.call(
          prefix + "__log2",
          c.getLocal("n")
        )
      ),
      c.call(fPrefix + "_one", One),
      c.call(
        prefix + "_rawfft",
        c.getLocal("px"),
        c.getLocal("bits"),
        c.i32_const(0),
        One
      )
    );
  }
  function buildIFFT() {
    const f = module.addFunction(prefix + "_ifft");
    f.addParam("px", "i32");
    f.addParam("n", "i32");
    f.addLocal("bits", "i32");
    f.addLocal("pInv2", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "bits",
        c.call(
          prefix + "__log2",
          c.getLocal("n")
        )
      ),
      c.setLocal(
        "pInv2",
        c.i32_add(
          c.i32_const(INV2),
          c.i32_mul(
            c.getLocal("bits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(
        prefix + "_rawfft",
        c.getLocal("px"),
        c.getLocal("bits"),
        c.i32_const(1),
        c.getLocal("pInv2")
      )
    );
  }
  function buildRawFFT() {
    const f = module.addFunction(prefix + "_rawfft");
    f.addParam("px", "i32");
    f.addParam("bits", "i32");
    f.addParam("reverse", "i32");
    f.addParam("mulFactor", "i32");
    f.addLocal("s", "i32");
    f.addLocal("k", "i32");
    f.addLocal("j", "i32");
    f.addLocal("m", "i32");
    f.addLocal("mdiv2", "i32");
    f.addLocal("n", "i32");
    f.addLocal("pwm", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const T = c.i32_const(module.alloc(n8g));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.call(prefix + "__reversePermutation", c.getLocal("px"), c.getLocal("bits")),
      c.setLocal("n", c.i32_shl(c.i32_const(1), c.getLocal("bits"))),
      c.setLocal("s", c.i32_const(1)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_gt_u(
            c.getLocal("s"),
            c.getLocal("bits")
          )
        ),
        c.setLocal("m", c.i32_shl(c.i32_const(1), c.getLocal("s"))),
        c.setLocal(
          "pwm",
          c.i32_add(
            c.i32_const(ROOTs),
            c.i32_mul(
              c.getLocal("s"),
              c.i32_const(n8f)
            )
          )
        ),
        c.setLocal("k", c.i32_const(0)),
        c.block(c.loop(
          c.br_if(
            1,
            c.i32_ge_u(
              c.getLocal("k"),
              c.getLocal("n")
            )
          ),
          c.call(fPrefix + "_one", W),
          c.setLocal("mdiv2", c.i32_shr_u(c.getLocal("m"), c.i32_const(1))),
          c.setLocal("j", c.i32_const(0)),
          c.block(c.loop(
            c.br_if(
              1,
              c.i32_ge_u(
                c.getLocal("j"),
                c.getLocal("mdiv2")
              )
            ),
            c.setLocal(
              "idx1",
              c.i32_add(
                c.getLocal("px"),
                c.i32_mul(
                  c.i32_add(
                    c.getLocal("k"),
                    c.getLocal("j")
                  ),
                  c.i32_const(n8g)
                )
              )
            ),
            c.setLocal(
              "idx2",
              c.i32_add(
                c.getLocal("idx1"),
                c.i32_mul(
                  c.getLocal("mdiv2"),
                  c.i32_const(n8g)
                )
              )
            ),
            c.call(
              opGtimesF,
              c.getLocal("idx2"),
              W,
              T
            ),
            c.call(
              gPrefix + "_copy",
              c.getLocal("idx1"),
              U
            ),
            c.call(
              gPrefix + "_add",
              U,
              T,
              c.getLocal("idx1")
            ),
            c.call(
              gPrefix + "_sub",
              U,
              T,
              c.getLocal("idx2")
            ),
            c.call(
              fPrefix + "_mul",
              W,
              c.getLocal("pwm"),
              W
            ),
            c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
            c.br(0)
          )),
          c.setLocal("k", c.i32_add(c.getLocal("k"), c.getLocal("m"))),
          c.br(0)
        )),
        c.setLocal("s", c.i32_add(c.getLocal("s"), c.i32_const(1))),
        c.br(0)
      )),
      c.call(
        prefix + "__fftFinal",
        c.getLocal("px"),
        c.getLocal("bits"),
        c.getLocal("reverse"),
        c.getLocal("mulFactor")
      )
    );
  }
  function buildFinalInverse() {
    const f = module.addFunction(prefix + "__fftFinal");
    f.addParam("px", "i32");
    f.addParam("bits", "i32");
    f.addParam("reverse", "i32");
    f.addParam("mulFactor", "i32");
    f.addLocal("n", "i32");
    f.addLocal("ndiv2", "i32");
    f.addLocal("pInv2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("mask", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    const c = f.getCodeBuilder();
    const T = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.if(
        c.i32_and(
          c.i32_eqz(c.getLocal("reverse")),
          c.call(fPrefix + "_isOne", c.getLocal("mulFactor"))
        ),
        c.ret([])
      ),
      c.setLocal("n", c.i32_shl(c.i32_const(1), c.getLocal("bits"))),
      c.setLocal("mask", c.i32_sub(c.getLocal("n"), c.i32_const(1))),
      c.setLocal("i", c.i32_const(1)),
      c.setLocal(
        "ndiv2",
        c.i32_shr_u(
          c.getLocal("n"),
          c.i32_const(1)
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_ge_u(
            c.getLocal("i"),
            c.getLocal("ndiv2")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.i32_sub(
                c.getLocal("n"),
                c.getLocal("i")
              ),
              c.i32_const(n8g)
            )
          )
        ),
        c.if(
          c.getLocal("reverse"),
          c.if(
            c.call(fPrefix + "_isOne", c.getLocal("mulFactor")),
            [
              ...c.call(gPrefix + "_copy", c.getLocal("idx1"), T),
              ...c.call(gPrefix + "_copy", c.getLocal("idx2"), c.getLocal("idx1")),
              ...c.call(gPrefix + "_copy", T, c.getLocal("idx2"))
            ],
            [
              ...c.call(gPrefix + "_copy", c.getLocal("idx1"), T),
              ...c.call(opGtimesF, c.getLocal("idx2"), c.getLocal("mulFactor"), c.getLocal("idx1")),
              ...c.call(opGtimesF, T, c.getLocal("mulFactor"), c.getLocal("idx2"))
            ]
          ),
          c.if(
            c.call(fPrefix + "_isOne", c.getLocal("mulFactor")),
            [
              // Do nothing (It should not be here)
            ],
            [
              ...c.call(opGtimesF, c.getLocal("idx1"), c.getLocal("mulFactor"), c.getLocal("idx1")),
              ...c.call(opGtimesF, c.getLocal("idx2"), c.getLocal("mulFactor"), c.getLocal("idx2"))
            ]
          )
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      )),
      c.if(
        c.call(fPrefix + "_isOne", c.getLocal("mulFactor")),
        [
          // Do nothing (It should not be here)
        ],
        [
          ...c.call(opGtimesF, c.getLocal("px"), c.getLocal("mulFactor"), c.getLocal("px")),
          ...c.setLocal(
            "idx2",
            c.i32_add(
              c.getLocal("px"),
              c.i32_mul(
                c.getLocal("ndiv2"),
                c.i32_const(n8g)
              )
            )
          ),
          ...c.call(opGtimesF, c.getLocal("idx2"), c.getLocal("mulFactor"), c.getLocal("idx2"))
        ]
      )
    );
  }
  function buildReversePermutation() {
    const f = module.addFunction(prefix + "__reversePermutation");
    f.addParam("px", "i32");
    f.addParam("bits", "i32");
    f.addLocal("n", "i32");
    f.addLocal("i", "i32");
    f.addLocal("ri", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    const c = f.getCodeBuilder();
    const T = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal("n", c.i32_shl(c.i32_const(1), c.getLocal("bits"))),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal("ri", c.call(prefix + "__rev", c.getLocal("i"), c.getLocal("bits"))),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.getLocal("ri"),
              c.i32_const(n8g)
            )
          )
        ),
        c.if(
          c.i32_lt_u(
            c.getLocal("i"),
            c.getLocal("ri")
          ),
          [
            ...c.call(gPrefix + "_copy", c.getLocal("idx1"), T),
            ...c.call(gPrefix + "_copy", c.getLocal("idx2"), c.getLocal("idx1")),
            ...c.call(gPrefix + "_copy", T, c.getLocal("idx2"))
          ]
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildRev() {
    const f = module.addFunction(prefix + "__rev");
    f.addParam("x", "i32");
    f.addParam("bits", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.i32_rotl(
        c.i32_add(
          c.i32_add(
            c.i32_shl(
              c.i32_load8_u(
                c.i32_and(
                  c.getLocal("x"),
                  c.i32_const(255)
                ),
                REVTABLE,
                0
              ),
              c.i32_const(24)
            ),
            c.i32_shl(
              c.i32_load8_u(
                c.i32_and(
                  c.i32_shr_u(
                    c.getLocal("x"),
                    c.i32_const(8)
                  ),
                  c.i32_const(255)
                ),
                REVTABLE,
                0
              ),
              c.i32_const(16)
            )
          ),
          c.i32_add(
            c.i32_shl(
              c.i32_load8_u(
                c.i32_and(
                  c.i32_shr_u(
                    c.getLocal("x"),
                    c.i32_const(16)
                  ),
                  c.i32_const(255)
                ),
                REVTABLE,
                0
              ),
              c.i32_const(8)
            ),
            c.i32_load8_u(
              c.i32_and(
                c.i32_shr_u(
                  c.getLocal("x"),
                  c.i32_const(24)
                ),
                c.i32_const(255)
              ),
              REVTABLE,
              0
            )
          )
        ),
        c.getLocal("bits")
      )
    );
  }
  function buildFFTJoin() {
    const f = module.addFunction(prefix + "_fftJoin");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const T = c.i32_const(module.alloc(n8g));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          T
        ),
        c.call(
          gPrefix + "_copy",
          c.getLocal("idx1"),
          U
        ),
        c.call(
          gPrefix + "_add",
          U,
          T,
          c.getLocal("idx1")
        ),
        c.call(
          gPrefix + "_sub",
          U,
          T,
          c.getLocal("idx2")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTJoinExt() {
    const f = module.addFunction(prefix + "_fftJoinExt");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addParam("totalBits", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("pShiftToM", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal(
        "pShiftToM",
        c.i32_add(
          c.i32_const(SHIFT_TO_M),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          gPrefix + "_add",
          c.getLocal("idx1"),
          c.getLocal("idx2"),
          U
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          c.getLocal("pShiftToM"),
          c.getLocal("idx2")
        ),
        c.call(
          gPrefix + "_add",
          c.getLocal("idx1"),
          c.getLocal("idx2"),
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          c.getLocal("idx2")
        ),
        c.call(
          gPrefix + "_copy",
          U,
          c.getLocal("idx1")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTJoinExtInv() {
    const f = module.addFunction(prefix + "_fftJoinExtInv");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addParam("totalBits", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("pShiftToM", "i32");
    f.addLocal("pSConst", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal(
        "pShiftToM",
        c.i32_add(
          c.i32_const(SHIFT_TO_M),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.setLocal(
        "pSConst",
        c.i32_add(
          c.i32_const(SCONST),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          U
        ),
        c.call(
          gPrefix + "_sub",
          c.getLocal("idx1"),
          U,
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          c.getLocal("pSConst"),
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("pShiftToM"),
          c.getLocal("idx1")
        ),
        c.call(
          gPrefix + "_sub",
          U,
          c.getLocal("idx1"),
          c.getLocal("idx1")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("pSConst"),
          c.getLocal("idx1")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildPrepareLagrangeEvaluation() {
    const f = module.addFunction(prefix + "_prepareLagrangeEvaluation");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addParam("totalBits", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("pShiftToM", "i32");
    f.addLocal("pSConst", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal(
        "pShiftToM",
        c.i32_add(
          c.i32_const(SHIFT_TO_M),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.setLocal(
        "pSConst",
        c.i32_add(
          c.i32_const(SCONST),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("pShiftToM"),
          U
        ),
        c.call(
          gPrefix + "_sub",
          c.getLocal("idx2"),
          U,
          U
        ),
        c.call(
          gPrefix + "_sub",
          c.getLocal("idx1"),
          c.getLocal("idx2"),
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          U,
          c.getLocal("pSConst"),
          c.getLocal("idx1")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          c.getLocal("idx2")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTMix() {
    const f = module.addFunction(prefix + "_fftMix");
    f.addParam("pBuff", "i32");
    f.addParam("n", "i32");
    f.addParam("exp", "i32");
    f.addLocal("nGroups", "i32");
    f.addLocal("nPerGroup", "i32");
    f.addLocal("nPerGroupDiv2", "i32");
    f.addLocal("pairOffset", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("pwm", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const T = c.i32_const(module.alloc(n8g));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal("nPerGroup", c.i32_shl(c.i32_const(1), c.getLocal("exp"))),
      c.setLocal("nPerGroupDiv2", c.i32_shr_u(c.getLocal("nPerGroup"), c.i32_const(1))),
      c.setLocal("nGroups", c.i32_shr_u(c.getLocal("n"), c.getLocal("exp"))),
      c.setLocal("pairOffset", c.i32_mul(c.getLocal("nPerGroupDiv2"), c.i32_const(n8g))),
      c.setLocal(
        "pwm",
        c.i32_add(
          c.i32_const(ROOTs),
          c.i32_mul(
            c.getLocal("exp"),
            c.i32_const(n8f)
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("nGroups")
          )
        ),
        c.call(fPrefix + "_one", W),
        c.setLocal("j", c.i32_const(0)),
        c.block(c.loop(
          c.br_if(
            1,
            c.i32_eq(
              c.getLocal("j"),
              c.getLocal("nPerGroupDiv2")
            )
          ),
          c.setLocal(
            "idx1",
            c.i32_add(
              c.getLocal("pBuff"),
              c.i32_mul(
                c.i32_add(
                  c.i32_mul(
                    c.getLocal("i"),
                    c.getLocal("nPerGroup")
                  ),
                  c.getLocal("j")
                ),
                c.i32_const(n8g)
              )
            )
          ),
          c.setLocal(
            "idx2",
            c.i32_add(
              c.getLocal("idx1"),
              c.getLocal("pairOffset")
            )
          ),
          c.call(
            opGtimesF,
            c.getLocal("idx2"),
            W,
            T
          ),
          c.call(
            gPrefix + "_copy",
            c.getLocal("idx1"),
            U
          ),
          c.call(
            gPrefix + "_add",
            U,
            T,
            c.getLocal("idx1")
          ),
          c.call(
            gPrefix + "_sub",
            U,
            T,
            c.getLocal("idx2")
          ),
          c.call(
            fPrefix + "_mul",
            W,
            c.getLocal("pwm"),
            W
          ),
          c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
          c.br(0)
        )),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTFinal() {
    const f = module.addFunction(prefix + "_fftFinal");
    f.addParam("pBuff", "i32");
    f.addParam("n", "i32");
    f.addParam("factor", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("ndiv2", "i32");
    const c = f.getCodeBuilder();
    const T = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal("ndiv2", c.i32_shr_u(c.getLocal("n"), c.i32_const(1))),
      c.if(
        c.i32_and(
          c.getLocal("n"),
          c.i32_const(1)
        ),
        c.call(
          opGtimesF,
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.getLocal("ndiv2"),
              c.i32_const(n8g)
            )
          ),
          c.getLocal("factor"),
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.getLocal("ndiv2"),
              c.i32_const(n8g)
            )
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_ge_u(
            c.getLocal("i"),
            c.getLocal("ndiv2")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.i32_sub(
                c.i32_sub(
                  c.getLocal("n"),
                  c.i32_const(1)
                ),
                c.getLocal("i")
              ),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          c.getLocal("factor"),
          T
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("factor"),
          c.getLocal("idx2")
        ),
        c.call(
          gPrefix + "_copy",
          T,
          c.getLocal("idx1")
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  buildRev();
  buildReversePermutation();
  buildFinalInverse();
  buildRawFFT();
  buildLog2();
  buildFFT3();
  buildIFFT();
  buildFFTJoin();
  buildFFTJoinExt();
  buildFFTJoinExtInv();
  buildFFTMix();
  buildFFTFinal();
  buildPrepareLagrangeEvaluation();
  module.exportFunction(prefix + "_fft");
  module.exportFunction(prefix + "_ifft");
  module.exportFunction(prefix + "_rawfft");
  module.exportFunction(prefix + "_fftJoin");
  module.exportFunction(prefix + "_fftJoinExt");
  module.exportFunction(prefix + "_fftJoinExtInv");
  module.exportFunction(prefix + "_fftMix");
  module.exportFunction(prefix + "_fftFinal");
  module.exportFunction(prefix + "_prepareLagrangeEvaluation");
};
var build_pol = function buildPol(module, prefix, prefixField) {
  const n64 = module.modules[prefixField].n64;
  const n8 = n64 * 8;
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("px", "i32");
    f.addParam("n", "i32");
    f.addLocal("lastp", "i32");
    f.addLocal("p", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal("p", c.getLocal("px")),
      c.setLocal(
        "lastp",
        c.i32_add(
          c.getLocal("px"),
          c.i32_mul(
            c.getLocal("n"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("p"),
            c.getLocal("lastp")
          )
        ),
        c.call(prefixField + "_zero", c.getLocal("p")),
        c.setLocal("p", c.i32_add(c.getLocal("p"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  function buildConstructLC() {
    const f = module.addFunction(prefix + "_constructLC");
    f.addParam("ppolynomials", "i32");
    f.addParam("psignals", "i32");
    f.addParam("nSignals", "i32");
    f.addParam("pres", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("pp", "i32");
    f.addLocal("ps", "i32");
    f.addLocal("pd", "i32");
    f.addLocal("ncoefs", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("i", c.i32_const(0)),
      c.setLocal("pp", c.getLocal("ppolynomials")),
      c.setLocal("ps", c.getLocal("psignals")),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("nSignals")
          )
        ),
        c.setLocal("ncoefs", c.i32_load(c.getLocal("pp"))),
        c.setLocal("pp", c.i32_add(c.getLocal("pp"), c.i32_const(4))),
        c.setLocal("j", c.i32_const(0)),
        c.block(c.loop(
          c.br_if(
            1,
            c.i32_eq(
              c.getLocal("j"),
              c.getLocal("ncoefs")
            )
          ),
          c.setLocal(
            "pd",
            c.i32_add(
              c.getLocal("pres"),
              c.i32_mul(
                c.i32_load(c.getLocal("pp")),
                c.i32_const(n8)
              )
            )
          ),
          c.setLocal("pp", c.i32_add(c.getLocal("pp"), c.i32_const(4))),
          c.call(
            prefixField + "_mul",
            c.getLocal("ps"),
            c.getLocal("pp"),
            aux
          ),
          c.call(
            prefixField + "_add",
            aux,
            c.getLocal("pd"),
            c.getLocal("pd")
          ),
          c.setLocal("pp", c.i32_add(c.getLocal("pp"), c.i32_const(n8))),
          c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
          c.br(0)
        )),
        c.setLocal("ps", c.i32_add(c.getLocal("ps"), c.i32_const(n8))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  buildZero();
  buildConstructLC();
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_constructLC");
  return prefix;
};
var build_qap = function buildQAP(module, prefix, prefixField) {
  const n64 = module.modules[prefixField].n64;
  const n8 = n64 * 8;
  function buildBuildABC() {
    const f = module.addFunction(prefix + "_buildABC");
    f.addParam("pCoefs", "i32");
    f.addParam("nCoefs", "i32");
    f.addParam("pWitness", "i32");
    f.addParam("pA", "i32");
    f.addParam("pB", "i32");
    f.addParam("pC", "i32");
    f.addParam("offsetOut", "i32");
    f.addParam("nOut", "i32");
    f.addParam("offsetWitness", "i32");
    f.addParam("nWitness", "i32");
    f.addLocal("it", "i32");
    f.addLocal("ita", "i32");
    f.addLocal("itb", "i32");
    f.addLocal("last", "i32");
    f.addLocal("m", "i32");
    f.addLocal("c", "i32");
    f.addLocal("s", "i32");
    f.addLocal("pOut", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8));
    f.addCode(
      // Set output a and b to 0
      c.setLocal("ita", c.getLocal("pA")),
      c.setLocal("itb", c.getLocal("pB")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pA"),
          c.i32_mul(
            c.getLocal("nOut"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(prefixField + "_zero", c.getLocal("ita")),
        c.call(prefixField + "_zero", c.getLocal("itb")),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.br(0)
      )),
      c.setLocal("it", c.getLocal("pCoefs")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pCoefs"),
          c.i32_mul(
            c.getLocal("nCoefs"),
            c.i32_const(n8 + 12)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("it"),
            c.getLocal("last")
          )
        ),
        c.setLocal(
          "s",
          c.i32_load(c.getLocal("it"), 8)
        ),
        c.if(
          c.i32_or(
            c.i32_lt_u(
              c.getLocal("s"),
              c.getLocal("offsetWitness")
            ),
            c.i32_ge_u(
              c.getLocal("s"),
              c.i32_add(
                c.getLocal("offsetWitness"),
                c.getLocal("nWitness")
              )
            )
          ),
          [
            ...c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
            ...c.br(1)
          ]
        ),
        c.setLocal(
          "m",
          c.i32_load(c.getLocal("it"))
        ),
        c.if(
          c.i32_eq(c.getLocal("m"), c.i32_const(0)),
          c.setLocal("pOut", c.getLocal("pA")),
          c.if(
            c.i32_eq(c.getLocal("m"), c.i32_const(1)),
            c.setLocal("pOut", c.getLocal("pB")),
            [
              ...c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
              ...c.br(1)
            ]
          )
        ),
        c.setLocal(
          "c",
          c.i32_load(c.getLocal("it"), 4)
        ),
        c.if(
          c.i32_or(
            c.i32_lt_u(
              c.getLocal("c"),
              c.getLocal("offsetOut")
            ),
            c.i32_ge_u(
              c.getLocal("c"),
              c.i32_add(
                c.getLocal("offsetOut"),
                c.getLocal("nOut")
              )
            )
          ),
          [
            ...c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
            ...c.br(1)
          ]
        ),
        c.setLocal(
          "pOut",
          c.i32_add(
            c.getLocal("pOut"),
            c.i32_mul(
              c.i32_sub(
                c.getLocal("c"),
                c.getLocal("offsetOut")
              ),
              c.i32_const(n8)
            )
          )
        ),
        c.call(
          prefixField + "_mul",
          c.i32_add(
            c.getLocal("pWitness"),
            c.i32_mul(
              c.i32_sub(c.getLocal("s"), c.getLocal("offsetWitness")),
              c.i32_const(n8)
            )
          ),
          c.i32_add(c.getLocal("it"), c.i32_const(12)),
          aux
        ),
        c.call(
          prefixField + "_add",
          c.getLocal("pOut"),
          aux,
          c.getLocal("pOut")
        ),
        c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
        c.br(0)
      )),
      c.setLocal("ita", c.getLocal("pA")),
      c.setLocal("itb", c.getLocal("pB")),
      c.setLocal("it", c.getLocal("pC")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pA"),
          c.i32_mul(
            c.getLocal("nOut"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(
          prefixField + "_mul",
          c.getLocal("ita"),
          c.getLocal("itb"),
          c.getLocal("it")
        ),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  function buildJoinABC() {
    const f = module.addFunction(prefix + "_joinABC");
    f.addParam("pA", "i32");
    f.addParam("pB", "i32");
    f.addParam("pC", "i32");
    f.addParam("n", "i32");
    f.addParam("pP", "i32");
    f.addLocal("ita", "i32");
    f.addLocal("itb", "i32");
    f.addLocal("itc", "i32");
    f.addLocal("itp", "i32");
    f.addLocal("last", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("ita", c.getLocal("pA")),
      c.setLocal("itb", c.getLocal("pB")),
      c.setLocal("itc", c.getLocal("pC")),
      c.setLocal("itp", c.getLocal("pP")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pA"),
          c.i32_mul(
            c.getLocal("n"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(
          prefixField + "_mul",
          c.getLocal("ita"),
          c.getLocal("itb"),
          aux
        ),
        c.call(
          prefixField + "_sub",
          aux,
          c.getLocal("itc"),
          c.getLocal("itp")
        ),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.setLocal("itc", c.i32_add(c.getLocal("itc"), c.i32_const(n8))),
        c.setLocal("itp", c.i32_add(c.getLocal("itp"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  function buildBatchAdd() {
    const f = module.addFunction(prefix + "_batchAdd");
    f.addParam("pa", "i32");
    f.addParam("pb", "i32");
    f.addParam("n", "i32");
    f.addParam("pr", "i32");
    f.addLocal("ita", "i32");
    f.addLocal("itb", "i32");
    f.addLocal("itr", "i32");
    f.addLocal("last", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal("ita", c.getLocal("pa")),
      c.setLocal("itb", c.getLocal("pb")),
      c.setLocal("itr", c.getLocal("pr")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pa"),
          c.i32_mul(
            c.getLocal("n"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(
          prefixField + "_add",
          c.getLocal("ita"),
          c.getLocal("itb"),
          c.getLocal("itr")
        ),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.setLocal("itr", c.i32_add(c.getLocal("itr"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  buildBuildABC();
  buildJoinABC();
  buildBatchAdd();
  module.exportFunction(prefix + "_buildABC");
  module.exportFunction(prefix + "_joinABC");
  module.exportFunction(prefix + "_batchAdd");
  return prefix;
};
var build_applykey = function buildApplyKey(module, fnName, gPrefix, frPrefix, sizeGIn, sizeGOut, sizeF, opGtimesF) {
  const f = module.addFunction(fnName);
  f.addParam("pIn", "i32");
  f.addParam("n", "i32");
  f.addParam("pFirst", "i32");
  f.addParam("pInc", "i32");
  f.addParam("pOut", "i32");
  f.addLocal("pOldFree", "i32");
  f.addLocal("i", "i32");
  f.addLocal("pFrom", "i32");
  f.addLocal("pTo", "i32");
  const c = f.getCodeBuilder();
  const t = c.i32_const(module.alloc(sizeF));
  f.addCode(
    c.setLocal("pFrom", c.getLocal("pIn")),
    c.setLocal("pTo", c.getLocal("pOut"))
  );
  f.addCode(
    c.call(
      frPrefix + "_copy",
      c.getLocal("pFirst"),
      t
    )
  );
  f.addCode(
    c.setLocal("i", c.i32_const(0)),
    c.block(c.loop(
      c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
      c.call(
        opGtimesF,
        c.getLocal("pFrom"),
        t,
        c.getLocal("pTo")
      ),
      c.setLocal("pFrom", c.i32_add(c.getLocal("pFrom"), c.i32_const(sizeGIn))),
      c.setLocal("pTo", c.i32_add(c.getLocal("pTo"), c.i32_const(sizeGOut))),
      // t = t* inc
      c.call(
        frPrefix + "_mul",
        t,
        c.getLocal("pInc"),
        t
      ),
      c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    ))
  );
  module.exportFunction(fnName);
};
var utils$2 = utils$6;
var buildF1m$1 = build_f1m;
var buildF1$1 = build_f1;
var buildF2m$1 = build_f2m;
var buildF3m$1 = build_f3m;
var buildCurve$1 = build_curve_jacobian_a0;
var buildFFT$2 = build_fft;
var buildPol$1 = build_pol;
var buildQAP$1 = build_qap;
var buildApplyKey$1 = build_applykey;
var { bitLength: bitLength$2, modInv, isOdd: isOdd$1, isNegative: isNegative$2 } = bigint;
var build_bn128 = function buildBN128(module, _prefix) {
  const prefix = _prefix || "bn128";
  if (module.modules[prefix]) return prefix;
  const q = 21888242871839275222246405745257275088696311157297823662689037894645226208583n;
  const r = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
  const n64 = Math.floor((bitLength$2(q - 1n) - 1) / 64) + 1;
  const n8 = n64 * 8;
  const frsize = n8;
  const f1size = n8;
  const f2size = f1size * 2;
  const ftsize = f1size * 12;
  const pr = module.alloc(utils$2.bigInt2BytesLE(r, frsize));
  const f1mPrefix = buildF1m$1(module, q, "f1m");
  buildF1$1(module, r, "fr", "frm");
  const pG1b = module.alloc(utils$2.bigInt2BytesLE(toMontgomery(3n), f1size));
  const g1mPrefix = buildCurve$1(module, "g1m", "f1m", pG1b);
  buildFFT$2(module, "frm", "frm", "frm", "frm_mul");
  buildPol$1(module, "pol", "frm");
  buildQAP$1(module, "qap", "frm");
  const f2mPrefix = buildF2m$1(module, "f1m_neg", "f2m", "f1m");
  const pG2b = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(19485874751759354771024239261021720505790618469301721065564631296452457478373n), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(266929791119991161246907387137283842545076965332900288569378510910307636690n), f1size)
  ]);
  const g2mPrefix = buildCurve$1(module, "g2m", "f2m", pG2b);
  function buildGTimesFr(fnName, opMul) {
    const f = module.addFunction(fnName);
    f.addParam("pG", "i32");
    f.addParam("pFr", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call("frm_fromMontgomery", c.getLocal("pFr"), AUX),
      c.call(
        opMul,
        c.getLocal("pG"),
        AUX,
        c.i32_const(n8),
        c.getLocal("pr")
      )
    );
    module.exportFunction(fnName);
  }
  buildGTimesFr("g1m_timesFr", "g1m_timesScalar");
  buildFFT$2(module, "g1m", "g1m", "frm", "g1m_timesFr");
  buildGTimesFr("g2m_timesFr", "g2m_timesScalar");
  buildFFT$2(module, "g2m", "g2m", "frm", "g2m_timesFr");
  buildGTimesFr("g1m_timesFrAffine", "g1m_timesScalarAffine");
  buildGTimesFr("g2m_timesFrAffine", "g2m_timesScalarAffine");
  buildApplyKey$1(module, "frm_batchApplyKey", "fmr", "frm", n8, n8, n8, "frm_mul");
  buildApplyKey$1(module, "g1m_batchApplyKey", "g1m", "frm", n8 * 3, n8 * 3, n8, "g1m_timesFr");
  buildApplyKey$1(module, "g1m_batchApplyKeyMixed", "g1m", "frm", n8 * 2, n8 * 3, n8, "g1m_timesFrAffine");
  buildApplyKey$1(module, "g2m_batchApplyKey", "g2m", "frm", n8 * 2 * 3, n8 * 3 * 2, n8, "g2m_timesFr");
  buildApplyKey$1(module, "g2m_batchApplyKeyMixed", "g2m", "frm", n8 * 2 * 2, n8 * 3 * 2, n8, "g2m_timesFrAffine");
  function toMontgomery(a) {
    return BigInt(a) * (1n << BigInt(f1size * 8)) % q;
  }
  const G1gen = [
    1n,
    2n,
    1n
  ];
  const pG1gen = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G1gen[0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1gen[1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1gen[2]), f1size)
    ]
  );
  const G1zero = [
    0n,
    1n,
    0n
  ];
  const pG1zero = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G1zero[0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1zero[1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1zero[2]), f1size)
    ]
  );
  const G2gen = [
    [
      10857046999023057135944570762232829481370756359578518086990519993285655852781n,
      11559732032986387107991004021392285783925812861821192530917403151452391805634n
    ],
    [
      8495653923123431417604973247489272438418190587263600148770280649306958101930n,
      4082367875863433681332203403145435568316851327593401208105741076214120093531n
    ],
    [
      1n,
      0n
    ]
  ];
  const pG2gen = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[0][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[0][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[1][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[1][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[2][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[2][1]), f1size)
    ]
  );
  const G2zero = [
    [
      0n,
      0n
    ],
    [
      1n,
      0n
    ],
    [
      0n,
      0n
    ]
  ];
  const pG2zero = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[0][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[0][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[1][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[1][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[2][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[2][1]), f1size)
    ]
  );
  const pOneT = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(1), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size)
  ]);
  const pNonResidueF6 = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(9), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(1), f1size)
  ]);
  const pTwoInv = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(modInv(2n, q)), f1size),
    ...utils$2.bigInt2BytesLE(0n, f1size)
  ]);
  const pAltBn128Twist = pNonResidueF6;
  const pTwistCoefB = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(19485874751759354771024239261021720505790618469301721065564631296452457478373n), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(266929791119991161246907387137283842545076965332900288569378510910307636690n), f1size)
  ]);
  function build_mulNR6() {
    const f = module.addFunction(prefix + "_mulNR6");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(
        f2mPrefix + "_mul",
        c.i32_const(pNonResidueF6),
        c.getLocal("x"),
        c.getLocal("pr")
      )
    );
  }
  build_mulNR6();
  const f6mPrefix = buildF3m$1(module, prefix + "_mulNR6", "f6m", "f2m");
  function build_mulNR12() {
    const f = module.addFunction(prefix + "_mulNR12");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(
        f2mPrefix + "_mul",
        c.i32_const(pNonResidueF6),
        c.i32_add(c.getLocal("x"), c.i32_const(n8 * 4)),
        c.getLocal("pr")
      ),
      c.call(
        f2mPrefix + "_copy",
        c.getLocal("x"),
        c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))
      ),
      c.call(
        f2mPrefix + "_copy",
        c.i32_add(c.getLocal("x"), c.i32_const(n8 * 2)),
        c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 4))
      )
    );
  }
  build_mulNR12();
  const ftmPrefix = buildF2m$1(module, prefix + "_mulNR12", "ftm", f6mPrefix);
  const ateLoopCount = 29793968203157093288n;
  const ateLoopBitBytes = bits2(ateLoopCount);
  const pAteLoopBitBytes = module.alloc(ateLoopBitBytes);
  const ateCoefSize = 3 * f2size;
  const ateNDblCoefs = ateLoopBitBytes.length - 1;
  const ateNAddCoefs = ateLoopBitBytes.reduce((acc, b) => acc + (b != 0 ? 1 : 0), 0);
  const ateNCoefs = ateNAddCoefs + ateNDblCoefs + 1;
  const prePSize = 3 * 2 * n8;
  const preQSize = 3 * n8 * 2 + ateNCoefs * ateCoefSize;
  module.modules[prefix] = {
    n64,
    pG1gen,
    pG1zero,
    pG1b,
    pG2gen,
    pG2zero,
    pG2b,
    pq: module.modules["f1m"].pq,
    pr,
    pOneT,
    prePSize,
    preQSize,
    r: r.toString(),
    q: q.toString()
  };
  const finalExpZ = 4965661367192848881n;
  function naf2(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd$1(E)) {
        const z = 2 - Number(E % 4n);
        res.push(z);
        E = E - BigInt(z);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function bits2(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd$1(E)) {
        res.push(1);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function buildPrepareG1() {
    const f = module.addFunction(prefix + "_prepareG1");
    f.addParam("pP", "i32");
    f.addParam("ppreP", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(g1mPrefix + "_normalize", c.getLocal("pP"), c.getLocal("ppreP"))
      // TODO Remove if already in affine
    );
  }
  function buildPrepAddStep() {
    const f = module.addFunction(prefix + "_prepAddStep");
    f.addParam("pQ", "i32");
    f.addParam("pR", "i32");
    f.addParam("pCoef", "i32");
    const c = f.getCodeBuilder();
    const X2 = c.getLocal("pQ");
    const Y2 = c.i32_add(c.getLocal("pQ"), c.i32_const(f2size));
    const X1 = c.getLocal("pR");
    const Y1 = c.i32_add(c.getLocal("pR"), c.i32_const(f2size));
    const Z1 = c.i32_add(c.getLocal("pR"), c.i32_const(2 * f2size));
    const ELL_0 = c.getLocal("pCoef");
    const ELL_VW = c.i32_add(c.getLocal("pCoef"), c.i32_const(f2size));
    const ELL_VV = c.i32_add(c.getLocal("pCoef"), c.i32_const(2 * f2size));
    const D = ELL_VW;
    const E = c.i32_const(module.alloc(f2size));
    const F = c.i32_const(module.alloc(f2size));
    const G = c.i32_const(module.alloc(f2size));
    const H = c.i32_const(module.alloc(f2size));
    const I = c.i32_const(module.alloc(f2size));
    const J = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      // D = X1 - X2*Z1
      c.call(f2mPrefix + "_mul", X2, Z1, D),
      c.call(f2mPrefix + "_sub", X1, D, D),
      // E = Y1 - Y2*Z1
      c.call(f2mPrefix + "_mul", Y2, Z1, E),
      c.call(f2mPrefix + "_sub", Y1, E, E),
      // F = D^2
      c.call(f2mPrefix + "_square", D, F),
      // G = E^2
      c.call(f2mPrefix + "_square", E, G),
      // H = D*F
      c.call(f2mPrefix + "_mul", D, F, H),
      // I = X1 * F
      c.call(f2mPrefix + "_mul", X1, F, I),
      // J = H + Z1*G - (I+I)
      c.call(f2mPrefix + "_add", I, I, AUX),
      c.call(f2mPrefix + "_mul", Z1, G, J),
      c.call(f2mPrefix + "_add", H, J, J),
      c.call(f2mPrefix + "_sub", J, AUX, J),
      // X3 (X1) = D*J
      c.call(f2mPrefix + "_mul", D, J, X1),
      // Y3 (Y1) = E*(I-J)-(H*Y1)
      c.call(f2mPrefix + "_mul", H, Y1, Y1),
      c.call(f2mPrefix + "_sub", I, J, AUX),
      c.call(f2mPrefix + "_mul", E, AUX, AUX),
      c.call(f2mPrefix + "_sub", AUX, Y1, Y1),
      // Z3 (Z1) = Z1*H
      c.call(f2mPrefix + "_mul", Z1, H, Z1),
      // ell_0 = xi * (E * X2 - D * Y2)
      c.call(f2mPrefix + "_mul", D, Y2, AUX),
      c.call(f2mPrefix + "_mul", E, X2, ELL_0),
      c.call(f2mPrefix + "_sub", ELL_0, AUX, ELL_0),
      c.call(f2mPrefix + "_mul", ELL_0, c.i32_const(pAltBn128Twist), ELL_0),
      // ell_VV = - E (later: * xP)
      c.call(f2mPrefix + "_neg", E, ELL_VV)
      // ell_VW = D (later: * yP    )
      // Already assigned
    );
  }
  function buildPrepDoubleStep() {
    const f = module.addFunction(prefix + "_prepDblStep");
    f.addParam("pR", "i32");
    f.addParam("pCoef", "i32");
    const c = f.getCodeBuilder();
    const X1 = c.getLocal("pR");
    const Y1 = c.i32_add(c.getLocal("pR"), c.i32_const(f2size));
    const Z1 = c.i32_add(c.getLocal("pR"), c.i32_const(2 * f2size));
    const ELL_0 = c.getLocal("pCoef");
    const ELL_VW = c.i32_add(c.getLocal("pCoef"), c.i32_const(f2size));
    const ELL_VV = c.i32_add(c.getLocal("pCoef"), c.i32_const(2 * f2size));
    const A = c.i32_const(module.alloc(f2size));
    const B = c.i32_const(module.alloc(f2size));
    const C = c.i32_const(module.alloc(f2size));
    const D = c.i32_const(module.alloc(f2size));
    const E = c.i32_const(module.alloc(f2size));
    const F = c.i32_const(module.alloc(f2size));
    const G = c.i32_const(module.alloc(f2size));
    const H = c.i32_const(module.alloc(f2size));
    const I = c.i32_const(module.alloc(f2size));
    const J = c.i32_const(module.alloc(f2size));
    const E2 = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      // A = X1 * Y1 / 2
      c.call(f2mPrefix + "_mul", Y1, c.i32_const(pTwoInv), A),
      c.call(f2mPrefix + "_mul", X1, A, A),
      // B = Y1^2
      c.call(f2mPrefix + "_square", Y1, B),
      // C = Z1^2
      c.call(f2mPrefix + "_square", Z1, C),
      // D = 3 * C
      c.call(f2mPrefix + "_add", C, C, D),
      c.call(f2mPrefix + "_add", D, C, D),
      // E = twist_b * D
      c.call(f2mPrefix + "_mul", c.i32_const(pTwistCoefB), D, E),
      // F = 3 * E
      c.call(f2mPrefix + "_add", E, E, F),
      c.call(f2mPrefix + "_add", E, F, F),
      // G = (B+F)/2
      c.call(f2mPrefix + "_add", B, F, G),
      c.call(f2mPrefix + "_mul", G, c.i32_const(pTwoInv), G),
      // H = (Y1+Z1)^2-(B+C)
      c.call(f2mPrefix + "_add", B, C, AUX),
      c.call(f2mPrefix + "_add", Y1, Z1, H),
      c.call(f2mPrefix + "_square", H, H),
      c.call(f2mPrefix + "_sub", H, AUX, H),
      // I = E-B
      c.call(f2mPrefix + "_sub", E, B, I),
      // J = X1^2
      c.call(f2mPrefix + "_square", X1, J),
      // E_squared = E^2
      c.call(f2mPrefix + "_square", E, E2),
      // X3 (X1) = A * (B-F)
      c.call(f2mPrefix + "_sub", B, F, AUX),
      c.call(f2mPrefix + "_mul", A, AUX, X1),
      // Y3 (Y1) = G^2 - 3*E^2
      c.call(f2mPrefix + "_add", E2, E2, AUX),
      c.call(f2mPrefix + "_add", E2, AUX, AUX),
      c.call(f2mPrefix + "_square", G, Y1),
      c.call(f2mPrefix + "_sub", Y1, AUX, Y1),
      // Z3 (Z1) = B * H
      c.call(f2mPrefix + "_mul", B, H, Z1),
      // ell_0 = xi * I
      c.call(f2mPrefix + "_mul", c.i32_const(pAltBn128Twist), I, ELL_0),
      // ell_VW = - H (later: * yP)
      c.call(f2mPrefix + "_neg", H, ELL_VW),
      // ell_VV = 3*J (later: * xP)
      c.call(f2mPrefix + "_add", J, J, ELL_VV),
      c.call(f2mPrefix + "_add", J, ELL_VV, ELL_VV)
    );
  }
  function buildMulByQ() {
    const f = module.addFunction(prefix + "_mulByQ");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(f2size));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(f2size * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(f2size));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(f2size * 2));
    const MulByQX = c.i32_const(module.alloc([
      ...utils$2.bigInt2BytesLE(toMontgomery("21575463638280843010398324269430826099269044274347216827212613867836435027261"), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery("10307601595873709700152284273816112264069230130616436755625194854815875713954"), f1size)
    ]));
    const MulByQY = c.i32_const(module.alloc([
      ...utils$2.bigInt2BytesLE(toMontgomery("2821565182194536844548159561693502659359617185244120367078079554186484126554"), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery("3505843767911556378687030309984248845540243509899259641013678093033130930403"), f1size)
    ]));
    f.addCode(
      // The frobeniusMap(1) in this field, is the conjugate
      c.call(f2mPrefix + "_conjugate", x, x3),
      c.call(f2mPrefix + "_mul", MulByQX, x3, x3),
      c.call(f2mPrefix + "_conjugate", y, y3),
      c.call(f2mPrefix + "_mul", MulByQY, y3, y3),
      c.call(f2mPrefix + "_conjugate", z, z3)
    );
  }
  function buildPrepareG2() {
    buildMulByQ();
    const f = module.addFunction(prefix + "_prepareG2");
    f.addParam("pQ", "i32");
    f.addParam("ppreQ", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const QX = c.getLocal("pQ");
    const pR = module.alloc(f2size * 3);
    const R = c.i32_const(pR);
    const RX = c.i32_const(pR);
    const RY = c.i32_const(pR + f2size);
    const RZ = c.i32_const(pR + 2 * f2size);
    const cQX = c.i32_add(c.getLocal("ppreQ"), c.i32_const(0));
    const cQY = c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size));
    const pQ1 = module.alloc(f2size * 3);
    const Q1 = c.i32_const(pQ1);
    const pQ2 = module.alloc(f2size * 3);
    const Q2 = c.i32_const(pQ2);
    const Q2Y = c.i32_const(pQ2 + f2size);
    f.addCode(
      c.call(g2mPrefix + "_normalize", QX, cQX),
      // TODO Remove if already in affine
      c.call(f2mPrefix + "_copy", cQX, RX),
      c.call(f2mPrefix + "_copy", cQY, RY),
      c.call(f2mPrefix + "_one", RZ)
    );
    f.addCode(
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3))),
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "_prepDblStep", R, c.getLocal("pCoef")),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(prefix + "_prepAddStep", cQX, R, c.getLocal("pCoef")),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
    f.addCode(
      c.call(prefix + "_mulByQ", cQX, Q1),
      c.call(prefix + "_mulByQ", Q1, Q2)
    );
    f.addCode(
      c.call(f2mPrefix + "_neg", Q2Y, Q2Y),
      c.call(prefix + "_prepAddStep", Q1, R, c.getLocal("pCoef")),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
      c.call(prefix + "_prepAddStep", Q2, R, c.getLocal("pCoef")),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
    );
  }
  function buildMulBy024Old() {
    const f = module.addFunction(prefix + "__mulBy024Old");
    f.addParam("pEll0", "i32");
    f.addParam("pEllVW", "i32");
    f.addParam("pEllVV", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("pEll0");
    const x2 = c.getLocal("pEllVV");
    const x4 = c.getLocal("pEllVW");
    const z0 = c.getLocal("pR");
    const pAUX12 = module.alloc(ftsize);
    const AUX12 = c.i32_const(pAUX12);
    const AUX12_0 = c.i32_const(pAUX12);
    const AUX12_2 = c.i32_const(pAUX12 + f2size);
    const AUX12_4 = c.i32_const(pAUX12 + f2size * 2);
    const AUX12_6 = c.i32_const(pAUX12 + f2size * 3);
    const AUX12_8 = c.i32_const(pAUX12 + f2size * 4);
    const AUX12_10 = c.i32_const(pAUX12 + f2size * 5);
    f.addCode(
      c.call(f2mPrefix + "_copy", x0, AUX12_0),
      c.call(f2mPrefix + "_zero", AUX12_2),
      c.call(f2mPrefix + "_copy", x2, AUX12_4),
      c.call(f2mPrefix + "_zero", AUX12_6),
      c.call(f2mPrefix + "_copy", x4, AUX12_8),
      c.call(f2mPrefix + "_zero", AUX12_10),
      c.call(ftmPrefix + "_mul", AUX12, z0, z0)
    );
  }
  function buildMulBy024() {
    const f = module.addFunction(prefix + "__mulBy024");
    f.addParam("pEll0", "i32");
    f.addParam("pEllVW", "i32");
    f.addParam("pEllVV", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("pEll0");
    const x2 = c.getLocal("pEllVV");
    const x4 = c.getLocal("pEllVW");
    const z0 = c.getLocal("pR");
    const z1 = c.i32_add(c.getLocal("pR"), c.i32_const(2 * n8));
    const z2 = c.i32_add(c.getLocal("pR"), c.i32_const(4 * n8));
    const z3 = c.i32_add(c.getLocal("pR"), c.i32_const(6 * n8));
    const z4 = c.i32_add(c.getLocal("pR"), c.i32_const(8 * n8));
    const z5 = c.i32_add(c.getLocal("pR"), c.i32_const(10 * n8));
    const t0 = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const s0 = c.i32_const(module.alloc(f2size));
    const T3 = c.i32_const(module.alloc(f2size));
    const T4 = c.i32_const(module.alloc(f2size));
    const D0 = c.i32_const(module.alloc(f2size));
    const D2 = c.i32_const(module.alloc(f2size));
    const D4 = c.i32_const(module.alloc(f2size));
    const S1 = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      // D0 = z0 * x0;
      c.call(f2mPrefix + "_mul", z0, x0, D0),
      // D2 = z2 * x2;
      c.call(f2mPrefix + "_mul", z2, x2, D2),
      // D4 = z4 * x4;
      c.call(f2mPrefix + "_mul", z4, x4, D4),
      // t2 = z0 + z4;
      c.call(f2mPrefix + "_add", z0, z4, t2),
      // t1 = z0 + z2;
      c.call(f2mPrefix + "_add", z0, z2, t1),
      // s0 = z1 + z3 + z5;
      c.call(f2mPrefix + "_add", z1, z3, s0),
      c.call(f2mPrefix + "_add", s0, z5, s0),
      // For z.a_.a_ = z0.
      // S1 = z1 * x2;
      c.call(f2mPrefix + "_mul", z1, x2, S1),
      // T3 = S1 + D4;
      c.call(f2mPrefix + "_add", S1, D4, T3),
      // T4 = my_Fp6::non_residue * T3 + D0;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      c.call(f2mPrefix + "_add", T4, D0, z0),
      // z0 = T4;
      // For z.a_.b_ = z1
      // T3 = z5 * x4;
      c.call(f2mPrefix + "_mul", z5, x4, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T3 = T3 + D2;
      c.call(f2mPrefix + "_add", T3, D2, T3),
      // T4 = my_Fp6::non_residue * T3;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      // T3 = z1 * x0;
      c.call(f2mPrefix + "_mul", z1, x0, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T4 = T4 + T3;
      c.call(f2mPrefix + "_add", T4, T3, z1),
      // z1 = T4;
      // For z.a_.c_ = z2
      // t0 = x0 + x2;
      c.call(f2mPrefix + "_add", x0, x2, t0),
      // T3 = t1 * t0 - D0 - D2;
      c.call(f2mPrefix + "_mul", t1, t0, T3),
      c.call(f2mPrefix + "_add", D0, D2, AUX),
      c.call(f2mPrefix + "_sub", T3, AUX, T3),
      // T4 = z3 * x4;
      c.call(f2mPrefix + "_mul", z3, x4, T4),
      // S1 = S1 + T4;
      c.call(f2mPrefix + "_add", S1, T4, S1),
      // For z.b_.a_ = z3 (z3 needs z2)
      // t0 = z2 + z4;
      c.call(f2mPrefix + "_add", z2, z4, t0),
      // T3 = T3 + T4;
      // z2 = T3;
      c.call(f2mPrefix + "_add", T3, T4, z2),
      // t1 = x2 + x4;
      c.call(f2mPrefix + "_add", x2, x4, t1),
      // T3 = t0 * t1 - D2 - D4;
      c.call(f2mPrefix + "_mul", t1, t0, T3),
      c.call(f2mPrefix + "_add", D2, D4, AUX),
      c.call(f2mPrefix + "_sub", T3, AUX, T3),
      // T4 = my_Fp6::non_residue * T3;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      // T3 = z3 * x0;
      c.call(f2mPrefix + "_mul", z3, x0, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T4 = T4 + T3;
      c.call(f2mPrefix + "_add", T4, T3, z3),
      // z3 = T4;
      // For z.b_.b_ = z4
      // T3 = z5 * x2;
      c.call(f2mPrefix + "_mul", z5, x2, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T4 = my_Fp6::non_residue * T3;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      // t0 = x0 + x4;
      c.call(f2mPrefix + "_add", x0, x4, t0),
      // T3 = t2 * t0 - D0 - D4;
      c.call(f2mPrefix + "_mul", t2, t0, T3),
      c.call(f2mPrefix + "_add", D0, D4, AUX),
      c.call(f2mPrefix + "_sub", T3, AUX, T3),
      // T4 = T4 + T3;
      c.call(f2mPrefix + "_add", T4, T3, z4),
      // z4 = T4;
      // For z.b_.c_ = z5.
      // t0 = x0 + x2 + x4;
      c.call(f2mPrefix + "_add", x0, x2, t0),
      c.call(f2mPrefix + "_add", t0, x4, t0),
      // T3 = s0 * t0 - S1;
      c.call(f2mPrefix + "_mul", s0, t0, T3),
      c.call(f2mPrefix + "_sub", T3, S1, z5)
      // z5 = T3;
    );
  }
  function buildMillerLoop() {
    const f = module.addFunction(prefix + "_millerLoop");
    f.addParam("ppreP", "i32");
    f.addParam("ppreQ", "i32");
    f.addParam("r", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const preP_PX = c.getLocal("ppreP");
    const preP_PY = c.i32_add(c.getLocal("ppreP"), c.i32_const(f1size));
    const ELL_0 = c.getLocal("pCoef");
    const ELL_VW = c.i32_add(c.getLocal("pCoef"), c.i32_const(f2size));
    const ELL_VV = c.i32_add(c.getLocal("pCoef"), c.i32_const(2 * f2size));
    const pVW = module.alloc(f2size);
    const VW = c.i32_const(pVW);
    const pVV = module.alloc(f2size);
    const VV = c.i32_const(pVV);
    const F = c.getLocal("r");
    f.addCode(
      c.call(ftmPrefix + "_one", F),
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3))),
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(ftmPrefix + "_square", F, F),
        c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
        c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
        c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
            ...c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
            ...c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
    f.addCode(
      c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
      c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
      c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
      c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
      c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
      c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
    );
  }
  function buildFrobeniusMap(n) {
    const F12 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [8376118865763821496583973867626364092589906065868298776909617916018768340080n, 16469823323077808223889137241176536799009286646108169935659301613961712198316n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556617n, 0n],
        [11697423496358154304825782922584725312912383441159505038794027105778954184319n, 303847389135065887422783454877609941456349188919719272345083954437860409601n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556616n, 0n],
        [3321304630594332808241809054958361220322477375291206261884409189760185844239n, 5722266937896532885780051958958348231143373700109372999374820235121374419868n],
        [21888242871839275222246405745257275088696311157297823662689037894645226208582n, 0n],
        [13512124006075453725662431877630910996106405091429524885779419978626457868503n, 5418419548761466998357268504080738289687024511189653727029736280683514010267n],
        [2203960485148121921418603742825762020974279258880205651966n, 0n],
        [10190819375481120917420622822672549775783927716138318623895010788866272024264n, 21584395482704209334823622290379665147239961968378104390343953940207365798982n],
        [2203960485148121921418603742825762020974279258880205651967n, 0n],
        [18566938241244942414004596690298913868373833782006617400804628704885040364344n, 16165975933942742336466353786298926857552937457188450663314217659523851788715n]
      ]
    ];
    const F6 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [21575463638280843010398324269430826099269044274347216827212613867836435027261n, 10307601595873709700152284273816112264069230130616436755625194854815875713954n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556616n, 0n],
        [3772000881919853776433695186713858239009073593817195771773381919316419345261n, 2236595495967245188281701248203181795121068902605861227855261137820944008926n],
        [2203960485148121921418603742825762020974279258880205651966n, 0n],
        [18429021223477853657660792034369865839114504446431234726392080002137598044644n, 9344045779998320333812420223237981029506012124075525679208581902008406485703n]
      ],
      [
        [1n, 0n],
        [2581911344467009335267311115468803099551665605076196740867805258568234346338n, 19937756971775647987995932169929341994314640652964949448313374472400716661030n],
        [2203960485148121921418603742825762020974279258880205651966n, 0n],
        [5324479202449903542726783395506214481928257762400643279780343368557297135718n, 16208900380737693084919495127334387981393726419856888799917914180988844123039n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556616n, 0n],
        [13981852324922362344252311234282257507216387789820983642040889267519694726527n, 7629828391165209371577384193250820201684255241773809077146787135900891633097n]
      ]
    ];
    const f = module.addFunction(prefix + "__frobeniusMap" + n);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < 6; i++) {
      const X = i == 0 ? c.getLocal("x") : c.i32_add(c.getLocal("x"), c.i32_const(i * f2size));
      const Xc0 = X;
      const Xc1 = c.i32_add(c.getLocal("x"), c.i32_const(i * f2size + f1size));
      const R = i == 0 ? c.getLocal("r") : c.i32_add(c.getLocal("r"), c.i32_const(i * f2size));
      const Rc0 = R;
      const Rc1 = c.i32_add(c.getLocal("r"), c.i32_const(i * f2size + f1size));
      const coef = mul2(F12[Math.floor(i / 3)][n % 12], F6[i % 3][n % 6]);
      const pCoef = module.alloc([
        ...utils$2.bigInt2BytesLE(toMontgomery(coef[0]), 32),
        ...utils$2.bigInt2BytesLE(toMontgomery(coef[1]), 32)
      ]);
      if (n % 2 == 1) {
        f.addCode(
          c.call(f1mPrefix + "_copy", Xc0, Rc0),
          c.call(f1mPrefix + "_neg", Xc1, Rc1),
          c.call(f2mPrefix + "_mul", R, c.i32_const(pCoef), R)
        );
      } else {
        f.addCode(c.call(f2mPrefix + "_mul", X, c.i32_const(pCoef), R));
      }
    }
    function mul2(a, b) {
      const ac0 = BigInt(a[0]);
      const ac1 = BigInt(a[1]);
      const bc0 = BigInt(b[0]);
      const bc1 = BigInt(b[1]);
      const res = [
        (ac0 * bc0 - ac1 * bc1) % q,
        (ac0 * bc1 + ac1 * bc0) % q
      ];
      if (isNegative$2(res[0])) res[0] = res[0] + q;
      return res;
    }
  }
  function buildFinalExponentiationFirstChunk() {
    const f = module.addFunction(prefix + "__finalExponentiationFirstChunk");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const eltC0 = elt;
    const eltC1 = c.i32_add(elt, c.i32_const(n8 * 6));
    const r2 = c.getLocal("r");
    const pA = module.alloc(ftsize);
    const A = c.i32_const(pA);
    const Ac0 = A;
    const Ac1 = c.i32_const(pA + n8 * 6);
    const B = c.i32_const(module.alloc(ftsize));
    const C = c.i32_const(module.alloc(ftsize));
    const D = c.i32_const(module.alloc(ftsize));
    f.addCode(
      // const alt_bn128_Fq12 A = alt_bn128_Fq12(elt.c0,-elt.c1);
      c.call(f6mPrefix + "_copy", eltC0, Ac0),
      c.call(f6mPrefix + "_neg", eltC1, Ac1),
      // const alt_bn128_Fq12 B = elt.inverse();
      c.call(ftmPrefix + "_inverse", elt, B),
      // const alt_bn128_Fq12 C = A * B;
      c.call(ftmPrefix + "_mul", A, B, C),
      // const alt_bn128_Fq12 D = C.Frobenius_map(2);
      c.call(prefix + "__frobeniusMap2", C, D),
      // const alt_bn128_Fq12 result = D * C;
      c.call(ftmPrefix + "_mul", C, D, r2)
    );
  }
  function buildCyclotomicSquare() {
    const f = module.addFunction(prefix + "__cyclotomicSquare");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x4 = c.i32_add(c.getLocal("x"), c.i32_const(f2size));
    const x3 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f2size));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(3 * f2size));
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(4 * f2size));
    const x5 = c.i32_add(c.getLocal("x"), c.i32_const(5 * f2size));
    const r0 = c.getLocal("r");
    const r4 = c.i32_add(c.getLocal("r"), c.i32_const(f2size));
    const r3 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f2size));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(3 * f2size));
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(4 * f2size));
    const r5 = c.i32_add(c.getLocal("r"), c.i32_const(5 * f2size));
    const t0 = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t3 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    const tmp = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      //    // t0 + t1*y = (z0 + z1*y)^2 = a^2
      //    tmp = z0 * z1;
      //    t0 = (z0 + z1) * (z0 + my_Fp6::non_residue * z1) - tmp - my_Fp6::non_residue * tmp;
      //    t1 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x0, x1, tmp),
      c.call(f2mPrefix + "_mul", x1, c.i32_const(pNonResidueF6), t0),
      c.call(f2mPrefix + "_add", x0, t0, t0),
      c.call(f2mPrefix + "_add", x0, x1, AUX),
      c.call(f2mPrefix + "_mul", AUX, t0, t0),
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t0, AUX, t0),
      c.call(f2mPrefix + "_add", tmp, tmp, t1),
      //  // t2 + t3*y = (z2 + z3*y)^2 = b^2
      //  tmp = z2 * z3;
      //  t2 = (z2 + z3) * (z2 + my_Fp6::non_residue * z3) - tmp - my_Fp6::non_residue * tmp;
      //  t3 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x2, x3, tmp),
      c.call(f2mPrefix + "_mul", x3, c.i32_const(pNonResidueF6), t2),
      c.call(f2mPrefix + "_add", x2, t2, t2),
      c.call(f2mPrefix + "_add", x2, x3, AUX),
      c.call(f2mPrefix + "_mul", AUX, t2, t2),
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t2, AUX, t2),
      c.call(f2mPrefix + "_add", tmp, tmp, t3),
      //  // t4 + t5*y = (z4 + z5*y)^2 = c^2
      //  tmp = z4 * z5;
      //  t4 = (z4 + z5) * (z4 + my_Fp6::non_residue * z5) - tmp - my_Fp6::non_residue * tmp;
      //  t5 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x4, x5, tmp),
      c.call(f2mPrefix + "_mul", x5, c.i32_const(pNonResidueF6), t4),
      c.call(f2mPrefix + "_add", x4, t4, t4),
      c.call(f2mPrefix + "_add", x4, x5, AUX),
      c.call(f2mPrefix + "_mul", AUX, t4, t4),
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t4, AUX, t4),
      c.call(f2mPrefix + "_add", tmp, tmp, t5),
      // For A
      // z0 = 3 * t0 - 2 * z0
      c.call(f2mPrefix + "_sub", t0, x0, r0),
      c.call(f2mPrefix + "_add", r0, r0, r0),
      c.call(f2mPrefix + "_add", t0, r0, r0),
      // z1 = 3 * t1 + 2 * z1
      c.call(f2mPrefix + "_add", t1, x1, r1),
      c.call(f2mPrefix + "_add", r1, r1, r1),
      c.call(f2mPrefix + "_add", t1, r1, r1),
      // For B
      // z2 = 3 * (xi * t5) + 2 * z2
      c.call(f2mPrefix + "_mul", t5, c.i32_const(pAltBn128Twist), AUX),
      c.call(f2mPrefix + "_add", AUX, x2, r2),
      c.call(f2mPrefix + "_add", r2, r2, r2),
      c.call(f2mPrefix + "_add", AUX, r2, r2),
      // z3 = 3 * t4 - 2 * z3
      c.call(f2mPrefix + "_sub", t4, x3, r3),
      c.call(f2mPrefix + "_add", r3, r3, r3),
      c.call(f2mPrefix + "_add", t4, r3, r3),
      // For C
      // z4 = 3 * t2 - 2 * z4
      c.call(f2mPrefix + "_sub", t2, x4, r4),
      c.call(f2mPrefix + "_add", r4, r4, r4),
      c.call(f2mPrefix + "_add", t2, r4, r4),
      // z5 = 3 * t3 + 2 * z5
      c.call(f2mPrefix + "_add", t3, x5, r5),
      c.call(f2mPrefix + "_add", r5, r5, r5),
      c.call(f2mPrefix + "_add", t3, r5, r5)
    );
  }
  function buildCyclotomicExp(exponent, fnName) {
    const exponentNafBytes = naf2(exponent).map((b) => b == -1 ? 255 : b);
    const pExponentNafBytes = module.alloc(exponentNafBytes);
    const f = module.addFunction(prefix + "__cyclotomicExp_" + fnName);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("bit", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("x");
    const res = c.getLocal("r");
    const inverse = c.i32_const(module.alloc(ftsize));
    f.addCode(
      c.call(ftmPrefix + "_conjugate", x, inverse),
      c.call(ftmPrefix + "_one", res),
      c.if(
        c.teeLocal("bit", c.i32_load8_s(c.i32_const(exponentNafBytes.length - 1), pExponentNafBytes)),
        c.if(
          c.i32_eq(
            c.getLocal("bit"),
            c.i32_const(1)
          ),
          c.call(ftmPrefix + "_mul", res, x, res),
          c.call(ftmPrefix + "_mul", res, inverse, res)
        )
      ),
      c.setLocal("i", c.i32_const(exponentNafBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "__cyclotomicSquare", res, res),
        c.if(
          c.teeLocal("bit", c.i32_load8_s(c.getLocal("i"), pExponentNafBytes)),
          c.if(
            c.i32_eq(
              c.getLocal("bit"),
              c.i32_const(1)
            ),
            c.call(ftmPrefix + "_mul", res, x, res),
            c.call(ftmPrefix + "_mul", res, inverse, res)
          )
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFinalExponentiationLastChunk() {
    buildCyclotomicSquare();
    buildCyclotomicExp(finalExpZ, "w0");
    const f = module.addFunction(prefix + "__finalExponentiationLastChunk");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const result = c.getLocal("r");
    const A = c.i32_const(module.alloc(ftsize));
    const B = c.i32_const(module.alloc(ftsize));
    const C = c.i32_const(module.alloc(ftsize));
    const D = c.i32_const(module.alloc(ftsize));
    const E = c.i32_const(module.alloc(ftsize));
    const F = c.i32_const(module.alloc(ftsize));
    const G = c.i32_const(module.alloc(ftsize));
    const H = c.i32_const(module.alloc(ftsize));
    const I = c.i32_const(module.alloc(ftsize));
    const J = c.i32_const(module.alloc(ftsize));
    const K = c.i32_const(module.alloc(ftsize));
    const L = c.i32_const(module.alloc(ftsize));
    const M = c.i32_const(module.alloc(ftsize));
    const N = c.i32_const(module.alloc(ftsize));
    const O = c.i32_const(module.alloc(ftsize));
    const P = c.i32_const(module.alloc(ftsize));
    const Q = c.i32_const(module.alloc(ftsize));
    const R = c.i32_const(module.alloc(ftsize));
    const S = c.i32_const(module.alloc(ftsize));
    const T = c.i32_const(module.alloc(ftsize));
    const U = c.i32_const(module.alloc(ftsize));
    f.addCode(
      // A = exp_by_neg_z(elt)  // = elt^(-z)
      c.call(prefix + "__cyclotomicExp_w0", elt, A),
      c.call(ftmPrefix + "_conjugate", A, A),
      // B = A^2                // = elt^(-2*z)
      c.call(prefix + "__cyclotomicSquare", A, B),
      // C = B^2                // = elt^(-4*z)
      c.call(prefix + "__cyclotomicSquare", B, C),
      // D = C * B              // = elt^(-6*z)
      c.call(ftmPrefix + "_mul", C, B, D),
      // E = exp_by_neg_z(D)    // = elt^(6*z^2)
      c.call(prefix + "__cyclotomicExp_w0", D, E),
      c.call(ftmPrefix + "_conjugate", E, E),
      // F = E^2                // = elt^(12*z^2)
      c.call(prefix + "__cyclotomicSquare", E, F),
      // G = epx_by_neg_z(F)    // = elt^(-12*z^3)
      c.call(prefix + "__cyclotomicExp_w0", F, G),
      c.call(ftmPrefix + "_conjugate", G, G),
      // H = conj(D)            // = elt^(6*z)
      c.call(ftmPrefix + "_conjugate", D, H),
      // I = conj(G)            // = elt^(12*z^3)
      c.call(ftmPrefix + "_conjugate", G, I),
      // J = I * E              // = elt^(12*z^3 + 6*z^2)
      c.call(ftmPrefix + "_mul", I, E, J),
      // K = J * H              // = elt^(12*z^3 + 6*z^2 + 6*z)
      c.call(ftmPrefix + "_mul", J, H, K),
      // L = K * B              // = elt^(12*z^3 + 6*z^2 + 4*z)
      c.call(ftmPrefix + "_mul", K, B, L),
      // M = K * E              // = elt^(12*z^3 + 12*z^2 + 6*z)
      c.call(ftmPrefix + "_mul", K, E, M),
      // N = M * elt            // = elt^(12*z^3 + 12*z^2 + 6*z + 1)
      c.call(ftmPrefix + "_mul", M, elt, N),
      // O = L.Frobenius_map(1) // = elt^(q*(12*z^3 + 6*z^2 + 4*z))
      c.call(prefix + "__frobeniusMap1", L, O),
      // P = O * N              // = elt^(q*(12*z^3 + 6*z^2 + 4*z) * (12*z^3 + 12*z^2 + 6*z + 1))
      c.call(ftmPrefix + "_mul", O, N, P),
      // Q = K.Frobenius_map(2) // = elt^(q^2 * (12*z^3 + 6*z^2 + 6*z))
      c.call(prefix + "__frobeniusMap2", K, Q),
      // R = Q * P              // = elt^(q^2 * (12*z^3 + 6*z^2 + 6*z) + q*(12*z^3 + 6*z^2 + 4*z) * (12*z^3 + 12*z^2 + 6*z + 1))
      c.call(ftmPrefix + "_mul", Q, P, R),
      // S = conj(elt)          // = elt^(-1)
      c.call(ftmPrefix + "_conjugate", elt, S),
      // T = S * L              // = elt^(12*z^3 + 6*z^2 + 4*z - 1)
      c.call(ftmPrefix + "_mul", S, L, T),
      // U = T.Frobenius_map(3) // = elt^(q^3(12*z^3 + 6*z^2 + 4*z - 1))
      c.call(prefix + "__frobeniusMap3", T, U),
      // V = U * R              // = elt^(q^3(12*z^3 + 6*z^2 + 4*z - 1) + q^2 * (12*z^3 + 6*z^2 + 6*z) + q*(12*z^3 + 6*z^2 + 4*z) * (12*z^3 + 12*z^2 + 6*z + 1))
      c.call(ftmPrefix + "_mul", U, R, result)
      // result = V
    );
  }
  function buildFinalExponentiation() {
    buildFinalExponentiationFirstChunk();
    buildFinalExponentiationLastChunk();
    const f = module.addFunction(prefix + "_finalExponentiation");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const result = c.getLocal("r");
    const eltToFirstChunk = c.i32_const(module.alloc(ftsize));
    f.addCode(
      c.call(prefix + "__finalExponentiationFirstChunk", elt, eltToFirstChunk),
      c.call(prefix + "__finalExponentiationLastChunk", eltToFirstChunk, result)
    );
  }
  function buildFinalExponentiationOld() {
    const f = module.addFunction(prefix + "_finalExponentiationOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const exponent = 552484233613224096312617126783173147097382103762957654188882734314196910839907541213974502761540629817009608548654680343627701153829446747810907373256841551006201639677726139946029199968412598804882391702273019083653272047566316584365559776493027495458238373902875937659943504873220554161550525926302303331747463515644711876653177129578303191095900909191624817826566688241804408081892785725967931714097716709526092261278071952560171111444072049229123565057483750161460024353346284167282452756217662335528813519139808291170539072125381230815729071544861602750936964829313608137325426383735122175229541155376346436093930287402089517426973178917569713384748081827255472576937471496195752727188261435633271238710131736096299798168852925540549342330775279877006784354801422249722573783561685179618816480037695005515426162362431072245638324744480n;
    const pExponent = module.alloc(utils$2.bigInt2BytesLE(exponent, 352));
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(ftmPrefix + "_exp", c.getLocal("x"), c.i32_const(pExponent), c.i32_const(352), c.getLocal("r"))
    );
  }
  const pPreP = module.alloc(prePSize);
  const pPreQ = module.alloc(preQSize);
  function buildPairingEquation(nPairings) {
    const f = module.addFunction(prefix + "_pairingEq" + nPairings);
    for (let i = 0; i < nPairings; i++) {
      f.addParam("p_" + i, "i32");
      f.addParam("q_" + i, "i32");
    }
    f.addParam("c", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    const auxT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(ftmPrefix + "_one", resT));
    for (let i = 0; i < nPairings; i++) {
      f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p_" + i), c.i32_const(pPreP)));
      f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q_" + i), c.i32_const(pPreQ)));
      f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), auxT));
      f.addCode(c.call(ftmPrefix + "_mul", resT, auxT, resT));
    }
    f.addCode(c.call(prefix + "_finalExponentiation", resT, resT));
    f.addCode(c.call(ftmPrefix + "_eq", resT, c.getLocal("c")));
  }
  function buildPairing2() {
    const f = module.addFunction(prefix + "_pairing");
    f.addParam("p", "i32");
    f.addParam("q", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p"), c.i32_const(pPreP)));
    f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q"), c.i32_const(pPreQ)));
    f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), resT));
    f.addCode(c.call(prefix + "_finalExponentiation", resT, c.getLocal("r")));
  }
  buildPrepAddStep();
  buildPrepDoubleStep();
  buildPrepareG1();
  buildPrepareG2();
  buildMulBy024();
  buildMulBy024Old();
  buildMillerLoop();
  for (let i = 0; i < 10; i++) {
    buildFrobeniusMap(i);
    module.exportFunction(prefix + "__frobeniusMap" + i);
  }
  buildFinalExponentiationOld();
  buildFinalExponentiation();
  for (let i = 1; i <= 5; i++) {
    buildPairingEquation(i);
    module.exportFunction(prefix + "_pairingEq" + i);
  }
  buildPairing2();
  module.exportFunction(prefix + "_pairing");
  module.exportFunction(prefix + "_prepareG1");
  module.exportFunction(prefix + "_prepareG2");
  module.exportFunction(prefix + "_millerLoop");
  module.exportFunction(prefix + "_finalExponentiation");
  module.exportFunction(prefix + "_finalExponentiationOld");
  module.exportFunction(prefix + "__mulBy024");
  module.exportFunction(prefix + "__mulBy024Old");
  module.exportFunction(prefix + "__cyclotomicSquare");
  module.exportFunction(prefix + "__cyclotomicExp_w0");
};
var utils$1 = utils$6;
var buildF1m2 = build_f1m;
var buildF12 = build_f1;
var buildF2m2 = build_f2m;
var buildF3m2 = build_f3m;
var buildCurve2 = build_curve_jacobian_a0;
var buildFFT$1 = build_fft;
var buildPol2 = build_pol;
var buildQAP2 = build_qap;
var buildApplyKey2 = build_applykey;
var { bitLength: bitLength$1, isOdd, isNegative: isNegative$1 } = bigint;
var build_bls12381 = function buildBLS12381(module, _prefix) {
  const prefix = _prefix || "bls12381";
  if (module.modules[prefix]) return prefix;
  const q = 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
  const r = 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;
  const n64q = Math.floor((bitLength$1(q - 1n) - 1) / 64) + 1;
  const n8q = n64q * 8;
  const f1size = n8q;
  const f2size = f1size * 2;
  const ftsize = f1size * 12;
  const n64r = Math.floor((bitLength$1(r - 1n) - 1) / 64) + 1;
  const n8r = n64r * 8;
  const frsize = n8r;
  const pr = module.alloc(utils$1.bigInt2BytesLE(r, frsize));
  const f1mPrefix = buildF1m2(module, q, "f1m", "intq");
  buildF12(module, r, "fr", "frm", "intr");
  const pG1b = module.alloc(utils$1.bigInt2BytesLE(toMontgomery(4n), f1size));
  const g1mPrefix = buildCurve2(module, "g1m", "f1m", pG1b);
  buildFFT$1(module, "frm", "frm", "frm", "frm_mul");
  buildPol2(module, "pol", "frm");
  buildQAP2(module, "qap", "frm");
  const f2mPrefix = buildF2m2(module, "f1m_neg", "f2m", "f1m");
  const pG2b = module.alloc([
    ...utils$1.bigInt2BytesLE(toMontgomery(4n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(4n), f1size)
  ]);
  const g2mPrefix = buildCurve2(module, "g2m", "f2m", pG2b);
  function buildGTimesFr(fnName, opMul) {
    const f = module.addFunction(fnName);
    f.addParam("pG", "i32");
    f.addParam("pFr", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8r));
    f.addCode(
      c.call("frm_fromMontgomery", c.getLocal("pFr"), AUX),
      c.call(
        opMul,
        c.getLocal("pG"),
        AUX,
        c.i32_const(n8r),
        c.getLocal("pr")
      )
    );
    module.exportFunction(fnName);
  }
  buildGTimesFr("g1m_timesFr", "g1m_timesScalar");
  buildFFT$1(module, "g1m", "g1m", "frm", "g1m_timesFr");
  buildGTimesFr("g2m_timesFr", "g2m_timesScalar");
  buildFFT$1(module, "g2m", "g2m", "frm", "g2m_timesFr");
  buildGTimesFr("g1m_timesFrAffine", "g1m_timesScalarAffine");
  buildGTimesFr("g2m_timesFrAffine", "g2m_timesScalarAffine");
  buildApplyKey2(module, "frm_batchApplyKey", "fmr", "frm", n8r, n8r, n8r, "frm_mul");
  buildApplyKey2(module, "g1m_batchApplyKey", "g1m", "frm", n8q * 3, n8q * 3, n8r, "g1m_timesFr");
  buildApplyKey2(module, "g1m_batchApplyKeyMixed", "g1m", "frm", n8q * 2, n8q * 3, n8r, "g1m_timesFrAffine");
  buildApplyKey2(module, "g2m_batchApplyKey", "g2m", "frm", n8q * 2 * 3, n8q * 3 * 2, n8r, "g2m_timesFr");
  buildApplyKey2(module, "g2m_batchApplyKeyMixed", "g2m", "frm", n8q * 2 * 2, n8q * 3 * 2, n8r, "g2m_timesFrAffine");
  function toMontgomery(a) {
    return BigInt(a) * (1n << BigInt(f1size * 8)) % q;
  }
  const G1gen = [
    3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507n,
    1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569n,
    1n
  ];
  const pG1gen = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G1gen[0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1gen[1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1gen[2]), f1size)
    ]
  );
  const G1zero = [
    0n,
    1n,
    0n
  ];
  const pG1zero = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G1zero[0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1zero[1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1zero[2]), f1size)
    ]
  );
  const G2gen = [
    [
      352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160n,
      3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758n
    ],
    [
      1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905n,
      927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582n
    ],
    [
      1n,
      0n
    ]
  ];
  const pG2gen = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[0][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[0][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[1][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[1][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[2][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[2][1]), f1size)
    ]
  );
  const G2zero = [
    [
      0n,
      0n
    ],
    [
      1n,
      0n
    ],
    [
      0n,
      0n
    ]
  ];
  const pG2zero = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[0][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[0][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[1][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[1][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[2][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[2][1]), f1size)
    ]
  );
  const pOneT = module.alloc([
    ...utils$1.bigInt2BytesLE(toMontgomery(1n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size)
  ]);
  const pBls12381Twist = module.alloc([
    ...utils$1.bigInt2BytesLE(toMontgomery(1n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(1n), f1size)
  ]);
  function build_mulNR2() {
    const f = module.addFunction(f2mPrefix + "_mulNR");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x0c = c.i32_const(module.alloc(f1size));
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1size));
    const r0 = c.getLocal("pr");
    const r1 = c.i32_add(c.getLocal("pr"), c.i32_const(f1size));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, x0c),
      c.call(f1mPrefix + "_sub", x0, x1, r0),
      c.call(f1mPrefix + "_add", x0c, x1, r1)
    );
  }
  build_mulNR2();
  const f6mPrefix = buildF3m2(module, f2mPrefix + "_mulNR", "f6m", "f2m");
  function build_mulNR6() {
    const f = module.addFunction(f6mPrefix + "_mulNR");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const c0copy = c.i32_const(module.alloc(f1size * 2));
    f.addCode(
      c.call(
        f2mPrefix + "_copy",
        c.getLocal("x"),
        c0copy
      ),
      c.call(
        f2mPrefix + "_mulNR",
        c.i32_add(c.getLocal("x"), c.i32_const(n8q * 4)),
        c.getLocal("pr")
      ),
      c.call(
        f2mPrefix + "_copy",
        c.i32_add(c.getLocal("x"), c.i32_const(n8q * 2)),
        c.i32_add(c.getLocal("pr"), c.i32_const(n8q * 4))
      ),
      c.call(
        f2mPrefix + "_copy",
        c0copy,
        c.i32_add(c.getLocal("pr"), c.i32_const(n8q * 2))
      )
    );
  }
  build_mulNR6();
  const ftmPrefix = buildF2m2(module, f6mPrefix + "_mulNR", "ftm", f6mPrefix);
  const ateLoopCount = 0xd201000000010000n;
  const ateLoopBitBytes = bits2(ateLoopCount);
  const pAteLoopBitBytes = module.alloc(ateLoopBitBytes);
  const ateCoefSize = 3 * f2size;
  const ateNDblCoefs = ateLoopBitBytes.length - 1;
  const ateNAddCoefs = ateLoopBitBytes.reduce((acc, b) => acc + (b != 0 ? 1 : 0), 0);
  const ateNCoefs = ateNAddCoefs + ateNDblCoefs + 1;
  const prePSize = 3 * 2 * n8q;
  const preQSize = 3 * n8q * 2 + ateNCoefs * ateCoefSize;
  const finalExpIsNegative = true;
  const finalExpZ = 15132376222941642752n;
  module.modules[prefix] = {
    n64q,
    n64r,
    n8q,
    n8r,
    pG1gen,
    pG1zero,
    pG1b,
    pG2gen,
    pG2zero,
    pG2b,
    pq: module.modules["f1m"].pq,
    pr,
    pOneT,
    r,
    q,
    prePSize,
    preQSize
  };
  function naf2(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd(E)) {
        const z = 2 - Number(E % 4n);
        res.push(z);
        E = E - BigInt(z);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function bits2(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd(E)) {
        res.push(1);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function buildPrepareG1() {
    const f = module.addFunction(prefix + "_prepareG1");
    f.addParam("pP", "i32");
    f.addParam("ppreP", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(g1mPrefix + "_normalize", c.getLocal("pP"), c.getLocal("ppreP"))
      // TODO Remove if already in affine
    );
  }
  function buildPrepDoubleStep() {
    const f = module.addFunction(prefix + "_prepDblStep");
    f.addParam("R", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const Rx = c.getLocal("R");
    const Ry = c.i32_add(c.getLocal("R"), c.i32_const(2 * n8q));
    const Rz = c.i32_add(c.getLocal("R"), c.i32_const(4 * n8q));
    const t0 = c.getLocal("r");
    const t3 = c.i32_add(c.getLocal("r"), c.i32_const(2 * n8q));
    const t6 = c.i32_add(c.getLocal("r"), c.i32_const(4 * n8q));
    const zsquared = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    f.addCode(
      // tmp0 = r.x.square();
      c.call(f2mPrefix + "_square", Rx, t0),
      // tmp1 = r.y.square();
      c.call(f2mPrefix + "_square", Ry, t1),
      // tmp2 = tmp1.square();
      c.call(f2mPrefix + "_square", t1, t2),
      // tmp3 = (tmp1 + r.x).square() - tmp0 - tmp2;
      c.call(f2mPrefix + "_add", t1, Rx, t3),
      c.call(f2mPrefix + "_square", t3, t3),
      c.call(f2mPrefix + "_sub", t3, t0, t3),
      c.call(f2mPrefix + "_sub", t3, t2, t3),
      // tmp3 = tmp3 + tmp3;
      c.call(f2mPrefix + "_add", t3, t3, t3),
      // tmp4 = tmp0 + tmp0 + tmp0;
      c.call(f2mPrefix + "_add", t0, t0, t4),
      c.call(f2mPrefix + "_add", t4, t0, t4),
      // tmp6 = r.x + tmp4;
      c.call(f2mPrefix + "_add", Rx, t4, t6),
      // tmp5 = tmp4.square();
      c.call(f2mPrefix + "_square", t4, t5),
      // zsquared = r.z.square();
      c.call(f2mPrefix + "_square", Rz, zsquared),
      // r.x = tmp5 - tmp3 - tmp3;
      c.call(f2mPrefix + "_sub", t5, t3, Rx),
      c.call(f2mPrefix + "_sub", Rx, t3, Rx),
      // r.z = (r.z + r.y).square() - tmp1 - zsquared;
      c.call(f2mPrefix + "_add", Rz, Ry, Rz),
      c.call(f2mPrefix + "_square", Rz, Rz),
      c.call(f2mPrefix + "_sub", Rz, t1, Rz),
      c.call(f2mPrefix + "_sub", Rz, zsquared, Rz),
      // r.y = (tmp3 - r.x) * tmp4;
      c.call(f2mPrefix + "_sub", t3, Rx, Ry),
      c.call(f2mPrefix + "_mul", Ry, t4, Ry),
      // tmp2 = tmp2 + tmp2;
      c.call(f2mPrefix + "_add", t2, t2, t2),
      // tmp2 = tmp2 + tmp2;
      c.call(f2mPrefix + "_add", t2, t2, t2),
      // tmp2 = tmp2 + tmp2;
      c.call(f2mPrefix + "_add", t2, t2, t2),
      // r.y -= tmp2;
      c.call(f2mPrefix + "_sub", Ry, t2, Ry),
      // tmp3 = tmp4 * zsquared;
      c.call(f2mPrefix + "_mul", t4, zsquared, t3),
      // tmp3 = tmp3 + tmp3;
      c.call(f2mPrefix + "_add", t3, t3, t3),
      // tmp3 = -tmp3;
      c.call(f2mPrefix + "_neg", t3, t3),
      // tmp6 = tmp6.square() - tmp0 - tmp5;
      c.call(f2mPrefix + "_square", t6, t6),
      c.call(f2mPrefix + "_sub", t6, t0, t6),
      c.call(f2mPrefix + "_sub", t6, t5, t6),
      // tmp1 = tmp1 + tmp1;
      c.call(f2mPrefix + "_add", t1, t1, t1),
      // tmp1 = tmp1 + tmp1;
      c.call(f2mPrefix + "_add", t1, t1, t1),
      // tmp6 = tmp6 - tmp1;
      c.call(f2mPrefix + "_sub", t6, t1, t6),
      // tmp0 = r.z * zsquared;
      c.call(f2mPrefix + "_mul", Rz, zsquared, t0),
      // tmp0 = tmp0 + tmp0;
      c.call(f2mPrefix + "_add", t0, t0, t0)
    );
  }
  function buildPrepAddStep() {
    const f = module.addFunction(prefix + "_prepAddStep");
    f.addParam("R", "i32");
    f.addParam("Q", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const Rx = c.getLocal("R");
    const Ry = c.i32_add(c.getLocal("R"), c.i32_const(2 * n8q));
    const Rz = c.i32_add(c.getLocal("R"), c.i32_const(4 * n8q));
    const Qx = c.getLocal("Q");
    const Qy = c.i32_add(c.getLocal("Q"), c.i32_const(2 * n8q));
    const t10 = c.getLocal("r");
    const t1 = c.i32_add(c.getLocal("r"), c.i32_const(2 * n8q));
    const t9 = c.i32_add(c.getLocal("r"), c.i32_const(4 * n8q));
    const zsquared = c.i32_const(module.alloc(f2size));
    const ysquared = c.i32_const(module.alloc(f2size));
    const ztsquared = c.i32_const(module.alloc(f2size));
    const t0 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t3 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    const t6 = c.i32_const(module.alloc(f2size));
    const t7 = c.i32_const(module.alloc(f2size));
    const t8 = c.i32_const(module.alloc(f2size));
    f.addCode(
      // zsquared = r.z.square();
      c.call(f2mPrefix + "_square", Rz, zsquared),
      // ysquared = q.y.square();
      c.call(f2mPrefix + "_square", Qy, ysquared),
      // t0 = zsquared * q.x;
      c.call(f2mPrefix + "_mul", zsquared, Qx, t0),
      // t1 = ((q.y + r.z).square() - ysquared - zsquared) * zsquared;
      c.call(f2mPrefix + "_add", Qy, Rz, t1),
      c.call(f2mPrefix + "_square", t1, t1),
      c.call(f2mPrefix + "_sub", t1, ysquared, t1),
      c.call(f2mPrefix + "_sub", t1, zsquared, t1),
      c.call(f2mPrefix + "_mul", t1, zsquared, t1),
      // t2 = t0 - r.x;
      c.call(f2mPrefix + "_sub", t0, Rx, t2),
      // t3 = t2.square();
      c.call(f2mPrefix + "_square", t2, t3),
      // t4 = t3 + t3;
      c.call(f2mPrefix + "_add", t3, t3, t4),
      // t4 = t4 + t4;
      c.call(f2mPrefix + "_add", t4, t4, t4),
      // t5 = t4 * t2;
      c.call(f2mPrefix + "_mul", t4, t2, t5),
      // t6 = t1 - r.y - r.y;
      c.call(f2mPrefix + "_sub", t1, Ry, t6),
      c.call(f2mPrefix + "_sub", t6, Ry, t6),
      // t9 = t6 * q.x;
      c.call(f2mPrefix + "_mul", t6, Qx, t9),
      // t7 = t4 * r.x;
      c.call(f2mPrefix + "_mul", t4, Rx, t7),
      // r.x = t6.square() - t5 - t7 - t7;
      c.call(f2mPrefix + "_square", t6, Rx),
      c.call(f2mPrefix + "_sub", Rx, t5, Rx),
      c.call(f2mPrefix + "_sub", Rx, t7, Rx),
      c.call(f2mPrefix + "_sub", Rx, t7, Rx),
      // r.z = (r.z + t2).square() - zsquared - t3;
      c.call(f2mPrefix + "_add", Rz, t2, Rz),
      c.call(f2mPrefix + "_square", Rz, Rz),
      c.call(f2mPrefix + "_sub", Rz, zsquared, Rz),
      c.call(f2mPrefix + "_sub", Rz, t3, Rz),
      // t10 = q.y + r.z;
      c.call(f2mPrefix + "_add", Qy, Rz, t10),
      // t8 = (t7 - r.x) * t6;
      c.call(f2mPrefix + "_sub", t7, Rx, t8),
      c.call(f2mPrefix + "_mul", t8, t6, t8),
      // t0 = r.y * t5;
      c.call(f2mPrefix + "_mul", Ry, t5, t0),
      // t0 = t0 + t0;
      c.call(f2mPrefix + "_add", t0, t0, t0),
      // r.y = t8 - t0;
      c.call(f2mPrefix + "_sub", t8, t0, Ry),
      // t10 = t10.square() - ysquared;
      c.call(f2mPrefix + "_square", t10, t10),
      c.call(f2mPrefix + "_sub", t10, ysquared, t10),
      // ztsquared = r.z.square();
      c.call(f2mPrefix + "_square", Rz, ztsquared),
      // t10 = t10 - ztsquared;
      c.call(f2mPrefix + "_sub", t10, ztsquared, t10),
      // t9 = t9 + t9 - t10;
      c.call(f2mPrefix + "_add", t9, t9, t9),
      c.call(f2mPrefix + "_sub", t9, t10, t9),
      // t10 = r.z + r.z;
      c.call(f2mPrefix + "_add", Rz, Rz, t10),
      // t6 = -t6;
      c.call(f2mPrefix + "_neg", t6, t6),
      // t1 = t6 + t6;
      c.call(f2mPrefix + "_add", t6, t6, t1)
    );
  }
  function buildPrepareG2() {
    const f = module.addFunction(prefix + "_prepareG2");
    f.addParam("pQ", "i32");
    f.addParam("ppreQ", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const Q = c.getLocal("pQ");
    const pR = module.alloc(f2size * 3);
    const R = c.i32_const(pR);
    const base = c.getLocal("ppreQ");
    f.addCode(
      c.call(g2mPrefix + "_normalize", Q, base),
      c.if(
        c.call(g2mPrefix + "_isZero", base),
        c.ret([])
      ),
      c.call(g2mPrefix + "_copy", base, R),
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3)))
    );
    f.addCode(
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "_prepDblStep", R, c.getLocal("pCoef")),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(prefix + "_prepAddStep", R, base, c.getLocal("pCoef")),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildF6Mul1() {
    const f = module.addFunction(f6mPrefix + "_mul1");
    f.addParam("pA", "i32");
    f.addParam("pC1", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const A_c0 = c.getLocal("pA");
    const A_c1 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 2));
    const A_c2 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 4));
    const c1 = c.getLocal("pC1");
    const t1 = c.getLocal("pR");
    const t2 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 2));
    const b_b = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 4));
    const Ac0_Ac1 = c.i32_const(module.alloc(f1size * 2));
    const Ac1_Ac2 = c.i32_const(module.alloc(f1size * 2));
    f.addCode(
      c.call(f2mPrefix + "_add", A_c0, A_c1, Ac0_Ac1),
      c.call(f2mPrefix + "_add", A_c1, A_c2, Ac1_Ac2),
      // let b_b = self.c1 * c1;
      c.call(f2mPrefix + "_mul", A_c1, c1, b_b),
      // let t1 = (self.c1 + self.c2) * c1 - b_b;
      c.call(f2mPrefix + "_mul", Ac1_Ac2, c1, t1),
      c.call(f2mPrefix + "_sub", t1, b_b, t1),
      // let t1 = t1.mul_by_nonresidue();
      c.call(f2mPrefix + "_mulNR", t1, t1),
      // let t2 = (self.c0 + self.c1) * c1 - b_b;
      c.call(f2mPrefix + "_mul", Ac0_Ac1, c1, t2),
      c.call(f2mPrefix + "_sub", t2, b_b, t2)
    );
  }
  buildF6Mul1();
  function buildF6Mul01() {
    const f = module.addFunction(f6mPrefix + "_mul01");
    f.addParam("pA", "i32");
    f.addParam("pC0", "i32");
    f.addParam("pC1", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const A_c0 = c.getLocal("pA");
    const A_c1 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 2));
    const A_c2 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 4));
    const c0 = c.getLocal("pC0");
    const c1 = c.getLocal("pC1");
    const t1 = c.getLocal("pR");
    const t2 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 2));
    const t3 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 4));
    const a_a = c.i32_const(module.alloc(f1size * 2));
    const b_b = c.i32_const(module.alloc(f1size * 2));
    const Ac0_Ac1 = c.i32_const(module.alloc(f1size * 2));
    const Ac0_Ac2 = c.i32_const(module.alloc(f1size * 2));
    f.addCode(
      // let a_a = self.c0 * c0;
      c.call(f2mPrefix + "_mul", A_c0, c0, a_a),
      // let b_b = self.c1 * c1;
      c.call(f2mPrefix + "_mul", A_c1, c1, b_b),
      c.call(f2mPrefix + "_add", A_c0, A_c1, Ac0_Ac1),
      c.call(f2mPrefix + "_add", A_c0, A_c2, Ac0_Ac2),
      // let t1 = (self.c1 + self.c2) * c1 - b_b;
      c.call(f2mPrefix + "_add", A_c1, A_c2, t1),
      c.call(f2mPrefix + "_mul", t1, c1, t1),
      c.call(f2mPrefix + "_sub", t1, b_b, t1),
      // let t1 = t1.mul_by_nonresidue() + a_a;
      c.call(f2mPrefix + "_mulNR", t1, t1),
      c.call(f2mPrefix + "_add", t1, a_a, t1),
      // let t2 = (c0 + c1) * (self.c0 + self.c1) - a_a - b_b;
      c.call(f2mPrefix + "_add", c0, c1, t2),
      c.call(f2mPrefix + "_mul", t2, Ac0_Ac1, t2),
      c.call(f2mPrefix + "_sub", t2, a_a, t2),
      c.call(f2mPrefix + "_sub", t2, b_b, t2),
      // let t3 = (self.c0 + self.c2) * c0 - a_a + b_b;
      c.call(f2mPrefix + "_mul", Ac0_Ac2, c0, t3),
      c.call(f2mPrefix + "_sub", t3, a_a, t3),
      c.call(f2mPrefix + "_add", t3, b_b, t3)
    );
  }
  buildF6Mul01();
  function buildF12Mul014() {
    const f = module.addFunction(ftmPrefix + "_mul014");
    f.addParam("pA", "i32");
    f.addParam("pC0", "i32");
    f.addParam("pC1", "i32");
    f.addParam("pC4", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const A_c0 = c.getLocal("pA");
    const A_c1 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 6));
    const c0 = c.getLocal("pC0");
    const c1 = c.getLocal("pC1");
    const c4 = c.getLocal("pC4");
    const aa = c.i32_const(module.alloc(f1size * 6));
    const bb = c.i32_const(module.alloc(f1size * 6));
    const o = c.i32_const(module.alloc(f1size * 2));
    const R_c0 = c.getLocal("pR");
    const R_c1 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 6));
    f.addCode(
      // let aa = self.c0.mul_by_01(c0, c1);
      c.call(f6mPrefix + "_mul01", A_c0, c0, c1, aa),
      // let bb = self.c1.mul_by_1(c4);
      c.call(f6mPrefix + "_mul1", A_c1, c4, bb),
      // let o = c1 + c4;
      c.call(f2mPrefix + "_add", c1, c4, o),
      // let c1 = self.c1 + self.c0;
      c.call(f6mPrefix + "_add", A_c1, A_c0, R_c1),
      // let c1 = c1.mul_by_01(c0, &o);
      c.call(f6mPrefix + "_mul01", R_c1, c0, o, R_c1),
      // let c1 = c1 - aa - bb;
      c.call(f6mPrefix + "_sub", R_c1, aa, R_c1),
      c.call(f6mPrefix + "_sub", R_c1, bb, R_c1),
      // let c0 = bb;
      c.call(f6mPrefix + "_copy", bb, R_c0),
      // let c0 = c0.mul_by_nonresidue();
      c.call(f6mPrefix + "_mulNR", R_c0, R_c0),
      // let c0 = c0 + aa;
      c.call(f6mPrefix + "_add", R_c0, aa, R_c0)
    );
  }
  buildF12Mul014();
  function buildELL() {
    const f = module.addFunction(prefix + "_ell");
    f.addParam("pP", "i32");
    f.addParam("pCoefs", "i32");
    f.addParam("pF", "i32");
    const c = f.getCodeBuilder();
    const Px = c.getLocal("pP");
    const Py = c.i32_add(c.getLocal("pP"), c.i32_const(n8q));
    const F = c.getLocal("pF");
    const coef0_0 = c.getLocal("pCoefs");
    const coef0_1 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size));
    const coef1_0 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size * 2));
    const coef1_1 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size * 3));
    const coef2 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size * 4));
    const pc0 = module.alloc(f1size * 2);
    const c0 = c.i32_const(pc0);
    const c0_c0 = c.i32_const(pc0);
    const c0_c1 = c.i32_const(pc0 + f1size);
    const pc1 = module.alloc(f1size * 2);
    const c1 = c.i32_const(pc1);
    const c1_c0 = c.i32_const(pc1);
    const c1_c1 = c.i32_const(pc1 + f1size);
    f.addCode(
      //     let mut c0 = coeffs.0;
      //     let mut c1 = coeffs.1;
      //
      //    c0.c0 *= p.y;
      //    c0.c1 *= p.y;
      //
      //    c1.c0 *= p.x;
      //    c1.c1 *= p.x;
      //
      //     f.mul_by_014(&coeffs.2, &c1, &c0)
      c.call(f1mPrefix + "_mul", coef0_0, Py, c0_c0),
      c.call(f1mPrefix + "_mul", coef0_1, Py, c0_c1),
      c.call(f1mPrefix + "_mul", coef1_0, Px, c1_c0),
      c.call(f1mPrefix + "_mul", coef1_1, Px, c1_c1),
      c.call(ftmPrefix + "_mul014", F, coef2, c1, c0, F)
    );
  }
  buildELL();
  function buildMillerLoop() {
    const f = module.addFunction(prefix + "_millerLoop");
    f.addParam("ppreP", "i32");
    f.addParam("ppreQ", "i32");
    f.addParam("r", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const preP = c.getLocal("ppreP");
    const coefs = c.getLocal("pCoef");
    const F = c.getLocal("r");
    f.addCode(
      c.call(ftmPrefix + "_one", F),
      c.if(
        c.call(g1mPrefix + "_isZero", preP),
        c.ret([])
      ),
      c.if(
        c.call(g1mPrefix + "_isZero", c.getLocal("ppreQ")),
        c.ret([])
      ),
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3))),
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "_ell", preP, coefs, F),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(prefix + "_ell", preP, coefs, F),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.call(ftmPrefix + "_square", F, F),
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.i32_const(1))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      )),
      c.call(prefix + "_ell", preP, coefs, F)
    );
    {
      f.addCode(
        c.call(ftmPrefix + "_conjugate", F, F)
      );
    }
  }
  function buildFrobeniusMap(n) {
    const F12 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [3850754370037169011952147076051364057158807420970682438676050522613628423219637725072182697113062777891589506424760n, 151655185184498381465642749684540099398075398968325446656007613510403227271200139370504932015952886146304766135027n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620351n, 0n],
        [2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n, 1028732146235106349975324479215795277384839936929757896155643118032610843298655225875571310552543014690878354869257n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n, 0n],
        [3125332594171059424908108096204648978570118281977575435832422631601824034463382777937621250592425535493320683825557n, 877076961050607968509681729531255177986764537961432449499635504522207616027455086505066378536590128544573588734230n],
        [4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559786n, 0n],
        [151655185184498381465642749684540099398075398968325446656007613510403227271200139370504932015952886146304766135027n, 3850754370037169011952147076051364057158807420970682438676050522613628423219637725072182697113062777891589506424760n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n, 0n],
        [1028732146235106349975324479215795277384839936929757896155643118032610843298655225875571310552543014690878354869257n, 2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939437n, 0n],
        [877076961050607968509681729531255177986764537961432449499635504522207616027455086505066378536590128544573588734230n, 3125332594171059424908108096204648978570118281977575435832422631601824034463382777937621250592425535493320683825557n]
      ]
    ];
    const F6 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [0n, 4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n, 0n],
        [0n, 1n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n, 0n],
        [0n, 793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n]
      ],
      [
        [1n, 0n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939437n, 0n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n, 0n],
        [4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559786n, 0n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n, 0n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620351n, 0n]
      ]
    ];
    const f = module.addFunction(ftmPrefix + "_frobeniusMap" + n);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < 6; i++) {
      const X = i == 0 ? c.getLocal("x") : c.i32_add(c.getLocal("x"), c.i32_const(i * f2size));
      const Xc0 = X;
      const Xc1 = c.i32_add(c.getLocal("x"), c.i32_const(i * f2size + f1size));
      const R = i == 0 ? c.getLocal("r") : c.i32_add(c.getLocal("r"), c.i32_const(i * f2size));
      const Rc0 = R;
      const Rc1 = c.i32_add(c.getLocal("r"), c.i32_const(i * f2size + f1size));
      const coef = mul2(F12[Math.floor(i / 3)][n % 12], F6[i % 3][n % 6]);
      const pCoef = module.alloc([
        ...utils$1.bigInt2BytesLE(toMontgomery(coef[0]), n8q),
        ...utils$1.bigInt2BytesLE(toMontgomery(coef[1]), n8q)
      ]);
      if (n % 2 == 1) {
        f.addCode(
          c.call(f1mPrefix + "_copy", Xc0, Rc0),
          c.call(f1mPrefix + "_neg", Xc1, Rc1),
          c.call(f2mPrefix + "_mul", R, c.i32_const(pCoef), R)
        );
      } else {
        f.addCode(c.call(f2mPrefix + "_mul", X, c.i32_const(pCoef), R));
      }
    }
    function mul2(a, b) {
      const ac0 = a[0];
      const ac1 = a[1];
      const bc0 = b[0];
      const bc1 = b[1];
      const res = [
        (ac0 * bc0 - ac1 * bc1) % q,
        (ac0 * bc1 + ac1 * bc0) % q
      ];
      if (isNegative$1(res[0])) res[0] = res[0] + q;
      return res;
    }
  }
  function buildCyclotomicSquare() {
    const f = module.addFunction(prefix + "__cyclotomicSquare");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x4 = c.i32_add(c.getLocal("x"), c.i32_const(f2size));
    const x3 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f2size));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(3 * f2size));
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(4 * f2size));
    const x5 = c.i32_add(c.getLocal("x"), c.i32_const(5 * f2size));
    const r0 = c.getLocal("r");
    const r4 = c.i32_add(c.getLocal("r"), c.i32_const(f2size));
    const r3 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f2size));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(3 * f2size));
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(4 * f2size));
    const r5 = c.i32_add(c.getLocal("r"), c.i32_const(5 * f2size));
    const t0 = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t3 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    const tmp = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      //    // t0 + t1*y = (z0 + z1*y)^2 = a^2
      //    tmp = z0 * z1;
      //    t0 = (z0 + z1) * (z0 + my_Fp6::non_residue * z1) - tmp - my_Fp6::non_residue * tmp;
      //    t1 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x0, x1, tmp),
      c.call(f2mPrefix + "_mulNR", x1, t0),
      c.call(f2mPrefix + "_add", x0, t0, t0),
      c.call(f2mPrefix + "_add", x0, x1, AUX),
      c.call(f2mPrefix + "_mul", AUX, t0, t0),
      c.call(f2mPrefix + "_mulNR", tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t0, AUX, t0),
      c.call(f2mPrefix + "_add", tmp, tmp, t1),
      //  // t2 + t3*y = (z2 + z3*y)^2 = b^2
      //  tmp = z2 * z3;
      //  t2 = (z2 + z3) * (z2 + my_Fp6::non_residue * z3) - tmp - my_Fp6::non_residue * tmp;
      //  t3 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x2, x3, tmp),
      c.call(f2mPrefix + "_mulNR", x3, t2),
      c.call(f2mPrefix + "_add", x2, t2, t2),
      c.call(f2mPrefix + "_add", x2, x3, AUX),
      c.call(f2mPrefix + "_mul", AUX, t2, t2),
      c.call(f2mPrefix + "_mulNR", tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t2, AUX, t2),
      c.call(f2mPrefix + "_add", tmp, tmp, t3),
      //  // t4 + t5*y = (z4 + z5*y)^2 = c^2
      //  tmp = z4 * z5;
      //  t4 = (z4 + z5) * (z4 + my_Fp6::non_residue * z5) - tmp - my_Fp6::non_residue * tmp;
      //  t5 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x4, x5, tmp),
      c.call(f2mPrefix + "_mulNR", x5, t4),
      c.call(f2mPrefix + "_add", x4, t4, t4),
      c.call(f2mPrefix + "_add", x4, x5, AUX),
      c.call(f2mPrefix + "_mul", AUX, t4, t4),
      c.call(f2mPrefix + "_mulNR", tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t4, AUX, t4),
      c.call(f2mPrefix + "_add", tmp, tmp, t5),
      // For A
      // z0 = 3 * t0 - 2 * z0
      c.call(f2mPrefix + "_sub", t0, x0, r0),
      c.call(f2mPrefix + "_add", r0, r0, r0),
      c.call(f2mPrefix + "_add", t0, r0, r0),
      // z1 = 3 * t1 + 2 * z1
      c.call(f2mPrefix + "_add", t1, x1, r1),
      c.call(f2mPrefix + "_add", r1, r1, r1),
      c.call(f2mPrefix + "_add", t1, r1, r1),
      // For B
      // z2 = 3 * (xi * t5) + 2 * z2
      c.call(f2mPrefix + "_mul", t5, c.i32_const(pBls12381Twist), AUX),
      c.call(f2mPrefix + "_add", AUX, x2, r2),
      c.call(f2mPrefix + "_add", r2, r2, r2),
      c.call(f2mPrefix + "_add", AUX, r2, r2),
      // z3 = 3 * t4 - 2 * z3
      c.call(f2mPrefix + "_sub", t4, x3, r3),
      c.call(f2mPrefix + "_add", r3, r3, r3),
      c.call(f2mPrefix + "_add", t4, r3, r3),
      // For C
      // z4 = 3 * t2 - 2 * z4
      c.call(f2mPrefix + "_sub", t2, x4, r4),
      c.call(f2mPrefix + "_add", r4, r4, r4),
      c.call(f2mPrefix + "_add", t2, r4, r4),
      // z5 = 3 * t3 + 2 * z5
      c.call(f2mPrefix + "_add", t3, x5, r5),
      c.call(f2mPrefix + "_add", r5, r5, r5),
      c.call(f2mPrefix + "_add", t3, r5, r5)
    );
  }
  function buildCyclotomicExp(exponent, isExpNegative, fnName) {
    const exponentNafBytes = naf2(exponent).map((b) => b == -1 ? 255 : b);
    const pExponentNafBytes = module.alloc(exponentNafBytes);
    const f = module.addFunction(prefix + "__cyclotomicExp_" + fnName);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("bit", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("x");
    const res = c.getLocal("r");
    const inverse = c.i32_const(module.alloc(ftsize));
    f.addCode(
      c.call(ftmPrefix + "_conjugate", x, inverse),
      c.call(ftmPrefix + "_one", res),
      c.if(
        c.teeLocal("bit", c.i32_load8_s(c.i32_const(exponentNafBytes.length - 1), pExponentNafBytes)),
        c.if(
          c.i32_eq(
            c.getLocal("bit"),
            c.i32_const(1)
          ),
          c.call(ftmPrefix + "_mul", res, x, res),
          c.call(ftmPrefix + "_mul", res, inverse, res)
        )
      ),
      c.setLocal("i", c.i32_const(exponentNafBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "__cyclotomicSquare", res, res),
        c.if(
          c.teeLocal("bit", c.i32_load8_s(c.getLocal("i"), pExponentNafBytes)),
          c.if(
            c.i32_eq(
              c.getLocal("bit"),
              c.i32_const(1)
            ),
            c.call(ftmPrefix + "_mul", res, x, res),
            c.call(ftmPrefix + "_mul", res, inverse, res)
          )
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
    if (isExpNegative) {
      f.addCode(
        c.call(ftmPrefix + "_conjugate", res, res)
      );
    }
  }
  function buildFinalExponentiation() {
    buildCyclotomicSquare();
    buildCyclotomicExp(finalExpZ, finalExpIsNegative, "w0");
    const f = module.addFunction(prefix + "_finalExponentiation");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const res = c.getLocal("r");
    const t0 = c.i32_const(module.alloc(ftsize));
    const t1 = c.i32_const(module.alloc(ftsize));
    const t2 = c.i32_const(module.alloc(ftsize));
    const t3 = c.i32_const(module.alloc(ftsize));
    const t4 = c.i32_const(module.alloc(ftsize));
    const t5 = c.i32_const(module.alloc(ftsize));
    const t6 = c.i32_const(module.alloc(ftsize));
    f.addCode(
      // let mut t0 = f.frobenius_map(6)
      c.call(ftmPrefix + "_frobeniusMap6", elt, t0),
      // let t1 = f.invert()
      c.call(ftmPrefix + "_inverse", elt, t1),
      // let mut t2 = t0 * t1;
      c.call(ftmPrefix + "_mul", t0, t1, t2),
      // t1 = t2.clone();
      c.call(ftmPrefix + "_copy", t2, t1),
      // t2 = t2.frobenius_map().frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap2", t2, t2),
      // t2 *= t1;
      c.call(ftmPrefix + "_mul", t2, t1, t2),
      // t1 = cyclotomic_square(t2).conjugate();
      c.call(prefix + "__cyclotomicSquare", t2, t1),
      c.call(ftmPrefix + "_conjugate", t1, t1),
      // let mut t3 = cycolotomic_exp(t2);
      c.call(prefix + "__cyclotomicExp_w0", t2, t3),
      // let mut t4 = cyclotomic_square(t3);
      c.call(prefix + "__cyclotomicSquare", t3, t4),
      // let mut t5 = t1 * t3;
      c.call(ftmPrefix + "_mul", t1, t3, t5),
      // t1 = cycolotomic_exp(t5);
      c.call(prefix + "__cyclotomicExp_w0", t5, t1),
      // t0 = cycolotomic_exp(t1);
      c.call(prefix + "__cyclotomicExp_w0", t1, t0),
      // let mut t6 = cycolotomic_exp(t0);
      c.call(prefix + "__cyclotomicExp_w0", t0, t6),
      // t6 *= t4;
      c.call(ftmPrefix + "_mul", t6, t4, t6),
      // t4 = cycolotomic_exp(t6);
      c.call(prefix + "__cyclotomicExp_w0", t6, t4),
      // t5 = t5.conjugate();
      c.call(ftmPrefix + "_conjugate", t5, t5),
      // t4 *= t5 * t2;
      c.call(ftmPrefix + "_mul", t4, t5, t4),
      c.call(ftmPrefix + "_mul", t4, t2, t4),
      // t5 = t2.conjugate();
      c.call(ftmPrefix + "_conjugate", t2, t5),
      // t1 *= t2;
      c.call(ftmPrefix + "_mul", t1, t2, t1),
      // t1 = t1.frobenius_map().frobenius_map().frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap3", t1, t1),
      // t6 *= t5;
      c.call(ftmPrefix + "_mul", t6, t5, t6),
      // t6 = t6.frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap1", t6, t6),
      // t3 *= t0;
      c.call(ftmPrefix + "_mul", t3, t0, t3),
      // t3 = t3.frobenius_map().frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap2", t3, t3),
      // t3 *= t1;
      c.call(ftmPrefix + "_mul", t3, t1, t3),
      // t3 *= t6;
      c.call(ftmPrefix + "_mul", t3, t6, t3),
      // f = t3 * t4;
      c.call(ftmPrefix + "_mul", t3, t4, res)
    );
  }
  function buildFinalExponentiationOld() {
    const f = module.addFunction(prefix + "_finalExponentiationOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const exponent = 322277361516934140462891564586510139908379969514828494218366688025288661041104682794998680497580008899973249814104447692778988208376779573819485263026159588510513834876303014016798809919343532899164848730280942609956670917565618115867287399623286813270357901731510188149934363360381614501334086825442271920079363289954510565375378443704372994881406797882676971082200626541916413184642520269678897559532260949334760604962086348898118982248842634379637598665468817769075878555493752214492790122785850202957575200176084204422751485957336465472324810982833638490904279282696134323072515220044451592646885410572234451732790590013479358343841220074174848221722017083597872017638514103174122784843925578370430843522959600095676285723737049438346544753168912974976791528535276317256904336520179281145394686565050419250614107803233314658825463117900250701199181529205942363159325765991819433914303908860460720581408201373164047773794825411011922305820065611121544561808414055302212057471395719432072209245600258134364584636810093520285711072578721435517884103526483832733289802426157301542744476740008494780363354305116978805620671467071400711358839553375340724899735460480144599782014906586543813292157922220645089192130209334926661588737007768565838519456601560804957985667880395221049249803753582637708560n;
    const pExponent = module.alloc(utils$1.bigInt2BytesLE(exponent, 544));
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(ftmPrefix + "_exp", c.getLocal("x"), c.i32_const(pExponent), c.i32_const(544), c.getLocal("r"))
    );
  }
  const pPreP = module.alloc(prePSize);
  const pPreQ = module.alloc(preQSize);
  function buildPairingEquation(nPairings) {
    const f = module.addFunction(prefix + "_pairingEq" + nPairings);
    for (let i = 0; i < nPairings; i++) {
      f.addParam("p_" + i, "i32");
      f.addParam("q_" + i, "i32");
    }
    f.addParam("c", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    const auxT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(ftmPrefix + "_one", resT));
    for (let i = 0; i < nPairings; i++) {
      f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p_" + i), c.i32_const(pPreP)));
      f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q_" + i), c.i32_const(pPreQ)));
      f.addCode(
        c.if(
          c.i32_eqz(c.call(g1mPrefix + "_inGroupAffine", c.i32_const(pPreP))),
          c.ret(c.i32_const(0))
        ),
        c.if(
          c.i32_eqz(c.call(g2mPrefix + "_inGroupAffine", c.i32_const(pPreQ))),
          c.ret(c.i32_const(0))
        )
      );
      f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), auxT));
      f.addCode(c.call(ftmPrefix + "_mul", resT, auxT, resT));
    }
    f.addCode(c.call(prefix + "_finalExponentiation", resT, resT));
    f.addCode(c.call(ftmPrefix + "_eq", resT, c.getLocal("c")));
  }
  function buildPairing2() {
    const f = module.addFunction(prefix + "_pairing");
    f.addParam("p", "i32");
    f.addParam("q", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p"), c.i32_const(pPreP)));
    f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q"), c.i32_const(pPreQ)));
    f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), resT));
    f.addCode(c.call(prefix + "_finalExponentiation", resT, c.getLocal("r")));
  }
  function buildInGroupG2() {
    const f = module.addFunction(g2mPrefix + "_inGroupAffine");
    f.addParam("p", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const WINV = [
      2001204777610833696708894912867952078278441409969503942666029068062015825245418932221343814564507832018947136279894n,
      2001204777610833696708894912867952078278441409969503942666029068062015825245418932221343814564507832018947136279893n
    ];
    const FROB2X = 4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n;
    const FROB3Y = [
      2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n,
      2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n
    ];
    const wInv = c.i32_const(module.alloc([
      ...utils$1.bigInt2BytesLE(toMontgomery(WINV[0]), n8q),
      ...utils$1.bigInt2BytesLE(toMontgomery(WINV[1]), n8q)
    ]));
    const frob2X = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(toMontgomery(FROB2X), n8q)));
    const frob3Y = c.i32_const(module.alloc([
      ...utils$1.bigInt2BytesLE(toMontgomery(FROB3Y[0]), n8q),
      ...utils$1.bigInt2BytesLE(toMontgomery(FROB3Y[1]), n8q)
    ]));
    const z = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(finalExpZ, 8)));
    const px = c.getLocal("p");
    const py = c.i32_add(c.getLocal("p"), c.i32_const(f2size));
    const aux = c.i32_const(module.alloc(f1size));
    const x_winv = c.i32_const(module.alloc(f2size));
    const y_winv = c.i32_const(module.alloc(f2size));
    const pf2 = module.alloc(f2size * 2);
    const f2 = c.i32_const(pf2);
    const f2x = c.i32_const(pf2);
    const f2x_c1 = c.i32_const(pf2);
    const f2x_c2 = c.i32_const(pf2 + f1size);
    const f2y = c.i32_const(pf2 + f2size);
    const f2y_c1 = c.i32_const(pf2 + f2size);
    const f2y_c2 = c.i32_const(pf2 + f2size + f1size);
    const pf3 = module.alloc(f2size * 3);
    const f3 = c.i32_const(pf3);
    const f3x = c.i32_const(pf3);
    const f3x_c1 = c.i32_const(pf3);
    const f3x_c2 = c.i32_const(pf3 + f1size);
    const f3y = c.i32_const(pf3 + f2size);
    const f3y_c1 = c.i32_const(pf3 + f2size);
    const f3y_c2 = c.i32_const(pf3 + f2size + f1size);
    const f3z = c.i32_const(pf3 + f2size * 2);
    f.addCode(
      c.if(
        c.call(g2mPrefix + "_isZeroAffine", c.getLocal("p")),
        c.ret(c.i32_const(1))
      ),
      c.if(
        c.i32_eqz(c.call(g2mPrefix + "_inCurveAffine", c.getLocal("p"))),
        c.ret(c.i32_const(0))
      ),
      c.call(f2mPrefix + "_mul", px, wInv, x_winv),
      c.call(f2mPrefix + "_mul", py, wInv, y_winv),
      c.call(f2mPrefix + "_mul1", x_winv, frob2X, f2x),
      c.call(f2mPrefix + "_neg", y_winv, f2y),
      c.call(f2mPrefix + "_neg", x_winv, f3x),
      c.call(f2mPrefix + "_mul", y_winv, frob3Y, f3y),
      c.call(f1mPrefix + "_sub", f2x_c1, f2x_c2, aux),
      c.call(f1mPrefix + "_add", f2x_c1, f2x_c2, f2x_c2),
      c.call(f1mPrefix + "_copy", aux, f2x_c1),
      c.call(f1mPrefix + "_sub", f2y_c1, f2y_c2, aux),
      c.call(f1mPrefix + "_add", f2y_c1, f2y_c2, f2y_c2),
      c.call(f1mPrefix + "_copy", aux, f2y_c1),
      c.call(f1mPrefix + "_add", f3x_c1, f3x_c2, aux),
      c.call(f1mPrefix + "_sub", f3x_c1, f3x_c2, f3x_c2),
      c.call(f1mPrefix + "_copy", aux, f3x_c1),
      c.call(f1mPrefix + "_sub", f3y_c2, f3y_c1, aux),
      c.call(f1mPrefix + "_add", f3y_c1, f3y_c2, f3y_c2),
      c.call(f1mPrefix + "_copy", aux, f3y_c1),
      c.call(f2mPrefix + "_one", f3z),
      c.call(g2mPrefix + "_timesScalar", f3, z, c.i32_const(8), f3),
      c.call(g2mPrefix + "_addMixed", f3, f2, f3),
      c.ret(
        c.call(g2mPrefix + "_eqMixed", f3, c.getLocal("p"))
      )
    );
    const fInGroup = module.addFunction(g2mPrefix + "_inGroup");
    fInGroup.addParam("pIn", "i32");
    fInGroup.setReturnType("i32");
    const c2 = fInGroup.getCodeBuilder();
    const aux2 = c2.i32_const(module.alloc(f2size * 2));
    fInGroup.addCode(
      c2.call(g2mPrefix + "_toAffine", c2.getLocal("pIn"), aux2),
      c2.ret(
        c2.call(g2mPrefix + "_inGroupAffine", aux2)
      )
    );
  }
  function buildInGroupG1() {
    const f = module.addFunction(g1mPrefix + "_inGroupAffine");
    f.addParam("p", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const BETA = 4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n;
    const BETA2 = 793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n;
    const Z2M1D3 = (finalExpZ * finalExpZ - 1n) / 3n;
    const beta = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(toMontgomery(BETA), n8q)));
    const beta2 = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(toMontgomery(BETA2), n8q)));
    const z2m1d3 = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(Z2M1D3, 16)));
    const px = c.getLocal("p");
    const py = c.i32_add(c.getLocal("p"), c.i32_const(f1size));
    const psp = module.alloc(f1size * 3);
    const sp = c.i32_const(psp);
    const spx = c.i32_const(psp);
    const spy = c.i32_const(psp + f1size);
    const ps2p = module.alloc(f1size * 2);
    const s2p = c.i32_const(ps2p);
    const s2px = c.i32_const(ps2p);
    const s2py = c.i32_const(ps2p + f1size);
    f.addCode(
      c.if(
        c.call(g1mPrefix + "_isZeroAffine", c.getLocal("p")),
        c.ret(c.i32_const(1))
      ),
      c.if(
        c.i32_eqz(c.call(g1mPrefix + "_inCurveAffine", c.getLocal("p"))),
        c.ret(c.i32_const(0))
      ),
      c.call(f1mPrefix + "_mul", px, beta, spx),
      c.call(f1mPrefix + "_copy", py, spy),
      c.call(f1mPrefix + "_mul", px, beta2, s2px),
      c.call(f1mPrefix + "_copy", py, s2py),
      c.call(g1mPrefix + "_doubleAffine", sp, sp),
      c.call(g1mPrefix + "_subMixed", sp, c.getLocal("p"), sp),
      c.call(g1mPrefix + "_subMixed", sp, s2p, sp),
      c.call(g1mPrefix + "_timesScalar", sp, z2m1d3, c.i32_const(16), sp),
      c.ret(
        c.call(g1mPrefix + "_eqMixed", sp, s2p)
      )
    );
    const fInGroup = module.addFunction(g1mPrefix + "_inGroup");
    fInGroup.addParam("pIn", "i32");
    fInGroup.setReturnType("i32");
    const c2 = fInGroup.getCodeBuilder();
    const aux2 = c2.i32_const(module.alloc(f1size * 2));
    fInGroup.addCode(
      c2.call(g1mPrefix + "_toAffine", c2.getLocal("pIn"), aux2),
      c2.ret(
        c2.call(g1mPrefix + "_inGroupAffine", aux2)
      )
    );
  }
  for (let i = 0; i < 10; i++) {
    buildFrobeniusMap(i);
    module.exportFunction(ftmPrefix + "_frobeniusMap" + i);
  }
  buildInGroupG1();
  buildInGroupG2();
  buildPrepAddStep();
  buildPrepDoubleStep();
  buildPrepareG1();
  buildPrepareG2();
  buildMillerLoop();
  buildFinalExponentiationOld();
  buildFinalExponentiation();
  for (let i = 1; i <= 5; i++) {
    buildPairingEquation(i);
    module.exportFunction(prefix + "_pairingEq" + i);
  }
  buildPairing2();
  module.exportFunction(prefix + "_pairing");
  module.exportFunction(prefix + "_prepareG1");
  module.exportFunction(prefix + "_prepareG2");
  module.exportFunction(prefix + "_millerLoop");
  module.exportFunction(prefix + "_finalExponentiation");
  module.exportFunction(prefix + "_finalExponentiationOld");
  module.exportFunction(prefix + "__cyclotomicSquare");
  module.exportFunction(prefix + "__cyclotomicExp_w0");
  module.exportFunction(f6mPrefix + "_mul1");
  module.exportFunction(f6mPrefix + "_mul01");
  module.exportFunction(ftmPrefix + "_mul014");
  module.exportFunction(g1mPrefix + "_inGroupAffine");
  module.exportFunction(g1mPrefix + "_inGroup");
  module.exportFunction(g2mPrefix + "_inGroupAffine");
  module.exportFunction(g2mPrefix + "_inGroup");
};
var buildBn128$1 = build_bn128;
var buildBls12381$1 = build_bls12381;
function stringifyBigInts(o) {
  if (typeof o == "bigint" || o.eq !== void 0) {
    return o.toString(10);
  } else if (o instanceof Uint8Array) {
    return fromRprLE(o, 0);
  } else if (Array.isArray(o)) {
    return o.map(stringifyBigInts);
  } else if (typeof o == "object") {
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = stringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}
function unstringifyBigInts(o) {
  if (typeof o == "string" && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}
function beBuff2int(buff) {
  let res = BigInt(0);
  let i = buff.length;
  let offset = 0;
  const buffV = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
  while (i > 0) {
    if (i >= 4) {
      i -= 4;
      res += BigInt(buffV.getUint32(i)) << BigInt(offset * 8);
      offset += 4;
    } else if (i >= 2) {
      i -= 2;
      res += BigInt(buffV.getUint16(i)) << BigInt(offset * 8);
      offset += 2;
    } else {
      i -= 1;
      res += BigInt(buffV.getUint8(i)) << BigInt(offset * 8);
      offset += 1;
    }
  }
  return res;
}
function beInt2Buff(n, len) {
  let r = n;
  const buff = new Uint8Array(len);
  const buffV = new DataView(buff.buffer);
  let o = len;
  while (o > 0) {
    if (o - 4 >= 0) {
      o -= 4;
      buffV.setUint32(o, Number(r & BigInt(4294967295)));
      r = r >> BigInt(32);
    } else if (o - 2 >= 0) {
      o -= 2;
      buffV.setUint16(o, Number(r & BigInt(65535)));
      r = r >> BigInt(16);
    } else {
      o -= 1;
      buffV.setUint8(o, Number(r & BigInt(255)));
      r = r >> BigInt(8);
    }
  }
  if (r) {
    throw new Error("Number does not fit in this length");
  }
  return buff;
}
function leBuff2int(buff) {
  let res = BigInt(0);
  let i = 0;
  const buffV = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
  while (i < buff.length) {
    if (i + 4 <= buff.length) {
      res += BigInt(buffV.getUint32(i, true)) << BigInt(i * 8);
      i += 4;
    } else if (i + 2 <= buff.length) {
      res += BigInt(buffV.getUint16(i, true)) << BigInt(i * 8);
      i += 2;
    } else {
      res += BigInt(buffV.getUint8(i, true)) << BigInt(i * 8);
      i += 1;
    }
  }
  return res;
}
function leInt2Buff(n, len) {
  let r = n;
  if (typeof len === "undefined") {
    len = Math.floor((bitLength$6(n) - 1) / 8) + 1;
    if (len == 0) len = 1;
  }
  const buff = new Uint8Array(len);
  const buffV = new DataView(buff.buffer);
  let o = 0;
  while (o < len) {
    if (o + 4 <= len) {
      buffV.setUint32(o, Number(r & BigInt(4294967295)), true);
      o += 4;
      r = r >> BigInt(32);
    } else if (o + 2 <= len) {
      buffV.setUint16(o, Number(r & BigInt(65535)), true);
      o += 2;
      r = r >> BigInt(16);
    } else {
      buffV.setUint8(o, Number(r & BigInt(255)), true);
      o += 1;
      r = r >> BigInt(8);
    }
  }
  if (r) {
    throw new Error("Number does not fit in this length");
  }
  return buff;
}
function stringifyFElements(F, o) {
  if (typeof o == "bigint" || o.eq !== void 0) {
    return o.toString(10);
  } else if (o instanceof Uint8Array) {
    return F.toString(F.e(o));
  } else if (Array.isArray(o)) {
    return o.map(stringifyFElements.bind(this, F));
  } else if (typeof o == "object") {
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = stringifyFElements(F, o[k]);
    });
    return res;
  } else {
    return o;
  }
}
function unstringifyFElements(F, o) {
  if (typeof o == "string" && /^[0-9]+$/.test(o)) {
    return F.e(o);
  } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return F.e(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyFElements.bind(this, F));
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyFElements(F, o[k]);
    });
    return res;
  } else {
    return o;
  }
}
var _revTable = [];
for (let i = 0; i < 256; i++) {
  _revTable[i] = _revSlow(i, 8);
}
function _revSlow(idx, bits2) {
  let res = 0;
  let a = idx;
  for (let i = 0; i < bits2; i++) {
    res <<= 1;
    res = res | a & 1;
    a >>= 1;
  }
  return res;
}
function bitReverse(idx, bits2) {
  return (_revTable[idx >>> 24] | _revTable[idx >>> 16 & 255] << 8 | _revTable[idx >>> 8 & 255] << 16 | _revTable[idx & 255] << 24) >>> 32 - bits2;
}
function log2(V) {
  return ((V & 4294901760) !== 0 ? (V &= 4294901760, 16) : 0) | ((V & 4278255360) !== 0 ? (V &= 4278255360, 8) : 0) | ((V & 4042322160) !== 0 ? (V &= 4042322160, 4) : 0) | ((V & 3435973836) !== 0 ? (V &= 3435973836, 2) : 0) | (V & 2863311530) !== 0;
}
function buffReverseBits(buff, eSize) {
  const n = buff.byteLength / eSize;
  const bits2 = log2(n);
  if (n != 1 << bits2) {
    throw new Error("Invalid number of pointers");
  }
  for (let i = 0; i < n; i++) {
    const r = bitReverse(i, bits2);
    if (i > r) {
      const tmp = buff.slice(i * eSize, (i + 1) * eSize);
      buff.set(buff.slice(r * eSize, (r + 1) * eSize), i * eSize);
      buff.set(tmp, r * eSize);
    }
  }
}
function array2buffer(arr, sG) {
  const buff = new Uint8Array(sG * arr.length);
  for (let i = 0; i < arr.length; i++) {
    buff.set(arr[i], i * sG);
  }
  return buff;
}
function buffer2array(buff, sG) {
  const n = buff.byteLength / sG;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = buff.slice(i * sG, i * sG + sG);
  }
  return arr;
}
var _utils = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  array2buffer,
  beBuff2int,
  beInt2Buff,
  bitReverse,
  buffReverseBits,
  buffer2array,
  leBuff2int,
  leInt2Buff,
  log2,
  stringifyBigInts,
  stringifyFElements,
  unstringifyBigInts,
  unstringifyFElements
});
var PAGE_SIZE = 1 << 30;
var BigBuffer = class _BigBuffer {
  constructor(size) {
    this.buffers = [];
    this.byteLength = size;
    for (let i = 0; i < size; i += PAGE_SIZE) {
      const n = Math.min(size - i, PAGE_SIZE);
      this.buffers.push(new Uint8Array(n));
    }
  }
  slice(fr, to) {
    if (to === void 0) to = this.byteLength;
    if (fr === void 0) fr = 0;
    const len = to - fr;
    const firstPage = Math.floor(fr / PAGE_SIZE);
    const lastPage = Math.floor((fr + len - 1) / PAGE_SIZE);
    if (firstPage == lastPage || len == 0)
      return this.buffers[firstPage].slice(fr % PAGE_SIZE, fr % PAGE_SIZE + len);
    let buff;
    let p = firstPage;
    let o = fr % PAGE_SIZE;
    let r = len;
    while (r > 0) {
      const l = o + r > PAGE_SIZE ? PAGE_SIZE - o : r;
      const srcView = new Uint8Array(this.buffers[p].buffer, this.buffers[p].byteOffset + o, l);
      if (l == len) return srcView.slice();
      if (!buff) {
        if (len <= PAGE_SIZE) {
          buff = new Uint8Array(len);
        } else {
          buff = new _BigBuffer(len);
        }
      }
      buff.set(srcView, len - r);
      r = r - l;
      p++;
      o = 0;
    }
    return buff;
  }
  set(buff, offset) {
    if (offset === void 0) offset = 0;
    const len = buff.byteLength;
    if (len == 0) return;
    const firstPage = Math.floor(offset / PAGE_SIZE);
    const lastPage = Math.floor((offset + len - 1) / PAGE_SIZE);
    if (firstPage == lastPage) {
      if (buff instanceof _BigBuffer && buff.buffers.length == 1) {
        return this.buffers[firstPage].set(buff.buffers[0], offset % PAGE_SIZE);
      } else {
        return this.buffers[firstPage].set(buff, offset % PAGE_SIZE);
      }
    }
    let p = firstPage;
    let o = offset % PAGE_SIZE;
    let r = len;
    while (r > 0) {
      const l = o + r > PAGE_SIZE ? PAGE_SIZE - o : r;
      const srcView = buff.slice(len - r, len - r + l);
      const dstView = new Uint8Array(this.buffers[p].buffer, this.buffers[p].byteOffset + o, l);
      dstView.set(srcView);
      r = r - l;
      p++;
      o = 0;
    }
  }
};
function buildBatchConvert(tm, fnName, sIn, sOut) {
  return async function batchConvert(buffIn) {
    const nPoints = Math.floor(buffIn.byteLength / sIn);
    if (nPoints * sIn !== buffIn.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const pointsPerChunk = Math.floor(nPoints / tm.concurrency);
    const opPromises = [];
    for (let i = 0; i < tm.concurrency; i++) {
      let n;
      if (i < tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const buffChunk = buffIn.slice(i * pointsPerChunk * sIn, i * pointsPerChunk * sIn + n * sIn);
      const task = [
        { cmd: "ALLOCSET", var: 0, buff: buffChunk },
        { cmd: "ALLOC", var: 1, len: sOut * n },
        { cmd: "CALL", fnName, params: [
          { var: 0 },
          { val: n },
          { var: 1 }
        ] },
        { cmd: "GET", out: 0, var: 1, len: sOut * n }
      ];
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    let fullBuffOut;
    if (buffIn instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sOut);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sOut);
    }
    let p = 0;
    for (let i = 0; i < result.length; i++) {
      fullBuffOut.set(result[i][0], p);
      p += result[i][0].byteLength;
    }
    return fullBuffOut;
  };
}
var WasmField1 = class {
  constructor(tm, prefix, n8, p) {
    this.tm = tm;
    this.prefix = prefix;
    this.p = p;
    this.n8 = n8;
    this.type = "F1";
    this.m = 1;
    this.half = shiftRight(p, one);
    this.bitLength = bitLength$6(p);
    this.mask = sub(shiftLeft(one, this.bitLength), one);
    this.pOp1 = tm.alloc(n8);
    this.pOp2 = tm.alloc(n8);
    this.pOp3 = tm.alloc(n8);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = this.tm.getBuff(this.pOp1, this.n8);
    this.tm.instance.exports[prefix + "_one"](this.pOp1);
    this.one = this.tm.getBuff(this.pOp1, this.n8);
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
    this.n64 = Math.floor(n8 / 8);
    this.n32 = Math.floor(n8 / 4);
    if (this.n64 * 8 != this.n8) {
      throw new Error("n8 must be a multiple of 8");
    }
    this.half = shiftRight(this.p, one);
    this.nqr = this.two;
    let r = this.exp(this.nqr, this.half);
    while (!this.eq(r, this.negone)) {
      this.nqr = this.add(this.nqr, this.one);
      r = this.exp(this.nqr, this.half);
    }
    this.shift = this.mul(this.nqr, this.nqr);
    this.shiftInv = this.inv(this.shift);
    this.s = 0;
    let t = sub(this.p, one);
    while (!isOdd$5(t)) {
      this.s = this.s + 1;
      t = shiftRight(t, one);
    }
    this.w = [];
    this.w[this.s] = this.exp(this.nqr, t);
    for (let i = this.s - 1; i >= 0; i--) {
      this.w[i] = this.square(this.w[i + 1]);
    }
    if (!this.eq(this.w[0], this.one)) {
      throw new Error("Error calculating roots of unity");
    }
    this.batchToMontgomery = buildBatchConvert(tm, prefix + "_batchToMontgomery", this.n8, this.n8);
    this.batchFromMontgomery = buildBatchConvert(tm, prefix + "_batchFromMontgomery", this.n8, this.n8);
  }
  op2(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op2Bool(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2);
  }
  op1(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op1Bool(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  add(a, b) {
    return this.op2("_add", a, b);
  }
  eq(a, b) {
    return this.op2Bool("_eq", a, b);
  }
  isZero(a) {
    return this.op1Bool("_isZero", a);
  }
  sub(a, b) {
    return this.op2("_sub", a, b);
  }
  neg(a) {
    return this.op1("_neg", a);
  }
  inv(a) {
    return this.op1("_inverse", a);
  }
  toMontgomery(a) {
    return this.op1("_toMontgomery", a);
  }
  fromMontgomery(a) {
    return this.op1("_fromMontgomery", a);
  }
  mul(a, b) {
    return this.op2("_mul", a, b);
  }
  div(a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_inverse"](this.pOp2, this.pOp2);
    this.tm.instance.exports[this.prefix + "_mul"](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  square(a) {
    return this.op1("_square", a);
  }
  isSquare(a) {
    return this.op1Bool("_isSquare", a);
  }
  sqrt(a) {
    return this.op1("_sqrt", a);
  }
  exp(a, b) {
    if (!(b instanceof Uint8Array)) {
      b = toLEBuff(e(b));
    }
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_exp"](this.pOp1, this.pOp2, b.byteLength, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  isNegative(a) {
    return this.op1Bool("_isNegative", a);
  }
  e(a, b) {
    if (a instanceof Uint8Array) return a;
    let ra = e(a, b);
    if (isNegative$4(ra)) {
      ra = neg(ra);
      if (gt(ra, this.p)) {
        ra = mod(ra, this.p);
      }
      ra = sub(this.p, ra);
    } else {
      if (gt(ra, this.p)) {
        ra = mod(ra, this.p);
      }
    }
    const buff = leInt2Buff(ra, this.n8);
    return this.toMontgomery(buff);
  }
  toString(a, radix) {
    const an = this.fromMontgomery(a);
    const s = fromRprLE(an, 0);
    return toString(s, radix);
  }
  fromRng(rng) {
    let v;
    const buff = new Uint8Array(this.n8);
    do {
      v = zero;
      for (let i = 0; i < this.n64; i++) {
        v = add(v, shiftLeft(rng.nextU64(), 64 * i));
      }
      v = band(v, this.mask);
    } while (geq(v, this.p));
    toRprLE(buff, 0, v, this.n8);
    return buff;
  }
  random() {
    return this.fromRng(getThreadRng());
  }
  toObject(a) {
    const an = this.fromMontgomery(a);
    return fromRprLE(an, 0);
  }
  fromObject(a) {
    const buff = new Uint8Array(this.n8);
    toRprLE(buff, 0, a, this.n8);
    return this.toMontgomery(buff);
  }
  toRprLE(buff, offset, a) {
    buff.set(this.fromMontgomery(a), offset);
  }
  toRprBE(buff, offset, a) {
    const buff2 = this.fromMontgomery(a);
    for (let i = 0; i < this.n8 / 2; i++) {
      const aux = buff2[i];
      buff2[i] = buff2[this.n8 - 1 - i];
      buff2[this.n8 - 1 - i] = aux;
    }
    buff.set(buff2, offset);
  }
  fromRprLE(buff, offset) {
    offset = offset || 0;
    const res = buff.slice(offset, offset + this.n8);
    return this.toMontgomery(res);
  }
  async batchInverse(buffIn) {
    let returnArray = false;
    const sIn = this.n8;
    const sOut = this.n8;
    if (Array.isArray(buffIn)) {
      buffIn = array2buffer(buffIn, sIn);
      returnArray = true;
    } else {
      buffIn = buffIn.slice(0, buffIn.byteLength);
    }
    const nPoints = Math.floor(buffIn.byteLength / sIn);
    if (nPoints * sIn !== buffIn.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const pointsPerChunk = Math.floor(nPoints / this.tm.concurrency);
    const opPromises = [];
    for (let i = 0; i < this.tm.concurrency; i++) {
      let n;
      if (i < this.tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const buffChunk = buffIn.slice(i * pointsPerChunk * sIn, i * pointsPerChunk * sIn + n * sIn);
      const task = [
        { cmd: "ALLOCSET", var: 0, buff: buffChunk },
        { cmd: "ALLOC", var: 1, len: sOut * n },
        { cmd: "CALL", fnName: this.prefix + "_batchInverse", params: [
          { var: 0 },
          { val: sIn },
          { val: n },
          { var: 1 },
          { val: sOut }
        ] },
        { cmd: "GET", out: 0, var: 1, len: sOut * n }
      ];
      opPromises.push(
        this.tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    let fullBuffOut;
    if (buffIn instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sOut);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sOut);
    }
    let p = 0;
    for (let i = 0; i < result.length; i++) {
      fullBuffOut.set(result[i][0], p);
      p += result[i][0].byteLength;
    }
    if (returnArray) {
      return buffer2array(fullBuffOut, sOut);
    } else {
      return fullBuffOut;
    }
  }
};
var WasmField2 = class {
  constructor(tm, prefix, F) {
    this.tm = tm;
    this.prefix = prefix;
    this.F = F;
    this.type = "F2";
    this.m = F.m * 2;
    this.n8 = this.F.n8 * 2;
    this.n32 = this.F.n32 * 2;
    this.n64 = this.F.n64 * 2;
    this.pOp1 = tm.alloc(F.n8 * 2);
    this.pOp2 = tm.alloc(F.n8 * 2);
    this.pOp3 = tm.alloc(F.n8 * 2);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = tm.getBuff(this.pOp1, this.n8);
    this.tm.instance.exports[prefix + "_one"](this.pOp1);
    this.one = tm.getBuff(this.pOp1, this.n8);
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
  }
  op2(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op2Bool(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2);
  }
  op1(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op1Bool(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  add(a, b) {
    return this.op2("_add", a, b);
  }
  eq(a, b) {
    return this.op2Bool("_eq", a, b);
  }
  isZero(a) {
    return this.op1Bool("_isZero", a);
  }
  sub(a, b) {
    return this.op2("_sub", a, b);
  }
  neg(a) {
    return this.op1("_neg", a);
  }
  inv(a) {
    return this.op1("_inverse", a);
  }
  isNegative(a) {
    return this.op1Bool("_isNegative", a);
  }
  toMontgomery(a) {
    return this.op1("_toMontgomery", a);
  }
  fromMontgomery(a) {
    return this.op1("_fromMontgomery", a);
  }
  mul(a, b) {
    return this.op2("_mul", a, b);
  }
  mul1(a, b) {
    return this.op2("_mul1", a, b);
  }
  div(a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_inverse"](this.pOp2, this.pOp2);
    this.tm.instance.exports[this.prefix + "_mul"](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  square(a) {
    return this.op1("_square", a);
  }
  isSquare(a) {
    return this.op1Bool("_isSquare", a);
  }
  sqrt(a) {
    return this.op1("_sqrt", a);
  }
  exp(a, b) {
    if (!(b instanceof Uint8Array)) {
      b = toLEBuff(e(b));
    }
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_exp"](this.pOp1, this.pOp2, b.byteLength, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  e(a, b) {
    if (a instanceof Uint8Array) return a;
    if (Array.isArray(a) && a.length == 2) {
      const c1 = this.F.e(a[0], b);
      const c2 = this.F.e(a[1], b);
      const res = new Uint8Array(this.F.n8 * 2);
      res.set(c1);
      res.set(c2, this.F.n8 * 2);
      return res;
    } else {
      throw new Error("invalid F2");
    }
  }
  toString(a, radix) {
    const s1 = this.F.toString(a.slice(0, this.F.n8), radix);
    const s2 = this.F.toString(a.slice(this.F.n8), radix);
    return `[${s1}, ${s2}]`;
  }
  fromRng(rng) {
    const c1 = this.F.fromRng(rng);
    const c2 = this.F.fromRng(rng);
    const res = new Uint8Array(this.F.n8 * 2);
    res.set(c1);
    res.set(c2, this.F.n8);
    return res;
  }
  random() {
    return this.fromRng(getThreadRng());
  }
  toObject(a) {
    const c1 = this.F.toObject(a.slice(0, this.F.n8));
    const c2 = this.F.toObject(a.slice(this.F.n8, this.F.n8 * 2));
    return [c1, c2];
  }
  fromObject(a) {
    const buff = new Uint8Array(this.F.n8 * 2);
    const b1 = this.F.fromObject(a[0]);
    const b2 = this.F.fromObject(a[1]);
    buff.set(b1);
    buff.set(b2, this.F.n8);
    return buff;
  }
  c1(a) {
    return a.slice(0, this.F.n8);
  }
  c2(a) {
    return a.slice(this.F.n8);
  }
};
var WasmField3 = class {
  constructor(tm, prefix, F) {
    this.tm = tm;
    this.prefix = prefix;
    this.F = F;
    this.type = "F3";
    this.m = F.m * 3;
    this.n8 = this.F.n8 * 3;
    this.n32 = this.F.n32 * 3;
    this.n64 = this.F.n64 * 3;
    this.pOp1 = tm.alloc(F.n8 * 3);
    this.pOp2 = tm.alloc(F.n8 * 3);
    this.pOp3 = tm.alloc(F.n8 * 3);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = tm.getBuff(this.pOp1, this.n8);
    this.tm.instance.exports[prefix + "_one"](this.pOp1);
    this.one = tm.getBuff(this.pOp1, this.n8);
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
  }
  op2(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op2Bool(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2);
  }
  op1(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op1Bool(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  eq(a, b) {
    return this.op2Bool("_eq", a, b);
  }
  isZero(a) {
    return this.op1Bool("_isZero", a);
  }
  add(a, b) {
    return this.op2("_add", a, b);
  }
  sub(a, b) {
    return this.op2("_sub", a, b);
  }
  neg(a) {
    return this.op1("_neg", a);
  }
  inv(a) {
    return this.op1("_inverse", a);
  }
  isNegative(a) {
    return this.op1Bool("_isNegative", a);
  }
  toMontgomery(a) {
    return this.op1("_toMontgomery", a);
  }
  fromMontgomery(a) {
    return this.op1("_fromMontgomery", a);
  }
  mul(a, b) {
    return this.op2("_mul", a, b);
  }
  div(a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_inverse"](this.pOp2, this.pOp2);
    this.tm.instance.exports[this.prefix + "_mul"](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  square(a) {
    return this.op1("_square", a);
  }
  isSquare(a) {
    return this.op1Bool("_isSquare", a);
  }
  sqrt(a) {
    return this.op1("_sqrt", a);
  }
  exp(a, b) {
    if (!(b instanceof Uint8Array)) {
      b = toLEBuff(e(b));
    }
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_exp"](this.pOp1, this.pOp2, b.byteLength, this.pOp3);
    return this.getBuff(this.pOp3, this.n8);
  }
  e(a, b) {
    if (a instanceof Uint8Array) return a;
    if (Array.isArray(a) && a.length == 3) {
      const c1 = this.F.e(a[0], b);
      const c2 = this.F.e(a[1], b);
      const c3 = this.F.e(a[2], b);
      const res = new Uint8Array(this.F.n8 * 3);
      res.set(c1);
      res.set(c2, this.F.n8);
      res.set(c3, this.F.n8 * 2);
      return res;
    } else {
      throw new Error("invalid F3");
    }
  }
  toString(a, radix) {
    const s1 = this.F.toString(a.slice(0, this.F.n8), radix);
    const s2 = this.F.toString(a.slice(this.F.n8, this.F.n8 * 2), radix);
    const s3 = this.F.toString(a.slice(this.F.n8 * 2), radix);
    return `[${s1}, ${s2}, ${s3}]`;
  }
  fromRng(rng) {
    const c1 = this.F.fromRng(rng);
    const c2 = this.F.fromRng(rng);
    const c3 = this.F.fromRng(rng);
    const res = new Uint8Array(this.F.n8 * 3);
    res.set(c1);
    res.set(c2, this.F.n8);
    res.set(c3, this.F.n8 * 2);
    return res;
  }
  random() {
    return this.fromRng(getThreadRng());
  }
  toObject(a) {
    const c1 = this.F.toObject(a.slice(0, this.F.n8));
    const c2 = this.F.toObject(a.slice(this.F.n8, this.F.n8 * 2));
    const c3 = this.F.toObject(a.slice(this.F.n8 * 2, this.F.n8 * 3));
    return [c1, c2, c3];
  }
  fromObject(a) {
    const buff = new Uint8Array(this.F.n8 * 3);
    const b1 = this.F.fromObject(a[0]);
    const b2 = this.F.fromObject(a[1]);
    const b3 = this.F.fromObject(a[2]);
    buff.set(b1);
    buff.set(b2, this.F.n8);
    buff.set(b3, this.F.n8 * 2);
    return buff;
  }
  c1(a) {
    return a.slice(0, this.F.n8);
  }
  c2(a) {
    return a.slice(this.F.n8, this.F.n8 * 2);
  }
  c3(a) {
    return a.slice(this.F.n8 * 2);
  }
};
var WasmCurve = class {
  constructor(tm, prefix, F, pGen, pGb, cofactor) {
    this.tm = tm;
    this.prefix = prefix;
    this.F = F;
    this.pOp1 = tm.alloc(F.n8 * 3);
    this.pOp2 = tm.alloc(F.n8 * 3);
    this.pOp3 = tm.alloc(F.n8 * 3);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = this.tm.getBuff(this.pOp1, F.n8 * 3);
    this.tm.instance.exports[prefix + "_zeroAffine"](this.pOp1);
    this.zeroAffine = this.tm.getBuff(this.pOp1, F.n8 * 2);
    this.one = this.tm.getBuff(pGen, F.n8 * 3);
    this.g = this.one;
    this.oneAffine = this.tm.getBuff(pGen, F.n8 * 2);
    this.gAffine = this.oneAffine;
    this.b = this.tm.getBuff(pGb, F.n8);
    if (cofactor) {
      this.cofactor = toLEBuff(cofactor);
    }
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
    this.batchLEMtoC = buildBatchConvert(tm, prefix + "_batchLEMtoC", F.n8 * 2, F.n8);
    this.batchLEMtoU = buildBatchConvert(tm, prefix + "_batchLEMtoU", F.n8 * 2, F.n8 * 2);
    this.batchCtoLEM = buildBatchConvert(tm, prefix + "_batchCtoLEM", F.n8, F.n8 * 2);
    this.batchUtoLEM = buildBatchConvert(tm, prefix + "_batchUtoLEM", F.n8 * 2, F.n8 * 2);
    this.batchToJacobian = buildBatchConvert(tm, prefix + "_batchToJacobian", F.n8 * 2, F.n8 * 3);
    this.batchToAffine = buildBatchConvert(tm, prefix + "_batchToAffine", F.n8 * 3, F.n8 * 2);
  }
  op2(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  op2bool(opName, a, b) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
  }
  op1(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  op1Affine(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 2);
  }
  op1Bool(opName, a) {
    this.tm.setBuff(this.pOp1, a);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  add(a, b) {
    if (a.byteLength == this.F.n8 * 3) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_add", a, b);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_addMixed", a, b);
      } else {
        throw new Error("invalid point size");
      }
    } else if (a.byteLength == this.F.n8 * 2) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_addMixed", b, a);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_addAffine", a, b);
      } else {
        throw new Error("invalid point size");
      }
    } else {
      throw new Error("invalid point size");
    }
  }
  sub(a, b) {
    if (a.byteLength == this.F.n8 * 3) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_sub", a, b);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_subMixed", a, b);
      } else {
        throw new Error("invalid point size");
      }
    } else if (a.byteLength == this.F.n8 * 2) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_subMixed", b, a);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_subAffine", a, b);
      } else {
        throw new Error("invalid point size");
      }
    } else {
      throw new Error("invalid point size");
    }
  }
  neg(a) {
    if (a.byteLength == this.F.n8 * 3) {
      return this.op1("_neg", a);
    } else if (a.byteLength == this.F.n8 * 2) {
      return this.op1Affine("_negAffine", a);
    } else {
      throw new Error("invalid point size");
    }
  }
  double(a) {
    if (a.byteLength == this.F.n8 * 3) {
      return this.op1("_double", a);
    } else if (a.byteLength == this.F.n8 * 2) {
      return this.op1("_doubleAffine", a);
    } else {
      throw new Error("invalid point size");
    }
  }
  isZero(a) {
    if (a.byteLength == this.F.n8 * 3) {
      return this.op1Bool("_isZero", a);
    } else if (a.byteLength == this.F.n8 * 2) {
      return this.op1Bool("_isZeroAffine", a);
    } else {
      throw new Error("invalid point size");
    }
  }
  timesScalar(a, s) {
    if (!(s instanceof Uint8Array)) {
      s = toLEBuff(e(s));
    }
    let fnName;
    if (a.byteLength == this.F.n8 * 3) {
      fnName = this.prefix + "_timesScalar";
    } else if (a.byteLength == this.F.n8 * 2) {
      fnName = this.prefix + "_timesScalarAffine";
    } else {
      throw new Error("invalid point size");
    }
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, s);
    this.tm.instance.exports[fnName](this.pOp1, this.pOp2, s.byteLength, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  timesFr(a, s) {
    let fnName;
    if (a.byteLength == this.F.n8 * 3) {
      fnName = this.prefix + "_timesFr";
    } else if (a.byteLength == this.F.n8 * 2) {
      fnName = this.prefix + "_timesFrAffine";
    } else {
      throw new Error("invalid point size");
    }
    this.tm.setBuff(this.pOp1, a);
    this.tm.setBuff(this.pOp2, s);
    this.tm.instance.exports[fnName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  eq(a, b) {
    if (a.byteLength == this.F.n8 * 3) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2bool("_eq", a, b);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2bool("_eqMixed", a, b);
      } else {
        throw new Error("invalid point size");
      }
    } else if (a.byteLength == this.F.n8 * 2) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2bool("_eqMixed", b, a);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2bool("_eqAffine", a, b);
      } else {
        throw new Error("invalid point size");
      }
    } else {
      throw new Error("invalid point size");
    }
  }
  toAffine(a) {
    if (a.byteLength == this.F.n8 * 3) {
      return this.op1Affine("_toAffine", a);
    } else if (a.byteLength == this.F.n8 * 2) {
      return a;
    } else {
      throw new Error("invalid point size");
    }
  }
  toJacobian(a) {
    if (a.byteLength == this.F.n8 * 3) {
      return a;
    } else if (a.byteLength == this.F.n8 * 2) {
      return this.op1("_toJacobian", a);
    } else {
      throw new Error("invalid point size");
    }
  }
  toRprUncompressed(arr, offset, a) {
    this.tm.setBuff(this.pOp1, a);
    if (a.byteLength == this.F.n8 * 3) {
      this.tm.instance.exports[this.prefix + "_toAffine"](this.pOp1, this.pOp1);
    } else if (a.byteLength != this.F.n8 * 2) {
      throw new Error("invalid point size");
    }
    this.tm.instance.exports[this.prefix + "_LEMtoU"](this.pOp1, this.pOp1);
    const res = this.tm.getBuff(this.pOp1, this.F.n8 * 2);
    arr.set(res, offset);
  }
  fromRprUncompressed(arr, offset) {
    const buff = arr.slice(offset, offset + this.F.n8 * 2);
    this.tm.setBuff(this.pOp1, buff);
    this.tm.instance.exports[this.prefix + "_UtoLEM"](this.pOp1, this.pOp1);
    return this.tm.getBuff(this.pOp1, this.F.n8 * 2);
  }
  toRprCompressed(arr, offset, a) {
    this.tm.setBuff(this.pOp1, a);
    if (a.byteLength == this.F.n8 * 3) {
      this.tm.instance.exports[this.prefix + "_toAffine"](this.pOp1, this.pOp1);
    } else if (a.byteLength != this.F.n8 * 2) {
      throw new Error("invalid point size");
    }
    this.tm.instance.exports[this.prefix + "_LEMtoC"](this.pOp1, this.pOp1);
    const res = this.tm.getBuff(this.pOp1, this.F.n8);
    arr.set(res, offset);
  }
  fromRprCompressed(arr, offset) {
    const buff = arr.slice(offset, offset + this.F.n8);
    this.tm.setBuff(this.pOp1, buff);
    this.tm.instance.exports[this.prefix + "_CtoLEM"](this.pOp1, this.pOp2);
    return this.tm.getBuff(this.pOp2, this.F.n8 * 2);
  }
  toUncompressed(a) {
    const buff = new Uint8Array(this.F.n8 * 2);
    this.toRprUncompressed(buff, 0, a);
    return buff;
  }
  toRprLEM(arr, offset, a) {
    if (a.byteLength == this.F.n8 * 2) {
      arr.set(a, offset);
      return;
    } else if (a.byteLength == this.F.n8 * 3) {
      this.tm.setBuff(this.pOp1, a);
      this.tm.instance.exports[this.prefix + "_toAffine"](this.pOp1, this.pOp1);
      const res = this.tm.getBuff(this.pOp1, this.F.n8 * 2);
      arr.set(res, offset);
    } else {
      throw new Error("invalid point size");
    }
  }
  fromRprLEM(arr, offset) {
    offset = offset || 0;
    return arr.slice(offset, offset + this.F.n8 * 2);
  }
  toString(a, radix) {
    if (a.byteLength == this.F.n8 * 3) {
      const x = this.F.toString(a.slice(0, this.F.n8), radix);
      const y = this.F.toString(a.slice(this.F.n8, this.F.n8 * 2), radix);
      const z = this.F.toString(a.slice(this.F.n8 * 2), radix);
      return `[ ${x}, ${y}, ${z} ]`;
    } else if (a.byteLength == this.F.n8 * 2) {
      const x = this.F.toString(a.slice(0, this.F.n8), radix);
      const y = this.F.toString(a.slice(this.F.n8), radix);
      return `[ ${x}, ${y} ]`;
    } else {
      throw new Error("invalid point size");
    }
  }
  isValid(a) {
    if (this.isZero(a)) return true;
    const F = this.F;
    const aa = this.toAffine(a);
    const x = aa.slice(0, this.F.n8);
    const y = aa.slice(this.F.n8, this.F.n8 * 2);
    const x3b = F.add(F.mul(F.square(x), x), this.b);
    const y2 = F.square(y);
    return F.eq(x3b, y2);
  }
  fromRng(rng) {
    const F = this.F;
    let P = [];
    let greatest;
    let x3b;
    do {
      P[0] = F.fromRng(rng);
      greatest = rng.nextBool();
      x3b = F.add(F.mul(F.square(P[0]), P[0]), this.b);
    } while (!F.isSquare(x3b));
    P[1] = F.sqrt(x3b);
    const s = F.isNegative(P[1]);
    if (greatest ^ s) P[1] = F.neg(P[1]);
    let Pbuff = new Uint8Array(this.F.n8 * 2);
    Pbuff.set(P[0]);
    Pbuff.set(P[1], this.F.n8);
    if (this.cofactor) {
      Pbuff = this.timesScalar(Pbuff, this.cofactor);
    }
    return Pbuff;
  }
  toObject(a) {
    if (this.isZero(a)) {
      return [
        this.F.toObject(this.F.zero),
        this.F.toObject(this.F.one),
        this.F.toObject(this.F.zero)
      ];
    }
    const x = this.F.toObject(a.slice(0, this.F.n8));
    const y = this.F.toObject(a.slice(this.F.n8, this.F.n8 * 2));
    let z;
    if (a.byteLength == this.F.n8 * 3) {
      z = this.F.toObject(a.slice(this.F.n8 * 2, this.F.n8 * 3));
    } else {
      z = this.F.toObject(this.F.one);
    }
    return [x, y, z];
  }
  fromObject(a) {
    const x = this.F.fromObject(a[0]);
    const y = this.F.fromObject(a[1]);
    let z;
    if (a.length == 3) {
      z = this.F.fromObject(a[2]);
    } else {
      z = this.F.one;
    }
    if (this.F.isZero(z, this.F.one)) {
      return this.zeroAffine;
    } else if (this.F.eq(z, this.F.one)) {
      const buff = new Uint8Array(this.F.n8 * 2);
      buff.set(x);
      buff.set(y, this.F.n8);
      return buff;
    } else {
      const buff = new Uint8Array(this.F.n8 * 3);
      buff.set(x);
      buff.set(y, this.F.n8);
      buff.set(z, this.F.n8 * 2);
      return buff;
    }
  }
  e(a) {
    if (a instanceof Uint8Array) return a;
    return this.fromObject(a);
  }
  x(a) {
    const tmp = this.toAffine(a);
    return tmp.slice(0, this.F.n8);
  }
  y(a) {
    const tmp = this.toAffine(a);
    return tmp.slice(this.F.n8);
  }
};
function thread(self2) {
  const MAXMEM = 32767;
  let instance;
  let memory;
  if (self2) {
    self2.onmessage = function(e2) {
      let data;
      if (e2.data) {
        data = e2.data;
      } else {
        data = e2;
      }
      if (data[0].cmd == "INIT") {
        init(data[0]).then(function() {
          self2.postMessage(data.result);
        });
      } else if (data[0].cmd == "TERMINATE") {
        self2.close();
      } else {
        const res = runTask(data);
        self2.postMessage(res);
      }
    };
  }
  async function init(data) {
    const code = new Uint8Array(data.code);
    const wasmModule = await WebAssembly.compile(code);
    memory = new WebAssembly.Memory({ initial: data.init, maximum: MAXMEM });
    instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        "memory": memory
      }
    });
  }
  function alloc(length) {
    const u323 = new Uint32Array(memory.buffer, 0, 1);
    while (u323[0] & 3) u323[0]++;
    const res = u323[0];
    u323[0] += length;
    if (u323[0] + length > memory.buffer.byteLength) {
      const currentPages = memory.buffer.byteLength / 65536;
      let requiredPages = Math.floor((u323[0] + length) / 65536) + 1;
      if (requiredPages > MAXMEM) requiredPages = MAXMEM;
      memory.grow(requiredPages - currentPages);
    }
    return res;
  }
  function allocBuffer(buffer) {
    const p = alloc(buffer.byteLength);
    setBuffer(p, buffer);
    return p;
  }
  function getBuffer(pointer, length) {
    const u8 = new Uint8Array(memory.buffer);
    return new Uint8Array(u8.buffer, u8.byteOffset + pointer, length);
  }
  function setBuffer(pointer, buffer) {
    const u8 = new Uint8Array(memory.buffer);
    u8.set(new Uint8Array(buffer), pointer);
  }
  function runTask(task) {
    if (task[0].cmd == "INIT") {
      return init(task[0]);
    }
    const ctx = {
      vars: [],
      out: []
    };
    const u32a = new Uint32Array(memory.buffer, 0, 1);
    const oldAlloc = u32a[0];
    for (let i = 0; i < task.length; i++) {
      switch (task[i].cmd) {
        case "ALLOCSET":
          ctx.vars[task[i].var] = allocBuffer(task[i].buff);
          break;
        case "ALLOC":
          ctx.vars[task[i].var] = alloc(task[i].len);
          break;
        case "SET":
          setBuffer(ctx.vars[task[i].var], task[i].buff);
          break;
        case "CALL": {
          const params = [];
          for (let j = 0; j < task[i].params.length; j++) {
            const p = task[i].params[j];
            if (typeof p.var !== "undefined") {
              params.push(ctx.vars[p.var] + (p.offset || 0));
            } else if (typeof p.val != "undefined") {
              params.push(p.val);
            }
          }
          instance.exports[task[i].fnName](...params);
          break;
        }
        case "GET":
          ctx.out[task[i].out] = getBuffer(ctx.vars[task[i].var], task[i].len).slice();
          break;
        default:
          throw new Error("Invalid cmd");
      }
    }
    const u32b = new Uint32Array(memory.buffer, 0, 1);
    u32b[0] = oldAlloc;
    return ctx.out;
  }
  return runTask;
}
var MEM_SIZE = 25;
var Deferred = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var workerSource;
var threadStr = `(${'function thread(self) {\n    const MAXMEM = 32767;\n    let instance;\n    let memory;\n\n    if (self) {\n        self.onmessage = function(e) {\n            let data;\n            if (e.data) {\n                data = e.data;\n            } else {\n                data = e;\n            }\n\n            if (data[0].cmd == "INIT") {\n                init(data[0]).then(function() {\n                    self.postMessage(data.result);\n                });\n            } else if (data[0].cmd == "TERMINATE") {\n                self.close();\n            } else {\n                const res = runTask(data);\n                self.postMessage(res);\n            }\n        };\n    }\n\n    async function init(data) {\n        const code = new Uint8Array(data.code);\n        const wasmModule = await WebAssembly.compile(code);\n        memory = new WebAssembly.Memory({initial:data.init, maximum: MAXMEM});\n\n        instance = await WebAssembly.instantiate(wasmModule, {\n            env: {\n                "memory": memory\n            }\n        });\n    }\n\n\n\n    function alloc(length) {\n        const u32 = new Uint32Array(memory.buffer, 0, 1);\n        while (u32[0] & 3) u32[0]++;  // Return always aligned pointers\n        const res = u32[0];\n        u32[0] += length;\n        if (u32[0] + length > memory.buffer.byteLength) {\n            const currentPages = memory.buffer.byteLength / 0x10000;\n            let requiredPages = Math.floor((u32[0] + length) / 0x10000)+1;\n            if (requiredPages>MAXMEM) requiredPages=MAXMEM;\n            memory.grow(requiredPages-currentPages);\n        }\n        return res;\n    }\n\n    function allocBuffer(buffer) {\n        const p = alloc(buffer.byteLength);\n        setBuffer(p, buffer);\n        return p;\n    }\n\n    function getBuffer(pointer, length) {\n        const u8 = new Uint8Array(memory.buffer);\n        return new Uint8Array(u8.buffer, u8.byteOffset + pointer, length);\n    }\n\n    function setBuffer(pointer, buffer) {\n        const u8 = new Uint8Array(memory.buffer);\n        u8.set(new Uint8Array(buffer), pointer);\n    }\n\n    function runTask(task) {\n        if (task[0].cmd == "INIT") {\n            return init(task[0]);\n        }\n        const ctx = {\n            vars: [],\n            out: []\n        };\n        const u32a = new Uint32Array(memory.buffer, 0, 1);\n        const oldAlloc = u32a[0];\n        for (let i=0; i<task.length; i++) {\n            switch (task[i].cmd) {\n            case "ALLOCSET":\n                ctx.vars[task[i].var] = allocBuffer(task[i].buff);\n                break;\n            case "ALLOC":\n                ctx.vars[task[i].var] = alloc(task[i].len);\n                break;\n            case "SET":\n                setBuffer(ctx.vars[task[i].var], task[i].buff);\n                break;\n            case "CALL": {\n                const params = [];\n                for (let j=0; j<task[i].params.length; j++) {\n                    const p = task[i].params[j];\n                    if (typeof p.var !== "undefined") {\n                        params.push(ctx.vars[p.var] + (p.offset || 0));\n                    } else if (typeof p.val != "undefined") {\n                        params.push(p.val);\n                    }\n                }\n                instance.exports[task[i].fnName](...params);\n                break;\n            }\n            case "GET":\n                ctx.out[task[i].out] = getBuffer(ctx.vars[task[i].var], task[i].len).slice();\n                break;\n            default:\n                throw new Error("Invalid cmd");\n            }\n        }\n        const u32b = new Uint32Array(memory.buffer, 0, 1);\n        u32b[0] = oldAlloc;\n        return ctx.out;\n    }\n\n\n    return runTask;\n}'})(self)`;
{
  if (globalThis?.Blob) {
    const threadBytes = new TextEncoder().encode(threadStr);
    const workerBlob = new Blob([threadBytes], { type: "application/javascript" });
    workerSource = URL.createObjectURL(workerBlob);
  } else {
    workerSource = "data:application/javascript;base64," + globalThis.btoa(threadStr);
  }
}
async function buildThreadManager(wasm2, singleThread) {
  const tm = new ThreadManager();
  tm.memory = new WebAssembly.Memory({ initial: MEM_SIZE });
  tm.u8 = new Uint8Array(tm.memory.buffer);
  tm.u32 = new Uint32Array(tm.memory.buffer);
  const wasmModule = await WebAssembly.compile(wasm2.code);
  tm.instance = await WebAssembly.instantiate(wasmModule, {
    env: {
      "memory": tm.memory
    }
  });
  if (!globalThis?.Worker) {
    singleThread = true;
  }
  tm.singleThread = singleThread;
  tm.initalPFree = tm.u32[0];
  tm.pq = wasm2.pq;
  tm.pr = wasm2.pr;
  tm.pG1gen = wasm2.pG1gen;
  tm.pG1zero = wasm2.pG1zero;
  tm.pG2gen = wasm2.pG2gen;
  tm.pG2zero = wasm2.pG2zero;
  tm.pOneT = wasm2.pOneT;
  if (singleThread) {
    tm.code = wasm2.code;
    tm.taskManager = thread();
    await tm.taskManager([{
      cmd: "INIT",
      init: MEM_SIZE,
      code: tm.code.slice()
    }]);
    tm.concurrency = 1;
  } else {
    tm.workers = [];
    tm.pendingDeferreds = [];
    tm.working = [];
    let concurrency = 2;
    {
      if (typeof navigator === "object" && navigator.hardwareConcurrency) {
        concurrency = navigator.hardwareConcurrency;
      }
    }
    if (concurrency == 0) {
      concurrency = 2;
    }
    if (concurrency > 64) concurrency = 64;
    tm.concurrency = concurrency;
    for (let i = 0; i < concurrency; i++) {
      tm.workers[i] = new Worker(workerSource);
      tm.workers[i].addEventListener("message", getOnMsg(i));
      tm.working[i] = false;
    }
    const initPromises = [];
    for (let i = 0; i < tm.workers.length; i++) {
      const copyCode = wasm2.code.slice();
      initPromises.push(tm.postAction(i, [{
        cmd: "INIT",
        init: MEM_SIZE,
        code: copyCode
      }], [copyCode.buffer]));
    }
    await Promise.all(initPromises);
  }
  return tm;
  function getOnMsg(i) {
    return function(e2) {
      let data;
      if (e2 && e2.data) {
        data = e2.data;
      } else {
        data = e2;
      }
      tm.working[i] = false;
      tm.pendingDeferreds[i].resolve(data);
      tm.processWorks();
    };
  }
}
var ThreadManager = class {
  constructor() {
    this.actionQueue = [];
    this.oldPFree = 0;
  }
  startSyncOp() {
    if (this.oldPFree != 0) throw new Error("Sync operation in progress");
    this.oldPFree = this.u32[0];
  }
  endSyncOp() {
    if (this.oldPFree == 0) throw new Error("No sync operation in progress");
    this.u32[0] = this.oldPFree;
    this.oldPFree = 0;
  }
  postAction(workerId, e2, transfers, _deferred) {
    if (this.working[workerId]) {
      throw new Error("Posting a job t a working worker");
    }
    this.working[workerId] = true;
    this.pendingDeferreds[workerId] = _deferred ? _deferred : new Deferred();
    this.workers[workerId].postMessage(e2, transfers);
    return this.pendingDeferreds[workerId].promise;
  }
  processWorks() {
    for (let i = 0; i < this.workers.length && this.actionQueue.length > 0; i++) {
      if (this.working[i] == false) {
        const work = this.actionQueue.shift();
        this.postAction(i, work.data, work.transfers, work.deferred);
      }
    }
  }
  queueAction(actionData, transfers) {
    const d = new Deferred();
    if (this.singleThread) {
      const res = this.taskManager(actionData);
      d.resolve(res);
    } else {
      this.actionQueue.push({
        data: actionData,
        transfers,
        deferred: d
      });
      this.processWorks();
    }
    return d.promise;
  }
  resetMemory() {
    this.u32[0] = this.initalPFree;
  }
  allocBuff(buff) {
    const pointer = this.alloc(buff.byteLength);
    this.setBuff(pointer, buff);
    return pointer;
  }
  getBuff(pointer, length) {
    return this.u8.slice(pointer, pointer + length);
  }
  setBuff(pointer, buffer) {
    this.u8.set(new Uint8Array(buffer), pointer);
  }
  alloc(length) {
    while (this.u32[0] & 3) this.u32[0]++;
    const res = this.u32[0];
    this.u32[0] += length;
    return res;
  }
  async terminate() {
    for (let i = 0; i < this.workers.length; i++) {
      this.workers[i].postMessage([{ cmd: "TERMINATE" }]);
    }
    await sleep(200);
  }
};
function buildBatchApplyKey(curve3, groupName) {
  const G = curve3[groupName];
  const Fr = curve3.Fr;
  const tm = curve3.tm;
  curve3[groupName].batchApplyKey = async function(buff, first, inc, inType, outType) {
    inType = inType || "affine";
    outType = outType || "affine";
    let fnName, fnAffine;
    let sGin, sGmid, sGout;
    if (groupName == "G1") {
      if (inType == "jacobian") {
        sGin = G.F.n8 * 3;
        fnName = "g1m_batchApplyKey";
      } else {
        sGin = G.F.n8 * 2;
        fnName = "g1m_batchApplyKeyMixed";
      }
      sGmid = G.F.n8 * 3;
      if (outType == "jacobian") {
        sGout = G.F.n8 * 3;
      } else {
        fnAffine = "g1m_batchToAffine";
        sGout = G.F.n8 * 2;
      }
    } else if (groupName == "G2") {
      if (inType == "jacobian") {
        sGin = G.F.n8 * 3;
        fnName = "g2m_batchApplyKey";
      } else {
        sGin = G.F.n8 * 2;
        fnName = "g2m_batchApplyKeyMixed";
      }
      sGmid = G.F.n8 * 3;
      if (outType == "jacobian") {
        sGout = G.F.n8 * 3;
      } else {
        fnAffine = "g2m_batchToAffine";
        sGout = G.F.n8 * 2;
      }
    } else if (groupName == "Fr") {
      fnName = "frm_batchApplyKey";
      sGin = G.n8;
      sGmid = G.n8;
      sGout = G.n8;
    } else {
      throw new Error("Invalid group: " + groupName);
    }
    const nPoints = Math.floor(buff.byteLength / sGin);
    const pointsPerChunk = Math.floor(nPoints / tm.concurrency);
    const opPromises = [];
    inc = Fr.e(inc);
    let t = Fr.e(first);
    for (let i = 0; i < tm.concurrency; i++) {
      let n;
      if (i < tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const task = [];
      task.push({
        cmd: "ALLOCSET",
        var: 0,
        buff: buff.slice(i * pointsPerChunk * sGin, i * pointsPerChunk * sGin + n * sGin)
      });
      task.push({ cmd: "ALLOCSET", var: 1, buff: t });
      task.push({ cmd: "ALLOCSET", var: 2, buff: inc });
      task.push({ cmd: "ALLOC", var: 3, len: n * Math.max(sGmid, sGout) });
      task.push({
        cmd: "CALL",
        fnName,
        params: [
          { var: 0 },
          { val: n },
          { var: 1 },
          { var: 2 },
          { var: 3 }
        ]
      });
      if (fnAffine) {
        task.push({
          cmd: "CALL",
          fnName: fnAffine,
          params: [
            { var: 3 },
            { val: n },
            { var: 3 }
          ]
        });
      }
      task.push({ cmd: "GET", out: 0, var: 3, len: n * sGout });
      opPromises.push(tm.queueAction(task));
      t = Fr.mul(t, Fr.exp(inc, n));
    }
    const result = await Promise.all(opPromises);
    let outBuff;
    if (buff instanceof BigBuffer) {
      outBuff = new BigBuffer(nPoints * sGout);
    } else {
      outBuff = new Uint8Array(nPoints * sGout);
    }
    let p = 0;
    for (let i = 0; i < result.length; i++) {
      outBuff.set(result[i][0], p);
      p += result[i][0].byteLength;
    }
    return outBuff;
  };
}
function buildPairing(curve3) {
  const tm = curve3.tm;
  curve3.pairing = function pairing(a, b) {
    tm.startSyncOp();
    const pA = tm.allocBuff(curve3.G1.toJacobian(a));
    const pB = tm.allocBuff(curve3.G2.toJacobian(b));
    const pRes = tm.alloc(curve3.Gt.n8);
    tm.instance.exports[curve3.name + "_pairing"](pA, pB, pRes);
    const res = tm.getBuff(pRes, curve3.Gt.n8);
    tm.endSyncOp();
    return res;
  };
  curve3.pairingEq = async function pairingEq() {
    let buffCt;
    let nEqs;
    if (arguments.length % 2 == 1) {
      buffCt = arguments[arguments.length - 1];
      nEqs = (arguments.length - 1) / 2;
    } else {
      buffCt = curve3.Gt.one;
      nEqs = arguments.length / 2;
    }
    const opPromises = [];
    for (let i = 0; i < nEqs; i++) {
      const task = [];
      const g1Buff = curve3.G1.toJacobian(arguments[i * 2]);
      task.push({ cmd: "ALLOCSET", var: 0, buff: g1Buff });
      task.push({ cmd: "ALLOC", var: 1, len: curve3.prePSize });
      const g2Buff = curve3.G2.toJacobian(arguments[i * 2 + 1]);
      task.push({ cmd: "ALLOCSET", var: 2, buff: g2Buff });
      task.push({ cmd: "ALLOC", var: 3, len: curve3.preQSize });
      task.push({ cmd: "ALLOC", var: 4, len: curve3.Gt.n8 });
      task.push({ cmd: "CALL", fnName: curve3.name + "_prepareG1", params: [
        { var: 0 },
        { var: 1 }
      ] });
      task.push({ cmd: "CALL", fnName: curve3.name + "_prepareG2", params: [
        { var: 2 },
        { var: 3 }
      ] });
      task.push({ cmd: "CALL", fnName: curve3.name + "_millerLoop", params: [
        { var: 1 },
        { var: 3 },
        { var: 4 }
      ] });
      task.push({ cmd: "GET", out: 0, var: 4, len: curve3.Gt.n8 });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    tm.startSyncOp();
    const pRes = tm.alloc(curve3.Gt.n8);
    tm.instance.exports.ftm_one(pRes);
    for (let i = 0; i < result.length; i++) {
      const pMR = tm.allocBuff(result[i][0]);
      tm.instance.exports.ftm_mul(pRes, pMR, pRes);
    }
    tm.instance.exports[curve3.name + "_finalExponentiation"](pRes, pRes);
    const pCt = tm.allocBuff(buffCt);
    const r = !!tm.instance.exports.ftm_eq(pRes, pCt);
    tm.endSyncOp();
    return r;
  };
  curve3.prepareG1 = function(p) {
    this.tm.startSyncOp();
    const pP = this.tm.allocBuff(p);
    const pPrepP = this.tm.alloc(this.prePSize);
    this.tm.instance.exports[this.name + "_prepareG1"](pP, pPrepP);
    const res = this.tm.getBuff(pPrepP, this.prePSize);
    this.tm.endSyncOp();
    return res;
  };
  curve3.prepareG2 = function(q) {
    this.tm.startSyncOp();
    const pQ = this.tm.allocBuff(q);
    const pPrepQ = this.tm.alloc(this.preQSize);
    this.tm.instance.exports[this.name + "_prepareG2"](pQ, pPrepQ);
    const res = this.tm.getBuff(pPrepQ, this.preQSize);
    this.tm.endSyncOp();
    return res;
  };
  curve3.millerLoop = function(preP, preQ) {
    this.tm.startSyncOp();
    const pPreP = this.tm.allocBuff(preP);
    const pPreQ = this.tm.allocBuff(preQ);
    const pRes = this.tm.alloc(this.Gt.n8);
    this.tm.instance.exports[this.name + "_millerLoop"](pPreP, pPreQ, pRes);
    const res = this.tm.getBuff(pRes, this.Gt.n8);
    this.tm.endSyncOp();
    return res;
  };
  curve3.finalExponentiation = function(a) {
    this.tm.startSyncOp();
    const pA = this.tm.allocBuff(a);
    const pRes = this.tm.alloc(this.Gt.n8);
    this.tm.instance.exports[this.name + "_finalExponentiation"](pA, pRes);
    const res = this.tm.getBuff(pRes, this.Gt.n8);
    this.tm.endSyncOp();
    return res;
  };
}
var pTSizes = [
  1,
  1,
  1,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  13,
  14,
  15,
  16,
  16,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17
];
function buildMultiexp2(curve3, groupName) {
  const G = curve3[groupName];
  const tm = G.tm;
  async function _multiExpChunk(buffBases, buffScalars, inType, logger, logText) {
    if (!(buffBases instanceof Uint8Array)) {
      if (logger) logger.error(`${logText} _multiExpChunk buffBases is not Uint8Array`);
      throw new Error(`${logText} _multiExpChunk buffBases is not Uint8Array`);
    }
    if (!(buffScalars instanceof Uint8Array)) {
      if (logger) logger.error(`${logText} _multiExpChunk buffScalars is not Uint8Array`);
      throw new Error(`${logText} _multiExpChunk buffScalars is not Uint8Array`);
    }
    inType = inType || "affine";
    let sGIn;
    let fnName;
    if (groupName == "G1") {
      if (inType == "affine") {
        fnName = "g1m_multiexpAffine_chunk";
        sGIn = G.F.n8 * 2;
      } else {
        fnName = "g1m_multiexp_chunk";
        sGIn = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        fnName = "g2m_multiexpAffine_chunk";
        sGIn = G.F.n8 * 2;
      } else {
        fnName = "g2m_multiexp_chunk";
        sGIn = G.F.n8 * 3;
      }
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buffBases.byteLength / sGIn);
    if (nPoints == 0) return G.zero;
    const sScalar = Math.floor(buffScalars.byteLength / nPoints);
    if (sScalar * nPoints != buffScalars.byteLength) {
      throw new Error("Scalar size does not match");
    }
    const bitChunkSize = pTSizes[log2(nPoints)];
    const nChunks = Math.floor((sScalar * 8 - 1) / bitChunkSize) + 1;
    const opPromises = [];
    for (let i = 0; i < nChunks; i++) {
      const task = [
        { cmd: "ALLOCSET", var: 0, buff: buffBases },
        { cmd: "ALLOCSET", var: 1, buff: buffScalars },
        { cmd: "ALLOC", var: 2, len: G.F.n8 * 3 },
        { cmd: "CALL", fnName, params: [
          { var: 0 },
          { var: 1 },
          { val: sScalar },
          { val: nPoints },
          { val: i * bitChunkSize },
          { val: Math.min(sScalar * 8 - i * bitChunkSize, bitChunkSize) },
          { var: 2 }
        ] },
        { cmd: "GET", out: 0, var: 2, len: G.F.n8 * 3 }
      ];
      opPromises.push(
        G.tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    let res = G.zero;
    for (let i = result.length - 1; i >= 0; i--) {
      if (!G.isZero(res)) {
        for (let j = 0; j < bitChunkSize; j++) res = G.double(res);
      }
      res = G.add(res, result[i][0]);
    }
    return res;
  }
  async function _multiExp(buffBases, buffScalars, inType, logger, logText) {
    const MAX_CHUNK_SIZE = 1 << 22;
    const MIN_CHUNK_SIZE = 1 << 10;
    let sGIn;
    if (groupName == "G1") {
      if (inType == "affine") {
        sGIn = G.F.n8 * 2;
      } else {
        sGIn = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sGIn = G.F.n8 * 2;
      } else {
        sGIn = G.F.n8 * 3;
      }
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buffBases.byteLength / sGIn);
    if (nPoints == 0) return G.zero;
    const sScalar = Math.floor(buffScalars.byteLength / nPoints);
    if (sScalar * nPoints != buffScalars.byteLength) {
      throw new Error("Scalar size does not match");
    }
    const bitChunkSize = pTSizes[log2(nPoints)];
    const nChunks = Math.floor((sScalar * 8 - 1) / bitChunkSize) + 1;
    let chunkSize;
    chunkSize = Math.floor(nPoints / (tm.concurrency / nChunks));
    if (chunkSize > MAX_CHUNK_SIZE) chunkSize = MAX_CHUNK_SIZE;
    if (chunkSize < MIN_CHUNK_SIZE) chunkSize = MIN_CHUNK_SIZE;
    const opPromises = [];
    for (let i = 0; i < nPoints; i += chunkSize) {
      if (logger) logger.debug(`Multiexp start: ${logText}: ${i}/${nPoints}`);
      const n = Math.min(nPoints - i, chunkSize);
      const buffBasesChunk = buffBases.slice(i * sGIn, (i + n) * sGIn);
      const buffScalarsChunk = buffScalars.slice(i * sScalar, (i + n) * sScalar);
      opPromises.push(_multiExpChunk(buffBasesChunk, buffScalarsChunk, inType, logger, logText).then((r) => {
        if (logger) logger.debug(`Multiexp end: ${logText}: ${i}/${nPoints}`);
        return r;
      }));
    }
    const result = await Promise.all(opPromises);
    let res = G.zero;
    for (let i = result.length - 1; i >= 0; i--) {
      res = G.add(res, result[i]);
    }
    return res;
  }
  G.multiExp = async function multiExpAffine(buffBases, buffScalars, logger, logText) {
    return await _multiExp(buffBases, buffScalars, "jacobian", logger, logText);
  };
  G.multiExpAffine = async function multiExpAffine(buffBases, buffScalars, logger, logText) {
    return await _multiExp(buffBases, buffScalars, "affine", logger, logText);
  };
}
function buildFFT2(curve3, groupName) {
  const G = curve3[groupName];
  const Fr = curve3.Fr;
  const tm = G.tm;
  async function _fft(buff, inverse, inType, outType, logger, loggerTxt) {
    inType = inType || "affine";
    outType = outType || "affine";
    const MAX_BITS_THREAD = 14;
    let sIn, sMid, sOut, fnIn2Mid, fnMid2Out, fnFFTMix, fnFFTJoin, fnFFTFinal;
    if (groupName == "G1") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g1m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      sMid = G.F.n8 * 3;
      if (inverse) {
        fnFFTFinal = "g1m_fftFinal";
      }
      fnFFTJoin = "g1m_fftJoin";
      fnFFTMix = "g1m_fftMix";
      if (outType == "affine") {
        sOut = G.F.n8 * 2;
        fnMid2Out = "g1m_batchToAffine";
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g2m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      sMid = G.F.n8 * 3;
      if (inverse) {
        fnFFTFinal = "g2m_fftFinal";
      }
      fnFFTJoin = "g2m_fftJoin";
      fnFFTMix = "g2m_fftMix";
      if (outType == "affine") {
        sOut = G.F.n8 * 2;
        fnMid2Out = "g2m_batchToAffine";
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "Fr") {
      sIn = G.n8;
      sMid = G.n8;
      sOut = G.n8;
      if (inverse) {
        fnFFTFinal = "frm_fftFinal";
      }
      fnFFTMix = "frm_fftMix";
      fnFFTJoin = "frm_fftJoin";
    }
    let returnArray = false;
    if (Array.isArray(buff)) {
      buff = array2buffer(buff, sIn);
      returnArray = true;
    } else {
      buff = buff.slice(0, buff.byteLength);
    }
    const nPoints = buff.byteLength / sIn;
    const bits2 = log2(nPoints);
    if (1 << bits2 != nPoints) {
      throw new Error("fft must be multiple of 2");
    }
    if (bits2 == Fr.s + 1) {
      let buffOut2;
      if (inverse) {
        buffOut2 = await _fftExtInv(buff, inType, outType, logger, loggerTxt);
      } else {
        buffOut2 = await _fftExt(buff, inType, outType, logger, loggerTxt);
      }
      if (returnArray) {
        return buffer2array(buffOut2, sOut);
      } else {
        return buffOut2;
      }
    }
    let inv;
    if (inverse) {
      inv = Fr.inv(Fr.e(nPoints));
    }
    let buffOut;
    buffReverseBits(buff, sIn);
    let chunks;
    let pointsInChunk = Math.min(1 << MAX_BITS_THREAD, nPoints);
    let nChunks = nPoints / pointsInChunk;
    while (nChunks < tm.concurrency && pointsInChunk >= 16) {
      nChunks *= 2;
      pointsInChunk /= 2;
    }
    const l2Chunk = log2(pointsInChunk);
    const promises = [];
    for (let i = 0; i < nChunks; i++) {
      if (logger) logger.debug(`${loggerTxt}: fft ${bits2} mix start: ${i}/${nChunks}`);
      const task = [];
      task.push({ cmd: "ALLOC", var: 0, len: sMid * pointsInChunk });
      const buffChunk = buff.slice(pointsInChunk * i * sIn, pointsInChunk * (i + 1) * sIn);
      task.push({ cmd: "SET", var: 0, buff: buffChunk });
      if (fnIn2Mid) {
        task.push({ cmd: "CALL", fnName: fnIn2Mid, params: [{ var: 0 }, { val: pointsInChunk }, { var: 0 }] });
      }
      for (let j = 1; j <= l2Chunk; j++) {
        task.push({ cmd: "CALL", fnName: fnFFTMix, params: [{ var: 0 }, { val: pointsInChunk }, { val: j }] });
      }
      if (l2Chunk == bits2) {
        if (fnFFTFinal) {
          task.push({ cmd: "ALLOCSET", var: 1, buff: inv });
          task.push({ cmd: "CALL", fnName: fnFFTFinal, params: [
            { var: 0 },
            { val: pointsInChunk },
            { var: 1 }
          ] });
        }
        if (fnMid2Out) {
          task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 0 }, { val: pointsInChunk }, { var: 0 }] });
        }
        task.push({ cmd: "GET", out: 0, var: 0, len: pointsInChunk * sOut });
      } else {
        task.push({ cmd: "GET", out: 0, var: 0, len: sMid * pointsInChunk });
      }
      promises.push(tm.queueAction(task).then((r) => {
        if (logger) logger.debug(`${loggerTxt}: fft ${bits2} mix end: ${i}/${nChunks}`);
        return r;
      }));
    }
    chunks = await Promise.all(promises);
    for (let i = 0; i < nChunks; i++) chunks[i] = chunks[i][0];
    for (let i = l2Chunk + 1; i <= bits2; i++) {
      if (logger) logger.debug(`${loggerTxt}: fft  ${bits2}  join: ${i}/${bits2}`);
      const nGroups = 1 << bits2 - i;
      const nChunksPerGroup = nChunks / nGroups;
      const opPromises = [];
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const first = Fr.exp(Fr.w[i], k * pointsInChunk);
          const inc = Fr.w[i];
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const task = [];
          task.push({ cmd: "ALLOCSET", var: 0, buff: chunks[o1] });
          task.push({ cmd: "ALLOCSET", var: 1, buff: chunks[o2] });
          task.push({ cmd: "ALLOCSET", var: 2, buff: first });
          task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
          task.push({ cmd: "CALL", fnName: fnFFTJoin, params: [
            { var: 0 },
            { var: 1 },
            { val: pointsInChunk },
            { var: 2 },
            { var: 3 }
          ] });
          if (i == bits2) {
            if (fnFFTFinal) {
              task.push({ cmd: "ALLOCSET", var: 4, buff: inv });
              task.push({ cmd: "CALL", fnName: fnFFTFinal, params: [
                { var: 0 },
                { val: pointsInChunk },
                { var: 4 }
              ] });
              task.push({ cmd: "CALL", fnName: fnFFTFinal, params: [
                { var: 1 },
                { val: pointsInChunk },
                { var: 4 }
              ] });
            }
            if (fnMid2Out) {
              task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 0 }, { val: pointsInChunk }, { var: 0 }] });
              task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 1 }, { val: pointsInChunk }, { var: 1 }] });
            }
            task.push({ cmd: "GET", out: 0, var: 0, len: pointsInChunk * sOut });
            task.push({ cmd: "GET", out: 1, var: 1, len: pointsInChunk * sOut });
          } else {
            task.push({ cmd: "GET", out: 0, var: 0, len: pointsInChunk * sMid });
            task.push({ cmd: "GET", out: 1, var: 1, len: pointsInChunk * sMid });
          }
          opPromises.push(tm.queueAction(task).then((r) => {
            if (logger) logger.debug(`${loggerTxt}: fft ${bits2} join  ${i}/${bits2}  ${j + 1}/${nGroups} ${k}/${nChunksPerGroup / 2}`);
            return r;
          }));
        }
      }
      const res = await Promise.all(opPromises);
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const resChunk = res.shift();
          chunks[o1] = resChunk[0];
          chunks[o2] = resChunk[1];
        }
      }
    }
    if (buff instanceof BigBuffer) {
      buffOut = new BigBuffer(nPoints * sOut);
    } else {
      buffOut = new Uint8Array(nPoints * sOut);
    }
    if (inverse) {
      buffOut.set(chunks[0].slice((pointsInChunk - 1) * sOut));
      let p = sOut;
      for (let i = nChunks - 1; i > 0; i--) {
        buffOut.set(chunks[i], p);
        p += pointsInChunk * sOut;
        delete chunks[i];
      }
      buffOut.set(chunks[0].slice(0, (pointsInChunk - 1) * sOut), p);
      delete chunks[0];
    } else {
      for (let i = 0; i < nChunks; i++) {
        buffOut.set(chunks[i], pointsInChunk * sOut * i);
        delete chunks[i];
      }
    }
    if (returnArray) {
      return buffer2array(buffOut, sOut);
    } else {
      return buffOut;
    }
  }
  async function _fftExt(buff, inType, outType, logger, loggerTxt) {
    let b1, b2;
    b1 = buff.slice(0, buff.byteLength / 2);
    b2 = buff.slice(buff.byteLength / 2, buff.byteLength);
    const promises = [];
    [b1, b2] = await _fftJoinExt(b1, b2, "fftJoinExt", Fr.one, Fr.shift, inType, "jacobian", logger, loggerTxt);
    promises.push(_fft(b1, false, "jacobian", outType, logger, loggerTxt));
    promises.push(_fft(b2, false, "jacobian", outType, logger, loggerTxt));
    const res1 = await Promise.all(promises);
    let buffOut;
    if (res1[0].byteLength > 1 << 28) {
      buffOut = new BigBuffer(res1[0].byteLength * 2);
    } else {
      buffOut = new Uint8Array(res1[0].byteLength * 2);
    }
    buffOut.set(res1[0]);
    buffOut.set(res1[1], res1[0].byteLength);
    return buffOut;
  }
  async function _fftExtInv(buff, inType, outType, logger, loggerTxt) {
    let b1, b2;
    b1 = buff.slice(0, buff.byteLength / 2);
    b2 = buff.slice(buff.byteLength / 2, buff.byteLength);
    const promises = [];
    promises.push(_fft(b1, true, inType, "jacobian", logger, loggerTxt));
    promises.push(_fft(b2, true, inType, "jacobian", logger, loggerTxt));
    [b1, b2] = await Promise.all(promises);
    const res1 = await _fftJoinExt(b1, b2, "fftJoinExtInv", Fr.one, Fr.shiftInv, "jacobian", outType, logger, loggerTxt);
    let buffOut;
    if (res1[0].byteLength > 1 << 28) {
      buffOut = new BigBuffer(res1[0].byteLength * 2);
    } else {
      buffOut = new Uint8Array(res1[0].byteLength * 2);
    }
    buffOut.set(res1[0]);
    buffOut.set(res1[1], res1[0].byteLength);
    return buffOut;
  }
  async function _fftJoinExt(buff1, buff2, fn, first, inc, inType, outType, logger, loggerTxt) {
    const MAX_CHUNK_SIZE = 1 << 16;
    const MIN_CHUNK_SIZE = 1 << 4;
    let fnName;
    let fnIn2Mid, fnMid2Out;
    let sOut, sIn, sMid;
    if (groupName == "G1") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g1m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      sMid = G.F.n8 * 3;
      fnName = "g1m_" + fn;
      if (outType == "affine") {
        fnMid2Out = "g1m_batchToAffine";
        sOut = G.F.n8 * 2;
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g2m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      fnName = "g2m_" + fn;
      sMid = G.F.n8 * 3;
      if (outType == "affine") {
        fnMid2Out = "g2m_batchToAffine";
        sOut = G.F.n8 * 2;
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "Fr") {
      sIn = Fr.n8;
      sOut = Fr.n8;
      sMid = Fr.n8;
      fnName = "frm_" + fn;
    } else {
      throw new Error("Invalid group");
    }
    if (buff1.byteLength != buff2.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const nPoints = Math.floor(buff1.byteLength / sIn);
    if (nPoints != 1 << log2(nPoints)) {
      throw new Error("Invalid number of points");
    }
    let chunkSize = Math.floor(nPoints / tm.concurrency);
    if (chunkSize < MIN_CHUNK_SIZE) chunkSize = MIN_CHUNK_SIZE;
    if (chunkSize > MAX_CHUNK_SIZE) chunkSize = MAX_CHUNK_SIZE;
    const opPromises = [];
    for (let i = 0; i < nPoints; i += chunkSize) {
      if (logger) logger.debug(`${loggerTxt}: fftJoinExt Start: ${i}/${nPoints}`);
      const n = Math.min(nPoints - i, chunkSize);
      const firstChunk = Fr.mul(first, Fr.exp(inc, i));
      const task = [];
      const b1 = buff1.slice(i * sIn, (i + n) * sIn);
      const b2 = buff2.slice(i * sIn, (i + n) * sIn);
      task.push({ cmd: "ALLOC", var: 0, len: sMid * n });
      task.push({ cmd: "SET", var: 0, buff: b1 });
      task.push({ cmd: "ALLOC", var: 1, len: sMid * n });
      task.push({ cmd: "SET", var: 1, buff: b2 });
      task.push({ cmd: "ALLOCSET", var: 2, buff: firstChunk });
      task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
      if (fnIn2Mid) {
        task.push({ cmd: "CALL", fnName: fnIn2Mid, params: [{ var: 0 }, { val: n }, { var: 0 }] });
        task.push({ cmd: "CALL", fnName: fnIn2Mid, params: [{ var: 1 }, { val: n }, { var: 1 }] });
      }
      task.push({ cmd: "CALL", fnName, params: [
        { var: 0 },
        { var: 1 },
        { val: n },
        { var: 2 },
        { var: 3 },
        { val: Fr.s }
      ] });
      if (fnMid2Out) {
        task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 0 }, { val: n }, { var: 0 }] });
        task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 1 }, { val: n }, { var: 1 }] });
      }
      task.push({ cmd: "GET", out: 0, var: 0, len: n * sOut });
      task.push({ cmd: "GET", out: 1, var: 1, len: n * sOut });
      opPromises.push(
        tm.queueAction(task).then((r) => {
          if (logger) logger.debug(`${loggerTxt}: fftJoinExt End: ${i}/${nPoints}`);
          return r;
        })
      );
    }
    const result = await Promise.all(opPromises);
    let fullBuffOut1;
    let fullBuffOut2;
    if (nPoints * sOut > 1 << 28) {
      fullBuffOut1 = new BigBuffer(nPoints * sOut);
      fullBuffOut2 = new BigBuffer(nPoints * sOut);
    } else {
      fullBuffOut1 = new Uint8Array(nPoints * sOut);
      fullBuffOut2 = new Uint8Array(nPoints * sOut);
    }
    let p = 0;
    for (let i = 0; i < result.length; i++) {
      fullBuffOut1.set(result[i][0], p);
      fullBuffOut2.set(result[i][1], p);
      p += result[i][0].byteLength;
    }
    return [fullBuffOut1, fullBuffOut2];
  }
  G.fft = async function(buff, inType, outType, logger, loggerTxt) {
    return await _fft(buff, false, inType, outType, logger, loggerTxt);
  };
  G.ifft = async function(buff, inType, outType, logger, loggerTxt) {
    return await _fft(buff, true, inType, outType, logger, loggerTxt);
  };
  G.lagrangeEvaluations = async function(buff, inType, outType, logger, loggerTxt) {
    inType = inType || "affine";
    outType = outType || "affine";
    let sIn;
    if (groupName == "G1") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
      } else {
        sIn = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
      } else {
        sIn = G.F.n8 * 3;
      }
    } else if (groupName == "Fr") {
      sIn = Fr.n8;
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = buff.byteLength / sIn;
    const bits2 = log2(nPoints);
    if (2 ** bits2 * sIn != buff.byteLength) {
      if (logger) logger.error("lagrangeEvaluations iinvalid input size");
      throw new Error("lagrangeEvaluations invalid Input size");
    }
    if (bits2 <= Fr.s) {
      return await G.ifft(buff, inType, outType, logger, loggerTxt);
    }
    if (bits2 > Fr.s + 1) {
      if (logger) logger.error("lagrangeEvaluations input too big");
      throw new Error("lagrangeEvaluations input too big");
    }
    let t0 = buff.slice(0, buff.byteLength / 2);
    let t1 = buff.slice(buff.byteLength / 2, buff.byteLength);
    const shiftToSmallM = Fr.exp(Fr.shift, nPoints / 2);
    const sConst = Fr.inv(Fr.sub(Fr.one, shiftToSmallM));
    [t0, t1] = await _fftJoinExt(t0, t1, "prepareLagrangeEvaluation", sConst, Fr.shiftInv, inType, "jacobian", logger, loggerTxt + " prep");
    const promises = [];
    promises.push(_fft(t0, true, "jacobian", outType, logger, loggerTxt + " t0"));
    promises.push(_fft(t1, true, "jacobian", outType, logger, loggerTxt + " t1"));
    [t0, t1] = await Promise.all(promises);
    let buffOut;
    if (t0.byteLength > 1 << 28) {
      buffOut = new BigBuffer(t0.byteLength * 2);
    } else {
      buffOut = new Uint8Array(t0.byteLength * 2);
    }
    buffOut.set(t0);
    buffOut.set(t1, t0.byteLength);
    return buffOut;
  };
  G.fftMix = async function fftMix(buff) {
    const sG = G.F.n8 * 3;
    let fnName, fnFFTJoin;
    if (groupName == "G1") {
      fnName = "g1m_fftMix";
      fnFFTJoin = "g1m_fftJoin";
    } else if (groupName == "G2") {
      fnName = "g2m_fftMix";
      fnFFTJoin = "g2m_fftJoin";
    } else if (groupName == "Fr") {
      fnName = "frm_fftMix";
      fnFFTJoin = "frm_fftJoin";
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buff.byteLength / sG);
    const power = log2(nPoints);
    let nChunks = 1 << log2(tm.concurrency);
    if (nPoints <= nChunks * 2) nChunks = 1;
    const pointsPerChunk = nPoints / nChunks;
    const powerChunk = log2(pointsPerChunk);
    const opPromises = [];
    for (let i = 0; i < nChunks; i++) {
      const task = [];
      const b = buff.slice(i * pointsPerChunk * sG, (i + 1) * pointsPerChunk * sG);
      task.push({ cmd: "ALLOCSET", var: 0, buff: b });
      for (let j = 1; j <= powerChunk; j++) {
        task.push({ cmd: "CALL", fnName, params: [
          { var: 0 },
          { val: pointsPerChunk },
          { val: j }
        ] });
      }
      task.push({ cmd: "GET", out: 0, var: 0, len: pointsPerChunk * sG });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    const chunks = [];
    for (let i = 0; i < result.length; i++) chunks[i] = result[i][0];
    for (let i = powerChunk + 1; i <= power; i++) {
      const nGroups = 1 << power - i;
      const nChunksPerGroup = nChunks / nGroups;
      const opPromises2 = [];
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const first = Fr.exp(Fr.w[i], k * pointsPerChunk);
          const inc = Fr.w[i];
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const task = [];
          task.push({ cmd: "ALLOCSET", var: 0, buff: chunks[o1] });
          task.push({ cmd: "ALLOCSET", var: 1, buff: chunks[o2] });
          task.push({ cmd: "ALLOCSET", var: 2, buff: first });
          task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
          task.push({ cmd: "CALL", fnName: fnFFTJoin, params: [
            { var: 0 },
            { var: 1 },
            { val: pointsPerChunk },
            { var: 2 },
            { var: 3 }
          ] });
          task.push({ cmd: "GET", out: 0, var: 0, len: pointsPerChunk * sG });
          task.push({ cmd: "GET", out: 1, var: 1, len: pointsPerChunk * sG });
          opPromises2.push(tm.queueAction(task));
        }
      }
      const res = await Promise.all(opPromises2);
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const resChunk = res.shift();
          chunks[o1] = resChunk[0];
          chunks[o2] = resChunk[1];
        }
      }
    }
    let fullBuffOut;
    if (buff instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sG);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sG);
    }
    let p = 0;
    for (let i = 0; i < nChunks; i++) {
      fullBuffOut.set(chunks[i], p);
      p += chunks[i].byteLength;
    }
    return fullBuffOut;
  };
  G.fftJoin = async function fftJoin(buff1, buff2, first, inc) {
    const sG = G.F.n8 * 3;
    let fnName;
    if (groupName == "G1") {
      fnName = "g1m_fftJoin";
    } else if (groupName == "G2") {
      fnName = "g2m_fftJoin";
    } else if (groupName == "Fr") {
      fnName = "frm_fftJoin";
    } else {
      throw new Error("Invalid group");
    }
    if (buff1.byteLength != buff2.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const nPoints = Math.floor(buff1.byteLength / sG);
    if (nPoints != 1 << log2(nPoints)) {
      throw new Error("Invalid number of points");
    }
    let nChunks = 1 << log2(tm.concurrency);
    if (nPoints <= nChunks * 2) nChunks = 1;
    const pointsPerChunk = nPoints / nChunks;
    const opPromises = [];
    for (let i = 0; i < nChunks; i++) {
      const task = [];
      const firstChunk = Fr.mul(first, Fr.exp(inc, i * pointsPerChunk));
      const b1 = buff1.slice(i * pointsPerChunk * sG, (i + 1) * pointsPerChunk * sG);
      const b2 = buff2.slice(i * pointsPerChunk * sG, (i + 1) * pointsPerChunk * sG);
      task.push({ cmd: "ALLOCSET", var: 0, buff: b1 });
      task.push({ cmd: "ALLOCSET", var: 1, buff: b2 });
      task.push({ cmd: "ALLOCSET", var: 2, buff: firstChunk });
      task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
      task.push({ cmd: "CALL", fnName, params: [
        { var: 0 },
        { var: 1 },
        { val: pointsPerChunk },
        { var: 2 },
        { var: 3 }
      ] });
      task.push({ cmd: "GET", out: 0, var: 0, len: pointsPerChunk * sG });
      task.push({ cmd: "GET", out: 1, var: 1, len: pointsPerChunk * sG });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    let fullBuffOut1;
    let fullBuffOut2;
    if (buff1 instanceof BigBuffer) {
      fullBuffOut1 = new BigBuffer(nPoints * sG);
      fullBuffOut2 = new BigBuffer(nPoints * sG);
    } else {
      fullBuffOut1 = new Uint8Array(nPoints * sG);
      fullBuffOut2 = new Uint8Array(nPoints * sG);
    }
    let p = 0;
    for (let i = 0; i < result.length; i++) {
      fullBuffOut1.set(result[i][0], p);
      fullBuffOut2.set(result[i][1], p);
      p += result[i][0].byteLength;
    }
    return [fullBuffOut1, fullBuffOut2];
  };
  G.fftFinal = async function fftFinal(buff, factor) {
    const sG = G.F.n8 * 3;
    const sGout = G.F.n8 * 2;
    let fnName, fnToAffine;
    if (groupName == "G1") {
      fnName = "g1m_fftFinal";
      fnToAffine = "g1m_batchToAffine";
    } else if (groupName == "G2") {
      fnName = "g2m_fftFinal";
      fnToAffine = "g2m_batchToAffine";
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buff.byteLength / sG);
    if (nPoints != 1 << log2(nPoints)) {
      throw new Error("Invalid number of points");
    }
    const pointsPerChunk = Math.floor(nPoints / tm.concurrency);
    const opPromises = [];
    for (let i = 0; i < tm.concurrency; i++) {
      let n;
      if (i < tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const task = [];
      const b = buff.slice(i * pointsPerChunk * sG, (i * pointsPerChunk + n) * sG);
      task.push({ cmd: "ALLOCSET", var: 0, buff: b });
      task.push({ cmd: "ALLOCSET", var: 1, buff: factor });
      task.push({ cmd: "CALL", fnName, params: [
        { var: 0 },
        { val: n },
        { var: 1 }
      ] });
      task.push({ cmd: "CALL", fnName: fnToAffine, params: [
        { var: 0 },
        { val: n },
        { var: 0 }
      ] });
      task.push({ cmd: "GET", out: 0, var: 0, len: n * sGout });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result = await Promise.all(opPromises);
    let fullBuffOut;
    if (buff instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sGout);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sGout);
    }
    let p = 0;
    for (let i = result.length - 1; i >= 0; i--) {
      fullBuffOut.set(result[i][0], p);
      p += result[i][0].byteLength;
    }
    return fullBuffOut;
  };
}
async function buildEngine(params) {
  const tm = await buildThreadManager(params.wasm, params.singleThread);
  const curve3 = {};
  curve3.q = e(params.wasm.q.toString());
  curve3.r = e(params.wasm.r.toString());
  curve3.name = params.name;
  curve3.tm = tm;
  curve3.prePSize = params.wasm.prePSize;
  curve3.preQSize = params.wasm.preQSize;
  curve3.Fr = new WasmField1(tm, "frm", params.n8r, params.r);
  curve3.F1 = new WasmField1(tm, "f1m", params.n8q, params.q);
  curve3.F2 = new WasmField2(tm, "f2m", curve3.F1);
  curve3.G1 = new WasmCurve(tm, "g1m", curve3.F1, params.wasm.pG1gen, params.wasm.pG1b, params.cofactorG1);
  curve3.G2 = new WasmCurve(tm, "g2m", curve3.F2, params.wasm.pG2gen, params.wasm.pG2b, params.cofactorG2);
  curve3.F6 = new WasmField3(tm, "f6m", curve3.F2);
  curve3.F12 = new WasmField2(tm, "ftm", curve3.F6);
  curve3.Gt = curve3.F12;
  buildBatchApplyKey(curve3, "G1");
  buildBatchApplyKey(curve3, "G2");
  buildBatchApplyKey(curve3, "Fr");
  buildMultiexp2(curve3, "G1");
  buildMultiexp2(curve3, "G2");
  buildFFT2(curve3, "G1");
  buildFFT2(curve3, "G2");
  buildFFT2(curve3, "Fr");
  buildPairing(curve3);
  curve3.array2buffer = function(arr, sG) {
    const buff = new Uint8Array(sG * arr.length);
    for (let i = 0; i < arr.length; i++) {
      buff.set(arr[i], i * sG);
    }
    return buff;
  };
  curve3.buffer2array = function(buff, sG) {
    const n = buff.byteLength / sG;
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = buff.slice(i * sG, i * sG + sG);
    }
    return arr;
  };
  return curve3;
}
function toNumber(n) {
  return BigInt(n);
}
function isNegative(n) {
  return n < 0n;
}
function isZero(n) {
  return n === 0n;
}
function bitLength(n) {
  if (isNegative(n)) {
    return n.toString(2).length - 1;
  } else {
    return n.toString(2).length;
  }
}
function u32(n) {
  const b = [];
  const v = toNumber(n);
  b.push(Number(v & 0xFFn));
  b.push(Number(v >> 8n & 0xFFn));
  b.push(Number(v >> 16n & 0xFFn));
  b.push(Number(v >> 24n & 0xFFn));
  return b;
}
function toUTF8Array(str) {
  var utf82 = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 128) utf82.push(charcode);
    else if (charcode < 2048) {
      utf82.push(
        192 | charcode >> 6,
        128 | charcode & 63
      );
    } else if (charcode < 55296 || charcode >= 57344) {
      utf82.push(
        224 | charcode >> 12,
        128 | charcode >> 6 & 63,
        128 | charcode & 63
      );
    } else {
      i++;
      charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
      utf82.push(
        240 | charcode >> 18,
        128 | charcode >> 12 & 63,
        128 | charcode >> 6 & 63,
        128 | charcode & 63
      );
    }
  }
  return utf82;
}
function string(str) {
  const bytes2 = toUTF8Array(str);
  return [...varuint32(bytes2.length), ...bytes2];
}
function varuint(n) {
  const code = [];
  let v = toNumber(n);
  if (isNegative(v)) throw new Error("Number cannot be negative");
  while (!isZero(v)) {
    code.push(Number(v & 0x7Fn));
    v = v >> 7n;
  }
  if (code.length == 0) code.push(0);
  for (let i = 0; i < code.length - 1; i++) {
    code[i] = code[i] | 128;
  }
  return code;
}
function varint(_n) {
  let n, sign;
  const bits2 = bitLength(_n);
  if (_n < 0) {
    sign = true;
    n = (1n << BigInt(bits2)) + _n;
  } else {
    sign = false;
    n = toNumber(_n);
  }
  const paddingBits = 7 - bits2 % 7;
  const padding = (1n << BigInt(paddingBits)) - 1n << BigInt(bits2);
  const paddingMask = (1 << 7 - paddingBits) - 1 | 128;
  const code = varuint(n + padding);
  if (!sign) {
    code[code.length - 1] = code[code.length - 1] & paddingMask;
  }
  return code;
}
function varint32(n) {
  let v = toNumber(n);
  if (v > 0xFFFFFFFFn) throw new Error("Number too big");
  if (v > 0x7FFFFFFFn) v = v - 0x100000000n;
  if (v < -2147483648n) throw new Error("Number too small");
  return varint(v);
}
function varint64(n) {
  let v = toNumber(n);
  if (v > 0xFFFFFFFFFFFFFFFFn) throw new Error("Number too big");
  if (v > 0x7FFFFFFFFFFFFFFFn) v = v - 0x10000000000000000n;
  if (v < -9223372036854775808n) throw new Error("Number too small");
  return varint(v);
}
function varuint32(n) {
  let v = toNumber(n);
  if (v > 0xFFFFFFFFn) throw new Error("Number too big");
  return varuint(v);
}
function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ("0" + (byte & 255).toString(16)).slice(-2);
  }).join("");
}
var CodeBuilder = class {
  constructor(func) {
    this.func = func;
    this.functionName = func.functionName;
    this.module = func.module;
  }
  setLocal(localName, valCode) {
    const idx = this.func.localIdxByName[localName];
    if (idx === void 0)
      throw new Error(`Local Variable not defined: Function: ${this.functionName} local: ${localName} `);
    return [...valCode, 33, ...varuint32(idx)];
  }
  teeLocal(localName, valCode) {
    const idx = this.func.localIdxByName[localName];
    if (idx === void 0)
      throw new Error(`Local Variable not defined: Function: ${this.functionName} local: ${localName} `);
    return [...valCode, 34, ...varuint32(idx)];
  }
  getLocal(localName) {
    const idx = this.func.localIdxByName[localName];
    if (idx === void 0)
      throw new Error(`Local Variable not defined: Function: ${this.functionName} local: ${localName} `);
    return [32, ...varuint32(idx)];
  }
  i64_load8_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 48, align, ...varuint32(offset)];
  }
  i64_load8_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 49, align, ...varuint32(offset)];
  }
  i64_load16_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 50, align, ...varuint32(offset)];
  }
  i64_load16_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 51, align, ...varuint32(offset)];
  }
  i64_load32_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 2 : _align;
    return [...idxCode, 52, align, ...varuint32(offset)];
  }
  i64_load32_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 2 : _align;
    return [...idxCode, 53, align, ...varuint32(offset)];
  }
  i64_load(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 3 : _align;
    return [...idxCode, 41, align, ...varuint32(offset)];
  }
  i64_store(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 3;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 3;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 55, align, ...varuint32(offset)];
  }
  i64_store32(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 2;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 2;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 62, align, ...varuint32(offset)];
  }
  i64_store16(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 1;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 1;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 61, align, ...varuint32(offset)];
  }
  i64_store8(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 0;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 0;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 60, align, ...varuint32(offset)];
  }
  i32_load8_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 44, align, ...varuint32(offset)];
  }
  i32_load8_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 45, align, ...varuint32(offset)];
  }
  i32_load16_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 46, align, ...varuint32(offset)];
  }
  i32_load16_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 47, align, ...varuint32(offset)];
  }
  i32_load(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 2 : _align;
    return [...idxCode, 40, align, ...varuint32(offset)];
  }
  i32_store(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 2;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 2;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 54, align, ...varuint32(offset)];
  }
  i32_store16(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 1;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 1;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 59, align, ...varuint32(offset)];
  }
  i32_store8(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 0;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 0;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 58, align, ...varuint32(offset)];
  }
  call(fnName, ...args) {
    const idx = this.module.functionIdxByName[fnName];
    if (idx === void 0)
      throw new Error(`Function not defined: Function: ${fnName}`);
    return [...[].concat(...args), 16, ...varuint32(idx)];
  }
  call_indirect(fnIdx, ...args) {
    return [...[].concat(...args), ...fnIdx, 17, 0, 0];
  }
  if(condCode, thenCode, elseCode) {
    if (elseCode) {
      return [...condCode, 4, 64, ...thenCode, 5, ...elseCode, 11];
    } else {
      return [...condCode, 4, 64, ...thenCode, 11];
    }
  }
  block(bCode) {
    return [2, 64, ...bCode, 11];
  }
  loop(...args) {
    return [3, 64, ...[].concat(...[...args]), 11];
  }
  br_if(relPath, condCode) {
    return [...condCode, 13, ...varuint32(relPath)];
  }
  br(relPath) {
    return [12, ...varuint32(relPath)];
  }
  ret(rCode) {
    return [...rCode, 15];
  }
  drop(dCode) {
    return [...dCode, 26];
  }
  i64_const(num) {
    return [66, ...varint64(num)];
  }
  i32_const(num) {
    return [65, ...varint32(num)];
  }
  i64_eqz(opcode) {
    return [...opcode, 80];
  }
  i64_eq(op1code, op2code) {
    return [...op1code, ...op2code, 81];
  }
  i64_ne(op1code, op2code) {
    return [...op1code, ...op2code, 82];
  }
  i64_lt_s(op1code, op2code) {
    return [...op1code, ...op2code, 83];
  }
  i64_lt_u(op1code, op2code) {
    return [...op1code, ...op2code, 84];
  }
  i64_gt_s(op1code, op2code) {
    return [...op1code, ...op2code, 85];
  }
  i64_gt_u(op1code, op2code) {
    return [...op1code, ...op2code, 86];
  }
  i64_le_s(op1code, op2code) {
    return [...op1code, ...op2code, 87];
  }
  i64_le_u(op1code, op2code) {
    return [...op1code, ...op2code, 88];
  }
  i64_ge_s(op1code, op2code) {
    return [...op1code, ...op2code, 89];
  }
  i64_ge_u(op1code, op2code) {
    return [...op1code, ...op2code, 90];
  }
  i64_add(op1code, op2code) {
    return [...op1code, ...op2code, 124];
  }
  i64_sub(op1code, op2code) {
    return [...op1code, ...op2code, 125];
  }
  i64_mul(op1code, op2code) {
    return [...op1code, ...op2code, 126];
  }
  i64_div_s(op1code, op2code) {
    return [...op1code, ...op2code, 127];
  }
  i64_div_u(op1code, op2code) {
    return [...op1code, ...op2code, 128];
  }
  i64_rem_s(op1code, op2code) {
    return [...op1code, ...op2code, 129];
  }
  i64_rem_u(op1code, op2code) {
    return [...op1code, ...op2code, 130];
  }
  i64_and(op1code, op2code) {
    return [...op1code, ...op2code, 131];
  }
  i64_or(op1code, op2code) {
    return [...op1code, ...op2code, 132];
  }
  i64_xor(op1code, op2code) {
    return [...op1code, ...op2code, 133];
  }
  i64_shl(op1code, op2code) {
    return [...op1code, ...op2code, 134];
  }
  i64_shr_s(op1code, op2code) {
    return [...op1code, ...op2code, 135];
  }
  i64_shr_u(op1code, op2code) {
    return [...op1code, ...op2code, 136];
  }
  i64_extend_i32_s(op1code) {
    return [...op1code, 172];
  }
  i64_extend_i32_u(op1code) {
    return [...op1code, 173];
  }
  i64_clz(op1code) {
    return [...op1code, 121];
  }
  i64_ctz(op1code) {
    return [...op1code, 122];
  }
  i32_eqz(op1code) {
    return [...op1code, 69];
  }
  i32_eq(op1code, op2code) {
    return [...op1code, ...op2code, 70];
  }
  i32_ne(op1code, op2code) {
    return [...op1code, ...op2code, 71];
  }
  i32_lt_s(op1code, op2code) {
    return [...op1code, ...op2code, 72];
  }
  i32_lt_u(op1code, op2code) {
    return [...op1code, ...op2code, 73];
  }
  i32_gt_s(op1code, op2code) {
    return [...op1code, ...op2code, 74];
  }
  i32_gt_u(op1code, op2code) {
    return [...op1code, ...op2code, 75];
  }
  i32_le_s(op1code, op2code) {
    return [...op1code, ...op2code, 76];
  }
  i32_le_u(op1code, op2code) {
    return [...op1code, ...op2code, 77];
  }
  i32_ge_s(op1code, op2code) {
    return [...op1code, ...op2code, 78];
  }
  i32_ge_u(op1code, op2code) {
    return [...op1code, ...op2code, 79];
  }
  i32_add(op1code, op2code) {
    return [...op1code, ...op2code, 106];
  }
  i32_sub(op1code, op2code) {
    return [...op1code, ...op2code, 107];
  }
  i32_mul(op1code, op2code) {
    return [...op1code, ...op2code, 108];
  }
  i32_div_s(op1code, op2code) {
    return [...op1code, ...op2code, 109];
  }
  i32_div_u(op1code, op2code) {
    return [...op1code, ...op2code, 110];
  }
  i32_rem_s(op1code, op2code) {
    return [...op1code, ...op2code, 111];
  }
  i32_rem_u(op1code, op2code) {
    return [...op1code, ...op2code, 112];
  }
  i32_and(op1code, op2code) {
    return [...op1code, ...op2code, 113];
  }
  i32_or(op1code, op2code) {
    return [...op1code, ...op2code, 114];
  }
  i32_xor(op1code, op2code) {
    return [...op1code, ...op2code, 115];
  }
  i32_shl(op1code, op2code) {
    return [...op1code, ...op2code, 116];
  }
  i32_shr_s(op1code, op2code) {
    return [...op1code, ...op2code, 117];
  }
  i32_shr_u(op1code, op2code) {
    return [...op1code, ...op2code, 118];
  }
  i32_rotl(op1code, op2code) {
    return [...op1code, ...op2code, 119];
  }
  i32_rotr(op1code, op2code) {
    return [...op1code, ...op2code, 120];
  }
  i32_wrap_i64(op1code) {
    return [...op1code, 167];
  }
  i32_clz(op1code) {
    return [...op1code, 103];
  }
  i32_ctz(op1code) {
    return [...op1code, 104];
  }
  unreachable() {
    return [0];
  }
  current_memory() {
    return [63, 0];
  }
  comment() {
    return [];
  }
};
var typeCodes = {
  "i32": 127,
  "i64": 126,
  "f32": 125,
  "f64": 124,
  "anyfunc": 112,
  "func": 96,
  "emptyblock": 64
};
var FunctionBuilder = class {
  constructor(module, fnName, fnType, moduleName, fieldName) {
    if (fnType == "import") {
      this.fnType = "import";
      this.moduleName = moduleName;
      this.fieldName = fieldName;
    } else if (fnType == "internal") {
      this.fnType = "internal";
    } else {
      throw new Error("Invalid function fnType: " + fnType);
    }
    this.module = module;
    this.fnName = fnName;
    this.params = [];
    this.locals = [];
    this.localIdxByName = {};
    this.code = [];
    this.returnType = null;
    this.nextLocal = 0;
  }
  addParam(paramName, paramType) {
    if (this.localIdxByName[paramName])
      throw new Error(`param already exists. Function: ${this.fnName}, Param: ${paramName} `);
    const idx = this.nextLocal++;
    this.localIdxByName[paramName] = idx;
    this.params.push({
      type: paramType
    });
  }
  addLocal(localName, localType, _length) {
    const length = _length || 1;
    if (this.localIdxByName[localName])
      throw new Error(`local already exists. Function: ${this.fnName}, Param: ${localName} `);
    const idx = this.nextLocal++;
    this.localIdxByName[localName] = idx;
    this.locals.push({
      type: localType,
      length
    });
  }
  setReturnType(returnType) {
    if (this.returnType)
      throw new Error(`returnType already defined. Function: ${this.fnName}`);
    this.returnType = returnType;
  }
  getSignature() {
    const params = [...varuint32(this.params.length), ...this.params.map((p) => typeCodes[p.type])];
    const returns = this.returnType ? [1, typeCodes[this.returnType]] : [0];
    return [96, ...params, ...returns];
  }
  getBody() {
    const locals = this.locals.map((l) => [
      ...varuint32(l.length),
      typeCodes[l.type]
    ]);
    const body = [
      ...varuint32(this.locals.length),
      ...[].concat(...locals),
      ...this.code,
      11
    ];
    return [
      ...varuint32(body.length),
      ...body
    ];
  }
  addCode(...code) {
    this.code.push(...[].concat(...[...code]));
  }
  getCodeBuilder() {
    return new CodeBuilder(this);
  }
};
var ModuleBuilder = class {
  constructor() {
    this.functions = [];
    this.functionIdxByName = {};
    this.nImportFunctions = 0;
    this.nInternalFunctions = 0;
    this.memory = {
      pagesSize: 1,
      moduleName: "env",
      fieldName: "memory"
    };
    this.free = 8;
    this.datas = [];
    this.modules = {};
    this.exports = [];
    this.functionsTable = [];
  }
  build() {
    this._setSignatures();
    return new Uint8Array([
      ...u32(1836278016),
      ...u32(1),
      ...this._buildType(),
      ...this._buildImport(),
      ...this._buildFunctionDeclarations(),
      ...this._buildFunctionsTable(),
      ...this._buildExports(),
      ...this._buildElements(),
      ...this._buildCode(),
      ...this._buildData()
    ]);
  }
  addFunction(fnName) {
    if (typeof this.functionIdxByName[fnName] !== "undefined")
      throw new Error(`Function already defined: ${fnName}`);
    const idx = this.functions.length;
    this.functionIdxByName[fnName] = idx;
    this.functions.push(new FunctionBuilder(this, fnName, "internal"));
    this.nInternalFunctions++;
    return this.functions[idx];
  }
  addIimportFunction(fnName, moduleName, _fieldName) {
    if (typeof this.functionIdxByName[fnName] !== "undefined")
      throw new Error(`Function already defined: ${fnName}`);
    if (this.functions.length > 0 && this.functions[this.functions.length - 1].type == "internal")
      throw new Error(`Import functions must be declared before internal: ${fnName}`);
    let fieldName = _fieldName || fnName;
    const idx = this.functions.length;
    this.functionIdxByName[fnName] = idx;
    this.functions.push(new FunctionBuilder(this, fnName, "import", moduleName, fieldName));
    this.nImportFunctions++;
    return this.functions[idx];
  }
  setMemory(pagesSize, moduleName, fieldName) {
    this.memory = {
      pagesSize,
      moduleName: moduleName || "env",
      fieldName: fieldName || "memory"
    };
  }
  exportFunction(fnName, _exportName) {
    const exportName = _exportName || fnName;
    if (typeof this.functionIdxByName[fnName] === "undefined")
      throw new Error(`Function not defined: ${fnName}`);
    const idx = this.functionIdxByName[fnName];
    if (exportName != fnName) {
      this.functionIdxByName[exportName] = idx;
    }
    this.exports.push({
      exportName,
      idx
    });
  }
  addFunctionToTable(fnName) {
    const idx = this.functionIdxByName[fnName];
    this.functionsTable.push(idx);
  }
  addData(offset, bytes2) {
    this.datas.push({
      offset,
      bytes: bytes2
    });
  }
  alloc(a, b) {
    let size;
    let bytes2;
    if ((Array.isArray(a) || ArrayBuffer.isView(a)) && typeof b === "undefined") {
      size = a.length;
      bytes2 = a;
    } else {
      size = a;
      bytes2 = b;
    }
    size = (size - 1 >> 3) + 1 << 3;
    const p = this.free;
    this.free += size;
    if (bytes2) {
      this.addData(p, bytes2);
    }
    return p;
  }
  allocString(s) {
    const encoder = new globalThis.TextEncoder();
    const uint8array = encoder.encode(s);
    return this.alloc([...uint8array, 0]);
  }
  _setSignatures() {
    this.signatures = [];
    const signatureIdxByName = {};
    if (this.functionsTable.length > 0) {
      const signature = this.functions[this.functionsTable[0]].getSignature();
      const signatureName = "s_" + toHexString(signature);
      signatureIdxByName[signatureName] = 0;
      this.signatures.push(signature);
    }
    for (let i = 0; i < this.functions.length; i++) {
      const signature = this.functions[i].getSignature();
      const signatureName = "s_" + toHexString(signature);
      if (typeof signatureIdxByName[signatureName] === "undefined") {
        signatureIdxByName[signatureName] = this.signatures.length;
        this.signatures.push(signature);
      }
      this.functions[i].signatureIdx = signatureIdxByName[signatureName];
    }
  }
  _buildSection(sectionType, section) {
    return [sectionType, ...varuint32(section.length), ...section];
  }
  _buildType() {
    return this._buildSection(
      1,
      [
        ...varuint32(this.signatures.length),
        ...[].concat(...this.signatures)
      ]
    );
  }
  _buildImport() {
    const entries = [];
    entries.push([
      ...string(this.memory.moduleName),
      ...string(this.memory.fieldName),
      2,
      0,
      //Flags no init valua
      ...varuint32(this.memory.pagesSize)
    ]);
    for (let i = 0; i < this.nImportFunctions; i++) {
      entries.push([
        ...string(this.functions[i].moduleName),
        ...string(this.functions[i].fieldName),
        0,
        ...varuint32(this.functions[i].signatureIdx)
      ]);
    }
    return this._buildSection(
      2,
      varuint32(entries.length).concat(...entries)
    );
  }
  _buildFunctionDeclarations() {
    const entries = [];
    for (let i = this.nImportFunctions; i < this.nImportFunctions + this.nInternalFunctions; i++) {
      entries.push(...varuint32(this.functions[i].signatureIdx));
    }
    return this._buildSection(
      3,
      [
        ...varuint32(entries.length),
        ...[...entries]
      ]
    );
  }
  _buildFunctionsTable() {
    if (this.functionsTable.length == 0) return [];
    return this._buildSection(
      4,
      [
        ...varuint32(1),
        112,
        0,
        ...varuint32(this.functionsTable.length)
      ]
    );
  }
  _buildElements() {
    if (this.functionsTable.length == 0) return [];
    const entries = [];
    for (let i = 0; i < this.functionsTable.length; i++) {
      entries.push(...varuint32(this.functionsTable[i]));
    }
    return this._buildSection(
      9,
      [
        ...varuint32(1),
        // 1 entry
        ...varuint32(0),
        // Table (0 in MVP)
        65,
        // offset 0
        ...varint32(0),
        11,
        ...varuint32(this.functionsTable.length),
        // Number of elements
        ...[...entries]
      ]
    );
  }
  _buildExports() {
    const entries = [];
    for (let i = 0; i < this.exports.length; i++) {
      entries.push([
        ...string(this.exports[i].exportName),
        0,
        ...varuint32(this.exports[i].idx)
      ]);
    }
    return this._buildSection(
      7,
      varuint32(entries.length).concat(...entries)
    );
  }
  _buildCode() {
    const entries = [];
    for (let i = this.nImportFunctions; i < this.nImportFunctions + this.nInternalFunctions; i++) {
      entries.push(this.functions[i].getBody());
    }
    return this._buildSection(
      10,
      varuint32(entries.length).concat(...entries)
    );
  }
  _buildData() {
    const entries = [];
    entries.push([
      0,
      65,
      0,
      11,
      4,
      ...u32(this.free)
    ]);
    for (let i = 0; i < this.datas.length; i++) {
      entries.push([
        0,
        65,
        ...varint32(this.datas[i].offset),
        11,
        ...varuint32(this.datas[i].bytes.length),
        ...this.datas[i].bytes
      ]);
    }
    return this._buildSection(
      11,
      varuint32(entries.length).concat(...entries)
    );
  }
};
globalThis.curve_bn128 = null;
async function buildBn128(singleThread, plugins) {
  if (!singleThread && globalThis.curve_bn128) return globalThis.curve_bn128;
  const moduleBuilder = new ModuleBuilder();
  moduleBuilder.setMemory(25);
  buildBn128$1(moduleBuilder);
  if (plugins) plugins(moduleBuilder);
  const bn128wasm = {};
  bn128wasm.code = moduleBuilder.build();
  bn128wasm.pq = moduleBuilder.modules.f1m.pq;
  bn128wasm.pr = moduleBuilder.modules.frm.pq;
  bn128wasm.pG1gen = moduleBuilder.modules.bn128.pG1gen;
  bn128wasm.pG1zero = moduleBuilder.modules.bn128.pG1zero;
  bn128wasm.pG1b = moduleBuilder.modules.bn128.pG1b;
  bn128wasm.pG2gen = moduleBuilder.modules.bn128.pG2gen;
  bn128wasm.pG2zero = moduleBuilder.modules.bn128.pG2zero;
  bn128wasm.pG2b = moduleBuilder.modules.bn128.pG2b;
  bn128wasm.pOneT = moduleBuilder.modules.bn128.pOneT;
  bn128wasm.prePSize = moduleBuilder.modules.bn128.prePSize;
  bn128wasm.preQSize = moduleBuilder.modules.bn128.preQSize;
  bn128wasm.n8q = 32;
  bn128wasm.n8r = 32;
  bn128wasm.q = moduleBuilder.modules.bn128.q;
  bn128wasm.r = moduleBuilder.modules.bn128.r;
  const params = {
    name: "bn128",
    wasm: bn128wasm,
    q: e("21888242871839275222246405745257275088696311157297823662689037894645226208583"),
    r: e("21888242871839275222246405745257275088548364400416034343698204186575808495617"),
    n8q: 32,
    n8r: 32,
    cofactorG2: e("30644e72e131a029b85045b68181585e06ceecda572a2489345f2299c0f9fa8d", 16),
    singleThread: singleThread ? true : false
  };
  const curve3 = await buildEngine(params);
  curve3.terminate = async function() {
    if (!params.singleThread) {
      globalThis.curve_bn128 = null;
      await this.tm.terminate();
    }
  };
  if (!singleThread) {
    globalThis.curve_bn128 = curve3;
  }
  return curve3;
}
globalThis.curve_bls12381 = null;
async function buildBls12381(singleThread, plugins) {
  if (!singleThread && globalThis.curve_bls12381) return globalThis.curve_bls12381;
  const moduleBuilder = new ModuleBuilder();
  moduleBuilder.setMemory(25);
  buildBls12381$1(moduleBuilder);
  if (plugins) plugins(moduleBuilder);
  const bls12381wasm = {};
  bls12381wasm.code = moduleBuilder.build();
  bls12381wasm.pq = moduleBuilder.modules.f1m.pq;
  bls12381wasm.pr = moduleBuilder.modules.frm.pq;
  bls12381wasm.pG1gen = moduleBuilder.modules.bls12381.pG1gen;
  bls12381wasm.pG1zero = moduleBuilder.modules.bls12381.pG1zero;
  bls12381wasm.pG1b = moduleBuilder.modules.bls12381.pG1b;
  bls12381wasm.pG2gen = moduleBuilder.modules.bls12381.pG2gen;
  bls12381wasm.pG2zero = moduleBuilder.modules.bls12381.pG2zero;
  bls12381wasm.pG2b = moduleBuilder.modules.bls12381.pG2b;
  bls12381wasm.pOneT = moduleBuilder.modules.bls12381.pOneT;
  bls12381wasm.prePSize = moduleBuilder.modules.bls12381.prePSize;
  bls12381wasm.preQSize = moduleBuilder.modules.bls12381.preQSize;
  bls12381wasm.n8q = 48;
  bls12381wasm.n8r = 32;
  bls12381wasm.q = moduleBuilder.modules.bls12381.q;
  bls12381wasm.r = moduleBuilder.modules.bls12381.r;
  const params = {
    name: "bls12381",
    wasm: bls12381wasm,
    q: e("1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab", 16),
    r: e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16),
    n8q: 48,
    n8r: 32,
    cofactorG1: e("0x396c8c005555e1568c00aaab0000aaab", 16),
    cofactorG2: e("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5", 16),
    singleThread: singleThread ? true : false
  };
  const curve3 = await buildEngine(params);
  curve3.terminate = async function() {
    if (!params.singleThread) {
      globalThis.curve_bls12381 = null;
      await this.tm.terminate();
    }
  };
  if (!singleThread) {
    globalThis.curve_bls12381 = curve3;
  }
  return curve3;
}
var bls12381r = e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16);
var bn128r = e("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var bls12381q = e("1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab", 16);
var bn128q = e("21888242871839275222246405745257275088696311157297823662689037894645226208583");
var Scalar = _Scalar;
var utils = _utils;

// node_modules/snarkjs/build/browser.esm.js
var fs = {};
async function open(fileName, openFlags, cacheSize, pageSize) {
  cacheSize = cacheSize || 4096 * 64;
  if (typeof openFlags !== "number" && ["w+", "wx+", "r", "ax+", "a+"].indexOf(openFlags) < 0)
    throw new Error("Invalid open option");
  const fd = await fs.promises.open(fileName, openFlags);
  const stats = await fd.stat();
  return new FastFile(fd, stats, cacheSize, pageSize, fileName);
}
var FastFile = class {
  constructor(fd, stats, cacheSize, pageSize, fileName) {
    this.fileName = fileName;
    this.fd = fd;
    this.pos = 0;
    this.pageSize = pageSize || 1 << 8;
    while (this.pageSize < stats.blksize) {
      this.pageSize *= 2;
    }
    this.totalSize = stats.size;
    this.totalPages = Math.floor((stats.size - 1) / this.pageSize) + 1;
    this.maxPagesLoaded = Math.floor(cacheSize / this.pageSize) + 1;
    this.pages = {};
    this.pendingLoads = [];
    this.writing = false;
    this.reading = false;
    this.avBuffs = [];
    this.history = {};
  }
  _loadPage(p) {
    const self2 = this;
    const P = new Promise((resolve, reject) => {
      self2.pendingLoads.push({
        page: p,
        resolve,
        reject
      });
    });
    self2.__statusPage("After Load request: ", p);
    return P;
  }
  __statusPage(s, p) {
    const logEntry = [];
    const self2 = this;
    if (!self2.logHistory) return;
    logEntry.push("==" + s + " " + p);
    let S = "";
    for (let i = 0; i < self2.pendingLoads.length; i++) {
      if (self2.pendingLoads[i].page == p) S = S + " " + i;
    }
    if (S) logEntry.push("Pending loads:" + S);
    if (typeof self2.pages[p] != "undefined") {
      const page = self2.pages[p];
      logEntry.push("Loaded");
      logEntry.push("pendingOps: " + page.pendingOps);
      if (page.loading) logEntry.push("loading: " + page.loading);
      if (page.writing) logEntry.push("writing");
      if (page.dirty) logEntry.push("dirty");
    }
    logEntry.push("==");
    if (!self2.history[p]) self2.history[p] = [];
    self2.history[p].push(logEntry);
  }
  __printHistory(p) {
    const self2 = this;
    if (!self2.history[p]) console.log("Empty History ", p);
    console.log("History " + p);
    for (let i = 0; i < self2.history[p].length; i++) {
      for (let j = 0; j < self2.history[p][i].length; j++) {
        console.log("-> " + self2.history[p][i][j]);
      }
    }
  }
  _triggerLoad() {
    const self2 = this;
    if (self2.reading) return;
    if (self2.pendingLoads.length == 0) return;
    const pageIdxs = Object.keys(self2.pages);
    const deletablePages = [];
    for (let i = 0; i < pageIdxs.length; i++) {
      const page = self2.pages[parseInt(pageIdxs[i])];
      if (page.dirty == false && page.pendingOps == 0 && !page.writing && !page.loading) deletablePages.push(parseInt(pageIdxs[i]));
    }
    let freePages = self2.maxPagesLoaded - pageIdxs.length;
    const ops = [];
    while (self2.pendingLoads.length > 0 && (typeof self2.pages[self2.pendingLoads[0].page] != "undefined" || (freePages > 0 || deletablePages.length > 0))) {
      const load = self2.pendingLoads.shift();
      if (typeof self2.pages[load.page] != "undefined") {
        self2.pages[load.page].pendingOps++;
        const idx = deletablePages.indexOf(load.page);
        if (idx >= 0) deletablePages.splice(idx, 1);
        if (self2.pages[load.page].loading) {
          self2.pages[load.page].loading.push(load);
        } else {
          load.resolve();
        }
        self2.__statusPage("After Load (cached): ", load.page);
      } else {
        if (freePages) {
          freePages--;
        } else {
          const fp = deletablePages.shift();
          self2.__statusPage("Before Unload: ", fp);
          self2.avBuffs.unshift(self2.pages[fp]);
          delete self2.pages[fp];
          self2.__statusPage("After Unload: ", fp);
        }
        if (load.page >= self2.totalPages) {
          self2.pages[load.page] = getNewPage();
          load.resolve();
          self2.__statusPage("After Load (new): ", load.page);
        } else {
          self2.reading = true;
          self2.pages[load.page] = getNewPage();
          self2.pages[load.page].loading = [load];
          ops.push(self2.fd.read(self2.pages[load.page].buff, 0, self2.pageSize, load.page * self2.pageSize).then((res) => {
            self2.pages[load.page].size = res.bytesRead;
            const loading = self2.pages[load.page].loading;
            delete self2.pages[load.page].loading;
            for (let i = 0; i < loading.length; i++) {
              loading[i].resolve();
            }
            self2.__statusPage("After Load (loaded): ", load.page);
            return res;
          }, (err) => {
            load.reject(err);
          }));
          self2.__statusPage("After Load (loading): ", load.page);
        }
      }
    }
    Promise.all(ops).then(() => {
      self2.reading = false;
      if (self2.pendingLoads.length > 0) setImmediate(self2._triggerLoad.bind(self2));
      self2._tryClose();
    });
    function getNewPage() {
      if (self2.avBuffs.length > 0) {
        const p = self2.avBuffs.shift();
        p.dirty = false;
        p.pendingOps = 1;
        p.size = 0;
        return p;
      } else {
        return {
          dirty: false,
          buff: new Uint8Array(self2.pageSize),
          pendingOps: 1,
          size: 0
        };
      }
    }
  }
  _triggerWrite() {
    const self2 = this;
    if (self2.writing) return;
    const pageIdxs = Object.keys(self2.pages);
    const ops = [];
    for (let i = 0; i < pageIdxs.length; i++) {
      const page = self2.pages[parseInt(pageIdxs[i])];
      if (page.dirty) {
        page.dirty = false;
        page.writing = true;
        self2.writing = true;
        ops.push(self2.fd.write(page.buff, 0, page.size, parseInt(pageIdxs[i]) * self2.pageSize).then(() => {
          page.writing = false;
          return;
        }, (err) => {
          console.log("ERROR Writing: " + err);
          self2.error = err;
          self2._tryClose();
        }));
      }
    }
    if (self2.writing) {
      Promise.all(ops).then(() => {
        self2.writing = false;
        setImmediate(self2._triggerWrite.bind(self2));
        self2._tryClose();
        if (self2.pendingLoads.length > 0) setImmediate(self2._triggerLoad.bind(self2));
      });
    }
  }
  _getDirtyPage() {
    for (let p in this.pages) {
      if (this.pages[p].dirty) return p;
    }
    return -1;
  }
  async write(buff, pos) {
    if (buff.byteLength == 0) return;
    const self2 = this;
    if (typeof pos == "undefined") pos = self2.pos;
    self2.pos = pos + buff.byteLength;
    if (self2.totalSize < pos + buff.byteLength) self2.totalSize = pos + buff.byteLength;
    if (self2.pendingClose)
      throw new Error("Writing a closing file");
    const firstPage = Math.floor(pos / self2.pageSize);
    const lastPage = Math.floor((pos + buff.byteLength - 1) / self2.pageSize);
    const pagePromises = [];
    for (let i = firstPage; i <= lastPage; i++) pagePromises.push(self2._loadPage(i));
    self2._triggerLoad();
    let p = firstPage;
    let o = pos % self2.pageSize;
    let r = buff.byteLength;
    while (r > 0) {
      await pagePromises[p - firstPage];
      const l = o + r > self2.pageSize ? self2.pageSize - o : r;
      const srcView = buff.slice(buff.byteLength - r, buff.byteLength - r + l);
      const dstView = new Uint8Array(self2.pages[p].buff.buffer, o, l);
      dstView.set(srcView);
      self2.pages[p].dirty = true;
      self2.pages[p].pendingOps--;
      self2.pages[p].size = Math.max(o + l, self2.pages[p].size);
      if (p >= self2.totalPages) {
        self2.totalPages = p + 1;
      }
      r = r - l;
      p++;
      o = 0;
      if (!self2.writing) setImmediate(self2._triggerWrite.bind(self2));
    }
  }
  async read(len, pos) {
    const self2 = this;
    let buff = new Uint8Array(len);
    await self2.readToBuffer(buff, 0, len, pos);
    return buff;
  }
  async readToBuffer(buffDst, offset, len, pos) {
    if (len == 0) {
      return;
    }
    const self2 = this;
    if (len > self2.pageSize * self2.maxPagesLoaded * 0.8) {
      const cacheSize = Math.floor(len * 1.1);
      this.maxPagesLoaded = Math.floor(cacheSize / self2.pageSize) + 1;
    }
    if (typeof pos == "undefined") pos = self2.pos;
    self2.pos = pos + len;
    if (self2.pendingClose)
      throw new Error("Reading a closing file");
    const firstPage = Math.floor(pos / self2.pageSize);
    const lastPage = Math.floor((pos + len - 1) / self2.pageSize);
    const pagePromises = [];
    for (let i = firstPage; i <= lastPage; i++) pagePromises.push(self2._loadPage(i));
    self2._triggerLoad();
    let p = firstPage;
    let o = pos % self2.pageSize;
    let r = pos + len > self2.totalSize ? len - (pos + len - self2.totalSize) : len;
    while (r > 0) {
      await pagePromises[p - firstPage];
      self2.__statusPage("After Await (read): ", p);
      const l = o + r > self2.pageSize ? self2.pageSize - o : r;
      const srcView = new Uint8Array(self2.pages[p].buff.buffer, self2.pages[p].buff.byteOffset + o, l);
      buffDst.set(srcView, offset + len - r);
      self2.pages[p].pendingOps--;
      self2.__statusPage("After Op done: ", p);
      r = r - l;
      p++;
      o = 0;
      if (self2.pendingLoads.length > 0) setImmediate(self2._triggerLoad.bind(self2));
    }
    this.pos = pos + len;
  }
  _tryClose() {
    const self2 = this;
    if (!self2.pendingClose) return;
    if (self2.error) {
      self2.pendingCloseReject(self2.error);
    }
    const p = self2._getDirtyPage();
    if (p >= 0 || self2.writing || self2.reading || self2.pendingLoads.length > 0) return;
    self2.pendingClose();
  }
  close() {
    const self2 = this;
    if (self2.pendingClose)
      throw new Error("Closing the file twice");
    return new Promise((resolve, reject) => {
      self2.pendingClose = resolve;
      self2.pendingCloseReject = reject;
      self2._tryClose();
    }).then(() => {
      self2.fd.close();
    }, (err) => {
      self2.fd.close();
      throw err;
    });
  }
  async discard() {
    const self2 = this;
    await self2.close();
    await fs.promises.unlink(this.fileName);
  }
  async writeULE32(v, pos) {
    const self2 = this;
    const tmpBuff322 = new Uint8Array(4);
    const tmpBuff32v2 = new DataView(tmpBuff322.buffer);
    tmpBuff32v2.setUint32(0, v, true);
    await self2.write(tmpBuff322, pos);
  }
  async writeUBE32(v, pos) {
    const self2 = this;
    const tmpBuff322 = new Uint8Array(4);
    const tmpBuff32v2 = new DataView(tmpBuff322.buffer);
    tmpBuff32v2.setUint32(0, v, false);
    await self2.write(tmpBuff322, pos);
  }
  async writeULE64(v, pos) {
    const self2 = this;
    const tmpBuff642 = new Uint8Array(8);
    const tmpBuff64v2 = new DataView(tmpBuff642.buffer);
    tmpBuff64v2.setUint32(0, v & 4294967295, true);
    tmpBuff64v2.setUint32(4, Math.floor(v / 4294967296), true);
    await self2.write(tmpBuff642, pos);
  }
  async readULE32(pos) {
    const self2 = this;
    const b = await self2.read(4, pos);
    const view = new Uint32Array(b.buffer);
    return view[0];
  }
  async readUBE32(pos) {
    const self2 = this;
    const b = await self2.read(4, pos);
    const view = new DataView(b.buffer);
    return view.getUint32(0, false);
  }
  async readULE64(pos) {
    const self2 = this;
    const b = await self2.read(8, pos);
    const view = new Uint32Array(b.buffer);
    return view[1] * 4294967296 + view[0];
  }
  async readString(pos) {
    const self2 = this;
    if (self2.pendingClose) {
      throw new Error("Reading a closing file");
    }
    let currentPosition = typeof pos == "undefined" ? self2.pos : pos;
    let currentPage = Math.floor(currentPosition / self2.pageSize);
    let endOfStringFound = false;
    let str = "";
    while (!endOfStringFound) {
      let pagePromise = self2._loadPage(currentPage);
      self2._triggerLoad();
      await pagePromise;
      self2.__statusPage("After Await (read): ", currentPage);
      let offsetOnPage = currentPosition % self2.pageSize;
      const dataArray = new Uint8Array(
        self2.pages[currentPage].buff.buffer,
        self2.pages[currentPage].buff.byteOffset + offsetOnPage,
        self2.pageSize - offsetOnPage
      );
      let indexEndOfString = dataArray.findIndex((element) => element === 0);
      endOfStringFound = indexEndOfString !== -1;
      if (endOfStringFound) {
        str += new TextDecoder().decode(dataArray.slice(0, indexEndOfString));
        self2.pos = currentPage * this.pageSize + offsetOnPage + indexEndOfString + 1;
      } else {
        str += new TextDecoder().decode(dataArray);
        self2.pos = currentPage * this.pageSize + offsetOnPage + dataArray.length;
      }
      self2.pages[currentPage].pendingOps--;
      self2.__statusPage("After Op done: ", currentPage);
      currentPosition = self2.pos;
      currentPage++;
      if (self2.pendingLoads.length > 0) setImmediate(self2._triggerLoad.bind(self2));
    }
    return str;
  }
};
function createNew$1(o) {
  const initialSize = o.initialSize || 1 << 20;
  const fd = new MemFile();
  fd.o = o;
  fd.o.data = new Uint8Array(initialSize);
  fd.allocSize = initialSize;
  fd.totalSize = 0;
  fd.readOnly = false;
  fd.pos = 0;
  return fd;
}
function readExisting$2(o) {
  const fd = new MemFile();
  fd.o = o;
  fd.allocSize = o.data.byteLength;
  fd.totalSize = o.data.byteLength;
  fd.readOnly = true;
  fd.pos = 0;
  return fd;
}
var tmpBuff32$1 = new Uint8Array(4);
var tmpBuff32v$1 = new DataView(tmpBuff32$1.buffer);
var tmpBuff64$1 = new Uint8Array(8);
var tmpBuff64v$1 = new DataView(tmpBuff64$1.buffer);
var MemFile = class {
  constructor() {
    this.pageSize = 1 << 14;
  }
  _resizeIfNeeded(newLen) {
    if (newLen > this.allocSize) {
      const newAllocSize = Math.max(
        this.allocSize + (1 << 20),
        Math.floor(this.allocSize * 1.1),
        newLen
      );
      const newData = new Uint8Array(newAllocSize);
      newData.set(this.o.data);
      this.o.data = newData;
      this.allocSize = newAllocSize;
    }
  }
  async write(buff, pos) {
    const self2 = this;
    if (typeof pos == "undefined") pos = self2.pos;
    if (this.readOnly) throw new Error("Writing a read only file");
    this._resizeIfNeeded(pos + buff.byteLength);
    this.o.data.set(buff.slice(), pos);
    if (pos + buff.byteLength > this.totalSize) this.totalSize = pos + buff.byteLength;
    this.pos = pos + buff.byteLength;
  }
  async readToBuffer(buffDest, offset, len, pos) {
    const self2 = this;
    if (typeof pos == "undefined") pos = self2.pos;
    if (this.readOnly) {
      if (pos + len > this.totalSize) throw new Error("Reading out of bounds");
    }
    this._resizeIfNeeded(pos + len);
    const buffSrc = new Uint8Array(this.o.data.buffer, this.o.data.byteOffset + pos, len);
    buffDest.set(buffSrc, offset);
    this.pos = pos + len;
  }
  async read(len, pos) {
    const self2 = this;
    const buff = new Uint8Array(len);
    await self2.readToBuffer(buff, 0, len, pos);
    return buff;
  }
  close() {
    if (this.o.data.byteLength != this.totalSize) {
      this.o.data = this.o.data.slice(0, this.totalSize);
    }
  }
  async discard() {
  }
  async writeULE32(v, pos) {
    const self2 = this;
    tmpBuff32v$1.setUint32(0, v, true);
    await self2.write(tmpBuff32$1, pos);
  }
  async writeUBE32(v, pos) {
    const self2 = this;
    tmpBuff32v$1.setUint32(0, v, false);
    await self2.write(tmpBuff32$1, pos);
  }
  async writeULE64(v, pos) {
    const self2 = this;
    tmpBuff64v$1.setUint32(0, v & 4294967295, true);
    tmpBuff64v$1.setUint32(4, Math.floor(v / 4294967296), true);
    await self2.write(tmpBuff64$1, pos);
  }
  async readULE32(pos) {
    const self2 = this;
    const b = await self2.read(4, pos);
    const view = new Uint32Array(b.buffer);
    return view[0];
  }
  async readUBE32(pos) {
    const self2 = this;
    const b = await self2.read(4, pos);
    const view = new DataView(b.buffer);
    return view.getUint32(0, false);
  }
  async readULE64(pos) {
    const self2 = this;
    const b = await self2.read(8, pos);
    const view = new Uint32Array(b.buffer);
    return view[1] * 4294967296 + view[0];
  }
  async readString(pos) {
    const self2 = this;
    let currentPosition = typeof pos == "undefined" ? self2.pos : pos;
    if (currentPosition > this.totalSize) {
      if (this.readOnly) {
        throw new Error("Reading out of bounds");
      }
      this._resizeIfNeeded(pos);
    }
    const dataArray = new Uint8Array(
      self2.o.data.buffer,
      currentPosition,
      this.totalSize - currentPosition
    );
    let indexEndOfString = dataArray.findIndex((element) => element === 0);
    let endOfStringFound = indexEndOfString !== -1;
    let str = "";
    if (endOfStringFound) {
      str = new TextDecoder().decode(dataArray.slice(0, indexEndOfString));
      self2.pos = currentPosition + indexEndOfString + 1;
    } else {
      self2.pos = currentPosition;
    }
    return str;
  }
};
var PAGE_SIZE2 = 1 << 22;
function createNew(o) {
  const initialSize = o.initialSize || 0;
  const fd = new BigMemFile();
  fd.o = o;
  const nPages = initialSize ? Math.floor((initialSize - 1) / PAGE_SIZE2) + 1 : 0;
  fd.o.data = [];
  for (let i = 0; i < nPages - 1; i++) {
    fd.o.data.push(new Uint8Array(PAGE_SIZE2));
  }
  if (nPages) fd.o.data.push(new Uint8Array(initialSize - PAGE_SIZE2 * (nPages - 1)));
  fd.totalSize = 0;
  fd.readOnly = false;
  fd.pos = 0;
  return fd;
}
function readExisting$1(o) {
  const fd = new BigMemFile();
  fd.o = o;
  fd.totalSize = (o.data.length - 1) * PAGE_SIZE2 + o.data[o.data.length - 1].byteLength;
  fd.readOnly = true;
  fd.pos = 0;
  return fd;
}
var tmpBuff32 = new Uint8Array(4);
var tmpBuff32v = new DataView(tmpBuff32.buffer);
var tmpBuff64 = new Uint8Array(8);
var tmpBuff64v = new DataView(tmpBuff64.buffer);
var BigMemFile = class {
  constructor() {
    this.pageSize = 1 << 14;
  }
  _resizeIfNeeded(newLen) {
    if (newLen <= this.totalSize) return;
    if (this.readOnly) throw new Error("Reading out of file bounds");
    const nPages = Math.floor((newLen - 1) / PAGE_SIZE2) + 1;
    for (let i = Math.max(this.o.data.length - 1, 0); i < nPages; i++) {
      const newSize = i < nPages - 1 ? PAGE_SIZE2 : newLen - (nPages - 1) * PAGE_SIZE2;
      const p = new Uint8Array(newSize);
      if (i == this.o.data.length - 1) p.set(this.o.data[i]);
      this.o.data[i] = p;
    }
    this.totalSize = newLen;
  }
  async write(buff, pos) {
    const self2 = this;
    if (typeof pos == "undefined") pos = self2.pos;
    if (this.readOnly) throw new Error("Writing a read only file");
    this._resizeIfNeeded(pos + buff.byteLength);
    const firstPage = Math.floor(pos / PAGE_SIZE2);
    let p = firstPage;
    let o = pos % PAGE_SIZE2;
    let r = buff.byteLength;
    while (r > 0) {
      const l = o + r > PAGE_SIZE2 ? PAGE_SIZE2 - o : r;
      const srcView = buff.slice(buff.byteLength - r, buff.byteLength - r + l);
      const dstView = new Uint8Array(self2.o.data[p].buffer, o, l);
      dstView.set(srcView);
      r = r - l;
      p++;
      o = 0;
    }
    this.pos = pos + buff.byteLength;
  }
  async readToBuffer(buffDst, offset, len, pos) {
    const self2 = this;
    if (typeof pos == "undefined") pos = self2.pos;
    if (this.readOnly) {
      if (pos + len > this.totalSize) throw new Error("Reading out of bounds");
    }
    this._resizeIfNeeded(pos + len);
    const firstPage = Math.floor(pos / PAGE_SIZE2);
    let p = firstPage;
    let o = pos % PAGE_SIZE2;
    let r = len;
    while (r > 0) {
      const l = o + r > PAGE_SIZE2 ? PAGE_SIZE2 - o : r;
      const srcView = new Uint8Array(self2.o.data[p].buffer, o, l);
      buffDst.set(srcView, offset + len - r);
      r = r - l;
      p++;
      o = 0;
    }
    this.pos = pos + len;
  }
  async read(len, pos) {
    const self2 = this;
    const buff = new Uint8Array(len);
    await self2.readToBuffer(buff, 0, len, pos);
    return buff;
  }
  close() {
  }
  async discard() {
  }
  async writeULE32(v, pos) {
    const self2 = this;
    tmpBuff32v.setUint32(0, v, true);
    await self2.write(tmpBuff32, pos);
  }
  async writeUBE32(v, pos) {
    const self2 = this;
    tmpBuff32v.setUint32(0, v, false);
    await self2.write(tmpBuff32, pos);
  }
  async writeULE64(v, pos) {
    const self2 = this;
    tmpBuff64v.setUint32(0, v & 4294967295, true);
    tmpBuff64v.setUint32(4, Math.floor(v / 4294967296), true);
    await self2.write(tmpBuff64, pos);
  }
  async readULE32(pos) {
    const self2 = this;
    const b = await self2.read(4, pos);
    const view = new Uint32Array(b.buffer);
    return view[0];
  }
  async readUBE32(pos) {
    const self2 = this;
    const b = await self2.read(4, pos);
    const view = new DataView(b.buffer);
    return view.getUint32(0, false);
  }
  async readULE64(pos) {
    const self2 = this;
    const b = await self2.read(8, pos);
    const view = new Uint32Array(b.buffer);
    return view[1] * 4294967296 + view[0];
  }
  async readString(pos) {
    const self2 = this;
    const fixedSize = 2048;
    let currentPosition = typeof pos == "undefined" ? self2.pos : pos;
    if (currentPosition > this.totalSize) {
      if (this.readOnly) {
        throw new Error("Reading out of bounds");
      }
      this._resizeIfNeeded(pos);
    }
    let endOfStringFound = false;
    let str = "";
    while (!endOfStringFound) {
      let currentPage = Math.floor(currentPosition / PAGE_SIZE2);
      let offsetOnPage = currentPosition % PAGE_SIZE2;
      if (self2.o.data[currentPage] === void 0) {
        throw new Error("ERROR");
      }
      let readLength = Math.min(fixedSize, self2.o.data[currentPage].length - offsetOnPage);
      const dataArray = new Uint8Array(self2.o.data[currentPage].buffer, offsetOnPage, readLength);
      let indexEndOfString = dataArray.findIndex((element) => element === 0);
      endOfStringFound = indexEndOfString !== -1;
      if (endOfStringFound) {
        str += new TextDecoder().decode(dataArray.slice(0, indexEndOfString));
        self2.pos = currentPage * PAGE_SIZE2 + offsetOnPage + indexEndOfString + 1;
      } else {
        str += new TextDecoder().decode(dataArray);
        self2.pos = currentPage * PAGE_SIZE2 + offsetOnPage + dataArray.length;
      }
      currentPosition = self2.pos;
    }
    return str;
  }
};
var O_TRUNC = 1024;
var O_CREAT = 512;
var O_RDWR = 2;
var O_RDONLY = 0;
var DEFAULT_CACHE_SIZE = 1 << 16;
var DEFAULT_PAGE_SIZE = 1 << 13;
async function createOverride(o, b, c) {
  if (typeof o === "string") {
    o = {
      type: "file",
      fileName: o,
      cacheSize: b || DEFAULT_CACHE_SIZE,
      pageSize: c || DEFAULT_PAGE_SIZE
    };
  }
  if (o.type == "file") {
    return await open(o.fileName, O_TRUNC | O_CREAT | O_RDWR, o.cacheSize, o.pageSize);
  } else if (o.type == "mem") {
    return createNew$1(o);
  } else if (o.type == "bigMem") {
    return createNew(o);
  } else {
    throw new Error("Invalid FastFile type: " + o.type);
  }
}
async function readExisting(o, b, c) {
  if (o instanceof Uint8Array) {
    o = {
      type: "mem",
      data: o
    };
  }
  {
    if (typeof o === "string") {
      const buff = await fetch(o).then(function(res) {
        return res.arrayBuffer();
      }).then(function(ab) {
        return new Uint8Array(ab);
      });
      o = {
        type: "mem",
        data: buff
      };
    }
  }
  if (o.type == "file") {
    return await open(o.fileName, O_RDONLY, o.cacheSize, o.pageSize);
  } else if (o.type == "mem") {
    return await readExisting$2(o);
  } else if (o.type == "bigMem") {
    return await readExisting$1(o);
  } else {
    throw new Error("Invalid FastFile type: " + o.type);
  }
}
async function readBinFile(fileName, type, maxVersion, cacheSize, pageSize) {
  const fd = await readExisting(fileName);
  const b = await fd.read(4);
  let readedType = "";
  for (let i = 0; i < 4; i++) readedType += String.fromCharCode(b[i]);
  if (readedType != type) throw new Error(fileName + ": Invalid File format");
  let v = await fd.readULE32();
  if (v > maxVersion) throw new Error("Version not supported");
  const nSections = await fd.readULE32();
  let sections = [];
  for (let i = 0; i < nSections; i++) {
    let ht = await fd.readULE32();
    let hl = await fd.readULE64();
    if (typeof sections[ht] == "undefined") sections[ht] = [];
    sections[ht].push({
      p: fd.pos,
      size: hl
    });
    fd.pos += hl;
  }
  return { fd, sections };
}
async function createBinFile(fileName, type, version2, nSections, cacheSize, pageSize) {
  const fd = await createOverride(fileName, cacheSize, pageSize);
  const buff = new Uint8Array(4);
  for (let i = 0; i < 4; i++) buff[i] = type.charCodeAt(i);
  await fd.write(buff, 0);
  await fd.writeULE32(version2);
  await fd.writeULE32(nSections);
  return fd;
}
async function startWriteSection(fd, idSection) {
  if (typeof fd.writingSection !== "undefined") throw new Error("Already writing a section");
  await fd.writeULE32(idSection);
  fd.writingSection = {
    pSectionSize: fd.pos
  };
  await fd.writeULE64(0);
}
async function endWriteSection(fd) {
  if (typeof fd.writingSection === "undefined") throw new Error("Not writing a section");
  const sectionSize = fd.pos - fd.writingSection.pSectionSize - 8;
  const oldPos = fd.pos;
  fd.pos = fd.writingSection.pSectionSize;
  await fd.writeULE64(sectionSize);
  fd.pos = oldPos;
  delete fd.writingSection;
}
async function startReadUniqueSection(fd, sections, idSection) {
  if (typeof fd.readingSection !== "undefined") throw new Error("Already reading a section");
  if (!sections[idSection]) throw new Error(fd.fileName + ": Missing section " + idSection);
  if (sections[idSection].length > 1) throw new Error(fd.fileName + ": Section Duplicated " + idSection);
  fd.pos = sections[idSection][0].p;
  fd.readingSection = sections[idSection][0];
}
async function endReadSection(fd, noCheck) {
  if (typeof fd.readingSection === "undefined") throw new Error("Not reading a section");
  if (!noCheck) {
    if (fd.pos - fd.readingSection.p != fd.readingSection.size) throw new Error("Invalid section size reading");
  }
  delete fd.readingSection;
}
async function writeBigInt(fd, n, n8, pos) {
  const buff = new Uint8Array(n8);
  Scalar.toRprLE(buff, 0, n, n8);
  await fd.write(buff, pos);
}
async function readBigInt(fd, n8, pos) {
  const buff = await fd.read(n8, pos);
  return Scalar.fromRprLE(buff, 0, n8);
}
async function readSection(fd, sections, idSection, offset, length) {
  offset = typeof offset === "undefined" ? 0 : offset;
  length = typeof length === "undefined" ? sections[idSection][0].size - offset : length;
  if (offset + length > sections[idSection][0].size) {
    throw new Error("Reading out of the range of the section");
  }
  let buff;
  if (length < 1 << 30) {
    buff = new Uint8Array(length);
  } else {
    buff = new BigBuffer(length);
  }
  await fd.readToBuffer(buff, 0, length, sections[idSection][0].p + offset);
  return buff;
}
var bls12381r$1 = Scalar.e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16);
var bn128r$1 = Scalar.e("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var bls12381q2 = Scalar.e("1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab", 16);
var bn128q2 = Scalar.e("21888242871839275222246405745257275088696311157297823662689037894645226208583");
async function getCurveFromQ(q, options) {
  let curve3;
  let singleThread = options && options.singleThread;
  if (Scalar.eq(q, bn128q2)) {
    curve3 = await buildBn128(singleThread);
  } else if (Scalar.eq(q, bls12381q2)) {
    curve3 = await buildBls12381(singleThread);
  } else {
    throw new Error(`Curve not supported: ${Scalar.toString(q)}`);
  }
  return curve3;
}
async function getCurveFromName(name, options) {
  let curve3;
  let singleThread = options && options.singleThread;
  const normName = normalizeName(name);
  if (["BN128", "BN254", "ALTBN128"].indexOf(normName) >= 0) {
    curve3 = await buildBn128(singleThread);
  } else if (["BLS12381"].indexOf(normName) >= 0) {
    curve3 = await buildBls12381(singleThread);
  } else {
    throw new Error(`Curve not supported: ${name}`);
  }
  return curve3;
  function normalizeName(n) {
    return n.toUpperCase().match(/[A-Za-z0-9]+/g).join("");
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var blake2bWasm = { exports: {} };
var nanoassert = assert$1;
var AssertionError = class extends Error {
};
AssertionError.prototype.name = "AssertionError";
function assert$1(t, m) {
  if (!t) {
    var err = new AssertionError(m);
    if (Error.captureStackTrace) Error.captureStackTrace(err, assert$1);
    throw err;
  }
}
var browser = { exports: {} };
function byteLength$4(string2) {
  return string2.length;
}
function toString$4(buffer) {
  const len = buffer.byteLength;
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buffer[i]);
  }
  return result;
}
function write$5(buffer, string2, offset = 0, length = byteLength$4(string2)) {
  const len = Math.min(length, buffer.byteLength - offset);
  for (let i = 0; i < len; i++) {
    buffer[offset + i] = string2.charCodeAt(i);
  }
  return len;
}
var ascii = {
  byteLength: byteLength$4,
  toString: toString$4,
  write: write$5
};
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var codes = new Uint8Array(256);
for (let i = 0; i < alphabet.length; i++) {
  codes[alphabet.charCodeAt(i)] = i;
}
codes[
  /* - */
  45
] = 62;
codes[
  /* _ */
  95
] = 63;
function byteLength$3(string2) {
  let len = string2.length;
  if (string2.charCodeAt(len - 1) === 61) len--;
  if (len > 1 && string2.charCodeAt(len - 1) === 61) len--;
  return len * 3 >>> 2;
}
function toString$3(buffer) {
  const len = buffer.byteLength;
  let result = "";
  for (let i = 0; i < len; i += 3) {
    result += alphabet[buffer[i] >> 2] + alphabet[(buffer[i] & 3) << 4 | buffer[i + 1] >> 4] + alphabet[(buffer[i + 1] & 15) << 2 | buffer[i + 2] >> 6] + alphabet[buffer[i + 2] & 63];
  }
  if (len % 3 === 2) {
    result = result.substring(0, result.length - 1) + "=";
  } else if (len % 3 === 1) {
    result = result.substring(0, result.length - 2) + "==";
  }
  return result;
}
function write$4(buffer, string2, offset = 0, length = byteLength$3(string2)) {
  const len = Math.min(length, buffer.byteLength - offset);
  for (let i = 0, j = 0; j < len; i += 4) {
    const a = codes[string2.charCodeAt(i)];
    const b = codes[string2.charCodeAt(i + 1)];
    const c = codes[string2.charCodeAt(i + 2)];
    const d = codes[string2.charCodeAt(i + 3)];
    buffer[j++] = a << 2 | b >> 4;
    buffer[j++] = (b & 15) << 4 | c >> 2;
    buffer[j++] = (c & 3) << 6 | d & 63;
  }
  return len;
}
var base64 = {
  byteLength: byteLength$3,
  toString: toString$3,
  write: write$4
};
function byteLength$2(string2) {
  return string2.length >>> 1;
}
function toString$2(buffer) {
  const len = buffer.byteLength;
  buffer = new DataView(buffer.buffer, buffer.byteOffset, len);
  let result = "";
  let i = 0;
  for (let n = len - len % 4; i < n; i += 4) {
    result += buffer.getUint32(i).toString(16).padStart(8, "0");
  }
  for (; i < len; i++) {
    result += buffer.getUint8(i).toString(16).padStart(2, "0");
  }
  return result;
}
function write$3(buffer, string2, offset = 0, length = byteLength$2(string2)) {
  const len = Math.min(length, buffer.byteLength - offset);
  for (let i = 0; i < len; i++) {
    const a = hexValue(string2.charCodeAt(i * 2));
    const b = hexValue(string2.charCodeAt(i * 2 + 1));
    if (a === void 0 || b === void 0) {
      return buffer.subarray(0, i);
    }
    buffer[offset + i] = a << 4 | b;
  }
  return len;
}
var hex = {
  byteLength: byteLength$2,
  toString: toString$2,
  write: write$3
};
function hexValue(char) {
  if (char >= 48 && char <= 57) return char - 48;
  if (char >= 65 && char <= 70) return char - 65 + 10;
  if (char >= 97 && char <= 102) return char - 97 + 10;
}
function byteLength$1(string2) {
  let length = 0;
  for (let i = 0, n = string2.length; i < n; i++) {
    const code = string2.charCodeAt(i);
    if (code >= 55296 && code <= 56319 && i + 1 < n) {
      const code2 = string2.charCodeAt(i + 1);
      if (code2 >= 56320 && code2 <= 57343) {
        length += 4;
        i++;
        continue;
      }
    }
    if (code <= 127) length += 1;
    else if (code <= 2047) length += 2;
    else length += 3;
  }
  return length;
}
var toString$1;
if (typeof TextDecoder !== "undefined") {
  const decoder = new TextDecoder();
  toString$1 = function toString3(buffer) {
    return decoder.decode(buffer);
  };
} else {
  toString$1 = function toString3(buffer) {
    const len = buffer.byteLength;
    let output2 = "";
    let i = 0;
    while (i < len) {
      let byte = buffer[i];
      if (byte <= 127) {
        output2 += String.fromCharCode(byte);
        i++;
        continue;
      }
      let bytesNeeded = 0;
      let codePoint = 0;
      if (byte <= 223) {
        bytesNeeded = 1;
        codePoint = byte & 31;
      } else if (byte <= 239) {
        bytesNeeded = 2;
        codePoint = byte & 15;
      } else if (byte <= 244) {
        bytesNeeded = 3;
        codePoint = byte & 7;
      }
      if (len - i - bytesNeeded > 0) {
        let k = 0;
        while (k < bytesNeeded) {
          byte = buffer[i + k + 1];
          codePoint = codePoint << 6 | byte & 63;
          k += 1;
        }
      } else {
        codePoint = 65533;
        bytesNeeded = len - i;
      }
      output2 += String.fromCodePoint(codePoint);
      i += bytesNeeded + 1;
    }
    return output2;
  };
}
var write$2;
if (typeof TextEncoder !== "undefined") {
  const encoder = new TextEncoder();
  write$2 = function write(buffer, string2, offset = 0, length = byteLength$1(string2)) {
    const len = Math.min(length, buffer.byteLength - offset);
    encoder.encodeInto(string2, buffer.subarray(offset, offset + len));
    return len;
  };
} else {
  write$2 = function write(buffer, string2, offset = 0, length = byteLength$1(string2)) {
    const len = Math.min(length, buffer.byteLength - offset);
    buffer = buffer.subarray(offset, offset + len);
    let i = 0;
    let j = 0;
    while (i < string2.length) {
      const code = string2.codePointAt(i);
      if (code <= 127) {
        buffer[j++] = code;
        i++;
        continue;
      }
      let count = 0;
      let bits2 = 0;
      if (code <= 2047) {
        count = 6;
        bits2 = 192;
      } else if (code <= 65535) {
        count = 12;
        bits2 = 224;
      } else if (code <= 2097151) {
        count = 18;
        bits2 = 240;
      }
      buffer[j++] = bits2 | code >> count;
      count -= 6;
      while (count >= 0) {
        buffer[j++] = 128 | code >> count & 63;
        count -= 6;
      }
      i += code >= 65536 ? 2 : 1;
    }
    return len;
  };
}
var utf8 = {
  byteLength: byteLength$1,
  toString: toString$1,
  write: write$2
};
function byteLength(string2) {
  return string2.length * 2;
}
function toString2(buffer) {
  const len = buffer.byteLength;
  let result = "";
  for (let i = 0; i < len - 1; i += 2) {
    result += String.fromCharCode(buffer[i] + buffer[i + 1] * 256);
  }
  return result;
}
function write$1(buffer, string2, offset = 0, length = byteLength(string2)) {
  const len = Math.min(length, buffer.byteLength - offset);
  let units = len;
  for (let i = 0; i < string2.length; ++i) {
    if ((units -= 2) < 0) break;
    const c = string2.charCodeAt(i);
    const hi = c >> 8;
    const lo = c % 256;
    buffer[offset + i * 2] = lo;
    buffer[offset + i * 2 + 1] = hi;
  }
  return len;
}
var utf16le = {
  byteLength,
  toString: toString2,
  write: write$1
};
(function(module, exports) {
  const ascii$1 = ascii;
  const base64$1 = base64;
  const hex$1 = hex;
  const utf8$1 = utf8;
  const utf16le$1 = utf16le;
  const LE = new Uint8Array(Uint16Array.of(255).buffer)[0] === 255;
  function codecFor(encoding) {
    switch (encoding) {
      case "ascii":
        return ascii$1;
      case "base64":
        return base64$1;
      case "hex":
        return hex$1;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8$1;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16le$1;
      default:
        throw new Error(`Unknown encoding: ${encoding}`);
    }
  }
  function isBuffer2(value) {
    return value instanceof Uint8Array;
  }
  function isEncoding(encoding) {
    try {
      codecFor(encoding);
      return true;
    } catch {
      return false;
    }
  }
  function alloc(size, fill2, encoding) {
    const buffer = new Uint8Array(size);
    if (fill2 !== void 0) exports.fill(buffer, fill2, 0, buffer.byteLength, encoding);
    return buffer;
  }
  function allocUnsafe(size) {
    return new Uint8Array(size);
  }
  function allocUnsafeSlow(size) {
    return new Uint8Array(size);
  }
  function byteLength2(string2, encoding) {
    return codecFor(encoding).byteLength(string2);
  }
  function compare2(a, b) {
    if (a === b) return 0;
    const len = Math.min(a.byteLength, b.byteLength);
    a = new DataView(a.buffer, a.byteOffset, a.byteLength);
    b = new DataView(b.buffer, b.byteOffset, b.byteLength);
    let i = 0;
    for (let n = len - len % 4; i < n; i += 4) {
      const x = a.getUint32(i, LE);
      const y = b.getUint32(i, LE);
      if (x !== y) break;
    }
    for (; i < len; i++) {
      const x = a.getUint8(i);
      const y = b.getUint8(i);
      if (x < y) return -1;
      if (x > y) return 1;
    }
    return a.byteLength > b.byteLength ? 1 : a.byteLength < b.byteLength ? -1 : 0;
  }
  function concat2(buffers, totalLength) {
    if (totalLength === void 0) {
      totalLength = buffers.reduce((len, buffer) => len + buffer.byteLength, 0);
    }
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const buffer of buffers) {
      if (offset + buffer.byteLength > result.byteLength) {
        const sub2 = buffer.subarray(0, result.byteLength - offset);
        result.set(sub2, offset);
        return result;
      }
      result.set(buffer, offset);
      offset += buffer.byteLength;
    }
    return result;
  }
  function copy(source, target, targetStart = 0, start = 0, end = source.byteLength) {
    if (end > 0 && end < start) return 0;
    if (end === start) return 0;
    if (source.byteLength === 0 || target.byteLength === 0) return 0;
    if (targetStart < 0) throw new RangeError("targetStart is out of range");
    if (start < 0 || start >= source.byteLength) throw new RangeError("sourceStart is out of range");
    if (end < 0) throw new RangeError("sourceEnd is out of range");
    if (targetStart >= target.byteLength) targetStart = target.byteLength;
    if (end > source.byteLength) end = source.byteLength;
    if (target.byteLength - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (source === target) {
      target.copyWithin(targetStart, start, end);
    } else {
      target.set(source.subarray(start, end), targetStart);
    }
    return len;
  }
  function equals(a, b) {
    if (a === b) return true;
    if (a.byteLength !== b.byteLength) return false;
    const len = a.byteLength;
    a = new DataView(a.buffer, a.byteOffset, a.byteLength);
    b = new DataView(b.buffer, b.byteOffset, b.byteLength);
    let i = 0;
    for (let n = len - len % 4; i < n; i += 4) {
      if (a.getUint32(i, LE) !== b.getUint32(i, LE)) return false;
    }
    for (; i < len; i++) {
      if (a.getUint8(i) !== b.getUint8(i)) return false;
    }
    return true;
  }
  function fill(buffer, value, offset, end, encoding) {
    if (typeof value === "string") {
      if (typeof offset === "string") {
        encoding = offset;
        offset = 0;
        end = buffer.byteLength;
      } else if (typeof end === "string") {
        encoding = end;
        end = buffer.byteLength;
      }
    } else if (typeof value === "number") {
      value = value & 255;
    } else if (typeof value === "boolean") {
      value = +value;
    }
    if (offset < 0 || buffer.byteLength < offset || buffer.byteLength < end) {
      throw new RangeError("Out of range index");
    }
    if (offset === void 0) offset = 0;
    if (end === void 0) end = buffer.byteLength;
    if (end <= offset) return buffer;
    if (!value) value = 0;
    if (typeof value === "number") {
      for (let i = offset; i < end; ++i) {
        buffer[i] = value;
      }
    } else {
      value = isBuffer2(value) ? value : from(value, encoding);
      const len = value.byteLength;
      for (let i = 0; i < end - offset; ++i) {
        buffer[i + offset] = value[i % len];
      }
    }
    return buffer;
  }
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") return fromString2(value, encodingOrOffset);
    if (Array.isArray(value)) return fromArray2(value);
    if (ArrayBuffer.isView(value)) return fromBuffer(value);
    return fromArrayBuffer(value, encodingOrOffset, length);
  }
  function fromString2(string2, encoding) {
    const codec = codecFor(encoding);
    const buffer = new Uint8Array(codec.byteLength(string2));
    codec.write(buffer, string2, 0, buffer.byteLength);
    return buffer;
  }
  function fromArray2(array) {
    const buffer = new Uint8Array(array.length);
    buffer.set(array);
    return buffer;
  }
  function fromBuffer(buffer) {
    const copy2 = new Uint8Array(buffer.byteLength);
    copy2.set(buffer);
    return copy2;
  }
  function fromArrayBuffer(arrayBuffer, byteOffset, length) {
    return new Uint8Array(arrayBuffer, byteOffset, length);
  }
  function includes(buffer, value, byteOffset, encoding) {
    return indexOf(buffer, value, byteOffset, encoding) !== -1;
  }
  function bidirectionalIndexOf(buffer, value, byteOffset, encoding, first) {
    if (buffer.byteLength === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset === void 0) {
      byteOffset = first ? 0 : buffer.length - 1;
    } else if (byteOffset < 0) {
      byteOffset += buffer.byteLength;
    }
    if (byteOffset >= buffer.byteLength) {
      if (first) return -1;
      else byteOffset = buffer.byteLength - 1;
    } else if (byteOffset < 0) {
      if (first) byteOffset = 0;
      else return -1;
    }
    if (typeof value === "string") {
      value = from(value, encoding);
    } else if (typeof value === "number") {
      value = value & 255;
      if (first) {
        return buffer.indexOf(value, byteOffset);
      } else {
        return buffer.lastIndexOf(value, byteOffset);
      }
    }
    if (value.byteLength === 0) return -1;
    if (first) {
      let foundIndex = -1;
      for (let i = byteOffset; i < buffer.byteLength; i++) {
        if (buffer[i] === value[foundIndex === -1 ? 0 : i - foundIndex]) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === value.byteLength) return foundIndex;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + value.byteLength > buffer.byteLength) {
        byteOffset = buffer.byteLength - value.byteLength;
      }
      for (let i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < value.byteLength; j++) {
          if (buffer[i + j] !== value[j]) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
    return -1;
  }
  function indexOf(buffer, value, byteOffset, encoding) {
    return bidirectionalIndexOf(
      buffer,
      value,
      byteOffset,
      encoding,
      true
      /* first */
    );
  }
  function lastIndexOf(buffer, value, byteOffset, encoding) {
    return bidirectionalIndexOf(
      buffer,
      value,
      byteOffset,
      encoding,
      false
      /* last */
    );
  }
  function swap(buffer, n, m) {
    const i = buffer[n];
    buffer[n] = buffer[m];
    buffer[m] = i;
  }
  function swap16(buffer) {
    const len = buffer.byteLength;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let i = 0; i < len; i += 2) swap(buffer, i, i + 1);
    return buffer;
  }
  function swap32(buffer) {
    const len = buffer.byteLength;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let i = 0; i < len; i += 4) {
      swap(buffer, i, i + 3);
      swap(buffer, i + 1, i + 2);
    }
    return buffer;
  }
  function swap64(buffer) {
    const len = buffer.byteLength;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let i = 0; i < len; i += 8) {
      swap(buffer, i, i + 7);
      swap(buffer, i + 1, i + 6);
      swap(buffer, i + 2, i + 5);
      swap(buffer, i + 3, i + 4);
    }
    return buffer;
  }
  function toBuffer(buffer) {
    return buffer;
  }
  function toString3(buffer, encoding, start = 0, end = buffer.byteLength) {
    const len = buffer.byteLength;
    if (start >= len) return "";
    if (end <= start) return "";
    if (start < 0) start = 0;
    if (end > len) end = len;
    if (start !== 0 || end < len) buffer = buffer.subarray(start, end);
    return codecFor(encoding).toString(buffer);
  }
  function write(buffer, string2, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      offset = void 0;
    } else if (encoding === void 0 && typeof length === "string") {
      encoding = length;
      length = void 0;
    }
    return codecFor(encoding).write(buffer, string2, offset, length);
  }
  function writeDoubleLE(buffer, value, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    view.setFloat64(offset, value, true);
    return offset + 8;
  }
  function writeFloatLE(buffer, value, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    view.setFloat32(offset, value, true);
    return offset + 4;
  }
  function writeUInt32LE(buffer, value, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    view.setUint32(offset, value, true);
    return offset + 4;
  }
  function writeInt32LE(buffer, value, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    view.setInt32(offset, value, true);
    return offset + 4;
  }
  function readDoubleLE(buffer, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return view.getFloat64(offset, true);
  }
  function readFloatLE(buffer, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return view.getFloat32(offset, true);
  }
  function readUInt32LE(buffer, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return view.getUint32(offset, true);
  }
  function readInt32LE(buffer, offset) {
    if (offset === void 0) offset = 0;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return view.getInt32(offset, true);
  }
  module.exports = exports = {
    isBuffer: isBuffer2,
    isEncoding,
    alloc,
    allocUnsafe,
    allocUnsafeSlow,
    byteLength: byteLength2,
    compare: compare2,
    concat: concat2,
    copy,
    equals,
    fill,
    from,
    includes,
    indexOf,
    lastIndexOf,
    swap16,
    swap32,
    swap64,
    toBuffer,
    toString: toString3,
    write,
    writeDoubleLE,
    writeFloatLE,
    writeUInt32LE,
    writeInt32LE,
    readDoubleLE,
    readFloatLE,
    readUInt32LE,
    readInt32LE
  };
})(browser, browser.exports);
var blake2b;
var hasRequiredBlake2b;
function requireBlake2b() {
  if (hasRequiredBlake2b) return blake2b;
  hasRequiredBlake2b = 1;
  var __commonJS2 = (cb, mod2) => function __require() {
    return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __toBinary = /* @__PURE__ */ (() => {
    var table = new Uint8Array(128);
    for (var i = 0; i < 64; i++)
      table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
    return (base642) => {
      var n = base642.length, bytes22 = new Uint8Array((n - (base642[n - 1] == "=") - (base642[n - 2] == "=")) * 3 / 4 | 0);
      for (var i2 = 0, j = 0; i2 < n; ) {
        var c0 = table[base642.charCodeAt(i2++)], c1 = table[base642.charCodeAt(i2++)];
        var c2 = table[base642.charCodeAt(i2++)], c3 = table[base642.charCodeAt(i2++)];
        bytes22[j++] = c0 << 2 | c1 >> 4;
        bytes22[j++] = c1 << 4 | c2 >> 2;
        bytes22[j++] = c2 << 6 | c3;
      }
      return bytes22;
    };
  })();
  var require_blake2b = __commonJS2({
    "wasm-binary:./blake2b.wat"(exports2, module2) {
      module2.exports = __toBinary("AGFzbQEAAAABEANgAn9/AGADf39/AGABfwADBQQAAQICBQUBAQroBwdNBQZtZW1vcnkCAAxibGFrZTJiX2luaXQAAA5ibGFrZTJiX3VwZGF0ZQABDWJsYWtlMmJfZmluYWwAAhBibGFrZTJiX2NvbXByZXNzAAMKvz8EwAIAIABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCAAQgA3AyAgAEIANwMoIABCADcDMCAAQgA3AzggAEIANwNAIABCADcDSCAAQgA3A1AgAEIANwNYIABCADcDYCAAQgA3A2ggAEIANwNwIABCADcDeCAAQoiS853/zPmE6gBBACkDAIU3A4ABIABCu86qptjQ67O7f0EIKQMAhTcDiAEgAEKr8NP0r+68tzxBECkDAIU3A5ABIABC8e30+KWn/aelf0EYKQMAhTcDmAEgAELRhZrv+s+Uh9EAQSApAwCFNwOgASAAQp/Y+dnCkdqCm39BKCkDAIU3A6gBIABC6/qG2r+19sEfQTApAwCFNwOwASAAQvnC+JuRo7Pw2wBBOCkDAIU3A7gBIABCADcDwAEgAEIANwPIASAAQgA3A9ABC20BA38gAEHAAWohAyAAQcgBaiEEIAQpAwCnIQUCQANAIAEgAkYNASAFQYABRgRAIAMgAykDACAFrXw3AwBBACEFIAAQAwsgACAFaiABLQAAOgAAIAVBAWohBSABQQFqIQEMAAsLIAQgBa03AwALYQEDfyAAQcABaiEBIABByAFqIQIgASABKQMAIAIpAwB8NwMAIABCfzcD0AEgAikDAKchAwJAA0AgA0GAAUYNASAAIANqQQA6AAAgA0EBaiEDDAALCyACIAOtNwMAIAAQAwuqOwIgfgl/IABBgAFqISEgAEGIAWohIiAAQZABaiEjIABBmAFqISQgAEGgAWohJSAAQagBaiEmIABBsAFqIScgAEG4AWohKCAhKQMAIQEgIikDACECICMpAwAhAyAkKQMAIQQgJSkDACEFICYpAwAhBiAnKQMAIQcgKCkDACEIQoiS853/zPmE6gAhCUK7zqqm2NDrs7t/IQpCq/DT9K/uvLc8IQtC8e30+KWn/aelfyEMQtGFmu/6z5SH0QAhDUKf2PnZwpHagpt/IQ5C6/qG2r+19sEfIQ9C+cL4m5Gjs/DbACEQIAApAwAhESAAKQMIIRIgACkDECETIAApAxghFCAAKQMgIRUgACkDKCEWIAApAzAhFyAAKQM4IRggACkDQCEZIAApA0ghGiAAKQNQIRsgACkDWCEcIAApA2AhHSAAKQNoIR4gACkDcCEfIAApA3ghICANIAApA8ABhSENIA8gACkD0AGFIQ8gASAFIBF8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSASfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgE3x8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBR8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAVfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgFnx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBd8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAYfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgGXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBp8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAbfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgHHx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIB18fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAefHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgH3x8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFICB8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAffHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgG3x8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBV8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAZfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgGnx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHICB8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAefHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggF3x8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBJ8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAdfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgEXx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBN8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAcfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggGHx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBZ8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAUfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgHHx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBl8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAdfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgEXx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBZ8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByATfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggIHx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIB58fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAbfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgH3x8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBR8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAXfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggGHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBJ8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAafHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFXx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBh8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAafHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgFHx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBJ8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAefHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgHXx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBx8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAffHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgE3x8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBd8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAWfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgG3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBV8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCARfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgIHx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBl8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAafHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgEXx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBZ8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAYfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgE3x8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBV8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAbfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggIHx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIB98fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiASfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgHHx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIB18fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAXfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggGXx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBR8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAefHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgE3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIB18fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAXfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgG3x8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBF8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAcfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggGXx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBR8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAVfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgHnx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBh8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAWfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggIHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIB98fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSASfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgGnx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIB18fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAWfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgEnx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGICB8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAffHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgHnx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBV8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAbfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgEXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBh8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAXfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgFHx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBp8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCATfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgGXx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBx8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAefHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgHHx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBh8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAffHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgHXx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBJ8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAUfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggGnx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBZ8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiARfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgIHx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBV8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAZfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggF3x8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBN8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAbfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgF3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFICB8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAffHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGnx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBx8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAUfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggEXx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBl8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAdfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgE3x8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIB58fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAYfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggEnx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBV8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAbfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFnx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBt8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSATfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgGXx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBV8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAYfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgF3x8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBJ8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAWfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgIHx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBx8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAafHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgH3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBR8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAdfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgHnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBF8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSARfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgEnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBN8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAUfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgFXx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBZ8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAXfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggGHx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBl8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAafHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgG3x8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBx8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAdfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggHnx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIB98fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAgfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgH3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBt8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAVfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGXx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBp8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAgfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggHnx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBd8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiASfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgHXx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBF8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByATfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggHHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBh8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAWfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFHx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgISAhKQMAIAEgCYWFNwMAICIgIikDACACIAqFhTcDACAjICMpAwAgAyALhYU3AwAgJCAkKQMAIAQgDIWFNwMAICUgJSkDACAFIA2FhTcDACAmICYpAwAgBiAOhYU3AwAgJyAnKQMAIAcgD4WFNwMAICggKCkDACAIIBCFhTcDAAs=");
    }
  });
  var bytes2 = require_blake2b();
  var compiled = WebAssembly.compile(bytes2);
  blake2b = async (imports) => {
    const instance = await WebAssembly.instantiate(await compiled, imports);
    return instance.exports;
  };
  return blake2b;
}
var assert = nanoassert;
var b4a = browser.exports;
var wasm = null;
var wasmPromise = typeof WebAssembly !== "undefined" && requireBlake2b()().then((mod2) => {
  wasm = mod2;
});
var head = 64;
var freeList = [];
blake2bWasm.exports = Blake2b;
var BYTES_MIN = blake2bWasm.exports.BYTES_MIN = 16;
var BYTES_MAX = blake2bWasm.exports.BYTES_MAX = 64;
blake2bWasm.exports.BYTES = 32;
var KEYBYTES_MIN = blake2bWasm.exports.KEYBYTES_MIN = 16;
var KEYBYTES_MAX = blake2bWasm.exports.KEYBYTES_MAX = 64;
blake2bWasm.exports.KEYBYTES = 32;
var SALTBYTES = blake2bWasm.exports.SALTBYTES = 16;
var PERSONALBYTES = blake2bWasm.exports.PERSONALBYTES = 16;
function Blake2b(digestLength, key, salt, personal, noAssert) {
  if (!(this instanceof Blake2b)) return new Blake2b(digestLength, key, salt, personal, noAssert);
  if (!wasm) throw new Error("WASM not loaded. Wait for Blake2b.ready(cb)");
  if (!digestLength) digestLength = 32;
  if (noAssert !== true) {
    assert(digestLength >= BYTES_MIN, "digestLength must be at least " + BYTES_MIN + ", was given " + digestLength);
    assert(digestLength <= BYTES_MAX, "digestLength must be at most " + BYTES_MAX + ", was given " + digestLength);
    if (key != null) {
      assert(key instanceof Uint8Array, "key must be Uint8Array or Buffer");
      assert(key.length >= KEYBYTES_MIN, "key must be at least " + KEYBYTES_MIN + ", was given " + key.length);
      assert(key.length <= KEYBYTES_MAX, "key must be at least " + KEYBYTES_MAX + ", was given " + key.length);
    }
    if (salt != null) {
      assert(salt instanceof Uint8Array, "salt must be Uint8Array or Buffer");
      assert(salt.length === SALTBYTES, "salt must be exactly " + SALTBYTES + ", was given " + salt.length);
    }
    if (personal != null) {
      assert(personal instanceof Uint8Array, "personal must be Uint8Array or Buffer");
      assert(personal.length === PERSONALBYTES, "personal must be exactly " + PERSONALBYTES + ", was given " + personal.length);
    }
  }
  if (!freeList.length) {
    freeList.push(head);
    head += 216;
  }
  this.digestLength = digestLength;
  this.finalized = false;
  this.pointer = freeList.pop();
  this._memory = new Uint8Array(wasm.memory.buffer);
  this._memory.fill(0, 0, 64);
  this._memory[0] = this.digestLength;
  this._memory[1] = key ? key.length : 0;
  this._memory[2] = 1;
  this._memory[3] = 1;
  if (salt) this._memory.set(salt, 32);
  if (personal) this._memory.set(personal, 48);
  if (this.pointer + 216 > this._memory.length) this._realloc(this.pointer + 216);
  wasm.blake2b_init(this.pointer, this.digestLength);
  if (key) {
    this.update(key);
    this._memory.fill(0, head, head + key.length);
    this._memory[this.pointer + 200] = 128;
  }
}
Blake2b.prototype._realloc = function(size) {
  wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
  this._memory = new Uint8Array(wasm.memory.buffer);
};
Blake2b.prototype.update = function(input) {
  assert(this.finalized === false, "Hash instance finalized");
  assert(input instanceof Uint8Array, "input must be Uint8Array or Buffer");
  if (head + input.length > this._memory.length) this._realloc(head + input.length);
  this._memory.set(input, head);
  wasm.blake2b_update(this.pointer, head, head + input.length);
  return this;
};
Blake2b.prototype.digest = function(enc) {
  assert(this.finalized === false, "Hash instance finalized");
  this.finalized = true;
  freeList.push(this.pointer);
  wasm.blake2b_final(this.pointer);
  if (!enc || enc === "binary") {
    return this._memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength);
  }
  if (typeof enc === "string") {
    return b4a.toString(this._memory, enc, this.pointer + 128, this.pointer + 128 + this.digestLength);
  }
  assert(enc instanceof Uint8Array && enc.length >= this.digestLength, "input must be Uint8Array or Buffer");
  for (var i = 0; i < this.digestLength; i++) {
    enc[i] = this._memory[this.pointer + 128 + i];
  }
  return enc;
};
Blake2b.prototype.final = Blake2b.prototype.digest;
Blake2b.WASM = wasm;
Blake2b.SUPPORTED = typeof WebAssembly !== "undefined";
Blake2b.ready = function(cb) {
  if (!cb) cb = noop;
  if (!wasmPromise) return cb(new Error("WebAssembly not supported"));
  return wasmPromise.then(() => cb(), cb);
};
Blake2b.prototype.ready = Blake2b.ready;
Blake2b.prototype.getPartialHash = function() {
  return this._memory.slice(this.pointer, this.pointer + 216);
};
Blake2b.prototype.setPartialHash = function(ph) {
  this._memory.set(ph, this.pointer);
};
function noop() {
}
function log22(V) {
  return ((V & 4294901760) !== 0 ? (V &= 4294901760, 16) : 0) | ((V & 4278255360) !== 0 ? (V &= 4278255360, 8) : 0) | ((V & 4042322160) !== 0 ? (V &= 4042322160, 4) : 0) | ((V & 3435973836) !== 0 ? (V &= 3435973836, 2) : 0) | (V & 2863311530) !== 0;
}
var GROTH16_PROTOCOL_ID = 1;
var PLONK_PROTOCOL_ID = 2;
var FFLONK_PROTOCOL_ID = 10;
var ZKEY_FF_HEADER_SECTION = 2;
async function readG1(fd, curve3, toObject) {
  const buff = await fd.read(curve3.G1.F.n8 * 2);
  const res = curve3.G1.fromRprLEM(buff, 0);
  return toObject ? curve3.G1.toObject(res) : res;
}
async function readG2(fd, curve3, toObject) {
  const buff = await fd.read(curve3.G2.F.n8 * 2);
  const res = curve3.G2.fromRprLEM(buff, 0);
  return toObject ? curve3.G2.toObject(res) : res;
}
async function readHeader$1(fd, sections, toObject, options) {
  await startReadUniqueSection(fd, sections, 1);
  const protocolId = await fd.readULE32();
  await endReadSection(fd);
  if (protocolId === GROTH16_PROTOCOL_ID) {
    return await readHeaderGroth16(fd, sections, toObject, options);
  } else if (protocolId === PLONK_PROTOCOL_ID) {
    return await readHeaderPlonk(fd, sections, toObject, options);
  } else if (protocolId === FFLONK_PROTOCOL_ID) {
    return await readHeaderFFlonk(fd, sections, toObject, options);
  } else {
    throw new Error("Protocol not supported: ");
  }
}
async function readHeaderGroth16(fd, sections, toObject, options) {
  const zkey = {};
  zkey.protocol = "groth16";
  await startReadUniqueSection(fd, sections, 2);
  const n8q = await fd.readULE32();
  zkey.n8q = n8q;
  zkey.q = await readBigInt(fd, n8q);
  const n8r = await fd.readULE32();
  zkey.n8r = n8r;
  zkey.r = await readBigInt(fd, n8r);
  zkey.curve = await getCurveFromQ(zkey.q, options);
  zkey.nVars = await fd.readULE32();
  zkey.nPublic = await fd.readULE32();
  zkey.domainSize = await fd.readULE32();
  zkey.power = log22(zkey.domainSize);
  zkey.vk_alpha_1 = await readG1(fd, zkey.curve, toObject);
  zkey.vk_beta_1 = await readG1(fd, zkey.curve, toObject);
  zkey.vk_beta_2 = await readG2(fd, zkey.curve, toObject);
  zkey.vk_gamma_2 = await readG2(fd, zkey.curve, toObject);
  zkey.vk_delta_1 = await readG1(fd, zkey.curve, toObject);
  zkey.vk_delta_2 = await readG2(fd, zkey.curve, toObject);
  await endReadSection(fd);
  return zkey;
}
async function readHeaderPlonk(fd, sections, toObject, options) {
  const zkey = {};
  zkey.protocol = "plonk";
  await startReadUniqueSection(fd, sections, 2);
  const n8q = await fd.readULE32();
  zkey.n8q = n8q;
  zkey.q = await readBigInt(fd, n8q);
  const n8r = await fd.readULE32();
  zkey.n8r = n8r;
  zkey.r = await readBigInt(fd, n8r);
  zkey.curve = await getCurveFromQ(zkey.q, options);
  zkey.nVars = await fd.readULE32();
  zkey.nPublic = await fd.readULE32();
  zkey.domainSize = await fd.readULE32();
  zkey.power = log22(zkey.domainSize);
  zkey.nAdditions = await fd.readULE32();
  zkey.nConstraints = await fd.readULE32();
  zkey.k1 = await fd.read(n8r);
  zkey.k2 = await fd.read(n8r);
  zkey.Qm = await readG1(fd, zkey.curve, toObject);
  zkey.Ql = await readG1(fd, zkey.curve, toObject);
  zkey.Qr = await readG1(fd, zkey.curve, toObject);
  zkey.Qo = await readG1(fd, zkey.curve, toObject);
  zkey.Qc = await readG1(fd, zkey.curve, toObject);
  zkey.S1 = await readG1(fd, zkey.curve, toObject);
  zkey.S2 = await readG1(fd, zkey.curve, toObject);
  zkey.S3 = await readG1(fd, zkey.curve, toObject);
  zkey.X_2 = await readG2(fd, zkey.curve, toObject);
  await endReadSection(fd);
  return zkey;
}
async function readHeaderFFlonk(fd, sections, toObject, options) {
  const zkey = {};
  zkey.protocol = "fflonk";
  zkey.protocolId = FFLONK_PROTOCOL_ID;
  await startReadUniqueSection(fd, sections, ZKEY_FF_HEADER_SECTION);
  const n8q = await fd.readULE32();
  zkey.n8q = n8q;
  zkey.q = await readBigInt(fd, n8q);
  zkey.curve = await getCurveFromQ(zkey.q, options);
  const n8r = await fd.readULE32();
  zkey.n8r = n8r;
  zkey.r = await readBigInt(fd, n8r);
  zkey.nVars = await fd.readULE32();
  zkey.nPublic = await fd.readULE32();
  zkey.domainSize = await fd.readULE32();
  zkey.power = log22(zkey.domainSize);
  zkey.nAdditions = await fd.readULE32();
  zkey.nConstraints = await fd.readULE32();
  zkey.k1 = await fd.read(n8r);
  zkey.k2 = await fd.read(n8r);
  zkey.w3 = await fd.read(n8r);
  zkey.w4 = await fd.read(n8r);
  zkey.w8 = await fd.read(n8r);
  zkey.wr = await fd.read(n8r);
  zkey.X_2 = await readG2(fd, zkey.curve, toObject);
  zkey.C0 = await readG1(fd, zkey.curve, toObject);
  await endReadSection(fd);
  return zkey;
}
async function writeBin(fd, witnessBin, prime) {
  await startWriteSection(fd, 1);
  const n8 = (Math.floor((Scalar.bitLength(prime) - 1) / 64) + 1) * 8;
  await fd.writeULE32(n8);
  await writeBigInt(fd, prime, n8);
  if (witnessBin.byteLength % n8 != 0) {
    throw new Error("Invalid witness length");
  }
  await fd.writeULE32(witnessBin.byteLength / n8);
  await endWriteSection(fd);
  await startWriteSection(fd, 2);
  await fd.write(witnessBin);
  await endWriteSection(fd);
}
async function readHeader(fd, sections) {
  await startReadUniqueSection(fd, sections, 1);
  const n8 = await fd.readULE32();
  const q = await readBigInt(fd, n8);
  const nWitness = await fd.readULE32();
  await endReadSection(fd);
  return { n8, q, nWitness };
}
var { stringifyBigInts: stringifyBigInts$4 } = utils;
async function groth16Prove(zkeyFileName, witnessFileName, logger, options) {
  const { fd: fdWtns, sections: sectionsWtns } = await readBinFile(witnessFileName, "wtns", 2);
  const wtns = await readHeader(fdWtns, sectionsWtns);
  const { fd: fdZKey, sections: sectionsZKey } = await readBinFile(zkeyFileName, "zkey", 2);
  const zkey = await readHeader$1(fdZKey, sectionsZKey, void 0, options);
  if (zkey.protocol != "groth16") {
    throw new Error("zkey file is not groth16");
  }
  if (!Scalar.eq(zkey.r, wtns.q)) {
    throw new Error("Curve of the witness does not match the curve of the proving key");
  }
  if (wtns.nWitness != zkey.nVars) {
    throw new Error(`Invalid witness length. Circuit: ${zkey.nVars}, witness: ${wtns.nWitness}`);
  }
  const curve3 = zkey.curve;
  const Fr = curve3.Fr;
  const G1 = curve3.G1;
  const G2 = curve3.G2;
  const power = log22(zkey.domainSize);
  if (logger) logger.debug("Reading Wtns");
  const buffWitness = await readSection(fdWtns, sectionsWtns, 2);
  if (logger) logger.debug("Reading Coeffs");
  const buffCoeffs = await readSection(fdZKey, sectionsZKey, 4);
  if (logger) logger.debug("Building ABC");
  const [buffA_T, buffB_T, buffC_T] = await buildABC1(curve3, zkey, buffWitness, buffCoeffs, logger);
  const inc = power == Fr.s ? curve3.Fr.shift : curve3.Fr.w[power + 1];
  const buffA = await Fr.ifft(buffA_T, "", "", logger, "IFFT_A");
  const buffAodd = await Fr.batchApplyKey(buffA, Fr.e(1), inc);
  const buffAodd_T = await Fr.fft(buffAodd, "", "", logger, "FFT_A");
  const buffB = await Fr.ifft(buffB_T, "", "", logger, "IFFT_B");
  const buffBodd = await Fr.batchApplyKey(buffB, Fr.e(1), inc);
  const buffBodd_T = await Fr.fft(buffBodd, "", "", logger, "FFT_B");
  const buffC = await Fr.ifft(buffC_T, "", "", logger, "IFFT_C");
  const buffCodd = await Fr.batchApplyKey(buffC, Fr.e(1), inc);
  const buffCodd_T = await Fr.fft(buffCodd, "", "", logger, "FFT_C");
  if (logger) logger.debug("Join ABC");
  const buffPodd_T = await joinABC(curve3, zkey, buffAodd_T, buffBodd_T, buffCodd_T, logger);
  let proof = {};
  if (logger) logger.debug("Reading A Points");
  const buffBasesA = await readSection(fdZKey, sectionsZKey, 5);
  proof.pi_a = await curve3.G1.multiExpAffine(buffBasesA, buffWitness, logger, "multiexp A");
  if (logger) logger.debug("Reading B1 Points");
  const buffBasesB1 = await readSection(fdZKey, sectionsZKey, 6);
  let pib1 = await curve3.G1.multiExpAffine(buffBasesB1, buffWitness, logger, "multiexp B1");
  if (logger) logger.debug("Reading B2 Points");
  const buffBasesB2 = await readSection(fdZKey, sectionsZKey, 7);
  proof.pi_b = await curve3.G2.multiExpAffine(buffBasesB2, buffWitness, logger, "multiexp B2");
  if (logger) logger.debug("Reading C Points");
  const buffBasesC = await readSection(fdZKey, sectionsZKey, 8);
  proof.pi_c = await curve3.G1.multiExpAffine(buffBasesC, buffWitness.slice((zkey.nPublic + 1) * curve3.Fr.n8), logger, "multiexp C");
  if (logger) logger.debug("Reading H Points");
  const buffBasesH = await readSection(fdZKey, sectionsZKey, 9);
  const resH = await curve3.G1.multiExpAffine(buffBasesH, buffPodd_T, logger, "multiexp H");
  const r = curve3.Fr.random();
  const s = curve3.Fr.random();
  proof.pi_a = G1.add(proof.pi_a, zkey.vk_alpha_1);
  proof.pi_a = G1.add(proof.pi_a, G1.timesFr(zkey.vk_delta_1, r));
  proof.pi_b = G2.add(proof.pi_b, zkey.vk_beta_2);
  proof.pi_b = G2.add(proof.pi_b, G2.timesFr(zkey.vk_delta_2, s));
  pib1 = G1.add(pib1, zkey.vk_beta_1);
  pib1 = G1.add(pib1, G1.timesFr(zkey.vk_delta_1, s));
  proof.pi_c = G1.add(proof.pi_c, resH);
  proof.pi_c = G1.add(proof.pi_c, G1.timesFr(proof.pi_a, s));
  proof.pi_c = G1.add(proof.pi_c, G1.timesFr(pib1, r));
  proof.pi_c = G1.add(proof.pi_c, G1.timesFr(zkey.vk_delta_1, Fr.neg(Fr.mul(r, s))));
  let publicSignals = [];
  for (let i = 1; i <= zkey.nPublic; i++) {
    const b = buffWitness.slice(i * Fr.n8, i * Fr.n8 + Fr.n8);
    publicSignals.push(Scalar.fromRprLE(b));
  }
  proof.pi_a = G1.toObject(G1.toAffine(proof.pi_a));
  proof.pi_b = G2.toObject(G2.toAffine(proof.pi_b));
  proof.pi_c = G1.toObject(G1.toAffine(proof.pi_c));
  proof.protocol = "groth16";
  proof.curve = curve3.name;
  await fdZKey.close();
  await fdWtns.close();
  proof = stringifyBigInts$4(proof);
  publicSignals = stringifyBigInts$4(publicSignals);
  return { proof, publicSignals };
}
async function buildABC1(curve3, zkey, witness, coeffs, logger) {
  const n8 = curve3.Fr.n8;
  const sCoef = 4 * 3 + zkey.n8r;
  const nCoef = (coeffs.byteLength - 4) / sCoef;
  const outBuffA = new BigBuffer(zkey.domainSize * n8);
  const outBuffB = new BigBuffer(zkey.domainSize * n8);
  const outBuffC = new BigBuffer(zkey.domainSize * n8);
  const outBuf = [outBuffA, outBuffB];
  for (let i = 0; i < nCoef; i++) {
    if (logger && i % 1e6 == 0) logger.debug(`QAP AB: ${i}/${nCoef}`);
    const buffCoef = coeffs.slice(4 + i * sCoef, 4 + i * sCoef + sCoef);
    const buffCoefV = new DataView(buffCoef.buffer);
    const m = buffCoefV.getUint32(0, true);
    const c = buffCoefV.getUint32(4, true);
    const s = buffCoefV.getUint32(8, true);
    const coef = buffCoef.slice(12, 12 + n8);
    outBuf[m].set(
      curve3.Fr.add(
        outBuf[m].slice(c * n8, c * n8 + n8),
        curve3.Fr.mul(coef, witness.slice(s * n8, s * n8 + n8))
      ),
      c * n8
    );
  }
  for (let i = 0; i < zkey.domainSize; i++) {
    if (logger && i % 1e6 == 0) logger.debug(`QAP C: ${i}/${zkey.domainSize}`);
    outBuffC.set(
      curve3.Fr.mul(
        outBuffA.slice(i * n8, i * n8 + n8),
        outBuffB.slice(i * n8, i * n8 + n8)
      ),
      i * n8
    );
  }
  return [outBuffA, outBuffB, outBuffC];
}
async function joinABC(curve3, zkey, a, b, c, logger) {
  const MAX_CHUNK_SIZE = 1 << 22;
  const n8 = curve3.Fr.n8;
  const nElements = Math.floor(a.byteLength / curve3.Fr.n8);
  const promises = [];
  for (let i = 0; i < nElements; i += MAX_CHUNK_SIZE) {
    if (logger) logger.debug(`JoinABC: ${i}/${nElements}`);
    const n = Math.min(nElements - i, MAX_CHUNK_SIZE);
    const task = [];
    const aChunk = a.slice(i * n8, (i + n) * n8);
    const bChunk = b.slice(i * n8, (i + n) * n8);
    const cChunk = c.slice(i * n8, (i + n) * n8);
    task.push({ cmd: "ALLOCSET", var: 0, buff: aChunk });
    task.push({ cmd: "ALLOCSET", var: 1, buff: bChunk });
    task.push({ cmd: "ALLOCSET", var: 2, buff: cChunk });
    task.push({ cmd: "ALLOC", var: 3, len: n * n8 });
    task.push({ cmd: "CALL", fnName: "qap_joinABC", params: [
      { var: 0 },
      { var: 1 },
      { var: 2 },
      { val: n },
      { var: 3 }
    ] });
    task.push({ cmd: "CALL", fnName: "frm_batchFromMontgomery", params: [
      { var: 3 },
      { val: n },
      { var: 3 }
    ] });
    task.push({ cmd: "GET", out: 0, var: 3, len: n * n8 });
    promises.push(curve3.tm.queueAction(task));
  }
  const result = await Promise.all(promises);
  let outBuff;
  if (a instanceof BigBuffer) {
    outBuff = new BigBuffer(a.byteLength);
  } else {
    outBuff = new Uint8Array(a.byteLength);
  }
  let p = 0;
  for (let i = 0; i < result.length; i++) {
    outBuff.set(result[i][0], p);
    p += result[i][0].byteLength;
  }
  return outBuff;
}
function flatArray(a) {
  let res = [];
  fillArray(res, a);
  return res;
  function fillArray(res2, a2) {
    if (Array.isArray(a2)) {
      for (let i = 0; i < a2.length; i++) {
        fillArray(res2, a2[i]);
      }
    } else {
      res2.push(a2);
    }
  }
}
function normalize(n, prime) {
  let res = BigInt(n) % prime;
  if (res < 0) res += prime;
  return res;
}
function fnvHash(str) {
  const uint64_max = BigInt(2) ** BigInt(64);
  let hash2 = BigInt("0xCBF29CE484222325");
  for (let i = 0; i < str.length; i++) {
    hash2 ^= BigInt(str[i].charCodeAt(0));
    hash2 *= BigInt(1099511628211);
    hash2 %= uint64_max;
  }
  let shash = hash2.toString(16);
  let n = 16 - shash.length;
  shash = "0".repeat(n).concat(shash);
  return shash;
}
function toArray32(s, size) {
  const res = [];
  let rem = BigInt(s);
  const radix = BigInt(4294967296);
  while (rem) {
    res.unshift(Number(rem % radix));
    rem = rem / radix;
  }
  if (size) {
    let i = size - res.length;
    while (i > 0) {
      res.unshift(0);
      i--;
    }
  }
  return res;
}
async function builder(code, options) {
  let instance;
  let wc;
  let memory;
  options = options || {};
  let majorVersion = 1;
  let minorVersion = 0;
  let patchVersion = 0;
  let codeIsWebAssemblyInstance = false;
  if (code instanceof WebAssembly.Instance) {
    instance = code;
    codeIsWebAssemblyInstance = true;
  } else {
    let memorySize = 32767;
    if (options.memorySize) {
      memorySize = parseInt(options.memorySize);
      if (memorySize < 0) {
        throw new Error("Invalid memory size");
      }
    }
    let memoryAllocated = false;
    while (!memoryAllocated) {
      try {
        memory = new WebAssembly.Memory({ initial: memorySize });
        memoryAllocated = true;
      } catch (err) {
        if (memorySize <= 1) {
          throw err;
        }
        console.warn("Could not allocate " + memorySize * 1024 * 64 + " bytes. This may cause severe instability. Trying with " + memorySize * 1024 * 64 / 2 + " bytes");
        memorySize = Math.floor(memorySize / 2);
      }
    }
    const wasmModule = await WebAssembly.compile(code);
    let errStr = "";
    let msgStr = "";
    instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        "memory": memory
      },
      runtime: {
        printDebug: function(value) {
          console.log("printDebug:", value);
        },
        exceptionHandler: function(code2) {
          let err;
          if (code2 === 1) {
            err = "Signal not found. ";
          } else if (code2 === 2) {
            err = "Too many signals set. ";
          } else if (code2 === 3) {
            err = "Signal already set. ";
          } else if (code2 === 4) {
            err = "Assert Failed. ";
          } else if (code2 === 5) {
            err = "Not enough memory. ";
          } else if (code2 === 6) {
            err = "Input signal array access exceeds the size. ";
          } else {
            err = "Unknown error. ";
          }
          console.error("ERROR: ", code2, errStr);
          throw new Error(err + errStr);
        },
        // A new way of logging messages was added in Circom 2.0.7 that requires 2 new imports
        // `printErrorMessage` and `writeBufferMessage`.
        printErrorMessage: function() {
          errStr += getMessage() + "\n";
        },
        writeBufferMessage: function() {
          const msg = getMessage();
          if (msg === "\n") {
            console.log(msgStr);
            msgStr = "";
          } else {
            if (msgStr !== "") {
              msgStr += " ";
            }
            msgStr += msg;
          }
        },
        showSharedRWMemory: function() {
          const shared_rw_memory_size = instance.exports.getFieldNumLen32();
          const arr = new Uint32Array(shared_rw_memory_size);
          for (let j = 0; j < shared_rw_memory_size; j++) {
            arr[shared_rw_memory_size - 1 - j] = instance.exports.readSharedRWMemory(j);
          }
          if (majorVersion >= 2 && (minorVersion >= 1 || patchVersion >= 7)) {
            if (msgStr !== "") {
              msgStr += " ";
            }
            const msg = Scalar.fromArray(arr, 4294967296).toString();
            msgStr += msg;
          } else {
            console.log(Scalar.fromArray(arr, 4294967296));
          }
        },
        error: function(code2, pstr, a, b, c, d) {
          let errStr2;
          if (code2 === 7) {
            errStr2 = p2str(pstr) + " " + wc.getFr(b).toString() + " != " + wc.getFr(c).toString() + " " + p2str(d);
          } else if (code2 === 9) {
            errStr2 = p2str(pstr) + " " + wc.getFr(b).toString() + " " + p2str(c);
          } else if (code2 === 5 && options.sym) {
            errStr2 = p2str(pstr) + " " + options.sym.labelIdx2Name[c];
          } else {
            errStr2 = p2str(pstr) + " " + a + " " + b + " " + c + " " + d;
          }
          console.log("ERROR: ", code2, errStr2);
          throw new Error(errStr2);
        },
        log: function(a) {
          console.log(wc.getFr(a).toString());
        },
        logGetSignal: function(signal, pVal) {
          if (options.logGetSignal) {
            options.logGetSignal(signal, wc.getFr(pVal));
          }
        },
        logSetSignal: function(signal, pVal) {
          if (options.logSetSignal) {
            options.logSetSignal(signal, wc.getFr(pVal));
          }
        },
        logStartComponent: function(cIdx) {
          if (options.logStartComponent) {
            options.logStartComponent(cIdx);
          }
        },
        logFinishComponent: function(cIdx) {
          if (options.logFinishComponent) {
            options.logFinishComponent(cIdx);
          }
        }
      }
    });
  }
  if (typeof instance.exports.getVersion == "function") {
    majorVersion = instance.exports.getVersion();
  }
  if (typeof instance.exports.getMinorVersion == "function") {
    minorVersion = instance.exports.getMinorVersion();
  }
  if (typeof instance.exports.getPatchVersion == "function") {
    patchVersion = instance.exports.getPatchVersion();
  }
  const sanityCheck = options && (options.sanityCheck || options.logGetSignal || options.logSetSignal || options.logStartComponent || options.logFinishComponent);
  if (majorVersion === 2) {
    wc = new WitnessCalculatorCircom2(instance, sanityCheck);
  } else if (majorVersion === 1) {
    if (codeIsWebAssemblyInstance) {
      throw new Error("Loading code from WebAssembly instance is not supported for circom version 1");
    }
    wc = new WitnessCalculatorCircom1(memory, instance, sanityCheck);
  } else {
    throw new Error(`Unsupported circom version: ${majorVersion}`);
  }
  return wc;
  function getMessage() {
    let message = "";
    let c = instance.exports.getMessageChar();
    while (c !== 0) {
      message += String.fromCharCode(c);
      c = instance.exports.getMessageChar();
    }
    return message;
  }
  function p2str(p) {
    const i8 = new Uint8Array(memory.buffer);
    const bytes2 = [];
    for (let i = 0; i8[p + i] > 0; i++) bytes2.push(i8[p + i]);
    return String.fromCharCode.apply(null, bytes2);
  }
}
var WitnessCalculatorCircom1 = class {
  constructor(memory, instance, sanityCheck) {
    this.memory = memory;
    this.i32 = new Uint32Array(memory.buffer);
    this.instance = instance;
    this.n32 = (this.instance.exports.getFrLen() >> 2) - 2;
    const pRawPrime = this.instance.exports.getPRawPrime();
    const arr = new Array(this.n32);
    for (let i = 0; i < this.n32; i++) {
      arr[this.n32 - 1 - i] = this.i32[(pRawPrime >> 2) + i];
    }
    this.prime = Scalar.fromArray(arr, 4294967296);
    this.Fr = new ZqField(this.prime);
    this.mask32 = Scalar.fromString("FFFFFFFF", 16);
    this.NVars = this.instance.exports.getNVars();
    this.n64 = Math.floor((this.Fr.bitLength - 1) / 64) + 1;
    this.R = this.Fr.e(Scalar.shiftLeft(1, this.n64 * 64));
    this.RInv = this.Fr.inv(this.R);
    this.sanityCheck = sanityCheck;
  }
  circom_version() {
    return 1;
  }
  async _doCalculateWitness(input, sanityCheck) {
    this.instance.exports.init(this.sanityCheck || sanityCheck ? 1 : 0);
    const pSigOffset = this.allocInt();
    const pFr = this.allocFr();
    const keys = Object.keys(input);
    keys.forEach((k) => {
      const h = fnvHash(k);
      const hMSB = parseInt(h.slice(0, 8), 16);
      const hLSB = parseInt(h.slice(8, 16), 16);
      try {
        this.instance.exports.getSignalOffset32(pSigOffset, 0, hMSB, hLSB);
      } catch (err) {
        throw new Error(`Signal ${k} is not an input of the circuit.`);
      }
      const sigOffset = this.getInt(pSigOffset);
      const fArr = flatArray(input[k]);
      for (let i = 0; i < fArr.length; i++) {
        this.setFr(pFr, fArr[i]);
        this.instance.exports.setSignal(0, 0, sigOffset + i, pFr);
      }
    });
  }
  async calculateWitness(input, sanityCheck) {
    const self2 = this;
    const old0 = self2.i32[0];
    const w = [];
    await self2._doCalculateWitness(input, sanityCheck);
    for (let i = 0; i < self2.NVars; i++) {
      const pWitness = self2.instance.exports.getPWitness(i);
      w.push(self2.getFr(pWitness));
    }
    self2.i32[0] = old0;
    return w;
  }
  async calculateBinWitness(input, sanityCheck) {
    const self2 = this;
    const old0 = self2.i32[0];
    await self2._doCalculateWitness(input, sanityCheck);
    const pWitnessBuffer = self2.instance.exports.getWitnessBuffer();
    self2.i32[0] = old0;
    const buff = self2.memory.buffer.slice(pWitnessBuffer, pWitnessBuffer + self2.NVars * self2.n64 * 8);
    return new Uint8Array(buff);
  }
  allocInt() {
    const p = this.i32[0];
    this.i32[0] = p + 8;
    return p;
  }
  allocFr() {
    const p = this.i32[0];
    this.i32[0] = p + this.n32 * 4 + 8;
    return p;
  }
  getInt(p) {
    return this.i32[p >> 2];
  }
  setInt(p, v) {
    this.i32[p >> 2] = v;
  }
  getFr(p) {
    const self2 = this;
    const idx = p >> 2;
    if (self2.i32[idx + 1] & 2147483648) {
      const arr = new Array(self2.n32);
      for (let i = 0; i < self2.n32; i++) {
        arr[self2.n32 - 1 - i] = self2.i32[idx + 2 + i];
      }
      const res = self2.Fr.e(Scalar.fromArray(arr, 4294967296));
      if (self2.i32[idx + 1] & 1073741824) {
        return fromMontgomery(res);
      } else {
        return res;
      }
    } else {
      if (self2.i32[idx] & 2147483648) {
        return self2.Fr.e(self2.i32[idx] - 4294967296);
      } else {
        return self2.Fr.e(self2.i32[idx]);
      }
    }
    function fromMontgomery(n) {
      return self2.Fr.mul(self2.RInv, n);
    }
  }
  setFr(p, v) {
    const self2 = this;
    v = self2.Fr.e(v);
    const minShort = self2.Fr.neg(self2.Fr.e("80000000", 16));
    const maxShort = self2.Fr.e("7FFFFFFF", 16);
    if (self2.Fr.geq(v, minShort) && self2.Fr.leq(v, maxShort)) {
      let a;
      if (self2.Fr.geq(v, self2.Fr.zero)) {
        a = Scalar.toNumber(v);
      } else {
        a = Scalar.toNumber(self2.Fr.sub(v, minShort));
        a = a - 2147483648;
        a = 4294967296 + a;
      }
      self2.i32[p >> 2] = a;
      self2.i32[(p >> 2) + 1] = 0;
      return;
    }
    self2.i32[p >> 2] = 0;
    self2.i32[(p >> 2) + 1] = 2147483648;
    const arr = Scalar.toArray(v, 4294967296);
    for (let i = 0; i < self2.n32; i++) {
      const idx = arr.length - 1 - i;
      if (idx >= 0) {
        self2.i32[(p >> 2) + 2 + i] = arr[idx];
      } else {
        self2.i32[(p >> 2) + 2 + i] = 0;
      }
    }
  }
};
var WitnessCalculatorCircom2 = class {
  constructor(instance, sanityCheck) {
    this.instance = instance;
    this.version = this.instance.exports.getVersion();
    this.n32 = this.instance.exports.getFieldNumLen32();
    this.instance.exports.getRawPrime();
    const arr = new Uint32Array(this.n32);
    for (let i = 0; i < this.n32; i++) {
      arr[this.n32 - 1 - i] = this.instance.exports.readSharedRWMemory(i);
    }
    this.prime = Scalar.fromArray(arr, 4294967296);
    this.witnessSize = this.instance.exports.getWitnessSize();
    this.sanityCheck = sanityCheck;
  }
  circom_version() {
    return this.instance.exports.getVersion();
  }
  async _doCalculateWitness(input, sanityCheck) {
    this.instance.exports.init(this.sanityCheck || sanityCheck ? 1 : 0);
    const keys = Object.keys(input);
    let input_counter = 0;
    keys.forEach((k) => {
      const h = fnvHash(k);
      const hMSB = parseInt(h.slice(0, 8), 16);
      const hLSB = parseInt(h.slice(8, 16), 16);
      const fArr = flatArray(input[k]);
      if (typeof this.instance.exports.getInputSignalSize === "function") {
        let signalSize = this.instance.exports.getInputSignalSize(hMSB, hLSB);
        if (signalSize < 0) {
          throw new Error(`Signal ${k} not found
`);
        }
        if (fArr.length < signalSize) {
          throw new Error(`Not enough values for input signal ${k}
`);
        }
        if (fArr.length > signalSize) {
          throw new Error(`Too many values for input signal ${k}
`);
        }
      }
      for (let i = 0; i < fArr.length; i++) {
        const arrFr = toArray32(normalize(fArr[i], this.prime), this.n32);
        for (let j = 0; j < this.n32; j++) {
          this.instance.exports.writeSharedRWMemory(j, arrFr[this.n32 - 1 - j]);
        }
        try {
          this.instance.exports.setInputSignal(hMSB, hLSB, i);
          input_counter++;
        } catch (err) {
          throw new Error(err);
        }
      }
    });
    if (input_counter < this.instance.exports.getInputSize()) {
      throw new Error(`Not all inputs have been set. Only ${input_counter} out of ${this.instance.exports.getInputSize()}`);
    }
  }
  async calculateWitness(input, sanityCheck) {
    const w = [];
    await this._doCalculateWitness(input, sanityCheck);
    for (let i = 0; i < this.witnessSize; i++) {
      this.instance.exports.getWitness(i);
      const arr = new Uint32Array(this.n32);
      for (let j = 0; j < this.n32; j++) {
        arr[this.n32 - 1 - j] = this.instance.exports.readSharedRWMemory(j);
      }
      w.push(Scalar.fromArray(arr, 4294967296));
    }
    return w;
  }
  async calculateWTNSBin(input, sanityCheck) {
    const buff32 = new Uint32Array(this.witnessSize * this.n32 + this.n32 + 11);
    const buff = new Uint8Array(buff32.buffer);
    await this._doCalculateWitness(input, sanityCheck);
    buff[0] = "w".charCodeAt(0);
    buff[1] = "t".charCodeAt(0);
    buff[2] = "n".charCodeAt(0);
    buff[3] = "s".charCodeAt(0);
    buff32[1] = 2;
    buff32[2] = 2;
    buff32[3] = 1;
    const n8 = this.n32 * 4;
    const idSection1length = 8 + n8;
    const idSection1lengthHex = idSection1length.toString(16);
    buff32[4] = parseInt(idSection1lengthHex.slice(0, 8), 16);
    buff32[5] = parseInt(idSection1lengthHex.slice(8, 16), 16);
    buff32[6] = n8;
    this.instance.exports.getRawPrime();
    let pos = 7;
    for (let j = 0; j < this.n32; j++) {
      buff32[pos + j] = this.instance.exports.readSharedRWMemory(j);
    }
    pos += this.n32;
    buff32[pos] = this.witnessSize;
    pos++;
    buff32[pos] = 2;
    pos++;
    const idSection2length = n8 * this.witnessSize;
    const idSection2lengthHex = idSection2length.toString(16);
    buff32[pos] = parseInt(idSection2lengthHex.slice(0, 8), 16);
    buff32[pos + 1] = parseInt(idSection2lengthHex.slice(8, 16), 16);
    pos += 2;
    for (let i = 0; i < this.witnessSize; i++) {
      this.instance.exports.getWitness(i);
      for (let j = 0; j < this.n32; j++) {
        buff32[pos + j] = this.instance.exports.readSharedRWMemory(j);
      }
      pos += this.n32;
    }
    return buff;
  }
};
var { unstringifyBigInts: unstringifyBigInts$b } = utils;
async function wtnsCalculate(_input, wasmFileName, wtnsFileName, options) {
  const input = unstringifyBigInts$b(_input);
  const fdWasm = await readExisting(wasmFileName);
  const wasm2 = await fdWasm.read(fdWasm.totalSize);
  await fdWasm.close();
  const wc = await builder(wasm2, options);
  if (wc.circom_version() === 1) {
    const w = await wc.calculateBinWitness(input);
    const fdWtns = await createBinFile(wtnsFileName, "wtns", 2, 2);
    await writeBin(fdWtns, w, wc.prime);
    await fdWtns.close();
  } else {
    const fdWtns = await createOverride(wtnsFileName);
    const w = await wc.calculateWTNSBin(input);
    await fdWtns.write(w);
    await fdWtns.close();
  }
}
var { unstringifyBigInts: unstringifyBigInts$a } = utils;
async function groth16FullProve(_input, wasmFile, zkeyFileName, logger, wtnsCalcOptions, proverOptions) {
  const input = unstringifyBigInts$a(_input);
  const wtns = {
    type: "mem"
  };
  await wtnsCalculate(input, wasmFile, wtns, wtnsCalcOptions);
  return await groth16Prove(zkeyFileName, wtns, logger, proverOptions);
}
var { unstringifyBigInts: unstringifyBigInts$9 } = utils;
async function groth16Verify(_vk_verifier, _publicSignals, _proof, logger) {
  const vk_verifier = unstringifyBigInts$9(_vk_verifier);
  const proof = unstringifyBigInts$9(_proof);
  const publicSignals = unstringifyBigInts$9(_publicSignals);
  const curve3 = await getCurveFromName(vk_verifier.curve);
  const IC0 = curve3.G1.fromObject(vk_verifier.IC[0]);
  const IC2 = new Uint8Array(curve3.G1.F.n8 * 2 * publicSignals.length);
  const w = new Uint8Array(curve3.Fr.n8 * publicSignals.length);
  if (!publicInputsAreValid$1(curve3, publicSignals)) {
    if (logger) logger.error("Public inputs are not valid.");
    return false;
  }
  for (let i = 0; i < publicSignals.length; i++) {
    const buffP = curve3.G1.fromObject(vk_verifier.IC[i + 1]);
    IC2.set(buffP, i * curve3.G1.F.n8 * 2);
    Scalar.toRprLE(w, curve3.Fr.n8 * i, publicSignals[i], curve3.Fr.n8);
  }
  let cpub = await curve3.G1.multiExpAffine(IC2, w);
  cpub = curve3.G1.add(cpub, IC0);
  const pi_a = curve3.G1.fromObject(proof.pi_a);
  const pi_b = curve3.G2.fromObject(proof.pi_b);
  const pi_c = curve3.G1.fromObject(proof.pi_c);
  if (!isWellConstructed$1(curve3, { pi_a, pi_b, pi_c })) {
    if (logger) logger.error("Proof commitments are not valid.");
    return false;
  }
  const vk_gamma_22 = curve3.G2.fromObject(vk_verifier.vk_gamma_2);
  const vk_delta_22 = curve3.G2.fromObject(vk_verifier.vk_delta_2);
  const vk_alpha_12 = curve3.G1.fromObject(vk_verifier.vk_alpha_1);
  const vk_beta_22 = curve3.G2.fromObject(vk_verifier.vk_beta_2);
  const res = await curve3.pairingEq(
    curve3.G1.neg(pi_a),
    pi_b,
    cpub,
    vk_gamma_22,
    pi_c,
    vk_delta_22,
    vk_alpha_12,
    vk_beta_22
  );
  if (!res) {
    if (logger) logger.error("Invalid proof");
    return false;
  }
  if (logger) logger.info("OK!");
  return true;
}
function isWellConstructed$1(curve3, proof) {
  const G1 = curve3.G1;
  const G2 = curve3.G2;
  return G1.isValid(proof.pi_a) && G2.isValid(proof.pi_b) && G1.isValid(proof.pi_c);
}
function publicInputsAreValid$1(curve3, publicInputs) {
  for (let i = 0; i < publicInputs.length; i++) {
    if (!Scalar.lt(publicInputs[i], curve3.r)) {
      return false;
    }
  }
  return true;
}
var { unstringifyBigInts: unstringifyBigInts$8 } = utils;
function p256$2(n) {
  let nstr = n.toString(16);
  while (nstr.length < 64) nstr = "0" + nstr;
  nstr = `"0x${nstr}"`;
  return nstr;
}
async function groth16ExportSolidityCallData(_proof, _pub) {
  const proof = unstringifyBigInts$8(_proof);
  const pub = unstringifyBigInts$8(_pub);
  let inputs = "";
  for (let i = 0; i < pub.length; i++) {
    if (inputs != "") inputs = inputs + ",";
    inputs = inputs + p256$2(pub[i]);
  }
  let S;
  S = `[${p256$2(proof.pi_a[0])}, ${p256$2(proof.pi_a[1])}],[[${p256$2(proof.pi_b[0][1])}, ${p256$2(proof.pi_b[0][0])}],[${p256$2(proof.pi_b[1][1])}, ${p256$2(proof.pi_b[1][0])}]],[${p256$2(proof.pi_c[0])}, ${p256$2(proof.pi_c[1])}],[${inputs}]`;
  return S;
}
var groth16 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fullProve: groth16FullProve,
  prove: groth16Prove,
  verify: groth16Verify,
  exportSolidityCallData: groth16ExportSolidityCallData
});
var bls12381r2 = Scalar.e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16);
var bn128r2 = Scalar.e("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var { unstringifyBigInts: unstringifyBigInts$7 } = utils;
var { stringifyBigInts: stringifyBigInts$3 } = utils;
var { unstringifyBigInts: unstringifyBigInts$6, stringifyBigInts: stringifyBigInts$2 } = utils;
var sha3 = { exports: {} };
(function(module) {
  (function() {
    var INPUT_ERROR = "input is invalid type";
    var FINALIZE_ERROR = "finalize already called";
    var WINDOW = typeof window === "object";
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === "object";
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && true && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS = "0123456789abcdef".split("");
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
    var CSHAKE_BYTEPAD = {
      "128": 168,
      "256": 136
    };
    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    }
    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
    var createOutputMethod = function(bits3, padding, outputType) {
      return function(message) {
        return new Keccak2(bits3, padding, bits3).update(message)[outputType]();
      };
    };
    var createShakeOutputMethod = function(bits3, padding, outputType) {
      return function(message, outputBits) {
        return new Keccak2(bits3, padding, outputBits).update(message)[outputType]();
      };
    };
    var createCshakeOutputMethod = function(bits3, padding, outputType) {
      return function(message, outputBits, n, s) {
        return methods["cshake" + bits3].update(message, outputBits, n, s)[outputType]();
      };
    };
    var createKmacOutputMethod = function(bits3, padding, outputType) {
      return function(key, message, outputBits, s) {
        return methods["kmac" + bits3].update(key, message, outputBits, s)[outputType]();
      };
    };
    var createOutputMethods = function(method, createMethod2, bits3, padding) {
      for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
        var type = OUTPUT_TYPES[i2];
        method[type] = createMethod2(bits3, padding, type);
      }
      return method;
    };
    var createMethod = function(bits3, padding) {
      var method = createOutputMethod(bits3, padding, "hex");
      method.create = function() {
        return new Keccak2(bits3, padding, bits3);
      };
      method.update = function(message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits3, padding);
    };
    var createShakeMethod = function(bits3, padding) {
      var method = createShakeOutputMethod(bits3, padding, "hex");
      method.create = function(outputBits) {
        return new Keccak2(bits3, padding, outputBits);
      };
      method.update = function(message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits3, padding);
    };
    var createCshakeMethod = function(bits3, padding) {
      var w = CSHAKE_BYTEPAD[bits3];
      var method = createCshakeOutputMethod(bits3, padding, "hex");
      method.create = function(outputBits, n, s) {
        if (!n && !s) {
          return methods["shake" + bits3].create(outputBits);
        } else {
          return new Keccak2(bits3, padding, outputBits).bytepad([n, s], w);
        }
      };
      method.update = function(message, outputBits, n, s) {
        return method.create(outputBits, n, s).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits3, padding);
    };
    var createKmacMethod = function(bits3, padding) {
      var w = CSHAKE_BYTEPAD[bits3];
      var method = createKmacOutputMethod(bits3, padding, "hex");
      method.create = function(key, outputBits, s) {
        return new Kmac(bits3, padding, outputBits).bytepad(["KMAC", s], w).bytepad([key], w);
      };
      method.update = function(key, message, outputBits, s) {
        return method.create(key, outputBits, s).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits3, padding);
    };
    var algorithms = [
      { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
      { name: "sha3", padding: PADDING, bits: BITS, createMethod },
      { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
      { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
      { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
    ];
    var methods = {}, methodNames = [];
    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits2 = algorithm.bits;
      for (var j = 0; j < bits2.length; ++j) {
        var methodName = algorithm.name + "_" + bits2[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits2[j], algorithm.padding);
        if (algorithm.name !== "sha3") {
          var newMethodName = algorithm.name + bits2[j];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }
    function Keccak2(bits3, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = 1600 - (bits3 << 1) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;
      for (var i2 = 0; i2 < 50; ++i2) {
        this.s[i2] = 0;
      }
    }
    Keccak2.prototype.update = function(message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type = typeof message;
      if (type !== "string") {
        if (type === "object") {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s = this.s, i2, code;
      while (index < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0;
          }
        }
        if (notString) {
          for (i2 = this.start; index < length && i2 < byteCount; ++index) {
            blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3];
          }
        } else {
          for (i2 = this.start; index < length && i2 < byteCount; ++index) {
            code = message.charCodeAt(index);
            if (code < 128) {
              blocks[i2 >> 2] |= code << SHIFT[i2++ & 3];
            } else if (code < 2048) {
              blocks[i2 >> 2] |= (192 | code >> 6) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
            } else if (code < 55296 || code >= 57344) {
              blocks[i2 >> 2] |= (224 | code >> 12) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
            } else {
              code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
              blocks[i2 >> 2] |= (240 | code >> 18) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
            }
          }
        }
        this.lastByteIndex = i2;
        if (i2 >= byteCount) {
          this.start = i2 - byteCount;
          this.block = blocks[blockCount];
          for (i2 = 0; i2 < blockCount; ++i2) {
            s[i2] ^= blocks[i2];
          }
          f(s);
          this.reset = true;
        } else {
          this.start = i2;
        }
      }
      return this;
    };
    Keccak2.prototype.encode = function(x, right) {
      var o = x & 255, n = 1;
      var bytes2 = [o];
      x = x >> 8;
      o = x & 255;
      while (o > 0) {
        bytes2.unshift(o);
        x = x >> 8;
        o = x & 255;
        ++n;
      }
      if (right) {
        bytes2.push(n);
      } else {
        bytes2.unshift(n);
      }
      this.update(bytes2);
      return bytes2.length;
    };
    Keccak2.prototype.encodeString = function(str) {
      var notString, type = typeof str;
      if (type !== "string") {
        if (type === "object") {
          if (str === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
            str = new Uint8Array(str);
          } else if (!Array.isArray(str)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var bytes2 = 0, length = str.length;
      if (notString) {
        bytes2 = length;
      } else {
        for (var i2 = 0; i2 < str.length; ++i2) {
          var code = str.charCodeAt(i2);
          if (code < 128) {
            bytes2 += 1;
          } else if (code < 2048) {
            bytes2 += 2;
          } else if (code < 55296 || code >= 57344) {
            bytes2 += 3;
          } else {
            code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++i2) & 1023);
            bytes2 += 4;
          }
        }
      }
      bytes2 += this.encode(bytes2 * 8);
      this.update(str);
      return bytes2;
    };
    Keccak2.prototype.bytepad = function(strs, w) {
      var bytes2 = this.encode(w);
      for (var i2 = 0; i2 < strs.length; ++i2) {
        bytes2 += this.encodeString(strs[i2]);
      }
      var paddingBytes = w - bytes2 % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };
    Keccak2.prototype.finalize = function() {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
      blocks[i2 >> 2] |= this.padding[i2 & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i2 = 1; i2 < blockCount + 1; ++i2) {
          blocks[i2] = 0;
        }
      }
      blocks[blockCount - 1] |= 2147483648;
      for (i2 = 0; i2 < blockCount; ++i2) {
        s[i2] ^= blocks[i2];
      }
      f(s);
    };
    Keccak2.prototype.toString = Keccak2.prototype.hex = function() {
      this.finalize();
      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var hex2 = "", block;
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          block = s[i2];
          hex2 += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
        }
        if (j2 % blockCount === 0) {
          f(s);
          i2 = 0;
        }
      }
      if (extraBytes) {
        block = s[i2];
        hex2 += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
        if (extraBytes > 1) {
          hex2 += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
        }
        if (extraBytes > 2) {
          hex2 += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
        }
      }
      return hex2;
    };
    Keccak2.prototype.arrayBuffer = function() {
      this.finalize();
      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var bytes2 = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer(outputBlocks + 1 << 2);
      } else {
        buffer = new ArrayBuffer(bytes2);
      }
      var array = new Uint32Array(buffer);
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          array[j2] = s[i2];
        }
        if (j2 % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        array[i2] = s[i2];
        buffer = buffer.slice(0, bytes2);
      }
      return buffer;
    };
    Keccak2.prototype.buffer = Keccak2.prototype.arrayBuffer;
    Keccak2.prototype.digest = Keccak2.prototype.array = function() {
      this.finalize();
      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var array = [], offset, block;
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          offset = j2 << 2;
          block = s[i2];
          array[offset] = block & 255;
          array[offset + 1] = block >> 8 & 255;
          array[offset + 2] = block >> 16 & 255;
          array[offset + 3] = block >> 24 & 255;
        }
        if (j2 % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        offset = j2 << 2;
        block = s[i2];
        array[offset] = block & 255;
        if (extraBytes > 1) {
          array[offset + 1] = block >> 8 & 255;
        }
        if (extraBytes > 2) {
          array[offset + 2] = block >> 16 & 255;
        }
      }
      return array;
    };
    function Kmac(bits3, padding, outputBits) {
      Keccak2.call(this, bits3, padding, outputBits);
    }
    Kmac.prototype = new Keccak2();
    Kmac.prototype.finalize = function() {
      this.encode(this.outputBits, true);
      return Keccak2.prototype.finalize.call(this);
    };
    var f = function(s) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
        c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
        c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
        c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
        c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
        c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
        c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
        c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
        c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
        c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
        h = c8 ^ (c2 << 1 | c3 >>> 31);
        l = c9 ^ (c3 << 1 | c2 >>> 31);
        s[0] ^= h;
        s[1] ^= l;
        s[10] ^= h;
        s[11] ^= l;
        s[20] ^= h;
        s[21] ^= l;
        s[30] ^= h;
        s[31] ^= l;
        s[40] ^= h;
        s[41] ^= l;
        h = c0 ^ (c4 << 1 | c5 >>> 31);
        l = c1 ^ (c5 << 1 | c4 >>> 31);
        s[2] ^= h;
        s[3] ^= l;
        s[12] ^= h;
        s[13] ^= l;
        s[22] ^= h;
        s[23] ^= l;
        s[32] ^= h;
        s[33] ^= l;
        s[42] ^= h;
        s[43] ^= l;
        h = c2 ^ (c6 << 1 | c7 >>> 31);
        l = c3 ^ (c7 << 1 | c6 >>> 31);
        s[4] ^= h;
        s[5] ^= l;
        s[14] ^= h;
        s[15] ^= l;
        s[24] ^= h;
        s[25] ^= l;
        s[34] ^= h;
        s[35] ^= l;
        s[44] ^= h;
        s[45] ^= l;
        h = c4 ^ (c8 << 1 | c9 >>> 31);
        l = c5 ^ (c9 << 1 | c8 >>> 31);
        s[6] ^= h;
        s[7] ^= l;
        s[16] ^= h;
        s[17] ^= l;
        s[26] ^= h;
        s[27] ^= l;
        s[36] ^= h;
        s[37] ^= l;
        s[46] ^= h;
        s[47] ^= l;
        h = c6 ^ (c0 << 1 | c1 >>> 31);
        l = c7 ^ (c1 << 1 | c0 >>> 31);
        s[8] ^= h;
        s[9] ^= l;
        s[18] ^= h;
        s[19] ^= l;
        s[28] ^= h;
        s[29] ^= l;
        s[38] ^= h;
        s[39] ^= l;
        s[48] ^= h;
        s[49] ^= l;
        b0 = s[0];
        b1 = s[1];
        b32 = s[11] << 4 | s[10] >>> 28;
        b33 = s[10] << 4 | s[11] >>> 28;
        b14 = s[20] << 3 | s[21] >>> 29;
        b15 = s[21] << 3 | s[20] >>> 29;
        b46 = s[31] << 9 | s[30] >>> 23;
        b47 = s[30] << 9 | s[31] >>> 23;
        b28 = s[40] << 18 | s[41] >>> 14;
        b29 = s[41] << 18 | s[40] >>> 14;
        b20 = s[2] << 1 | s[3] >>> 31;
        b21 = s[3] << 1 | s[2] >>> 31;
        b2 = s[13] << 12 | s[12] >>> 20;
        b3 = s[12] << 12 | s[13] >>> 20;
        b34 = s[22] << 10 | s[23] >>> 22;
        b35 = s[23] << 10 | s[22] >>> 22;
        b16 = s[33] << 13 | s[32] >>> 19;
        b17 = s[32] << 13 | s[33] >>> 19;
        b48 = s[42] << 2 | s[43] >>> 30;
        b49 = s[43] << 2 | s[42] >>> 30;
        b40 = s[5] << 30 | s[4] >>> 2;
        b41 = s[4] << 30 | s[5] >>> 2;
        b22 = s[14] << 6 | s[15] >>> 26;
        b23 = s[15] << 6 | s[14] >>> 26;
        b4 = s[25] << 11 | s[24] >>> 21;
        b5 = s[24] << 11 | s[25] >>> 21;
        b36 = s[34] << 15 | s[35] >>> 17;
        b37 = s[35] << 15 | s[34] >>> 17;
        b18 = s[45] << 29 | s[44] >>> 3;
        b19 = s[44] << 29 | s[45] >>> 3;
        b10 = s[6] << 28 | s[7] >>> 4;
        b11 = s[7] << 28 | s[6] >>> 4;
        b42 = s[17] << 23 | s[16] >>> 9;
        b43 = s[16] << 23 | s[17] >>> 9;
        b24 = s[26] << 25 | s[27] >>> 7;
        b25 = s[27] << 25 | s[26] >>> 7;
        b6 = s[36] << 21 | s[37] >>> 11;
        b7 = s[37] << 21 | s[36] >>> 11;
        b38 = s[47] << 24 | s[46] >>> 8;
        b39 = s[46] << 24 | s[47] >>> 8;
        b30 = s[8] << 27 | s[9] >>> 5;
        b31 = s[9] << 27 | s[8] >>> 5;
        b12 = s[18] << 20 | s[19] >>> 12;
        b13 = s[19] << 20 | s[18] >>> 12;
        b44 = s[29] << 7 | s[28] >>> 25;
        b45 = s[28] << 7 | s[29] >>> 25;
        b26 = s[38] << 8 | s[39] >>> 24;
        b27 = s[39] << 8 | s[38] >>> 24;
        b8 = s[48] << 14 | s[49] >>> 18;
        b9 = s[49] << 14 | s[48] >>> 18;
        s[0] = b0 ^ ~b2 & b4;
        s[1] = b1 ^ ~b3 & b5;
        s[10] = b10 ^ ~b12 & b14;
        s[11] = b11 ^ ~b13 & b15;
        s[20] = b20 ^ ~b22 & b24;
        s[21] = b21 ^ ~b23 & b25;
        s[30] = b30 ^ ~b32 & b34;
        s[31] = b31 ^ ~b33 & b35;
        s[40] = b40 ^ ~b42 & b44;
        s[41] = b41 ^ ~b43 & b45;
        s[2] = b2 ^ ~b4 & b6;
        s[3] = b3 ^ ~b5 & b7;
        s[12] = b12 ^ ~b14 & b16;
        s[13] = b13 ^ ~b15 & b17;
        s[22] = b22 ^ ~b24 & b26;
        s[23] = b23 ^ ~b25 & b27;
        s[32] = b32 ^ ~b34 & b36;
        s[33] = b33 ^ ~b35 & b37;
        s[42] = b42 ^ ~b44 & b46;
        s[43] = b43 ^ ~b45 & b47;
        s[4] = b4 ^ ~b6 & b8;
        s[5] = b5 ^ ~b7 & b9;
        s[14] = b14 ^ ~b16 & b18;
        s[15] = b15 ^ ~b17 & b19;
        s[24] = b24 ^ ~b26 & b28;
        s[25] = b25 ^ ~b27 & b29;
        s[34] = b34 ^ ~b36 & b38;
        s[35] = b35 ^ ~b37 & b39;
        s[44] = b44 ^ ~b46 & b48;
        s[45] = b45 ^ ~b47 & b49;
        s[6] = b6 ^ ~b8 & b0;
        s[7] = b7 ^ ~b9 & b1;
        s[16] = b16 ^ ~b18 & b10;
        s[17] = b17 ^ ~b19 & b11;
        s[26] = b26 ^ ~b28 & b20;
        s[27] = b27 ^ ~b29 & b21;
        s[36] = b36 ^ ~b38 & b30;
        s[37] = b37 ^ ~b39 & b31;
        s[46] = b46 ^ ~b48 & b40;
        s[47] = b47 ^ ~b49 & b41;
        s[8] = b8 ^ ~b0 & b2;
        s[9] = b9 ^ ~b1 & b3;
        s[18] = b18 ^ ~b10 & b12;
        s[19] = b19 ^ ~b11 & b13;
        s[28] = b28 ^ ~b20 & b22;
        s[29] = b29 ^ ~b21 & b23;
        s[38] = b38 ^ ~b30 & b32;
        s[39] = b39 ^ ~b31 & b33;
        s[48] = b48 ^ ~b40 & b42;
        s[49] = b49 ^ ~b41 & b43;
        s[0] ^= RC[n];
        s[1] ^= RC[n + 1];
      }
    };
    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
    }
  })();
})(sha3);
var jsSha3 = sha3.exports;
var { keccak256 } = jsSha3;
var { stringifyBigInts: stringifyBigInts$1 } = utils;
var { unstringifyBigInts: unstringifyBigInts$5 } = utils;
var { unstringifyBigInts: unstringifyBigInts$4 } = utils;
var { unstringifyBigInts: unstringifyBigInts$3 } = utils;
var { stringifyBigInts: stringifyBigInts2 } = utils;
var { unstringifyBigInts: unstringifyBigInts$2 } = utils;
var { unstringifyBigInts: unstringifyBigInts$1 } = utils;
var { unstringifyBigInts: unstringifyBigInts2 } = utils;

// node_modules/@noble/hashes/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bytes(b, ...lengths) {
  if (!(b instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

// node_modules/@noble/hashes/esm/utils.js
var u8a = (a) => a instanceof Uint8Array;
var u322 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

// node_modules/ethers/lib.esm/_version.js
var version = "6.13.4";

// node_modules/ethers/lib.esm/utils/properties.js
function checkType(value, type, name) {
  const types = type.split("|").map((t) => t.trim());
  for (let i = 0; i < types.length; i++) {
    switch (type) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof value === type) {
          return;
        }
    }
  }
  const error = new Error(`invalid value for type ${type}`);
  error.code = "INVALID_ARGUMENT";
  error.argument = `value.${name}`;
  error.value = value;
  throw error;
}
function defineProperties(target, values, types) {
  for (let key in values) {
    let value = values[key];
    const type = types ? types[key] : null;
    if (type) {
      checkType(value, type, key);
    }
    Object.defineProperty(target, key, { enumerable: true, value, writable: false });
  }
}

// node_modules/ethers/lib.esm/utils/errors.js
function stringify(value) {
  if (value == null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "[ " + value.map(stringify).join(", ") + " ]";
  }
  if (value instanceof Uint8Array) {
    const HEX = "0123456789abcdef";
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      result += HEX[value[i] >> 4];
      result += HEX[value[i] & 15];
    }
    return result;
  }
  if (typeof value === "object" && typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  switch (typeof value) {
    case "boolean":
    case "symbol":
      return value.toString();
    case "bigint":
      return BigInt(value).toString();
    case "number":
      return value.toString();
    case "string":
      return JSON.stringify(value);
    case "object": {
      const keys = Object.keys(value);
      keys.sort();
      return "{ " + keys.map((k) => `${stringify(k)}: ${stringify(value[k])}`).join(", ") + " }";
    }
  }
  return `[ COULD NOT SERIALIZE ]`;
}
function makeError(message, code, info) {
  let shortMessage = message;
  {
    const details = [];
    if (info) {
      if ("message" in info || "code" in info || "name" in info) {
        throw new Error(`value will overwrite populated values: ${stringify(info)}`);
      }
      for (const key in info) {
        if (key === "shortMessage") {
          continue;
        }
        const value = info[key];
        details.push(key + "=" + stringify(value));
      }
    }
    details.push(`code=${code}`);
    details.push(`version=${version}`);
    if (details.length) {
      message += " (" + details.join(", ") + ")";
    }
  }
  let error;
  switch (code) {
    case "INVALID_ARGUMENT":
      error = new TypeError(message);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      error = new RangeError(message);
      break;
    default:
      error = new Error(message);
  }
  defineProperties(error, { code });
  if (info) {
    Object.assign(error, info);
  }
  if (error.shortMessage == null) {
    defineProperties(error, { shortMessage });
  }
  return error;
}
function assert2(check, message, code, info) {
  if (!check) {
    throw makeError(message, code, info);
  }
}
function assertArgument(check, message, name, value) {
  assert2(check, message, "INVALID_ARGUMENT", { argument: name, value });
}
var _normalizeForms = ["NFD", "NFC", "NFKD", "NFKC"].reduce((accum, form) => {
  try {
    if ("test".normalize(form) !== "test") {
      throw new Error("bad");
    }
    ;
    if (form === "NFD") {
      const check = String.fromCharCode(233).normalize("NFD");
      const expected = String.fromCharCode(101, 769);
      if (check !== expected) {
        throw new Error("broken");
      }
    }
    accum.push(form);
  } catch (error) {
  }
  return accum;
}, []);
function assertNormalize(form) {
  assert2(_normalizeForms.indexOf(form) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form }
  });
}

// node_modules/ethers/lib.esm/utils/data.js
function _getBytes(value, name, copy) {
  if (value instanceof Uint8Array) {
    if (copy) {
      return new Uint8Array(value);
    }
    return value;
  }
  if (typeof value === "string" && value.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const result = new Uint8Array((value.length - 2) / 2);
    let offset = 2;
    for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(value.substring(offset, offset + 2), 16);
      offset += 2;
    }
    return result;
  }
  assertArgument(false, "invalid BytesLike value", name || "value", value);
}
function getBytes(value, name) {
  return _getBytes(value, name, false);
}
var HexCharacters = "0123456789abcdef";
function hexlify(data) {
  const bytes2 = getBytes(data);
  let result = "0x";
  for (let i = 0; i < bytes2.length; i++) {
    const v = bytes2[i];
    result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
  }
  return result;
}
function zeroPad(data, length, left) {
  const bytes2 = getBytes(data);
  assert2(length >= bytes2.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(bytes2),
    length,
    offset: length + 1
  });
  const result = new Uint8Array(length);
  result.fill(0);
  if (left) {
    result.set(bytes2, length - bytes2.length);
  } else {
    result.set(bytes2, 0);
  }
  return hexlify(result);
}
function zeroPadBytes(data, length) {
  return zeroPad(data, length, false);
}

// node_modules/ethers/lib.esm/utils/maths.js
var BN_0 = BigInt(0);
var BN_1 = BigInt(1);
var maxValue = 9007199254740991;
function getBigInt(value, name) {
  switch (typeof value) {
    case "bigint":
      return value;
    case "number":
      assertArgument(Number.isInteger(value), "underflow", name || "value", value);
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return BigInt(value);
    case "string":
      try {
        if (value === "") {
          throw new Error("empty string");
        }
        if (value[0] === "-" && value[1] !== "-") {
          return -BigInt(value.substring(1));
        }
        return BigInt(value);
      } catch (e2) {
        assertArgument(false, `invalid BigNumberish string: ${e2.message}`, name || "value", value);
      }
  }
  assertArgument(false, "invalid BigNumberish value", name || "value", value);
}
function getUint(value, name) {
  const result = getBigInt(value, name);
  assert2(result >= BN_0, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value
  });
  return result;
}
var Nibbles = "0123456789abcdef";
function toBigInt(value) {
  if (value instanceof Uint8Array) {
    let result = "0x0";
    for (const v of value) {
      result += Nibbles[v >> 4];
      result += Nibbles[v & 15];
    }
    return BigInt(result);
  }
  return getBigInt(value);
}
function getNumber(value, name) {
  switch (typeof value) {
    case "bigint":
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return Number(value);
    case "number":
      assertArgument(Number.isInteger(value), "underflow", name || "value", value);
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return value;
    case "string":
      try {
        if (value === "") {
          throw new Error("empty string");
        }
        return getNumber(BigInt(value), name);
      } catch (e2) {
        assertArgument(false, `invalid numeric string: ${e2.message}`, name || "value", value);
      }
  }
  assertArgument(false, "invalid numeric value", name || "value", value);
}
function toBeHex(_value, _width) {
  const value = getUint(_value, "value");
  let result = value.toString(16);
  if (_width == null) {
    if (result.length % 2) {
      result = "0" + result;
    }
  } else {
    const width = getNumber(_width, "width");
    assert2(width * 2 >= result.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: _value
    });
    while (result.length < width * 2) {
      result = "0" + result;
    }
  }
  return "0x" + result;
}

// node_modules/ethers/lib.esm/utils/utf8.js
function errorFunc(reason, offset, bytes2, output2, badCodepoint) {
  assertArgument(false, `invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes2);
}
function ignoreFunc(reason, offset, bytes2, output2, badCodepoint) {
  if (reason === "BAD_PREFIX" || reason === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = offset + 1; o < bytes2.length; o++) {
      if (bytes2[o] >> 6 !== 2) {
        break;
      }
      i++;
    }
    return i;
  }
  if (reason === "OVERRUN") {
    return bytes2.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes2, output2, badCodepoint) {
  if (reason === "OVERLONG") {
    assertArgument(typeof badCodepoint === "number", "invalid bad code point for replacement", "badCodepoint", badCodepoint);
    output2.push(badCodepoint);
    return 0;
  }
  output2.push(65533);
  return ignoreFunc(reason, offset, bytes2, output2, badCodepoint);
}
var Utf8ErrorFuncs = Object.freeze({
  error: errorFunc,
  ignore: ignoreFunc,
  replace: replaceFunc
});
function toUtf8Bytes(str, form) {
  assertArgument(typeof str === "string", "invalid string value", "str", str);
  if (form != null) {
    assertNormalize(form);
    str = str.normalize(form);
  }
  let result = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      result.push(c);
    } else if (c < 2048) {
      result.push(c >> 6 | 192);
      result.push(c & 63 | 128);
    } else if ((c & 64512) == 55296) {
      i++;
      const c2 = str.charCodeAt(i);
      assertArgument(i < str.length && (c2 & 64512) === 56320, "invalid surrogate pair", "str", str);
      const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c >> 12 | 224);
      result.push(c >> 6 & 63 | 128);
      result.push(c & 63 | 128);
    }
  }
  return new Uint8Array(result);
}

// node_modules/@noble/hashes/esm/sha3.js
var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = /* @__PURE__ */ BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
var _7n = /* @__PURE__ */ BigInt(7);
var _256n = /* @__PURE__ */ BigInt(256);
var _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u322(this.state);
  }
  keccak() {
    keccakP(this.state32, this.rounds);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    exists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    exists(this, false);
    bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
var sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
var sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
var sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
var keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
var keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
var keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
var shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);

// node_modules/ethers/lib.esm/crypto/keccak.js
var locked = false;
var _keccak256 = function(data) {
  return keccak_256(data);
};
var __keccak256 = _keccak256;
function keccak2562(_data) {
  const data = getBytes(_data, "data");
  return hexlify(__keccak256(data));
}
keccak2562._ = _keccak256;
keccak2562.lock = function() {
  locked = true;
};
keccak2562.register = function(func) {
  if (locked) {
    throw new TypeError("keccak256 is locked");
  }
  __keccak256 = func;
};
Object.freeze(keccak2562);

// node_modules/ethers/lib.esm/abi/bytes32.js
function encodeBytes32String(text) {
  const bytes2 = toUtf8Bytes(text);
  if (bytes2.length > 31) {
    throw new Error("bytes32 string must be less than 32 bytes");
  }
  return zeroPadBytes(bytes2, 32);
}

// node_modules/@semaphore-protocol/proof/dist/index.browser.js
function hash(message) {
  return (BigInt(keccak2562(toBeHex(message, 32))) >> 8n).toString();
}
function toBigInt2(value) {
  try {
    return toBigInt(value);
  } catch (error) {
    if (typeof value === "string") {
      return toBigInt(encodeBytes32String(value));
    }
    throw TypeError(error instanceof Error ? error.message : error.toString());
  }
}
async function generateProof(identity, groupOrMerkleProof, message, scope, merkleTreeDepth, snarkArtifacts) {
  requireDefined(identity, "identity");
  requireDefined(groupOrMerkleProof, "groupOrMerkleProof");
  requireDefined(message, "message");
  requireDefined(scope, "scope");
  requireObject(identity, "identity");
  requireObject(groupOrMerkleProof, "groupOrMerkleProof");
  requireTypes(message, "message", ["string", "bigint", "number", "Uint8Array"]);
  requireTypes(scope, "scope", ["string", "bigint", "number", "Uint8Array"]);
  if (merkleTreeDepth) {
    requireNumber(merkleTreeDepth, "merkleTreeDepth");
  }
  if (snarkArtifacts) {
    requireObject(snarkArtifacts, "snarkArtifacts");
  }
  message = toBigInt2(message);
  scope = toBigInt2(scope);
  let merkleProof;
  if ("siblings" in groupOrMerkleProof) {
    merkleProof = groupOrMerkleProof;
  } else {
    const leafIndex = groupOrMerkleProof.indexOf(identity.commitment);
    merkleProof = groupOrMerkleProof.generateMerkleProof(leafIndex);
  }
  const merkleProofLength = merkleProof.siblings.length;
  if (merkleTreeDepth !== void 0) {
    if (merkleTreeDepth < MIN_DEPTH || merkleTreeDepth > MAX_DEPTH) {
      throw new TypeError(`The tree depth must be a number between ${MIN_DEPTH} and ${MAX_DEPTH}`);
    }
  } else {
    merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1;
  }
  snarkArtifacts ?? (snarkArtifacts = await maybeGetSnarkArtifacts(Project.SEMAPHORE, {
    parameters: [merkleTreeDepth],
    version: "4.13.0"
  }));
  const { wasm: wasm2, zkey } = snarkArtifacts;
  const merkleProofSiblings = merkleProof.siblings;
  for (let i = 0; i < merkleTreeDepth; i += 1) {
    if (merkleProofSiblings[i] === void 0) {
      merkleProofSiblings[i] = 0n;
    }
  }
  const { proof, publicSignals } = await groth16.fullProve({
    secret: identity.secretScalar,
    merkleProofLength,
    merkleProofIndex: merkleProof.index,
    merkleProofSiblings,
    scope: hash(scope),
    message: hash(message)
  }, wasm2, zkey);
  return {
    merkleTreeDepth,
    merkleTreeRoot: merkleProof.root.toString(),
    nullifier: publicSignals[1],
    message: message.toString(),
    scope: scope.toString(),
    points: packGroth16Proof(proof)
  };
}
var protocol = "groth16";
var curve2 = "bn128";
var nPublic = 4;
var vk_alpha_1 = [
  "16428432848801857252194528405604668803277877773566238944394625302971855135431",
  "16846502678714586896801519656441059708016666274385668027902869494772365009666",
  "1"
];
var vk_beta_2 = [
  [
    "16348171800823588416173124589066524623406261996681292662100840445103873053252",
    "3182164110458002340215786955198810119980427837186618912744689678939861918171"
  ],
  [
    "19687132236965066906216944365591810874384658708175106803089633851114028275753",
    "4920802715848186258981584729175884379674325733638798907835771393452862684714"
  ],
  [
    "1",
    "0"
  ]
];
var vk_gamma_2 = [
  [
    "10857046999023057135944570762232829481370756359578518086990519993285655852781",
    "11559732032986387107991004021392285783925812861821192530917403151452391805634"
  ],
  [
    "8495653923123431417604973247489272438418190587263600148770280649306958101930",
    "4082367875863433681332203403145435568316851327593401208105741076214120093531"
  ],
  [
    "1",
    "0"
  ]
];
var vk_delta_2 = [
  [
    [
      "16408413417242390422091814167027427493277171619879801311231535488230631233228",
      "9945686348046960753877586492918972777825246677018826948161896201170445700125"
    ],
    [
      "19805828691744104303828611788576365088245444900313217510847939816134147892073",
      "6584315070644963867508873956596397181930928138233362569920493830977850569249"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "2387596915721059240380306703756745594941774836392065901920862076482873617696",
      "4137034247026796121567786020569192018542087029679792022186664106005314607992"
    ],
    [
      "16447312158069665668196107037746726091322857767125704694225455151423385234420",
      "12207258509226852403095283170696450586325894259341619206879136573430824179219"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "14294733923974082563700679538239516855779956462219064242234075098094333560871",
      "16330999452311032943437085246396144436976596572620326866448611437534258631396"
    ],
    [
      "5856262630305079046154806623452275669069805844550622864468698349954335808342",
      "4077511428936129071924927150420083045813488070428429073817813611424925121688"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "13071886307519653591557928522141791177727944387325349731338730220121865486426",
      "9147362984584117589896461943832229407742734559244362782131452071313721467022"
    ],
    [
      "16267462216178612321501515020484989961063147873263196484923037425712997371544",
      "12092490337916442957475513586469567371361906149803313377280821909723439581377"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "2357551468752810995913393842537718192839284870946471706329338268293755997329",
      "17699476683290927561681064863977135617971404674836959835621062864295611403648"
    ],
    [
      "15371001085051472569179708936226706149881484173472097333879881486489180490983",
      "12792428623738700989382805503922676104149362420071951662089713970685402064920"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "20616939609237548459795216165583176879544143113522163138782264749253509627258",
      "13987713805540595141538231036659236350125001216593964477223521911968346527102"
    ],
    [
      "3162343948407473104608991225811079906200146990821363658345349028119611644709",
      "3320292317142377941283260904789121584245307520705790709070006866620962533715"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "13096135091972781998384533354315732588511252434443280959953028720792091894439",
      "17599645347125110170634377768144829252609553303778272999874612657176247663979"
    ],
    [
      "5497049490564113461392112545148903724371578431098493139775449857623325296586",
      "7686421875467730512006088099126520544317589903732886932992767694569986256779"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "19498497257631907587214071284377177236513238877478254784158949106613204394809",
      "4201858703580495907616071164434098089411977757935963172911584461484497089823"
    ],
    [
      "14220658082972513690837811349990790459391670015439493604844277256709703968946",
      "725072098700696182710385988528309000847717684428652699032837799281837303309"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "14886882169839625604512011386316801918767995818481638031200219618637435317046",
      "4045148753719902607466865114862064444702845131168750813732988685843265272714"
    ],
    [
      "6080842004111306921355576610508287032807092958050574806583173765232646608130",
      "10694987061719986731524904780077663994960386767617837357890167696777886594429"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "19724067353675840213140371880930169181883810789843127137211427073528097386069",
      "21713798113403639943129465020431058408875932630108492210073762207187255107633"
    ],
    [
      "17930796050321483178126019717582390671874641297920957330301826849122897776475",
      "12206390446835120782025093868584394872476245212887793139718936402859799461128"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "17328756557422910934818164024947081727797919847622394659808852744488487561121",
      "6970640849385862299695602095231000533615427942238133481753115580290886282663"
    ],
    [
      "17551529991224202267708263974810363449203041333779078351019896570513260547078",
      "803200290296994529393040192875391266206144602742874360276093971196637285110"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "2119776875486510261156090816054891852076653981738105921239014174885904246433",
      "14572605232309338398194614880225630634521363940715728597124701672171876503457"
    ],
    [
      "15641680856161902645414137445124067424307682451191794724349887359826084586070",
      "14764068940615290963682432521466414132081301332432973819150185889917259656516"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "12585047581981016758713642748813698038343438252986565458259773061683123989258",
      "9669145368105243899354639562088264940980627266994489740805405384333753923552"
    ],
    [
      "15854293065825437298487041414058911622298657451488894851139274730870355353259",
      "19565158032720127045649170359766073929463698598471410254463656922079352510393"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "2288843848207548606244913096831590643237758110674559319081495071409127772262",
      "3252788368686342394845916051738261897651617073407759249108275286346858326943"
    ],
    [
      "16683359175825972027599519332179172395722103735125140270260256591403685239266",
      "19124363906021798265340471177011752439360196612765215264076386186223672631683"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "21778698515108811822570997836350239604460537154789740349136154088410673666440",
      "5780031105796026218614860731746179146574862839671481989139051367514008242236"
    ],
    [
      "8140325513003421209811483931164219330248830428283659149673491359622349624487",
      "18469505026450614999435662120574344885993110615313266080469284549107734127701"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "15964849500928959236136513927877106396819701524466507680781856032238559291702",
      "7548740869127800000959433269529906329291042176659702797114735805029076243809"
    ],
    [
      "20366134800430281137974350328157690756475407434441379325123050644263700762747",
      "1672355735830681474636413865943106063110582489546868908540192561642173045849"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "15604113119818398859105083663101672704426630802104461803147745295915420543514",
      "16114472716989861379676896506941964225302064637372698367976925741668156508052"
    ],
    [
      "7939071742082619319458149641163972961008977339800237806212608589725584130020",
      "10165003310380856542064932579929053283069946501185445302343404661722980895662"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "12959426659056731977096261077158897117816984776686970177641451566537475330762",
      "12686597458456839559095621904427573493459559345644733657026411666208793605782"
    ],
    [
      "2556822501937414965915732176313294354334696604955778975945258036864927305135",
      "19835071153104544039790862095812156602791894702605430971509518717702362964947"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "501939956853020624053826043023206795744298239687467453170002552066896316735",
      "15282288821286986303443436438438118467123854134079934970632941246943744947634"
    ],
    [
      "8268832261269721951642392857400064988994240365232333730985870709113231577748",
      "17306268320069329930053046486191119384709698006779409787629519770624845846895"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "10155645986889866254983794183798376982702094196823662035160585060891538132313",
      "8227572988834008904680469166048218402014791963974296824179448357074224817728"
    ],
    [
      "21066066529531022287482896734705560568307576550088195620554036170201413152935",
      "2766194785450921673319752274493654480922324316669506712863711606971264837815"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "1989924837531089847846387969204339029084060271880315693828877510016009048244",
      "7352603086778020593401803196166503749868671550890770670813014453861490868474"
    ],
    [
      "6428463624222837400592542960880514502148047005367618559502923200431303417626",
      "2160048101436923431950651945741915095581265616792410900406773465080133187326"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "19303607623375189361174333168663340845013627094607738353031532282040550902377",
      "3195542343326523127590636511134614410335800104671557720021340738104811702387"
    ],
    [
      "4747193399637226139967607070154314368157241370565382819691031533975814254142",
      "606780685077871587284472254405037298745588560970946322961435429383314118646"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "14558408330551331658217821972088118480910056101659366480914289399602315516831",
      "9568204816014179577619529844284430743063545941195246216889646276674433402461"
    ],
    [
      "4997879817697325140190126125496746317991855622313321171930774136969925165261",
      "12942855016996583214204134800269377810677680516245639526261311120541522533623"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "13783310291132286501486061315182503677055944149861104676633788059711246063985",
      "19190093413956851541449387374199799048221744576578891593940876486082568836726"
    ],
    [
      "15697318658529146415938553904765473201636399656961560956897831706453611373390",
      "11337992225169061295633901814645251777656165320625910201890812012309200609498"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "18172524094647563702792071405521064148027777374146622596440895328066214725333",
      "21569450500189435887199679551535725246094753831124106295990566904036497813254"
    ],
    [
      "9819178401638123792202514084265624499907335293369606938734047198656926777909",
      "3145315298367926043213663632718527591959511677826683294840754237808062567112"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "8746072717767095707814429468799090500392250697821275811590378893588767597917",
      "18802634026897129713917723325543619649182522727835118188707427828679759584422"
    ],
    [
      "7219832117754966106192534848766622469189809645310297510974348973233245025369",
      "18704375927500385275425299458226317326347431199233436591432711644245604239077"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "13708720001690920974531975083269227589906005357046540542256166004868494493957",
      "17438285563716107537313028987468968480486147502509455852617046032572641428099"
    ],
    [
      "11101887644093498136963322545128841855068486606253334583797745666239266446972",
      "20460486971944339166023854053015474903256211559095327365767233192985351503994"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "132171351540181208752598355011806514484978442078160242634962060418757137902",
      "13354046131540785149549755824616257951646671953336984957173828198477971391435"
    ],
    [
      "21669184698178807916508930565726714051772558794823048975473358705382732801596",
      "9635523530117598655810969112395005213391266499466713636714826152431721391097"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "1817209170269917594978846294744086522596256114711933397300588502829438536106",
      "6855256699562883536928701758472081428223522076535727620422471711268239634308"
    ],
    [
      "21773055244640460218409135038646161676097355933318612827708333265587791702761",
      "4880541329774392852243411920559969839321972249482564734670937681914115129863"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "2268676832521011389605833228499733106004721523029486634934922586295864710389",
      "8102913435692743300910502697459995333988046387043253689269460988879348357821"
    ],
    [
      "20309588746697349568949048390517274459537703018546300964903000505784921108425",
      "4291401834465838169107131630619002425334621571862337210064229894382878193958"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "10311012528118027945397529231050612295259038290206749112146827480766291632622",
      "14263915192420789008257078016040368451751565013845409244574826505356681905483"
    ],
    [
      "14352495558770414119917297125905421752955375327125069951920582428689643657147",
      "13732820742602026577147919232809575149719811385820138732151195012323892622807"
    ],
    [
      "1",
      "0"
    ]
  ],
  [
    [
      "17092537224655272022410655318466617424580925386513981972839127238283870860133",
      "19418789221732947317254488453881986598823601057019654728627221055116187750232"
    ],
    [
      "10324639680661302781934202760230560206041062507025982983925498455935854577265",
      "13351246034714801162998612043454267340423379651242067402477042359803697454008"
    ],
    [
      "1",
      "0"
    ]
  ]
];
var vk_alphabeta_12 = [
  [
    [
      "5275725312362878540782176211860327475781113689246818544623830805017503247034",
      "700769043921060225711174322502145319612473365595920873303028146383045646735"
    ],
    [
      "16577533945604560505206253312979863148043263406037367789711279754781525822966",
      "9408338099405950952721388539539775335199747835458172188116297223654842340186"
    ],
    [
      "12663399896275491035004982800573482669934131767886952660443268164480899034271",
      "4432711152773877173921024337047412943791122852326272337530740732443732395954"
    ]
  ],
  [
    [
      "13121778684901402722679281862736806628725205381360313795132945954337708567513",
      "9534744673358550231812045647241180985734073058548683258847806241019905135720"
    ],
    [
      "21329152369227346659770815132468371951064045353268189088026893413117512652875",
      "17209195434408943681049655974234541356066884378594227002358272904159790622854"
    ],
    [
      "5346467096835895366917814311591075634165750361894629082277248282132405045579",
      "15508364027636868967189209273443690126627947943852338696115233789046842639684"
    ]
  ]
];
var IC = [
  [
    [
      "21564662383818339812993695785973841493291121955771661311430527603386143081035",
      "11657658026218961400360867854402607407663293873414596225804388622415098729060",
      "1"
    ],
    [
      "5533349423449432778163796436454151032650774998392453462759465071162947436375",
      "17666012233471380867104668515469193094558859315891478165712715246422464697296",
      "1"
    ],
    [
      "13790423553923191278524576257154863570034906260536718090119503950307306296145",
      "16347340498152674232698644565319421975642372036173515105388889392795309295990",
      "1"
    ],
    [
      "10347034326666188507199356265931633551664071191603767626695085345258477532910",
      "4997773236405807337389381582138203610802209566240298545378121875436944647085",
      "1"
    ],
    [
      "7712217580333883426256678971341506778688091309349201102564782287450206569996",
      "11641585108425634786022262163621942392033533063883916291688482667130242094857",
      "1"
    ]
  ],
  [
    [
      "9489596831137467831936181723799993784405887389842259727079183545123420301197",
      "5693044079249670766862073856690641907105851772473869123686905553083768481901",
      "1"
    ],
    [
      "17898997548136088532567977418138177925756213368644036291774970816621511988532",
      "14740534064349741419723390394239028334537142774383826393167588250084168194094",
      "1"
    ],
    [
      "7500726594286602753757299303462042350941501507291226781032819138010678210197",
      "13983548112698198976520664364050938890446873322776162899610844269223098399304",
      "1"
    ],
    [
      "4179021390507632616360295568391845734889028630342516412453298502049130820179",
      "20975245700425632280316737137349390332222091470855345182874208080865080212702",
      "1"
    ],
    [
      "19021523407389922360429160784661737205058068759568696201665794084690606347183",
      "12466052163897566316054301608370450274478624641249744366981264508268594011005",
      "1"
    ]
  ],
  [
    [
      "11884365549811137923790853968899084443031154132686515474186216563685462755000",
      "6704788636781610628272580574653541169120963625645936367544220418722019111188",
      "1"
    ],
    [
      "12991914739236243841256219048178401410745190271263140777960787004438580261220",
      "5590145430871031209225621787151481513029424432579305171602721437720335415019",
      "1"
    ],
    [
      "20736101181427060756315290729667064729584862568486313542930046293576350846222",
      "7964565007570676497703411734193469540175343873516773716159178261241341375901",
      "1"
    ],
    [
      "16794429217414353616789117451165613822803466243648367634557467502136998943893",
      "558993661655740022114023784587509768164689940441081748900073950812070600098",
      "1"
    ],
    [
      "21277403138624958471460622041656535634603555578993634384564040130349002217692",
      "7205479266817649764349441691795052179964672154330256630020305063447891790148",
      "1"
    ]
  ],
  [
    [
      "18187121597105710107820202802031458279487324017138250255927726057433500669375",
      "15012220220970919550489485531718205331032811410448946673580936317900747952200",
      "1"
    ],
    [
      "3799482147538344500542820734735122481363768658335038765369725321662205050206",
      "18459466192043192674256302513191294603344972476857678325869973105335820268540",
      "1"
    ],
    [
      "8371100229123846057591554411543868783772849081957719952786548232633953930371",
      "16392384072261285060820639096886003341285913303581826536584543892461115648635",
      "1"
    ],
    [
      "164311966912983613985837991405929736331545044362227376912988396007755308644",
      "14800042550380375545221454660591168421002493928474215610733083544813856749571",
      "1"
    ],
    [
      "5446582152055860717382977841879473507200978562639874129317522779049265868182",
      "17144789881850623578644619126353767193897831802878982156453026267061479318368",
      "1"
    ]
  ],
  [
    [
      "6061065050056818401425995444848442801082028003693533761317243484439410130486",
      "14421699115635896251200870048606905409362397729098347410029925812718494314790",
      "1"
    ],
    [
      "17764425779832440503119380955582476921366160597878088621057583292133201921828",
      "19325157692898902621888918744505769631959402815048198799820163158409995487168",
      "1"
    ],
    [
      "6258600847191904397521590251033300809244388630288177399679339852682042841421",
      "11465472288105090946117499669391367720635188603694722501274106607307772288573",
      "1"
    ],
    [
      "10180595246862511551674650922870347723335534215996716528362762560295598295215",
      "3690737434617038684847593614126376566314533511849567687889412543841205373904",
      "1"
    ],
    [
      "8360701886606033636746194379935060989917955410360780257886029556878927675568",
      "6224202489864584854579640750182952834186929884827457586524645505100759053191",
      "1"
    ]
  ],
  [
    [
      "11456968548642529067610674808382167764802494980138719820512211518302627107887",
      "11455771654670648686053455792277792946656699485272481961904303203240492823833",
      "1"
    ],
    [
      "21645856996069548037018252715881645637488521504116923684196082239155781984119",
      "3094554733819647895233423913672213654966781105789538452012413504270628621920",
      "1"
    ],
    [
      "20222830675731969595697842255572896927625978293922319690451162029271566073332",
      "2299755534593036915322224849363001602999763269809528878097176939139487311140",
      "1"
    ],
    [
      "7830678104955873344268815800406695166240238819395575548650063006484394678866",
      "8292198461920024507844266222654318162909714872134018902302830113806011209596",
      "1"
    ],
    [
      "21038851675637978842250129668218313705907148230365782923677535275538800334483",
      "13072002963195077193711204467649783731532287330545853507770527504401058570193",
      "1"
    ]
  ],
  [
    [
      "8293167606936789587004399648280193251054082814788244028501960279421704000114",
      "7709081435865764497534699711581966805607844184053200285800560724365733120327",
      "1"
    ],
    [
      "2860123013351178790009979824307221120860118614074034399464150338454013405853",
      "13763218951331690553843957292153943162553066475103633670641020416951290344256",
      "1"
    ],
    [
      "4789418102197153723790090589693080481785734087539102123677613425037944489592",
      "17330889066392014999074090696809151050093213398828946719768763988010535269715",
      "1"
    ],
    [
      "10129085623121788805469292039165786807952422639351266927935244047158210981616",
      "15002136679925504684294631411355542550586695403781633718655289795426595849334",
      "1"
    ],
    [
      "6474882311348239101576893582477295320869182221392368446924689953363876865764",
      "8804222865265988294811806880568074647478904220540537334972864902871077838012",
      "1"
    ]
  ],
  [
    [
      "7602559356952468739284912464035245908630437420598679136652908026045180488328",
      "16111238549886116834228378260221364372359193100207778903077344547164794705701",
      "1"
    ],
    [
      "4388197485785229509959347777848537078359374474217459901855008716954057604556",
      "20315980717934234974549351736037549508696080456775251415021648861890639121862",
      "1"
    ],
    [
      "8894476488311762521345591915596785336199891552527631661486066886430207383960",
      "10507712815543741943426418314248758401915795238602490433472331649754574318",
      "1"
    ],
    [
      "1361628466858501220853574985735065893753335834730615950205060657815549076997",
      "21115966409952331008632962084465209049712491721893213003273634228076351704714",
      "1"
    ],
    [
      "10143501525849454112186704993906437121964710522733801177464721602060816508547",
      "15915040429542080058220845883209269137572987883955427191757123673921710513463",
      "1"
    ]
  ],
  [
    [
      "14460337429616230954943958675716081963588306792996796361707962467350652391417",
      "14942877381842351328929463103485627328312931817317478989303263038647281100178",
      "1"
    ],
    [
      "1110332392063530538204411737837277243492990423485794325977769076651328083033",
      "10919390875413686146270185137548761614500075623165257383894560234836900440934",
      "1"
    ],
    [
      "6247001086236109999298892231106907934077299141753582790343558190175549277983",
      "16454834314509312930772051812525955897818959846014029734527761364866908466394",
      "1"
    ],
    [
      "20787162601686096009469711917911591559519784411908743378310303648286070066213",
      "329555930422375685548517968382781014151923772277385942152727068768012422891",
      "1"
    ],
    [
      "19169184741483330357166320795527802455869488229141154534326733730896361608917",
      "3731511813614376585927676130561503089005787957765827409553923648443014818208",
      "1"
    ]
  ],
  [
    [
      "17589010625176267714261731510967239431951758897534962393502464004173896269452",
      "11314243799281054396775240572336782676682308560106741694058028398369199499477",
      "1"
    ],
    [
      "2616999472724851015149231086056537391239391471626016143865918034547647674703",
      "7506564710553140121597894492787098587988120091858028099692759420828047549055",
      "1"
    ],
    [
      "14344309991058836215766891479904688074428377705347872561431720021418803748831",
      "15612609928947020586954137228660271495271037308547281175913700826963305146550",
      "1"
    ],
    [
      "3440242895650049423535387064523726907091222579671988835253116715111965412952",
      "14849427531930030795330140974703153646347327185483844960340014370835451697382",
      "1"
    ],
    [
      "2852531615239369483258860491272966378791893177526418769938038545090569387797",
      "16063779880483301758123806372382589460005057403618403569972825203958953066678",
      "1"
    ]
  ],
  [
    [
      "5594512829679379696380285318703656523428470974534496989204948744681365638740",
      "19153355190048660205157030423801517080853059274698088160107539356351046045274",
      "1"
    ],
    [
      "17097689361166577080420658288080520278988613085683110393793917777988816824215",
      "7459590994671568259682692606685610899047222196559962915885345162611966637718",
      "1"
    ],
    [
      "13116148632073600007431810285952333860465239632792370953216512560241953618244",
      "14799685532175739489099204483527227522323817129849089717382054131819739427429",
      "1"
    ],
    [
      "5706219811832143034266637645771361188908037347937732248035435144965369146555",
      "12447138629477889566952145444778641957820192409278911088161776724576052080520",
      "1"
    ],
    [
      "9075337531911231660080557748186351101199461302410967944881351443239195274105",
      "10154943262257933859476555873389244319984880907200896562143727818162496911540",
      "1"
    ]
  ],
  [
    [
      "731620005417853432918859074252358910740355398918941508771065829828613349823",
      "19910515770073532955456516608312873705031622704610814450443388690531706956007",
      "1"
    ],
    [
      "20997741244937528761124476126880541296614934488972459266967103399487280079983",
      "691841242073305983274024401863399748994712360983131551134776688442016134562",
      "1"
    ],
    [
      "3804834295585391511501381707857906505103224012384132701085044976269821133970",
      "20099509760109133148009776076747287541189010762822092458821717845553726755458",
      "1"
    ],
    [
      "2391464501807352635340556268668996300152930049083199925218404251904687006288",
      "14915314962627769248735430810356234246700435842742201448008234008655238195913",
      "1"
    ],
    [
      "2550798483571404532605425888255521160112361281891675975098996520666295546484",
      "14301429888677505895633251567484383492919446825102781434143661099573147344364",
      "1"
    ]
  ],
  [
    [
      "21490162111290547528168042611798754821499577183557718287164248704015429814972",
      "7203088379187749982266879006324703096284437362101925451284753960262381916685",
      "1"
    ],
    [
      "11223214237295689297145850101238645440121537682121332138195929868637308463498",
      "14109702321042236895491704577209186115487907772920006450393820125747327972469",
      "1"
    ],
    [
      "11764333716117969692508351247027677728530051181445269365921661700740316916210",
      "17069329779184342517420972676782153054439004330321178386088117553680539289486",
      "1"
    ],
    [
      "11588141311469319794961893931358501904283188689056560755900606624727928644454",
      "10067306885618539872075379381530566596969123088597900104184469822622863228433",
      "1"
    ],
    [
      "15599423916056091142371489714861596488179573791036773920869778818505474448565",
      "16813092898002421671967498325149873797343773863158980594724989849239884388569",
      "1"
    ]
  ],
  [
    [
      "6791400014655926882130287136612487272935770304302735583504869453121581343273",
      "19772516776171371355155654655222368776470173698626780043191600527220456989380",
      "1"
    ],
    [
      "14111286545049632910403170514346664052695255464151001059159739885279430026140",
      "19023827814282695145793154939387461319687506737652387755633328443970334887030",
      "1"
    ],
    [
      "10845952857936656076845332457083609590644482957131369573472311522859456728430",
      "4510996026795745924200908265122933595975184807475059114721677837190726142875",
      "1"
    ],
    [
      "6618642642394086948508159491704831374406576623125244948689384165895040560928",
      "5945934774390422749108204230944093371258805626161872594989021682153307462804",
      "1"
    ],
    [
      "5762345158703056317189851852082608152939819557475016109737808949138810625340",
      "12034743166788113913447268872978550772801295683120114746141139761809956467267",
      "1"
    ]
  ],
  [
    [
      "1986497401045897525808132900611040743085925761299864355071211553614919778061",
      "7346905144261168784547124788450481651681212288537301341205985037373435850061",
      "1"
    ],
    [
      "17308710084299252796904455380390568148700466343837126759613699250001464464978",
      "9996933138035716899642366376796696299192002238202443927780222145217276980121",
      "1"
    ],
    [
      "15686793645427953460873618372386116262866271861997814659714640870021274982905",
      "8379834636509603151292055095281085626116648693995607112580223874069180480827",
      "1"
    ],
    [
      "9076439971578104657102553572192714510232480425937408826089084522823481905018",
      "4792970117708711275016352865118067239931792479452674722603954722378802868115",
      "1"
    ],
    [
      "18192603413609093952848996781420743070009858517219108318614258320615874041527",
      "5726800070545056666455635637502901796723557116984207800842602820257412505078",
      "1"
    ]
  ],
  [
    [
      "3624638597990987866439043527138609399282574931839111732520349676970533524606",
      "14236936761283250778234019334558412751873709359224597955263556531824267650709",
      "1"
    ],
    [
      "14717053545436829239186736789281862595706603950074015239684300665070520085988",
      "4398699996980151688448979712147333180928736671746256255845724299938993934401",
      "1"
    ],
    [
      "9121951808851238882905939573459074256110209849477240867905720726269149298559",
      "15809106391454072697981815568917409495880348612385021895416683561074664132388",
      "1"
    ],
    [
      "1479894981852570981319280679783645342177957675807091617539882446030285030418",
      "2066718119703195952042994511671840965753119388606016445955708783208764348174",
      "1"
    ],
    [
      "19815986748593651909773648188678999554716182264453939299802477950629866047557",
      "16407092264459598098369257259699714753226103312109848688250781384407758831863",
      "1"
    ]
  ],
  [
    [
      "15613243008723455123092147411575376391112432231068172872878577070096474202320",
      "5873107093396775971117396599760734798099906032548766185438370817936787349557",
      "1"
    ],
    [
      "16834141953808978143908927431996183920327976876610611417713022697315495751573",
      "13654532686992240853018948549791256887013496496291777809199645934807993129092",
      "1"
    ],
    [
      "6948420964311579658629273805599093309750376950755654593152256645799675555292",
      "13487882342091197446033583506653481420172929731064666546342921851064471183016",
      "1"
    ],
    [
      "19394538572751263766787912001305327578124655658967715822508095047367739176610",
      "18543781997197658200465909207929487411074460299350352372249607947804890174961",
      "1"
    ],
    [
      "12589927738966347501327251279840474334766776331050575461625209207928205886060",
      "959462895623601934472674110901717704762300968896430701714559960969451469636",
      "1"
    ]
  ],
  [
    [
      "8137615584892495055020291526958905231099333661811788184718696301740849101157",
      "2687207731975064832252379832889947233637402224769048556726038325230605941771",
      "1"
    ],
    [
      "13885596439929813581209514212922796434692699163591868917464979394571523859280",
      "9878097652687422101935852021644019429882981999977320583962745058937841106941",
      "1"
    ],
    [
      "8631173264262259507970645610076623498423106545866631090684351740218859725688",
      "1016053798038006020981669343284493315196054780741914644673199363733814746976",
      "1"
    ],
    [
      "15961735999486283378372162997422679424009620414824241243621370220843660184608",
      "20417254441097595354933756868263937626153854938297778410197304559253340292659",
      "1"
    ],
    [
      "1178520673383908739693383215523803171283253547072833584539372138842413935323",
      "17299850528045653738189931070257440724100504604689182593513913285275876397030",
      "1"
    ]
  ],
  [
    [
      "8831912031608626208659590860005370379486367075139741034563565850444317100764",
      "3021172425443038605841107616400453942103921372941480602342857951415780702974",
      "1"
    ],
    [
      "3059510662757778883481419332076070700308630016256510878247743272243941600095",
      "15035395790319670525177034211650458412333853217184680236668532624748437035820",
      "1"
    ],
    [
      "13685637698776455204186110804470079588453914443063980321099886742080226062730",
      "9682881266026263145291558213213598872269717884576543409608535922389843629916",
      "1"
    ],
    [
      "3763516856991532660448722992781873765488370446650560808185345540890238136637",
      "20369232495662226413075249333183859185538957332426836915244561860480204043899",
      "1"
    ],
    [
      "600798041597668517992346008990171393207464253780268666873231584567216261989",
      "10525081530303707359727125075346968348535999853030410950070225297138443016805",
      "1"
    ]
  ],
  [
    [
      "20461134431540777763351678742138591715280547901327726234350286927132241185188",
      "10472852803372952799058658982354019188713475970848792479184195536474244495661",
      "1"
    ],
    [
      "4457546550577956059123939095803574524197029659183066532355640495570648590938",
      "4586429547546432481362009807809868592064673739343429291622735389311139155014",
      "1"
    ],
    [
      "8878548766723141968754349938142218026908588360796762754955157392445631389220",
      "19655584391320884116603893928497066509312593264010740149021778073996618450189",
      "1"
    ],
    [
      "18870369933201638187711164190503909369135924856011551136841917667015699131672",
      "9112361599828769259749629608847463305922666380587650734105452323580309624081",
      "1"
    ],
    [
      "6911445528419498463052038634805869251674914450256132175616115327153208000298",
      "10690522731893204079241577206843870488432634507962253873960389671509400535432",
      "1"
    ]
  ],
  [
    [
      "6986380650204572696555894377679555516143222742487768093763807736232505565393",
      "7178524608776379983528074934437460249846710917947837600559796022195490556098",
      "1"
    ],
    [
      "14511325396554799931573182481061175193800426706123939025747670738299237309735",
      "10769285680777553472267982014918840554221774825346648320032076460000982086308",
      "1"
    ],
    [
      "8013412586556337099134005947503268428105831965896517075907705390556137474278",
      "19297667512816822760059796476649962962536683562090909618885365919602784125018",
      "1"
    ],
    [
      "13080361876549788166623045320858150120713598021161508399411024345263168932402",
      "17576543495717489379288162749313643976205071750920478135330898142461043437958",
      "1"
    ],
    [
      "749928488718787130729650556896889324046178481001039612070309327140640509484",
      "13452164863896532747052463234349395362380267804683742239405137274623765724883",
      "1"
    ]
  ],
  [
    [
      "9372497845214770789408935159011869065998887887908644793412741518038352106455",
      "6824043106301021802337265255123156341718970397778961929809923017776872074111",
      "1"
    ],
    [
      "4086496243828357822511950569138959383960313427520601019444481316015152488042",
      "2615367737319233366899202894822598074644813086629000105193228027116011043874",
      "1"
    ],
    [
      "9012629709797743695547945742380562886599184681041818331492614085521554763885",
      "2718623884709419946482553893921529036211786053183283843986165106309760049064",
      "1"
    ],
    [
      "18427510224880798489193372297771918642087297428559360240920393819321647163846",
      "2359306318398674386831169321367207367384137279256423608187018673109642678309",
      "1"
    ],
    [
      "12754247067684402177735012756545644802931969186351850348267350800530381710889",
      "12099320383809626212538063580389580146479432740053820359931631615973679594280",
      "1"
    ]
  ],
  [
    [
      "20569140258661538465609309793901226556624357340596540902506272918822843322531",
      "2017406326337631666462757323673108269372934973549118846730220374674251176020",
      "1"
    ],
    [
      "8930386498955868728437719758548962891090098587711934821538044189694826516007",
      "872473829025777192208369973080667467931337092296241015253816466644156502335",
      "1"
    ],
    [
      "14175483990404027876489685615252065635624351311985076586246376806044076171681",
      "21113727364143444744320684807133692848155682709637854676360180810856157393211",
      "1"
    ],
    [
      "21439870082805702808423271601350020366447074763322880342394619168639880010353",
      "7941400412695603400066807985139336675527571568719383199743967549562760847347",
      "1"
    ],
    [
      "19711238424452525257874734679153550868908489249281428800896614012097184204539",
      "1782886157746007131009755123169028924792171885647986298122465765882446893776",
      "1"
    ]
  ],
  [
    [
      "7948738560901759935533785286497248696866588866996290173286993599015937713465",
      "21383083772687014354764890701208254541124597451836477810961923232709302021348",
      "1"
    ],
    [
      "845357010357280479944538583795503840023220661394091932603683779589326608493",
      "9847059640727037259955689686637736252456504139198706340172889541872241315919",
      "1"
    ],
    [
      "19735028023509709139030944391271643151114464633810368686216146704985548761847",
      "10957037344663239394296826351850357744479187402449826894971824022120305906864",
      "1"
    ],
    [
      "10857218356588720695758480414315056247878298878160777845472097706661362094341",
      "12659230123239601491190024243702303223083714138649191559763467016464950902974",
      "1"
    ],
    [
      "4421692819499651847893059627845897615941598824341416417746061212686721404569",
      "4146994199944194392929920675270913726921208803955884486055317740464155452045",
      "1"
    ]
  ],
  [
    [
      "15524220854714802572483165049645493863308840042702423000991528655143800991355",
      "2873680296803877577016758114722303194280798603668593539655354944462015491495",
      "1"
    ],
    [
      "21511635879655991539220445961960114690972101995911258097114713712702107045198",
      "20989977887759636736506409375156488285212092933625761767652129833950022384077",
      "1"
    ],
    [
      "11893761581911568529718634584272936566371671431644798220328762769071992281769",
      "821937575358525853867134896951064858145451123332822273699031793459545438220",
      "1"
    ],
    [
      "2900430274359310690618524896692923294309054497364476374787343685871008327165",
      "8720502599028203845501964097003798275885159830832083990464536252871878361950",
      "1"
    ],
    [
      "1526428634965568138084807644441790092430312972915852759909840939607375411557",
      "19330600709830876812659270341031828899242066658652911432691190721367768585276",
      "1"
    ]
  ],
  [
    [
      "15149526674916552957955295978442191746545588987005646023076350825495164721219",
      "12312465770047962862603387783137521184964644789601726457701818413820820272023",
      "1"
    ],
    [
      "887052875132869652511134918618513446133679884112861540520879340141174426565",
      "10115049661803710859041384900020828734925904855175927511148559372913626176423",
      "1"
    ],
    [
      "5335409634692316857819674999057409464444242845634814146712906279192471239809",
      "5867058049750435253082799741849677700112882194321251997160086323676439139146",
      "1"
    ],
    [
      "6390335593305126396256729194089555311313091462505885780325052702321666121656",
      "18487381412649551489908018712149896108342038275401398741392342574667805120371",
      "1"
    ],
    [
      "17561344226180944305762210377179940277644590157840351095259676105374613733721",
      "4457686444931138591019078740391588957257078602913243534934572777347626743441",
      "1"
    ]
  ],
  [
    [
      "20965098559008326088590813869369456731378432392318458389001266401345175640128",
      "14042828591773129117206816827175127705869746953500687337512206598432260576909",
      "1"
    ],
    [
      "5160681346448651659586497626661693862047749997839949437718804008266201457999",
      "11172176363472818962500882015702798178554277628753617638505156304795149694647",
      "1"
    ],
    [
      "9895986787829279067433235580007733873150486410258899510591342672926524338262",
      "17085567524013227702565183892434387192890814083751488492831524336837189984808",
      "1"
    ],
    [
      "17471523688926285783254304025970975494130344358093089172928286129162874908131",
      "3190459887079760041138579995479624601272160343741716768493984499644215530817",
      "1"
    ],
    [
      "18662209391457416490153143796070619643893396621545796882925365417699096037127",
      "6833842027579236353670470801903886997693550374848352300397337592884841902973",
      "1"
    ]
  ],
  [
    [
      "4908945740153659215004152332101565405606019996633759468461775762281774394964",
      "21011248797424996501576245928148760982209531788903875960854085764120406894568",
      "1"
    ],
    [
      "13191008177770444933875632803942491031179706626542149422632460744200672261433",
      "1534165799369514105278531017786135012423608170399490521452613521868069083539",
      "1"
    ],
    [
      "16894654236774440752849008601950583853871672841436606103637010655285521468805",
      "20503922814345137359818511992650618260854734179392765985788772320945807579232",
      "1"
    ],
    [
      "13065004268029098058138430723943654141471155245888474763272723897073163158870",
      "5710512539404913250371646267042373316074349637235274990715695121915177985129",
      "1"
    ],
    [
      "14148729598053591118540483472641383317499343352874570514181373418501495979135",
      "18856781179557577889492055046909497426316721288753969245955789785217388711233",
      "1"
    ]
  ],
  [
    [
      "10090652918710530653917808099435521159139748895195088461766119767235382436576",
      "11091318837882255417245526804952366330364297128880660202614912164204547387079",
      "1"
    ],
    [
      "8860570299683598442096621998505070786848371471891445883297294946785878462046",
      "7989998825639039226638403739478078279058331826271283865638775161540842472205",
      "1"
    ],
    [
      "5346342817560086063900183227140116104611446899776640442309983595929155827321",
      "4728227596360335588497931997198199618389028039915632351482864022192863414648",
      "1"
    ],
    [
      "1307197908815971026337345328869558826873966665701251987075516911433581254909",
      "17192594132693997565716997863213921573339127511539160924519416789869957202415",
      "1"
    ],
    [
      "854313248786131707673817118128172947011734727201058576923585746608785231698",
      "18557783153500861542115150359250262617238014629884753038143872262563631673183",
      "1"
    ]
  ],
  [
    [
      "21873161228197346175501960516775761046310551102876777509980352203545771687279",
      "18707215645523344387389072646192481937934910226525478131002026622437999592104",
      "1"
    ],
    [
      "7343587390040263454901211025850787161897089142580995068010391768468897930463",
      "3658482648621376529359993625818469007071846847686125714572914895878334673518",
      "1"
    ],
    [
      "4742211578535476701429549849782161889960683750638901011419410277299628721062",
      "2062074646251094013383801177102242087162824079215143848072614126154740843156",
      "1"
    ],
    [
      "18359716361472545461462552730463973209963417807304950174942922559864719815140",
      "5056983827460857507380069984758875481501753803689425329782154255566746480271",
      "1"
    ],
    [
      "14523010611387055577444871812760136002558690970659010707623178497982346846259",
      "3308345367668716069546301029004126598369832062210584592843582343472237828743",
      "1"
    ]
  ],
  [
    [
      "16279527660665560355373897040370331935550579636485220014724853911689354938317",
      "6904003978912368193685095776664457394689153505695462937591869249516186513285",
      "1"
    ],
    [
      "9560809010919012972784508113817963427911544684087874867287891696588652270833",
      "13758961106589113647808540883579550842476020934204930349712786296821724901343",
      "1"
    ],
    [
      "18356744759388728427363109482137723412533183996214818264972597809041667896335",
      "5843668172052689167358136858716513420447295937450806286266266596007287395332",
      "1"
    ],
    [
      "6420709462517387112057249185404316892233472189408048416844208695646527254338",
      "11623328726443586571439388530328496139775426107786158218167129166814518113430",
      "1"
    ],
    [
      "6341494887912612689219682089940932423806240450766177732005845523226141860243",
      "15802026965858221515632735764793156144768796599084524967329305161737051261612",
      "1"
    ]
  ],
  [
    [
      "10103926722931078982605706030949362655307484076062888935846650016759889142093",
      "6408523803583957861093178570261836839579534913280087539951995502207676033681",
      "1"
    ],
    [
      "10515315627673485567554065052355582969267613011291774163291091821958057145537",
      "6768816808998775963922309587602657956543153937962248581523225331650114687940",
      "1"
    ],
    [
      "17178096199287690004953753166317162487668352699797208814859714742711871622892",
      "1014767011860319157328160123936147170910126758311776156091691264430445201249",
      "1"
    ],
    [
      "21256511734324430227080113260677171318782797168765800041483009690171330532116",
      "9426039316756883303579762915588950342012805251014466846083022268829685463452",
      "1"
    ],
    [
      "8705141798118322524085705638485862297622530882657925369627636348715218022458",
      "14758676262742035851849342002101814045101609645216471797951315602416337926711",
      "1"
    ]
  ]
];
var verificationKeys = {
  protocol,
  curve: curve2,
  nPublic,
  vk_alpha_1,
  vk_beta_2,
  vk_gamma_2,
  vk_delta_2,
  vk_alphabeta_12,
  IC
};
async function verifyProof(proof) {
  requireDefined(proof, "proof");
  requireObject(proof, "proof");
  const { merkleTreeDepth, merkleTreeRoot, nullifier, message, scope, points } = proof;
  requireNumber(merkleTreeDepth, "proof.merkleTreeDepth");
  requireString(merkleTreeRoot, "proof.merkleTreeRoot");
  requireString(nullifier, "proof.nullifier");
  requireString(message, "proof.message");
  requireString(scope, "proof.scope");
  requireArray(points, "proof.points");
  if (merkleTreeDepth < MIN_DEPTH || merkleTreeDepth > MAX_DEPTH) {
    throw new TypeError(`The tree depth must be a number between ${MIN_DEPTH} and ${MAX_DEPTH}`);
  }
  const verificationKey = {
    ...verificationKeys,
    vk_delta_2: verificationKeys.vk_delta_2[merkleTreeDepth - 1],
    IC: verificationKeys.IC[merkleTreeDepth - 1]
  };
  return groth16.verify(verificationKey, [merkleTreeRoot, nullifier, hash(message), hash(scope)], unpackGroth16Proof(points));
}
export {
  generateProof,
  packGroth16Proof,
  unpackGroth16Proof,
  verifyProof
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

@zk-kit/utils/dist/lib.esm/proof-packing.js:
@zk-kit/utils/dist/lib.esm/type-checks.js:
@zk-kit/utils/dist/lib.esm/error-handlers.js:
  (**
   * @module @zk-kit/utils
   * @version 1.3.0
   * @file Essential zero-knowledge utility library for JavaScript developers.
   * @copyright Ethereum Foundation 2025
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils}
  *)

@semaphore-protocol/utils/dist/lib.esm/semaphore-interface.json.js:
@semaphore-protocol/utils/dist/lib.esm/constants.js:
  (**
   * @module @semaphore-protocol/utils
   * @version 4.14.0
   * @file A library to provide utility functions to the other Semaphore packages.
   * @copyright Ethereum Foundation 2025
   * @license MIT
   * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/utils}
  *)

@zk-kit/artifacts/dist/index.browser.js:
  (**
   * @module @zk-kit/artifacts
   * @version 2.0.1
   * @file Utilities for downloading snark artifacts
   * @copyright Ethereum Foundation 2024
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages/artifacts}
  *)

snarkjs/build/browser.esm.js:
  (**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@semaphore-protocol/proof/dist/index.browser.js:
  (**
   * @module @semaphore-protocol/proof
   * @version 4.14.0
   * @file A library to generate and verify Semaphore proofs.
   * @copyright Ethereum Foundation 2025
   * @license MIT
   * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/proof}
  *)
*/
