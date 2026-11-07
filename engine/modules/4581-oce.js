
var oce = ne(async () => {
  au();
  Gt();
  Ef();
  Ef();
  Kj();
  zqe();
  await Jn([qL(), ZL(), oce()]);
  ((V3i = YLr), (IBa = QMt));
  MPe = class MPe extends _i()("@opencode/SessionTodo") {};
  ((DBa = Es(
    MPe,
    ft(function* () {
      let e = yield* B$,
        { db: t } = yield* Vd,
        r = Ge("Todo.update")(function* (a) {
          (yield* t
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
            yield* e.publish(IBa.Updated, a));
        }),
        s = Ge("Todo.get")(function* (a) {
          return (yield* t
            .select()
            .from(Q6)
            .where(Pi(Q6.session_id, a))
            .orderBy(Qm(Q6.position))
            .all()
            .pipe(on)).map((u) => ({ content: u.content, status: u.status, priority: u.priority }));
        });
      return MPe.of({ update: r, get: s });
    }),
  )),
    (xxr = Ll({ service: MPe, layer: DBa, deps: [q1, DD] })));
});