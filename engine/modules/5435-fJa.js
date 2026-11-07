
function fJa(e, t, r, s) {
  if (t === "parallel")
    return Fjr(
      e,
      vXi,
      "web_search",
      jXi,
      { objective: r.query, search_queries: [r.query], session_id: s.sessionID, model_name: uJa(s.extra) },
      "25 seconds",
      lJa(),
    );
  return Fjr(
    e,
    TXi,
    "web_search_exa",
    bXi,
    {
      query: r.query,
      type: r.type || "auto",
      numResults: r.numResults || 8,
      livecrawl: r.livecrawl || "fallback",
      contextMaxCharacters: r.contextMaxCharacters,
    },
    "25 seconds",
  );
}