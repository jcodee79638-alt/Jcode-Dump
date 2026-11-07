
function SZr(e) {
  let t = k0(e),
    r = k0(t.info);
  if (r.role !== "user" && r.role !== "assistant") return;
  if (r.role === "assistant" && r.summary === !0) return;
  return {
    id: OM(r.id),
    role: r.role,
    createdAt: GF(k0(r.time).created),
    completedAt: GF(k0(r.time).completed) || void 0,
    parts: N6s(t.parts)
      .map(F6s)
      .filter((s) => !!s),
    error: r.error ? EZr(r.error) : void 0,
    ...(IZr(r.error) ? { quotaStopped: !0 } : {}),
    ...(r.role === "assistant" &&
    ["length", "stop", "tool-calls", "error"].includes(String(r.finish)) &&
    GF(k0(r.time).completed) > 0 &&
    !r.error
      ? { finish: r.finish }
      : {}),
  };
}