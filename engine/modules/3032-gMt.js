
var gMt = ne(async () => {
  OH();
  Gt();
  MZ();
  await Jn([gMt(), PV()]);
  Bua = nt({ name: re, path: re, description: re.pipe(be) });
  Bqe = class Bqe extends _i()("@opencode/v2/ReferenceGuidance") {};
  ((Rua = Es(
    Bqe,
    ft(function* () {
      let e = yield* jV;
      return Bqe.of({
        load: Ge("ReferenceGuidance.load")(function* () {
          let t = (yield* e.list())
            .filter((r) => r.description !== void 0)
            .map((r) => ({ name: r.name, path: r.path, description: r.description }))
            .toSorted((r, s) => r.name.localeCompare(s.name));
          if (t.length === 0) return $Mt;
          return Fqe({
            key: QV.make("core/reference-guidance"),
            codec: wj(On(Bua)),
            load: Jt(t),
            baseline: ZEi,
            update: (r, s) =>
              [
                "The available project references have changed. This list supersedes the previous reference list.",
                ZEi(s),
              ].join(`
`),
            removed: () =>
              "Project reference guidance is no longer available. Do not use previously listed references.",
          });
        }),
      });
    }),
  )),
    (eIi = Ua({ service: Bqe, layer: Rua, deps: [u$t] })));
});