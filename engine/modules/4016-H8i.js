
var H8i = "~opencode/InstanceState",
  Jc,
  lje,
  xX,
  cx = (e) =>
    ft(function* () {
      let t = yield* FWs({
          capacity: Number.POSITIVE_INFINITY,
          lookup: () =>
            ft(function* () {
              return yield* e(yield* Jc);
            }),
        }),
        r = q5e((s) => oL(GWs(t, s)));
      return (yield* sL(() => jn(r)), { [H8i]: H8i, cache: t });
    }),
  Eu = (e) =>
    ft(function* () {
      return yield* RWs(e.cache, yield* xX);
    }),
  ODr = (e, t) => Vn(Eu(e), t),
  V1 = (e, t) => Hi(Eu(e), t),
  JTa = (e) =>
    ft(function* () {
      return yield* qWs(e.cache, yield* xX);
    });