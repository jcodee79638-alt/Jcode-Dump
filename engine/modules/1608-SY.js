
var SY = ne(() => {
  SY();
  Gt();
  Hu();
  EMe();
  tV();
  ZMe();
  Hu();
  aw();
  ((wf = re.check(k6("msg_")).pipe(
    Jl("Session.Message.ID"),
    Bl((e) => ({ create: () => e.make("msg_" + t0()) })),
  )),
    (Sir = nt({ type: ri("unknown"), message: re }).annotate({ identifier: "Session.Error.Unknown" })),
    (Fse = { id: wf, metadata: ks(re, PH).pipe(Gn), time: nt({ created: Iy }) }),
    (eyn = nt({ ...Fse, type: ri("agent-switched"), agent: re }).annotate({
      identifier: "Session.Message.AgentSwitched",
    })),
    (tyn = nt({ ...Fse, type: ri("model-switched"), model: IG }).annotate({
      identifier: "Session.Message.ModelSwitched",
    })),
    (ryn = nt({
      ...Fse,
      text: q6.fields.text,
      files: q6.fields.files,
      agents: q6.fields.agents,
      type: ri("user"),
    }).annotate({ identifier: "Session.Message.User" })),
    (nyn = nt({ ...Fse, sessionID: gf, text: re, type: ri("synthetic") }).annotate({
      identifier: "Session.Message.Synthetic",
    })),
    (iyn = nt({ ...Fse, type: ri("system"), text: re }).annotate({ identifier: "Session.Message.System" })),
    (syn = nt({
      ...Fse,
      type: ri("shell"),
      callID: re,
      command: re,
      output: re,
      time: nt({ created: Iy, completed: Iy.pipe(Gn) }),
    }).annotate({ identifier: "Session.Message.Shell" })),
    (oyn = nt({ status: ri("pending"), input: re }).annotate({
      identifier: "Session.Message.ToolState.Pending",
    })),
    (ayn = nt({
      status: ri("running"),
      input: ks(re, PH),
      structured: ks(re, PH),
      content: kG.pipe(On),
    }).annotate({ identifier: "Session.Message.ToolState.Running" })),
    (Hyn = nt({
      status: ri("completed"),
      input: ks(re, PH),
      attachments: $We.pipe(On, Gn),
      content: kG.pipe(On),
      outputPaths: On(re).pipe(Gn),
      structured: ks(re, PH),
      result: PH.pipe(Gn),
    }).annotate({ identifier: "Session.Message.ToolState.Completed" })),
    (cyn = nt({
      status: ri("error"),
      input: ks(re, PH),
      content: kG.pipe(On),
      structured: ks(re, PH),
      error: Sir,
      result: PH.pipe(Gn),
    }).annotate({ identifier: "Session.Message.ToolState.Error" })),
    (KQs = Io([oyn, ayn, Hyn, cyn]).pipe(_D("status"))),
    (Ayn = nt({
      type: ri("tool"),
      id: re,
      name: re,
      provider: nt({ executed: Vi, metadata: gp.pipe(Gn), resultMetadata: gp.pipe(Gn) }).pipe(Gn),
      state: KQs,
      time: nt({ created: Iy, ran: Iy.pipe(Gn), completed: Iy.pipe(Gn), pruned: Iy.pipe(Gn) }),
    }).annotate({ identifier: "Session.Message.Assistant.Tool" })),
    (uyn = nt({ type: ri("text"), id: re, text: re }).annotate({
      identifier: "Session.Message.Assistant.Text",
    })),
    (lyn = nt({
      type: ri("reasoning"),
      id: re,
      text: re,
      providerMetadata: gp.pipe(Gn),
      time: nt({ created: Iy, completed: Iy.pipe(Gn) }).pipe(Gn),
    }).annotate({ identifier: "Session.Message.Assistant.Reasoning" })),
    (zQs = Io([uyn, lyn, Ayn]).pipe(_D("type"))),
    (fyn = nt({
      ...Fse,
      type: ri("assistant"),
      agent: re,
      model: IG,
      content: zQs.pipe(On),
      snapshot: nt({ start: re.pipe(Gn), end: re.pipe(Gn), files: On(du).pipe(Gn) }).pipe(Gn),
      finish: re.pipe(Gn),
      cost: mo.pipe(Gn),
      tokens: nt({ input: mo, output: mo, reasoning: mo, cache: nt({ read: mo, write: mo }) }).pipe(Gn),
      error: Sir.pipe(Gn),
      time: nt({ created: Iy, completed: Iy.pipe(Gn) }),
    }).annotate({ identifier: "Session.Message.Assistant" })),
    (pyn = nt({
      type: ri("compaction"),
      reason: Jo(["auto", "manual"]),
      summary: re,
      recent: re,
      ...Fse,
    }).annotate({ identifier: "Session.Message.Compaction" })),
    (xY = Io([eyn, tyn, ryn, nyn, iyn, syn, fyn, pyn])
      .pipe(_D("type"))
      .annotate({ identifier: "Session.Message" })));
});