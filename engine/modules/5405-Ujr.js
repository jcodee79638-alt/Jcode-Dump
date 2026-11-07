
var Ujr = ne(async () => {
  rXi();
  aQe();
  jX();
  o0();
  Gt();
  Ry();
  await Jn([Vy(), e$(), jI(), vHe(), Jw(), L7(), qL()]);
  ((OXa = [
    "Background mode: background=true launches the subagent asynchronously and returns immediately.",
    "Foreground is the default; use it when you need the result before continuing.",
    "Use background only for independent work that can run while you continue elsewhere.",
    "You will be notified automatically when it finishes.",
  ].join(" ")),
    (UXa = [
      "The task is working in the background. You will be notified automatically when it finishes.",
      "DO NOT sleep, poll for progress, ask the task for status, or duplicate this task's work \u2014 avoid working with the same files or topics it is using.",
      "Work on non-overlapping tasks, or briefly tell the user what you launched and end your response.",
    ].join(`
`)),
    (NXa = [
      "Additional context sent to the running background task.",
      "The task is still working in the background. You will be notified automatically when it finishes.",
      "DO NOT sleep, poll for progress, ask the task for status, or duplicate this task's work \u2014 avoid working with the same files or topics it is using.",
      "Work on non-overlapping tasks, or briefly tell the user what you sent and end your response.",
    ].join(`
`)),
    (aXi = {
      description: re.annotate({ description: "A short (3-5 words) description of the task" }),
      prompt: re.annotate({ description: "The task for the agent to perform" }),
      subagent_type: re.annotate({ description: "The type of specialized agent to use for this task" }),
      task_id: be(re).annotate({
        description:
          "This should only be set if you mean to resume a previous task (you can pass a prior task_id and the task will continue the same subagent session as before instead of creating a fresh one)",
      }),
      command: be(re).annotate({ description: "The command that triggered this task" }),
    }),
    (FXa = nt(aXi)),
    (BXa = nt({
      ...aXi,
      background: be(Vi).annotate({
        description:
          "Run the agent in the background. You will be notified when it completes. DO NOT sleep, poll, or proactively check on its progress",
      }),
    })));
  Xce = t_(
    HQe,
    ft(function* () {
      let e = yield* DP,
        t = yield* VN,
        r = yield* Eg,
        s = yield* Mg,
        a = yield* $f,
        H = yield* NE,
        u = yield* Vd,
        f = Ge("TaskTool.execute")(function* (d, _) {
          if (!SPe()) return yield* bn(Error($jt));
          let L = yield* r.get(),
            I = d.background === !0;
          if (I && !H.experimentalBackgroundSubagents)
            return yield* bn(
              Error("Background subagents require OPENCODE_EXPERIMENTAL_BACKGROUND_SUBAGENTS=true"),
            );
          let D = yield* s.get(_.sessionID),
            S = D,
            T = 0;
          while (S.parentID) (T++, (S = yield* s.get(S.parentID)));
          if (T >= (L.subagent_depth ?? 1))
            return yield* bn(
              Error(
                `Subagent depth limit reached (${L.subagent_depth ?? 1}). Increase "subagent_depth" to allow nested subagents.`,
              ),
            );
          if (!_.extra?.bypassAgentCheck)
            yield* _.ask({
              permission: HQe,
              patterns: [d.subagent_type],
              always: ["*"],
              metadata: { description: d.description, subagent_type: d.subagent_type },
            });
          let C = yield* e.get(d.subagent_type);
          if (!C) return yield* bn(Error(`Unknown agent type: ${d.subagent_type} is not a valid agent type`));
          let O = d.task_id ? yield* s.get(Ec.make(d.task_id)).pipe(jf(() => Jt(void 0))) : void 0,
            B = oXi({
              parentSessionPermission: D.permission ?? [],
              subagent: C,
              inheritDesktopPolicy: ["read", "ask", "full"].includes(D.metadata?.jac_access_mode),
            }),
            V = [
              ...(C.permission.some((ye) => ye.permission === "todowrite")
                ? []
                : [{ permission: "todowrite", pattern: "*", action: "deny" }]),
              ...(C.permission.some((ye) => ye.permission === HQe)
                ? []
                : [{ permission: HQe, pattern: "*", action: "deny" }]),
              ...(L.experimental?.primary_tools?.map((ye) => ({
                permission: ye,
                pattern: "*",
                action: "deny",
              })) ?? []),
            ],
            q =
              O ??
              (yield* s.create({
                parentID: _.sessionID,
                title: d.description + ` (@${C.name} subagent)`,
                agent: C.name,
                permission: [
                  ...B,
                  ...V.filter(
                    (ye) =>
                      !B.some(
                        (ot) =>
                          ot.permission === ye.permission &&
                          ot.pattern === ye.pattern &&
                          ot.action === ye.action,
                      ),
                  ),
                ],
                metadata: ["read", "ask", "full"].includes(D.metadata?.jac_access_mode)
                  ? { jac_access_mode: D.metadata?.jac_access_mode }
                  : void 0,
              }));
          if (O && ["read", "ask", "full"].includes(D.metadata?.jac_access_mode))
            (yield* s.setPermission({ sessionID: O.id, permission: [...B, ...V] }),
              yield* s.setMetadata({
                sessionID: O.id,
                metadata: { ...O.metadata, jac_access_mode: D.metadata?.jac_access_mode },
              }));
          let Z = yield* gOi({ sessionID: _.sessionID, messageID: _.messageID }).pipe(IA(Vd, u), on);
          if (Z.info.role !== "assistant") return yield* bn(Error("Not an assistant message"));
          let se = Z.info.variant,
            ae = { modelID: Z.info.modelID, providerID: Z.info.providerID },
            z = C.model ?? ae,
            Ae = {
              parentSessionId: _.sessionID,
              sessionId: q.id,
              model: z,
              ...(I ? { background: !0 } : {}),
            };
          yield* _.metadata({ title: d.description, metadata: Ae });
          let le = _.extra?.promptOps;
          if (!le) return yield* bn(Error("TaskTool requires promptOps in ctx.extra"));
          let Be = Ge("TaskTool.runTask")(function* () {
              let ye = yield* le.resolvePromptParts(d.prompt),
                ot = yield* le.prompt({
                  messageID: Td.ascending(),
                  sessionID: q.id,
                  model: { modelID: z.modelID, providerID: z.providerID },
                  variant: C.model ? void 0 : se,
                  agent: C.name,
                  parts: ye,
                });
              if (ot.info.role === "assistant" && ot.info.error) {
                let Ve =
                  "message" in ot.info.error.data && typeof ot.info.error.data.message === "string"
                    ? ot.info.error.data.message
                    : ot.info.error.name;
                return yield* bn(Error(`Subagent failed (task_id: ${q.id}): ${Ve}`));
              }
              let Ee = ot.parts.findLast((Ve) => Ve.type === "tool" && Ve.state.status === "error");
              if (Ee?.type === "tool" && Ee.state.status === "error")
                return yield* bn(Error(`Subagent failed (task_id: ${q.id}): ${Ee.state.error}`));
              return ot.parts.findLast((Ve) => Ve.type === "text")?.text ?? "";
            }),
            Te = Ge("TaskTool.injectBackgroundResult")(function* (ye, ot) {
              let Ee = yield* s.get(_.sessionID);
              yield* le
                .prompt({
                  sessionID: _.sessionID,
                  agent: Ee.agent ?? _.agent,
                  model: ae,
                  variant: se,
                  parts: [
                    {
                      type: "text",
                      synthetic: !0,
                      text: vCt({
                        sessionID: q.id,
                        state: ye,
                        summary:
                          ye === "completed"
                            ? `Background task completed: ${d.description}`
                            : `Background task failed: ${d.description}`,
                        text: ot,
                      }),
                    },
                  ],
                })
                .pipe(FA, zm(a, { startImmediately: !0 }));
            }),
            Lt = Ge("TaskTool.notifyBackgroundResult")(function* (ye) {
              yield* t.wait({ id: ye }).pipe(
                Hi((ot) => {
                  if (ot.info?.status === "completed") return Te("completed", ot.info.output ?? "");
                  if (ot.info?.status === "error") return Te("error", ot.info.error ?? "");
                  return ti;
                }),
                zm(a, { startImmediately: !0 }),
              );
            });
          if (yield* t.extend({ id: q.id, run: Be() }))
            return {
              title: d.description,
              metadata: { ...Ae, background: !0, jobId: q.id },
              output: vCt({
                sessionID: q.id,
                state: "running",
                summary: "Background task updated",
                text: NXa,
              }),
            };
          let Ht = yield* t.start({
            id: q.id,
            type: HQe,
            title: d.description,
            metadata: Ae,
            onPromote: Km([
              _.metadata({ title: d.description, metadata: { ...Ae, background: !0, jobId: q.id } }),
              Lt(q.id),
            ]),
            run: Be().pipe(CU(() => le.cancel(q.id))),
          });
          function Se() {
            return {
              title: d.description,
              metadata: { ...Ae, background: !0, jobId: Ht.id },
              output: vCt({
                sessionID: q.id,
                state: "running",
                summary: "Background task started",
                text: UXa,
              }),
            };
          }
          if (I) return (yield* Lt(Ht.id), Se());
          let _e = yield* lee(),
            we = le.cancel(q.id);
          function Pe() {
            _e.fork(we);
          }
          return yield* Ipe(
            jn(() => {
              _.abort.addEventListener("abort", Pe);
            }),
            () =>
              ft(function* () {
                let ye = yield* Yq(t.wait({ id: q.id }).pipe(Vn((ot) => ot.info)), t.waitForPromotion(q.id));
                if (ye?.metadata?.background === !0) return Se();
                if (ye?.status === "error") return yield* bn(Error(ye.error ?? "Task failed"));
                if (ye?.status === "cancelled") return yield* bn(Error("Task cancelled"));
                return {
                  title: d.description,
                  metadata: Ae,
                  output: vCt({ sessionID: q.id, state: "completed", text: ye?.output ?? "" }),
                };
              }),
            (ye, ot) =>
              ft(function* () {
                if (OUs(ot)) yield* Km([we, t.cancel(q.id)], { discard: !0 });
              }).pipe(
                up(
                  jn(() => {
                    _.abort.removeEventListener("abort", Pe);
                  }),
                ),
              ),
          );
        });
      return {
        description: H.experimentalBackgroundSubagents
          ? [kjr, OXa].join(`

`)
          : kjr,
        parameters: BXa,
        jsonSchema: H.experimentalBackgroundSubagents ? void 0 : iXi(FXa),
        execute: (d, _) => f(d, _).pipe(on),
      };
    }),
  );
});