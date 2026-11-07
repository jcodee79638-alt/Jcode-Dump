
var uis = ne(async () => {
  Gt();
  $H();
  await Jn([qd(), tM()]);
  Ais = Kd(rm, "server.location", (e) =>
    e.handle(
      "location.get",
      Ge(function* () {
        let t = yield* bm;
        return new ode({ directory: t.directory, workspaceID: t.workspaceID, project: t.project });
      }),
    ),
  );
});