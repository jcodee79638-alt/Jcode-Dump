
var tE,
  c0t,
  Nme,
  A0t,
  Rcr,
  Wcr,
  Gjo,
  Xjo,
  Jjo,
  FGn,
  Bcr = "~@effect/opentelemetry/Tracer/OtelSpan",
  Kjo,
  qcr,
  zjo = (e) => (e & tE.TraceFlags.SAMPLED) === tE.TraceFlags.SAMPLED,
  Qjo = (e, t, r) => {
    let s = e.getSpan(t)?.spanContext();
    if (!s) return eH();
    return Lo(
      _ye({ spanId: s.spanId, traceId: s.traceId, sampled: (s.traceFlags & 1) === 1, annotations: r }),
    );
  },
  Vcr = (e, t) => {
    let r = Yjo(e, t),
      s = Zjo(e, t);
    return {
      spanId: e.spanId,
      traceId: e.traceId,
      isRemote: e._tag === "ExternalSpan",
      traceFlags: r,
      traceState: s,
    };
  },
  Yjo = (e, t) => {
    let r;
    if (SS(t)) {
      if (((r = BGn(e, t, Rcr)), Iv(r))) r = rpe(e.annotations, Rcr);
    }
    return r ?? tE.TraceFlags.SAMPLED;
  },
  Zjo = (e, t) => {
    let r;
    if (SS(t)) {
      if (((r = BGn(e, t, Wcr)), Iv(r))) r = rpe(e.annotations, Wcr);
    }
    return r;
  },
  BGn = (e, t, r) => {
    let s = rpe(t, r);
    if (SS(s)) return s;
    return rpe(e.annotations, r);
  },
  RGn = (e, t, r) => (t instanceof qcr ? tE.trace.setSpan(e, t.span) : tE.trace.setSpanContext(e, Vcr(t, r)));