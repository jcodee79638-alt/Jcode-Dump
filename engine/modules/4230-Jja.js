
function Jja(e, t) {
  let r = e.filter((s) => s.description !== void 0);
  if (r.length === 0) return "No skills are currently available.";
  if (t.verbose)
    return [
      "<available_skills>",
      ...r
        .toSorted((s, a) => s.name.localeCompare(a.name))
        .flatMap((s) => [
          "  <skill>",
          `    <name>${s.name}</name>`,
          `    <description>${s.description}</description>`,
          `    <location>${X8i(s.location)}</location>`,
          "  </skill>",
        ]),
      "</available_skills>",
    ].join(`
`);
  return [
    "## Available Skills",
    ...r.toSorted((s, a) => s.name.localeCompare(a.name)).map((s) => `- **${s.name}**: ${s.description}`),
  ].join(`
`);
}