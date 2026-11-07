
function lde(e) {
  let t = e.initial(),
    r = [],
    s = j6(1),
    a = Ge("State.commit")(function* (_) {
      let L = e.draft(_);
      if (e.finalize) yield* e.finalize(L);
      t = _;
    }),
    H = (_, L) =>
      yH(() => {
        let I = _(L);
        return ug(I) ? Qf(I).pipe(on) : ti;
      }),
    u = ni(function* () {
      let _ = e.initial(),
        L = e.draft(_);
      for (let I of r) yield* H(I.run, L).pipe(gI("State.reload.update"));
      yield* a(_);
    }),
    f = () => s.withPermit(u());
  return {
    get: () => t,
    transform: Ge("State.transform")(function* (_) {
      let L = yield* $f;
      return yield* BL(
        ft(function* () {
          let I = { run: _ },
            D = !0,
            S = BL(
              s.withPermit(
                yH(() => {
                  if (!D) return ti;
                  return (
                    (D = !1),
                    (r = r.filter((C) => C !== I)),
                    ft(function* () {
                      let C = yield* cdt;
                      if (C) {
                        C.add(f);
                        return;
                      }
                      yield* u();
                    })
                  );
                }),
              ),
            );
          (yield* s.withPermit(
            jn(() => {
              r = [...r, I];
            }),
          ),
            yield* UL(L, S));
          let T = yield* cdt;
          if (T) T.add(f);
          else yield* f();
          return { dispose: S };
        }),
      );
    }),
    reload: f,
  };
}