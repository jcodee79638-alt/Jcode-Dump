
function ki(e) {
  let t = Q(e),
    n = Q(t.state);
  if (t.type === "text" && t.synthetic !== !0 && t.ignored !== !0)
    return { id: M(t.id), type: "text", text: M(t.text) };
  if (t.type === "tool")
    return {
      id: M(t.id),
      type: "tool",
      tool: M(t.tool),
      status:
        n.status === "pending" || n.status === "running" || n.status === "completed" || n.status === "error"
          ? n.status
          : "pending",
      title: M(n.title) || void 0,
      output: M(n.output) || void 0,
      error: n.status === "error" ? "This tool could not complete. Check its output and try again." : void 0,
      childSessionId: M(Q(n.metadata).sessionId) || void 0,
      ...(["shell", "bash"].includes(M(t.tool))
        ? {
            command: M(Q(t.input ?? n.input).command).slice(0, 2000) || M(n.title).slice(0, 2000) || void 0,
            exitCode: Number.isSafeInteger(Q(n.metadata).exit) ? Number(Q(n.metadata).exit) : void 0,
          }
        : {}),
    };
  if (t.type === "file") return { id: M(t.id), type: "file", filename: M(t.filename), mime: M(t.mime) };
  if (t.type === "step-start" || t.type === "step-finish")
    return { id: M(t.id), type: "step", title: t.type === "step-start" ? "Working" : "Step completed" };
}