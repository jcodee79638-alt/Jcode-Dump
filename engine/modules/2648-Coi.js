
var Coi = Ie(function (joi) {
  Object.defineProperty(joi, "__esModule", { value: !0 });
  joi.ReceiveBuffer = void 0;
  class boi {
    constructor(e = 4096) {
      ((this.buffer = Buffer.allocUnsafe(e)), (this.offset = 0), (this.originalSize = e));
    }
    get length() {
      return this.offset;
    }
    append(e) {
      if (!Buffer.isBuffer(e)) throw Error("Attempted to append a non-buffer instance to ReceiveBuffer.");
      if (this.offset + e.length >= this.buffer.length) {
        let t = this.buffer;
        ((this.buffer = Buffer.allocUnsafe(
          Math.max(this.buffer.length + this.originalSize, this.buffer.length + e.length),
        )),
          t.copy(this.buffer));
      }
      return (e.copy(this.buffer, this.offset), (this.offset += e.length));
    }
    peek(e) {
      if (e > this.offset) throw Error("Attempted to read beyond the bounds of the managed internal data.");
      return this.buffer.slice(0, e);
    }
    get(e) {
      if (e > this.offset) throw Error("Attempted to read beyond the bounds of the managed internal data.");
      let t = Buffer.allocUnsafe(e);
      return (
        this.buffer.slice(0, e).copy(t),
        this.buffer.copyWithin(0, e, e + this.offset - e),
        (this.offset -= e),
        t
      );
    }
  }
  joi.ReceiveBuffer = boi;
});