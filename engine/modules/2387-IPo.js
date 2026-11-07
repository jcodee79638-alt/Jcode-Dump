
function IPo(e, t) {
  return {
    attributes: e.attributes ? A7e(e.attributes, t) : [],
    spanId: t.encodeSpanContext(e.context.spanId),
    traceId: t.encodeSpanContext(e.context.traceId),
    traceState: e.context.traceState?.serialize(),
    droppedAttributesCount: e.droppedAttributesCount || 0,
    flags: D5n(e.context.traceFlags, e.context.isRemote),
  };
}