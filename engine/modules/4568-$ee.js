
var $ee = ne(async () => {
  au();
  Ql();
  Gt();
  o0();
  E3i();
  I3i();
  pxr();
  await Jn([L7(), xP(), h7(), $ee()]);
  ((y3i = { Executed: D3i }),
    (aBa = nt({
      name: re,
      description: be(re),
      agent: be(re),
      model: be(re),
      source: be(Jo(["command", "mcp", "skill"])),
      template: PH,
      subtask: be(Vi),
      hints: On(re),
    }).annotate({ identifier: "Command" })));
  gPe = { INIT: "init", REVIEW: "review" };
  EPe = class EPe extends _i()("@opencode/Command") {};
  ((HBa = Es(
    EPe,
    ft(function* () {
      let e = yield* Eg,
        t = yield* MP,
        r = yield* uee,
        s = Ge("Command.state")(function* (f) {
          let d = yield* e.get(),
            _ = yield* lee(),
            L = {};
          ((L[gPe.INIT] = {
            name: gPe.INIT,
            description: "guided AGENTS.md setup",
            source: "command",
            get template() {
              return Axr.replace("${path}", f.worktree);
            },
            hints: dxr(Axr),
          }),
            (L[gPe.REVIEW] = {
              name: gPe.REVIEW,
              description: "review changes [commit|branch|pr], defaults to uncommitted",
              source: "command",
              get template() {
                return uxr.replace("${path}", f.worktree);
              },
              subtask: !0,
              hints: dxr(uxr),
            }));
          for (let [I, D] of Object.entries(d.command ?? {}))
            L[I] = {
              name: I,
              agent: D.agent,
              model: D.model,
              description: D.description,
              source: "command",
              get template() {
                return D.template;
              },
              subtask: D.subtask,
              hints: dxr(D.template),
            };
          for (let [I, D] of Object.entries(yield* t.prompts()))
            L[I] = {
              name: I,
              source: "mcp",
              description: D.description,
              get template() {
                return _.promise(
                  t
                    .getPrompt(
                      D.client,
                      D.name,
                      D.arguments ? Object.fromEntries(D.arguments.map((S, T) => [S.name, `$${T + 1}`])) : {},
                    )
                    .pipe(
                      Vn(
                        (S) =>
                          S?.messages.map((T) => (T.content.type === "text" ? T.content.text : "")).join(`
`) || "",
                      ),
                    ),
                );
              },
              hints: D.arguments?.map((S, T) => `$${T + 1}`) ?? [],
            };
          for (let I of yield* r.all()) {
            if (L[I.name]) continue;
            let D = I.location === "<built-in>" ? void 0 : oBa.dirname(I.location);
            L[I.name] = {
              name: I.name,
              description: I.description,
              source: "skill",
              get template() {
                if (!D) return I.content;
                return [
                  I.content,
                  "",
                  `Base directory for this skill: ${D}`,
                  "Relative paths in this skill (e.g., scripts/, references/) are relative to this base directory.",
                ].join(`
`);
              },
              hints: [],
            };
          }
          return { commands: L };
        }),
        a = yield* cx((f) => s(f)),
        H = Ge("Command.get")(function* (f) {
          return (yield* Eu(a)).commands[f];
        }),
        u = Ge("Command.list")(function* () {
          let f = yield* Eu(a);
          return Object.values(f.commands);
        });
      return EPe.of({ get: H, list: u });
    }),
  )),
    (mxr = Ll({ service: EPe, layer: HBa, deps: [Ab, $Pe, yje] })));
});