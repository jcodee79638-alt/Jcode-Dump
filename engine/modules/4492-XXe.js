
var XXe = ne(async () => {
  au();
  YM();
  Gt();
  jA();
  DSt();
  await Jn([um(), c$t(), XXe()]);
  ((kFa = nt({
    issuer: iw(be(re)),
    accessToken: iw(re),
    refreshToken: iw(be(re)),
    expiresAt: iw(be(Aa)),
    scope: iw(be(re)),
  })),
    (OFa = nt({
      issuer: iw(be(re)),
      clientId: iw(re),
      clientSecret: iw(be(re)),
      clientIdIssuedAt: iw(be(Aa)),
      clientSecretExpiresAt: iw(be(Aa)),
    })),
    (UFa = nt({
      tokens: iw(be(kFa)),
      clientInfo: iw(be(OFa)),
      codeVerifier: iw(be(re)),
      oauthState: iw(be(re)),
      serverUrl: iw(be(re)),
    })),
    (NFa = kv(ks(re, UFa))),
    (BMr = wFa.join(uH.data, "mcp-auth.json")),
    (SRi = `mcp-auth:${BMr}`));
  fPe = class fPe extends _i()("@opencode/McpAuth") {};
  ((nYc = vm(fPe)),
    (FFa = Es(
      fPe,
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* n5.Service,
          r = Ge("McpAuth.read")(function* () {
            return yield* (process.env.JAC_DESKTOP_MCP === "1" ? nA(_vi) : e.readJson(BMr)).pipe(
              Vn((V) => uD(NFa(V), () => ({}))),
              $s((V) =>
                process.env.JAC_DESKTOP_MCP === "1"
                  ? No(Error("Protected MCP authentication is unavailable."))
                  : Jt({}),
              ),
            );
          }),
          s = Ge("McpAuth.all")(function* () {
            return yield* r().pipe(t.withLock(SRi), on);
          }),
          a = Ge("McpAuth.mutate")(function* (V) {
            yield* ft(function* () {
              let q = V(yield* r());
              if (!q) return;
              yield* (process.env.JAC_DESKTOP_MCP === "1" ? nA(() => hvi(q)) : e.writeJson(BMr, q, 384)).pipe(
                on,
              );
            }).pipe(t.withLock(SRi), on);
          }),
          H = Ge("McpAuth.get")(function* (V) {
            return (yield* s())[V];
          }),
          u = Ge("McpAuth.getForUrl")(function* (V, q) {
            let Z = yield* H(V);
            if (!Z) return;
            if (!Z.serverUrl) return;
            if (Z.serverUrl !== q) return;
            return Z;
          }),
          f = Ge("McpAuth.set")(function* (V, q, Z) {
            yield* a((se) => ({ ...se, [V]: Z ? { ...q, serverUrl: Z } : q }));
          }),
          d = Ge("McpAuth.remove")(function* (V) {
            yield* a((q) => {
              let Z = { ...q };
              return (delete Z[V], Z);
            });
          }),
          _ = (V, q) =>
            Ge(`McpAuth.${q}`)(function* (Z, se, ae) {
              yield* a((z) => {
                let Ae = z[Z] ?? {};
                if (((Ae[V] = se), ae)) Ae.serverUrl = ae;
                return { ...z, [Z]: Ae };
              });
            }),
          L = (V, q) =>
            Ge(`McpAuth.${q}`)(function* (Z) {
              yield* a((se) => {
                let ae = se[Z];
                if (!ae) return;
                return (delete ae[V], { ...se, [Z]: ae });
              });
            }),
          I = _("tokens", "updateTokens"),
          D = _("clientInfo", "updateClientInfo"),
          S = _("codeVerifier", "updateCodeVerifier"),
          T = _("oauthState", "updateOAuthState"),
          C = L("codeVerifier", "clearCodeVerifier"),
          O = L("oauthState", "clearOAuthState"),
          B = Ge("McpAuth.getOAuthState")(function* (V) {
            return (yield* H(V))?.oauthState;
          });
        return fPe.of({
          all: s,
          get: H,
          getForUrl: u,
          set: f,
          remove: d,
          updateTokens: I,
          updateClientInfo: D,
          updateCodeVerifier: S,
          clearCodeVerifier: C,
          updateOAuthState: T,
          getOAuthState: B,
          clearOAuthState: O,
        });
      }),
    )),
    (RMr = Ll({ service: fPe, layer: FFa, deps: [ui.node, n5.node] })));
});