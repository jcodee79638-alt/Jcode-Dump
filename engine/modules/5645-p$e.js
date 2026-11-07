
var p$e = ne(async () => {
  au();
  vy();
  Ef();
  yY();
  mme();
  cee();
  pW();
  Nhe();
  Gt();
  _w();
  jA();
  LV();
  Ql();
  uwt();
  await Jn([um(), cR(), fJ(), qL(), p$e()]);
  ((lwt = ywe),
    (EQi = nt({ name: re, branch: be(re), directory: re }).annotate({ identifier: "Worktree" })),
    (IQi = nt({
      name: be(re),
      startCommand: be(
        re.annotate({ description: "Additional startup script to run after the project's start command" }),
      ),
    }).annotate({ identifier: "WorktreeCreateInput" })),
    (DQi = nt({ directory: re }).annotate({ identifier: "WorktreeRemoveInput" })),
    (yQi = nt({ directory: re }).annotate({ identifier: "WorktreeResetInput" })));
  bQe = class bQe extends ki()("WorktreeNotGitError", { message: re }) {};
  QPr = class QPr extends ki()("WorktreeNameGenerationFailedError", { message: re }) {};
  YPr = class YPr extends ki()("WorktreeCreateFailedError", { message: re }) {};
  MQi = class MQi extends ki()("WorktreeStartCommandFailedError", { message: re }) {};
  f$e = class f$e extends ki()("WorktreeRemoveFailedError", { message: re }) {};
  HO = class HO extends ki()("WorktreeResetFailedError", { message: re }) {};
  ZPr = class ZPr extends ki()("WorktreeListFailedError", { message: re }) {};
  Mwe = class Mwe extends _i()("@opencode/Worktree") {};
  ((qYa = Es(
    Mwe,
    ft(function* () {
      let e = yield* $f,
        t = yield* ui.Service,
        r = yield* rw,
        s = yield* x2,
        { db: a } = yield* Vd,
        H = yield* Uhe,
        u = yield* aR,
        f = yield* HR,
        d = ni(
          function* (Se, _e) {
            let we = yield* s.run(Lh("git", Se, { cwd: _e?.cwd, extendEnv: !0, stdin: "ignore" }));
            return {
              code: we.exitCode,
              text: we.stdout.toString("utf8"),
              stderr: we.stderr.toString("utf8"),
            };
          },
          $s((Se) => Jt({ code: 1, text: "", stderr: Se instanceof Error ? Se.message : String(Se) })),
        ),
        _ = 26,
        L = Ge("Worktree.candidate")(function* (Se) {
          let _e = yield* Jc;
          for (let we of Array.from({ length: 26 }, (Pe, ye) => ye)) {
            let Pe = Se.name ? (we === 0 ? Se.name : `${Se.name}-${Yv.create()}`) : Yv.create(),
              ye = Se.detached ? void 0 : `opencode/${Pe}`,
              ot = r.join(Se.root, Pe);
            if (yield* t.exists(ot).pipe(on)) continue;
            if (ye) {
              let Ee = `refs/heads/${ye}`;
              if ((yield* d(["show-ref", "--verify", "--quiet", Ee], { cwd: _e.worktree })).code === 0)
                continue;
            }
            return { name: Pe, directory: ot, ...(ye ? { branch: ye } : {}) };
          }
          return yield* new QPr({ message: "Failed to generate a unique worktree name" });
        }),
        I = Ge("Worktree.makeWorktreeInfo")(function* (Se) {
          let _e = yield* Jc;
          if (_e.project.vcs !== "git")
            return yield* new bQe({ message: "Worktrees are only supported for git projects" });
          let we = r.join(uH.data, "worktree", _e.project.id);
          return (
            yield* t.makeDirectory(we, { recursive: !0 }).pipe(on),
            yield* L({ root: we, name: Se?.name ? WYa(Se.name) : "", detached: Se?.detached })
          );
        }),
        D = ni(function* (Se) {
          let _e = yield* Jc,
            we = yield* d(
              Se.branch
                ? ["worktree", "add", "--no-checkout", "-b", Se.branch, Se.directory]
                : ["worktree", "add", "--no-checkout", "--detach", Se.directory, "HEAD"],
              { cwd: _e.worktree },
            );
          if (we.code !== 0)
            return yield* new YPr({ message: we.stderr || we.text || "Failed to create git worktree" });
          yield* u.addSandbox(_e.project.id, Se.directory).pipe($s(() => ti));
        }),
        S = ni(function* (Se, _e) {
          let we = yield* Jc,
            Pe = yield* lje,
            ye = we.project.id,
            ot = _e?.trim(),
            Ee = yield* d(["reset", "--hard"], { cwd: Se.directory });
          if (Ee.code !== 0) {
            let Fe = Ee.stderr || Ee.text || "Failed to populate worktree";
            (yield* cf("worktree checkout failed", { directory: Se.directory, message: Fe }),
              g$.emit("event", {
                directory: Se.directory,
                project: we.project.id,
                workspace: Pe,
                payload: { type: lwt.Failed.type, properties: { message: Fe } },
              }));
            return;
          }
          if (
            !(yield* f.load({ directory: Se.directory }).pipe(
              eu(!0),
              $s((Fe) =>
                ft(function* () {
                  let it = fx(Fe);
                  return (
                    yield* cf("worktree bootstrap failed", { directory: Se.directory, message: it }),
                    g$.emit("event", {
                      directory: Se.directory,
                      project: we.project.id,
                      workspace: Pe,
                      payload: { type: lwt.Failed.type, properties: { message: it } },
                    }),
                    !1
                  );
                }),
              ),
            ))
          )
            return;
          (g$.emit("event", {
            directory: Se.directory,
            project: we.project.id,
            workspace: Pe,
            payload: {
              type: lwt.Ready.type,
              properties: { name: Se.name, ...(Se.branch ? { branch: Se.branch } : {}) },
            },
          }),
            yield* Be(Se.directory, { projectID: ye, extra: ot }));
        }),
        T = Ge("Worktree.createFromInfo")(function* (Se, _e) {
          (yield* D(Se),
            yield* S(Se, _e).pipe(
              jf((we) => cf("worktree bootstrap failed", { cause: we })),
              zm(e),
            ));
        }),
        C = Ge("Worktree.create")(function* (Se) {
          let _e = yield* I({ name: Se?.name });
          return (yield* T(_e, Se?.startCommand), _e);
        }),
        O = ni(function* (Se) {
          let _e = r.resolve(Se),
            we = yield* t.realPath(_e).pipe($s(() => Jt(_e)));
          return r.normalize(we).toLowerCase();
        });
      function B(Se) {
        return Se.split(
          `
`,
        )
          .map((_e) => _e.trim())
          .reduce((_e, we) => {
            if (!we) return _e;
            if (we.startsWith("worktree ")) return (_e.push({ path: we.slice(9).trim() }), _e);
            let Pe = _e[_e.length - 1];
            if (!Pe) return _e;
            if (we.startsWith("branch ")) Pe.branch = we.slice(7).trim();
            return _e;
          }, []);
      }
      let V = ni(function* (Se, _e) {
          for (let we of Se) {
            if (!we.path) continue;
            if ((yield* O(we.path)) === _e) return we;
          }
          return;
        }),
        q = Ge("Worktree.list")(function* () {
          let Se = yield* Jc;
          if (Se.project.vcs !== "git") return [];
          let _e = yield* d(["worktree", "list", "--porcelain"], { cwd: Se.worktree });
          if (_e.code !== 0)
            return yield* new ZPr({ message: _e.stderr || _e.text || "Failed to read git worktrees" });
          let we = yield* O(Se.project.worktree),
            Pe = r.basename(we).toLowerCase();
          return yield* ja(B(_e.text), (ye) =>
            ft(function* () {
              if (!ye.path) return;
              let ot = yield* O(ye.path);
              if (ot === we) return;
              let Ee = r.basename(ot).toLowerCase();
              return {
                name: Ee === Pe ? r.basename(r.dirname(ot)) : Ee,
                directory: ot,
                ...(ye.branch ? { branch: ye.branch.replace(/^refs\/heads\//, "") } : {}),
              };
            }),
          ).pipe(Vn((ye) => ye.filter((ot) => ot !== void 0)));
        });
      function Z(Se) {
        return t.exists(Se).pipe(
          on,
          Hi((_e) => (_e ? d(["fsmonitor--daemon", "stop"], { cwd: Se }) : ti)),
        );
      }
      function se(Se) {
        return bl({
          try: async () => {
            let _e = await import("fs/promises"),
              we = 50;
            for (let Pe of Array.from({ length: 50 }, (ye, ot) => ot))
              try {
                await _e.rm(Se, { recursive: !0, force: !0 });
                return;
              } catch (ye) {
                if (Pe === 49) throw ye;
                await new Promise((ot) => setTimeout(ot, 100));
              }
          },
          catch: (_e) => new f$e({ message: fx(_e) || "Failed to remove git worktree directory" }),
        });
      }
      let ae = Ge("Worktree.remove")(function* (Se) {
          let _e = yield* Jc;
          if (_e.project.vcs !== "git")
            return yield* new bQe({ message: "Worktrees are only supported for git projects" });
          let we = yield* O(Se.directory);
          if (we !== (yield* O(_e.worktree))) yield* f.disposeDirectory(Se.directory);
          let Pe = yield* d(["worktree", "list", "--porcelain"], { cwd: _e.worktree });
          if (Pe.code !== 0)
            return yield* new f$e({ message: Pe.stderr || Pe.text || "Failed to read git worktrees" });
          let ye = B(Pe.text),
            ot = yield* V(ye, we);
          if (!ot?.path) {
            if (yield* t.exists(we).pipe(on)) (yield* Z(we), yield* se(we));
            return !0;
          }
          (yield* f.disposeDirectory(ot.path), yield* Z(ot.path));
          let Ee = yield* d(["worktree", "remove", "--force", ot.path], { cwd: _e.worktree });
          if (Ee.code !== 0) {
            let Fe = yield* d(["worktree", "list", "--porcelain"], { cwd: _e.worktree });
            if (Fe.code !== 0)
              return yield* new f$e({
                message: Ee.stderr || Ee.text || Fe.stderr || Fe.text || "Failed to remove git worktree",
              });
            if ((yield* V(B(Fe.text), we))?.path)
              return yield* new f$e({ message: Ee.stderr || Ee.text || "Failed to remove git worktree" });
          }
          yield* se(ot.path);
          let Ve = ot.branch?.replace(/^refs\/heads\//, "");
          if (Ve) {
            let Fe = yield* d(["branch", "-D", Ve], { cwd: _e.worktree });
            if (Fe.code !== 0)
              return yield* new f$e({ message: Fe.stderr || Fe.text || "Failed to delete worktree branch" });
          }
          return !0;
        }),
        z = ni(function* (Se, _e, we) {
          let Pe = yield* d(Se, _e);
          if (Pe.code !== 0) return yield* we(Pe);
          return Pe;
        }),
        Ae = ni(
          function* (Se, _e) {
            let [we, Pe] = ["cmd", ["/c", _e]],
              ye = yield* s.run(Lh(we, Pe, { cwd: Se, extendEnv: !0, stdin: "ignore" }));
            return { code: ye.exitCode, stderr: ye.stderr.toString("utf8") };
          },
          $s(() => Jt({ code: 1, stderr: "" })),
        ),
        le = ni(function* (Se, _e, we) {
          let Pe = _e.trim();
          if (!Pe) return !0;
          let ye = yield* Ae(Se, Pe);
          if (ye.code === 0) return !0;
          return (
            yield* cf("worktree start command failed", { kind: we, directory: Se, message: ye.stderr }),
            !1
          );
        }),
        Be = ni(function* (Se, _e) {
          let we = yield* a.select().from(If).where(Pi(If.id, _e.projectID)).get().pipe(on),
            ye = (we ? kce(we) : void 0)?.commands?.start?.trim() ?? "";
          if (!(yield* le(Se, ye, "project"))) return !1;
          return (yield* le(Se, _e.extra ?? "", "worktree"), !0);
        }),
        Te = ni(function* (Se, _e) {
          let we = yield* O(Se);
          yield* ja(
            _e,
            (Pe) =>
              ft(function* () {
                let ye = yield* O(r.resolve(Se, Pe));
                if (ye === we) return;
                if (!ye.startsWith(`${we}${r.sep}`)) return;
                yield* t.remove(ye, { recursive: !0 }).pipe(FA);
              }),
            { concurrency: "unbounded" },
          );
        }),
        Lt = ni(function* (Se) {
          let _e = yield* d(["clean", "-ffdx"], { cwd: Se });
          if (_e.code === 0) return _e;
          let we = VYa(_e.stderr, _e.text);
          if (!we.length) return _e;
          return (yield* Te(Se, we), yield* d(["clean", "-ffdx"], { cwd: Se }));
        }),
        Ht = Ge("Worktree.reset")(function* (Se) {
          let _e = yield* Jc;
          if (_e.project.vcs !== "git")
            return yield* new bQe({ message: "Worktrees are only supported for git projects" });
          let we = yield* O(Se.directory),
            Pe = yield* O(_e.worktree);
          if (we === Pe) return yield* new HO({ message: "Cannot reset the primary workspace" });
          let ye = yield* d(["worktree", "list", "--porcelain"], { cwd: _e.worktree });
          if (ye.code !== 0)
            return yield* new HO({ message: ye.stderr || ye.text || "Failed to read git worktrees" });
          let ot = yield* V(B(ye.text), we);
          if (!ot?.path) return yield* new HO({ message: "Worktree not found" });
          let Ee = ot.path,
            Ve = yield* H.defaultBranch(_e.worktree);
          if (!Ve) return yield* new HO({ message: "Default branch not found" });
          let Fe = Ve.ref.indexOf("/");
          if (Ve.ref !== Ve.name && Fe > 0) {
            let et = Ve.ref.slice(0, Fe),
              ut = Ve.ref.slice(Fe + 1);
            yield* z(
              ["fetch", et, ut],
              { cwd: _e.worktree },
              (ht) => new HO({ message: ht.stderr || ht.text || `Failed to fetch ${Ve.ref}` }),
            );
          }
          yield* z(
            ["reset", "--hard", Ve.ref],
            { cwd: Ee },
            (et) => new HO({ message: et.stderr || et.text || "Failed to reset worktree to target" }),
          );
          let it = yield* Lt(Ee);
          if (it.code !== 0)
            return yield* new HO({ message: it.stderr || it.text || "Failed to clean worktree" });
          (yield* z(
            ["submodule", "update", "--init", "--recursive", "--force"],
            { cwd: Ee },
            (et) => new HO({ message: et.stderr || et.text || "Failed to update submodules" }),
          ),
            yield* z(
              ["submodule", "foreach", "--recursive", "git", "reset", "--hard"],
              { cwd: Ee },
              (et) => new HO({ message: et.stderr || et.text || "Failed to reset submodules" }),
            ),
            yield* z(
              ["submodule", "foreach", "--recursive", "git", "clean", "-fdx"],
              { cwd: Ee },
              (et) => new HO({ message: et.stderr || et.text || "Failed to clean submodules" }),
            ));
          let At = yield* d(["-c", "core.fsmonitor=false", "status", "--porcelain=v1"], { cwd: Ee });
          if (At.code !== 0)
            return yield* new HO({ message: At.stderr || At.text || "Failed to read git status" });
          if (At.text.trim())
            return yield* new HO({
              message: `Worktree reset left local changes:
${At.text.trim()}`,
            });
          return (
            yield* Be(Ee, { projectID: _e.project.id }).pipe(
              jf((et) => cf("worktree start task failed", { cause: et })),
              zm(e),
            ),
            !0
          );
        });
      return Mwe.of({ makeWorktreeInfo: I, createFromInfo: T, create: C, list: q, remove: ae, reset: Ht });
    }),
  )),
    (eCr = Ll({ service: Mwe, layer: qYa, deps: [ui.node, RMe, IY, HXe, GLe, Gze, DD] })));
});