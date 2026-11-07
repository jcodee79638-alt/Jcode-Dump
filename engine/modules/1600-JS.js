
var JS = ne(async () => {
  Gt();
  BA();
  jA();
  DY();
  OH();
  Ide();
  Q_t();
  await Jn([JS(), JS(), _We()]);
  ((z_ = z_t), (aVH = NQs));
  VQs = class VQs extends Pa("Project.Info")({ id: z_ }) {};
  ((HVH = BQs), (qQs = RQs));
  MY = class MY extends _i()("@opencode/ProjectV2") {};
  ((GQs = Es(
    MY,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* qG,
        r = yield* Vde,
        s = Ge("Project.directories")(function* (I) {
          return yield* r.list(I.projectID);
        }),
        a = ni(function* (I) {
          return yield* e.readFileString(Mir.join(I, "opencode")).pipe(
            Vn((D) => D.trim()),
            Vn((D) => (D ? z_.make(D) : void 0)),
            $s(() => Jt(void 0)),
          );
        }),
        H = ni(function* (I) {
          let D = yield* t.remote.get(I);
          if (!D) return;
          let S = u(D);
          if (!S) return;
          return z_.make(qU.fast(`git-remote:${S}`));
        });
      function u(I) {
        let D = I.trim();
        if (!D) return;
        try {
          let S = new URL(D);
          if (S.protocol === "file:") return;
          return f(S.hostname, S.pathname);
        } catch {
          let S = D.match(/^([^@/:]+@)?([^/:]+):(.+)$/);
          if (S) return f(S[2], S[3]);
          return;
        }
      }
      function f(I, D) {
        let S = D.replace(/^\/+/, "")
          .replace(/\.git\/?$/, "")
          .replace(/\/+$/, "");
        if (!I || !S) return;
        return `${I.toLowerCase()}/${S}`;
      }
      let d = ni(function* (I) {
          let D = (yield* t.history.rootCommits(I))[0];
          return D ? z_.make(D) : void 0;
        }),
        _ = Ge("Project.resolve")(function* (I) {
          let D = yield* t.repo.discover(I);
          if (!D) return { id: z_.global, directory: bo.make(Mir.parse(I).root), vcs: void 0 };
          let S = yield* a(D.commonDirectory),
            T = (yield* H(D)) ?? S ?? (yield* d(D));
          return {
            previous: S,
            id: T ?? z_.global,
            directory: D.worktree,
            vcs: { type: "git", store: D.commonDirectory },
          };
        }),
        L = Ge("Project.commit")(function* (I) {
          yield* e.writeFileString(Mir.join(I.store, "opencode"), I.id).pipe(FA);
        });
      return MY.of({ directories: s, resolve: _, commit: L });
    }),
  )),
    (hWe = iA({ service: MY, layer: GQs, deps: [ui.node, zMe, yir] })));
});