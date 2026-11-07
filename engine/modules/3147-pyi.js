
var pyi = "skill",
  L_a = 10,
  $_a,
  g_a,
  E_a,
  I_a = (e, t) => {
    let r = sxt.dirname(e.location);
    return [
      `<skill_content name="${e.name}">`,
      `# Skill: ${e.name}`,
      "",
      e.content.trim(),
      "",
      `Base directory for this skill: ${r}`,
      "Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.",
      "Note: file list is sampled.",
      "",
      "<skill_files>",
      ...t.map((s) => `<file>${s}</file>`),
      "</skill_files>",
      "</skill_content>",
    ].join(`
`);
  },
  dyi = (e, t) => new zp({ message: `Unable to load skill ${e}`, error: t }),
  D_a,
  y_a;