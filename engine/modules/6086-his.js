
var his = ne(async () => {
  DY();
  Gt();
  $H();
  uwr();
  await Jn([qd(), Qve(), tM()]);
  _is = Kd(rm, "server.projectCopy", (e) =>
    Jt(
      e
        .handle("projectCopy.create", (t) =>
          ft(function* () {
            let r = yield* qae,
              s = yield* bm;
            return yield* kwr(
              r.create({ ...t.payload, projectID: t.params.projectID, sourceDirectory: s.project.directory }),
            );
          }),
        )
        .handle("projectCopy.remove", (t) =>
          qae.use((r) => kwr(r.remove({ ...t.payload, projectID: t.params.projectID })).pipe(eu(lf.make()))),
        )
        .handle("projectCopy.refresh", (t) =>
          qae.use((r) => kwr(r.refresh({ projectID: t.params.projectID })).pipe(eu(lf.make()))),
        ),
    ),
  );
});