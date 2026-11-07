
var Cns = ne(async () => {
  ijt();
  Gt();
  $H();
  iwr();
  jwr();
  await Jn([ZL(), e$(), Jy()]);
  ((UoH = {
    session_new: "session.new",
    session_share: "session.share",
    session_interrupt: "session.interrupt",
    session_compact: "session.compact",
    messages_page_up: "session.page.up",
    messages_page_down: "session.page.down",
    messages_line_up: "session.line.up",
    messages_line_down: "session.line.down",
    messages_half_page_up: "session.half.page.up",
    messages_half_page_down: "session.half.page.down",
    messages_first: "session.first",
    messages_last: "session.last",
    agent_cycle: "agent.cycle",
  }),
    (Pns = Kd(eh, "tui", (e) =>
      ft(function* () {
        let t = yield* B$,
          r = yield* Mg,
          s = (B) => t.publish(pPe, { command: B }),
          a = Ge("TuiHttpApi.appendPrompt")(function* (B) {
            return (yield* t.publish(rLe, B.payload), !0);
          }),
          H = Ge("TuiHttpApi.openHelp")(function* () {
            return (yield* s("help.show"), !0);
          }),
          u = Ge("TuiHttpApi.openSessions")(function* () {
            return (yield* s("session.list"), !0);
          }),
          f = Ge("TuiHttpApi.openThemes")(function* () {
            return (yield* s("session.list"), !0);
          }),
          d = Ge("TuiHttpApi.openModels")(function* () {
            return (yield* s("model.list"), !0);
          }),
          _ = Ge("TuiHttpApi.submitPrompt")(function* () {
            return (yield* s("prompt.submit"), !0);
          }),
          L = Ge("TuiHttpApi.clearPrompt")(function* () {
            return (yield* s("prompt.clear"), !0);
          }),
          I = Ge("TuiHttpApi.executeCommand")(function* (B) {
            return (yield* s(UoH[B.payload.command]), !0);
          }),
          D = Ge("TuiHttpApi.showToast")(function* (B) {
            return (yield* t.publish(Lee, B.payload), !0);
          }),
          S = Ge("TuiHttpApi.publish")(function* (B) {
            if (B.payload.type === rLe.type) yield* t.publish(rLe, B.payload.properties);
            if (B.payload.type === pPe.type) yield* t.publish(pPe, B.payload.properties);
            if (B.payload.type === Lee.type) yield* t.publish(Lee, B.payload.properties);
            if (B.payload.type === nLe.type) yield* t.publish(nLe, B.payload.properties);
            return !0;
          }),
          T = Ge("TuiHttpApi.selectSession")(function* (B) {
            if (!B.payload.sessionID.startsWith("ses")) return yield* new PA({});
            return (yield* vJ(r.get(B.payload.sessionID)), yield* t.publish(nLe, B.payload), !0);
          }),
          C = Ge("TuiHttpApi.controlNext")(function* () {
            return yield* nA(() => $ts());
          }),
          O = Ge("TuiHttpApi.controlResponse")(function* (B) {
            return (gts(B.payload), !0);
          });
        return e
          .handle("appendPrompt", a)
          .handle("openHelp", H)
          .handle("openSessions", u)
          .handle("openThemes", f)
          .handle("openModels", d)
          .handle("submitPrompt", _)
          .handle("clearPrompt", L)
          .handle("executeCommand", I)
          .handle("showToast", D)
          .handle("publish", S)
          .handle("selectSession", T)
          .handle("controlNext", C)
          .handle("controlResponse", O);
      }),
    )));
});