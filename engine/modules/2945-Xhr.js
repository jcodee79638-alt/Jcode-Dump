
var Xhr = ne(async () => {
  Gt();
  O0i();
  N0i();
  await Jn([Xhr(), e8(), qd()]);
  zAa = TD({
    id: "command",
    effect: Ge(function* (e) {
      let t = yield* bm;
      yield* e.command.transform((r) => {
        (r.update("init", (s) => {
          ((s.template = U0i.replace("${path}", t.project.directory)),
            (s.description = "guided AGENTS.md setup"));
        }),
          r.update("review", (s) => {
            ((s.template = F0i.replace("${path}", t.project.directory)),
              (s.description = "review changes [commit|branch|pr], defaults to uncommitted"),
              (s.subtask = !0));
          }));
      });
    }),
  });
});