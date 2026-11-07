
async function Uki({ toolCall: e, tools: t }) {
  let r = e.toolName,
    s = t[r];
  if (s == null) {
    if (e.providerExecuted && e.dynamic) return await W6i(e);
    throw new $Dr({ toolName: e.toolName, availableTools: Object.keys(t) });
  }
  let a = Rw(s.inputSchema),
    H = e.input.trim() === "" ? await Ww({ value: {}, schema: a }) : await LP({ text: e.input, schema: a });
  if (H.success === !1) throw new DDr({ toolName: r, toolInput: e.input, cause: H.error });
  return s.type === "dynamic"
    ? {
        type: "tool-call",
        toolCallId: e.toolCallId,
        toolName: e.toolName,
        input: H.value,
        providerExecuted: e.providerExecuted,
        providerMetadata: e.providerMetadata,
        dynamic: !0,
        title: s.title,
      }
    : {
        type: "tool-call",
        toolCallId: e.toolCallId,
        toolName: r,
        input: H.value,
        providerExecuted: e.providerExecuted,
        providerMetadata: e.providerMetadata,
        title: s.title,
      };
}