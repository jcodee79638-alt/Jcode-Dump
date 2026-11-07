
var XN = ne(async () => {
  au();
  Gt();
  Ql();
  Ixr();
  mjt();
  await Jn([ZL(), XN()]);
  ((ctA = k3i),
    (AtA = U3i),
    (_Ba = dBa),
    (utA = N3i),
    (hBa = F3i),
    (LBa = gxr),
    (ltA = mBa),
    ($Ba = B3i),
    (gBa = R3i),
    (Dxr = W3i));
  eJe = class eJe extends ki()("QuestionRejectedError", {}) {
    get message() {
      return "The user dismissed this question";
    }
  };
  yxr = class yxr extends ki()("Question.NotFoundError", { requestID: yPe }) {};
  gee = class gee extends _i()("@opencode/Question") {};
  ((EBa = Es(
    gee,
    ft(function* () {
      let e = yield* B$,
        t = yield* cx(
          Ge("Question.state")(function* () {
            let u = { pending: new Map() };
            return (
              yield* sL(() =>
                ft(function* () {
                  for (let f of u.pending.values()) yield* I6(f.deferred, new eJe());
                  u.pending.clear();
                }),
              ),
              u
            );
          }),
        ),
        r = Ge("Question.ask")(function* (u) {
          let f = (yield* Eu(t)).pending,
            d = yPe.ascending();
          yield* fH("asking", { id: d, questions: u.questions.length });
          let _ = yield* bU(),
            L = { id: d, sessionID: u.sessionID, questions: u.questions, tool: u.tool };
          return (
            f.set(d, { info: L, deferred: _ }),
            yield* e.publish(Dxr.Asked, L),
            yield* up(
              Fl(_),
              jn(() => {
                f.delete(d);
              }),
            )
          );
        }),
        s = Ge("Question.reply")(function* (u) {
          let f = (yield* Eu(t)).pending,
            d = f.get(u.requestID);
          if (!d)
            return (
              yield* lp("reply for unknown request", { requestID: u.requestID }),
              yield* new yxr({ requestID: u.requestID })
            );
          (f.delete(u.requestID),
            yield* fH("replied", { requestID: u.requestID, answers: u.answers }),
            yield* e.publish(Dxr.Replied, {
              sessionID: d.info.sessionID,
              requestID: d.info.id,
              answers: u.answers.map((_) => [..._]),
            }),
            yield* D6(d.deferred, u.answers));
        }),
        a = Ge("Question.reject")(function* (u) {
          let f = (yield* Eu(t)).pending,
            d = f.get(u);
          if (!d)
            return (
              yield* lp("reject for unknown request", { requestID: u }),
              yield* new yxr({ requestID: u })
            );
          (f.delete(u),
            yield* fH("rejected", { requestID: u }),
            yield* e.publish(Dxr.Rejected, { sessionID: d.info.sessionID, requestID: d.info.id }),
            yield* I6(d.deferred, new eJe()));
        }),
        H = Ge("Question.list")(function* () {
          let u = (yield* Eu(t)).pending;
          return Array.from(u.values(), (f) => f.info);
        });
      return gee.of({ ask: r, reply: s, reject: a, list: H });
    }),
  )),
    (Mxr = Ll({ service: gee, layer: EBa, deps: [q1] })));
});