
var XKt = "effect/Tracer/ParentSpan",
  IW,
  JKt = (e) => e,
  _ye = (e) => ({
    _tag: "ExternalSpan",
    spanId: e.spanId,
    traceId: e.traceId,
    sampled: e.sampled ?? !0,
    annotations: e.annotations ?? Hg(),
  }),
  hye,
  krn,
  Orn,
  KKt = "effect/Tracer",
  mut,
  wrn;