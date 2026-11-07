
var ibe = ne(() => {
  ibe();
  Gt();
  MZ();
  OH();
  K_e = class K_e extends _i()("@opencode/v2/SystemContextRegistry") {};
  ((Wua = Es(
    K_e,
    ft(function* () {
      let e = yield* NBs([]);
      return K_e.of({
        register: Ge("SystemContextRegistry.register")(function* (t) {
          yield* Bd(
            TZt(e, (r) => {
              if (r.some((s) => s.key === t.key)) return [!1, r];
              return [!0, [...r, t]];
            }).pipe(
              Hi((r) => (r ? ti : No(`Duplicate system context entry key: ${t.key}`))),
              eu(t),
            ),
            (r) => vZt(e, (s) => s.filter((a) => a !== r)),
          );
        }),
        load: Ge("SystemContextRegistry.load")(function* () {
          let t = (yield* FBs(e)).toSorted((r, s) => (r.key < s.key ? -1 : r.key > s.key ? 1 : 0));
          return hLr(yield* ja(t, (r) => r.load, { concurrency: "unbounded" }));
        }),
      });
    }),
  )),
    (DMt = Ua({ service: K_e, layer: Wua, deps: [] })));
});