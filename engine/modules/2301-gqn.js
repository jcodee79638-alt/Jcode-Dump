
var gqn = Ie(function (Lqn) {
  Object.defineProperty(Lqn, "__esModule", { value: !0 });
  Lqn.Tracer = void 0;
  var jm = kf(),
    Doe = bD(),
    fqn = p4n(),
    pqn = Dcr(),
    dqn = ycr(),
    mqn = cqn(),
    _qn = lqn();
  class hqn {
    _sampler;
    _generalLimits;
    _spanLimits;
    _idGenerator;
    instrumentationScope;
    _resource;
    _spanProcessor;
    _tracerMetrics;
    constructor(e, t, r, s) {
      let a = pqn.mergeConfig(t);
      ((this._sampler = a.sampler),
        (this._generalLimits = a.generalLimits),
        (this._spanLimits = a.spanLimits),
        (this._idGenerator = t.idGenerator || new dqn.RandomIdGenerator()),
        (this._resource = r),
        (this._spanProcessor = s),
        (this.instrumentationScope = e));
      let H = a.meterProvider
        ? a.meterProvider.getMeter("@opentelemetry/sdk-trace", _qn.VERSION)
        : jm.createNoopMeter();
      this._tracerMetrics = new mqn.TracerMetrics(H);
    }
    startSpan(e, t = {}, r = jm.context.active()) {
      if (t.root) r = jm.trace.deleteSpan(r);
      let s = jm.trace.getSpan(r);
      if (Doe.isTracingSuppressed(r))
        return (
          jm.diag.debug("Instrumentation suppressed, returning Noop Span"),
          jm.trace.wrapSpanContext(jm.INVALID_SPAN_CONTEXT)
        );
      let a = s?.spanContext(),
        H = this._idGenerator.generateSpanId(),
        u,
        f,
        d;
      if (!a || !jm.trace.isSpanContextValid(a)) f = this._idGenerator.generateTraceId();
      else ((f = a.traceId), (d = a.traceState), (u = a));
      let _ = t.kind ?? jm.SpanKind.INTERNAL,
        L = (t.links ?? []).map((V) => ({
          context: V.context,
          attributes: Doe.sanitizeAttributes(V.attributes),
        })),
        I = Doe.sanitizeAttributes(t.attributes),
        D = this._sampler.shouldSample(r, f, e, _, I, L),
        S = this._tracerMetrics.startSpan(a, D.decision);
      d = D.traceState ?? d;
      let T =
          D.decision === jm.SamplingDecision.RECORD_AND_SAMPLED ? jm.TraceFlags.SAMPLED : jm.TraceFlags.NONE,
        C = { traceId: f, spanId: H, traceFlags: T, traceState: d };
      if (D.decision === jm.SamplingDecision.NOT_RECORD)
        return (
          jm.diag.debug("Recording is off, propagating context in a non-recording span"),
          jm.trace.wrapSpanContext(C)
        );
      let O = Doe.sanitizeAttributes(Object.assign(I, D.attributes));
      return new fqn.SpanImpl({
        resource: this._resource,
        scope: this.instrumentationScope,
        context: r,
        spanContext: C,
        name: e,
        kind: _,
        links: L,
        parentSpanContext: u,
        attributes: O,
        startTime: t.startTime,
        spanProcessor: this._spanProcessor,
        spanLimits: this._spanLimits,
        recordEndMetrics: S,
      });
    }
    startActiveSpan(e, t, r, s) {
      let a, H, u;
      if (arguments.length < 2) return;
      else if (arguments.length === 2) u = t;
      else if (arguments.length === 3) ((a = t), (u = r));
      else ((a = t), (H = r), (u = s));
      let f = H ?? jm.context.active(),
        d = this.startSpan(e, a, f),
        _ = jm.trace.setSpan(f, d);
      return jm.context.with(_, u, void 0, d);
    }
    getGeneralLimits() {
      return this._generalLimits;
    }
    getSpanLimits() {
      return this._spanLimits;
    }
  }
  Lqn.Tracer = hqn;
});