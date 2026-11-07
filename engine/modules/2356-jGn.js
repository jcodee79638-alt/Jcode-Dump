
var jGn = ne(() => {
  o7e();
  MGn();
  R0();
  Jq();
  YA();
  BH();
  Dd();
  Ypt();
  Yu();
  _ie();
  gQ();
  Ocr();
  H7e();
  Ncr = class Ncr extends _i()("@effect/opentelemetry/Logger/OtelLoggerProvider") {};
  Ojo = ft(function* () {
    let e = yield* Ncr,
      t = yield* y6,
      r = e.getLogger("@effect/opentelemetry");
    return GRe((s) => {
      let a = { fiberId: s.fiber.id },
        H = rpe(s.fiber.context, IW);
      if (SS(H)) ((a.spanId = H.spanId), (a.traceId = H.traceId));
      for (let [_, L] of Object.entries(s.fiber.getRef(die))) a[_] = dSe(L);
      let u = s.date.getTime();
      for (let [_, L] of s.fiber.getRef(mie)) a[`logSpan.${_}`] = `${u - L}ms`;
      let f = Rq(s.message).map(dSe),
        d = pSe(t.currentTimeNanosUnsafe());
      r.emit({
        body: f.length === 1 ? f[0] : f,
        severityText: s.logLevel,
        severityNumber: kjo(s.logLevel),
        timestamp: d,
        observedTimestamp: d,
        attributes: a,
      });
    });
  });
});