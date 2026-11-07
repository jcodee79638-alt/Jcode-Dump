
var Uri = Ie(function (kri) {
  Object.defineProperty(kri, "__esModule", { value: !0 });
  kri.MinipassSized = kri.SizeError = void 0;
  var Cri = Ny(),
    vBo = (e) => typeof e === "string";
  class sIt extends Error {
    expect;
    found;
    code = "EBADSIZE";
    constructor(e, t, r) {
      super(`Bad data size: expected ${t} bytes, but got ${e}`);
      ((this.expect = t), (this.found = e), Error.captureStackTrace(this, r ?? this.constructor));
    }
    get name() {
      return "SizeError";
    }
  }
  kri.SizeError = sIt;
  class wri extends Cri.Minipass {
    found = 0;
    expect;
    constructor(e) {
      let t = e?.size;
      if (
        typeof t !== "number" ||
        t > Number.MAX_SAFE_INTEGER ||
        isNaN(t) ||
        t < 0 ||
        !isFinite(t) ||
        t !== Math.floor(t)
      )
        throw Error("invalid expected size: " + t);
      super(e);
      if (e.objectMode)
        throw TypeError(`${this.constructor.name} streams only work with string and buffer data`);
      this.expect = t;
    }
    write(e, t, r) {
      let s = Buffer.isBuffer(e) ? e : typeof e === "string" ? Buffer.from(e, vBo(t) ? t : "utf8") : e;
      if (typeof t === "function") ((r = t), (t = null));
      if (!Buffer.isBuffer(s))
        return (
          this.emit(
            "error",
            TypeError(`${this.constructor.name} streams only work with string and buffer data`),
          ),
          !1
        );
      if (((this.found += s.length), this.found > this.expect))
        this.emit("error", new sIt(this.found, this.expect));
      return super.write(e, t, r);
    }
    emit(e, ...t) {
      if (e === "end") {
        if (this.found !== this.expect) this.emit("error", new sIt(this.found, this.expect, this.emit));
      }
      return super.emit(e, ...t);
    }
  }
  kri.MinipassSized = wri;
});