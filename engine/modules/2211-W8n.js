
var W8n = Ie(function (B8n) {
  Object.defineProperty(B8n, "__esModule", { value: !0 });
  B8n.PropagationAPI = void 0;
  var Yxe = vme(),
    N8n = j8n(),
    agt = yHr(),
    uoe = U8n(),
    F8n = fHr(),
    Hgt = bme(),
    GHr = "propagation",
    sLo = new N8n.NoopTextMapPropagator();
  class XHr {
    constructor() {
      ((this.createBaggage = F8n.createBaggage),
        (this.getBaggage = uoe.getBaggage),
        (this.getActiveBaggage = uoe.getActiveBaggage),
        (this.setBaggage = uoe.setBaggage),
        (this.deleteBaggage = uoe.deleteBaggage));
    }
    static getInstance() {
      if (!this._instance) this._instance = new XHr();
      return this._instance;
    }
    setGlobalPropagator(e) {
      return Yxe.registerGlobal(GHr, e, Hgt.DiagAPI.instance());
    }
    inject(e, t, r = agt.defaultTextMapSetter) {
      return this._getGlobalPropagator().inject(e, t, r);
    }
    extract(e, t, r = agt.defaultTextMapGetter) {
      return this._getGlobalPropagator().extract(e, t, r);
    }
    fields() {
      return this._getGlobalPropagator().fields();
    }
    disable() {
      Yxe.unregisterGlobal(GHr, Hgt.DiagAPI.instance());
    }
    _getGlobalPropagator() {
      return Yxe.getGlobal(GHr) || sLo;
    }
  }
  B8n.PropagationAPI = XHr;
});