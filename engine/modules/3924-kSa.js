
function kSa({ message: e, downloadedAssets: t }) {
  let r = e.role;
  switch (r) {
    case "system":
      return { role: "system", content: e.content, providerOptions: e.providerOptions };
    case "user": {
      if (typeof e.content === "string")
        return {
          role: "user",
          content: [{ type: "text", text: e.content }],
          providerOptions: e.providerOptions,
        };
      return {
        role: "user",
        content: e.content.map((s) => USa(s, t)).filter((s) => s.type !== "text" || s.text !== ""),
        providerOptions: e.providerOptions,
      };
    }
    case "assistant": {
      if (typeof e.content === "string")
        return {
          role: "assistant",
          content: [{ type: "text", text: e.content }],
          providerOptions: e.providerOptions,
        };
      return {
        role: "assistant",
        content: e.content
          .filter((s) => s.type !== "text" || s.text !== "" || s.providerOptions != null)
          .filter((s) => s.type !== "tool-approval-request")
          .map((s) => {
            let a = s.providerOptions;
            switch (s.type) {
              case "file": {
                let { data: H, mediaType: u } = w6i(s.data);
                return {
                  type: "file",
                  data: H,
                  filename: s.filename,
                  mediaType: u != null ? u : s.mediaType,
                  providerOptions: a,
                };
              }
              case "reasoning":
                return { type: "reasoning", text: s.text, providerOptions: a };
              case "text":
                return { type: "text", text: s.text, providerOptions: a };
              case "tool-call":
                return {
                  type: "tool-call",
                  toolCallId: s.toolCallId,
                  toolName: s.toolName,
                  input: s.input,
                  providerExecuted: s.providerExecuted,
                  providerOptions: a,
                };
              case "tool-result":
                return {
                  type: "tool-result",
                  toolCallId: s.toolCallId,
                  toolName: s.toolName,
                  output: kki(s.output),
                  providerOptions: a,
                };
            }
          }),
        providerOptions: e.providerOptions,
      };
    }
    case "tool":
      return {
        role: "tool",
        content: e.content
          .filter((s) => s.type !== "tool-approval-response" || s.providerExecuted)
          .map((s) => {
            switch (s.type) {
              case "tool-result":
                return {
                  type: "tool-result",
                  toolCallId: s.toolCallId,
                  toolName: s.toolName,
                  output: kki(s.output),
                  providerOptions: s.providerOptions,
                };
              case "tool-approval-response":
                return {
                  type: "tool-approval-response",
                  approvalId: s.approvalId,
                  approved: s.approved,
                  reason: s.reason,
                };
            }
          }),
        providerOptions: e.providerOptions,
      };
    default:
      throw new _Sa({ role: r });
  }
}