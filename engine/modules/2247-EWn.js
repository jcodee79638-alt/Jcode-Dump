
var EWn = Ie(function ($Wn) {
  Object.defineProperty($Wn, "__esModule", { value: !0 });
  $Wn.CompositePropagator = void 0;
  var Egt = kf();
  class LWn {
    _propagators;
    _fields;
    constructor(e = {}) {
      this._propagators = e.propagators ?? [];
      let t = new Set();
      for (let r of this._propagators) {
        let s = typeof r.fields === "function" ? r.fields() : [];
        for (let a of s) t.add(a);
      }
      this._fields = Array.from(t);
    }
    inject(e, t, r) {
      for (let s of this._propagators)
        try {
          s.inject(e, t, r);
        } catch (a) {
          Egt.diag.warn(`Failed to inject with ${s.constructor.name}. Err: ${a.message}`);
        }
    }
    extract(e, t, r) {
      return this._propagators.reduce((s, a) => {
        try {
          return a.extract(s, t, r);
        } catch (H) {
          Egt.diag.warn(`Failed to extract with ${a.constructor.name}. Err: ${H.message}`);
        }
        return s;
      }, e);
    }
    fields() {
      return this._fields.slice();
    }
  }
  $Wn.CompositePropagator = LWn;
});