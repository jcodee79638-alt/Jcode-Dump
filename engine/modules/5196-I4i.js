
var I4i = ne(async () => {
  Gt();
  Ql();
  $4i();
  await Jn([Vy(), XN(), e$(), Vw(), jI()]);
  ((U7a = nt({})),
    (E4i = t_(
      "plan_exit",
      ft(function* () {
        let e = yield* Mg,
          t = yield* gee,
          r = yield* FN;
        return {
          description: g4i,
          parameters: U7a,
          execute: (s, a) =>
            ft(function* () {
              let H = yield* Jc,
                u = yield* e.get(a.sessionID),
                f = O7a.relative(H.worktree, mvt(u, H));
              if (
                (yield* t.ask({
                  sessionID: a.sessionID,
                  questions: [
                    {
                      question: `Plan at ${f} is complete. Would you like to switch to the build agent and start implementing?`,
                      header: "Build Agent",
                      custom: !1,
                      options: [
                        {
                          label: "Yes",
                          description: "Switch to build agent and start implementing the plan",
                        },
                        { label: "No", description: "Stay with plan agent to continue refining the plan" },
                      ],
                    },
                  ],
                  tool: a.callID ? { messageID: a.messageID, callID: a.callID } : void 0,
                }))[0]?.[0] === "No"
              )
                yield* new eJe();
              let L = (yield* e.messages({ sessionID: a.sessionID }).pipe(on)).findLast(
                  (S) => S.info.role === "user" && S.info.model,
                ),
                I = L?.info.role === "user" && L.info.model ? L.info.model : yield* r.defaultModel(),
                D = {
                  id: Td.ascending(),
                  sessionID: a.sessionID,
                  role: "user",
                  time: { created: Date.now() },
                  agent: "build",
                  model: I,
                };
              return (
                yield* e.updateMessage(D),
                yield* e.updatePart({
                  id: Zp.ascending(),
                  messageID: D.id,
                  sessionID: a.sessionID,
                  type: "text",
                  text: `The plan at ${f} has been approved, you can now edit files. Execute the plan`,
                  synthetic: !0,
                }),
                {
                  title: "Switching to build agent",
                  output: "User approved switching to build agent. Wait for further instructions.",
                  metadata: {},
                }
              );
            }).pipe(on),
        };
      }),
    )));
});