
var Dcr = Ie(function (k4n) {
  Object.defineProperty(k4n, "__esModule", { value: !0 });
  k4n.reconfigureLimits =
    k4n.mergeConfig =
    k4n.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT =
    k4n.DEFAULT_ATTRIBUTE_COUNT_LIMIT =
      void 0;
  var zgt = Icr(),
    Eoe = bD();
  k4n.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
  k4n.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1 / 0;
  function ijo(e) {
    let t = { sampler: zgt.buildSamplerFromEnv() },
      r = zgt.loadDefaultConfig(),
      s = Object.assign({}, r, t, e);
    return (
      (s.generalLimits = Object.assign({}, r.generalLimits, e.generalLimits || {})),
      (s.spanLimits = Object.assign({}, r.spanLimits, e.spanLimits || {})),
      s
    );
  }
  k4n.mergeConfig = ijo;
  function sjo(e) {
    let t = Object.assign({}, e.spanLimits);
    return (
      (t.attributeCountLimit =
        e.spanLimits?.attributeCountLimit ??
        e.generalLimits?.attributeCountLimit ??
        Eoe.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ??
        Eoe.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ??
        k4n.DEFAULT_ATTRIBUTE_COUNT_LIMIT),
      (t.attributeValueLengthLimit =
        e.spanLimits?.attributeValueLengthLimit ??
        e.generalLimits?.attributeValueLengthLimit ??
        Eoe.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ??
        Eoe.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ??
        k4n.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT),
      Object.assign({}, e, { spanLimits: t })
    );
  }
  k4n.reconfigureLimits = sjo;
});