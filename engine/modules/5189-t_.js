
function t_(e, t) {
  return Object.assign(
    ft(function* () {
      let r = yield* t,
        s = yield* RN,
        a = yield* DP;
      return { id: e, init: w7a(e, r, s, a) };
    }),
    { id: e },
  );
}