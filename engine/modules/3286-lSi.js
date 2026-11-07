
var lSi = "websearch",
  a0a = "No search results found. Please try a different query.",
  fSi = "https://mcp.exa.ai/mcp",
  H0a = "https://search.parallel.ai/mcp",
  pSi = 20,
  dSi = 50000,
  mSi = 262144,
  c0a,
  A0a,
  u0a,
  IGe,
  l0a,
  f0a,
  d0a,
  m0a,
  _Si = (e) =>
    ft(function* () {
      let t = e.trim();
      if (!t.startsWith("{")) return;
      return (yield* m0a(t)).result.content.find((r) => r.text)?.text;
    }),
  _0a,
  h0a,
  L0a,
  $0a = (e) =>
    nt({ jsonrpc: ri("2.0"), id: ri(1), method: ri("tools/call"), params: nt({ name: re, arguments: e }) }),
  g0a = (e) => {
    if (!e) return fSi;
    let t = new URL(fSi);
    return (t.searchParams.set("exaApiKey", e), t.toString());
  },
  hSi = (e, t, r, s, a, H = {}) =>
    ft(function* () {
      let u = yield* u2(t).pipe(
        ipt("application/json, text/event-stream"),
        YW(H),
        MRe($0a(s))({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: r, arguments: a } }),
      );
      return yield* ft(function* () {
        let f = yield* RU(e).execute(u),
          d = yield* Xxt(f, mSi, () => Error(`${r} response exceeded ${mSi} bytes`));
        return yield* _0a(d.toString("utf8"));
      }).pipe(Tj({ duration: Pv(25), orElse: () => bn(Error(`${r} request timed out`)) }));
    }),
  E0a,
  I0a,
  D0a;