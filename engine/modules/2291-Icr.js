
var Icr = Ie(function (C4n) {
  Object.defineProperty(C4n, "__esModule", { value: !0 });
  C4n.buildSamplerFromEnv = C4n.loadDefaultConfig = void 0;
  var cSe = kf(),
    b1 = bD(),
    Jgt = Wgt(),
    HSe = Vgt(),
    goe = gcr(),
    Kgt = Ecr(),
    l5;
  (function (e) {
    ((e.AlwaysOff = "always_off"),
      (e.AlwaysOn = "always_on"),
      (e.ParentBasedAlwaysOff = "parentbased_always_off"),
      (e.ParentBasedAlwaysOn = "parentbased_always_on"),
      (e.ParentBasedTraceIdRatio = "parentbased_traceidratio"),
      (e.TraceIdRatio = "traceidratio"));
  })(l5 || (l5 = {}));
  var Xgt = 1;
  function rjo() {
    return {
      sampler: P4n(),
      forceFlushTimeoutMillis: 30000,
      generalLimits: {
        attributeValueLengthLimit: b1.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? 1 / 0,
        attributeCountLimit: b1.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128,
      },
      spanLimits: {
        attributeValueLengthLimit: b1.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? 1 / 0,
        attributeCountLimit: b1.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? 128,
        linkCountLimit: b1.getNumberFromEnv("OTEL_SPAN_LINK_COUNT_LIMIT") ?? 128,
        eventCountLimit: b1.getNumberFromEnv("OTEL_SPAN_EVENT_COUNT_LIMIT") ?? 128,
        attributePerEventCountLimit: b1.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT") ?? 128,
        attributePerLinkCountLimit: b1.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT") ?? 128,
      },
    };
  }
  C4n.loadDefaultConfig = rjo;
  function P4n() {
    let e = b1.getStringFromEnv("OTEL_TRACES_SAMPLER") ?? l5.ParentBasedAlwaysOn;
    switch (e) {
      case l5.AlwaysOn:
        return new HSe.AlwaysOnSampler();
      case l5.AlwaysOff:
        return new Jgt.AlwaysOffSampler();
      case l5.ParentBasedAlwaysOn:
        return new goe.ParentBasedSampler({ root: new HSe.AlwaysOnSampler() });
      case l5.ParentBasedAlwaysOff:
        return new goe.ParentBasedSampler({ root: new Jgt.AlwaysOffSampler() });
      case l5.TraceIdRatio:
        return new Kgt.TraceIdRatioBasedSampler(j4n());
      case l5.ParentBasedTraceIdRatio:
        return new goe.ParentBasedSampler({ root: new Kgt.TraceIdRatioBasedSampler(j4n()) });
      default:
        return (
          cSe.diag.error(
            `OTEL_TRACES_SAMPLER value "${e}" invalid, defaulting to "${l5.ParentBasedAlwaysOn}".`,
          ),
          new goe.ParentBasedSampler({ root: new HSe.AlwaysOnSampler() })
        );
    }
  }
  C4n.buildSamplerFromEnv = P4n;
  function j4n() {
    let e = b1.getNumberFromEnv("OTEL_TRACES_SAMPLER_ARG");
    if (e == null) return (cSe.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${Xgt}.`), Xgt);
    if (e < 0 || e > 1)
      return (
        cSe.diag.error(
          `OTEL_TRACES_SAMPLER_ARG=${e} was given, but it is out of range ([0..1]), defaulting to ${Xgt}.`,
        ),
        Xgt
      );
    return e;
  }
});