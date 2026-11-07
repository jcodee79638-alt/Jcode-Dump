
var cqn = Ie(function (aqn) {
  Object.defineProperty(aqn, "__esModule", { value: !0 });
  aqn.TracerMetrics = void 0;
  var Ioe = oSe(),
    f5 = sqn();
  class oqn {
    startedSpans;
    liveSpans;
    constructor(e) {
      ((this.startedSpans = e.createCounter(f5.METRIC_OTEL_SDK_SPAN_STARTED, {
        unit: "{span}",
        description: "The number of created spans.",
      })),
        (this.liveSpans = e.createUpDownCounter(f5.METRIC_OTEL_SDK_SPAN_LIVE, {
          unit: "{span}",
          description: "The number of currently live spans.",
        })));
    }
    startSpan(e, t) {
      let r = mjo(t);
      if (
        (this.startedSpans.add(1, {
          [f5.ATTR_OTEL_SPAN_PARENT_ORIGIN]: djo(e),
          [f5.ATTR_OTEL_SPAN_SAMPLING_RESULT]: r,
        }),
        t === Ioe.SamplingDecision.NOT_RECORD)
      )
        return () => {};
      let s = { [f5.ATTR_OTEL_SPAN_SAMPLING_RESULT]: r };
      return (
        this.liveSpans.add(1, s),
        () => {
          this.liveSpans.add(-1, s);
        }
      );
    }
  }
  aqn.TracerMetrics = oqn;
  function djo(e) {
    if (!e) return "none";
    if (e.isRemote) return "remote";
    return "local";
  }
  function mjo(e) {
    switch (e) {
      case Ioe.SamplingDecision.RECORD_AND_SAMPLED:
        return "RECORD_AND_SAMPLE";
      case Ioe.SamplingDecision.RECORD:
        return "RECORD_ONLY";
      case Ioe.SamplingDecision.NOT_RECORD:
        return "DROP";
    }
  }
});