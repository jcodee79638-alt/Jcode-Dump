
var u0t = ne(() => {
  Jg();
  YA();
  BH();
  Dd();
  Hf();
  Yu();
  gQ();
  Ocr();
  H7e();
  ((tE = Tl(kf(), 1)), (c0t = Tl(foe(), 1)));
  Nme = class Nme extends _i()("@effect/opentelemetry/Tracer") {};
  A0t = class A0t extends _i()("@effect/opentelemetry/Tracer/OtelTracerProvider") {};
  Rcr = class Rcr extends _i()("@effect/opentelemetry/Tracer/OtelTraceFlags") {};
  Wcr = class Wcr extends _i()("@effect/opentelemetry/Tracer/OtelTraceState") {};
  ((Gjo = Vn(IQt(Nme), (e) =>
    JKt({
      span(t) {
        return new qcr(tE.context, tE.trace, e, t);
      },
      context(t, r) {
        let s = r.currentSpan;
        if (s === void 0) return t["~effect/Effect/evaluate"](r);
        return tE.context.with(RGn(tE.context.active(), s), () => t["~effect/Effect/evaluate"](r));
      },
    }),
  )),
    (Xjo = Es(
      Nme,
      ft(function* () {
        let e = yield* d5;
        return (yield* A0t).getTracer(
          e.attributes[c0t.ATTR_SERVICE_NAME],
          e.attributes[c0t.ATTR_SERVICE_VERSION],
        );
      }),
    )),
    (Jjo = Es(mut, Gjo)),
    (FGn = Jjo.pipe(Jm(Xjo))),
    (Kjo = {
      internal: tE.SpanKind.INTERNAL,
      client: tE.SpanKind.CLIENT,
      server: tE.SpanKind.SERVER,
      producer: tE.SpanKind.PRODUCER,
      consumer: tE.SpanKind.CONSUMER,
    }));
  qcr = class qcr {
    [Bcr];
    _tag = "Span";
    name;
    kind;
    annotations;
    links;
    span;
    spanId;
    traceId;
    attributes = new Map();
    sampled;
    parent;
    status;
    constructor(e, t, r, s) {
      ((this[Bcr] = Bcr),
        (this.name = s.name),
        (this.annotations = s.annotations),
        (this.links = s.links),
        (this.kind = s.kind));
      let a = e.active();
      ((this.parent = s.root !== !0 ? Ztn(s.parent, () => Qjo(t, a, s.annotations)) : s.parent),
        (this.span = r.startSpan(
          s.name,
          {
            startTime: pSe(s.startTime),
            links:
              s.links.length > 0
                ? s.links.map((u) => ({ context: Vcr(u.span), attributes: H0t(u.attributes) }))
                : void 0,
            kind: Kjo[this.kind],
          },
          Nu(this.parent) ? RGn(a, this.parent.value, s.annotations) : tE.trace.deleteSpan(a),
        )));
      let H = this.span.spanContext();
      ((this.spanId = H.spanId),
        (this.traceId = H.traceId),
        (this.status = { _tag: "Started", startTime: s.startTime }),
        (this.sampled = zjo(H.traceFlags)));
    }
    attribute(e, t) {
      (this.span.setAttribute(e, dSe(t)), this.attributes.set(e, t));
    }
    addLinks(e) {
      (this.links.push(...e),
        this.span.addLinks(e.map((t) => ({ context: Vcr(t.span), attributes: H0t(t.attributes) }))));
    }
    end(e, t) {
      let r = pSe(e);
      if (
        ((this.status = { _tag: "Ended", endTime: e, exit: t, startTime: this.status.startTime }),
        t._tag === "Success")
      )
        this.span.setStatus({ code: tE.SpanStatusCode.OK });
      else if (d1(t.cause))
        (this.span.setStatus({ code: tE.SpanStatusCode.OK, message: BC(t.cause) }),
          this.span.setAttribute("span.label", "\u26A0\uFE0E Interrupted"),
          this.span.setAttribute("status.interrupted", !0));
      else {
        let s = Uin(t.cause);
        if (s.length > 0) {
          for (let a of s) this.span.recordException(a, r);
          this.span.setStatus({ code: tE.SpanStatusCode.ERROR, message: s[0].message });
        } else this.span.setStatus({ code: tE.SpanStatusCode.OK });
      }
      this.span.end(r);
    }
    event(e, t, r) {
      this.span.addEvent(e, r ? H0t(r) : void 0, pSe(t));
    }
  };
});