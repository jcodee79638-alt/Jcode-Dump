
var JVe = Ie(function (EOn) {
  Object.defineProperty(EOn, "__esModule", { value: !0 });
  EOn.isTracingSuppressed = EOn.unsuppressTracing = EOn.suppressTracing = void 0;
  var gOn = kf(),
    ecr = gOn.createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
  function DLo(e) {
    return e.setValue(ecr, !0);
  }
  EOn.suppressTracing = DLo;
  function yLo(e) {
    return e.deleteValue(ecr);
  }
  EOn.unsuppressTracing = yLo;
  function MLo(e) {
    return e.getValue(ecr) === !0;
  }
  EOn.isTracingSuppressed = MLo;
});