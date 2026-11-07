
var uXi = ne(async () => {
  Gt();
  HXi();
  await Jn([Vy(), oce()]);
  ((WXa = nt({ todos: J0(On(V3i)).annotate({ description: "The updated todo list" }) })),
    (AXi = t_(
      "todowrite",
      ft(function* () {
        let e = yield* MPe;
        return {
          description: cXi,
          parameters: WXa,
          execute: (t, r) =>
            ft(function* () {
              return (
                yield* r.ask({ permission: "todowrite", patterns: ["*"], always: ["*"], metadata: {} }),
                yield* e.update({ sessionID: r.sessionID, todos: t.todos }),
                {
                  title: `${t.todos.filter((s) => s.status !== "completed").length} todos`,
                  output: JSON.stringify(t.todos, null, 2),
                  metadata: { todos: t.todos },
                }
              );
            }),
        };
      }),
    )));
});