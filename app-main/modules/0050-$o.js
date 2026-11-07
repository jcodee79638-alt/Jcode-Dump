
function $o(e) {
  let t = Q(e),
    n = Q(t.info);
  if (n.role !== "user" && n.role !== "assistant") return;
  if (n.role === "assistant" && n.summary === !0) return;
  return {
    id: M(n.id),
    role: n.role,
    createdAt: Mt(Q(n.time).created),
    completedAt: Mt(Q(n.time).completed) || void 0,
    parts: jn(t.parts)
      .map(ki)
      .filter((i) => !!i),
    error: n.error ? xr(n.error) : void 0,
    ...(yi(n.error) ? { quotaStopped: !0 } : {}),
    ...(n.role === "assistant" &&
    ["length", "stop", "tool-calls", "error"].includes(String(n.finish)) &&
    Mt(Q(n.time).completed) > 0 &&
    !n.error
      ? { finish: n.finish }
      : {}),
  };
}