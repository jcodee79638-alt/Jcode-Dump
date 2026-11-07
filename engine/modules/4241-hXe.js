
var hXe = (e) =>
  ft(function* () {
    let t = yield* bI;
    return yield* nA(() => Promise.resolve(_Xe(t, () => e())));
  });