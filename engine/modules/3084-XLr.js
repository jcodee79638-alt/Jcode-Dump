
var XLr = ne(() => {
  Gt();
  kse();
  UG();
  gY();
  Bde();
  FMe();
  GS();
  FG();
  XMt();
  qqe();
  BMt();
  Gqe();
  XLr();
  ((zfa = new Set(wMe)),
    (Zfa = nt({ name: re, description: re, parameters: CMe })),
    (epa = nt({ type: Vc("function"), function: Zfa })),
    (tpa = nt({ id: re, type: Vc("function"), function: nt({ name: re, arguments: re }) })),
    (rpa = Io([
      nt({ type: ri("text"), text: re }),
      nt({ type: ri("image_url"), image_url: nt({ url: re }) }),
    ])),
    (npa = Io([
      nt({ role: ri("system"), content: re }),
      nt({ role: ri("user"), content: Io([re, On(rpa)]) }),
      nt({ role: ri("assistant"), content: w6(re), tool_calls: hV(tpa), reasoning_content: be(re) }),
      nt({ role: ri("tool"), tool_call_id: re, content: re }),
    ]).pipe(_D("role"))),
    (ipa = Io([Jo(["auto", "none", "required"]), nt({ type: Vc("function"), function: nt({ name: re }) })])),
    (spa = {
      model: re,
      messages: On(npa),
      tools: hV(epa),
      tool_choice: be(ipa),
      stream: ri(!0),
      stream_options: be(nt({ include_usage: Vi })),
      store: be(Vi),
      reasoning_effort: be(zIi),
      max_tokens: be(Aa),
      temperature: be(Aa),
      top_p: be(Aa),
      frequency_penalty: be(Aa),
      presence_penalty: be(Aa),
      seed: be(Aa),
      stop: hV(re),
    }),
    (opa = nt(spa)),
    (apa = nt({
      prompt_tokens: be(Aa),
      completion_tokens: be(Aa),
      total_tokens: be(Aa),
      prompt_tokens_details: AL(nt({ cached_tokens: be(Aa) })),
      completion_tokens_details: AL(nt({ reasoning_tokens: be(Aa) })),
    })),
    (Hpa = nt({ name: AL(re), arguments: AL(re) })),
    (cpa = nt({ index: Aa, id: AL(re), function: AL(Hpa) })),
    (Apa = nt({ content: AL(re), reasoning_content: AL(re), tool_calls: AL(On(cpa)) })),
    (upa = nt({ delta: AL(Apa), finish_reason: AL(re) })),
    (lpa = nt({ choices: On(upa), usage: AL(apa) })),
    (fpa = XS),
    (ZIi = Ge("OpenAIChat.lowerMedia")(function* (e) {
      return { type: "image_url", image_url: { url: (yield* v_t("OpenAI Chat", e, zfa)).dataUrl } };
    })),
    (hpa = Ge("OpenAIChat.lowerUserMessage")(function* (e) {
      let t = [];
      for (let r of e.content) {
        if (r.type === "text") {
          t.push({ type: "text", text: r.text });
          continue;
        }
        if (r.type === "media") {
          t.push(yield* ZIi(r));
          continue;
        }
        return yield* $Y("OpenAI Chat", "user", ["text", "media"]);
      }
      if (t.every((r) => r.type === "text")) return { role: "user", content: t.map((r) => r.text).join("") };
      return { role: "user", content: t };
    })),
    (Lpa = Ge("OpenAIChat.lowerAssistantMessage")(function* (e) {
      let t = [],
        r = [],
        s = [];
      for (let a of e.content) {
        if (!aWe(a, ["text", "reasoning", "tool-call"]))
          return yield* $Y("OpenAI Chat", "assistant", ["text", "reasoning", "tool-call"]);
        if (a.type === "text") {
          t.push(a);
          continue;
        }
        if (a.type === "reasoning") {
          r.push(a);
          continue;
        }
        if (a.type === "tool-call") {
          s.push(mpa(a));
          continue;
        }
      }
      return {
        role: "assistant",
        content: t.length === 0 ? null : T_t(t),
        tool_calls: s.length === 0 ? void 0 : s,
        reasoning_content: r.length > 0 ? r.map((a) => a.text).join("") : _pa(e.native?.openaiCompatible),
      };
    })),
    (eDi = Ge("OpenAIChat.lowerToolMessages")(function* (e) {
      let t = [],
        r = [];
      for (let s of e.content) {
        if (!aWe(s, ["tool-result"])) return yield* $Y("OpenAI Chat", "tool", ["tool-result"]);
        if (s.result.type !== "content") {
          t.push({ role: "tool", tool_call_id: s.id, content: qnr(s) });
          continue;
        }
        let a = s.result.value,
          H = a.filter((f) => f.type === "text").map((f) => f.text);
        t.push({
          role: "tool",
          tool_call_id: s.id,
          content: H.join(`
`),
        });
        let u = a.filter((f) => f.type === "file");
        r.push(
          ...(yield* ja(u, (f) => ZIi({ type: "media", mediaType: f.mime, data: f.uri, filename: f.name }))),
        );
      }
      return { messages: t, images: r };
    })),
    ($pa = Ge("OpenAIChat.lowerMessage")(function* (e) {
      if (e.role === "user") return [yield* hpa(e)];
      if (e.role === "assistant") return [yield* Lpa(e)];
      return (yield* eDi(e)).messages;
    })),
    (gpa = Ge("OpenAIChat.lowerMessages")(function* (e) {
      let r = [...(e.system.length === 0 ? [] : [{ role: "system", content: T_t(e.system) }])],
        s = [],
        a = () => {
          if (s.length === 0) return;
          r.push({ role: "user", content: s.splice(0) });
        };
      for (let H of e.messages) {
        if (H.role === "system") {
          let u = yield* Vnr("OpenAI Chat", H);
          if (s.length > 0) {
            r.push({ role: "user", content: [...s.splice(0), { type: "text", text: u.text }] });
            continue;
          }
          let f = r.at(-1);
          if (f?.role === "user" && typeof f.content === "string")
            r[r.length - 1] = {
              role: "user",
              content: `${f.content}
${u.text}`,
            };
          else if (f?.role === "user" && Array.isArray(f.content))
            r[r.length - 1] = { role: "user", content: [...f.content, { type: "text", text: u.text }] };
          else r.push({ role: "user", content: u.text });
          continue;
        }
        if (H.role === "tool") {
          let u = yield* eDi(H);
          (r.push(...u.messages), s.push(...u.images));
          continue;
        }
        (a(), r.push(...(yield* $pa(H))));
      }
      return (a(), r);
    })),
    (Epa = Ge("OpenAIChat.lowerOptions")(function* (e) {
      let t = GMt(e),
        r = YIi(e);
      if (r && !QIi(r)) return yield* fpa(`OpenAI Chat does not support reasoning effort ${r}`);
      return { ...(t !== void 0 ? { store: t } : {}), ...(r ? { reasoning_effort: r } : {}) };
    })),
    (Ipa = Ge("OpenAIChat.fromRequest")(function* (e) {
      let t = e.generation,
        r = e.model.compatibility?.toolSchema;
      return {
        model: e.model.id,
        messages: yield* gpa(e),
        tools:
          e.tools.length === 0
            ? void 0
            : e.tools.map((s) => ppa(s, Kae.modelCompatibility(s.inputSchema, r))),
        tool_choice: e.toolChoice ? yield* dpa(e.toolChoice) : void 0,
        stream: !0,
        stream_options: { include_usage: !0 },
        max_tokens: t?.maxTokens,
        temperature: t?.temperature,
        top_p: t?.topP,
        frequency_penalty: t?.frequencyPenalty,
        presence_penalty: t?.presencePenalty,
        seed: t?.seed,
        stop: t?.stop,
        ...(yield* Epa(e)),
      };
    })),
    (GLr = nir({
      id: JMt,
      body: { schema: opa, from: Ipa },
      stream: {
        event: iir(lpa),
        initial: () => ({ tools: RMt(), toolCallEvents: [], lifecycle: wLr() }),
        step: Mpa,
        onHalt: xpa,
      },
    })),
    (Spa = RIn.with()),
    (Zyc = RG.make({
      id: JMt,
      provider: "openai",
      protocol: GLr,
      endpoint: b_t(Yfa, { baseURL: Qfa }),
      auth: Pse,
      transport: Spa,
    })));
});