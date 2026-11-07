
var jis = ne(async () => {
  uw();
  Gt();
  Cf();
  await Jn([qL(), XCr()]);
  ((naH = new Set(["GET", "HEAD", "OPTIONS"])),
    (bis = Cde()(
      ft(function* () {
        let { db: e } = yield* Vd;
        return (t) =>
          ft(function* () {
            let r = yield* Md;
            if (!Ad.OPENCODE_WORKSPACE_ID || naH.has(r.method)) return yield* t;
            let s = yield* GCr(e),
              a = yield* t,
              H = bes(s, yield* GCr(e));
            if (Object.keys(H).length === 0) return a;
            return nse(a, qCr, JSON.stringify(H));
          });
      }),
    ).layer));
});