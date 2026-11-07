
function yTa({ lastMessage: e, messageId: t }) {
  return {
    message:
      (e == null ? void 0 : e.role) === "assistant"
        ? e
        : { id: t, metadata: void 0, role: "assistant", parts: [] },
    activeTextParts: {},
    activeReasoningParts: {},
    partialToolCalls: {},
  };
}