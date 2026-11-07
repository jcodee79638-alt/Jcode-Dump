
var a3e = ne(() => {
  a3e();
  OH();
  Gt();
  yy();
  udt = class udt extends ki()("AISDK.InitError", { providerID: Kp, cause: yd() }) {};
  o3e = class o3e extends _i()("@opencode/v2/AISDK") {};
  (($dn = Es(
    o3e,
    ft(function* () {
      let e = [],
        t = [],
        r = new Map(),
        s = new Map(),
        a = (f, d) =>
          Ge("AISDK.hook")(function* (_) {
            let L = yield* $f,
              I = !0;
            d([...f(), _]);
            let D = jn(() => {
              if (!I) return;
              ((I = !1), d(f().filter((S) => S !== _)));
            });
            return (yield* UL(L, D), { dispose: D });
          }),
        H = ni(function* (f, d) {
          for (let _ of f) {
            let L = _(d);
            if (ug(L)) yield* L;
          }
          return d;
        }),
        u = o3e.of({
          hook: {
            sdk: a(
              () => e,
              (f) => (e = f),
            ),
            language: a(
              () => t,
              (f) => (t = f),
            ),
          },
          runSDK: (f) => H(e, f),
          runLanguage: (f) => H(t, f),
          language: Ge("AISDK.language")(function* (f) {
            let d = `${f.providerID}/${f.id}/${f.request.variant ?? "default"}`,
              _ = r.get(d);
            if (_) return _;
            if (f.api.type !== "aisdk")
              return yield* new udt({
                providerID: f.providerID,
                cause: Error(`Unsupported api ${f.api.type}`),
              });
            let L = DVs(f, f.api.package),
              I = JSON.stringify({ providerID: f.providerID, api: f.api, options: L }),
              D =
                s.get(I) ??
                (yield* u.runSDK({ model: f, package: f.api.package, options: L }).pipe(ptr(f.providerID)))
                  .sdk;
            if (!D)
              return yield* new udt({
                providerID: f.providerID,
                cause: Error("No AISDK provider plugin returned an SDK"),
              });
            s.set(I, D);
            let S = yield* u.runLanguage({ model: f, sdk: D, options: L }).pipe(ptr(f.providerID)),
              T = yield* jn(() => S.language ?? D.languageModel(f.api.id)).pipe(ptr(f.providerID));
            return (r.set(d, T), T);
          }),
        });
      return u;
    }),
  )),
    (gdn = Ua({ service: o3e, layer: $dn, deps: [] })));
});