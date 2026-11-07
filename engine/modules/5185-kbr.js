
var kbr = ne(async () => {
  au();
  Gt();
  Ql();
  BA();
  await Jn([ET(), h7(), qd(), jZ(), PV(), xP(), kbr()]);
  Vze = class Vze extends _i()("@opencode/SystemPrompt") {};
  ((b7a = Es(
    Vze,
    ft(function* () {
      let e = yield* uee,
        t = yield* MP,
        r = yield* Xj;
      return Vze.of({
        environment: Ge("SystemPrompt.environment")(function* (s) {
          let a = yield* Jc,
            H = yield* ft(function* () {
              return (yield* (yield* jV).list()).filter((u) => u.description !== void 0);
            }).pipe(vj(r.get(Rv.make({ directory: bo.make(a.directory) }))));
          return [
            [
              `You are powered by the model named ${s.api.id}. The exact model ID is ${s.providerID}/${s.api.id}`,
              "Here is some useful information about the environment you are running in:",
              "<env>",
              `  Working directory: ${a.directory}`,
              `  Workspace root folder: ${a.worktree}`,
              `  Is directory a git repo: ${a.project.vcs === "git" ? "yes" : "no"}`,
              "  Platform: win32",
              `  Today's date: ${new Date().toDateString()}`,
              "</env>",
            ].join(`
`),
            H.length === 0
              ? void 0
              : [
                  "Project references provide additional directories that can be accessed when relevant.",
                  "<available_references>",
                  ...H.toSorted((u, f) => u.name.localeCompare(f.name)).flatMap((u) => [
                    "  <reference>",
                    `    <name>${u.name}</name>`,
                    `    <path>${u.path}</path>`,
                    ...(u.description === void 0 ? [] : [`    <description>${u.description}</description>`]),
                    "  </reference>",
                  ]),
                  "</available_references>",
                ].join(`
`),
          ].filter((u) => u !== void 0);
        }),
        skills: Ge("SystemPrompt.skills")(function* (s) {
          if (JTt(["skill"], s.permission).has("skill")) return;
          let a = yield* e.available(s);
          return [
            "Skills provide specialized instructions and workflows for specific tasks.",
            "Use the skill tool to load a skill when a task matches its description.",
            Jja(a, { verbose: !0 }),
          ].join(`
`);
        }),
        mcp: Ge("SystemPrompt.mcp")(function* (s, a) {
          let H = gT(s.permission, a ?? []),
            u = (yield* t.instructions()).filter(
              (f) => f.tools.length === 0 || JTt(f.tools, H).size < f.tools.length,
            );
          if (u.length === 0) return;
          return [
            "<mcp_instructions>",
            ...u.flatMap((f) => [
              `  <server name="${f.name}">`,
              ...f.instructions
                .split(
                  `
`,
                )
                .map((d) => `    ${d}`),
              "  </server>",
            ]),
            "</mcp_instructions>",
          ].join(`
`);
        }),
      });
    }),
  )),
    (j7a = Ll({ service: Xj, layer: bZ, deps: [] })),
    (P7a = Ll({ service: Vze, layer: b7a, deps: [yje, $Pe, j7a] })));
});
import XPt from "path";