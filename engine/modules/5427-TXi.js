
var TXi,
  vXi = "https://search.parallel.ai/mcp",
  rJa,
  nJa,
  SXi = (e) =>
    ft(function* () {
      let t = e.trim();
      if (!t.startsWith("{")) return;
      return (yield* nJa(t)).result.content.find((s) => s.text)?.text;
    }),
  iJa,
  bXi,
  jXi,
  sJa = (e) =>
    nt({ jsonrpc: ri("2.0"), id: ri(1), method: ri("tools/call"), params: nt({ name: re, arguments: e }) }),
  Fjr = (e, t, r, s, a, H, u) =>
    ft(function* () {
      let f = yield* u2(t).pipe(
          ipt("application/json, text/event-stream"),
          YW(u ?? {}),
          MRe(sJa(s))({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: r, arguments: a } }),
        ),
        _ = yield* (yield* RU(e)
          .execute(f)
          .pipe(Tj({ duration: H, orElse: () => No(Error(`${r} request timed out`)) }))).text;
      return yield* iJa(_);
    });