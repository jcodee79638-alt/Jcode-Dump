
var R4e = Ie(function (tci) {
  Object.defineProperty(tci, "__esModule", { value: !0 });
  tci.ByteStream = void 0;
  class eci extends Error {}
  class xDt {
    static BLOCK_SIZE = 1024;
    buf;
    view;
    start = 0;
    constructor(e) {
      if (e) ((this.buf = e), (this.view = Buffer.from(e)));
      else ((this.buf = Buffer.alloc(0)), (this.view = Buffer.from(this.buf)));
    }
    get buffer() {
      return this.view.subarray(0, this.start);
    }
    get length() {
      return this.view.byteLength;
    }
    get position() {
      return this.start;
    }
    seek(e) {
      this.start = e;
    }
    slice(e, t) {
      let r = e + t;
      if (r > this.length) throw new eci("request past end of buffer");
      return this.view.subarray(e, r);
    }
    appendChar(e) {
      (this.ensureCapacity(1), (this.view[this.start] = e), (this.start += 1));
    }
    appendUint16(e) {
      this.ensureCapacity(2);
      let t = new Uint16Array([e]),
        r = new Uint8Array(t.buffer);
      ((this.view[this.start] = r[1]), (this.view[this.start + 1] = r[0]), (this.start += 2));
    }
    appendUint24(e) {
      this.ensureCapacity(3);
      let t = new Uint32Array([e]),
        r = new Uint8Array(t.buffer);
      ((this.view[this.start] = r[2]),
        (this.view[this.start + 1] = r[1]),
        (this.view[this.start + 2] = r[0]),
        (this.start += 3));
    }
    appendView(e) {
      (this.ensureCapacity(e.length), this.view.set(e, this.start), (this.start += e.length));
    }
    getBlock(e) {
      if (e <= 0) return Buffer.alloc(0);
      if (this.start + e > this.view.length) throw Error("request past end of buffer");
      let t = this.view.subarray(this.start, this.start + e);
      return ((this.start += e), t);
    }
    getUint8() {
      return this.getBlock(1)[0];
    }
    getUint16() {
      let e = this.getBlock(2);
      return (e[0] << 8) | e[1];
    }
    ensureCapacity(e) {
      if (this.start + e > this.view.byteLength) {
        let t = xDt.BLOCK_SIZE + (e > xDt.BLOCK_SIZE ? e : 0);
        this.realloc(this.view.byteLength + t);
      }
    }
    realloc(e) {
      let t = Buffer.alloc(e),
        r = Buffer.from(t);
      (r.set(this.view), (this.buf = t), (this.view = r));
    }
  }
  tci.ByteStream = xDt;
});