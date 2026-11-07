
function Ls(e, t, n) {
  let i = t?.messages.filter((p) => !e.messages.has(p.id) && p.createdAt >= e.task.startedAt) ?? [];
  if (
    !t ||
    t.chat.id !== e.task.sessionId ||
    t.chat.directory.toLowerCase() !== e.task.directory.toLowerCase()
  )
    return { outcome: "unknown", messages: [] };
  if (t.permissions.length || t.questions.length) return { outcome: "needs_attention", messages: i };
  if (t.status === "busy") return { outcome: "running", messages: i };
  if (e.sending) return { outcome: "unknown", messages: i };
  if (
    i.some((p) =>
      p.parts.some((w) => w.type === "tool" && (w.status === "pending" || w.status === "running")),
    )
  )
    return { outcome: "unknown", messages: i };
  let r = i.filter((p) => p.role === "user").at(-1),
    s = i.filter((p) => p.role === "assistant").at(-1),
    o = e.busy || !!(r && s && s.createdAt >= r.createdAt && s.completedAt && s.completedAt >= s.createdAt),
    l =
      r && o && e.executionIdle === !0 && n.state === "connected"
        ? { outcome: "interrupted", messages: i, state: "interrupted" }
        : void 0,
    u =
      e.cancelled && e.busy && n.state === "connected"
        ? { outcome: "interrupted", messages: i, state: "cancelled" }
        : void 0;
  if (!r || !s || s.createdAt < r.createdAt || !s.completedAt || s.completedAt < s.createdAt)
    return u ?? l ?? { outcome: n.state === "stopped" ? "interrupted" : "unknown", messages: i };
  if (e.cancelled && s.error === "Response stopped.") return u ?? { outcome: "unknown", messages: i };
  if (s.finish === "error" && !s.error) return u ?? l ?? { outcome: "unknown", messages: i };
  if (!s.error && s.finish !== "stop" && s.parts.some((p) => p.type === "tool"))
    return u ?? l ?? { outcome: "unknown", messages: i };
  return {
    outcome: s.error ? "interrupted" : "finished",
    messages: i,
    state: s.error ? "failed" : "completed",
  };
}