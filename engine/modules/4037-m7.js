
var m7 = ne(async () => {
  au();
  Gt();
  BA();
  jA();
  await Jn([um(), m7()]);
  FDr = nva.join(uH.data, "auth.json");
  _8i = class _8i extends (
    Pa("OAuth")({
      type: ri("oauth"),
      refresh: re,
      access: re,
      expires: Ko,
      accountId: be(re),
      enterpriseUrl: be(re),
    })
  ) {};
  h8i = class h8i extends Pa("ApiAuth")({ type: ri("api"), key: re, metadata: be(ks(re, re)) }) {};
  L8i = class L8i extends Pa("WellKnownAuth")({ type: ri("wellknown"), key: re, token: re }) {};
  $8i = Io([_8i, h8i, L8i]).annotate({ discriminator: "type", identifier: "Auth" });
  g8i = class g8i extends ki()("AuthError", { message: re, cause: be(yd()) }) {};
  TX = class TX extends _i()("@opencode/Auth") {};
  ((iva = Es(
    TX,
    ft(function* () {
      let e = yield* ui.Service,
        t = kv($8i),
        r = Ge("Auth.all")(function* () {
          if (process.env.OPENCODE_AUTH_CONTENT)
            try {
              return JSON.parse(process.env.OPENCODE_AUTH_CONTENT);
            } catch (f) {}
          let u = yield* e.readJson(FDr).pipe(PU(() => ({})));
          return wOs(u, (f) =>
            xOs(t(f), () => {
              return;
            }),
          );
        }),
        s = Ge("Auth.get")(function* (u) {
          return (yield* r())[u];
        }),
        a = Ge("Auth.set")(function* (u, f) {
          let d = u.replace(/\/+$/, ""),
            _ = yield* r();
          if (d !== u) delete _[u];
          (delete _[d + "/"],
            yield* e.writeJson(FDr, { ..._, [d]: f }, 384).pipe(Zo(m8i("Failed to write auth data"))));
        }),
        H = Ge("Auth.remove")(function* (u) {
          let f = u.replace(/\/+$/, ""),
            d = yield* r();
          (delete d[u],
            delete d[f],
            yield* e.writeJson(FDr, d, 384).pipe(Zo(m8i("Failed to write auth data"))));
        });
      return TX.of({ get: s, all: r, set: a, remove: H });
    }),
  )),
    (pje = Ll({ service: TX, layer: iva, deps: [ui.node] })));
});