
function Z7i(e) {
  if (!e || typeof e !== "object") return;
  let t = e,
    r = Object.entries({
      inputTokens: t.inputTokens,
      outputTokens: t.outputTokens,
      totalTokens: t.totalTokens,
      reasoningTokens: t.outputTokenDetails?.reasoningTokens ?? t.reasoningTokens,
      cacheReadInputTokens: t.inputTokenDetails?.cacheReadTokens ?? t.cachedInputTokens,
      cacheWriteInputTokens: t.inputTokenDetails?.cacheWriteTokens,
    }).filter((s) => s[1] !== void 0);
  return r.length === 0 ? void 0 : Object.fromEntries(r);
}