
var U8n = Ie(function (k8n) {
  Object.defineProperty(k8n, "__esModule", { value: !0 });
  k8n.deleteBaggage = k8n.setBaggage = k8n.getActiveBaggage = k8n.getBaggage = void 0;
  var P8n = XVe(),
    C8n = qVe(),
    qHr = C8n.createContextKey("OpenTelemetry Baggage Key");
  function w8n(e) {
    return e.getValue(qHr) || void 0;
  }
  k8n.getBaggage = w8n;
  function Zho() {
    return w8n(P8n.ContextAPI.getInstance().active());
  }
  k8n.getActiveBaggage = Zho;
  function eLo(e, t) {
    return e.setValue(qHr, t);
  }
  k8n.setBaggage = eLo;
  function tLo(e) {
    return e.deleteValue(qHr);
  }
  k8n.deleteBaggage = tLo;
});