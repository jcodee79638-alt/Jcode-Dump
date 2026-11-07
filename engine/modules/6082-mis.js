
var mis = ne(async () => {
  Gt();
  $H();
  await Jn([yV(), tM()]);
  dis = Kd(rm, "server.credential", (e) =>
    e
      .handle(
        "credential.update",
        Ge(function* (t) {
          return (
            yield* (yield* QS).connection.update(t.params.credentialID, { label: t.payload.label }),
            lf.make()
          );
        }),
      )
      .handle(
        "credential.remove",
        Ge(function* (t) {
          return (yield* (yield* QS).connection.remove(t.params.credentialID), lf.make());
        }),
      ),
  );
});