
var V0i = ne(async () => {
  Gt();
  yy();
  await Jn([e8(), fL(), Vae()]);
  W0i = TD({
    id: "models-dev",
    effect: Ge(function* (e) {
      let t = yield* Wae,
        r = yield* lL;
      (yield* e.integration.transform(
        Ge(function* (s) {
          let a = yield* t.get();
          for (let H of Object.values(a)) {
            if (H.env.length === 0) continue;
            let u = H.id;
            (s.update(u, (f) => (f.name = H.name)),
              s.method.update({ integrationID: u, method: { type: "key" } }),
              s.method.update({ integrationID: u, method: { type: "env", names: [...H.env] } }));
          }
        }),
      ),
        yield* e.catalog.transform(
          Ge(function* (s) {
            let a = yield* t.get();
            for (let H of Object.values(a)) {
              let u = Kp.make(H.id);
              s.provider.update(u, (f) => {
                ((f.name = H.name),
                  (f.api = H.npm
                    ? { type: "aisdk", package: H.npm, url: H.api }
                    : { type: "native", url: H.api, settings: {} }));
              });
              for (let f of Object.values(H.models)) {
                let d = Jhr(f.cost);
                s.model.update(u, f.id, (_) => R0i(_, f, { cost: d }));
                for (let [_, L] of Object.entries(f.experimental?.modes ?? {}))
                  s.model.update(u, `${f.id}-${_}`, (I) =>
                    R0i(I, f, { name: ZAa(f, _), cost: YAa(d, L.cost), request: L.provider }),
                  );
              }
            }
          }),
        ),
        yield* r.subscribe(w0i.Refreshed).pipe(
          FW(() => e.integration.reload().pipe(Zu(e.catalog.reload()))),
          EI({ startImmediately: !0 }),
        ));
    }),
  });
});