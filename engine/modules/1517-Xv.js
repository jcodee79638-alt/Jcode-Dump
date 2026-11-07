
var Xv,
  qEn,
  GEn,
  XEn,
  JEn,
  KEn,
  zEn,
  QEn,
  YEn,
  ZEn,
  eIn,
  tIn,
  rIn,
  nIn,
  iIn,
  sIn,
  $_t,
  Gv,
  vMe = (e) => Sse.make(e),
  bMe = (e) => Tse.make(e),
  tA,
  knr,
  oIn = (e) =>
    e
      .filter(tA.is.textDelta)
      .map((t) => t.text)
      .join(""),
  aIn = (e) =>
    e
      .filter(tA.is.reasoningDelta)
      .map((t) => t.text)
      .join(""),
  TKs = (e) => e.reduce((t, r) => ("usage" in r && r.usage !== void 0 ? r.usage : t), void 0),
  vKs = () => ({ events: [], message: fg.assistant([]), textParts: {}, reasoningParts: {}, toolInputs: {} }),
  bKs = (e, t) => {
    let r = [...e.events, t];
    if (tA.is.finish(t)) return { ...e, events: r, usage: t.usage ?? e.usage, finishReason: t.reason };
    if (tA.is.providerError(t)) return { ...e, events: r, finishReason: e.finishReason ?? "error" };
    return { ...e, events: r, usage: "usage" in t && t.usage !== void 0 ? t.usage : e.usage };
  },
  Onr = (e, t) => (t === void 0 ? { type: "text", text: e } : { type: "text", text: e, providerMetadata: t }),
  Unr = (e, t) =>
    t === void 0 ? { type: "reasoning", text: e } : { type: "reasoning", text: e, providerMetadata: t },
  HIn = (e, t) => ({ ...e, message: fg.assistant(t) }),
  g_t = (e, t) => HIn(e, [...e.message.content, t]),
  E_t = (e, t, r) =>
    HIn(
      e,
      e.message.content.map((s, a) => (a === t ? r : s)),
    ),
  cIn = (e, t, r) => {
    if (e.textParts[t]) return e;
    return {
      ...g_t(e, Onr("", r)),
      textParts: {
        ...e.textParts,
        [t]: { contentIndex: e.message.content.length, text: "", providerMetadata: r },
      },
    };
  },
  jKs = (e, t) => {
    let r = cIn(e, t.id, t.providerMetadata),
      s = r.textParts[t.id];
    if (!s) return r;
    let a = s.text + t.text,
      H = t.providerMetadata ?? s.providerMetadata;
    return {
      ...E_t(r, s.contentIndex, Onr(a, H)),
      textParts: { ...r.textParts, [t.id]: { ...s, text: a, providerMetadata: H } },
    };
  },
  PKs = (e, t) => {
    let r = e.textParts[t.id];
    if (!r) return e;
    let s = t.providerMetadata ?? r.providerMetadata;
    return {
      ...E_t(e, r.contentIndex, Onr(r.text, s)),
      textParts: { ...e.textParts, [t.id]: { ...r, providerMetadata: s } },
    };
  },
  AIn = (e, t, r) => {
    if (e.reasoningParts[t]) return e;
    return {
      ...g_t(e, Unr("", r)),
      reasoningParts: {
        ...e.reasoningParts,
        [t]: { contentIndex: e.message.content.length, text: "", providerMetadata: r },
      },
    };
  },
  CKs = (e, t) => {
    let r = AIn(e, t.id, t.providerMetadata),
      s = r.reasoningParts[t.id];
    if (!s) return r;
    let a = s.text + t.text,
      H = t.providerMetadata ?? s.providerMetadata;
    return {
      ...E_t(r, s.contentIndex, Unr(a, H)),
      reasoningParts: { ...r.reasoningParts, [t.id]: { ...s, text: a, providerMetadata: H } },
    };
  },
  wKs = (e, t) => {
    let r = e.reasoningParts[t.id];
    if (!r) return e;
    let s = t.providerMetadata ?? r.providerMetadata;
    return {
      ...E_t(e, r.contentIndex, Unr(r.text, s)),
      reasoningParts: { ...e.reasoningParts, [t.id]: { ...r, providerMetadata: s } },
    };
  },
  kKs = (e, t) => ({
    ...e,
    toolInputs: { ...e.toolInputs, [t.id]: { name: t.name, text: "", providerMetadata: t.providerMetadata } },
  }),
  OKs = (e, t) => {
    let r = e.toolInputs[t.id] ?? { name: t.name, text: "" };
    return { ...e, toolInputs: { ...e.toolInputs, [t.id]: { ...r, text: r.text + t.text } } };
  },
  UKs = (e, t) => {
    let r = e.toolInputs[t.id] ?? { name: t.name, text: "" };
    return {
      ...e,
      toolInputs: {
        ...e.toolInputs,
        [t.id]: { ...r, name: t.name, providerMetadata: t.providerMetadata ?? r.providerMetadata },
      },
    };
  },
  NKs = (e) =>
    iWe.make({
      id: e.id,
      name: e.name,
      input: e.input,
      ...(e.providerExecuted === void 0 ? {} : { providerExecuted: e.providerExecuted }),
      ...(e.providerMetadata === void 0 ? {} : { providerMetadata: e.providerMetadata }),
    }),
  FKs = (e) =>
    Ode.make({
      id: e.id,
      name: e.name,
      result: e.result,
      ...(e.providerExecuted === void 0 ? {} : { providerExecuted: e.providerExecuted }),
      ...(e.providerMetadata === void 0 ? {} : { providerMetadata: e.providerMetadata }),
    }),
  BKs = (e, t) => {
    let { [t.id]: r, ...s } = e.toolInputs;
    return { ...g_t(e, NKs(t)), toolInputs: s };
  },
  RKs = (e, t) => {
    let r = bKs(e, t);
    switch (t.type) {
      case "text-start":
        return cIn(r, t.id, t.providerMetadata);
      case "text-delta":
        return jKs(r, t);
      case "text-end":
        return PKs(r, t);
      case "reasoning-start":
        return AIn(r, t.id, t.providerMetadata);
      case "reasoning-delta":
        return CKs(r, t);
      case "reasoning-end":
        return wKs(r, t);
      case "tool-input-start":
        return kKs(r, t);
      case "tool-input-delta":
        return OKs(r, t);
      case "tool-input-end":
        return UKs(r, t);
      case "tool-call":
        return BKs(r, t);
      case "tool-result":
        return g_t(r, FKs(t));
      default:
        return r;
    }
  },
  jse;