
function Kwi(e) {
  var t, r;
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let s = (t = e.prompt_tokens) != null ? t : 0,
    a = (r = e.completion_tokens) != null ? r : 0;
  return {
    inputTokens: { total: s, noCache: s, cacheRead: void 0, cacheWrite: void 0 },
    outputTokens: { total: a, text: a, reasoning: void 0 },
    raw: e,
  };
}