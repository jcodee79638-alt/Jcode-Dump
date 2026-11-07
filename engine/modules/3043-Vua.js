
var Vua,
  oIi = (e) =>
    [
      "Skills provide specialized instructions and workflows for specific tasks.",
      "Use the skill tool to load a skill when a task matches its description.",
      ...(e.length === 0
        ? ["No skills are currently available."]
        : [
            "<available_skills>",
            ...e.flatMap((t) => [
              "  <skill>",
              `    <name>${t.name}</name>`,
              `    <description>${t.description}</description>`,
              "  </skill>",
            ]),
            "</available_skills>",
          ]),
    ].join(`
`),
  Wqe,
  qua,
  aIi;