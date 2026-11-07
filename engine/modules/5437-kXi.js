
var kXi = ne(async () => {
  Gt();
  Cf();
  PXi();
  CXi();
  Ry();
  await Vy();
  ((HJa = nt({
    query: re.annotate({ description: "Websearch query" }),
    numResults: be(Aa).annotate({ description: "Number of search results to return (default: 8)" }),
    livecrawl: be(Jo(["fallback", "preferred"])).annotate({
      description:
        "Live crawl mode - 'fallback': use live crawling as backup if cached content unavailable, 'preferred': prioritize live crawling (default: 'fallback')",
    }),
    type: be(Jo(["auto", "fast", "deep"])).annotate({
      description:
        "Search type - 'auto': balanced search (default), 'fast': quick results, 'deep': comprehensive search",
    }),
    contextMaxCharacters: be(Aa).annotate({
      description: "Maximum characters for context string optimized for LLMs (default: 10000)",
    }),
  })),
    (eyA = Jo(["exa", "parallel"])));
  Bjr = t_(
    "websearch",
    ft(function* () {
      let e = yield* gy,
        t = yield* NE;
      return {
        get description() {
          return wXi.replace("{{year}}", new Date().getFullYear().toString());
        },
        parameters: HJa,
        execute: (r, s) =>
          ft(function* () {
            let a = cJa(s.sessionID, { exa: t.enableExa, parallel: t.enableParallel }),
              H = AJa(a);
            return (
              yield* s.metadata({ title: `${H} "${r.query}"`, metadata: { provider: a } }),
              yield* s.ask({
                permission: "websearch",
                patterns: [r.query],
                always: ["*"],
                metadata: {
                  query: r.query,
                  numResults: r.numResults,
                  livecrawl: r.livecrawl,
                  type: r.type,
                  contextMaxCharacters: r.contextMaxCharacters,
                  provider: a,
                },
              }),
              {
                output: (yield* fJa(e, a, r, s)) ?? "No search results found. Please try a different query.",
                title: `${H}: ${r.query}`,
                metadata: { provider: a },
              }
            );
          }).pipe(on),
      };
    }),
  );
});