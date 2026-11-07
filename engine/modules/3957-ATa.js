
async function ATa({ tool: e, toolCall: t, messages: r, experimental_context: s }) {
  if (e.needsApproval == null) return !1;
  if (typeof e.needsApproval === "boolean") return e.needsApproval;
  return await e.needsApproval(t.input, { toolCallId: t.toolCallId, messages: r, experimental_context: s });
}