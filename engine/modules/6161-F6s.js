
function F6s(e) {
  let t = k0(e),
    r = k0(t.state);
  if (t.type === "text" && t.synthetic !== !0 && t.ignored !== !0)
    return { id: OM(t.id), type: "text", text: OM(t.text) };
  if (t.type === "tool")
    return {
      id: OM(t.id),
      type: "tool",
      tool: OM(t.tool),
      status:
        r.status === "pending" || r.status === "running" || r.status === "completed" || r.status === "error"
          ? r.status
          : "pending",
      title: OM(r.title) || void 0,
      output: OM(r.output) || void 0,
      error: r.status === "error" ? "This tool could not complete. Check its output and try again." : void 0,
      childSessionId: OM(k0(r.metadata).sessionId) || void 0,
      ...(["shell", "bash"].includes(OM(t.tool))
        ? {
            command:
              OM(k0(t.input ?? r.input).command).slice(0, 2000) || OM(r.title).slice(0, 2000) || void 0,
            exitCode: Number.isSafeInteger(k0(r.metadata).exit) ? Number(k0(r.metadata).exit) : void 0,
          }
        : {}),
    };
  if (t.type === "file") return { id: OM(t.id), type: "file", filename: OM(t.filename), mime: OM(t.mime) };
  if (t.type === "step-start" || t.type === "step-finish")
    return { id: OM(t.id), type: "step", title: t.type === "step-start" ? "Working" : "Step completed" };
}