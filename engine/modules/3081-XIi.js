
var XIi,
  JIi,
  KIi,
  Cfa,
  wfa,
  kfa,
  Ofa,
  Ufa,
  zIi,
  Nfa,
  Ffa,
  Bfa,
  Rfa = (e) => typeof e === "string" && Cfa.has(e),
  QIi = (e) => typeof e === "string" && wfa.has(e),
  Wfa = (e) => typeof e === "string" && kfa.has(e),
  Qae = (e) => e.providerOptions?.openai,
  GMt = (e) => {
    let t = Qae(e)?.store;
    return typeof t === "boolean" ? t : void 0;
  },
  YIi = (e) => {
    let t = Qae(e)?.reasoningEffort;
    return Rfa(t) ? t : void 0;
  },
  Vfa = (e) => (Qae(e)?.reasoningSummary === "auto" ? "auto" : void 0),
  qfa = (e) => {
    let t = Qae(e)?.include;
    if (!Array.isArray(t)) return;
    let r = t.filter((s) => Ofa.has(s));
    return r.length > 0 ? r : void 0;
  },
  Gfa = (e) => {
    let t = Qae(e)?.promptCacheKey;
    return typeof t === "string" ? t : void 0;
  },
  Xfa = (e) => {
    let t = Qae(e)?.textVerbosity;
    return Wfa(t) ? t : void 0;
  },
  Jfa = (e) => {
    let t = Qae(e)?.serviceTier;
    return typeof t === "string" && Ufa.has(t) ? t : void 0;
  },
  Kfa = (e) => {
    let t = Qae(e)?.instructions;
    return typeof t === "string" ? t : void 0;
  };