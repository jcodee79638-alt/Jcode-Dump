
function xi(e, n, i = !1) {
  if (i) return "hidden";
  if (e.permissions.length) return "permission";
  if (e.questions.length) return "question";
  if (e.status !== "busy") return "hidden";
  if (e.waitingForSlot) return "capacity";
  if (e.retrying) return "reconnecting";
  const s = e.messages.slice(e.messages.map((a) => a.role).lastIndexOf("user") + 1),
    l = s.filter((a) => a.role === "assistant").at(-1);
  return l?.error
    ? "hidden"
    : s.some(
          (a) =>
            a.role === "assistant" &&
            a.completedAt === void 0 &&
            a.parts.some((c) => c.type === "tool" && (c.status === "pending" || c.status === "running")),
        )
      ? "tool"
      : l?.completedAt === void 0 &&
          l?.parts.filter((a) => a.type === "tool" || (a.type === "text" && a.text?.trim())).at(-1)?.type ===
            "text"
        ? "responding"
        : n === "off"
          ? "working"
          : "thinking";
}