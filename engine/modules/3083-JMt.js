
var JMt = "openai-chat",
  zfa,
  Qfa = "https://api.openai.com/v1",
  Yfa = "/chat/completions",
  Zfa,
  epa,
  tpa,
  rpa,
  npa,
  ipa,
  spa,
  opa,
  apa,
  Hpa,
  cpa,
  Apa,
  upa,
  lpa,
  fpa,
  ppa = (e, t) => ({
    type: "function",
    function: { name: e.name, description: e.description, parameters: Kae.openAI(t) },
  }),
  dpa = (e) =>
    Gnr("OpenAI Chat", e, {
      auto: () => "auto",
      none: () => "none",
      required: () => "required",
      tool: (t) => ({ type: "function", function: { name: t } }),
    }),
  mpa = (e) => ({ id: e.id, type: "function", function: { name: e.name, arguments: Cse(e.input) } }),
  ZIi,
  _pa = (e) => (K_(e) && typeof e.reasoning_content === "string" ? e.reasoning_content : void 0),
  hpa,
  Lpa,
  eDi,
  $pa,
  gpa,
  Epa,
  Ipa,
  Dpa = (e) => {
    if (e === "stop") return "stop";
    if (e === "length") return "length";
    if (e === "content_filter") return "content-filter";
    if (e === "function_call" || e === "tool_calls") return "tool-calls";
    return "unknown";
  },
  ypa = (e) => {
    if (!e) return;
    let t = e.prompt_tokens_details?.cached_tokens,
      r = e.completion_tokens_details?.reasoning_tokens,
      s = $In(e.prompt_tokens, t);
    return new Xv({
      inputTokens: e.prompt_tokens,
      outputTokens: e.completion_tokens,
      nonCachedInputTokens: s,
      cacheReadInputTokens: t,
      reasoningTokens: r,
      totalTokens: S_t(e.prompt_tokens, e.completion_tokens, e.total_tokens),
      providerMetadata: { openai: e },
    });
  },
  Mpa = (e, t) =>
    ft(function* () {
      let r = [],
        s = ypa(t.usage) ?? e.usage,
        a = t.choices[0],
        H = a?.finish_reason ? Dpa(a.finish_reason) : e.finishReason,
        u = a?.delta,
        f = u?.tool_calls ?? [],
        { tools: d, lifecycle: _ } = e;
      if (u?.reasoning_content) _ = OMt(_, r, "reasoning-0", u.reasoning_content);
      if (u?.content) ((_ = Jae(_, r, "reasoning-0")), (_ = wMt(_, r, "text-0", u.content)));
      if (f.length) _ = Jae(_, r, "reasoning-0");
      for (let I of f) {
        let D = jla(
          JMt,
          d,
          I.index,
          { id: I.id ?? void 0, name: I.function?.name ?? void 0, text: I.function?.arguments ?? "" },
          "OpenAI Chat tool call delta is missing id or name",
        );
        if (BLr(D)) return yield* D;
        if (((d = D.tools), D.events.length)) _ = fP(_, r);
        r.push(...D.events);
      }
      let L =
        H !== void 0 && e.finishReason === void 0 && Object.keys(d).length > 0 ? yield* Cla(JMt, d) : void 0;
      return [
        {
          tools: L?.tools ?? d,
          toolCallEvents: L?.events ?? e.toolCallEvents,
          usage: s,
          finishReason: H,
          lifecycle: _,
        },
        r,
      ];
    }),
  xpa = (e) => {
    let t = [],
      r = e.toolCallEvents.length > 0,
      s = e.finishReason === "stop" && r ? "tool-calls" : e.finishReason,
      a = e.toolCallEvents.length ? fP(e.lifecycle, t) : e.lifecycle;
    if ((t.push(...e.toolCallEvents), s)) kLr(a, t, { reason: s, usage: e.usage });
    return t;
  },
  GLr,
  Spa,
  Zyc;