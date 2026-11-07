
var Fri = Ie(function (yfc, Nri) {
  var { Minipass: jBo } = Ny(),
    Vlr = Symbol("type"),
    aZ = Symbol("buffer");
  class f4e {
    constructor(e, t) {
      this[Vlr] = "";
      let r = [],
        s = 0;
      if (e) {
        let H = e,
          u = Number(H.length);
        for (let f = 0; f < u; f++) {
          let d = H[f],
            _ =
              d instanceof Buffer
                ? d
                : ArrayBuffer.isView(d)
                  ? Buffer.from(d.buffer, d.byteOffset, d.byteLength)
                  : d instanceof ArrayBuffer
                    ? Buffer.from(d)
                    : d instanceof f4e
                      ? d[aZ]
                      : typeof d === "string"
                        ? Buffer.from(d)
                        : Buffer.from(String(d));
          ((s += _.length), r.push(_));
        }
      }
      this[aZ] = Buffer.concat(r, s);
      let a = t && t.type !== void 0 && String(t.type).toLowerCase();
      if (a && !/[^\u0020-\u007E]/.test(a)) this[Vlr] = a;
    }
    get size() {
      return this[aZ].length;
    }
    get type() {
      return this[Vlr];
    }
    text() {
      return Promise.resolve(this[aZ].toString());
    }
    arrayBuffer() {
      let e = this[aZ],
        { byteOffset: t, byteLength: r } = e,
        s = e.buffer.slice(t, t + r);
      return Promise.resolve(s);
    }
    stream() {
      return new jBo().end(this[aZ]);
    }
    slice(e, t, r) {
      let s = this.size,
        a = e === void 0 ? 0 : e < 0 ? Math.max(s + e, 0) : Math.min(e, s),
        H = t === void 0 ? s : t < 0 ? Math.max(s + t, 0) : Math.min(t, s),
        u = Math.max(H - a, 0),
        d = this[aZ].slice(a, a + u),
        _ = new f4e([], { type: r });
      return ((_[aZ] = d), _);
    }
    get [Symbol.toStringTag]() {
      return "Blob";
    }
    static get BUFFER() {
      return aZ;
    }
  }
  Object.defineProperties(f4e.prototype, { size: { enumerable: !0 }, type: { enumerable: !0 } });
  Nri.exports = f4e;
});