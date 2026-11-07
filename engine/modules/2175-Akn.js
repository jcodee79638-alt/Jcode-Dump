
var Akn = Ie(function (Hkn) {
  Object.defineProperty(Hkn, "__esModule", { value: !0 });
  Hkn.DiagComponentLogger = void 0;
  var okn = vme();
  class akn {
    constructor(e) {
      this._namespace = e.namespace || "DiagComponentLogger";
    }
    debug(...e) {
      return VVe("debug", this._namespace, e);
    }
    error(...e) {
      return VVe("error", this._namespace, e);
    }
    info(...e) {
      return VVe("info", this._namespace, e);
    }
    warn(...e) {
      return VVe("warn", this._namespace, e);
    }
    verbose(...e) {
      return VVe("verbose", this._namespace, e);
    }
  }
  Hkn.DiagComponentLogger = akn;
  function VVe(e, t, r) {
    let s = okn.getGlobal("diag");
    if (!s) return;
    return (r.unshift(t), s[e](...r));
  }
});