
var Bse = ne(() => {
  Bse();
  Gt();
  Hu();
  g_();
  EMe();
  Z_t();
  tV();
  Hu();
  ZMe();
  aw();
  I1();
  SY();
  exe();
  ((WVH = nt({ start: Ko, end: Ko, text: re }).annotate({ identifier: "session.next.event.source" })),
    (Y0 = { timestamp: Iy, sessionID: gf }),
    (myn = { ...Y0, messageID: wf, prompt: q6, delivery: xir }),
    (n0 = { durable: { aggregate: "sessionID", version: 1 } }),
    (dyn = { durable: { aggregate: "sessionID", version: 2 } }),
    (_yn = Sir),
    (rht = ua({ type: "session.next.agent.switched", ...n0, schema: { ...Y0, messageID: wf, agent: re } })),
    (nht = ua({ type: "session.next.model.switched", ...n0, schema: { ...Y0, messageID: wf, model: IG } })),
    (iht = ua({
      type: "session.next.moved",
      ...n0,
      schema: { ...Y0, location: Rv, subdirectory: du.pipe(Gn) },
    })),
    (sht = ua({ type: "session.next.prompted", ...n0, schema: myn })),
    (oht = ua({ type: "session.next.prompt.admitted", ...n0, schema: myn })),
    (aht = ua({ type: "session.next.context.updated", ...n0, schema: { ...Y0, messageID: wf, text: re } })),
    (Tir = ua({ type: "session.next.synthetic", ...n0, schema: { ...Y0, messageID: wf, text: re } })));
  ((r) => (
    (r.Started = ua({
      type: "session.next.shell.started",
      ...n0,
      schema: { ...Y0, messageID: wf, callID: re, command: re },
    })),
    (r.Ended = ua({ type: "session.next.shell.ended", ...n0, schema: { ...Y0, callID: re, output: re } }))
  ))((Gde ||= {}));
  ((s) => (
    (s.Started = ua({
      type: "session.next.step.started",
      ...n0,
      schema: { ...Y0, assistantMessageID: wf, agent: re, model: IG, snapshot: re.pipe(Gn) },
    })),
    (s.Ended = ua({
      type: "session.next.step.ended",
      ...dyn,
      schema: {
        ...Y0,
        assistantMessageID: wf,
        finish: re,
        cost: mo,
        tokens: nt({ input: mo, output: mo, reasoning: mo, cache: nt({ read: mo, write: mo }) }),
        snapshot: re.pipe(Gn),
        files: On(du).pipe(Gn),
      },
    })),
    (s.Failed = ua({
      type: "session.next.step.failed",
      ...dyn,
      schema: { ...Y0, assistantMessageID: wf, error: _yn },
    }))
  ))((QU ||= {}));
  ((s) => (
    (s.Started = ua({
      type: "session.next.text.started",
      ...n0,
      schema: { ...Y0, assistantMessageID: wf, textID: re },
    })),
    (s.Delta = ua({
      type: "session.next.text.delta",
      schema: { ...Y0, assistantMessageID: wf, textID: re, delta: re },
    })),
    (s.Ended = ua({
      type: "session.next.text.ended",
      ...n0,
      schema: { ...Y0, assistantMessageID: wf, textID: re, text: re },
    }))
  ))((gV ||= {}));
  ((s) => (
    (s.Started = ua({
      type: "session.next.reasoning.started",
      ...n0,
      schema: { ...Y0, assistantMessageID: wf, reasoningID: re, providerMetadata: gp.pipe(Gn) },
    })),
    (s.Delta = ua({
      type: "session.next.reasoning.delta",
      schema: { ...Y0, assistantMessageID: wf, reasoningID: re, delta: re },
    })),
    (s.Ended = ua({
      type: "session.next.reasoning.ended",
      ...n0,
      schema: { ...Y0, assistantMessageID: wf, reasoningID: re, text: re, providerMetadata: gp.pipe(Gn) },
    }))
  ))((EV ||= {}));
  ((u) => {
    let e = { ...Y0, assistantMessageID: wf, callID: re },
      t;
    (((L) => (
      (L.Started = ua({ type: "session.next.tool.input.started", ...n0, schema: { ...e, name: re } })),
      (L.Delta = ua({ type: "session.next.tool.input.delta", schema: { ...e, delta: re } })),
      (L.Ended = ua({ type: "session.next.tool.input.ended", ...n0, schema: { ...e, text: re } }))
    ))((t = u.Input ||= {})),
      (u.Called = ua({
        type: "session.next.tool.called",
        ...n0,
        schema: { ...e, tool: re, input: ks(re, PH), provider: nt({ executed: Vi, metadata: gp.pipe(Gn) }) },
      })),
      (u.Progress = ua({
        type: "session.next.tool.progress",
        ...n0,
        schema: { ...e, structured: ks(re, PH), content: On(kG) },
      })),
      (u.Success = ua({
        type: "session.next.tool.success",
        ...n0,
        schema: {
          ...e,
          structured: ks(re, PH),
          content: On(kG),
          outputPaths: On(re).pipe(Gn),
          result: PH.pipe(Gn),
          provider: nt({ executed: Vi, metadata: gp.pipe(Gn) }),
        },
      })),
      (u.Failed = ua({
        type: "session.next.tool.failed",
        ...n0,
        schema: {
          ...e,
          error: _yn,
          result: PH.pipe(Gn),
          provider: nt({ executed: Vi, metadata: gp.pipe(Gn) }),
        },
      })));
  })((GL ||= {}));
  ((YQs = nt({
    message: re,
    statusCode: mo.pipe(Gn),
    isRetryable: Vi,
    responseHeaders: ks(re, re).pipe(Gn),
    responseBody: re.pipe(Gn),
    metadata: ks(re, re).pipe(Gn),
  }).annotate({ identifier: "session.next.retry_error" })),
    (hyn = ua({ type: "session.next.retried", ...n0, schema: { ...Y0, attempt: mo, error: YQs } })));
  ((s) => (
    (s.Started = ua({
      type: "session.next.compaction.started",
      ...n0,
      schema: { ...Y0, messageID: wf, reason: Io([ri("auto"), ri("manual")]) },
    })),
    (s.Delta = ua({ type: "session.next.compaction.delta", schema: { ...Y0, messageID: wf, text: re } })),
    (s.Ended = ua({
      type: "session.next.compaction.ended",
      ...n0,
      schema: { ...Y0, messageID: wf, reason: s.Started.data.fields.reason, text: re, recent: re },
    }))
  ))((TY ||= {}));
  ((s) => (
    (s.Staged = ua({ type: "session.next.revert.staged", ...n0, schema: { ...Y0, revert: tht } })),
    (s.Cleared = ua({ type: "session.next.revert.cleared", ...n0, schema: Y0 })),
    (s.Committed = ua({ type: "session.next.revert.committed", ...n0, schema: { ...Y0, messageID: wf } }))
  ))((YU ||= {}));
  ((vir = jl(
    rht,
    nht,
    iht,
    sht,
    oht,
    aht,
    Tir,
    Gde.Started,
    Gde.Ended,
    QU.Started,
    QU.Ended,
    QU.Failed,
    gV.Started,
    gV.Ended,
    GL.Input.Started,
    GL.Input.Ended,
    GL.Called,
    GL.Progress,
    GL.Success,
    GL.Failed,
    EV.Started,
    EV.Ended,
    hyn,
    TY.Started,
    TY.Ended,
    YU.Staged,
    YU.Cleared,
    YU.Committed,
  )),
    (Lyn = jl(
      rht,
      nht,
      iht,
      sht,
      oht,
      aht,
      Tir,
      Gde.Started,
      Gde.Ended,
      QU.Started,
      QU.Ended,
      QU.Failed,
      gV.Started,
      gV.Delta,
      gV.Ended,
      EV.Started,
      EV.Delta,
      EV.Ended,
      GL.Input.Started,
      GL.Input.Delta,
      GL.Input.Ended,
      GL.Called,
      GL.Progress,
      GL.Success,
      GL.Failed,
      hyn,
      TY.Started,
      TY.Delta,
      TY.Ended,
      YU.Staged,
      YU.Cleared,
      YU.Committed,
    )),
    (Hht = Io(vir, { mode: "oneOf" }).pipe(_D("type")).annotate({ identifier: "SessionDurableEvent" })),
    (ZQs = Io(Lyn, { mode: "oneOf" }).pipe(_D("type"))));
});