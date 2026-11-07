
var z8n = Ie(function (J8n) {
  Object.defineProperty(J8n, "__esModule", { value: !0 });
  J8n.TraceAPI = void 0;
  var Zxe = vme(),
    cgt = kHr(),
    Agt = ngt(),
    X2 = jHr(),
    ugt = bme(),
    JHr = "trace";
  class KHr {
    constructor() {
      ((this._proxyTracerProvider = new cgt.ProxyTracerProvider()),
        (this.wrapSpanContext = Agt.wrapSpanContext),
        (this.isSpanContextValid = Agt.isSpanContextValid),
        (this.deleteSpan = X2.deleteSpan),
        (this.getSpan = X2.getSpan),
        (this.getActiveSpan = X2.getActiveSpan),
        (this.getSpanContext = X2.getSpanContext),
        (this.setSpan = X2.setSpan),
        (this.setSpanContext = X2.setSpanContext));
    }
    static getInstance() {
      if (!this._instance) this._instance = new KHr();
      return this._instance;
    }
    setGlobalTracerProvider(e) {
      let t = Zxe.registerGlobal(JHr, this._proxyTracerProvider, ugt.DiagAPI.instance());
      if (t) this._proxyTracerProvider.setDelegate(e);
      return t;
    }
    getTracerProvider() {
      return Zxe.getGlobal(JHr) || this._proxyTracerProvider;
    }
    getTracer(e, t) {
      return this.getTracerProvider().getTracer(e, t);
    }
    disable() {
      (Zxe.unregisterGlobal(JHr, ugt.DiagAPI.instance()),
        (this._proxyTracerProvider = new cgt.ProxyTracerProvider()));
    }
  }
  J8n.TraceAPI = KHr;
});