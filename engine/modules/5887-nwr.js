
var nwr = ne(async () => {
  VZ();
  N2();
  Gt();
  $H();
  xx();
  Sx();
  jT();
  skt();
  yy();
  zM();
  await Jn([e$(), l$e(), VLe(), Eee(), Fee(), oce(), jI(), kX(), bT(), Tx()]);
  ((TiH = nt({
    ...Tb,
    scope: be(Jo(["project"])),
    path: be(re),
    roots: be(HYe),
    start: be(O6),
    search: be(re),
    limit: be(O6),
  })),
    (viH = nt({ ...Tb, ...WW(f7a.fields, ["sessionID"]) })),
    (biH = nt({ ...Tb, limit: be(O6.check(ARe(), pG(0))), before: be(re) })),
    (jiH = ks(re, yBa)),
    (PiH = nt({
      title: be(re),
      metadata: be(dXe),
      permission: be(Jde),
      time: be(nt({ archived: be(dvt) })),
    })),
    (rwr = nt(WW(COi.fields, ["sessionID"]))),
    (CiH = nt({ modelID: WL, providerID: Kp, messageID: Td })),
    (wiH = nt({ providerID: Kp, modelID: WL, auto: be(Vi) })),
    (fts = nt(WW(mYa.fields, ["sessionID"]))),
    (kiH = nt(WW(LYa.fields, ["sessionID"]))),
    (OiH = nt(WW(hYa.fields, ["sessionID"]))),
    (UiH = nt(WW(T7a.fields, ["sessionID"]))),
    (NiH = nt({ response: Aht })),
    (Tg = {
      list: u0,
      status: `${u0}/status`,
      get: `${u0}/:sessionID`,
      children: `${u0}/:sessionID/children`,
      todo: `${u0}/:sessionID/todo`,
      diff: `${u0}/:sessionID/diff`,
      messages: `${u0}/:sessionID/message`,
      message: `${u0}/:sessionID/message/:messageID`,
      create: u0,
      remove: `${u0}/:sessionID`,
      update: `${u0}/:sessionID`,
      fork: `${u0}/:sessionID/fork`,
      abort: `${u0}/:sessionID/abort`,
      share: `${u0}/:sessionID/share`,
      init: `${u0}/:sessionID/init`,
      summarize: `${u0}/:sessionID/summarize`,
      prompt: `${u0}/:sessionID/message`,
      promptAsync: `${u0}/:sessionID/prompt_async`,
      command: `${u0}/:sessionID/command`,
      shell: `${u0}/:sessionID/shell`,
      revert: `${u0}/:sessionID/revert`,
      unrevert: `${u0}/:sessionID/unrevert`,
      permissions: `${u0}/:sessionID/permissions/:permissionID`,
      deleteMessage: `${u0}/:sessionID/message/:messageID`,
      deletePart: `${u0}/:sessionID/message/:messageID/part/:partID`,
      updatePart: `${u0}/:sessionID/message/:messageID/part/:partID`,
    }),
    (pts = kE("session")
      .add(
        zd("session")
          .add(
            MH("list", Tg.list, { query: TiH, success: zs(On(RB), "List of sessions") }).annotateMerge(
              Fn({
                identifier: "session.list",
                summary: "List sessions",
                description: "Get a list of all OpenCode sessions, sorted by most recently updated.",
              }),
            ),
            MH("status", Tg.status, {
              query: jo,
              success: zs(jiH, "Get session status"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "session.status",
                summary: "Get session status",
                description:
                  "Retrieve the current status of all sessions, including active, idle, and completed states.",
              }),
            ),
            MH("get", Tg.get, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(RB, "Get session"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.get",
                summary: "Get session",
                description: "Retrieve detailed information about a specific OpenCode session.",
              }),
            ),
            MH("children", Tg.children, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(On(RB), "List of children"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.children",
                summary: "Get session children",
                description:
                  "Retrieve all child sessions that were forked from the specified parent session.",
              }),
            ),
            MH("todo", Tg.todo, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(On(V3i), "Todo list"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.todo",
                summary: "Get session todos",
                description:
                  "Retrieve the todo list associated with a specific session, showing tasks and action items.",
              }),
            ),
            MH("diff", Tg.diff, {
              params: { sessionID: Ec },
              query: viH,
              success: zs(On(DOi), "Successfully retrieved diff"),
            }).annotateMerge(
              Fn({
                identifier: "session.diff",
                summary: "Get message diff",
                description:
                  "Get the file changes (diff) that resulted from a specific user message in the session.",
              }),
            ),
            MH("messages", Tg.messages, {
              params: { sessionID: Ec },
              query: biH,
              success: zs(On(nxe), "List of messages"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.messages",
                summary: "Get session messages",
                description: "Retrieve all messages in a session, including user prompts and AI responses.",
              }),
            ),
            MH("message", Tg.message, {
              params: { sessionID: Ec, messageID: Td },
              query: jo,
              success: zs(nxe, "Message"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.message",
                summary: "Get message",
                description: "Retrieve a specific message from a session by its message ID.",
              }),
            ),
            sc("create", Tg.create, {
              query: jo,
              payload: [lf, lyr],
              success: zs(RB, "Successfully created session"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "session.create",
                summary: "Create session",
                description:
                  "Create a new OpenCode session for interacting with AI assistants and managing conversations.",
              }),
            ),
            P8("remove", Tg.remove, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(Vi, "Successfully deleted session"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.delete",
                summary: "Delete session",
                description:
                  "Delete a session and permanently remove all associated data, including messages and history.",
              }),
            ),
            Cbe("update", Tg.update, {
              params: { sessionID: Ec },
              query: jo,
              payload: PiH,
              success: zs(RB, "Successfully updated session"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.update",
                summary: "Update session",
                description: "Update properties of an existing session, such as title or other metadata.",
              }),
            ),
            sc("fork", Tg.fork, {
              params: { sessionID: Ec },
              query: jo,
              payload: [lf, rwr],
              success: zs(RB, "200"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.fork",
                summary: "Fork session",
                description:
                  "Create a new session by forking an existing session at a specific message point.",
              }),
            ),
            sc("abort", Tg.abort, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(Vi, "Aborted session"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "session.abort",
                summary: "Abort session",
                description:
                  "Abort an active session and stop any ongoing AI processing or command execution.",
              }),
            ),
            sc("init", Tg.init, {
              params: { sessionID: Ec },
              query: jo,
              payload: CiH,
              success: zs(Vi, "200"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.init",
                summary: "Initialize session",
                description:
                  "Analyze the current application and create an AGENTS.md file with project-specific agent configurations.",
              }),
            ),
            sc("share", Tg.share, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(RB, "Successfully shared session"),
              error: [aX, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.share",
                summary: "Share session",
                description:
                  "Create a shareable link for a session, allowing others to view the conversation.",
              }),
            ),
            P8("unshare", Tg.share, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(RB, "Successfully unshared session"),
              error: [aX, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.unshare",
                summary: "Unshare session",
                description: "Remove the shareable link for a session, making it private again.",
              }),
            ),
            sc("summarize", Tg.summarize, {
              params: { sessionID: Ec },
              query: jo,
              payload: wiH,
              success: zs(Vi, "Summarized session"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.summarize",
                summary: "Summarize session",
                description:
                  "Generate a concise summary of the session using AI compaction to preserve key information.",
              }),
            ),
            sc("prompt", Tg.prompt, {
              params: { sessionID: Ec },
              query: jo,
              payload: fts,
              success: zs(nxe, "Created message"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.prompt",
                summary: "Send message",
                description: "Create and send a new message to a session, streaming the AI response.",
              }),
            ),
            sc("promptAsync", Tg.promptAsync, {
              params: { sessionID: Ec },
              query: jo,
              payload: fts,
              success: zs(lf, "Prompt accepted"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.prompt_async",
                summary: "Send async message",
                description:
                  "Create and send a new message to a session asynchronously, starting the session if needed and returning immediately.",
              }),
            ),
            sc("command", Tg.command, {
              params: { sessionID: Ec },
              query: jo,
              payload: kiH,
              success: zs(nxe, "Created message"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "session.command",
                summary: "Send command",
                description: "Send a new command to a session for execution by the AI assistant.",
              }),
            ),
            sc("shell", Tg.shell, {
              params: { sessionID: Ec },
              query: jo,
              payload: OiH,
              success: zs(nxe, "Created message"),
              error: [PA, t$, uAe],
            }).annotateMerge(
              Fn({
                identifier: "session.shell",
                summary: "Run shell command",
                description:
                  "Execute a shell command within the session context and return the AI's response.",
              }),
            ),
            sc("revert", Tg.revert, {
              params: { sessionID: Ec },
              query: jo,
              payload: UiH,
              success: zs(RB, "Updated session"),
              error: [PA, t$, uAe],
            }).annotateMerge(
              Fn({
                identifier: "session.revert",
                summary: "Revert message",
                description:
                  "Revert a specific message in a session, undoing its effects and restoring the previous state.",
              }),
            ),
            sc("unrevert", Tg.unrevert, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(RB, "Updated session"),
              error: [PA, t$, uAe],
            }).annotateMerge(
              Fn({
                identifier: "session.unrevert",
                summary: "Restore reverted messages",
                description: "Restore all previously reverted messages in a session.",
              }),
            ),
            sc("permissionRespond", Tg.permissions, {
              params: { sessionID: Ec, permissionID: GG },
              query: jo,
              payload: NiH,
              success: zs(Vi, "Permission processed successfully"),
              error: [PA, t$, ite],
            }).annotateMerge(
              Fn({
                identifier: "permission.respond",
                summary: "Respond to permission",
                description: "Approve or deny a permission request from the AI assistant.",
                deprecated: !0,
              }),
            ),
            P8("deleteMessage", Tg.deleteMessage, {
              params: { sessionID: Ec, messageID: Td },
              query: jo,
              success: zs(Vi, "Successfully deleted message"),
              error: [PA, t$, uAe],
            }).annotateMerge(
              Fn({
                identifier: "session.deleteMessage",
                summary: "Delete message",
                description:
                  "Permanently delete a specific message and all of its parts from a session without reverting file changes.",
              }),
            ),
            P8("deletePart", Tg.deletePart, {
              params: { sessionID: Ec, messageID: Td, partID: Zp },
              query: jo,
              success: zs(Vi, "Successfully deleted part"),
              error: [PA, t$],
            }).annotateMerge(Fn({ identifier: "part.delete", description: "Delete a part from a message." })),
            Cbe("updatePart", Tg.updatePart, {
              params: { sessionID: Ec, messageID: Td, partID: Zp },
              query: jo,
              payload: rxe,
              success: zs(rxe, "Successfully updated part"),
              error: [PA, t$],
            }).annotateMerge(Fn({ identifier: "part.update", description: "Update a part in a message." })),
          )
          .annotateMerge(Fn({ title: "session", description: "Experimental HttpApi session routes." }))
          .middleware(Fm)
          .middleware(Nm)
          .middleware(tm),
      )
      .annotateMerge(
        Fn({
          title: "opencode experimental HttpApi",
          version: "0.0.1",
          description: "Experimental HttpApi surface for selected instance routes.",
        }),
      )));
});