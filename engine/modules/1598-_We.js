
var _We = ne(async () => {
  Ef();
  Gt();
  OH();
  BA();
  Q_t();
  yY();
  await Jn([_We(), qL()]);
  ((zWH = nt({
    projectID: z_t,
    directory: bo,
    strategy: be(re),
    behavior: Jo(["ignore", "replace"]).pipe(be),
  })),
    (QWH = nt({ projectID: z_t, directory: bo })),
    (BQs = nt({ projectID: z_t }).annotate({ identifier: "Project.DirectoriesInput" })),
    (RQs = On(nt({ directory: bo, strategy: Gn(re) })).annotate({ identifier: "Project.Directories" })));
  Vde = class Vde extends _i()("@opencode/ProjectDirectories") {};
  ((WQs = Es(
    Vde,
    ft(function* () {
      let e = (yield* Vd).db,
        t = Ge("ProjectDirectories.create")(function* (u, f) {
          let d = (f ?? e)
            .insert(uL)
            .values({ project_id: u.projectID, directory: u.directory, strategy: u.strategy });
          return (
            (yield* (
              u.behavior === "replace"
                ? d.onConflictDoUpdate({
                    target: [uL.project_id, uL.directory],
                    set: { strategy: u.strategy ?? null },
                    setWhere: u.strategy
                      ? K0(FS(uL.strategy), xG(uL.strategy, u.strategy))
                      : fse(uL.strategy),
                  })
                : d.onConflictDoNothing()
            )
              .returning({ directory: uL.directory })
              .get()
              .pipe(on)) !== void 0
          );
        }),
        r = Ge("ProjectDirectories.remove")(function* (u, f) {
          return (
            (yield* (f ?? e)
              .delete(uL)
              .where(Gc(Pi(uL.project_id, u.projectID), Pi(uL.directory, u.directory)))
              .returning({ directory: uL.directory })
              .get()
              .pipe(on)) !== void 0
          );
        }),
        s = Ge("ProjectDirectories.list")(function* (u) {
          return (yield* e
            .select({ directory: uL.directory, strategy: uL.strategy })
            .from(uL)
            .where(Pi(uL.project_id, u))
            .orderBy(TE(uL.time_created), Qm(uL.directory))
            .all()
            .pipe(on)).map((d) => ({ directory: d.directory, strategy: d.strategy ?? void 0 }));
        }),
        a = Ge("ProjectDirectories.contains")(function* (u) {
          return (
            (yield* e
              .select({ directory: uL.directory })
              .from(uL)
              .where(Gc(Pi(uL.project_id, u.projectID), Pi(uL.directory, u.directory)))
              .get()
              .pipe(on)) !== void 0
          );
        }),
        H = Ge("ProjectDirectories.get")(function* (u) {
          let f = yield* e
            .select({ directory: uL.directory, strategy: uL.strategy })
            .from(uL)
            .where(Gc(Pi(uL.project_id, u.projectID), Pi(uL.directory, u.directory)))
            .get()
            .pipe(on);
          return f ? { directory: f.directory, strategy: f.strategy ?? void 0 } : void 0;
        });
      return Vde.of({ list: s, get: H, contains: a, create: t, remove: r });
    }),
  )),
    (yir = iA({ service: Vde, layer: WQs, deps: [DD] })));
});
import Mir from "path";