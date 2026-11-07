
var i8n = Ie(function (r8n) {
  Object.defineProperty(r8n, "__esModule", { value: !0 });
  r8n.TraceStateImpl = void 0;
  var sgt = Y6n(),
    Z6n = 32,
    zho = 512,
    e8n = ",",
    t8n = "=";
  class BHr {
    constructor(e) {
      if (((this._internalState = new Map()), e)) this._parse(e);
    }
    set(e, t) {
      let r = this._clone();
      if (r._internalState.has(e)) r._internalState.delete(e);
      return (r._internalState.set(e, t), r);
    }
    unset(e) {
      let t = this._clone();
      return (t._internalState.delete(e), t);
    }
    get(e) {
      return this._internalState.get(e);
    }
    serialize() {
      return this._keys()
        .reduce((e, t) => (e.push(t + t8n + this.get(t)), e), [])
        .join(e8n);
    }
    _parse(e) {
      if (e.length > zho) return;
      if (
        ((this._internalState = e
          .split(e8n)
          .reverse()
          .reduce((t, r) => {
            let s = r.trim(),
              a = s.indexOf(t8n);
            if (a !== -1) {
              let H = s.slice(0, a),
                u = s.slice(a + 1, r.length);
              if (sgt.validateKey(H) && sgt.validateValue(u)) t.set(H, u);
            }
            return t;
          }, new Map())),
        this._internalState.size > Z6n)
      )
        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, Z6n));
    }
    _keys() {
      return Array.from(this._internalState.keys()).reverse();
    }
    _clone() {
      let e = new BHr();
      return ((e._internalState = new Map(this._internalState)), e);
    }
  }
  r8n.TraceStateImpl = BHr;
});