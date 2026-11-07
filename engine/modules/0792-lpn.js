
var lpn = "~effect/ManagedRuntime",
  fpn = (e, t) => {
    let r = t?.memoMap ?? Lie(),
      s = VM("parallel"),
      a = qM(s, "sequential"),
      H = { onFiberStart: Pj(s) },
      u = (L) =>
        L
          ? {
              ...L,
              onFiberStart: L.onFiberStart
                ? (I) => {
                    (H.onFiberStart(I), L.onFiberStart(I));
                  }
                : H.onFiberStart,
            }
          : H,
      f,
      d = hl((L) => {
        if (!f)
          f = KC(
            DE(t2(e, r, a), (I) =>
              jn(() => {
                _.cachedContext = I;
              }),
            ),
            { ...H, scheduler: L.currentScheduler },
          );
        return zq(Cpe(f));
      }),
      _ = {
        [lpn]: lpn,
        memoMap: r,
        scope: s,
        contextEffect: d,
        cachedContext: void 0,
        context() {
          return _.cachedContext === void 0 ? oL(_.contextEffect) : Promise.resolve(_.cachedContext);
        },
        dispose() {
          return oL(_.disposeEffect);
        },
        disposeEffect: yH(
          () => (
            (_.contextEffect = No("ManagedRuntime disposed")),
            (_.cachedContext = void 0),
            cl(_.scope, M$)
          ),
        ),
        runFork(L, I) {
          return _.cachedContext === void 0 ? KC(V1e(_, L), u(I)) : G0(_.cachedContext)(L, u(I));
        },
        runCallback(L, I) {
          return _.cachedContext === void 0 ? Ksn(V1e(_, L), u(I)) : Jsn(_.cachedContext)(L, u(I));
        },
        runSyncExit(L) {
          return _.cachedContext === void 0 ? aBe(V1e(_, L)) : Qsn(_.cachedContext)(L);
        },
        runSync(L) {
          return _.cachedContext === void 0 ? Yg(V1e(_, L)) : zsn(_.cachedContext)(L);
        },
        runPromiseExit(L, I) {
          return _.cachedContext === void 0 ? flt(V1e(_, L), u(I)) : yQt(_.cachedContext)(L, u(I));
        },
        runPromise(L, I) {
          return _.cachedContext === void 0 ? oL(V1e(_, L), u(I)) : Sie(_.cachedContext)(L, u(I));
        },
      };
    return _;
  };