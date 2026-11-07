
var Bua,
  ZEi = (e) =>
    [
      "Project references provide additional directories that can be accessed when relevant.",
      "<available_references>",
      ...e.flatMap((t) => [
        "  <reference>",
        `    <name>${t.name}</name>`,
        `    <path>${t.path}</path>`,
        ...(t.description === void 0 ? [] : [`    <description>${t.description}</description>`]),
        "  </reference>",
      ]),
      "</available_references>",
    ].join(`
`),
  Bqe,
  Rua,
  eIi;