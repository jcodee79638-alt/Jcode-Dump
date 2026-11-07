
var Dwr,
  Trs = (e) =>
    ft(function* () {
      return { ctx: e, store: yield* HR, bridge: yield* lee() };
    }),
  _kt = (e) =>
    ft(function* () {
      let t = yield* Trs(e);
      return yield* wpt((r, s) => jn(() => (Dwr.set(r.source, t), s)));
    }),
  vrs = (e, t) =>
    ft(function* () {
      let r = yield* Trs(e);
      return yield* wpt((s, a) => eu(BL(r.bridge.run(r.store.reload(t))), a));
    }),
  hkt = (e) =>
    ft(function* () {
      let t = yield* e,
        r = yield* Md,
        s = Dwr.get(r.source);
      if (!s) return t;
      return (
        Dwr.delete(r.source),
        yield* BL(s.bridge.run(s.store.dispose(s.ctx))).pipe(
          jf((a) => lp("instance disposal failed", { cause: a })),
        ),
        t
      );
    });