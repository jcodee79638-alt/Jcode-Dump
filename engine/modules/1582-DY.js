
var DY = ne(() => {
  DY();
  Gt();
  _w();
  BA();
  jA();
  LV();
  OH();
  dWe();
  K_t = class K_t extends Pa("Git.Repository")({ worktree: bo, gitDirectory: bo, commonDirectory: bo }) {};
  ((WDn = re.pipe(Jl("Git.ChangeSet"))), (KMe = re.pipe(Jl("Git.TreeID"))));
  KU = class KU extends (
    ki()("Git.OperationError", {
      operation: Jo([
        "clone",
        "fetch",
        "checkout",
        "reset",
        "create",
        "refresh",
        "write_tree",
        "list_files",
        "diff",
        "restore",
      ]),
      message: re,
      directory: be(bo),
      cause: be(yd()),
    })
  ) {};
  VDn = class VDn extends Pa("Git.Worktree")({ directory: bo, kind: Jo(["main", "linked"]) }) {};
  mWe = class mWe extends (
    ki()("Git.WorktreeError", {
      operation: Jo(["create", "remove", "list"]),
      message: re,
      directory: be(bo),
      forceRequired: be(Vi),
      cause: be(yd()),
    })
  ) {};
  zU = class zU extends (
    ki()("Git.PatchError", {
      operation: Jo(["capture", "apply", "reset"]),
      directory: bo,
      message: re,
      cause: be(yd()),
    })
  ) {};
  qG = class qG extends _i()("@opencode/GitV2") {};
  ((OQs = Es(
    qG,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* x2,
        r = mir(),
        s = (Ee, Ve) => r.withLock(Ee.gitDirectory)(Ve),
        a = Ge("Git.repo.discover")(function* (Ee) {
          let Ve = yield* e.up({ targets: [".git"], start: Ee }).pipe(
            Vn((ht) => ht[0]),
            $s(() => Jt(void 0)),
          );
          if (!Ve) return;
          let Fe = hw.dirname(Ve),
            it = JMe(Fe, t),
            At = yield* it(["rev-parse", "--show-toplevel"]),
            et = yield* it(["rev-parse", "--git-dir"]),
            ut = yield* it(["rev-parse", "--git-common-dir"]);
          if (et.exitCode !== 0 || ut.exitCode !== 0) return;
          return new K_t({
            worktree: bo.make(At.exitCode === 0 ? J_t(Fe, At.text) : Fe),
            gitDirectory: bo.make(J_t(Fe, et.text)),
            commonDirectory: bo.make(J_t(Fe, ut.text)),
          });
        }),
        H = Ge("Git.remote.get")(function* (Ee, Ve = "origin") {
          let Fe = yield* JMe(Ee.worktree, t)(["remote", "get-url", Ve]);
          if (Fe.exitCode !== 0) return;
          return Fe.text.trim() || void 0;
        }),
        u = Ge("Git.history.rootCommits")(function* (Ee) {
          let Ve = yield* JMe(Ee.worktree, t)(["rev-list", "--max-parents=0", "HEAD"]);
          if (Ve.exitCode !== 0) return [];
          return Ve.text
            .split(
              `
`,
            )
            .map((Fe) => Fe.trim())
            .filter(Boolean)
            .toSorted();
        }),
        f = Ge("Git.history.head")(function* (Ee) {
          let Ve = yield* JMe(Ee.worktree, t)(["rev-parse", "HEAD"]);
          if (Ve.exitCode !== 0) return;
          return Ve.text.trim() || void 0;
        }),
        d = Ge("Git.history.branch")(function* (Ee) {
          let Ve = yield* JMe(Ee.worktree, t)(["symbolic-ref", "--quiet", "--short", "HEAD"]);
          if (Ve.exitCode !== 0) return;
          return Ve.text.trim() || void 0;
        }),
        _ = Ge("Git.history.defaultRemoteBranch")(function* (Ee, Ve = "origin") {
          let Fe = yield* JMe(Ee.worktree, t)(["symbolic-ref", `refs/remotes/${Ve}/HEAD`]);
          if (Fe.exitCode !== 0) return;
          return Fe.text.trim().replace(new RegExp(`^refs/remotes/${Ve}/`), "") || void 0;
        }),
        L = ni(function* (Ee, Ve, Fe) {
          let it = yield* Wde(
            Ve,
            t,
          )(Fe).pipe(Zo((At) => new KU({ operation: Ee, directory: Ve, message: At.message, cause: At })));
          if (it.exitCode === 0) return;
          return yield* new KU({
            operation: Ee,
            directory: Ve,
            message: it.stderr.trim() || it.text.trim() || `Git ${Ee} failed`,
          });
        }),
        I = Ge("Git.repo.clone")(function* (Ee) {
          yield* L("clone", bo.make(hw.dirname(Ee.directory)), [
            "clone",
            "--depth",
            String(Ee.depth ?? 100),
            ...(Ee.branch ? ["--branch", Ee.branch] : []),
            "--",
            Ee.remote,
            Ee.directory,
          ]);
          let Ve = yield* a(Ee.directory);
          if (Ve) return Ve;
          return yield* new KU({
            operation: "clone",
            directory: Ee.directory,
            message: "Cloned repository could not be opened",
          });
        }),
        D = Ge("Git.sync.fetchRemotes")(function* (Ee, Ve = {}) {
          yield* L("fetch", Ee.worktree, ["fetch", "--all", ...(Ve.prune === !1 ? [] : ["--prune"])]);
        }),
        S = Ge("Git.sync.fetchBranch")(function* (Ee, Ve) {
          let Fe = Ve.remote ?? "origin",
            it = `refs/heads/${Ve.branch}:refs/remotes/${Fe}/${Ve.branch}`;
          yield* L("fetch", Ee.worktree, ["fetch", Fe, Ve.force === !1 ? it : `+${it}`]);
        }),
        T = Ge("Git.sync.checkoutRemoteBranch")(function* (Ee, Ve) {
          let Fe = Ve.remote ?? "origin";
          yield* L("checkout", Ee.worktree, [
            "checkout",
            ...(Ve.reset === !1 ? [Ve.branch] : ["-B", Ve.branch, `${Fe}/${Ve.branch}`]),
          ]);
        }),
        C = Ge("Git.sync.resetHard")(function* (Ee, Ve) {
          yield* L("reset", Ee.worktree, ["reset", "--hard", Ve]);
        }),
        O = (Ee, Ve) => ["--git-dir", Ee.gitDirectory, "--work-tree", Ee.worktree, ...Ve],
        B = ni(function* (Ee, Ve, Fe, it) {
          let At = yield* t
              .run(Lh("git", O(Ve, Fe), { cwd: Ve.worktree, env: it?.env, extendEnv: !0 }), {
                stdin: it?.stdin,
              })
              .pipe(
                Zo((ut) => new KU({ operation: Ee, directory: Ve.worktree, message: ut.message, cause: ut })),
              ),
            et = At.stdout.toString("utf8");
          if (At.exitCode === 0) return { text: et, stderr: At.stderr.toString("utf8") };
          return yield* new KU({
            operation: Ee,
            directory: Ve.worktree,
            message: At.stderr.toString("utf8").trim() || et.trim() || `Git ${Ee} failed`,
          });
        }),
        V = Ge("Git.repo.create")(function* (Ee) {
          yield* e
            .ensureDir(Ee.gitDirectory)
            .pipe(
              Zo(
                (Fe) =>
                  new KU({
                    operation: "create",
                    directory: Ee.gitDirectory,
                    message: "Failed to create Git storage",
                    cause: Fe,
                  }),
              ),
            );
          let Ve = new K_t({
            worktree: Ee.worktree,
            gitDirectory: Ee.gitDirectory,
            commonDirectory: Ee.gitDirectory,
          });
          if (
            (yield* B("create", Ve, ["init"]),
            yield* ja(
              [
                ["core.autocrlf", "false"],
                ["core.longpaths", "true"],
                ["core.symlinks", "true"],
                ["core.fsmonitor", "false"],
                ["feature.manyFiles", "true"],
                ["index.version", "4"],
                ["index.threads", "true"],
                ["core.untrackedCache", "true"],
              ],
              ([Fe, it]) => B("create", Ve, ["config", Fe, it]),
              { discard: !0 },
            ),
            !Ee.seed)
          )
            return Ve;
          return (
            yield* e
              .ensureDir(hw.join(Ee.gitDirectory, "objects", "info"))
              .pipe(
                Zo(
                  (Fe) =>
                    new KU({
                      operation: "create",
                      directory: Ee.gitDirectory,
                      message: "Failed to configure shared Git objects",
                      cause: Fe,
                    }),
                ),
              ),
            yield* e
              .writeFileString(
                hw.join(Ee.gitDirectory, "objects", "info", "alternates"),
                hw.join(Ee.seed.commonDirectory, "objects") +
                  `
`,
              )
              .pipe(
                Zo(
                  (Fe) =>
                    new KU({
                      operation: "create",
                      directory: Ee.gitDirectory,
                      message: "Failed to configure shared Git objects",
                      cause: Fe,
                    }),
                ),
              ),
            yield* e
              .copyFile(hw.join(Ee.seed.gitDirectory, "index"), hw.join(Ee.gitDirectory, "index"))
              .pipe($s(() => ti)),
            Ve
          );
        }),
        q = Ge("Git.index.refresh")(function* (Ee) {
          let Ve = (Vt) =>
              B("refresh", Ee.repository, Vt).pipe(Vn((Br) => Br.text.split("\x00").filter(Boolean))),
            [Fe, it] = yield* Km(
              [
                Ve(["diff-files", "--name-only", "-z", "--", Ee.scope]),
                Ve(["ls-files", "--others", "--exclude-standard", "-z", "--", Ee.scope]),
              ],
              { concurrency: 2 },
            ),
            At = Array.from(new Set([...Fe, ...it]));
          if (!At.length) return { skipped: [] };
          let et = Ee.ignores
              ? new Set(
                  (yield* B("refresh", Ee.ignores, ["check-ignore", "--no-index", "--stdin", "-z"], {
                    stdin: At.join("\x00") + "\x00",
                  }).pipe($s(() => Jt({ text: "", stderr: "" })))).text
                    .split("\x00")
                    .filter(Boolean),
                )
              : new Set(),
            ut = At.filter((Vt) => !et.has(Vt)),
            ht = Ee.maximumUntrackedFileBytes,
            Et = ht
              ? (yield* ja(
                  it.filter((Vt) => ut.includes(Vt)),
                  (Vt) =>
                    e.stat(hw.join(Ee.repository.worktree, Vt)).pipe(
                      Vn((Br) => (Br.type === "File" && Number(Br.size) > ht ? du.make(Vt) : void 0)),
                      $s(() => Jt(void 0)),
                    ),
                  { concurrency: 8 },
                )).filter((Vt) => Vt !== void 0)
              : [],
            tr = ut.filter((Vt) => !Et.includes(du.make(Vt))),
            Rr = [...et, ...Et];
          if (Rr.length)
            yield* B(
              "refresh",
              Ee.repository,
              ["rm", "--cached", "-f", "--ignore-unmatch", "--pathspec-from-file=-", "--pathspec-file-nul"],
              { stdin: Rr.join("\x00") + "\x00" },
            );
          if (tr.length)
            yield* B(
              "refresh",
              Ee.repository,
              ["add", "--all", "--sparse", "--pathspec-from-file=-", "--pathspec-file-nul"],
              { stdin: tr.join("\x00") + "\x00" },
            );
          return { skipped: Et };
        }),
        Z = Ge("Git.index.ignored")(function* (Ee) {
          if (!Ee.paths.length) return new Set();
          let Ve = yield* t
            .run(
              Lh("git", O(Ee.repository, ["check-ignore", "--no-index", "--stdin", "-z"]), {
                cwd: Ee.repository.worktree,
                extendEnv: !0,
              }),
              { stdin: Ee.paths.join("\x00") + "\x00" },
            )
            .pipe(
              Zo(
                (Fe) =>
                  new KU({
                    operation: "list_files",
                    directory: Ee.repository.worktree,
                    message: Fe.message,
                    cause: Fe,
                  }),
              ),
            );
          if (Ve.exitCode !== 0 && Ve.exitCode !== 1)
            return yield* new KU({
              operation: "list_files",
              directory: Ee.repository.worktree,
              message: Ve.stderr.toString("utf8").trim() || "Failed to check ignored paths",
            });
          return new Set(
            Ve.stdout
              .toString("utf8")
              .split("\x00")
              .filter(Boolean)
              .map((Fe) => du.make(Fe)),
          );
        }),
        se = Ge("Git.tree.write")(function* (Ee) {
          return KMe.make((yield* B("write_tree", Ee, ["write-tree"])).text.trim());
        }),
        ae = Ge("Git.tree.capture")((Ee) =>
          s(
            Ee.repository,
            ft(function* () {
              return (
                yield* ja(Ee.scopes, (Ve) => q({ ...Ee, scope: Ve }), { discard: !0 }),
                yield* se(Ee.repository)
              );
            }),
          ),
        ),
        z = Ge("Git.tree.files")(function* (Ee) {
          return (yield* B("list_files", Ee.repository, ["diff", "--name-only", "-z", Ee.from, Ee.to])).text
            .split("\x00")
            .filter(Boolean)
            .map((Ve) => du.make(Ve));
        }),
        Ae = Ge("Git.tree.diff")(function* (Ee) {
          let Ve = Ee.paths ?? (yield* z(Ee));
          return yield* ja(Ve, (Fe) =>
            ft(function* () {
              let it = (yield* B("diff", Ee.repository, [
                  "diff",
                  "--name-status",
                  "--no-renames",
                  Ee.from,
                  Ee.to,
                  "--",
                  Fe,
                ])).text.trim(),
                At = it.startsWith("A") ? "added" : it.startsWith("D") ? "deleted" : "modified",
                et = (yield* B("diff", Ee.repository, [
                  "diff",
                  "--numstat",
                  "--no-renames",
                  Ee.from,
                  Ee.to,
                  "--",
                  Fe,
                ])).text.split("\t"),
                ut = et[0] === "-" || et[1] === "-",
                ht = ut
                  ? ""
                  : (yield* B("diff", Ee.repository, [
                      "diff",
                      `--unified=${Ee.context ?? 3}`,
                      "--no-renames",
                      Ee.from,
                      Ee.to,
                      "--",
                      Fe,
                    ])).text;
              return {
                path: Fe,
                status: At,
                additions: ut ? 0 : Number(et[0] ?? 0),
                deletions: ut ? 0 : Number(et[1] ?? 0),
                patch: ht,
              };
            }),
          );
        }),
        le = ni(function* (Ee, Ve, Fe) {
          let it = (yield* B("restore", Ee, ["ls-tree", "-z", Ve, "--", Fe])).text.replace(/\0$/, "");
          if (!it) return;
          let At = it.match(/^(\d+)\s+\w+\s+([0-9a-f]+)\t/);
          if (!At)
            return yield* new KU({
              operation: "restore",
              directory: Ee.worktree,
              message: `Invalid tree entry for ${Fe}`,
            });
          return { mode: At[1], object: At[2] };
        }),
        Be = Ge("Git.tree.preview")((Ee) =>
          s(
            Ee.repository,
            ft(function* () {
              let Ve = hw.join(Ee.repository.gitDirectory, `preview-${kQs()}.index`),
                Fe = { GIT_INDEX_FILE: Ve };
              return yield* ft(function* () {
                (yield* B("diff", Ee.repository, ["read-tree", Ee.current], { env: Fe }),
                  yield* ja(
                    Ee.files,
                    ([At, et]) =>
                      ft(function* () {
                        let ut = yield* le(Ee.repository, et, At);
                        if (!ut) {
                          yield* B("diff", Ee.repository, ["update-index", "--force-remove", "--", At], {
                            env: Fe,
                          });
                          return;
                        }
                        yield* B(
                          "diff",
                          Ee.repository,
                          ["update-index", "--add", "--cacheinfo", ut.mode, ut.object, At],
                          { env: Fe },
                        );
                      }),
                    { discard: !0 },
                  ));
                let it = KMe.make((yield* B("diff", Ee.repository, ["write-tree"], { env: Fe })).text.trim());
                return yield* Ae({
                  repository: Ee.repository,
                  from: Ee.current,
                  to: it,
                  context: Ee.context,
                  paths: Array.from(Ee.files.keys()),
                });
              }).pipe(up(e.remove(Ve).pipe($s(() => ti))));
            }),
          ),
        ),
        Te = Ge("Git.tree.restore")((Ee) =>
          s(
            Ee.repository,
            ja(
              Ee.files,
              ([Ve, Fe]) =>
                ft(function* () {
                  if (yield* le(Ee.repository, Fe, Ve)) {
                    yield* B("restore", Ee.repository, ["checkout", Fe, "--", Ve]);
                    return;
                  }
                  yield* e
                    .remove(hw.join(Ee.repository.worktree, Ve), { recursive: !0, force: !0 })
                    .pipe(
                      Zo(
                        (it) =>
                          new KU({
                            operation: "restore",
                            directory: Ee.repository.worktree,
                            message: `Failed to remove ${Ve}`,
                            cause: it,
                          }),
                      ),
                    );
                }),
              { discard: !0 },
            ),
          ),
        ),
        Lt = Ge("Git.tree.checkout")((Ee) =>
          s(
            Ee.repository,
            ft(function* () {
              (yield* B("restore", Ee.repository, ["read-tree", Ee.tree]),
                yield* B("restore", Ee.repository, ["checkout-index", "--all", "--force"]));
            }),
          ),
        ),
        Ht = Ge("Git.change.capture")(function* (Ee) {
          let Ve = hw.relative(Ee.repository.worktree, Ee.path).replaceAll("\\", "/") || ".",
            Fe = yield* Wde(
              Ee.repository.worktree,
              t,
            )(["diff", "--binary", "HEAD", "--", Ve]).pipe(
              Zo(
                (et) => new zU({ operation: "capture", directory: Ee.path, message: et.message, cause: et }),
              ),
            );
          if (Fe.exitCode !== 0)
            return yield* new zU({
              operation: "capture",
              directory: Ee.path,
              message: Fe.stderr.trim() || Fe.text.trim() || "Failed to capture tracked changes",
            });
          let it = yield* Wde(
            Ee.repository.worktree,
            t,
          )(["ls-files", "--others", "--exclude-standard", "-z", "--", Ve]).pipe(
            Zo((et) => new zU({ operation: "capture", directory: Ee.path, message: et.message, cause: et })),
          );
          if (it.exitCode !== 0)
            return yield* new zU({
              operation: "capture",
              directory: Ee.path,
              message: it.stderr.trim() || it.text.trim() || "Failed to list untracked changes",
            });
          let At = yield* ja(it.text.split("\x00").filter(Boolean), (et) =>
            Wde(
              Ee.repository.worktree,
              t,
            )(["diff", "--binary", "--no-index", "--", "/dev/null", et]).pipe(
              Zo(
                (ut) => new zU({ operation: "capture", directory: Ee.path, message: ut.message, cause: ut }),
              ),
              Hi((ut) =>
                ut.exitCode === 0 || ut.exitCode === 1
                  ? Jt(ut.text)
                  : bn(
                      new zU({
                        operation: "capture",
                        directory: Ee.path,
                        message:
                          ut.stderr.trim() || ut.text.trim() || `Failed to capture untracked change: ${et}`,
                      }),
                    ),
              ),
            ),
          );
          return WDn.make(
            [Fe.text, ...At].filter(Boolean).join(`
`),
          );
        }),
        Se = Ge("Git.change.apply")(function* (Ee) {
          let Ve = yield* t
            .run(
              Lh("git", ["apply", "-"], {
                cwd: Ee.path,
                extendEnv: !0,
                stdin: c2(new TextEncoder().encode(Ee.changes)),
              }),
            )
            .pipe(
              Zo((Fe) => new zU({ operation: "apply", directory: Ee.path, message: Fe.message, cause: Fe })),
            );
          if (Ve.exitCode === 0) return;
          return yield* new zU({
            operation: "apply",
            directory: Ee.path,
            message:
              Ve.stderr.toString("utf8").trim() ||
              Ve.stdout.toString("utf8").trim() ||
              "Failed to apply changes",
          });
        }),
        _e = Ge("Git.change.discard")(function* (Ee) {
          let Ve = hw.relative(Ee.repository.worktree, Ee.path).replaceAll("\\", "/") || ".",
            Fe = yield* Wde(
              Ee.repository.worktree,
              t,
            )(Ee.index === "reset" ? ["checkout", "HEAD", "--", Ve] : ["checkout", "--", Ve]).pipe(
              Zo((At) => new zU({ operation: "reset", directory: Ee.path, message: At.message, cause: At })),
            );
          if (Fe.exitCode !== 0)
            return yield* new zU({
              operation: "reset",
              directory: Ee.path,
              message: Fe.stderr.trim() || Fe.text.trim() || "Failed to restore tracked changes",
            });
          if (Ee.untracked === "preserve") return;
          let it = yield* Wde(
            Ee.repository.worktree,
            t,
          )(["clean", "-fd", "--", Ve]).pipe(
            Zo((At) => new zU({ operation: "reset", directory: Ee.path, message: At.message, cause: At })),
          );
          if (it.exitCode === 0) return;
          return yield* new zU({
            operation: "reset",
            directory: Ee.path,
            message: it.stderr.trim() || it.text.trim() || "Failed to clean untracked changes",
          });
        }),
        we = ni(function* (Ee, Ve, Fe, it, At = Ve.worktree) {
          let et = yield* t
            .run(Lh("git", Fe, { cwd: At, extendEnv: !0, stdin: "ignore" }))
            .pipe(Zo((ht) => new mWe({ operation: Ee, directory: it, message: ht.message, cause: ht })));
          if (et.exitCode === 0) return et.stdout.toString("utf8");
          let ut = et.stderr.toString("utf8").trim() || et.stdout.toString("utf8").trim() || "Git failed";
          return yield* new mWe({
            operation: Ee,
            directory: it,
            message: ut,
            forceRequired: Ee === "remove" && /contains modified or untracked files|is dirty/i.test(ut),
          });
        }),
        Pe = Ge("Git.worktree.create")(function* (Ee) {
          yield* we(
            "create",
            Ee.repository,
            ["worktree", "add", "--detach", Ee.directory, "HEAD"],
            Ee.directory,
          );
          let Ve = yield* a(Ee.directory);
          if (Ve) return Ve;
          return yield* new mWe({
            operation: "create",
            directory: Ee.directory,
            message: "Created worktree could not be opened",
          });
        }),
        ye = Ge("Git.worktree.remove")(function* (Ee) {
          yield* we(
            "remove",
            Ee.repository,
            ["worktree", "remove", ...(Ee.force ? ["--force"] : []), Ee.directory],
            Ee.directory,
            Ee.repository.commonDirectory,
          );
        }),
        ot = Ge("Git.worktree.list")(function* (Ee) {
          return (yield* we("list", Ee, ["worktree", "list", "--porcelain"]))
            .split(
              `
`,
            )
            .filter((Ve) => Ve.startsWith("worktree "))
            .map(
              (Ve, Fe) =>
                new VDn({
                  directory: bo.make(J_t(Ee.worktree, Ve.slice(9).trim())),
                  kind: Fe === 0 ? "main" : "linked",
                }),
            );
        });
      return qG.of({
        repo: { discover: a, clone: I, create: V },
        remote: { get: H },
        history: { head: f, branch: d, defaultRemoteBranch: _, rootCommits: u },
        sync: { fetchRemotes: D, fetchBranch: S, checkoutRemoteBranch: T, resetHard: C },
        change: { capture: Ht, apply: Se, discard: _e },
        worktree: { create: Pe, remove: ye, list: ot },
        index: { refresh: q, ignored: Z },
        tree: { capture: ae, write: se, files: z, diff: Ae, preview: Be, restore: Te, checkout: Lt },
      });
    }),
  )),
    (zMe = iA({ service: qG, layer: OQs, deps: [ui.node, IY] })));
});