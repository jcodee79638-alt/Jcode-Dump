
var PXi = ne(() => {
  Gt();
  Cf();
  ((TXi = process.env.EXA_API_KEY
    ? `https://mcp.exa.ai/mcp?exaApiKey=${encodeURIComponent(process.env.EXA_API_KEY)}`
    : "https://mcp.exa.ai/mcp"),
    (rJa = nt({ result: nt({ content: On(nt({ type: re, text: re })) }) })),
    (nJa = G_(Cj(rJa))),
    (iJa = Ge("McpWebSearch.parseResponse")(function* (e) {
      let t = e.trim(),
        r = t ? yield* SXi(t) : void 0;
      if (r) return r;
      for (let s of e.split(`
`)) {
        if (!s.startsWith("data: ")) continue;
        let a = yield* SXi(s.substring(6));
        if (a) return a;
      }
      return;
    })),
    (bXi = nt({ query: re, type: re, numResults: Aa, livecrawl: re, contextMaxCharacters: be(Aa) })),
    (jXi = nt({ objective: re, search_queries: On(re), session_id: be(re), model_name: be(re) })));
});