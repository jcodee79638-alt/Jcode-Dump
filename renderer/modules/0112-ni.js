
function ni(e, n) {
  return !e ||
    e.status !== "idle" ||
    e.permissions.length ||
    e.questions.length ||
    !n?.admission.allowed ||
    n.globalPaused
    ? !1
    : e.messages.slice(e.messages.map((s) => s.role).lastIndexOf("user") + 1).at(-1)?.quotaStopped === !0;
}