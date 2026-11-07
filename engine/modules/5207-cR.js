
var cR = ne(async () => {
  au();
  OH();
  pW();
  YM();
  G5e();
  Gw();
  qTt();
  jA();
  Gt();
  qze();
  await Jn([fJ(), cR()]);
  HR = class HR extends _i()("@opencode/InstanceStore") {};
  (($$A = vm(HR)),
    (W7a = Es(
      HR,
      ft(function* () {
        let e = yield* aR,
          t = yield* wce,
          r = yield* $f,
          s = new Map(),
          a = (V) =>
            ft(function* () {
              let q =
                V.project && V.worktree
                  ? { directory: V.directory, worktree: V.worktree, project: V.project }
                  : yield* e
                      .fromDirectory(V.directory)
                      .pipe(Vn((Z) => ({ directory: V.directory, worktree: Z.sandbox, project: Z.project })));
              return (yield* t.run.pipe(IA(Fh, q)), q);
            }).pipe(gI("InstanceStore.boot")),
          H = (V, q) =>
            jn(() => {
              if (s.get(V) !== q) return !1;
              return (s.delete(V), !0);
            }),
          u = (V, q, Z) =>
            ft(function* () {
              let se = yield* _h(a({ ...q, directory: V }));
              if (LI(se)) yield* H(V, Z);
              yield* SQ(Z.deferred, se).pipe(Qf);
            }),
          f = (V) =>
            jn(() =>
              g$.emit("event", {
                directory: V.directory,
                project: V.project,
                workspace: ree.workspaceID,
                payload: { type: "server.instance.disposed", properties: { directory: V.directory } },
              }),
            ),
          d = Ge("InstanceStore.disposeContext")(function* (V) {
            (yield* fH("disposing instance", { directory: V.directory }),
              yield* nA(() => CDr(V.directory)),
              yield* f({ directory: V.directory, project: V.project.id }));
          }),
          _ = ni(function* (V, q, Z) {
            if (s.get(V) !== q) return !1;
            if ((yield* d(Z), s.get(V) !== q)) return !1;
            return (s.delete(V), !0);
          }),
          L = (V) => {
            let q = ui.resolve(V.directory);
            return q0((Z) =>
              ft(function* () {
                let se = s.get(q);
                if (se) return yield* Z(Fl(se.deferred));
                let ae = { deferred: Kg() };
                return (
                  s.set(q, ae),
                  yield* ft(function* () {
                    (yield* fH("creating instance", { directory: q }), yield* u(q, V, ae));
                  }).pipe(zm(r, { startImmediately: !0 })),
                  yield* Z(Fl(ae.deferred))
                );
              }),
            ).pipe(gI("InstanceStore.load"));
          },
          I = (V) => {
            let q = ui.resolve(V.directory);
            return q0((Z) =>
              ft(function* () {
                let se = s.get(q),
                  ae = { deferred: Kg() };
                return (
                  s.set(q, ae),
                  yield* ft(function* () {
                    if ((yield* fH("reloading instance", { directory: q }), se))
                      (yield* Fl(se.deferred).pipe(FA),
                        yield* nA(() => CDr(q)),
                        yield* f({ directory: q, project: V.project?.id }));
                    yield* u(q, V, ae);
                  }).pipe(zm(r, { startImmediately: !0 })),
                  yield* Z(Fl(ae.deferred))
                );
              }),
            ).pipe(gI("InstanceStore.reload"));
          },
          D = Ge("InstanceStore.dispose")(function* (V) {
            let q = s.get(V.directory);
            if (!q) return yield* d(V);
            let Z = yield* Fl(q.deferred).pipe(_h);
            if (LI(Z)) return yield* H(V.directory, q).pipe(Qf);
            if (Z.value !== V) return;
            yield* _(V.directory, q, V).pipe(Qf);
          }),
          S = Ge("InstanceStore.disposeDirectory")(function* (V) {
            let q = ui.resolve(V),
              Z = s.get(q);
            if (!Z) return;
            let se = yield* Fl(Z.deferred).pipe(_h);
            if (LI(se)) return yield* H(q, Z).pipe(Qf);
            yield* _(q, Z, se.value).pipe(Qf);
          }),
          T = ni(function* () {
            (yield* fH("disposing all instances"),
              yield* ja(
                [...s.entries()],
                (V) =>
                  ft(function* () {
                    let q = yield* Fl(V[1].deferred).pipe(_h);
                    if (LI(q)) {
                      (yield* lp("instance dispose failed", { key: V[0], cause: q.cause }),
                        yield* H(V[0], V[1]));
                      return;
                    }
                    yield* _(V[0], V[1], q.value);
                  }),
                { discard: !0 },
              ));
          }),
          C = yield* _Ns(T(), xU),
          O = Ge("InstanceStore.disposeAll")(function* () {
            return yield* C;
          }),
          B = (V, q) => L(V).pipe(Hi((Z) => q.pipe(IA(Fh, Z))));
        return (
          yield* sL(() => O().pipe(FA)),
          HR.of({ load: L, reload: I, dispose: D, disposeDirectory: S, disposeAll: O, provide: B })
        );
      }),
    )),
    (v4i = tdt(wce, Ase.values.global)),
    (Gze = iA({ service: HR, layer: W7a, deps: [GLe, v4i] })));
});