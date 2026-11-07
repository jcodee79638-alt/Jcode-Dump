
function BTt(e) {
  return {
    inputTokens: e.inputTokens.total,
    inputTokenDetails: {
      noCacheTokens: e.inputTokens.noCache,
      cacheReadTokens: e.inputTokens.cacheRead,
      cacheWriteTokens: e.inputTokens.cacheWrite,
    },
    outputTokens: e.outputTokens.total,
    outputTokenDetails: { textTokens: e.outputTokens.text, reasoningTokens: e.outputTokens.reasoning },
    totalTokens: p7(e.inputTokens.total, e.outputTokens.total),
    raw: e.raw,
    reasoningTokens: e.outputTokens.reasoning,
    cachedInputTokens: e.inputTokens.cacheRead,
  };
}