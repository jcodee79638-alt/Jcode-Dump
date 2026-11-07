
var e0r = ne(async () => {
  CE();
  Gt();
  Cf();
  OH();
  vy();
  uw();
  BA();
  AP();
  ww();
  Ygr();
  await Jn([e0r(), S1(), lP()]);
  ((c0a = `Search the web using the session's local web search provider. Use this for current information beyond knowledge cutoff.

This is a provider-independent local tool backed by Exa or Parallel. Provider-hosted web search tools are separate and execute at the model provider.

Optional controls support result count, live crawling ('fallback' or 'preferred'), search type ('auto', 'fast', or 'deep'), and maximum context characters.

The current year is ${new Date().getFullYear()}. Use this year when searching for recent information or current events.`),
    (A0a = nt({
      query: re.annotate({ description: "Websearch query" }),
      numResults: be(qc.check(zie(pSi))).annotate({
        description: `Number of search results to return (default: 8, maximum: ${pSi})`,
      }),
      livecrawl: be(Jo(["fallback", "preferred"])).annotate({
        description:
          "Live crawl mode - 'fallback': use live crawling as backup if cached unavailable, 'preferred': prioritize live crawling (default: 'fallback')",
      }),
      type: be(Jo(["auto", "fast", "deep"])).annotate({
        description:
          "Search type - 'auto': balanced search (default), 'fast': quick results, 'deep': comprehensive search",
      }),
      contextMaxCharacters: be(qc.check(zie(dSi))).annotate({
        description: `Maximum characters for context string optimized for models (default: 10000, maximum: ${dSi})`,
      }),
    })),
    (u0a = Jo(["exa", "parallel"])));
  IGe = class IGe extends _i()("@opencode/v2/WebSearchConfig") {};
  ((l0a = sQt(IGe, () =>
    IGe.of({
      provider:
        process.env.OPENCODE_WEBSEARCH_PROVIDER === "exa" ||
        process.env.OPENCODE_WEBSEARCH_PROVIDER === "parallel"
          ? process.env.OPENCODE_WEBSEARCH_PROVIDER
          : void 0,
      enableExa: Sy("OPENCODE_EXPERIMENTAL") || Sy("OPENCODE_ENABLE_EXA") || Sy("OPENCODE_EXPERIMENTAL_EXA"),
      enableParallel: Sy("OPENCODE_ENABLE_PARALLEL") || Sy("OPENCODE_EXPERIMENTAL_PARALLEL"),
      exaApiKey: process.env.EXA_API_KEY,
      parallelApiKey: process.env.PARALLEL_API_KEY,
    }),
  )),
    (f0a = Ua({ service: IGe, layer: l0a, deps: [] })));
  ((d0a = nt({ result: nt({ content: On(nt({ type: re, text: re })) }) })),
    (m0a = G_(Cj(d0a))),
    (_0a = Ge("WebSearchTool.parseResponse")(function* (e) {
      let t = e.trim(),
        r = t ? yield* _Si(t) : void 0;
      if (r) return r;
      for (let s of e.split(`
`)) {
        if (!s.startsWith("data: ")) continue;
        let a = yield* _Si(s.substring(6));
        if (a) return a;
      }
      return;
    })),
    (h0a = nt({ query: re, type: re, numResults: Aa, livecrawl: re, contextMaxCharacters: be(Aa) })),
    (L0a = nt({ objective: re, search_queries: On(re), session_id: re })),
    (E0a = nt({ provider: u0a, text: re })),
    (I0a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* gy,
          r = yield* IGe,
          s = yield* Cy;
        yield* e
          .register({
            [lSi]: jB({
              description: c0a,
              input: A0a,
              output: E0a,
              toModelOutput: ({ output: a }) => [{ type: "text", text: a.text }],
              execute: (a, H) => {
                let u = p0a(H.sessionID, r, r.provider);
                return ft(function* () {
                  yield* s.assert({
                    action: lSi,
                    resources: [a.query],
                    save: ["*"],
                    metadata: { ...a, provider: u },
                    sessionID: H.sessionID,
                    agent: H.agent,
                    source: { type: "tool", messageID: H.assistantMessageID, callID: H.toolCallID },
                  });
                  let f =
                    u === "exa"
                      ? yield* hSi(t, g0a(r.exaApiKey), "web_search_exa", h0a, {
                          query: a.query,
                          type: a.type || "auto",
                          numResults: a.numResults || 8,
                          livecrawl: a.livecrawl || "fallback",
                          contextMaxCharacters: a.contextMaxCharacters,
                        })
                      : yield* hSi(
                          t,
                          H0a,
                          "web_search",
                          L0a,
                          { objective: a.query, search_queries: [a.query], session_id: H.sessionID },
                          {
                            "User-Agent": `opencode/${VL}`,
                            ...(r.parallelApiKey ? { Authorization: `Bearer ${r.parallelApiKey}` } : {}),
                          },
                        );
                  return { provider: u, text: f ?? a0a };
                }).pipe(Zo(() => new zp({ message: `Unable to search the web for ${a.query}` })));
              },
            }),
          })
          .pipe(on);
      }),
    )),
    (D0a = Ua({ name: "tool/websearch", layer: I0a, deps: [T8, aN, Q0, f0a] })));
});