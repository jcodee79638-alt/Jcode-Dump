
function TDr({ isEnabled: e = !1, tracer: t } = {}) {
  if (!e) return YSa;
  if (t) return t;
  return N6i.trace.getTracer("ai");
}