
var Jw = ne(async () => {
  au();
  VZ();
  o0();
  YM();
  EHe();
  Ohe();
  y8i();
  x8i();
  T8i();
  b8i();
  P8i();
  oje();
  lb();
  Gt();
  Ql();
  Hf();
  u0t();
  BA();
  yy();
  zM();
  await Jn([Vw(), SX(), m7(), ET(), um(), h7(), jZ(), PV(), qd(), Fxe(), Jw()]);
  ((Kja = nt({
    name: re,
    description: be(re),
    mode: Jo(["subagent", "primary", "all"]),
    native: be(Vi),
    hidden: be(Vi),
    topP: be(mo),
    temperature: be(mo),
    color: be(re),
    permission: Jde,
    model: be(nt({ modelID: WL, providerID: Kp })),
    variant: be(re),
    prompt: be(re),
    options: ks(re, PH),
    steps: be(mo),
  }).annotate({ identifier: "Agent" })),
    (NOi = nt({ identifier: re, whenToUse: re, systemPrompt: re })));
  DP = class DP extends _i()("@opencode/Agent") {};
  ((qqc = vm(DP)),
    (zja = Es(
      DP,
      ft(function* () {
        let e = yield* Eg,
          t = yield* TX,
          r = yield* IT,
          s = yield* uee,
          a = yield* FN,
          H = yield* Xj,
          u = yield* cx(
            Ge("Agent.state")(function* (f) {
              let d = yield* e.get(),
                _ = yield* s.dirs(),
                L = Object.keys(d.references ?? d.reference ?? {}).length
                  ? yield* ft(function* () {
                      return (
                        yield* (yield* Bxe).wait(M$t.make("core/config-reference")),
                        (yield* (yield* jV).list()).map((Z) => Z.path)
                      );
                    }).pipe(vj(H.get(Rv.make({ directory: bo.make(f.directory) }))))
                  : [],
                I = [
                  NDr,
                  PHe.join(uH.tmp, "*"),
                  ..._.map((Z) => PHe.join(Z, "*")),
                  ...L.map((Z) => PHe.join(Z, "*")),
                ],
                D = { "*": "ask", ...Object.fromEntries(I.map((Z) => [Z, "allow"])) },
                S = d7({
                  "*": "allow",
                  doom_loop: "ask",
                  external_directory: { "*": "ask", ...Object.fromEntries(I.map((Z) => [Z, "allow"])) },
                  question: "deny",
                  plan_enter: "deny",
                  plan_exit: "deny",
                  read: { "*": "allow", "*.env": "ask", "*.env.*": "ask", "*.env.example": "allow" },
                }),
                T = d7(d.permission ?? {}),
                C = {
                  build: {
                    name: "build",
                    description: "The default agent. Executes tools based on configured permissions.",
                    options: {},
                    permission: gT(S, d7({ question: "allow", plan_enter: "allow" }), T),
                    mode: "primary",
                    native: !0,
                  },
                  plan: {
                    name: "plan",
                    description: "Plan mode. Disallows all edit tools.",
                    options: {},
                    permission: gT(
                      S,
                      d7({
                        question: "allow",
                        plan_exit: "allow",
                        task: { general: "deny" },
                        external_directory: { [PHe.join(uH.data, "plans", "*")]: "allow" },
                        edit: {
                          "*": "deny",
                          [PHe.join(".opencode", "plans", "*.md")]: "allow",
                          [PHe.relative(f.worktree, PHe.join(uH.data, PHe.join("plans", "*.md")))]: "allow",
                        },
                      }),
                      T,
                    ),
                    mode: "primary",
                    native: !0,
                  },
                  general: {
                    name: "general",
                    description:
                      "General-purpose agent for researching complex questions and executing multi-step tasks. Use this agent to execute multiple units of work in parallel.",
                    permission: gT(S, d7({ todowrite: "deny" }), T),
                    options: {},
                    mode: "subagent",
                    native: !0,
                  },
                  explore: {
                    name: "explore",
                    permission: gT(
                      S,
                      d7({
                        "*": "deny",
                        grep: "allow",
                        glob: "allow",
                        list: "allow",
                        bash: "allow",
                        webfetch: "allow",
                        websearch: "allow",
                        read: "allow",
                        external_directory: D,
                      }),
                      T,
                    ),
                    description:
                      'Fast agent specialized for exploring codebases. Use this when you need to quickly find files by patterns (eg. "src/components/**/*.tsx"), search code for keywords (eg. "API endpoints"), or answer questions about the codebase (eg. "how do API endpoints work?"). When calling this agent, specify the desired thoroughness level: "quick" for basic searches, "medium" for moderate exploration, or "very thorough" for comprehensive analysis across multiple locations and naming conventions.',
                    prompt: v8i,
                    options: {},
                    mode: "subagent",
                    native: !0,
                  },
                  compaction: {
                    name: "compaction",
                    mode: "primary",
                    native: !0,
                    hidden: !0,
                    prompt: S8i,
                    permission: gT(S, d7({ "*": "deny" }), T),
                    options: {},
                  },
                  title: {
                    name: "title",
                    mode: "primary",
                    options: {},
                    native: !0,
                    hidden: !0,
                    temperature: 0.5,
                    permission: gT(S, d7({ "*": "deny" }), T),
                    prompt: C8i,
                  },
                  summary: {
                    name: "summary",
                    mode: "primary",
                    options: {},
                    native: !0,
                    hidden: !0,
                    permission: gT(S, d7({ "*": "deny" }), T),
                    prompt: j8i,
                  },
                };
              for (let [Z, se] of Object.entries(d.agent ?? {})) {
                if (se.disable) {
                  delete C[Z];
                  continue;
                }
                let ae = C[Z];
                if (!ae) ae = C[Z] = { name: Z, mode: "all", permission: gT(S, T), options: {}, native: !1 };
                if (se.model) ae.model = OTt(se.model);
                ((ae.variant = se.variant ?? ae.variant),
                  (ae.prompt = se.prompt ?? ae.prompt),
                  (ae.description = se.description ?? ae.description),
                  (ae.temperature = se.temperature ?? ae.temperature),
                  (ae.topP = se.top_p ?? ae.topP),
                  (ae.mode = se.mode ?? ae.mode),
                  (ae.color = se.color ?? ae.color),
                  (ae.hidden = se.hidden ?? ae.hidden),
                  (ae.name = se.name ?? ae.name),
                  (ae.steps = se.steps ?? ae.steps),
                  (ae.options = bhe(ae.options, se.options ?? {})),
                  (ae.permission = gT(ae.permission, d7(se.permission ?? {}))));
              }
              for (let Z in C) {
                if (
                  C[Z].permission.some((z) => {
                    if (z.permission !== "external_directory") return !1;
                    if (z.action !== "deny") return !1;
                    return z.pattern === NDr;
                  })
                )
                  continue;
                C[Z].permission = gT(C[Z].permission, d7({ external_directory: { [NDr]: "allow" } }));
              }
              let O = ni(function* (Z) {
                  return C[Z];
                }),
                B = ni(function* () {
                  let Z = yield* e.get();
                  return cDr(
                    C,
                    sDr(),
                    aDr(
                      [(se) => (Z.default_agent ? se.name === Z.default_agent : se.name === "build"), "desc"],
                      [(se) => se.name, "asc"],
                    ),
                  );
                }),
                V = ni(function* () {
                  let Z = yield* e.get();
                  if (Z.default_agent) {
                    let ae = C[Z.default_agent];
                    if (!ae) throw Error(`default agent "${Z.default_agent}" not found`);
                    if (ae.mode === "subagent")
                      throw Error(`default agent "${Z.default_agent}" is a subagent`);
                    if (ae.hidden === !0) throw Error(`default agent "${Z.default_agent}" is hidden`);
                    return ae;
                  }
                  let se = Object.values(C).find((ae) => ae.mode !== "subagent" && ae.hidden !== !0);
                  if (!se) throw Error("no primary visible agent found");
                  return se;
                }),
                q = ni(function* () {
                  return (yield* V()).name;
                });
              return { get: O, list: B, defaultInfo: V, defaultAgent: q };
            }),
          );
        return DP.of({
          get: Ge("Agent.get")(function* (f) {
            return yield* V1(u, (d) => d.get(f));
          }),
          list: Ge("Agent.list")(function* () {
            return yield* V1(u, (f) => f.list());
          }),
          defaultInfo: Ge("Agent.defaultInfo")(function* () {
            return yield* V1(u, (f) => f.defaultInfo());
          }),
          defaultAgent: Ge("Agent.defaultAgent")(function* () {
            return yield* V1(u, (f) => f.defaultAgent());
          }),
          generate: Ge("Agent.generate")(function* (f) {
            let d = yield* e.get(),
              _ = f.model ?? (yield* a.defaultModel()),
              L = yield* a.getModel(_.providerID, _.modelID),
              I = yield* a.getLanguage(L),
              D = d.experimental?.openTelemetry ? OL(yield* x6(Nme)) : void 0,
              S = [M8i];
            yield* r.trigger("experimental.chat.system.transform", { model: L }, { system: S });
            let T = yield* V1(u, (V) => V.list()),
              C = yield* t.get(_.providerID).pipe(on),
              O = _.providerID === "openai" && C?.type === "oauth",
              B = {
                experimental_telemetry: {
                  isEnabled: d.experimental?.openTelemetry,
                  tracer: D,
                  metadata: { userId: d.username ?? "unknown" },
                },
                temperature: 0.3,
                messages: [
                  ...(O ? [] : S.map((V) => ({ role: "system", content: V }))),
                  {
                    role: "user",
                    content: `Create an agent configuration based on this request: "${f.description}".

IMPORTANT: The following identifiers already exist and must NOT be used: ${T.map((V) => V.name).join(", ")}
  Return ONLY the JSON object, no other text, do not wrap in backticks`,
                  },
                ],
                model: I,
                schema: Object.assign(C2s(NOi), w2s(NOi)),
              };
            if (O)
              return yield* nA(async () => {
                let V = i8i({
                  ...B,
                  providerOptions: D8i(L, {
                    instructions: S.join(`
`),
                    store: !1,
                  }),
                  onError: () => {},
                });
                for await (let q of V.fullStream) if (q.type === "error") throw q.error;
                return V.object;
              });
            return yield* nA(() => r8i(B).then((V) => V.object));
          }),
        });
      }),
    )),
    (Qja = Ll({ service: Xj, layer: bZ, deps: [] })),
    (Mje = Ll({ service: DP, layer: zja, deps: [Ab, pje, bX, yje, jhe, Qja] })));
});