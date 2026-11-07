
var jHr = Ie(function (h6n) {
  Object.defineProperty(h6n, "__esModule", { value: !0 });
  h6n.getSpanContext =
    h6n.setSpanContext =
    h6n.deleteSpan =
    h6n.setSpan =
    h6n.getActiveSpan =
    h6n.getSpan =
      void 0;
  var p6n = qVe(),
    d6n = tgt(),
    m6n = XVe(),
    vHr = p6n.createContextKey("OpenTelemetry Context Key SPAN");
  function bHr(e) {
    return e.getValue(vHr) || void 0;
  }
  h6n.getSpan = bHr;
  function $ho() {
    return bHr(m6n.ContextAPI.getInstance().active());
  }
  h6n.getActiveSpan = $ho;
  function _6n(e, t) {
    return e.setValue(vHr, t);
  }
  h6n.setSpan = _6n;
  function gho(e) {
    return e.deleteValue(vHr);
  }
  h6n.deleteSpan = gho;
  function Eho(e, t) {
    return _6n(e, new d6n.NonRecordingSpan(t));
  }
  h6n.setSpanContext = Eho;
  function Iho(e) {
    var t;
    return (t = bHr(e)) === null || t === void 0 ? void 0 : t.spanContext();
  }
  h6n.getSpanContext = Iho;
});