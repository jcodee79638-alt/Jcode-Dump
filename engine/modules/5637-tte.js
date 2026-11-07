
var tte = ne(async () => {
  au();
  Gt();
  eHe();
  Ql();
  Nhe();
  Hwt();
  await Jn([ime(), ZL(), tte()]);
  ((vYa = ni(function* (e, t, r, s, a) {
    if (s.length === 0) return { patches: new Map(), capped: !1 };
    let H = yield* e.patchAll(t, r, { context: a?.context ?? JPr, maxOutputBytes: zPr });
    return {
      patches: TYa(H).reduce((u, f, d) => {
        let _ = SYa(f) ?? s[d]?.file;
        if (!_) return u;
        return (u.set(_, (u.get(_) ?? "") + f), u);
      }, new Map()),
      capped: H.truncated,
    };
  })),
    (bYa = ni(function* (e, t, r, s, a) {
      let H =
        s.code === "??" || !r
          ? yield* e.patchUntracked(t, s.file, { context: a?.context ?? JPr, maxOutputBytes: dQi })
          : yield* e.patch(t, r, s.file, { context: a?.context ?? JPr, maxOutputBytes: dQi });
      if (!H.truncated && H.text) return H.text;
      return cwt(s.file);
    })),
    (PYa = ni(function* (e, t, r, s, a, H, u) {
      if (H) return cwt(s.file);
      let f = a.patches.get(s.file);
      if (f !== void 0) return f;
      if (s.code !== "??" && a.capped) return cwt(s.file);
      return yield* bYa(e, t, r, s, u);
    })),
    (_Qi = ni(function* (e, t, r, s, a, H, u) {
      let f = [],
        d = 0,
        _ = !1;
      for (let L of s.toSorted((I, D) => I.file.localeCompare(D.file))) {
        let I = a.get(L.file) ?? (L.status === "added" ? yield* e.statUntracked(t, L.file) : void 0),
          D = yield* PYa(e, t, r, L, H, _, u),
          S = _ ? { patch: D, capped: !0 } : jYa(L.file, D, d);
        if (((_ = _ || S.capped), !_)) ((d += Buffer.byteLength(S.patch)), (_ = d >= zPr));
        f.push({
          file: L.file,
          patch: S.patch,
          additions: I?.additions ?? 0,
          deletions: I?.deletions ?? 0,
          status: L.status,
        });
      }
      return f;
    })),
    (hQi = ni(function* (e, t, r, s) {
      let [a, H, u] = yield* Km([e.diff(t, r), e.stats(t, r), e.status(t)], { concurrency: 3 });
      return yield* _Qi(
        e,
        t,
        r,
        DYa(
          a,
          u.filter((f) => f.code === "??"),
        ),
        mQi(H),
        yield* vYa(e, t, r, a, s),
        s,
      );
    })),
    (CYa = ni(function* (e, t, r, s) {
      if (!r) return yield* _Qi(e, t, r, yield* e.status(t), new Map(), yYa(), s);
      return yield* hQi(e, t, r, s);
    })),
    (wYa = Jo(["git", "branch"])),
    (kYa = Dwe),
    (OYa = nt({ branch: be(re), default_branch: be(re) }).annotate({ identifier: "VcsInfo" })),
    (UYa = nt({
      file: re,
      patch: be(re),
      additions: mo,
      deletions: mo,
      status: be(Jo(["added", "deleted", "modified"])),
    }).annotate({ identifier: "VcsFileDiff" })),
    (NYa = nt({
      file: re,
      additions: mo,
      deletions: mo,
      status: Jo(["added", "deleted", "modified"]),
    }).annotate({ identifier: "VcsFileStatus" })),
    (FYa = nt({ patch: re })),
    (BYa = nt({ applied: Vi })));
  Awt = class Awt extends (
    ki()("VcsPatchApplyError", { message: re, reason: Jo(["non-git", "not-clean"]) })
  ) {};
  iAe = class iAe extends _i()("@opencode/Vcs") {};
  ((RYa = Es(
    iAe,
    ft(function* () {
      let e = yield* Uhe,
        t = yield* B$,
        r = yield* $f,
        s = yield* cx(
          Ge("Vcs.state")(function* (a) {
            if (a.project.vcs !== "git") return { current: void 0, root: void 0 };
            let H = ni(function* () {
                return yield* e.branch(a.directory);
              }),
              [u, f] = yield* Km([e.branch(a.directory), e.defaultBranch(a.directory)], { concurrency: 2 }),
              d = { current: u, root: f },
              _ = yield* t.listen((L) => {
                if (L.type !== Qse.Updated.type || L.location?.directory !== a.directory) return ti;
                if (!L.data.file.endsWith("HEAD")) return ti;
                return ft(function* () {
                  let D = yield* H();
                  if (D !== d.current) ((d.current = D), yield* t.publish(kYa.BranchUpdated, { branch: D }));
                });
              });
            return (yield* sL(() => _), d);
          }),
        );
      return iAe.of({
        init: Ge("Vcs.init")(function* () {
          yield* Eu(s).pipe(zm(r));
        }),
        branch: Ge("Vcs.branch")(function* () {
          return yield* ODr(s, (a) => a.current);
        }),
        defaultBranch: Ge("Vcs.defaultBranch")(function* () {
          return yield* ODr(s, (a) => a.root?.name);
        }),
        status: Ge("Vcs.status")(function* () {
          let a = yield* Jc;
          if (a.project.vcs !== "git") return [];
          let H = (yield* e.hasHead(a.directory)) ? "HEAD" : void 0,
            [u, f] = yield* Km([e.status(a.directory), H ? e.stats(a.directory, H) : Jt([])], {
              concurrency: 2,
            }),
            d = mQi(f);
          return yield* ja(
            u.toSorted((_, L) => _.file.localeCompare(L.file)),
            (_) =>
              ft(function* () {
                let L =
                  d.get(_.file) ??
                  (_.status === "added" ? yield* e.statUntracked(a.worktree, _.file) : void 0);
                return {
                  file: _.file,
                  additions: L?.additions ?? 0,
                  deletions: L?.deletions ?? 0,
                  status: _.status,
                };
              }),
          );
        }),
        diff: Ge("Vcs.diff")(function* (a, H) {
          let u = yield* Eu(s),
            f = yield* Jc;
          if (f.project.vcs !== "git") return [];
          if (a === "git")
            return yield* CYa(e, f.directory, (yield* e.hasHead(f.directory)) ? "HEAD" : void 0, H);
          if (!u.root) return [];
          if (u.current && u.current === u.root.name) return [];
          let d = yield* e.mergeBase(f.directory, u.root.ref);
          if (!d) return [];
          return yield* hQi(e, f.directory, d, H);
        }),
        diffRaw: Ge("Vcs.diffRaw")(function* () {
          let a = yield* Jc;
          if (a.project.vcs !== "git") return "";
          let [H, u] = yield* Km([e.hasHead(a.directory), e.status(a.directory)], { concurrency: 2 }),
            f = H ? (yield* e.patchAll(a.directory, "HEAD")).text : "",
            d = yield* ja(
              u.filter((_) => _.code === "??"),
              (_) => e.patchUntracked(a.directory, _.file).pipe(Vn((L) => L.text)),
            );
          return [f, ...d].filter(Boolean).join(`
`);
        }),
        apply: Ge("Vcs.apply")(function* (a) {
          let H = yield* Jc;
          if (H.project.vcs !== "git")
            return yield* new Awt({
              message: "Patch can't be applied because the project is not git-based",
              reason: "non-git",
            });
          if ((yield* e.applyPatch(H.directory, a.patch)).exitCode !== 0)
            return yield* new Awt({ message: "Patch can't be applied", reason: "not-clean" });
          return { applied: !0 };
        }),
      });
    }),
  )),
    (vQe = Ll({ service: iAe, layer: RYa, deps: [HXe, q1] })));
});