
var Its = ne(async () => {
  ijt();
  iwr();
  Gt();
  $H();
  xx();
  Sx();
  jT();
  await Jn([bT(), Tx()]);
  ((XiH = nt({ command: re })),
    (JiH = nt({ type: ri(rLe.type), properties: rLe.data }).annotate({ identifier: "EventTuiPromptAppend" })),
    (KiH = nt({ type: ri(pPe.type), properties: pPe.data }).annotate({
      identifier: "EventTuiCommandExecute",
    })),
    (ziH = nt({ type: ri(Lee.type), properties: Lee.data }).annotate({ identifier: "EventTuiToastShow" })),
    (QiH = nt({ type: ri(nLe.type), properties: nLe.data }).annotate({
      identifier: "EventTuiSessionSelect",
    })),
    (YiH = Io([JiH, KiH, ziH, QiH])),
    (d9 = {
      appendPrompt: `${p9}/append-prompt`,
      openHelp: `${p9}/open-help`,
      openSessions: `${p9}/open-sessions`,
      openThemes: `${p9}/open-themes`,
      openModels: `${p9}/open-models`,
      submitPrompt: `${p9}/submit-prompt`,
      clearPrompt: `${p9}/clear-prompt`,
      executeCommand: `${p9}/execute-command`,
      showToast: `${p9}/show-toast`,
      publish: `${p9}/publish`,
      selectSession: `${p9}/select-session`,
      controlNext: `${p9}/control/next`,
      controlResponse: `${p9}/control/response`,
    }),
    (Ets = kE("tui")
      .add(
        zd("tui")
          .add(
            sc("appendPrompt", d9.appendPrompt, {
              query: jo,
              payload: rLe.data,
              success: zs(Vi, "Prompt processed successfully"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "tui.appendPrompt",
                summary: "Append TUI prompt",
                description: "Append prompt to the TUI.",
              }),
            ),
            sc("openHelp", d9.openHelp, {
              query: jo,
              success: zs(Vi, "Help dialog opened successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.openHelp",
                summary: "Open help dialog",
                description: "Open the help dialog in the TUI to display user assistance information.",
              }),
            ),
            sc("openSessions", d9.openSessions, {
              query: jo,
              success: zs(Vi, "Session dialog opened successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.openSessions",
                summary: "Open sessions dialog",
                description: "Open the session dialog.",
              }),
            ),
            sc("openThemes", d9.openThemes, {
              query: jo,
              success: zs(Vi, "Theme dialog opened successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.openThemes",
                summary: "Open themes dialog",
                description: "Open the theme dialog.",
              }),
            ),
            sc("openModels", d9.openModels, {
              query: jo,
              success: zs(Vi, "Model dialog opened successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.openModels",
                summary: "Open models dialog",
                description: "Open the model dialog.",
              }),
            ),
            sc("submitPrompt", d9.submitPrompt, {
              query: jo,
              success: zs(Vi, "Prompt submitted successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.submitPrompt",
                summary: "Submit TUI prompt",
                description: "Submit the prompt.",
              }),
            ),
            sc("clearPrompt", d9.clearPrompt, {
              query: jo,
              success: zs(Vi, "Prompt cleared successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.clearPrompt",
                summary: "Clear TUI prompt",
                description: "Clear the prompt.",
              }),
            ),
            sc("executeCommand", d9.executeCommand, {
              query: jo,
              payload: XiH,
              success: zs(Vi, "Command executed successfully"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "tui.executeCommand",
                summary: "Execute TUI command",
                description: "Execute a TUI command.",
              }),
            ),
            sc("showToast", d9.showToast, {
              query: jo,
              payload: Lee.data,
              success: zs(Vi, "Toast notification shown successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.showToast",
                summary: "Show TUI toast",
                description: "Show a toast notification in the TUI.",
              }),
            ),
            sc("publish", d9.publish, {
              query: jo,
              payload: YiH,
              success: zs(Vi, "Event published successfully"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "tui.publish",
                summary: "Publish TUI event",
                description: "Publish a TUI event.",
              }),
            ),
            sc("selectSession", d9.selectSession, {
              query: jo,
              payload: nLe.data,
              success: zs(Vi, "Session selected successfully"),
              error: [PA, t$],
            }).annotateMerge(
              Fn({
                identifier: "tui.selectSession",
                summary: "Select session",
                description: "Navigate the TUI to display the specified session.",
              }),
            ),
            MH("controlNext", d9.controlNext, {
              query: jo,
              success: zs(Lts, "Next TUI request"),
            }).annotateMerge(
              Fn({
                identifier: "tui.control.next",
                summary: "Get next TUI request",
                description: "Retrieve the next TUI request from the queue for processing.",
              }),
            ),
            sc("controlResponse", d9.controlResponse, {
              query: jo,
              payload: PH,
              success: zs(Vi, "Response submitted successfully"),
            }).annotateMerge(
              Fn({
                identifier: "tui.control.response",
                summary: "Submit TUI response",
                description: "Submit a response to the TUI request queue to complete a pending request.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "tui", description: "Experimental HttpApi TUI routes." }))
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