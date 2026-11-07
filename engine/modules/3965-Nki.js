
async function Nki({ content: e, tools: t }) {
  let r = [],
    s = [];
  for (let H of e) {
    if (H.type === "source") continue;
    if ((H.type === "tool-result" || H.type === "tool-error") && !H.providerExecuted) continue;
    if (H.type === "text" && H.text.length === 0) continue;
    switch (H.type) {
      case "text":
        s.push({ type: "text", text: H.text, providerOptions: H.providerMetadata });
        break;
      case "reasoning":
        s.push({ type: "reasoning", text: H.text, providerOptions: H.providerMetadata });
        break;
      case "file":
        s.push({
          type: "file",
          data: H.file.base64,
          mediaType: H.file.mediaType,
          providerOptions: H.providerMetadata,
        });
        break;
      case "tool-call":
        s.push({
          type: "tool-call",
          toolCallId: H.toolCallId,
          toolName: H.toolName,
          input: H.invalid && typeof H.input !== "object" ? {} : H.input,
          providerExecuted: H.providerExecuted,
          providerOptions: H.providerMetadata,
        });
        break;
      case "tool-result": {
        let u = await cje({
          toolCallId: H.toolCallId,
          input: H.input,
          tool: t == null ? void 0 : t[H.toolName],
          output: H.output,
          errorMode: "none",
        });
        s.push({
          type: "tool-result",
          toolCallId: H.toolCallId,
          toolName: H.toolName,
          output: u,
          providerOptions: H.providerMetadata,
        });
        break;
      }
      case "tool-error": {
        let u = await cje({
          toolCallId: H.toolCallId,
          input: H.input,
          tool: t == null ? void 0 : t[H.toolName],
          output: H.error,
          errorMode: "json",
        });
        s.push({
          type: "tool-result",
          toolCallId: H.toolCallId,
          toolName: H.toolName,
          output: u,
          providerOptions: H.providerMetadata,
        });
        break;
      }
      case "tool-approval-request":
        s.push({
          type: "tool-approval-request",
          approvalId: H.approvalId,
          toolCallId: H.toolCall.toolCallId,
        });
        break;
    }
  }
  if (s.length > 0) r.push({ role: "assistant", content: s });
  let a = [];
  for (let H of e) {
    if (!(H.type === "tool-result" || H.type === "tool-error") || H.providerExecuted) continue;
    let u = await cje({
      toolCallId: H.toolCallId,
      input: H.input,
      tool: t == null ? void 0 : t[H.toolName],
      output: H.type === "tool-result" ? H.output : H.error,
      errorMode: H.type === "tool-error" ? "text" : "none",
    });
    a.push({
      type: "tool-result",
      toolCallId: H.toolCallId,
      toolName: H.toolName,
      output: u,
      ...(H.providerMetadata != null ? { providerOptions: H.providerMetadata } : {}),
    });
  }
  if (a.length > 0) r.push({ role: "tool", content: a });
  return r;
}