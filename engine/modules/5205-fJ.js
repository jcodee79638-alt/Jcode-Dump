
var fJ = ne(async () => {
  au();
  Ef();
  yY();
  Kj();
  ILt();
  uw();
  pW();
  Ql();
  Gt();
  _w();
  jA();
  LV();
  Use();
  BA();
  YM();
  Ry();
  T2();
  await Jn([qL(), _We(), fxe(), $ee(), JS(), ZL(), fJ()]);
  ((CCe = GDn), (B7a = { Updated: XDn.Updated }));
  ((a$A = nt({ projectID: z_, name: be(re), icon: be(hir), commands: be(Lir) })),
    (H$A = nt({ name: be(re), icon: be(hir), commands: be(Lir) }).annotate({
      identifier: "ProjectUpdateInput",
    })));
  T4i = class T4i extends ki()("Project.NotFoundError", { projectID: z_ }) {};
  aR = class aR extends _i()("@opencode/Project") {};
  ((R7a = Es(
    aR,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* kS,
        r = yield* MY,
        s = yield* Vde,
        a = yield* B$,
        H = yield* NE,
        { db: u } = yield* Vd,
        f = ni(
          function* (le, Be) {
            let Te = yield* t.spawn(Lh("git", le, { cwd: Be?.cwd, extendEnv: !0, stdin: "ignore" })),
              [Lt, Ht] = yield* Km([cG(C6(Te.stdout)), cG(C6(Te.stderr))], { concurrency: 2 });
            return { code: yield* Te.exitCode, text: Lt, stderr: Ht };
          },
          FL,
          $s(() => Jt({ code: 1, text: "", stderr: "" })),
        ),
        d = (le) =>
          jn(() =>
            g$.emit("event", {
              directory: "global",
              project: le.id,
              payload: { type: B7a.Updated.type, properties: le },
            }),
          ),
        _ = E1(be(_ir))(Ad.OPENCODE_FAKE_VCS),
        L = yield* $f,
        I = Ge("Project.migrateProjectId")(function* (le, Be) {
          if (!le) return;
          if (le === z_.global) return;
          if (le === Be) return;
          yield* u
            .transaction(
              (Te) =>
                ft(function* () {
                  let Lt = yield* Te.select().from(If).where(Pi(If.id, le)).get(),
                    Ht = yield* Te.select().from(If).where(Pi(If.id, Be)).get();
                  if (Lt && !Ht)
                    yield* Te.insert(If)
                      .values({ ...Lt, id: Be, time_updated: Date.now() })
                      .run();
                  if (
                    (yield* Te.delete(uL).where(Pi(uL.project_id, le)).run(),
                    yield* Te.update(la)
                      .set({ project_id: Be, time_updated: Zt`${la.time_updated}` })
                      .where(Pi(la.project_id, le))
                      .run(),
                    yield* Te.update(x1).set({ project_id: Be }).where(Pi(x1.project_id, le)).run(),
                    Lt)
                  )
                    yield* Te.delete(If).where(Pi(If.id, le)).run();
                }),
              { behavior: "immediate" },
            )
            .pipe(on);
        }),
        D = Ge("Project.saveProjectDirectory")(function* (le) {
          if (le.projectID === z_.global) return;
          let Be = bo.make(ui.resolve(le.directory));
          yield* s
            .create({ directory: Be, projectID: le.projectID })
            .pipe(
              jf((Te) => lp("project directory persistence failed", { projectID: le.projectID, cause: Te })),
            );
        }),
        S = Ge("Project.fromDirectory")(function* (le) {
          yield* fH("fromDirectory", { directory: le });
          let Be = yield* r.resolve(bo.make(le)),
            Te = Be.id === z_.make("global") && !Be.vcs ? "/" : Be.directory,
            Lt = z_.make(Be.id);
          yield* I(Be.previous ? z_.make(Be.previous) : void 0, Lt);
          let Ht = yield* u.select().from(If).where(Pi(If.id, Lt)).get().pipe(on),
            Se = Ht
              ? kce(Ht)
              : {
                  id: Lt,
                  worktree: Te,
                  vcs: Be.vcs?.type ?? _,
                  sandboxes: [],
                  time: { created: Date.now(), updated: Date.now() },
                };
          if (H.experimentalIconDiscovery) yield* T(Se).pipe(FA, zm(L));
          let _e = {
            ...Se,
            worktree: Lt === z_.global ? Te : Se.worktree,
            vcs: Be.vcs?.type ?? _,
            time: { ...Se.time, updated: Date.now() },
          };
          if (Lt !== z_.global && Be.directory !== _e.worktree && !_e.sandboxes.includes(Be.directory))
            _e.sandboxes.push(Be.directory);
          if (
            ((_e.sandboxes = yield* ja(
              _e.sandboxes,
              (we) =>
                e.exists(we).pipe(
                  on,
                  Vn((Pe) => (Pe ? we : void 0)),
                ),
              { concurrency: "unbounded" },
            ).pipe(Vn((we) => we.filter((Pe) => Pe !== void 0)))),
            yield* u
              .insert(If)
              .values({
                id: _e.id,
                worktree: bo.make(_e.worktree),
                vcs: _e.vcs ?? null,
                name: _e.name,
                icon_url: _e.icon?.url,
                icon_url_override: _e.icon?.override,
                icon_color: _e.icon?.color,
                time_created: _e.time.created,
                time_updated: _e.time.updated,
                time_initialized: _e.time.initialized,
                sandboxes: _e.sandboxes.map((we) => bo.make(we)),
                commands: _e.commands,
              })
              .onConflictDoUpdate({
                target: If.id,
                set: {
                  worktree: bo.make(_e.worktree),
                  vcs: _e.vcs ?? null,
                  name: _e.name,
                  icon_url: _e.icon?.url,
                  icon_url_override: _e.icon?.override,
                  icon_color: _e.icon?.color,
                  time_updated: _e.time.updated,
                  time_initialized: _e.time.initialized,
                  sandboxes: _e.sandboxes.map((we) => bo.make(we)),
                  commands: _e.commands,
                },
              })
              .run()
              .pipe(on),
            Lt !== z_.global)
          )
            yield* u
              .update(la)
              .set({ project_id: Lt })
              .where(Gc(Pi(la.project_id, z_.global), Pi(la.directory, Be.directory)))
              .run()
              .pipe(on);
          if (
            (yield* D({ projectID: Lt, directory: Be.directory }),
            yield* d(_e),
            Lt !== z_.global && Be.vcs?.type === "git")
          )
            yield* r.commit({ store: Be.vcs.store, id: Be.id });
          return { project: _e, sandbox: Be.vcs ? Be.directory : Te };
        }),
        T = Ge("Project.discover")(function* (le) {
          if (le.vcs !== "git") return;
          if (le.icon?.override) return;
          if (le.icon?.url) return;
          let Te = (yield* e
            .glob("**/favicon.{ico,png,svg,jpg,jpeg,webp}", {
              cwd: le.worktree,
              absolute: !0,
              include: "file",
            })
            .pipe(on)).sort((we, Pe) => we.length - Pe.length)[0];
          if (!Te) return;
          let Lt = yield* e.readFile(Te).pipe(on),
            Ht = Buffer.from(Lt).toString("base64"),
            _e = `data:${ui.mimeType(Te)};base64,${Ht}`;
          yield* B({ projectID: le.id, icon: { url: _e } }).pipe(EA("Project.NotFoundError", () => ti));
        }),
        C = Ge("Project.list")(function* () {
          return (yield* u.select().from(If).all().pipe(on)).map(kce);
        }),
        O = Ge("Project.get")(function* (le) {
          let Be = yield* u.select().from(If).where(Pi(If.id, le)).get().pipe(on);
          return Be ? kce(Be) : void 0;
        }),
        B = Ge("Project.update")(function* (le) {
          let Be = yield* u
            .update(If)
            .set({
              name: le.name,
              icon_url: le.icon?.url,
              icon_url_override: le.icon?.override,
              icon_color: le.icon?.color,
              commands: le.commands,
              time_updated: Date.now(),
            })
            .where(Pi(If.id, le.projectID))
            .returning()
            .get()
            .pipe(on);
          if (!Be) return yield* new T4i({ projectID: le.projectID });
          let Te = kce(Be);
          return (yield* d(Te), Te);
        }),
        V = Ge("Project.initGit")(function* (le) {
          if (le.project.vcs === "git") return le.project;
          if (!(yield* jn(() => UH("git")))) throw Error("Git is not installed");
          let Be = yield* f(["init", "--quiet"], { cwd: le.directory });
          if (Be.code !== 0)
            throw Error(Be.stderr.trim() || Be.text.trim() || "Failed to initialize git repository");
          let { project: Te } = yield* S(le.directory);
          return Te;
        }),
        q = Ge("Project.setInitialized")(function* (le) {
          yield* u.update(If).set({ time_initialized: Date.now() }).where(Pi(If.id, le)).run().pipe(on);
        }),
        Z = yield* cx(
          Ge("Project.initState")(function* (le) {
            let Be = yield* a.listen((Te) => {
              if (Te.type !== y3i.Executed.type || Te.location?.directory !== le.directory) return ti;
              return Te.data.name === gPe.INIT ? q(le.project.id) : ti;
            });
            yield* sL(() => Be);
          }),
        ),
        se = Ge("Project.init")(function* () {
          yield* Eu(Z);
        }),
        ae = Ge("Project.sandboxes")(function* (le) {
          let Be = yield* u.select().from(If).where(Pi(If.id, le)).get().pipe(on);
          if (!Be) return [];
          let Te = kce(Be);
          return yield* ja(
            Te.sandboxes,
            (Lt) =>
              e.isDir(Lt).pipe(
                on,
                Vn((Ht) => (Ht ? Lt : void 0)),
              ),
            { concurrency: "unbounded" },
          ).pipe(Vn((Lt) => Lt.filter((Ht) => Ht !== void 0)));
        }),
        z = Ge("Project.addSandbox")(function* (le, Be) {
          let Te = yield* u.select().from(If).where(Pi(If.id, le)).get().pipe(on);
          if (!Te) throw Error(`Project not found: ${le}`);
          let Lt = bo.make(Be),
            Ht = [...Te.sandboxes];
          if (!Ht.includes(Lt)) Ht.push(Lt);
          let Se = yield* u
            .update(If)
            .set({ sandboxes: Ht, time_updated: Date.now() })
            .where(Pi(If.id, le))
            .returning()
            .get()
            .pipe(on);
          if (!Se) throw Error(`Project not found: ${le}`);
          yield* d(kce(Se));
        }),
        Ae = Ge("Project.removeSandbox")(function* (le, Be) {
          let Te = yield* u.select().from(If).where(Pi(If.id, le)).get().pipe(on);
          if (!Te) throw Error(`Project not found: ${le}`);
          let Lt = bo.make(Be),
            Ht = Te.sandboxes.filter((_e) => _e !== Lt),
            Se = yield* u
              .update(If)
              .set({ sandboxes: Ht, time_updated: Date.now() })
              .where(Pi(If.id, le))
              .returning()
              .get()
              .pipe(on);
          if (!Se) throw Error(`Project not found: ${le}`);
          yield* d(kce(Se));
        });
      return aR.of({
        init: se,
        fromDirectory: S,
        discover: T,
        list: C,
        get: O,
        update: B,
        initGit: V,
        setInitialized: q,
        sandboxes: ae,
        addSandbox: z,
        removeSandbox: Ae,
      });
    }),
  )),
    (c$A = vm(aR)),
    (GLe = Ll({ service: aR, layer: R7a, deps: [ui.node, IY, qMe, hWe, yir, q1, WN, DD] })));
});