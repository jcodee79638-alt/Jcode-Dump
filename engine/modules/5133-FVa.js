
function FVa(e, t) {
  switch (t.type) {
    case "start":
      return Jt([]);
    case "start-step":
      return Jt([tA.stepStart({ index: e.step })]);
    case "finish-step":
      if (t.rawFinishReason === "network_error") return bn(new ayr("Provider finish_reason: network_error"));
      return jn(() => {
        let r = s9(t.providerMetadata),
          s =
            e.copilotTotalNanoAiu === void 0
              ? r
              : { ...r, copilot: { ...r?.copilot, totalNanoAiu: e.copilotTotalNanoAiu } };
        return (
          (e.copilotTotalNanoAiu = void 0),
          [
            tA.stepFinish({
              index: e.step++,
              reason: Y7i(t.finishReason),
              usage: Z7i(t.usage),
              providerMetadata: s,
            }),
          ]
        );
      });
    case "finish":
      return jn(() => {
        let r = [
          tA.finish({
            reason: Y7i(t.finishReason),
            usage: Z7i(t.totalUsage),
            providerMetadata: "providerMetadata" in t ? s9(t.providerMetadata) : void 0,
          }),
        ];
        return (Object.assign(e, e4i()), r);
      });
    case "text-start":
      return jn(
        () => (
          (e.currentTextID = Ibr(e, t.id)),
          [tA.textStart({ id: e.currentTextID, providerMetadata: s9(t.providerMetadata) })]
        ),
      );
    case "text-delta":
      return Jt([tA.textDelta({ id: Ibr(e, t.id), text: t.text, providerMetadata: s9(t.providerMetadata) })]);
    case "text-end":
      return jn(() => {
        let r = Ibr(e, t.id);
        return (
          (e.currentTextID = void 0),
          [tA.textEnd({ id: r, providerMetadata: s9(t.providerMetadata) })]
        );
      });
    case "reasoning-start":
      return jn(
        () => (
          (e.currentReasoningID = Dbr(e, t.id)),
          [tA.reasoningStart({ id: e.currentReasoningID, providerMetadata: s9(t.providerMetadata) })]
        ),
      );
    case "reasoning-delta":
      return Jt([
        tA.reasoningDelta({ id: Dbr(e, t.id), text: t.text, providerMetadata: s9(t.providerMetadata) }),
      ]);
    case "reasoning-end":
      return jn(() => {
        let r = Dbr(e, t.id);
        return (
          (e.currentReasoningID = void 0),
          [tA.reasoningEnd({ id: r, providerMetadata: s9(t.providerMetadata) })]
        );
      });
    case "tool-input-start":
      return jn(
        () => (
          (e.toolNames[t.id] = t.toolName),
          [tA.toolInputStart({ id: t.id, name: t.toolName, providerMetadata: s9(t.providerMetadata) })]
        ),
      );
    case "tool-input-delta":
      return Jt([tA.toolInputDelta({ id: t.id, name: e.toolNames[t.id] ?? "unknown", text: t.delta ?? "" })]);
    case "tool-input-end":
      return Jt([
        tA.toolInputEnd({
          id: t.id,
          name: e.toolNames[t.id] ?? "unknown",
          providerMetadata: s9(t.providerMetadata),
        }),
      ]);
    case "tool-call":
      return jn(
        () => (
          (e.toolNames[t.toolCallId] = t.toolName),
          [
            tA.toolCall({
              id: t.toolCallId,
              name: t.toolName,
              input: t.input,
              providerExecuted: "providerExecuted" in t ? t.providerExecuted : void 0,
              providerMetadata: s9(t.providerMetadata),
            }),
          ]
        ),
      );
    case "tool-result":
      return jn(() => {
        let r = e.toolNames[t.toolCallId] ?? "unknown";
        return (
          delete e.toolNames[t.toolCallId],
          [
            tA.toolResult({
              id: t.toolCallId,
              name: r,
              result: kde.make(t.output),
              providerExecuted: "providerExecuted" in t ? t.providerExecuted : void 0,
              providerMetadata: s9(t.providerMetadata),
            }),
          ]
        );
      });
    case "tool-error":
      return jn(() => {
        let r = e.toolNames[t.toolCallId] ?? ("toolName" in t ? t.toolName : "unknown");
        return (
          delete e.toolNames[t.toolCallId],
          [
            tA.toolError({
              id: t.toolCallId,
              name: r,
              message: fx(t.error),
              error: t.error,
              providerMetadata: s9(t.providerMetadata),
            }),
          ]
        );
      });
    case "error":
      return bn(t.error);
    case "abort":
    case "source":
    case "file":
    case "tool-output-denied":
    case "tool-approval-request":
      return Jt([]);
    case "raw":
      return jn(() => ((e.copilotTotalNanoAiu = NVa(t.rawValue) ?? e.copilotTotalNanoAiu), []));
    default: {
      let r = t;
      return Jt([]);
    }
  }
}