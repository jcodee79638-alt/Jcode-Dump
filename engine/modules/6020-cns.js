
var cns = ne(async () => {
  Ql();
  Gt();
  $H();
  Sx();
  await Jn([fJ(), JS(), Jy(), Ywe()]);
  Hns = Kd(eh, "project", (e) =>
    ft(function* () {
      let t = yield* aR,
        r = yield* MY,
        s = Ge("ProjectHttpApi.list")(function* () {
          return yield* t.list();
        }),
        a = Ge("ProjectHttpApi.current")(function* () {
          return (yield* Jc).project;
        }),
        H = Ge("ProjectHttpApi.initGit")(function* () {
          let d = yield* Jc,
            _ = yield* t.initGit({ directory: d.directory, project: d.project });
          if (_.id === d.project.id && _.vcs === d.project.vcs && _.worktree === d.project.worktree) return _;
          return (yield* vrs(d, { directory: d.directory, worktree: d.directory, project: _ }), _);
        }),
        u = Ge("ProjectHttpApi.update")(function* (d) {
          return yield* t
            .update({ ...d.payload, projectID: d.params.projectID })
            .pipe(
              EA("Project.NotFoundError", (_) =>
                bn(new oYe({ projectID: _.projectID, message: `Project not found: ${_.projectID}` })),
              ),
            );
        }),
        f = Ge("ProjectHttpApi.directories")((d) => r.directories({ projectID: d.params.projectID }));
      return e
        .handle("list", s)
        .handle("current", a)
        .handle("initGit", H)
        .handle("update", u)
        .handle("directories", f);
    }),
  );
});