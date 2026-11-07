
var ZMt = ne(async () => {
  Ef();
  Gt();
  zqe();
  OH();
  Kj();
  await Jn([ZMt(), qL(), fL()]);
  ((PDi = YLr), (Vda = QMt));
  Qqe = class Qqe extends _i()("@opencode/v2/SessionTodo") {};
  ((qda = Es(
    Qqe,
    ft(function* () {
      let { db: e } = yield* Vd,
        t = yield* lL,
        r = Ge("SessionTodo.update")(function* (a) {
          (yield* e
            .transaction((H) =>
              ft(function* () {
                if ((yield* H.delete(Q6).where(Pi(Q6.session_id, a.sessionID)).run(), a.todos.length === 0))
                  return;
                yield* H.insert(Q6)
                  .values(
                    a.todos.map((u, f) => ({
                      session_id: a.sessionID,
                      content: u.content,
                      status: u.status,
                      priority: u.priority,
                      position: f,
                    })),
                  )
                  .run();
              }),
            )
            .pipe(on),
            yield* t.publish(Vda.Updated, a));
        }),
        s = Ge("SessionTodo.get")(function* (a) {
          return (yield* e
            .select()
            .from(Q6)
            .where(Pi(Q6.session_id, a))
            .orderBy(Qm(Q6.position))
            .all()
            .pipe(on)).map((u) => ({ content: u.content, status: u.status, priority: u.priority }));
        });
      return Qqe.of({ update: r, get: s });
    }),
  )),
    (CDi = Ua({ service: Qqe, layer: qda, deps: [zS, DD] })));
});
import { isAbsolute as Gda, join as Xda, relative as Jda, sep as Kda } from "path";