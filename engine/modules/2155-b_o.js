
var b_o,
  j_o = (e, t) => {
    let s = t.clock.currentTimeNanosUnsafe().toString(),
      a = e.date.getTime(),
      H = sHr(Object.entries(e.fiber.getRef(die)));
    if ((H.push({ key: "fiberId", value: { intValue: e.fiber.id } }), !t.excludeLogSpans))
      for (let [d, _] of e.fiber.getRef(mie))
        H.push({ key: `logSpan.${d}`, value: { stringValue: `${a - _}ms` } });
    if (e.cause.reasons.length > 0) H.push({ key: "log.error", value: { stringValue: BC(e.cause) } });
    let u = Rq(e.message),
      f = {
        severityNumber: P_o(e.logLevel),
        severityText: e.logLevel,
        timeUnixNano: s,
        observedTimeUnixNano: s,
        attributes: H,
        body: X$t(u.length === 1 ? u[0] : u),
        droppedAttributesCount: 0,
      };
    if (e.fiber.currentSpan)
      ((f.traceId = e.fiber.currentSpan.traceId), (f.spanId = e.fiber.currentSpan.spanId));
    return f;
  },
  P_o = (e) => {
    switch (e) {
      case "Trace":
        return xme.SEVERITY_NUMBER_TRACE;
      case "Debug":
        return xme.SEVERITY_NUMBER_DEBUG;
      case "Info":
        return xme.SEVERITY_NUMBER_INFO;
      case "Warn":
        return xme.SEVERITY_NUMBER_WARN;
      case "Error":
        return xme.SEVERITY_NUMBER_ERROR;
      case "Fatal":
        return xme.SEVERITY_NUMBER_FATAL;
      default:
        return xme.SEVERITY_NUMBER_UNSPECIFIED;
    }
  },
  xme;