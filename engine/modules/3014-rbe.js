
var rbe = ne(async () => {
  OH();
  Gt();
  Uqe();
  await Jn([rbe(), fL()]);
  ((qEi = tbe),
    (wIc = NEi),
    (kIc = BEi),
    (bua = vua),
    (OIc = REi),
    (UIc = _Mt),
    (jua = lLr),
    (NIc = WEi),
    (fLr = VEi));
  LMt = class LMt extends ki()("QuestionV2.RejectedError", {}) {
    get message() {
      return "The user dismissed this question";
    }
  };
  pLr = class pLr extends ki()("QuestionV2.NotFoundError", { requestID: qEi }) {};
  Gae = class Gae extends _i()("@opencode/v2/Question") {};
  ((Pua = Es(
    Gae,
    ft(function* () {
      let e = yield* lL,
        t = new Map();
      yield* sL(() =>
        ja(t.values(), (u) => I6(u.deferred, new LMt()), { discard: !0 }).pipe(
          up(
            jn(() => {
              t.clear();
            }),
          ),
        ),
      );
      let r = Ge("QuestionV2.ask")((u) =>
          q0((f) =>
            ft(function* () {
              let d = qEi.ascending(),
                _ = yield* bU(),
                L = { id: d, ...u };
              return (
                t.set(d, { request: L, deferred: _ }),
                yield* e.publish(fLr.Asked, L).pipe(
                  Zu(f(Fl(_))),
                  up(
                    jn(() => {
                      t.delete(d);
                    }),
                  ),
                )
              );
            }),
          ),
        ),
        s = Ge("QuestionV2.reply")((u) =>
          BL(
            ft(function* () {
              let f = t.get(u.requestID);
              if (!f) return yield* new pLr({ requestID: u.requestID });
              (yield* e.publish(fLr.Replied, {
                sessionID: f.request.sessionID,
                requestID: f.request.id,
                answers: u.answers.map((d) => [...d]),
              }),
                yield* D6(f.deferred, u.answers),
                t.delete(u.requestID));
            }),
          ),
        ),
        a = Ge("QuestionV2.reject")((u) =>
          BL(
            ft(function* () {
              let f = t.get(u);
              if (!f) return yield* new pLr({ requestID: u });
              (yield* e.publish(fLr.Rejected, { sessionID: f.request.sessionID, requestID: f.request.id }),
                yield* I6(f.deferred, new LMt()),
                t.delete(u));
            }),
          ),
        ),
        H = Ge("QuestionV2.list")(function* () {
          return Array.from(t.values(), (u) => u.request);
        });
      return Gae.of({ ask: r, reply: s, reject: a, list: H });
    }),
  )),
    (GEi = Ua({ service: Gae, layer: Pua, deps: [zS] })));
});