
function Gwi(e) {
  var t, r, s, a, H, u;
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let f = (t = e.prompt_tokens) != null ? t : 0,
    d = (r = e.completion_tokens) != null ? r : 0,
    _ = (a = (s = e.prompt_tokens_details) == null ? void 0 : s.cached_tokens) != null ? a : 0,
    L = (u = (H = e.completion_tokens_details) == null ? void 0 : H.reasoning_tokens) != null ? u : 0;
  return {
    inputTokens: { total: f, noCache: f - _, cacheRead: _, cacheWrite: void 0 },
    outputTokens: { total: d, text: d - L, reasoning: L },
    raw: e,
  };
}