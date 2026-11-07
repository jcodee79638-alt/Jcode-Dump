
function v6i(e) {
  return {
    inputTokens: {
      total: e.inputTokens,
      noCache: void 0,
      cacheRead: e.cachedInputTokens,
      cacheWrite: void 0,
    },
    outputTokens: { total: e.outputTokens, text: void 0, reasoning: e.reasoningTokens },
  };
}