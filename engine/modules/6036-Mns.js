
var Mns = ne(async () => {
  Gt();
  $H();
  Sx();
  await Jn([XN(), Jy()]);
  yns = Kd(eh, "question", (e) =>
    ft(function* () {
      let t = yield* gee,
        r = Ge("QuestionHttpApi.list")(function* () {
          return yield* t.list();
        }),
        s = Ge("QuestionHttpApi.reply")(function* (H) {
          return (
            yield* t
              .reply({ requestID: H.params.requestID, answers: H.payload.answers })
              .pipe(
                EA("Question.NotFoundError", (u) =>
                  bn(
                    new g$e({
                      requestID: String(u.requestID),
                      message: `Question request not found: ${u.requestID}`,
                    }),
                  ),
                ),
              ),
            !0
          );
        }),
        a = Ge("QuestionHttpApi.reject")(function* (H) {
          return (
            yield* t
              .reject(H.params.requestID)
              .pipe(
                EA("Question.NotFoundError", (u) =>
                  bn(
                    new g$e({
                      requestID: String(u.requestID),
                      message: `Question request not found: ${u.requestID}`,
                    }),
                  ),
                ),
              ),
            !0
          );
        });
      return e.handle("list", r).handle("reply", s).handle("reject", a);
    }),
  );
});