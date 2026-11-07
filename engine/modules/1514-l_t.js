
var l_t = ne(() => {
  Gt();
  EMe();
  MMe();
  rWe();
  ((gKs = nt({ type: ri("text"), text: re, cache: be(LY), metadata: be(ks(re, PH)) }).annotate({
    identifier: "LLM.SystemPart",
  })),
    (nWe = Object.assign(gKs, {
      make: REn,
      content: (e) => {
        if (e === void 0) return [];
        return typeof e === "string" ? [REn(e)] : Array.isArray(e) ? [...e] : [e];
      },
    })),
    (EKs = nt({
      type: ri("text"),
      text: re,
      cache: be(LY),
      metadata: be(ks(re, PH)),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Content.Text" })),
    (IKs = nt({
      type: ri("media"),
      mediaType: re,
      data: Io([re, NAn]),
      filename: be(re),
      metadata: be(ks(re, PH)),
    }).annotate({ identifier: "LLM.Content.Media" })),
    (kde = Object.assign(
      Io([
        nt({ type: ri("json"), value: PH }),
        nt({ type: ri("text"), value: PH }),
        nt({ type: ri("error"), value: PH }),
        nt({ type: ri("content"), value: On(kG) }),
      ]).annotate({ identifier: "LLM.ToolResult" }),
      {
        is: WEn,
        make: (e, t = "json") => {
          if (WEn(e)) return e;
          if (t === "content") return { type: t, value: Array.isArray(e) ? e : [] };
          return { type: t, value: e };
        },
      },
    )),
    (_V = Object.assign(nt({ structured: PH, content: On(kG) }).annotate({ identifier: "LLM.ToolOutput" }), {
      make: (e, t = []) => ({ structured: e, content: t }),
      fromResultValue: (e) => {
        switch (e.type) {
          case "json":
            return { structured: e.value, content: [] };
          case "text":
            return { structured: {}, content: [{ type: "text", text: DKs(e.value) }] };
          case "content":
            return { structured: {}, content: e.value };
          case "error":
            return;
        }
      },
      toResultValue: (e) => {
        if (e.content.length === 0) return { type: "json", value: e.structured };
        if (e.content.length === 1 && e.content[0]?.type === "text")
          return { type: "text", value: e.content[0].text };
        return { type: "content", value: e.content };
      },
    })),
    (iWe = Object.assign(
      nt({
        type: ri("tool-call"),
        id: re,
        name: re,
        input: PH,
        providerExecuted: be(Vi),
        metadata: be(ks(re, PH)),
        providerMetadata: be(gp),
      }).annotate({ identifier: "LLM.Content.ToolCall" }),
      { make: (e) => ({ type: "tool-call", ...e }) },
    )),
    (Ode = Object.assign(
      nt({
        type: ri("tool-result"),
        id: re,
        name: re,
        result: kde,
        providerExecuted: be(Vi),
        cache: be(LY),
        metadata: be(ks(re, PH)),
        providerMetadata: be(gp),
      }).annotate({ identifier: "LLM.Content.ToolResult" }),
      {
        make: (e) => ({
          type: "tool-result",
          id: e.id,
          name: e.name,
          result: kde.make(e.result, e.resultType),
          providerExecuted: e.providerExecuted,
          cache: e.cache,
          metadata: e.metadata,
          providerMetadata: e.providerMetadata,
        }),
      },
    )),
    (yKs = nt({
      type: ri("reasoning"),
      text: re,
      encrypted: be(re),
      metadata: be(ks(re, PH)),
      providerMetadata: be(gp),
    }).annotate({ identifier: "LLM.Content.Reasoning" })),
    (MKs = Io([EKs, IKs, iWe, Ode, yKs]).pipe(_D("type"))));
  fg = class fg extends (
    Pa("LLM.Message")({
      id: be(re),
      role: NEn,
      content: On(MKs),
      metadata: be(ks(re, PH)),
      native: be(ks(re, PH)),
    })
  ) {};
  ((f) => (
    (f.text = (d) => ({ type: "text", text: d })),
    (f.content = (d) => (typeof d === "string" ? [f.text(d)] : Array.isArray(d) ? [...d] : [d])),
    (f.make = (d) => {
      if (d instanceof fg) return d;
      return new fg({ ...d, content: f.content(d.content) });
    }),
    (f.user = (d) => f.make({ role: "user", content: d })),
    (f.assistant = (d) => f.make({ role: "assistant", content: d })),
    (f.system = (d) => f.make({ role: "system", content: d })),
    (f.tool = (d) => f.make({ role: "tool", content: ["type" in d ? d : Ode.make(d)] }))
  ))((fg ||= {}));
  Wj = class Wj extends (
    Pa("LLM.ToolDefinition")({
      name: re,
      description: re,
      inputSchema: yMe,
      outputSchema: be(yMe),
      cache: be(LY),
      metadata: be(ks(re, PH)),
      native: be(ks(re, PH)),
    })
  ) {};
  ((t) => (t.make = (r) => (r instanceof Wj ? r : new Wj(r))))((Wj ||= {}));
  dV = class dV extends (
    Pa("LLM.ToolChoice")({ type: Jo(["auto", "none", "required", "tool"]), name: be(re) })
  ) {};
  ((s) => {
    let e = (a) => a === "auto" || a === "none" || a === "required";
    ((s.named = (a) => new dV({ type: "tool", name: a })),
      (s.make = (a) => {
        if (a instanceof dV) return a;
        if (a instanceof Wj) return s.named(a.name);
        if (typeof a === "string") return e(a) ? new dV({ type: a }) : s.named(a);
        return new dV(a);
      }));
  })((dV ||= {}));
  xKs = Io([
    nt({ type: ri("text") }),
    nt({ type: ri("json"), schema: yMe }),
    nt({ type: ri("tool"), tool: Wj }),
  ]).pipe(_D("type"));
  mV = class mV extends (
    Pa("LLM.Request")({
      id: be(re),
      model: u_t,
      system: On(nWe),
      messages: On(fg),
      tools: On(Wj),
      toolChoice: be(dV),
      generation: be(mw),
      providerOptions: be(vnr),
      http: be(dw),
      responseFormat: be(xKs),
      cache: be(BEn),
      metadata: be(ks(re, PH)),
    })
  ) {};
  ((r) => (
    (r.input = (s) => ({
      id: s.id,
      model: s.model,
      system: s.system,
      messages: s.messages,
      tools: s.tools,
      toolChoice: s.toolChoice,
      generation: s.generation,
      providerOptions: s.providerOptions,
      http: s.http,
      responseFormat: s.responseFormat,
      cache: s.cache,
      metadata: s.metadata,
    })),
    (r.update = (s, a) => {
      if (Object.keys(a).length === 0) return s;
      return new mV({ ...r.input(s), ...a, model: a.model ?? s.model });
    })
  ))((mV ||= {}));
});