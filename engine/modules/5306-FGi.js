
var FGi = Ie(function (UGi) {
  Object.defineProperty(UGi, "__esModule", { value: !0 });
  UGi.AbstractMessageBuffer = void 0;
  var Fqa = 13,
    Bqa = 10,
    Rqa = `\r
`;
  class OGi {
    constructor(e = "utf-8") {
      ((this._encoding = e), (this._chunks = []), (this._totalLength = 0));
    }
    get encoding() {
      return this._encoding;
    }
    append(e) {
      let t = typeof e === "string" ? this.fromString(e, this._encoding) : e;
      (this._chunks.push(t), (this._totalLength += t.byteLength));
    }
    tryReadHeaders(e = !1) {
      if (this._chunks.length === 0) return;
      let t = 0,
        r = 0,
        s = 0,
        a = 0;
      e: while (r < this._chunks.length) {
        let d = this._chunks[r];
        s = 0;
        t: while (s < d.length) {
          switch (d[s]) {
            case Fqa:
              switch (t) {
                case 0:
                  t = 1;
                  break;
                case 2:
                  t = 3;
                  break;
                default:
                  t = 0;
              }
              break;
            case Bqa:
              switch (t) {
                case 1:
                  t = 2;
                  break;
                case 3:
                  ((t = 4), s++);
                  break e;
                default:
                  t = 0;
              }
              break;
            default:
              t = 0;
          }
          s++;
        }
        ((a += d.byteLength), r++);
      }
      if (t !== 4) return;
      let H = this._read(a + s),
        u = new Map(),
        f = this.toString(H, "ascii").split(Rqa);
      if (f.length < 2) return u;
      for (let d = 0; d < f.length - 2; d++) {
        let _ = f[d],
          L = _.indexOf(":");
        if (L === -1)
          throw Error(`Message header must separate key and value using ':'
${_}`);
        let I = _.substr(0, L),
          D = _.substr(L + 1).trim();
        u.set(e ? I.toLowerCase() : I, D);
      }
      return u;
    }
    tryReadBody(e) {
      if (this._totalLength < e) return;
      return this._read(e);
    }
    get numberOfBytes() {
      return this._totalLength;
    }
    _read(e) {
      if (e === 0) return this.emptyBuffer();
      if (e > this._totalLength) throw Error("Cannot read so many bytes!");
      if (this._chunks[0].byteLength === e) {
        let a = this._chunks[0];
        return (this._chunks.shift(), (this._totalLength -= e), this.asNative(a));
      }
      if (this._chunks[0].byteLength > e) {
        let a = this._chunks[0],
          H = this.asNative(a, e);
        return ((this._chunks[0] = a.slice(e)), (this._totalLength -= e), H);
      }
      let t = this.allocNative(e),
        r = 0,
        s = 0;
      while (e > 0) {
        let a = this._chunks[s];
        if (a.byteLength > e) {
          let H = a.slice(0, e);
          (t.set(H, r), (r += e), (this._chunks[s] = a.slice(e)), (this._totalLength -= e), (e -= e));
        } else
          (t.set(a, r),
            (r += a.byteLength),
            this._chunks.shift(),
            (this._totalLength -= a.byteLength),
            (e -= a.byteLength));
      }
      return t;
    }
  }
  UGi.AbstractMessageBuffer = OGi;
});