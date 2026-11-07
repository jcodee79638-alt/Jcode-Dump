
var PV = ne(async () => {
  OH();
  Gt();
  mVe();
  a$t();
  BA();
  rV();
  await Jn([PV(), um(), fL(), aar()]);
  ((ico = hvn), (sco = Lvn), (oco = $vn), (aco = _vn), (jvn = zor));
  jV = class jV extends _i()("@opencode/v2/Reference") {};
  ((Pvn = Es(
    jV,
    ft(function* () {
      let e = yield* M1,
        t = yield* lL,
        r = yield* LVe,
        s = yield* $f,
        a = new Map(),
        H = lde({
          initial: () => ({ sources: new Map() }),
          draft: (u) => ({
            add: (f, d) => u.sources.set(f, d),
            remove: (f) => u.sources.delete(f),
            list: () => Array.from(u.sources.entries()),
          }),
          finalize: (u) =>
            ft(function* () {
              a.clear();
              for (let [f, d] of u.list()) {
                if (d.type === "local") {
                  a.set(
                    f,
                    new jvn({
                      name: f,
                      path: d.path,
                      ...(d.description === void 0 ? {} : { description: d.description }),
                      ...(d.hidden === void 0 ? {} : { hidden: d.hidden }),
                      source: d,
                    }),
                  );
                  continue;
                }
                let _ = o$t(d.repository);
                if (!_ || !xvn(_)) continue;
                if (d.branch)
                  try {
                    Mvn(d.branch);
                  } catch {
                    continue;
                  }
                (a.set(
                  f,
                  new jvn({
                    name: f,
                    path: bo.make(Svn(e.repos, _, d.branch)),
                    ...(d.description === void 0 ? {} : { description: d.description }),
                    ...(d.hidden === void 0 ? {} : { hidden: d.hidden }),
                    source: d,
                  }),
                ),
                  yield* r.ensure({ reference: _, branch: d.branch, refresh: !0 }).pipe(
                    jf((L) =>
                      lp("failed to materialize reference", { name: f, repository: d.repository, cause: L }),
                    ),
                    zm(s),
                  ));
              }
              yield* t.publish(aco.Updated, {});
            }),
        });
      return jV.of({
        transform: H.transform,
        reload: H.reload,
        list: Ge("Reference.list")(function* () {
          return Array.from(a.values());
        }),
      });
    }),
  )),
    (Hco = Pvn),
    (u$t = Ua({ service: jV, layer: Pvn, deps: [lw, zS, nco] })));
});