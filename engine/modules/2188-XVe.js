
var XVe = Ie(function (r6n) {
  Object.defineProperty(r6n, "__esModule", { value: !0 });
  r6n.ContextAPI = void 0;
  var t6n = e6n(),
    Kxe = vme(),
    Z$t = bme(),
    MHr = "context",
    hho = new t6n.NoopContextManager();
  class xHr {
    constructor() {}
    static getInstance() {
      if (!this._instance) this._instance = new xHr();
      return this._instance;
    }
    setGlobalContextManager(e) {
      return Kxe.registerGlobal(MHr, e, Z$t.DiagAPI.instance());
    }
    active() {
      return this._getContextManager().active();
    }
    with(e, t, r, ...s) {
      return this._getContextManager().with(e, t, r, ...s);
    }
    bind(e, t) {
      return this._getContextManager().bind(e, t);
    }
    _getContextManager() {
      return Kxe.getGlobal(MHr) || hho;
    }
    disable() {
      (this._getContextManager().disable(), Kxe.unregisterGlobal(MHr, Z$t.DiagAPI.instance()));
    }
  }
  r6n.ContextAPI = xHr;
});