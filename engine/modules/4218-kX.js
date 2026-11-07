
var kX = ne(async () => {
  au();
  Gt();
  _w();
  eHe();
  LV();
  Ql();
  jA();
  Ide();
  o0();
  txe();
  await Jn([um(), kX()]);
  ((l4c = nt({ hash: re, files: J0(On(re)) })),
    (DOi = Xde),
    (Vhe = ["-c", "core.longpaths=true", "-c", "core.symlinks=true"]),
    (bHe = ["-c", "core.autocrlf=false", ...Vhe]),
    (Whe = [...bHe, "-c", "core.quotepath=false"]));
  jHe = class jHe extends _i()("@opencode/Snapshot") {};
  ((_ja = Es(
    jHe,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* x2,
        r = yield* Eg,
        s = new Map(),
        a = (u) => {
          let f = s.get(u);
          if (f) return f;
          let d = j6(1);
          return (s.set(u, d), d);
        },
        H = yield* cx(
          Ge("Snapshot.state")(function* (u) {
            let f = {
                directory: u.directory,
                worktree: u.worktree,
                gitdir: qN.join(uH.data, "snapshot", u.project.id, qU.fast(u.worktree)),
                vcs: u.project.vcs,
              },
              d = (_e) => ["--git-dir", f.gitdir, "--work-tree", f.worktree, ..._e],
              _ = (_e) => _e.join("\x00") + "\x00",
              L = (_e) => _(_e.map((we) => `:(top,literal)${we}`)),
              I = ni(
                function* (_e, we) {
                  let Pe = yield* t.run(Lh("git", _e, { cwd: we?.cwd, env: we?.env, extendEnv: !0 }), {
                    stdin: we?.stdin,
                  });
                  return {
                    code: W1e(Pe.exitCode),
                    text: Pe.stdout.toString("utf8"),
                    stderr: Pe.stderr.toString("utf8"),
                  };
                },
                $s((_e) =>
                  Jt({ code: W1e(1), text: "", stderr: _e instanceof Error ? _e.message : String(_e) }),
                ),
              ),
              D = ni(function* (_e) {
                if (!_e.length) return new Set();
                let we = _e.map((ye) => (ye.startsWith(":") ? `./${ye}` : ye)),
                  Pe = yield* I(
                    [
                      ...Whe,
                      "--git-dir",
                      qN.join(f.worktree, ".git"),
                      "--work-tree",
                      f.worktree,
                      "check-ignore",
                      "--no-index",
                      "--stdin",
                      "-z",
                    ],
                    { cwd: f.worktree, stdin: _(we) },
                  );
                if (Pe.code !== 0 && Pe.code !== 1) return new Set();
                return new Set(
                  Pe.text
                    .split("\x00")
                    .filter(Boolean)
                    .map((ye) => (ye.startsWith("./:") ? ye.slice(2) : ye)),
                );
              }),
              S = ni(function* (_e) {
                if (!_e.length) return;
                yield* I(
                  [
                    ...bHe,
                    ...d([
                      "rm",
                      "--cached",
                      "-f",
                      "--ignore-unmatch",
                      "--pathspec-from-file=-",
                      "--pathspec-file-nul",
                    ]),
                  ],
                  { cwd: f.worktree, stdin: L(_e) },
                );
              }),
              T = ni(function* (_e) {
                if (!_e.length) return;
                let we = yield* I(
                  [
                    ...bHe,
                    ...d(["add", "--all", "--sparse", "--pathspec-from-file=-", "--pathspec-file-nul"]),
                  ],
                  { cwd: f.worktree, stdin: L(_e) },
                );
                if (we.code === 0) return;
                yield* lp("failed to add snapshot files", { exitCode: we.code, stderr: we.stderr });
              }),
              C = (_e) => e.exists(_e).pipe(on),
              O = (_e) => e.readFileString(_e).pipe($s(() => Jt(""))),
              B = (_e) => e.remove(_e).pipe($s(() => ti)),
              V = (_e) => a(f.gitdir).withPermits(1)(_e),
              q = ni(function* () {
                if (f.vcs !== "git") return !1;
                return (yield* r.get()).snapshot !== !1;
              }),
              Z = ni(function* () {
                let we = (yield* I(["rev-parse", "--path-format=absolute", "--git-path", "info/exclude"], {
                  cwd: f.worktree,
                })).text.trim();
                if (!we) return;
                if (!(yield* C(we))) return;
                return we;
              }),
              se = ni(function* (_e = []) {
                let we = yield* Z(),
                  Pe = qN.join(f.gitdir, "info", "exclude"),
                  ye = [
                    we ? (yield* O(we)).trimEnd() : "",
                    ..._e.map((ot) => `/${ot.replaceAll("\\", "/")}`),
                  ].filter(Boolean).join(`
`);
                (yield* e.ensureDir(qN.join(f.gitdir, "info")).pipe(on),
                  yield* e
                    .writeFileString(
                      Pe,
                      ye
                        ? `${ye}
`
                        : "",
                    )
                    .pipe(on));
              }),
              ae = ni(function* () {
                if (f.vcs !== "git") return;
                let _e = yield* I(["rev-parse", "--path-format=absolute", "--git-common-dir"], {
                  cwd: f.worktree,
                });
                if (_e.code !== 0) return;
                let we = _e.text.trim();
                if (!we || !(yield* C(we))) return;
                let Pe = qN.join(we, "objects"),
                  ye = (yield* O(qN.join(Pe, "info", "alternates")))
                    .split(
                      `
`,
                    )
                    .map((Ve) => Ve.trim())
                    .filter(Boolean),
                  ot = [];
                for (let Ve of [Pe, ...ye]) if (yield* C(Ve)) ot.push(Ve);
                if (!ot.length) return;
                (yield* e.ensureDir(qN.join(f.gitdir, "objects", "info")).pipe(on),
                  yield* e
                    .writeFileString(
                      qN.join(f.gitdir, "objects", "info", "alternates"),
                      ot.join(`
`) +
                        `
`,
                    )
                    .pipe(on));
                let Ee = qN.join(we, "index");
                if (yield* C(Ee)) yield* e.copyFile(Ee, qN.join(f.gitdir, "index")).pipe($s(() => ti));
              }),
              z = ni(function* () {
                yield* se();
                let [_e, we] = yield* Km(
                  [
                    I([...Whe, ...d(["diff-files", "--name-only", "-z", "--", "."])], { cwd: f.directory }),
                    I(
                      [
                        ...Whe,
                        ...d(["ls-files", "--full-name", "--others", "--exclude-standard", "-z", "--", "."]),
                      ],
                      { cwd: f.directory },
                    ),
                  ],
                  { concurrency: 2 },
                );
                if (_e.code !== 0 || we.code !== 0) {
                  yield* lp("failed to list snapshot files", {
                    diffCode: _e.code,
                    diffStderr: _e.stderr,
                    otherCode: we.code,
                    otherStderr: we.stderr,
                  });
                  return;
                }
                let Pe = _e.text.split("\x00").filter(Boolean),
                  ye = we.text.split("\x00").filter(Boolean),
                  ot = Array.from(new Set([...Pe, ...ye]));
                if (!ot.length) return;
                let Ee = yield* D(ot);
                if (Ee.size > 0) {
                  let At = Array.from(Ee);
                  (yield* fH("removing gitignored files from snapshot", { count: At.length }), yield* S(At));
                }
                let Ve = ot.filter((At) => !Ee.has(At));
                if (!Ve.length) return;
                let Fe = new Set(
                    (yield* Km(
                      Ve.map((At) =>
                        e
                          .stat(qN.join(f.worktree, At))
                          .pipe($s(() => ti))
                          .pipe(
                            Vn((et) => {
                              if (!et || et.type !== "File") return;
                              return (typeof et.size === "bigint" ? Number(et.size) : et.size) > mja
                                ? At
                                : void 0;
                            }),
                          ),
                      ),
                      { concurrency: 8 },
                    )).filter((At) => Boolean(At)),
                  ),
                  it = new Set(ye.filter((At) => Fe.has(At)));
                (yield* se(Array.from(it)), yield* T(Ve.filter((At) => !it.has(At))));
              }),
              Ae = ni(function* () {
                return yield* V(
                  ft(function* () {
                    if (!(yield* q())) return;
                    if (!(yield* C(f.gitdir))) return;
                    let _e = yield* I(d(["gc", `--prune=${IOi}`]), { cwd: f.directory });
                    if (_e.code !== 0) {
                      yield* lp("cleanup failed", { exitCode: _e.code, stderr: _e.stderr });
                      return;
                    }
                    yield* fH("cleanup", { prune: IOi });
                  }),
                );
              }),
              le = ni(function* () {
                return yield* V(
                  ft(function* () {
                    if (!(yield* q())) return;
                    let _e = yield* C(f.gitdir);
                    if ((yield* e.ensureDir(f.gitdir).pipe(on), !_e))
                      (yield* I(["init"], { env: { GIT_DIR: f.gitdir, GIT_WORK_TREE: f.worktree } }),
                        yield* I(["--git-dir", f.gitdir, "config", "core.autocrlf", "false"]),
                        yield* I(["--git-dir", f.gitdir, "config", "core.longpaths", "true"]),
                        yield* I(["--git-dir", f.gitdir, "config", "core.symlinks", "true"]),
                        yield* I(["--git-dir", f.gitdir, "config", "core.fsmonitor", "false"]),
                        yield* I(["--git-dir", f.gitdir, "config", "feature.manyFiles", "true"]),
                        yield* I(["--git-dir", f.gitdir, "config", "index.version", "4"]),
                        yield* I(["--git-dir", f.gitdir, "config", "index.threads", "true"]),
                        yield* I(["--git-dir", f.gitdir, "config", "core.untrackedCache", "true"]),
                        yield* ae(),
                        yield* fH("initialized"));
                    yield* z();
                    let Pe = (yield* I(d(["write-tree"]), { cwd: f.directory })).text.trim();
                    return (yield* fH("tracking", { hash: Pe, cwd: f.directory, git: f.gitdir }), Pe);
                  }),
                );
              }),
              Be = ni(function* (_e) {
                return yield* V(
                  ft(function* () {
                    yield* z();
                    let we = yield* I(
                      [...Whe, ...d(["diff", "--cached", "--no-ext-diff", "--name-only", _e, "--", "."])],
                      { cwd: f.directory },
                    );
                    if (we.code !== 0)
                      return (
                        yield* lp("failed to get diff", { hash: _e, exitCode: we.code }),
                        { hash: _e, files: [] }
                      );
                    let Pe = we.text
                        .trim()
                        .split(
                          `
`,
                        )
                        .map((ot) => ot.trim())
                        .filter(Boolean),
                      ye = yield* D(Pe);
                    return {
                      hash: _e,
                      files: Pe.filter((ot) => !ye.has(ot)).map((ot) =>
                        qN.join(f.worktree, ot).replaceAll("\\", "/"),
                      ),
                    };
                  }),
                );
              }),
              Te = ni(function* (_e) {
                return yield* V(
                  ft(function* () {
                    yield* fH("restore", { commit: _e });
                    let we = yield* I([...Vhe, ...d(["read-tree", _e])], { cwd: f.worktree });
                    if (we.code === 0) {
                      let Pe = yield* I([...Vhe, ...d(["checkout-index", "-a", "-f"])], { cwd: f.worktree });
                      if (Pe.code === 0) return;
                      yield* cf("failed to restore snapshot", {
                        snapshot: _e,
                        exitCode: Pe.code,
                        stderr: Pe.stderr,
                      });
                      return;
                    }
                    yield* cf("failed to restore snapshot", {
                      snapshot: _e,
                      exitCode: we.code,
                      stderr: we.stderr,
                    });
                  }),
                );
              }),
              Lt = ni(function* (_e) {
                return yield* V(
                  ft(function* () {
                    let we = [],
                      Pe = new Set();
                    for (let Ee of _e)
                      for (let Ve of Ee.files) {
                        if (Pe.has(Ve)) continue;
                        (Pe.add(Ve),
                          we.push({
                            hash: Ee.hash,
                            file: Ve,
                            rel: qN.relative(f.worktree, Ve).replaceAll("\\", "/"),
                          }));
                      }
                    let ye = ni(function* (Ee) {
                        if (
                          (yield* fH("reverting", { file: Ee.file, hash: Ee.hash }),
                          (yield* I([...Vhe, ...d(["checkout", Ee.hash, "--", Ee.file])], {
                            cwd: f.worktree,
                          })).code === 0)
                        )
                          return;
                        let Fe = yield* I([...Vhe, ...d(["ls-tree", Ee.hash, "--", Ee.rel])], {
                          cwd: f.worktree,
                        });
                        if (Fe.code === 0 && Fe.text.trim()) {
                          yield* fH("file existed in snapshot but checkout failed, keeping", {
                            file: Ee.file,
                            hash: Ee.hash,
                          });
                          return;
                        }
                        (yield* fH("file did not exist in snapshot, deleting", {
                          file: Ee.file,
                          hash: Ee.hash,
                        }),
                          yield* B(Ee.file));
                      }),
                      ot = (Ee, Ve) => Ee === Ve || Ee.startsWith(`${Ve}/`) || Ve.startsWith(`${Ee}/`);
                    for (let Ee = 0; Ee < we.length;) {
                      let Ve = we[Ee],
                        Fe = [Ve],
                        it = Ee + 1;
                      while (it < we.length && Fe.length < 100) {
                        let ht = we[it];
                        if (ht.hash !== Ve.hash) break;
                        if (Fe.some((Et) => ot(Et.rel, ht.rel))) break;
                        (Fe.push(ht), (it += 1));
                      }
                      if (Fe.length === 1) {
                        (yield* ye(Ve), (Ee = it));
                        continue;
                      }
                      let At = yield* I(
                        [...Vhe, ...d(["ls-tree", "--name-only", Ve.hash, "--", ...Fe.map((ht) => ht.rel)])],
                        { cwd: f.worktree },
                      );
                      if (At.code !== 0) {
                        yield* fH("batched ls-tree failed, falling back to single-file revert", {
                          hash: Ve.hash,
                          files: Fe.length,
                        });
                        for (let ht of Fe) yield* ye(ht);
                        Ee = it;
                        continue;
                      }
                      let et = new Set(
                          At.text
                            .trim()
                            .split(
                              `
`,
                            )
                            .map((ht) => ht.trim())
                            .filter(Boolean),
                        ),
                        ut = Fe.filter((ht) => et.has(ht.rel));
                      if (ut.length) {
                        if (
                          (yield* fH("reverting", { hash: Ve.hash, files: ut.length }),
                          (yield* I([...Vhe, ...d(["checkout", Ve.hash, "--", ...ut.map((Et) => Et.file)])], {
                            cwd: f.worktree,
                          })).code !== 0)
                        ) {
                          yield* fH("batched checkout failed, falling back to single-file revert", {
                            hash: Ve.hash,
                            files: ut.length,
                          });
                          for (let Et of Fe) yield* ye(Et);
                          Ee = it;
                          continue;
                        }
                      }
                      for (let ht of Fe) {
                        if (et.has(ht.rel)) continue;
                        (yield* fH("file did not exist in snapshot, deleting", {
                          file: ht.file,
                          hash: ht.hash,
                        }),
                          yield* B(ht.file));
                      }
                      Ee = it;
                    }
                  }),
                );
              }),
              Ht = ni(function* (_e) {
                return yield* V(
                  ft(function* () {
                    yield* z();
                    let we = yield* I([...Whe, ...d(["diff", "--cached", "--no-ext-diff", _e, "--", "."])], {
                      cwd: f.worktree,
                    });
                    if (we.code !== 0)
                      return (
                        yield* lp("failed to get diff", { hash: _e, exitCode: we.code, stderr: we.stderr }),
                        ""
                      );
                    return we.text.trim();
                  }),
                );
              }),
              Se = ni(function* (_e, we) {
                return yield* V(
                  ft(function* () {
                    let Pe = ni(function* (ht) {
                        if (ht.binary) return ["", ""];
                        if (ht.status === "added")
                          return [
                            "",
                            yield* I([...bHe, ...d(["show", `${we}:${ht.file}`])]).pipe(Vn((Et) => Et.text)),
                          ];
                        if (ht.status === "deleted")
                          return [
                            yield* I([...bHe, ...d(["show", `${_e}:${ht.file}`])]).pipe(Vn((Et) => Et.text)),
                            "",
                          ];
                        return yield* Km(
                          [
                            I([...bHe, ...d(["show", `${_e}:${ht.file}`])]).pipe(Vn((Et) => Et.text)),
                            I([...bHe, ...d(["show", `${we}:${ht.file}`])]).pipe(Vn((Et) => Et.text)),
                          ],
                          { concurrency: 2 },
                        );
                      }),
                      ye = ni(
                        function* (ht) {
                          let Et = ht.flatMap((wt) => {
                            if (wt.binary) return [];
                            if (wt.status === "added")
                              return [{ file: wt.file, side: "after", ref: `${we}:${wt.file}` }];
                            if (wt.status === "deleted")
                              return [{ file: wt.file, side: "before", ref: `${_e}:${wt.file}` }];
                            return [
                              { file: wt.file, side: "before", ref: `${_e}:${wt.file}` },
                              { file: wt.file, side: "after", ref: `${we}:${wt.file}` },
                            ];
                          });
                          if (!Et.length) return new Map();
                          let tr = yield* t.run(
                            Lh("git", [...bHe, ...d(["cat-file", "--batch"])], {
                              cwd: f.directory,
                              extendEnv: !0,
                            }),
                            {
                              stdin:
                                Et.map((wt) => wt.ref).join(`
`) +
                                `
`,
                            },
                          );
                          if (tr.exitCode !== 0) {
                            yield* fH(
                              "git cat-file --batch failed during snapshot diff, falling back to per-file git show",
                              { stderr: tr.stderr.toString("utf8"), refs: Et.length },
                            );
                            return;
                          }
                          let Rr = tr.stdout,
                            Vt = (wt, Qr) => {
                              return;
                            },
                            Br = new Map(),
                            Dt = new TextDecoder(),
                            St = 0;
                          for (let wt of Et) {
                            let Qr = St;
                            while (Qr < Rr.length && Rr[Qr] !== 10) Qr += 1;
                            if (Qr >= Rr.length)
                              return Vt(
                                "git cat-file --batch returned a truncated header during snapshot diff, falling back to per-file git show",
                              );
                            let Li = Dt.decode(Rr.slice(St, Qr));
                            St = Qr + 1;
                            let sr = Br.get(wt.file) ?? { before: "", after: "" };
                            if (Li.endsWith(" missing")) {
                              Br.set(wt.file, sr);
                              continue;
                            }
                            let Mt = Li.match(/^[0-9a-f]+ blob (\d+)$/);
                            if (!Mt)
                              return Vt(
                                "git cat-file --batch returned an unexpected header during snapshot diff, falling back to per-file git show",
                                { head: Li },
                              );
                            let Lr = Number(Mt[1]);
                            if (!Number.isInteger(Lr) || Lr < 0 || St + Lr >= Rr.length || Rr[St + Lr] !== 10)
                              return Vt(
                                "git cat-file --batch returned truncated content during snapshot diff, falling back to per-file git show",
                                { head: Li },
                              );
                            let Tr = Dt.decode(Rr.slice(St, St + Lr));
                            if (wt.side === "before") sr.before = Tr;
                            if (wt.side === "after") sr.after = Tr;
                            (Br.set(wt.file, sr), (St += Lr + 1));
                          }
                          if (St !== Rr.length)
                            return Vt(
                              "git cat-file --batch returned trailing data during snapshot diff, falling back to per-file git show",
                            );
                          return Br;
                        },
                        FL,
                        $s(() => Jt(void 0)),
                      ),
                      ot = [],
                      Ee = new Map(),
                      Ve = yield* I(
                        [
                          ...Whe,
                          ...d(["diff", "--no-ext-diff", "--name-status", "--no-renames", _e, we, "--", "."]),
                        ],
                        { cwd: f.directory },
                      );
                    for (let ht of Ve.text.trim().split(`
`)) {
                      if (!ht) continue;
                      let [Et, tr] = ht.split("\t");
                      if (!Et || !tr) continue;
                      Ee.set(tr, Et.startsWith("A") ? "added" : Et.startsWith("D") ? "deleted" : "modified");
                    }
                    let it = (yield* I(
                        [
                          ...Whe,
                          ...d(["diff", "--no-ext-diff", "--no-renames", "--numstat", _e, we, "--", "."]),
                        ],
                        { cwd: f.directory },
                      )).text
                        .trim()
                        .split(
                          `
`,
                        )
                        .filter(Boolean)
                        .flatMap((ht) => {
                          let [Et, tr, Rr] = ht.split("\t");
                          if (!Rr) return [];
                          let Vt = Et === "-" && tr === "-",
                            Br = Vt ? 0 : parseInt(Et),
                            Dt = Vt ? 0 : parseInt(tr);
                          return [
                            {
                              file: Rr,
                              status: Ee.get(Rr) ?? "modified",
                              binary: Vt,
                              additions: Number.isFinite(Br) ? Br : 0,
                              deletions: Number.isFinite(Dt) ? Dt : 0,
                            },
                          ];
                        }),
                      At = yield* D(it.map((ht) => ht.file));
                    if (At.size > 0) {
                      let ht = it.filter((Et) => !At.has(Et.file));
                      ((it.length = 0), it.push(...ht));
                    }
                    let et = 100,
                      ut = (ht, Et, tr) =>
                        Zae(ehe(ht, ht, Et, tr, "", "", { context: Number.MAX_SAFE_INTEGER }));
                    for (let ht = 0; ht < it.length; ht += et) {
                      let Et = it.slice(ht, ht + et),
                        tr = yield* ye(Et);
                      for (let Rr of Et) {
                        let Vt = tr?.get(Rr.file) ?? { before: "", after: "" },
                          [Br, Dt] = Rr.binary ? ["", ""] : tr ? [Vt.before, Vt.after] : yield* Pe(Rr);
                        ot.push({
                          file: Rr.file,
                          patch: Rr.binary ? "" : ut(Rr.file, Br, Dt),
                          additions: Rr.additions,
                          deletions: Rr.deletions,
                          status: Rr.status,
                        });
                      }
                    }
                    return ot;
                  }),
                );
              });
            return (
              yield* Ae().pipe(
                jf((_e) => cf("cleanup loop failed", { cause: BC(_e) })),
                xie(Die(cut(1))),
                nBe(Hie(1)),
                EI,
              ),
              { cleanup: Ae, track: le, patch: Be, restore: Te, revert: Lt, diff: Ht, diffFull: Se }
            );
          }),
        );
      return jHe.of({
        init: Ge("Snapshot.init")(function* () {
          yield* Eu(H);
        }),
        cleanup: Ge("Snapshot.cleanup")(function* () {
          return yield* V1(H, (u) => u.cleanup());
        }),
        track: Ge("Snapshot.track")(function* () {
          return yield* V1(H, (u) => u.track());
        }),
        patch: Ge("Snapshot.patch")(function* (u) {
          return yield* V1(H, (f) => f.patch(u));
        }),
        restore: Ge("Snapshot.restore")(function* (u) {
          return yield* V1(H, (f) => f.restore(u));
        }),
        revert: Ge("Snapshot.revert")(function* (u) {
          return yield* V1(H, (f) => f.revert(u));
        }),
        diff: Ge("Snapshot.diff")(function* (u) {
          return yield* V1(H, (f) => f.diff(u));
        }),
        diffFull: Ge("Snapshot.diffFull")(function* (u, f) {
          return yield* V1(H, (d) => d.diffFull(u, f));
        }),
      });
    }),
  )),
    (Eje = Ll({ service: jHe, layer: _ja, deps: [ui.node, IY, Ab] })));
});