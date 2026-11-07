
var qLe = ne(async () => {
  au();
  vy();
  Gt();
  Cf();
  o0();
  Ql();
  Ry();
  uw();
  jA();
  kGe();
  await Jn([um(), qLe()]);
  jCe = class jCe extends _i()("@opencode/Instruction") {};
  ((C7a = Es(
    jCe,
    ft(function* () {
      let e = yield* Eg,
        t = yield* ui.Service,
        r = yield* M1,
        s = yield* NE,
        a = RU(AHe(yield* gy)),
        H = [
          XPt.join(r.config, "AGENTS.md"),
          ...(!s.disableClaudeCodePrompt ? [XPt.join(r.home, ".claude", "CLAUDE.md")] : []),
        ],
        u = ["AGENTS.md", ...(!s.disableClaudeCodePrompt ? ["CLAUDE.md"] : []), "CONTEXT.md"],
        f = yield* cx(Ge("Instruction.state")(() => Jt({ claims: new Map() }))),
        d = ni(function* (O) {
          let B = yield* Jc;
          if (!Ad.OPENCODE_DISABLE_PROJECT_CONFIG)
            return yield* t.globUp(O, B.directory, B.worktree).pipe($s(() => Jt([])));
          return yield* t.globUp(O, r.config, r.config).pipe($s(() => Jt([])));
        }),
        _ = ni(function* (O) {
          return yield* t.readFileString(O).pipe($s(() => Jt("")));
        }),
        L = ni(function* (O) {
          let B = yield* a.execute(KM(O)).pipe(
            vW(5000),
            $s(() => Jt(null)),
          );
          if (!B) return "";
          let V = yield* B.arrayBuffer.pipe($s(() => Jt(new ArrayBuffer(0))));
          return new TextDecoder().decode(V);
        }),
        I = Ge("Instruction.clear")(function* (O) {
          (yield* Eu(f)).claims.delete(O);
        }),
        D = () => Jt(new Set()),
        S = Ge("Instruction.system")(function* () {
          let O = yield* e.get(),
            B = yield* D(),
            V = (O.instructions ?? []).filter((se) => se.startsWith("https://") || se.startsWith("http://")),
            q = yield* ja(Array.from(B), _, { concurrency: 8 }),
            Z = yield* ja(V, L, { concurrency: 4 });
          return [
            ...Array.from(B).flatMap((se, ae) =>
              q[ae]
                ? [
                    `Instructions from: ${se}
${q[ae]}`,
                  ]
                : [],
            ),
            ...V.flatMap((se, ae) =>
              Z[ae]
                ? [
                    `Instructions from: ${se}
${Z[ae]}`,
                  ]
                : [],
            ),
          ];
        }),
        T = Ge("Instruction.find")(function* (O) {
          for (let B of u) {
            let V = XPt.resolve(XPt.join(O, B));
            if (yield* t.existsSafe(V)) return V;
          }
          return;
        }),
        C = (O, B, V) => Jt([]);
      return jCe.of({ clear: I, systemPaths: D, system: S, find: T, resolve: C });
    }),
  )),
    (JPt = Ll({ service: jCe, layer: C7a, deps: [Ab, ui.node, lw, WN, Q0] })));
});