
var VQe,
  jwe = (e) =>
    ft(function* () {
      let t = WQe(e.projectID, e.type),
        r = yield* VQe;
      return yield* hXe(() => t.target(e, r));
    }),
  ArH = (e, t) =>
    ft(function* () {
      let r = yield* VQe;
      return yield* hXe(() => e.configure(t, r));
    }),
  urH = (e, t, r, s) =>
    ft(function* () {
      let a = yield* VQe;
      return yield* hXe(() => e.create(t, r, s, a));
    }),
  lrH = (e) =>
    ft(function* () {
      let t = yield* VQe;
      return yield* hXe(() => Promise.resolve(e.list?.(t) ?? []));
    }),
  frH = (e) =>
    ft(function* () {
      let t = WQe(e.projectID, e.type),
        r = yield* VQe;
      return yield* hXe(() => t.remove(e, r));
    });