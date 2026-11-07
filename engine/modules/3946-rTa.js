
function rTa(e, t) {
  var r, s, a, H, u, f, d, _, L, I;
  return {
    inputTokens: p7(e.inputTokens, t.inputTokens),
    inputTokenDetails: {
      noCacheTokens: p7(
        (r = e.inputTokenDetails) == null ? void 0 : r.noCacheTokens,
        (s = t.inputTokenDetails) == null ? void 0 : s.noCacheTokens,
      ),
      cacheReadTokens: p7(
        (a = e.inputTokenDetails) == null ? void 0 : a.cacheReadTokens,
        (H = t.inputTokenDetails) == null ? void 0 : H.cacheReadTokens,
      ),
      cacheWriteTokens: p7(
        (u = e.inputTokenDetails) == null ? void 0 : u.cacheWriteTokens,
        (f = t.inputTokenDetails) == null ? void 0 : f.cacheWriteTokens,
      ),
    },
    outputTokens: p7(e.outputTokens, t.outputTokens),
    outputTokenDetails: {
      textTokens: p7(
        (d = e.outputTokenDetails) == null ? void 0 : d.textTokens,
        (_ = t.outputTokenDetails) == null ? void 0 : _.textTokens,
      ),
      reasoningTokens: p7(
        (L = e.outputTokenDetails) == null ? void 0 : L.reasoningTokens,
        (I = t.outputTokenDetails) == null ? void 0 : I.reasoningTokens,
      ),
    },
    totalTokens: p7(e.totalTokens, t.totalTokens),
    reasoningTokens: p7(e.reasoningTokens, t.reasoningTokens),
    cachedInputTokens: p7(e.cachedInputTokens, t.cachedInputTokens),
  };
}