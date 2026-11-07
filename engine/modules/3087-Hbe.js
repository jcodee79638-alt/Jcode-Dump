
var Hbe = "openai-responses",
  vpa = "https://api.openai.com/v1",
  bpa = "/responses",
  iDi,
  sDi,
  jpa,
  Ppa,
  Cpa,
  wpa,
  kpa,
  Opa,
  Upa,
  Npa,
  Fpa,
  Bpa,
  oDi,
  Rpa,
  aDi,
  Wpa,
  Vpa,
  qpa,
  Gpa,
  Xpa,
  Jpa,
  Kpa = (e, t) => ({
    type: "function",
    name: e.name,
    description: e.description,
    parameters: Kae.openAI(t),
    strict: !1,
  }),
  zpa = (e) =>
    Gnr("OpenAI Responses", e, {
      auto: () => "auto",
      none: () => "none",
      required: () => "required",
      tool: (t) => ({ type: "function", name: t }),
    }),
  Qpa = (e) => ({ type: "function_call", call_id: e.id, name: e.name, arguments: Cse(e.input) }),
  Ypa = (e) => {
    let t = e.providerMetadata?.openai;
    if (!K_(t) || typeof t.itemId !== "string" || t.itemId.length === 0) return;
    let r =
      typeof t.reasoningEncryptedContent === "string"
        ? t.reasoningEncryptedContent
        : t.reasoningEncryptedContent === null
          ? null
          : void 0;
    return {
      type: "reasoning",
      id: t.itemId,
      summary: e.text.length > 0 ? [{ type: "summary_text", text: e.text }] : [],
      encrypted_content: r,
    };
  },
  Zpa = (e) => {
    let t = e.providerMetadata?.openai;
    return K_(t) && typeof t.itemId === "string" && t.itemId.length > 0 ? t.itemId : void 0;
  },
  eda,
  tda,
  rda,
  nda,
  ida,
  sda,
  oda = (e) => {
    if (!e) return;
    let t = e.input_tokens_details?.cached_tokens,
      r = e.output_tokens_details?.reasoning_tokens,
      s = $In(e.input_tokens, t);
    return new Xv({
      inputTokens: e.input_tokens,
      outputTokens: e.output_tokens,
      nonCachedInputTokens: s,
      cacheReadInputTokens: t,
      reasoningTokens: r,
      totalTokens: S_t(e.input_tokens, e.output_tokens, e.total_tokens),
      providerMetadata: { openai: e },
    });
  },
  ada = (e, t) => {
    let r = e.response?.incomplete_details?.reason;
    if (r === void 0 || r === null) return t ? "tool-calls" : "stop";
    if (r === "max_output_tokens") return "length";
    if (r === "content_filter") return "content-filter";
    return t ? "tool-calls" : "unknown";
  },
  Yae = (e) => ({ openai: e }),
  HDi,
  Hda = (e) => e.type in HDi && typeof e.id === "string" && e.id.length > 0,
  cDi = (e) => e.type === "reasoning" && typeof e.id === "string" && e.id.length > 0,
  cda = (e) =>
    typeof e.error < "u" && e.error !== null ? { type: "error", value: e.error } : { type: "json", value: e },
  Ada = (e) => {
    let t = HDi[e.type],
      r = Yae({ itemId: e.id });
    return [
      tA.toolCall({ id: e.id, name: t.name, input: t.input(e), providerExecuted: !0, providerMetadata: r }),
      tA.toolResult({ id: e.id, name: t.name, result: cda(e), providerExecuted: !0, providerMetadata: r }),
    ];
  },
  xN,
  uda,
  lda = (e, t) => {
    if (!t.delta) return [e, xN];
    let r = [];
    return [{ ...e, lifecycle: wMt(e.lifecycle, r, t.item_id ?? "text-0", t.delta) }, r];
  },
  fda = (e, t) => {
    if (!t.delta) return [e, xN];
    let r = [],
      s = t.item_id ?? "reasoning-0",
      a = t.summary_index !== void 0 || e.reasoningItems[s] ? `${s}:${t.summary_index ?? 0}` : s;
    return [{ ...e, lifecycle: OMt(e.lifecycle, r, a, t.delta) }, r];
  },
  pda = (e, t) => [e, xN],
  ADi = (e) => Yae({ itemId: e.id, reasoningEncryptedContent: e.encrypted_content ?? null }),
  dda = (e, t) => {
    let r = t.item;
    if (r && cDi(r)) {
      let u = [];
      return [
        {
          ...e,
          lifecycle: kMt(e.lifecycle, u, `${r.id}:0`, ADi(r)),
          reasoningItems: {
            ...e.reasoningItems,
            [r.id]: { encryptedContent: r.encrypted_content, summaryParts: { 0: "active" } },
          },
        },
        u,
      ];
    }
    if (r?.type !== "function_call" || !r.id) return [e, xN];
    let s = Yae({ itemId: r.id }),
      a = [],
      H = fP(e.lifecycle, a);
    return [
      {
        ...e,
        lifecycle: H,
        hasFunctionCall: e.hasFunctionCall,
        tools: RLr(e.tools, r.id, {
          id: r.call_id ?? r.id,
          name: r.name ?? "",
          input: r.arguments ?? "",
          providerMetadata: s,
        }),
      },
      [...a, tA.toolInputStart({ id: r.call_id ?? r.id, name: r.name ?? "", providerMetadata: s })],
    ];
  },
  mda = (e, t) => {
    if (!t.item_id || t.summary_index === void 0) return [e, xN];
    let r = e.reasoningItems[t.item_id] ?? { encryptedContent: void 0, summaryParts: {} };
    if (t.summary_index === 0) {
      if (e.reasoningItems[t.item_id]) return [e, xN];
      let H = [];
      return [
        {
          ...e,
          lifecycle: kMt(
            e.lifecycle,
            H,
            `${t.item_id}:0`,
            Yae({ itemId: t.item_id, reasoningEncryptedContent: null }),
          ),
          reasoningItems: { ...e.reasoningItems, [t.item_id]: { ...r, summaryParts: { 0: "active" } } },
        },
        H,
      ];
    }
    let s = [],
      a = Object.entries(r.summaryParts)
        .filter((H) => H[1] === "can-conclude")
        .reduce((H, u) => Jae(H, s, `${t.item_id}:${u[0]}`, Yae({ itemId: t.item_id })), e.lifecycle);
    return [
      {
        ...e,
        lifecycle: kMt(
          a,
          s,
          `${t.item_id}:${t.summary_index}`,
          Yae({ itemId: t.item_id, reasoningEncryptedContent: r.encryptedContent ?? null }),
        ),
        reasoningItems: {
          ...e.reasoningItems,
          [t.item_id]: {
            ...r,
            summaryParts: {
              ...Object.fromEntries(
                Object.entries(r.summaryParts).map((H) =>
                  H[1] === "can-conclude" ? [H[0], "concluded"] : H,
                ),
              ),
              [t.summary_index]: "active",
            },
          },
        },
      },
      s,
    ];
  },
  _da = (e, t) => {
    if (!t.item_id || t.summary_index === void 0) return [e, xN];
    let r = e.reasoningItems[t.item_id];
    if (!r) return [e, xN];
    let s = [];
    return [
      {
        ...e,
        lifecycle:
          e.store !== !1
            ? Jae(e.lifecycle, s, `${t.item_id}:${t.summary_index}`, Yae({ itemId: t.item_id }))
            : e.lifecycle,
        reasoningItems: {
          ...e.reasoningItems,
          [t.item_id]: {
            ...r,
            summaryParts: {
              ...r.summaryParts,
              [t.summary_index]: e.store !== !1 ? "concluded" : "can-conclude",
            },
          },
        },
      },
      s,
    ];
  },
  hda,
  Lda,
  $da = (e, t) => {
    let r = [],
      s = kLr(e.lifecycle, r, {
        reason: ada(t, e.hasFunctionCall),
        usage: oda(t.response?.usage),
        providerMetadata:
          t.response?.id || t.response?.service_tier
            ? Yae({ responseId: t.response.id, serviceTier: t.response.service_tier })
            : void 0,
      });
    return [{ ...e, lifecycle: s }, r];
  },
  gda = (e, t) => {
    let r = e.response?.error ?? void 0,
      s = e.message || r?.message || void 0,
      a = e.code || r?.code || void 0;
    if (s && a) return `${a}: ${s}`;
    return s || a || t;
  },
  uDi = (e, t) => {
    let r = e.code || e.response?.error?.code || void 0,
      s = gda(e, t);
    return tA.providerError({
      message: s,
      classification: r === "context_length_exceeded" || EY(s) ? "context-overflow" : void 0,
    });
  },
  Eda = (e, t) => [e, [uDi(t, "OpenAI Responses response failed")]],
  Ida = (e, t) => [e, [uDi(t, "OpenAI Responses stream error")]],
  Dda = (e, t) => {
    if (t.type === "response.output_text.delta") return Jt(lda(e, t));
    if (
      t.type === "response.reasoning_text.delta" ||
      t.type === "response.reasoning_summary.delta" ||
      t.type === "response.reasoning_summary_text.delta"
    )
      return Jt(fda(e, t));
    if (
      t.type === "response.reasoning_text.done" ||
      t.type === "response.reasoning_summary.done" ||
      t.type === "response.reasoning_summary_text.done"
    )
      return Jt(pda(e, t));
    if (t.type === "response.reasoning_summary_part.added") return Jt(mda(e, t));
    if (t.type === "response.reasoning_summary_part.done") return Jt(_da(e, t));
    if (t.type === "response.output_item.added") return Jt(dda(e, t));
    if (t.type === "response.function_call_arguments.delta") return hda(e, t);
    if (t.type === "response.output_item.done") return Lda(e, t);
    if (t.type === "response.completed" || t.type === "response.incomplete") return Jt($da(e, t));
    if (t.type === "response.failed") return Jt(Eda(e, t));
    if (t.type === "error") return Jt(Ida(e, t));
    return Jt([e, xN]);
  },
  lDi,
  fDi,
  pDi,
  yda,
  dDi,
  Mda,
  xda = (e) =>
    ft(function* () {
      if (!K_(e)) return yield* XS("OpenAI Responses WebSocket body must be a JSON object");
      let { stream: t, ...r } = e;
      return yield* Mda({ ...r, type: "response.create" });
    }),
  Sda,
  m1c;