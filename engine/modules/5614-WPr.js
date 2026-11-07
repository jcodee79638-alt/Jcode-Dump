
var WPr = ne(async () => {
  Gt();
  jA();
  Ql();
  Ry();
  zzi();
  Yzi();
  Zzi();
  await Jn([jI(), e$(), WPr()]);
  eYa = Ge("SessionReminders.apply")(function* (e) {
    let t = yield* NE,
      r = yield* ui.Service,
      s = yield* Mg,
      a = e.messages.findLast((L) => L.info.role === "user");
    if (!a) return e.messages;
    if (!t.experimentalPlanMode) {
      if (e.agent.name === "plan")
        a.parts.push({
          id: Zp.ascending(),
          messageID: a.info.id,
          sessionID: a.info.sessionID,
          type: "text",
          text: Qzi,
          synthetic: !0,
        });
      if (
        e.messages.some((I) => I.info.role === "assistant" && I.info.agent === "plan") &&
        e.agent.name === "build"
      )
        a.parts.push({
          id: Zp.ascending(),
          messageID: a.info.id,
          sessionID: a.info.sessionID,
          type: "text",
          text: owt,
          synthetic: !0,
        });
      return e.messages;
    }
    let H = e.messages.findLast((L) => L.info.role === "assistant");
    if (e.agent.name !== "plan" && H?.info.agent === "plan") {
      let L = yield* Jc,
        I = mvt(e.session, L),
        D = yield* r.existsSafe(I),
        S = yield* s.updatePart({
          id: Zp.ascending(),
          messageID: a.info.id,
          sessionID: a.info.sessionID,
          type: "text",
          text: D
            ? `${owt}

A plan file exists at ${I}. You should execute on the plan defined within it`
            : owt,
          synthetic: !0,
        });
      return (a.parts.push(S), e.messages);
    }
    if (e.agent.name !== "plan" || H?.info.agent === "plan") return e.messages;
    let u = yield* Jc,
      f = mvt(e.session, u),
      d = yield* r.existsSafe(f);
    if (!d) yield* r.ensureDir(ZQa.dirname(f)).pipe($s(No));
    let _ = yield* s.updatePart({
      id: Zp.ascending(),
      messageID: a.info.id,
      sessionID: a.info.sessionID,
      type: "text",
      text: eQi.replace("${planInfo}", () =>
        d
          ? `A plan file already exists at ${f}. You can read it and make incremental edits using the edit tool.`
          : `No plan file exists yet. You should create your plan at ${f} using the write tool.`,
      ),
      synthetic: !0,
    });
    return (a.parts.push(_), e.messages);
  });
});