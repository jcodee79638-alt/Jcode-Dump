
var njt = ne(() => {
  njt();
  Gt();
  Hu();
  g_();
  Hu();
  aw();
  ((rLe = ua({ type: "tui.prompt.append", schema: { text: re } })),
    (pPe = ua({
      type: "tui.command.execute",
      schema: {
        command: Io([
          Jo([
            "session.list",
            "session.new",
            "session.share",
            "session.interrupt",
            "session.compact",
            "session.page.up",
            "session.page.down",
            "session.line.up",
            "session.line.down",
            "session.half.page.up",
            "session.half.page.down",
            "session.first",
            "session.last",
            "prompt.clear",
            "prompt.submit",
            "agent.cycle",
          ]),
          re,
        ]),
      },
    })),
    (Lee = ua({
      type: "tui.toast.show",
      schema: {
        title: Gn(re),
        message: re,
        variant: Jo(["info", "success", "warning", "error"]),
        duration: qc.pipe(Vft(Jt(BFa))).annotate({ description: "Duration in milliseconds" }),
      },
    })),
    (nLe = ua({
      type: "tui.session.select",
      schema: { sessionID: gf.annotate({ description: "Session ID to navigate to" }) },
    })),
    (RFa = jl(rLe, pPe, Lee, nLe)));
});