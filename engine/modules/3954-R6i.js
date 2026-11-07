
async function R6i({
  toolCall: e,
  tools: t,
  tracer: r,
  telemetry: s,
  messages: a,
  abortSignal: H,
  experimental_context: u,
  stepNumber: f,
  model: d,
  onPreliminaryToolResult: _,
  onToolCallStart: L,
  onToolCallFinish: I,
}) {
  let { toolName: D, toolCallId: S, input: T } = e,
    C = t == null ? void 0 : t[D];
  if ((C == null ? void 0 : C.execute) == null) return;
  let O = {
    stepNumber: f,
    model: d,
    toolCall: e,
    messages: a,
    abortSignal: H,
    functionId: s == null ? void 0 : s.functionId,
    metadata: s == null ? void 0 : s.metadata,
    experimental_context: u,
  };
  return khe({
    name: "ai.toolCall",
    attributes: qw({
      telemetry: s,
      attributes: {
        ...whe({ operationId: "ai.toolCall", telemetry: s }),
        "ai.toolCall.name": D,
        "ai.toolCall.id": S,
        "ai.toolCall.args": { output: () => JSON.stringify(T) },
      },
    }),
    tracer: r,
    fn: async (B) => {
      let V;
      await Phe({ event: O, callbacks: L });
      let q = B5e();
      try {
        let se = qwi({
          execute: C.execute.bind(C),
          input: T,
          options: { toolCallId: S, messages: a, abortSignal: H, experimental_context: u },
        });
        for await (let ae of se)
          if (ae.type === "preliminary")
            _ == null || _({ ...e, type: "tool-result", output: ae.output, preliminary: !0 });
          else V = ae.output;
      } catch (se) {
        let ae = B5e() - q;
        return (
          await Phe({ event: { ...O, success: !1, error: se, durationMs: ae }, callbacks: I }),
          F6i(B, se),
          {
            type: "tool-error",
            toolCallId: S,
            toolName: D,
            input: T,
            error: se,
            dynamic: C.type === "dynamic",
            ...(e.providerMetadata != null ? { providerMetadata: e.providerMetadata } : {}),
          }
        );
      }
      let Z = B5e() - q;
      await Phe({ event: { ...O, success: !0, output: V, durationMs: Z }, callbacks: I });
      try {
        B.setAttributes(
          await qw({
            telemetry: s,
            attributes: { "ai.toolCall.result": { output: () => JSON.stringify(V) } },
          }),
        );
      } catch (se) {}
      return {
        type: "tool-result",
        toolCallId: S,
        toolName: D,
        input: T,
        output: V,
        dynamic: C.type === "dynamic",
        ...(e.providerMetadata != null ? { providerMetadata: e.providerMetadata } : {}),
      };
    },
  });
}