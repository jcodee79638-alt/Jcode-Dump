
var pkt,
  isH,
  ssH,
  osH,
  awr = (e) => e.mapFields((t) => ({ ...WW(t, ["limit"]), anchor: Lor })),
  asH,
  Pts,
  HsH,
  csH,
  jts = "Invalid cursor",
  D$e,
  AsH,
  usH,
  lsH,
  fsH,
  psH,
  Cts = (e) =>
    zd("server.session")
      .add(
        MH("session.list", "/api/session", {
          query: psH,
          success: nt({ data: On($Lt), cursor: nt({ previous: D$e.pipe(be), next: D$e.pipe(be) }) }).annotate(
            { identifier: "SessionsResponse" },
          ),
          error: [SJ, Sb],
        }).annotateMerge(
          Fn({
            identifier: "v2.session.list",
            summary: "List sessions",
            description:
              "Retrieve sessions in the requested order. Items keep that order across pages; use cursor.next or cursor.previous to move through the ordered list.",
          }),
        ),
      )
      .add(
        sc("session.create", "/api/session", {
          payload: nt({ id: P$.pipe(be), agent: K1e.pipe(be), model: IG.pipe(be), location: Rv.pipe(be) }),
          success: nt({ data: $Lt }),
        }).annotateMerge(
          Fn({
            identifier: "v2.session.create",
            summary: "Create session",
            description: "Create a session at the requested location.",
          }),
        ),
      )
      .add(
        MH("session.active", "/api/session/active", { success: nt({ data: ks(P$, AsH) }) }).annotateMerge(
          Fn({
            identifier: "v2.session.active",
            summary: "List active sessions",
            description:
              "Retrieve foreground Session drains currently owned by this OpenCode process. Sessions absent from the result are inactive.",
          }),
        ),
      )
      .add(
        MH("session.get", "/api/session/:sessionID", {
          params: { sessionID: P$ },
          success: nt({ data: $Lt }),
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.get",
              summary: "Get session",
              description: "Retrieve a session by ID.",
            }),
          ),
      )
      .add(
        sc("session.switchAgent", "/api/session/:sessionID/agent", {
          params: { sessionID: P$ },
          payload: nt({ agent: K1e }),
          success: lf,
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.switchAgent",
              summary: "Switch session agent",
              description: "Switch the agent used by subsequent provider turns.",
            }),
          ),
      )
      .add(
        sc("session.switchModel", "/api/session/:sessionID/model", {
          params: { sessionID: P$ },
          payload: nt({ model: IG }),
          success: lf,
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.switchModel",
              summary: "Switch session model",
              description: "Switch the model used by subsequent provider turns.",
            }),
          ),
      )
      .add(
        sc("session.prompt", "/api/session/:sessionID/prompt", {
          params: { sessionID: P$ },
          payload: nt({ id: wf.pipe(be), prompt: nsH, delivery: Uor.pipe(be), resume: Vi.pipe(be) }),
          success: nt({ data: FLt }),
          error: [tYe, Wf],
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.prompt",
              summary: "Send message",
              description:
                "Durably admit one session input and schedule agent-loop execution unless resume is false.",
            }),
          ),
      )
      .add(
        sc("session.compact", "/api/session/:sessionID/compact", {
          params: { sessionID: P$ },
          success: lf,
          error: [Wf, yR],
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.compact",
              summary: "Compact session",
              description: "Compact a session conversation.",
            }),
          ),
      )
      .add(
        sc("session.wait", "/api/session/:sessionID/wait", {
          params: { sessionID: P$ },
          success: lf,
          error: [Wf, yR],
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.wait",
              summary: "Wait for session",
              description: "Wait for a session agent loop to become idle.",
            }),
          ),
      )
      .add(
        sc("session.revert.stage", "/api/session/:sessionID/revert/stage", {
          params: { sessionID: P$ },
          payload: nt({ messageID: wf, files: Vi.pipe(be) }),
          success: nt({ data: tht }),
          error: [$$e, Wf, l9],
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.revert.stage",
              summary: "Stage session revert",
              description:
                "Stage or move a reversible session boundary and optionally apply its file changes.",
            }),
          ),
      )
      .add(
        sc("session.revert.clear", "/api/session/:sessionID/revert/clear", {
          params: { sessionID: P$ },
          success: lf,
          error: [Wf, l9],
        })
          .middleware(e)
          .annotateMerge(Fn({ identifier: "v2.session.revert.clear", summary: "Clear staged revert" })),
      )
      .add(
        sc("session.revert.commit", "/api/session/:sessionID/revert/commit", {
          params: { sessionID: P$ },
          success: lf,
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(Fn({ identifier: "v2.session.revert.commit", summary: "Commit staged revert" })),
      )
      .add(
        MH("session.context", "/api/session/:sessionID/context", {
          params: { sessionID: P$ },
          success: nt({ data: On(xY) }),
          error: [Wf, l9],
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.context",
              summary: "Get session context",
              description:
                "Retrieve the active context messages for a session (all messages after the last compaction).",
            }),
          ),
      )
      .add(
        MH("session.history", "/api/session/:sessionID/history", {
          params: { sessionID: P$ },
          query: lsH,
          success: nt({ data: On(Hht), hasMore: Vi }).annotate({ identifier: "SessionHistory" }),
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.history",
              summary: "Get session history",
              description:
                "Read one finite page of public durable Session events after an exclusive aggregate sequence. Newly committed events may appear on later pages.",
            }),
          ),
      )
      .add(
        MH("session.events", "/api/session/:sessionID/event", {
          params: { sessionID: P$ },
          query: { after: O6.pipe(v$(Ko), be) },
          success: ISi({ data: Hht }),
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.events",
              summary: "Subscribe to session events",
              description:
                "Replay durable events after an aggregate sequence, then continue with new durable events.",
            }),
          ),
      )
      .add(
        sc("session.interrupt", "/api/session/:sessionID/interrupt", {
          params: { sessionID: P$ },
          success: lf,
          error: Wf,
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.interrupt",
              summary: "Interrupt session execution",
              description:
                "Interrupt active execution owned by this OpenCode process. Idle interruption is a no-op.",
            }),
          ),
      )
      .add(
        MH("session.message", "/api/session/:sessionID/message/:messageID", {
          params: { sessionID: P$, messageID: wf },
          success: nt({ data: xY }),
          error: [Wf, $$e],
        })
          .middleware(e)
          .annotateMerge(
            Fn({
              identifier: "v2.session.message",
              summary: "Get session message",
              description: "Retrieve one projected message owned by the Session.",
            }),
          ),
      )
      .annotateMerge(Fn({ title: "sessions", description: "Experimental session routes." }));