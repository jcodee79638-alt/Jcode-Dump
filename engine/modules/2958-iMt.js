
var iMt = ne(async () => {
  Gt();
  BA();
  X0i();
  await Jn([iMt(), e8(), R2()]);
  ((K0i = J0i),
    (tua = TD({
      id: "skill",
      effect: Ge(function* (e) {
        yield* e.skill.transform((t) => {
          t.source(
            pfo.make({
              type: "embedded",
              skill: dfo.make({
                name: "customize-opencode",
                description:
                  "Use ONLY when the user is editing or creating opencode's own configuration: opencode.json, opencode.jsonc, files under .opencode/, or files under ~/.config/opencode/. Also use when creating or fixing opencode agents, subagents, commands, skills, plugins, MCP servers, or permission rules. Do not use for the user's own application code, or for any project that is not configuring opencode itself.",
                location: bo.make("/builtin/customize-opencode.md"),
                content: K0i,
              }),
            }),
          );
        });
      }),
    })));
});