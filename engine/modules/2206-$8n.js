
var $8n = Ie(function (h8n) {
  Object.defineProperty(h8n, "__esModule", { value: !0 });
  h8n.NOOP_METER_PROVIDER = h8n.NoopMeterProvider = void 0;
  var _8n = IHr();
  class RHr {
    getMeter(e, t, r) {
      return _8n.NOOP_METER;
    }
  }
  h8n.NoopMeterProvider = RHr;
  h8n.NOOP_METER_PROVIDER = new RHr();
});