
var uIn = ne(() => {
  Gt();
  MMe();
  rWe();
  l_t();
  wnr();
  Xv = class Xv extends (
    Pa("LLM.Usage")({
      inputTokens: be(Aa),
      outputTokens: be(Aa),
      nonCachedInputTokens: be(Aa),
      cacheReadInputTokens: be(Aa),
      cacheWriteInputTokens: be(Aa),
      reasoningTokens: be(Aa),
      totalTokens: be(Aa),
      providerMetadata: be(gp),
    })
  ) {
    get visibleOutputTokens() {
      return Math.max(0, (this.outputTokens ?? 0) - (this.reasoningTokens ?? 0));
    }
    static from(e) {
      return e instanceof Xv ? e : new Xv(e);
    }
  };
  ((qEn = nt({ type: Vc("step-start"), index: Aa }).annotate({ identifier: "LLM.Event.StepStart" })),
    (GEn = nt({ type: Vc("text-start"), id: Sse, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.TextStart",
    })),
    (XEn = nt({ type: Vc("text-delta"), id: Sse, text: re, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.TextDelta",
    })),
    (JEn = nt({ type: Vc("text-end"), id: Sse, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.TextEnd",
    })),
    (KEn = nt({ type: Vc("reasoning-start"), id: Sse, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.ReasoningStart",
    })),
    (zEn = nt({ type: Vc("reasoning-delta"), id: Sse, text: re, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.ReasoningDelta",
    })),
    (QEn = nt({ type: Vc("reasoning-end"), id: Sse, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.ReasoningEnd",
    })),
    (YEn = nt({ type: Vc("tool-input-start"), id: Tse, name: re, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.ToolInputStart",
    })),
    (ZEn = nt({ type: Vc("tool-input-delta"), id: Tse, name: re, text: re }).annotate({
      identifier: "LLM.Event.ToolInputDelta",
    })),
    (eIn = nt({ type: Vc("tool-input-end"), id: Tse, name: re, providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.ToolInputEnd",
    })),
    (tIn = nt({
      type: Vc("tool-call"),
      id: Tse,
      name: re,
      input: PH,
      providerExecuted: be(Vi),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Event.ToolCall" })),
    (rIn = nt({
      type: Vc("tool-result"),
      id: Tse,
      name: re,
      result: kde,
      output: be(_V),
      providerExecuted: be(Vi),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Event.ToolResult" })),
    (nIn = nt({
      type: Vc("tool-error"),
      id: Tse,
      name: re,
      message: re,
      error: be(yd()),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Event.ToolError" })),
    (iIn = nt({
      type: Vc("step-finish"),
      index: Aa,
      reason: DMe,
      usage: be(Xv),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Event.StepFinish" })),
    (sIn = nt({ type: Vc("finish"), reason: DMe, usage: be(Xv), providerMetadata: be(gp) }).annotate({
      identifier: "LLM.Event.Finish",
    })),
    ($_t = nt({
      type: Vc("provider-error"),
      message: re,
      classification: be(Cnr),
      retryable: be(Vi),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Event.ProviderError" })),
    (Gv = Io([qEn, GEn, XEn, JEn, KEn, zEn, QEn, YEn, ZEn, eIn, tIn, rIn, nIn, iIn, sIn, $_t]).pipe(
      _D("type"),
    )),
    (tA = Object.assign(Gv, {
      stepStart: qEn.make,
      textStart: (e) => GEn.make({ ...e, id: vMe(e.id) }),
      textDelta: (e) => XEn.make({ ...e, id: vMe(e.id) }),
      textEnd: (e) => JEn.make({ ...e, id: vMe(e.id) }),
      reasoningStart: (e) => KEn.make({ ...e, id: vMe(e.id) }),
      reasoningDelta: (e) => zEn.make({ ...e, id: vMe(e.id) }),
      reasoningEnd: (e) => QEn.make({ ...e, id: vMe(e.id) }),
      toolInputStart: (e) => YEn.make({ ...e, id: bMe(e.id) }),
      toolInputDelta: (e) => ZEn.make({ ...e, id: bMe(e.id) }),
      toolInputEnd: (e) => eIn.make({ ...e, id: bMe(e.id) }),
      toolCall: (e) => tIn.make({ ...e, id: bMe(e.id) }),
      toolResult: (e) =>
        rIn.make({
          ...e,
          id: bMe(e.id),
          output: e.output === void 0 ? void 0 : _V.make(e.output.structured, e.output.content),
        }),
      toolError: (e) => nIn.make({ ...e, id: bMe(e.id) }),
      stepFinish: (e) => iIn.make({ ...e, usage: e.usage === void 0 ? void 0 : Xv.from(e.usage) }),
      finish: (e) => sIn.make({ ...e, usage: e.usage === void 0 ? void 0 : Xv.from(e.usage) }),
      providerError: $_t.make,
      is: {
        stepStart: Gv.guards["step-start"],
        textStart: Gv.guards["text-start"],
        textDelta: Gv.guards["text-delta"],
        textEnd: Gv.guards["text-end"],
        reasoningStart: Gv.guards["reasoning-start"],
        reasoningDelta: Gv.guards["reasoning-delta"],
        reasoningEnd: Gv.guards["reasoning-end"],
        toolInputStart: Gv.guards["tool-input-start"],
        toolInputDelta: Gv.guards["tool-input-delta"],
        toolInputEnd: Gv.guards["tool-input-end"],
        toolCall: Gv.guards["tool-call"],
        toolResult: Gv.guards["tool-result"],
        toolError: Gv.guards["tool-error"],
        stepFinish: Gv.guards["step-finish"],
        finish: Gv.guards.finish,
        providerError: Gv.guards["provider-error"],
      },
    })));
  knr = class knr extends (
    Pa("LLM.PreparedRequest")({
      id: re,
      route: H_t,
      protocol: OEn,
      model: u_t,
      body: PH,
      metadata: be(ks(re, PH)),
    })
  ) {};
  jse = class jse extends (
    Pa("LLM.Response")({ message: fg, events: On(tA), usage: be(Xv), finishReason: DMe })
  ) {
    get text() {
      return oIn(this.events);
    }
    get reasoning() {
      return aIn(this.events);
    }
    get toolCalls() {
      return this.events.filter(tA.is.toolCall);
    }
  };
  ((d) => (
    (d.empty = vKs),
    (d.reduce = RKs),
    (d.complete = (_) =>
      _.finishReason === void 0
        ? void 0
        : new jse({
            message: _.message,
            events: [..._.events],
            usage: _.usage,
            finishReason: _.finishReason,
          })),
    (d.fromEvents = (_) => d.complete(_.reduce(d.reduce, d.empty()))),
    (d.text = (_) => oIn(_.events)),
    (d.usage = (_) => _.usage ?? TKs(_.events)),
    (d.toolCalls = (_) => _.events.filter(tA.is.toolCall)),
    (d.reasoning = (_) => aIn(_.events))
  ))((jse ||= {}));
});