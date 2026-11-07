
async function W6i(e) {
  let t = e.input.trim() === "" ? { success: !0, value: {} } : await LP({ text: e.input });
  if (t.success === !1) throw new DDr({ toolName: e.toolName, toolInput: e.input, cause: t.error });
  return {
    type: "tool-call",
    toolCallId: e.toolCallId,
    toolName: e.toolName,
    input: t.value,
    providerExecuted: !0,
    dynamic: !0,
    providerMetadata: e.providerMetadata,
  };
}