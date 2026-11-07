
var Ace = ne(async () => {
  au();
  Ql();
  Txr();
  jX();
  Gt();
  await Jn([e$(), Eee(), Ace()]);
  cce = class cce extends _i()("@opencode/SessionRunState") {};
  ((SBa = Es(
    cce,
    ft(function* () {
      let e = yield* VN,
        t = yield* ace,
        r = yield* cx(
          Ge("SessionRunState.state")(function* () {
            let _ = yield* $f,
              L = new Map();
            return (
              yield* sL(
                ni(function* () {
                  (yield* ja(L.values(), (I) => I.cancel, { concurrency: "unbounded", discard: !0 }),
                    L.clear());
                }),
              ),
              { runners: L, scope: _ }
            );
          }),
        ),
        s = Ge("SessionRunState.runner")(function* (_, L) {
          let I = yield* Eu(r),
            D = I.runners.get(_);
          if (D) return D;
          let S = xBa(I.scope, {
            onIdle: ft(function* () {
              (I.runners.delete(_), yield* t.set(_, { type: "idle" }));
            }),
            onBusy: t.set(_, { type: "busy" }),
            onInterrupt: L,
          });
          return (I.runners.set(_, S), S);
        }),
        a = Ge("SessionRunState.assertNotBusy")(function* (_) {
          if ((yield* Eu(r)).runners.get(_)?.busy) yield* Q3i(_);
        }),
        H = Ge("SessionRunState.cancel")(function* (_) {
          yield* TBa(e, _);
          let I = (yield* Eu(r)).runners.get(_);
          if (!I) {
            yield* t.set(_, { type: "idle" });
            return;
          }
          yield* I.cancel;
        }),
        u = Ge("SessionRunState.ensureRunning")(function* (_, L, I) {
          return yield* (yield* s(_, L)).ensureRunning(I);
        }),
        f = Ge("SessionRunState.startShell")(function* (_, L, I, D) {
          return yield* (yield* s(_, L)).startShell(I, D).pipe(EA("RunnerBusy", () => bn(Q3i(_))));
        }),
        d = Ge("SessionRunState.active")(function* () {
          return [...(yield* Eu(r)).runners].filter(([, L]) => L.busy).map(([L]) => L);
        });
      return cce.of({ active: d, assertNotBusy: a, cancel: H, ensureRunning: u, startShell: f });
    }),
  )),
    (TBa = Ge("SessionRunState.cancelBackgroundJobs")(function* (e, t) {
      let r = yield* e.list(),
        s = new Set([t]),
        a = new Set(),
        H = (f) => {
          if (f.status !== "running") return !1;
          if (a.has(f.id)) return !1;
          if (s.has(f.id)) return !0;
          if (typeof f.metadata?.sessionId === "string" && s.has(f.metadata.sessionId)) return !0;
          return typeof f.metadata?.parentSessionId === "string" && s.has(f.metadata.parentSessionId);
        },
        u = r.filter(H);
      while (u.length > 0)
        (yield* ja(
          u,
          (f) =>
            e.cancel(f.id).pipe(
              DE(() =>
                jn(() => {
                  if ((a.add(f.id), s.add(f.id), typeof f.metadata?.sessionId === "string"))
                    s.add(f.metadata.sessionId);
                }),
              ),
            ),
          { concurrency: "unbounded", discard: !0 },
        ),
          (u = r.filter(H)));
    })));
  hjt = Ll({ service: cce, layer: SBa, deps: [sXe, tJe] });
});