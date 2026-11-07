
var qMt = "anthropic-messages",
  wla = "https://api.anthropic.com/v1",
  kla = "/messages",
  zae,
  Xqe,
  BIi,
  Ola,
  Ula,
  Nla,
  Fla,
  Bla,
  Rla,
  Wla,
  Vla,
  qla,
  Gla,
  Xla,
  Jla,
  Kla,
  zla,
  Qla,
  NIi,
  Yla,
  Zla,
  efa,
  VMt,
  FIi = 4,
  tfa,
  rfa,
  Y_e = (e, t) => {
    if (t?.type !== "ephemeral" && t?.type !== "persistent") return;
    if (e.remaining <= 0) {
      e.dropped += 1;
      return;
    }
    return ((e.remaining -= 1), TIi(t.ttlSeconds) === "1h" ? rfa : tfa);
  },
  WLr = (e) => ({ anthropic: e }),
  nfa = (e) => {
    let t = e?.anthropic;
    if (!K_(t)) return;
    return typeof t.signature === "string" ? t.signature : void 0;
  },
  ifa = (e, t, r) => ({
    name: t.name,
    description: t.description,
    input_schema: r,
    cache_control: Y_e(e, t.cache),
  }),
  sfa = (e) =>
    Gnr("Anthropic Messages", e, {
      auto: () => ({ type: "auto" }),
      none: () => {
        return;
      },
      required: () => ({ type: "any" }),
      tool: (t) => ({ type: "tool", name: t }),
    }),
  ofa = (e) => ({ type: "tool_use", id: e.id, name: e.name, input: e.input }),
  afa = (e) => ({ type: "server_tool_use", id: e.id, name: e.name, input: e.input }),
  Hfa = (e) => {
    if (e === "web_search") return "web_search_tool_result";
    if (e === "code_execution") return "code_execution_tool_result";
    if (e === "web_fetch") return "web_fetch_tool_result";
    return;
  },
  cfa,
  Afa,
  ufa,
  lfa,
  ffa = (e) => String(e.model.id) === "claude-opus-4-8",
  pfa = (e) => {
    let t = e.content.at(-1);
    return e.role === "assistant" && t?.type === "tool-call" && t.providerExecuted === !0;
  },
  dfa = (e, t) => {
    let r = e[t - 1],
      s = e[t + 1];
    return (
      r !== void 0 &&
      r.role !== "system" &&
      (r.role === "user" || r.role === "tool" || pfa(r)) &&
      s?.role !== "system" &&
      (s === void 0 || s.role === "assistant")
    );
  },
  mfa = (e, t) => {
    let r = new Set();
    for (let s of e.slice(0, t))
      for (let a of s.content) {
        if (s.role === "assistant" && a.type === "tool-call" && a.providerExecuted !== !0) r.add(a.id);
        if (s.role === "tool" && a.type === "tool-result") r.delete(a.id);
      }
    return r.size > 0;
  },
  _fa,
  hfa,
  Lfa = (e) => e.providerOptions?.anthropic,
  $fa,
  gfa,
  Efa = (e) => {
    if (e === "end_turn" || e === "stop_sequence" || e === "pause_turn") return "stop";
    if (e === "max_tokens") return "length";
    if (e === "tool_use") return "tool-calls";
    if (e === "refusal") return "content-filter";
    return "unknown";
  },
  RIi = (e) => {
    if (!e) return;
    let t = e.input_tokens,
      r = e.cache_read_input_tokens ?? void 0,
      s = e.cache_creation_input_tokens ?? void 0,
      a = gIn(t, r, s);
    return new Xv({
      inputTokens: a,
      outputTokens: e.output_tokens,
      nonCachedInputTokens: t,
      cacheReadInputTokens: r,
      cacheWriteInputTokens: s,
      totalTokens: S_t(a, e.output_tokens, void 0),
      providerMetadata: { anthropic: e },
    });
  },
  WIi = (e, t) => {
    if (!e) return t;
    if (!t) return e;
    let r = t.nonCachedInputTokens ?? e.nonCachedInputTokens,
      s = t.cacheReadInputTokens ?? e.cacheReadInputTokens,
      a = t.cacheWriteInputTokens ?? e.cacheWriteInputTokens,
      H = gIn(r, s, a),
      u = t.outputTokens ?? e.outputTokens;
    return new Xv({
      inputTokens: H,
      outputTokens: u,
      nonCachedInputTokens: r,
      cacheReadInputTokens: s,
      cacheWriteInputTokens: a,
      totalTokens: S_t(H, u, void 0),
      providerMetadata: { anthropic: { ...e.providerMetadata?.anthropic, ...t.providerMetadata?.anthropic } },
    });
  },
  VIi,
  Ifa = (e) => e in VIi,
  Dfa = (e) => {
    if (!e.type || !Ifa(e.type)) return;
    let r = (
      typeof e.content === "object" && e.content !== null && "type" in e.content ? String(e.content.type) : ""
    ).endsWith("_tool_result_error");
    return tA.toolResult({
      id: e.tool_use_id ?? "",
      name: VIi[e.type],
      result: r ? { type: "error", value: e.content } : { type: "json", value: e.content },
      providerExecuted: !0,
      providerMetadata: WLr({ blockType: e.type }),
    });
  },
  Z_e,
  yfa = (e, t) => {
    let r = RIi(t.message?.usage);
    return [r ? { ...e, usage: WIi(e.usage, r) } : e, Z_e];
  },
  Mfa = (e, t) => {
    let r = t.content_block;
    if (!r) return [e, Z_e];
    if ((r.type === "tool_use" || r.type === "server_tool_use") && t.index !== void 0) {
      let H = [],
        u = fP(e.lifecycle, H);
      return [
        {
          ...e,
          lifecycle: u,
          tools: RLr(e.tools, t.index, {
            id: r.id ?? String(t.index),
            name: r.name ?? "",
            providerExecuted: r.type === "server_tool_use",
          }),
        },
        [...H, tA.toolInputStart({ id: r.id ?? String(t.index), name: r.name ?? "" })],
      ];
    }
    if (r.type === "text" && r.text) {
      let H = [];
      return [{ ...e, lifecycle: wMt(e.lifecycle, H, `text-${t.index ?? 0}`, r.text) }, H];
    }
    if (r.type === "thinking" && r.thinking) {
      let H = [];
      return [{ ...e, lifecycle: OMt(e.lifecycle, H, `reasoning-${t.index ?? 0}`, r.thinking) }, H];
    }
    let s = Dfa(r);
    if (!s) return [e, Z_e];
    let a = [];
    return [{ ...e, lifecycle: fP(e.lifecycle, a) }, [...a, s]];
  },
  xfa,
  Sfa,
  Tfa = (e, t) => {
    let r = WIi(e.usage, RIi(t.usage)),
      s = [],
      a = kLr(e.lifecycle, s, {
        reason: Efa(t.delta?.stop_reason),
        usage: r,
        providerMetadata: t.delta?.stop_sequence ? WLr({ stopSequence: t.delta.stop_sequence }) : void 0,
      });
    return [{ ...e, lifecycle: a, usage: r }, s];
  },
  vfa = (e) => {
    let t = e.error?.type,
      r = e.error?.message;
    if (t && r) return `${t}: ${r}`;
    return r || t || "Anthropic Messages stream error";
  },
  bfa = (e, t) => [
    e,
    [
      tA.providerError({
        message: vfa(t),
        classification: EY(t.error?.message ?? "") ? "context-overflow" : void 0,
      }),
    ],
  ],
  jfa = (e, t) => {
    if (t.type === "message_start") return Jt(yfa(e, t));
    if (t.type === "content_block_start") return Jt(Mfa(e, t));
    if (t.type === "content_block_delta") return xfa(e, t);
    if (t.type === "content_block_stop") return Sfa(e, t);
    if (t.type === "message_delta") return Jt(Tfa(e, t));
    if (t.type === "error") return Jt(bfa(e, t));
    return Jt([e, Z_e]);
  },
  Pfa,
  qIi;