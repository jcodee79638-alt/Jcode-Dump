
var I$r = ne(async () => {
  CE();
  Gt();
  OH();
  AP();
  ww();
  await Jn([I$r(), S1(), ZMt(), lP()]);
  ((M_a = nt({ todos: On(PDi).annotate({ description: "The updated todo list" }) })),
    (x_a = nt({ todos: On(PDi) })),
    (T_a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* Qqe,
          r = yield* Cy;
        yield* e
          .register({
            [_yi]: jB({
              description:
                "Create and maintain a structured task list for the current coding session. Use it to track progress during multi-step work and keep todo statuses current.",
              input: M_a,
              output: x_a,
              toModelOutput: ({ output: s }) => [{ type: "text", text: S_a(s) }],
              execute: (s, a) =>
                ft(function* () {
                  return (
                    yield* r.assert({
                      action: _yi,
                      resources: ["*"],
                      save: ["*"],
                      sessionID: a.sessionID,
                      agent: a.agent,
                      source: { type: "tool", messageID: a.assistantMessageID, callID: a.toolCallID },
                    }),
                    yield* t.update({ sessionID: a.sessionID, todos: s.todos }),
                    { todos: s.todos }
                  );
                }).pipe(Zo(() => new zp({ message: "Unable to update todos" }))),
            }),
          })
          .pipe(on);
      }),
    )),
    (v_a = Ua({ name: "tool/todowrite", layer: T_a, deps: [T8, aN, CDi] })));
});