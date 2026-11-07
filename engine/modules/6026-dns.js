
var dns = ne(async () => {
  o0();
  oje();
  Gt();
  Cf();
  $H();
  await Jn([DPe(), Vae(), Vw(), m7(), Jy(), ewr()]);
  pns = Kd(eh, "provider", (e) =>
    ft(function* () {
      let t = yield* Eg,
        r = yield* FN,
        s = yield* IPe,
        a = yield* TX,
        H = Ge("ProviderHttpApi.list")(function* () {
          let L = yield* t.get(),
            I = yield* Wae.use((V) => V.get()),
            D = new Set(L.disabled_providers ?? []),
            S = L.enabled_providers ? new Set(L.enabled_providers) : void 0,
            T = {};
          for (let [V, q] of Object.entries(I)) if ((S ? S.has(V) : !0) && !D.has(V)) T[V] = q;
          let C = yield* r.list(),
            O = yield* a.all().pipe(on),
            B = Object.assign(
              N5e(T, (V) => xxa(V)),
              C,
            );
          return {
            all: Object.values(B).map(xki),
            default: Ski(B),
            connected: Object.keys(B).filter((V) => V in C || O[V]),
          };
        }),
        u = Ge("ProviderHttpApi.auth")(function* () {
          return yield* s.methods();
        }),
        f = Ge("ProviderHttpApi.authorize")(function* (L) {
          return yield* fns(
            s.authorize({
              providerID: L.params.providerID,
              method: L.payload.method,
              inputs: L.payload.inputs,
            }),
          );
        }),
        d = Ge("ProviderHttpApi.authorizeRaw")(function* (L) {
          let I = yield* on(L.request.text),
            D = yield* G_(Cj(b3i))(I).pipe(Zo(() => new TJ({ name: "BadRequest", data: {} }))),
            S = yield* f({ params: L.params, payload: D });
          return ow(S ?? null);
        }),
        _ = Ge("ProviderHttpApi.callback")(function* (L) {
          return (
            yield* fns(
              s.callback({ providerID: L.params.providerID, method: L.payload.method, code: L.payload.code }),
            ),
            !0
          );
        });
      return e.handle("list", H).handle("auth", u).handleRaw("authorize", d).handle("callback", _);
    }),
  );
});