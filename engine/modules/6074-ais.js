
var ais = ne(async () => {
  Gt();
  $H();
  Xy();
  await Jn([rbe(), tM(), ak()]);
  ois = Kd(rm, "server.question", (e) =>
    ft(function* () {
      let t = ni(function* (r, s, a) {
        let H = yield* Gae,
          u = (yield* H.list()).find((f) => f.id === s);
        if (!u || u.sessionID !== r) return yield* wwr(s);
        return yield* a(H);
      });
      return e
        .handle(
          "question.request.list",
          Ge(function* () {
            return yield* Rh((yield* Gae).list());
          }),
        )
        .handle(
          "session.question.list",
          Ge(function* (r) {
            return { data: (yield* (yield* Gae).list()).filter((a) => a.sessionID === r.params.sessionID) };
          }),
        )
        .handle(
          "session.question.reply",
          Ge(function* (r) {
            return (
              yield* t(r.params.sessionID, r.params.requestID, (s) =>
                s
                  .reply({ requestID: r.params.requestID, answers: r.payload.answers })
                  .pipe(EA("QuestionV2.NotFoundError", () => wwr(r.params.requestID))),
              ),
              lf.make()
            );
          }),
        )
        .handle(
          "session.question.reject",
          Ge(function* (r) {
            return (
              yield* t(r.params.sessionID, r.params.requestID, (s) =>
                s
                  .reject(r.params.requestID)
                  .pipe(EA("QuestionV2.NotFoundError", () => wwr(r.params.requestID))),
              ),
              lf.make()
            );
          }),
        );
    }),
  );
});