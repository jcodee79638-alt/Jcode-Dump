
var Ghr = ne(async () => {
  Gt();
  h2();
  await Jn([Ghr(), e8(), um(), qd(), S1()]);
  ((BAa = zve.join(uH.data, "tool-output", "*")),
    (XAa = TD({
      id: "agent",
      effect: Ge(function* (e) {
        let r = (yield* bm).directory,
          s = [BAa, zve.join(uH.tmp, "*")],
          a = [
            { action: "external_directory", resource: "*", effect: "ask" },
            ...s.map((u) => ({ action: "external_directory", resource: u, effect: "allow" })),
          ],
          H = [
            { action: "*", resource: "*", effect: "allow" },
            ...a,
            { action: "question", resource: "*", effect: "deny" },
            { action: "plan_enter", resource: "*", effect: "deny" },
            { action: "plan_exit", resource: "*", effect: "deny" },
            { action: "read", resource: "*", effect: "allow" },
            { action: "read", resource: "*.env", effect: "ask" },
            { action: "read", resource: "*.env.*", effect: "ask" },
            { action: "read", resource: "*.env.example", effect: "allow" },
          ];
        yield* e.agent.transform((u) => {
          (u.update(mdn, (f) => {
            ((f.description = "The default agent. Executes tools based on configured permissions."),
              (f.system ??= RAa),
              (f.mode = "primary"),
              f.permissions.push(
                ...Lme(H, [
                  { action: "question", resource: "*", effect: "allow" },
                  { action: "plan_enter", resource: "*", effect: "allow" },
                ]),
              ));
          }),
            u.update(US.make("plan"), (f) => {
              ((f.description = "Plan mode. Disallows all edit tools."),
                (f.mode = "primary"),
                f.permissions.push(
                  ...Lme(H, [
                    { action: "question", resource: "*", effect: "allow" },
                    { action: "plan_exit", resource: "*", effect: "allow" },
                    {
                      action: "external_directory",
                      resource: zve.join(uH.data, "plans", "*"),
                      effect: "allow",
                    },
                    { action: "edit", resource: "*", effect: "deny" },
                    { action: "edit", resource: zve.join(".opencode", "plans", "*.md"), effect: "allow" },
                    {
                      action: "edit",
                      resource: zve.relative(r, zve.join(uH.data, "plans", "*.md")),
                      effect: "allow",
                    },
                  ]),
                ));
            }),
            u.update(US.make("general"), (f) => {
              ((f.description =
                "General-purpose agent for researching complex questions and executing multi-step tasks. Use this agent to execute multiple units of work in parallel."),
                (f.mode = "subagent"),
                f.permissions.push(...Lme(H, [{ action: "todowrite", resource: "*", effect: "deny" }])));
            }),
            u.update(US.make("explore"), (f) => {
              ((f.description =
                'Fast agent specialized for exploring codebases. Use this when you need to quickly find files by patterns (eg. "src/components/**/*.tsx"), search code for keywords (eg. "API endpoints"), or answer questions about the codebase (eg. "how do API endpoints work?"). When calling this agent, specify the desired thoroughness level: "quick" for basic searches, "medium" for moderate exploration, or "very thorough" for comprehensive analysis across multiple locations and naming conventions.'),
                (f.system = WAa),
                (f.mode = "subagent"),
                f.permissions.push(
                  ...Lme(
                    H,
                    [
                      { action: "*", resource: "*", effect: "deny" },
                      { action: "grep", resource: "*", effect: "allow" },
                      { action: "glob", resource: "*", effect: "allow" },
                      { action: "webfetch", resource: "*", effect: "allow" },
                      { action: "websearch", resource: "*", effect: "allow" },
                      { action: "read", resource: "*", effect: "allow" },
                    ],
                    a,
                  ),
                ));
            }),
            u.update(US.make("compaction"), (f) => {
              ((f.mode = "primary"),
                (f.hidden = !0),
                (f.system = VAa),
                f.permissions.push(...Lme(H, [{ action: "*", resource: "*", effect: "deny" }])));
            }),
            u.update(US.make("title"), (f) => {
              ((f.mode = "primary"),
                (f.hidden = !0),
                (f.system = qAa),
                f.permissions.push(...Lme(H, [{ action: "*", resource: "*", effect: "deny" }])));
            }),
            u.update(US.make("summary"), (f) => {
              ((f.mode = "primary"),
                (f.hidden = !0),
                (f.system = GAa),
                f.permissions.push(...Lme(H, [{ action: "*", resource: "*", effect: "deny" }])));
            }));
        });
      }),
    })));
});