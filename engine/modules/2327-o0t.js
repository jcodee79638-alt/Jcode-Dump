
class o0t {
  constructor() {
    this._proxyLoggerProvider = new s0t();
  }
  static getInstance() {
    if (!this._instance) this._instance = new o0t();
    return this._instance;
  }
  setGlobalLoggerProvider(e) {
    if (fSe[s7e]) return this.getLoggerProvider();
    return ((fSe[s7e] = AGn(Mcr, e, i0t)), this._proxyLoggerProvider._setDelegate(e), e);
  }
  getLoggerProvider() {
    var e, t;
    return (t = (e = fSe[s7e]) === null || e === void 0 ? void 0 : e.call(fSe, Mcr)) !== null && t !== void 0
      ? t
      : this._proxyLoggerProvider;
  }
  getLogger(e, t, r) {
    return this.getLoggerProvider().getLogger(e, t, r);
  }
  disable() {
    (delete fSe[s7e], (this._proxyLoggerProvider = new s0t()));
  }
}