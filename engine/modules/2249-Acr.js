
var Acr = Ie(function (TWn) {
  Object.defineProperty(TWn, "__esModule", { value: !0 });
  TWn.TraceState = void 0;
  var _oe = yWn(),
    JTo = 32,
    MWn = 512,
    xWn = ",",
    SWn = "=";
  class ccr {
    _length;
    _rawTraceState;
    _internalState;
    constructor(e) {
      ((this._rawTraceState = typeof e === "string" ? e : ""), (this._length = this._rawTraceState.length));
    }
    set(e, t) {
      if (!_oe.validateKey(e) || !_oe.validateValue(t)) return this;
      let r = this._getState(),
        s = r.get(e),
        a = this._length;
      if (typeof s === "string") a += t.length - s.length;
      else a += e.length + t.length + (r.size > 0 ? 2 : 1);
      if (a > MWn) return this;
      let H = new Map(r);
      return (H.delete(e), H.set(e, t), this._fromState(H, a));
    }
    unset(e) {
      let t = this._getState(),
        r = t.get(e);
      if (typeof r !== "string") return this;
      let s = this._length - (e.length + r.length + 1);
      if (t.size > 1) s = s - 1;
      let a = new Map(t);
      return (a.delete(e), this._fromState(a, s));
    }
    get(e) {
      return this._getState().get(e);
    }
    serialize() {
      let e = "",
        t = 0;
      for (let r of this._getState()) {
        if (t > 0) e = xWn + e;
        ((e = `${r[0]}${SWn}${r[1]}` + e), t++);
      }
      return e;
    }
    _getState() {
      if (this._internalState) return this._internalState;
      let e = this._rawTraceState.split(xWn),
        t = new Map(),
        r = 0;
      for (let s of e) {
        let a = s.trim(),
          H = a.indexOf(SWn);
        if (H === -1) continue;
        let u = a.slice(0, H),
          f = a.slice(H + 1);
        if (!_oe.validateKey(u) || !_oe.validateValue(f)) continue;
        let d = r + a.length + (t.size > 0 ? 1 : 0);
        if (d > MWn) continue;
        if ((t.set(u, f), (r = d), t.size >= JTo)) break;
      }
      return (
        (this._length = r),
        (this._internalState = new Map(Array.from(t.entries()).reverse())),
        this._internalState
      );
    }
    _fromState(e, t) {
      let r = Object.create(ccr.prototype);
      return ((r._internalState = e), (r._length = t), r);
    }
  }
  TWn.TraceState = ccr;
});