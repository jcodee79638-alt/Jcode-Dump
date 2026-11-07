
var MXi = ne(async () => {
  Gt();
  EXi();
  await Jn([P2(), h7(), Vy()]);
  ((tJa = nt({ name: re.annotate({ description: "The name of the skill from available_skills" }) })),
    (yXi = t_(
      "skill",
      ft(function* () {
        let e = yield* uee,
          t = yield* SV;
        return {
          description: IXi,
          parameters: tJa,
          execute: (r, s) =>
            ft(function* () {
              let a = yield* e.require(r.name).pipe(EA("Skill.NotFoundError", (d) => No(Error(d.message))));
              yield* s.ask({ permission: "skill", patterns: [r.name], always: [r.name], metadata: {} });
              let H = DXi.dirname(a.location),
                u = H,
                f = yield* t.find({
                  cwd: H,
                  pattern: "!**/SKILL.md",
                  hidden: !0,
                  follow: !1,
                  signal: s.abort,
                  limit: 10,
                });
              return {
                title: `Loaded skill: ${a.name}`,
                output: [
                  `<skill_content name="${a.name}">`,
                  `# Skill: ${a.name}`,
                  "",
                  a.content.trim(),
                  "",
                  `Base directory for this skill: ${u}`,
                  "Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.",
                  "Note: file list is sampled.",
                  "",
                  "<skill_files>",
                  f.map((d) => `<file>${DXi.resolve(H, d.path)}</file>`).join(`
`),
                  "</skill_files>",
                  "</skill_content>",
                ].join(`
`),
                metadata: { name: a.name, dir: H },
              };
            }).pipe(on),
        };
      }),
    )));
});