
function EPo(e, t) {
  let r = e.spanContext(),
    s = e.status,
    a = e.parentSpanContext?.spanId ? t.encodeSpanContext(e.parentSpanContext?.spanId) : void 0;
  return {
    traceId: t.encodeSpanContext(r.traceId),
    spanId: t.encodeSpanContext(r.spanId),
    parentSpanId: a,
    traceState: r.traceState?.serialize(),
    name: e.name,
    kind: e.kind == null ? 0 : e.kind + 1,
    startTimeUnixNano: t.encodeHrTime(e.startTime),
    endTimeUnixNano: t.encodeHrTime(e.endTime),
    attributes: A7e(e.attributes, t),
    droppedAttributesCount: e.droppedAttributesCount,
    events: e.events.map((H) => DPo(H, t)),
    droppedEventsCount: e.droppedEventsCount,
    status: { code: s.code, message: s.message },
    links: e.links.map((H) => IPo(H, t)),
    droppedLinksCount: e.droppedLinksCount,
    flags: D5n(r.traceFlags, e.parentSpanContext?.isRemote),
  };
}