
var Xsi = Ie(function (Gsi) {
  Object.defineProperty(Gsi, "__esModule", { value: !0 });
  var zH = Vsi(),
    qsi = 4096,
    FVo = "utf8";
  class apr {
    constructor(e) {
      if (
        ((this.length = 0),
        (this._encoding = FVo),
        (this._writeOffset = 0),
        (this._readOffset = 0),
        apr.isSmartBufferOptions(e))
      ) {
        if (e.encoding) (zH.checkEncoding(e.encoding), (this._encoding = e.encoding));
        if (e.size)
          if (zH.isFiniteInteger(e.size) && e.size > 0) this._buff = Buffer.allocUnsafe(e.size);
          else throw Error(zH.ERRORS.INVALID_SMARTBUFFER_SIZE);
        else if (e.buff)
          if (Buffer.isBuffer(e.buff)) ((this._buff = e.buff), (this.length = e.buff.length));
          else throw Error(zH.ERRORS.INVALID_SMARTBUFFER_BUFFER);
        else this._buff = Buffer.allocUnsafe(qsi);
      } else {
        if (typeof e < "u") throw Error(zH.ERRORS.INVALID_SMARTBUFFER_OBJECT);
        this._buff = Buffer.allocUnsafe(qsi);
      }
    }
    static fromSize(e, t) {
      return new this({ size: e, encoding: t });
    }
    static fromBuffer(e, t) {
      return new this({ buff: e, encoding: t });
    }
    static fromOptions(e) {
      return new this(e);
    }
    static isSmartBufferOptions(e) {
      let t = e;
      return t && (t.encoding !== void 0 || t.size !== void 0 || t.buff !== void 0);
    }
    readInt8(e) {
      return this._readNumberValue(Buffer.prototype.readInt8, 1, e);
    }
    readInt16BE(e) {
      return this._readNumberValue(Buffer.prototype.readInt16BE, 2, e);
    }
    readInt16LE(e) {
      return this._readNumberValue(Buffer.prototype.readInt16LE, 2, e);
    }
    readInt32BE(e) {
      return this._readNumberValue(Buffer.prototype.readInt32BE, 4, e);
    }
    readInt32LE(e) {
      return this._readNumberValue(Buffer.prototype.readInt32LE, 4, e);
    }
    readBigInt64BE(e) {
      return (
        zH.bigIntAndBufferInt64Check("readBigInt64BE"),
        this._readNumberValue(Buffer.prototype.readBigInt64BE, 8, e)
      );
    }
    readBigInt64LE(e) {
      return (
        zH.bigIntAndBufferInt64Check("readBigInt64LE"),
        this._readNumberValue(Buffer.prototype.readBigInt64LE, 8, e)
      );
    }
    writeInt8(e, t) {
      return (this._writeNumberValue(Buffer.prototype.writeInt8, 1, e, t), this);
    }
    insertInt8(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeInt8, 1, e, t);
    }
    writeInt16BE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, e, t);
    }
    insertInt16BE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, e, t);
    }
    writeInt16LE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, e, t);
    }
    insertInt16LE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, e, t);
    }
    writeInt32BE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, e, t);
    }
    insertInt32BE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, e, t);
    }
    writeInt32LE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, e, t);
    }
    insertInt32LE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, e, t);
    }
    writeBigInt64BE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigInt64BE"),
        this._writeNumberValue(Buffer.prototype.writeBigInt64BE, 8, e, t)
      );
    }
    insertBigInt64BE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigInt64BE"),
        this._insertNumberValue(Buffer.prototype.writeBigInt64BE, 8, e, t)
      );
    }
    writeBigInt64LE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigInt64LE"),
        this._writeNumberValue(Buffer.prototype.writeBigInt64LE, 8, e, t)
      );
    }
    insertBigInt64LE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigInt64LE"),
        this._insertNumberValue(Buffer.prototype.writeBigInt64LE, 8, e, t)
      );
    }
    readUInt8(e) {
      return this._readNumberValue(Buffer.prototype.readUInt8, 1, e);
    }
    readUInt16BE(e) {
      return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, e);
    }
    readUInt16LE(e) {
      return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, e);
    }
    readUInt32BE(e) {
      return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, e);
    }
    readUInt32LE(e) {
      return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, e);
    }
    readBigUInt64BE(e) {
      return (
        zH.bigIntAndBufferInt64Check("readBigUInt64BE"),
        this._readNumberValue(Buffer.prototype.readBigUInt64BE, 8, e)
      );
    }
    readBigUInt64LE(e) {
      return (
        zH.bigIntAndBufferInt64Check("readBigUInt64LE"),
        this._readNumberValue(Buffer.prototype.readBigUInt64LE, 8, e)
      );
    }
    writeUInt8(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, e, t);
    }
    insertUInt8(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, e, t);
    }
    writeUInt16BE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, e, t);
    }
    insertUInt16BE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, e, t);
    }
    writeUInt16LE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, e, t);
    }
    insertUInt16LE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, e, t);
    }
    writeUInt32BE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, e, t);
    }
    insertUInt32BE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, e, t);
    }
    writeUInt32LE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, e, t);
    }
    insertUInt32LE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, e, t);
    }
    writeBigUInt64BE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigUInt64BE"),
        this._writeNumberValue(Buffer.prototype.writeBigUInt64BE, 8, e, t)
      );
    }
    insertBigUInt64BE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigUInt64BE"),
        this._insertNumberValue(Buffer.prototype.writeBigUInt64BE, 8, e, t)
      );
    }
    writeBigUInt64LE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigUInt64LE"),
        this._writeNumberValue(Buffer.prototype.writeBigUInt64LE, 8, e, t)
      );
    }
    insertBigUInt64LE(e, t) {
      return (
        zH.bigIntAndBufferInt64Check("writeBigUInt64LE"),
        this._insertNumberValue(Buffer.prototype.writeBigUInt64LE, 8, e, t)
      );
    }
    readFloatBE(e) {
      return this._readNumberValue(Buffer.prototype.readFloatBE, 4, e);
    }
    readFloatLE(e) {
      return this._readNumberValue(Buffer.prototype.readFloatLE, 4, e);
    }
    writeFloatBE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, e, t);
    }
    insertFloatBE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, e, t);
    }
    writeFloatLE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, e, t);
    }
    insertFloatLE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, e, t);
    }
    readDoubleBE(e) {
      return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, e);
    }
    readDoubleLE(e) {
      return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, e);
    }
    writeDoubleBE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, e, t);
    }
    insertDoubleBE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, e, t);
    }
    writeDoubleLE(e, t) {
      return this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, e, t);
    }
    insertDoubleLE(e, t) {
      return this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, e, t);
    }
    readString(e, t) {
      let r;
      if (typeof e === "number") (zH.checkLengthValue(e), (r = Math.min(e, this.length - this._readOffset)));
      else ((t = e), (r = this.length - this._readOffset));
      if (typeof t < "u") zH.checkEncoding(t);
      let s = this._buff.slice(this._readOffset, this._readOffset + r).toString(t || this._encoding);
      return ((this._readOffset += r), s);
    }
    insertString(e, t, r) {
      return (zH.checkOffsetValue(t), this._handleString(e, !0, t, r));
    }
    writeString(e, t, r) {
      return this._handleString(e, !1, t, r);
    }
    readStringNT(e) {
      if (typeof e < "u") zH.checkEncoding(e);
      let t = this.length;
      for (let s = this._readOffset; s < this.length; s++)
        if (this._buff[s] === 0) {
          t = s;
          break;
        }
      let r = this._buff.slice(this._readOffset, t);
      return ((this._readOffset = t + 1), r.toString(e || this._encoding));
    }
    insertStringNT(e, t, r) {
      return (zH.checkOffsetValue(t), this.insertString(e, t, r), this.insertUInt8(0, t + e.length), this);
    }
    writeStringNT(e, t, r) {
      return (
        this.writeString(e, t, r),
        this.writeUInt8(0, typeof t === "number" ? t + e.length : this.writeOffset),
        this
      );
    }
    readBuffer(e) {
      if (typeof e < "u") zH.checkLengthValue(e);
      let t = typeof e === "number" ? e : this.length,
        r = Math.min(this.length, this._readOffset + t),
        s = this._buff.slice(this._readOffset, r);
      return ((this._readOffset = r), s);
    }
    insertBuffer(e, t) {
      return (zH.checkOffsetValue(t), this._handleBuffer(e, !0, t));
    }
    writeBuffer(e, t) {
      return this._handleBuffer(e, !1, t);
    }
    readBufferNT() {
      let e = this.length;
      for (let r = this._readOffset; r < this.length; r++)
        if (this._buff[r] === 0) {
          e = r;
          break;
        }
      let t = this._buff.slice(this._readOffset, e);
      return ((this._readOffset = e + 1), t);
    }
    insertBufferNT(e, t) {
      return (zH.checkOffsetValue(t), this.insertBuffer(e, t), this.insertUInt8(0, t + e.length), this);
    }
    writeBufferNT(e, t) {
      if (typeof t < "u") zH.checkOffsetValue(t);
      return (
        this.writeBuffer(e, t),
        this.writeUInt8(0, typeof t === "number" ? t + e.length : this._writeOffset),
        this
      );
    }
    clear() {
      return ((this._writeOffset = 0), (this._readOffset = 0), (this.length = 0), this);
    }
    remaining() {
      return this.length - this._readOffset;
    }
    get readOffset() {
      return this._readOffset;
    }
    set readOffset(e) {
      (zH.checkOffsetValue(e), zH.checkTargetOffset(e, this), (this._readOffset = e));
    }
    get writeOffset() {
      return this._writeOffset;
    }
    set writeOffset(e) {
      (zH.checkOffsetValue(e), zH.checkTargetOffset(e, this), (this._writeOffset = e));
    }
    get encoding() {
      return this._encoding;
    }
    set encoding(e) {
      (zH.checkEncoding(e), (this._encoding = e));
    }
    get internalBuffer() {
      return this._buff;
    }
    toBuffer() {
      return this._buff.slice(0, this.length);
    }
    toString(e) {
      let t = typeof e === "string" ? e : this._encoding;
      return (zH.checkEncoding(t), this._buff.toString(t, 0, this.length));
    }
    destroy() {
      return (this.clear(), this);
    }
    _handleString(e, t, r, s) {
      let a = this._writeOffset,
        H = this._encoding;
      if (typeof r === "number") a = r;
      else if (typeof r === "string") (zH.checkEncoding(r), (H = r));
      if (typeof s === "string") (zH.checkEncoding(s), (H = s));
      let u = Buffer.byteLength(e, H);
      if (t) this.ensureInsertable(u, a);
      else this._ensureWriteable(u, a);
      if ((this._buff.write(e, a, u, H), t)) this._writeOffset += u;
      else if (typeof r === "number") this._writeOffset = Math.max(this._writeOffset, a + u);
      else this._writeOffset += u;
      return this;
    }
    _handleBuffer(e, t, r) {
      let s = typeof r === "number" ? r : this._writeOffset;
      if (t) this.ensureInsertable(e.length, s);
      else this._ensureWriteable(e.length, s);
      if ((e.copy(this._buff, s), t)) this._writeOffset += e.length;
      else if (typeof r === "number") this._writeOffset = Math.max(this._writeOffset, s + e.length);
      else this._writeOffset += e.length;
      return this;
    }
    ensureReadable(e, t) {
      let r = this._readOffset;
      if (typeof t < "u") (zH.checkOffsetValue(t), (r = t));
      if (r < 0 || r + e > this.length) throw Error(zH.ERRORS.INVALID_READ_BEYOND_BOUNDS);
    }
    ensureInsertable(e, t) {
      if ((zH.checkOffsetValue(t), this._ensureCapacity(this.length + e), t < this.length))
        this._buff.copy(this._buff, t + e, t, this._buff.length);
      if (t + e > this.length) this.length = t + e;
      else this.length += e;
    }
    _ensureWriteable(e, t) {
      let r = typeof t === "number" ? t : this._writeOffset;
      if ((this._ensureCapacity(r + e), r + e > this.length)) this.length = r + e;
    }
    _ensureCapacity(e) {
      let t = this._buff.length;
      if (e > t) {
        let r = this._buff,
          s = (t * 3) / 2 + 1;
        if (s < e) s = e;
        ((this._buff = Buffer.allocUnsafe(s)), r.copy(this._buff, 0, 0, t));
      }
    }
    _readNumberValue(e, t, r) {
      this.ensureReadable(t, r);
      let s = e.call(this._buff, typeof r === "number" ? r : this._readOffset);
      if (typeof r > "u") this._readOffset += t;
      return s;
    }
    _insertNumberValue(e, t, r, s) {
      return (
        zH.checkOffsetValue(s),
        this.ensureInsertable(t, s),
        e.call(this._buff, r, s),
        (this._writeOffset += t),
        this
      );
    }
    _writeNumberValue(e, t, r, s) {
      if (typeof s === "number") {
        if (s < 0) throw Error(zH.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
        zH.checkOffsetValue(s);
      }
      let a = typeof s === "number" ? s : this._writeOffset;
      if ((this._ensureWriteable(t, a), e.call(this._buff, r, a), typeof s === "number"))
        this._writeOffset = Math.max(this._writeOffset, a + t);
      else this._writeOffset += t;
      return this;
    }
  }
  Gsi.SmartBuffer = apr;
});