
var pis = ne(async () => {
  Gt();
  $H();
  Xy();
  await Jn([yV(), tM(), ak()]);
  fis = Kd(rm, "server.integration", (e) =>
    ft(function* () {
      return e
        .handle(
          "integration.list",
          Ge(function* () {
            let t = yield* QS;
            return yield* Rh(t.list());
          }),
        )
        .handle(
          "integration.get",
          Ge(function* (t) {
            let r = yield* QS;
            return yield* Rh(r.get(t.params.integrationID));
          }),
        )
        .handle(
          "integration.connect.key",
          Ge(function* (t) {
            let r = yield* QS;
            return (
              yield* lis(
                r.connection.key({
                  integrationID: t.params.integrationID,
                  key: t.payload.key,
                  label: t.payload.label,
                }),
              ),
              lf.make()
            );
          }),
        )
        .handle(
          "integration.connect.oauth",
          Ge(function* (t) {
            let r = yield* QS;
            return yield* Rh(
              lis(
                r.connection.oauth({
                  integrationID: t.params.integrationID,
                  methodID: t.payload.methodID,
                  inputs: t.payload.inputs,
                  label: t.payload.label,
                }),
              ),
            );
          }),
        )
        .handle(
          "integration.attempt.status",
          Ge(function* (t) {
            let r = yield* QS;
            return yield* Rh(r.attempt.status(t.params.attemptID));
          }),
        )
        .handle(
          "integration.attempt.complete",
          Ge(function* (t) {
            return (
              yield* (yield* QS).attempt
                .complete({ attemptID: t.params.attemptID, code: t.payload.code })
                .pipe(
                  Zo(
                    (s) =>
                      new Sb({
                        message:
                          s._tag === "Integration.CodeRequired"
                            ? "Authorization code is required"
                            : "Authentication failed",
                        kind:
                          s._tag === "Integration.CodeRequired"
                            ? "integration_code_required"
                            : "integration_authorization",
                      }),
                  ),
                ),
              lf.make()
            );
          }),
        )
        .handle(
          "integration.attempt.cancel",
          Ge(function* (t) {
            return (yield* (yield* QS).attempt.cancel(t.params.attemptID), lf.make());
          }),
        );
    }),
  );
});