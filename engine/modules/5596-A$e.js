
var A$e = ne(async () => {
  au();
  vy();
  o0();
  Gt();
  xXi();
  lb();
  $Me();
  Gt();
  Use();
  Ql();
  jA();
  jX();
  Ry();
  yy();
  _Pe();
  await Jn([
    P2(),
    I4i(),
    e$(),
    x4i(),
    U4i(),
    Lqi(),
    MCt(),
    G5i(),
    z5i(),
    tXi(),
    Ujr(),
    qL(),
    uXi(),
    mXi(),
    LXi(),
    gXi(),
    MXi(),
    Vy(),
    Vw(),
    kXi(),
    FXi(),
    SX(),
    qXi(),
    P7(),
    L7(),
    XN(),
    oce(),
    ek(),
    qLe(),
    ZL(),
    Jw(),
    h7(),
    ET(),
    xP(),
    A$e(),
  ]);
  nAe = class nAe extends _i()("@opencode/ToolRegistry") {};
  OQa = Es(
    nAe,
    ft(function* () {
      let e = yield* Eg,
        t = yield* IT,
        r = yield* DP,
        s = yield* RN,
        a = yield* NE,
        H = yield* MP,
        u = yield* $Xi,
        f = yield* Xce,
        d = yield* eXi,
        _ = yield* M4i,
        L = yield* O4i,
        I = yield* AXi,
        D = yield* NXi,
        S = yield* E4i,
        T = yield* dXi,
        C = yield* Bjr,
        O = yield* hqi,
        B = yield* q5i,
        V = yield* Njr,
        q = yield* Pjr,
        Z = yield* K5i,
        se = yield* Gjr,
        ae = yield* yXi,
        z = yield* DP,
        Ae = a.experimentalCodeMode ? yield* nA(() => Bzi().then(() => Fzi)) : void 0,
        le = Ae ? yield* Ae.CodeModeTool : void 0,
        Be = yield* cx(
          Ge("ToolRegistry.state")(function* (Pe) {
            let ye = [];
            function ot(et, ut) {
              let ht = ut.args ?? {},
                Et = Object.entries(ht),
                Rr = Et.every((Dt) => Vzi(Dt[1])) ? os(ht) : void 0,
                Vt = Rr ? BQa(Rr) : FQa(Et),
                Br = Rr ? qW((Dt) => Rr.safeParse(Dt).success) : PH;
              return {
                id: et,
                parameters: Br,
                jsonSchema: Vt,
                description: ut.description,
                execute: (Dt, St) =>
                  ft(function* () {
                    let wt = yield* lee(),
                      Qr = {
                        ...St,
                        ask: (Mn) => wt.promise(St.ask(Mn)),
                        directory: Pe.directory,
                        worktree: Pe.worktree,
                      },
                      Li = yield* nA(() => ut.execute(Dt, Qr)),
                      sr = typeof Li === "string" ? Li : Li.output,
                      Mt = typeof Li === "string" ? {} : (Li.metadata ?? {}),
                      Lr = typeof Li === "string" ? void 0 : Li.attachments,
                      Tr = yield* z.get(St.agent),
                      Dn = yield* s.output(sr, {}, Tr);
                    return {
                      title: typeof Li === "string" ? "" : (Li.title ?? ""),
                      output: Dn.truncated ? Dn.content : sr,
                      attachments: Lr,
                      metadata: {
                        ...Mt,
                        truncated: Dn.truncated,
                        ...(Dn.truncated && { outputPath: Dn.outputPath }),
                      },
                    };
                  }).pipe(
                    gI("Tool.execute", {
                      attributes: {
                        "tool.name": et,
                        "session.id": St.sessionID,
                        "message.id": St.messageID,
                        ...(St.callID ? { "tool.call_id": St.callID } : {}),
                      },
                    }),
                  ),
              };
            }
            let Ve = (yield* e.directories()).flatMap((et) =>
              wG.scanSync("{tool,tools}/*.{js,ts}", { cwd: et, absolute: !0, dot: !0, symlink: !0 }),
            );
            if (Ve.length) yield* e.waitForDependencies();
            for (let et of Ve) {
              let ut = Rzi.basename(et, Rzi.extname(et)),
                ht = yield* nA(() => import(wQa(et).href));
              for (let [Et, tr] of Object.entries(ht)) {
                if (!UQa(tr)) continue;
                ye.push(ot(Et === "default" ? ut : `${ut}_${Et}`, tr));
              }
            }
            let Fe = yield* t.list();
            for (let et of Fe) for (let [ut, ht] of Object.entries(et.tool ?? {})) ye.push(ot(ut, ht));
            yield* e.get();
            let it = ["app", "cli", "desktop"].includes(a.client) || a.enableQuestionTool,
              At = yield* Km({
                invalid: Ex(u),
                shell: Ex(O),
                read: Ex(d),
                glob: Ex(B),
                grep: Ex(Z),
                edit: Ex(q),
                write: Ex(V),
                task: Ex(f),
                fetch: Ex(T),
                todo: Ex(I),
                search: Ex(C),
                skill: Ex(ae),
                patch: Ex(se),
                question: Ex(_),
                harness: Ex(L),
                lsp: Ex(D),
                plan: Ex(S),
                ...(le ? { execute: Ex(le) } : {}),
              });
            return {
              custom: ye,
              builtin: [
                At.invalid,
                ...(it ? [At.question] : []),
                At.harness,
                At.shell,
                At.read,
                At.glob,
                At.grep,
                At.edit,
                At.write,
                At.task,
                At.fetch,
                At.todo,
                At.search,
                At.skill,
                At.patch,
                ...(At.execute ? [At.execute] : []),
                ...(a.experimentalLspTool ? [At.lsp] : []),
                ...(a.experimentalPlanMode && a.client === "cli" ? [At.plan] : []),
              ],
              task: At.task,
              read: At.read,
            };
          }),
        ),
        Te = Ge("ToolRegistry.all")(function* () {
          let Pe = yield* Eu(Be);
          return [...Pe.builtin, ...Pe.custom];
        }),
        Lt = Ge("ToolRegistry.ids")(function* () {
          return (yield* Te()).map((Pe) => Pe.id);
        }),
        Ht = Ge("ToolRegistry.describeTask")(function* (Pe) {
          return [
            "Available agent types and the tools they have access to:",
            (yield* r.list())
              .filter((Fe) => Fe.mode !== "primary")
              .filter((Fe) => IHe("task", Fe.name, Pe.permission).action !== "deny")
              .toSorted((Fe, it) => Fe.name.localeCompare(it.name))
              .map(
                (Fe) =>
                  `- ${Fe.name}: ${Fe.description ?? "This subagent should only be called manually by the user."}`,
              ).join(`
`),
          ].join(`
`);
        }),
        Se = Ge("ToolRegistry.describeCodeMode")(function* (Pe) {
          if (!Ae) return;
          let ye = gT(Pe.agent.permission, Pe.permission ?? []),
            ot = c8i(yield* H.tools(), ye);
          if (Object.keys(ot).length === 0) return;
          return Ae.describeCatalog(ot, Object.keys(yield* H.clients()).map(mPe));
        }),
        _e = Ge("ToolRegistry.tools")(function* (Pe) {
          let ye = (yield* Te()).filter((Ve) => {
              if (Ve.id === Xce.id && !SPe()) return !1;
              if (Ve.id === Bjr.id)
                return kQa(Pe.providerID, { exa: a.enableExa, parallel: a.enableParallel });
              let Fe =
                Pe.modelID.includes("gpt-") && !Pe.modelID.includes("oss") && !Pe.modelID.includes("gpt-4");
              if (Ve.id === Gjr.id) return Fe;
              if (Ve.id === Pjr.id || Ve.id === Njr.id) return !Fe;
              return !0;
            }),
            ot = ye.some((Ve) => Ve.id === "execute") ? yield* Se(Pe) : void 0,
            Ee = ye.filter((Ve) => Ve.id !== "execute" || ot);
          return yield* ja(
            Ee,
            ni(function* (Ve) {
              let Fe = { description: Ve.description, parameters: Ve.parameters, jsonSchema: Ve.jsonSchema };
              yield* t.trigger("tool.definition", { toolID: Ve.id }, Fe);
              let it =
                Fe.parameters === Ve.parameters || Fe.jsonSchema !== Ve.jsonSchema ? Fe.jsonSchema : void 0;
              return {
                id: Ve.id,
                description: [
                  Fe.description,
                  Ve.id === Xce.id ? yield* Ht(Pe.agent) : void 0,
                  Ve.id === "execute" ? ot : void 0,
                ].filter(Boolean).join(`
`),
                parameters: Fe.parameters,
                jsonSchema: it,
                execute: Ve.execute,
                formatValidationError: Ve.formatValidationError,
              };
            }),
            { concurrency: "unbounded" },
          );
        }),
        we = Ge("ToolRegistry.named")(function* () {
          let Pe = yield* Eu(Be);
          return { task: Pe.task, read: Pe.read };
        });
      return nAe.of({ ids: Lt, all: Te, named: we, tools: _e });
    }),
  );
  BPr = Ll({
    service: nAe,
    layer: OQa,
    deps: [
      Ab,
      bX,
      Mxr,
      xxr,
      Mje,
      yje,
      WB,
      sXe,
      jhe,
      iQe,
      JPt,
      ui.node,
      q1,
      Q0,
      qMe,
      DCt,
      K5e,
      WN,
      $Pe,
      DD,
      pxe,
    ],
  });
});
import iwt from "crypto";