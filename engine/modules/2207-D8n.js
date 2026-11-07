
var D8n = Ie(function (E8n) {
  Object.defineProperty(E8n, "__esModule", { value: !0 });
  E8n.MetricsAPI = void 0;
  var g8n = $8n(),
    Qxe = vme(),
    ogt = bme(),
    WHr = "metrics";
  class VHr {
    constructor() {}
    static getInstance() {
      if (!this._instance) this._instance = new VHr();
      return this._instance;
    }
    setGlobalMeterProvider(e) {
      return Qxe.registerGlobal(WHr, e, ogt.DiagAPI.instance());
    }
    getMeterProvider() {
      return Qxe.getGlobal(WHr) || g8n.NOOP_METER_PROVIDER;
    }
    getMeter(e, t, r) {
      return this.getMeterProvider().getMeter(e, t, r);
    }
    disable() {
      Qxe.unregisterGlobal(WHr, ogt.DiagAPI.instance());
    }
  }
  E8n.MetricsAPI = VHr;
});