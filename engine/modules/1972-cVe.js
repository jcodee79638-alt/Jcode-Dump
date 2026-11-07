
var cVe = ne(async () => {
  OH();
  Gt();
  jA();
  DY();
  BA();
  Ide();
  await Jn([cVe(), Kv(), um(), qd()]);
  ZLt = re.pipe(Jl("Snapshot.ID"));
  roe = class roe extends (
    ki()("Snapshot.Error", {
      operation: Jo(["capture", "files", "diff", "preview", "restore"]),
      message: re,
      cause: be(yd()),
    })
  ) {};
  BY = class BY extends _i()("@opencode/v2/Snapshot") {};
  ((nvn = Es(
    BY,
    ft(function* () {
      let e = yield* ZM,
        t = yield* ui.Service,
        r = yield* qG,
        s = yield* M1,
        a = yield* bm,
        H = yield* r.repo.discover(a.project.directory),
        u = H ? bo.make(yield* t.realPath(H.worktree).pipe(on)) : a.project.directory,
        f = bo.make(HVe.join(s.data, "snapshot", a.project.id, qU.fast(u))),
        d = ni(function* () {
          let q = HVe.relative(u, a.directory);
          if (q.startsWith("..") || HVe.isAbsolute(q))
            return yield* new roe({ operation: "capture", message: "Location is outside the project" });
          return du.make(q.replaceAll("\\", "/") || ".");
        }),
        _ = ni(function* () {
          if (!H) return yield* new roe({ operation: "capture", message: "Project is not a Git repository" });
          if (yield* t.existsSafe(HVe.join(f, "HEAD")))
            return new K_t({ worktree: u, gitDirectory: f, commonDirectory: f });
          return yield* r.repo
            .create({ worktree: u, gitDirectory: f, seed: H })
            .pipe(Zo((q) => Y6("capture", q)));
        }),
        L = ni(function* () {
          if (a.vcs?.type !== "git") return !1;
          return Uht(yield* e.entries(), "snapshots") !== !1;
        }),
        I = Ge("Snapshot.capture")(function* () {
          if (!(yield* L())) return;
          return yield* ft(function* () {
            let q = yield* _();
            return ZLt.make(
              yield* r.tree.capture({
                repository: q,
                scopes: [yield* d()],
                ignores: H,
                maximumUntrackedFileBytes: 2097152,
              }),
            );
          }).pipe($s((q) => lp("failed to capture snapshot", { cause: q }).pipe(eu(void 0))));
        }),
        D = ni(function* (q, Z) {
          return {
            repository: yield* _().pipe(Zo((ae) => Y6(q, ae))),
            from: KMe.make(Z.from),
            to: KMe.make(Z.to),
          };
        }),
        S = Ge("Snapshot.files")(function* (q) {
          let Z = yield* D("files", q),
            se = yield* r.tree.files(Z).pipe(Zo((z) => Y6("files", z)));
          if (!H) return se;
          let ae = yield* r.index.ignored({ repository: H, paths: se }).pipe(Zo((z) => Y6("files", z)));
          return se.filter((z) => !ae.has(z));
        }),
        T = Ge("Snapshot.diff")(function* (q) {
          let Z = yield* D("diff", q),
            se = yield* r.tree.files(Z).pipe(Zo((z) => Y6("diff", z))),
            ae = H
              ? yield* r.index.ignored({ repository: H, paths: se }).pipe(Zo((z) => Y6("diff", z)))
              : new Set();
          return yield* r.tree
            .diff({ ...Z, context: q.context, paths: (q.paths ?? se).filter((z) => !ae.has(z)) })
            .pipe(Zo((z) => Y6("diff", z)));
        }),
        C = ni(function* (q, Z) {
          let se = new Map();
          for (let [ae, z] of Z.files) {
            let Ae = HVe.resolve(u, ae);
            if (!ui.contains(u, Ae))
              return yield* new roe({ operation: q, message: `Path escapes the project: ${ae}` });
            se.set(ae, KMe.make(z));
          }
          return se;
        }),
        O = Ge("Snapshot.preview")(function* (q) {
          if (!(yield* L()))
            return yield* new roe({ operation: "preview", message: "Snapshots are disabled" });
          let Z = yield* _().pipe(Zo((z) => Y6("preview", z))),
            se = yield* C("preview", q),
            ae = yield* r.tree
              .capture({
                repository: Z,
                scopes: Array.from(se.keys()),
                ignores: H,
                maximumUntrackedFileBytes: 2097152,
              })
              .pipe(Zo((z) => Y6("preview", z)));
          return yield* r.tree
            .preview({ repository: Z, current: ae, files: se, context: q.context })
            .pipe(Zo((z) => Y6("preview", z)));
        }),
        B = Ge("Snapshot.restore")(function* (q) {
          if (!(yield* L()))
            return yield* new roe({ operation: "restore", message: "Snapshots are disabled" });
          let Z = yield* _().pipe(Zo((se) => Y6("restore", se)));
          yield* r.tree
            .restore({ repository: Z, files: yield* C("restore", q) })
            .pipe(Zo((se) => Y6("restore", se)));
        }),
        V = Ge("Snapshot.checkout")(function* (q) {
          let Z = yield* _().pipe(Zo((se) => Y6("restore", se)));
          yield* r.tree.checkout({ repository: Z, tree: KMe.make(q) }).pipe(Zo((se) => Y6("restore", se)));
        });
      return BY.of({ capture: I, files: S, diff: T, preview: O, restore: B, checkout: V });
    }),
  )),
    (nzH = nvn.pipe(Jm(Nht))),
    (ivn = Ua({ service: BY, layer: nvn, deps: [PY, ui.node, zMe, lw, KS] })),
    (izH = bf(
      BY,
      BY.of({
        capture: () => Jt(void 0),
        files: () => Jt([]),
        diff: () => Jt([]),
        preview: () => Jt([]),
        restore: () => ti,
        checkout: () => ti,
      }),
    )));
});