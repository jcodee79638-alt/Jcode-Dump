
var E$r = ne(async () => {
  CE();
  Gt();
  OH();
  jA();
  AP();
  ww();
  await Jn([E$r(), R2(), S1(), lP()]);
  (($_a = nt({ name: re.annotate({ description: "The name of the skill from the available skills list" }) })),
    (g_a = nt({ name: re, directory: re, output: re })),
    (E_a = [
      "Load a specialized skill when the task at hand matches one of the available skills in the system context.",
      "",
      "Use this tool to inject the skill's instructions and resources into the current conversation. The output may contain detailed workflow guidance as well as references to scripts, files, etc. in the same directory as the skill.",
      "",
      "The skill name must match one of the available skills in the system context.",
    ].join(`
`)),
    (D_a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* ui.Service,
          r = yield* o5,
          s = yield* Cy;
        yield* e
          .register({
            [pyi]: jB({
              description: E_a,
              input: $_a,
              output: g_a,
              toModelOutput: ({ output: a }) => [{ type: "text", text: a.output }],
              execute: (a, H) =>
                ft(function* () {
                  let f = (yield* r.list()).find((d) => d.name === a.name);
                  if (!f) return yield* dyi(a.name);
                  return yield* ft(function* () {
                    yield* s.assert({
                      action: pyi,
                      resources: [f.name],
                      save: [f.name],
                      sessionID: H.sessionID,
                      agent: H.agent,
                      source: { type: "tool", messageID: H.assistantMessageID, callID: H.toolCallID },
                    });
                    let d = sxt.dirname(f.location),
                      _ =
                        sxt.basename(f.location) === "SKILL.md"
                          ? (yield* t.glob("**/*", { cwd: d, absolute: !0, include: "file", dot: !0 }))
                              .filter((L) => sxt.basename(L) !== "SKILL.md")
                              .toSorted()
                              .slice(0, L_a)
                          : [];
                    return { name: f.name, directory: d, output: I_a(f, _) };
                  }).pipe(Zo((d) => dyi(a.name, d)));
                }),
            }),
          })
          .pipe(on);
      }),
    )),
    (y_a = Ua({ name: "tool/skill", layer: D_a, deps: [T8, ui.node, vVe, aN] })));
});