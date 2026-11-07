
async function _Ta({ toolCall: e, tools: t, repairToolCall: r, system: s, messages: a }) {
  var H;
  try {
    if (t == null) {
      if (e.providerExecuted && e.dynamic) return await W6i(e);
      throw new $Dr({ toolName: e.toolName });
    }
    try {
      return await Uki({ toolCall: e, tools: t });
    } catch (u) {
      if (r == null || !($Dr.isInstance(u) || DDr.isInstance(u))) throw u;
      let f = null;
      try {
        f = await r({
          toolCall: e,
          tools: t,
          inputSchema: async ({ toolName: d }) => {
            let { inputSchema: _ } = t[d];
            return await Rw(_).jsonSchema;
          },
          system: s,
          messages: a,
          error: u,
        });
      } catch (d) {
        throw new cSa({ cause: d, originalError: u });
      }
      if (f == null) throw u;
      return await Uki({ toolCall: f, tools: t });
    }
  } catch (u) {
    let f = await LP({ text: e.input }),
      d = f.success ? f.value : e.input;
    return {
      type: "tool-call",
      toolCallId: e.toolCallId,
      toolName: e.toolName,
      input: d,
      dynamic: !0,
      invalid: !0,
      error: u,
      title: (H = t == null ? void 0 : t[e.toolName]) == null ? void 0 : H.title,
      providerExecuted: e.providerExecuted,
      providerMetadata: e.providerMetadata,
    };
  }
}