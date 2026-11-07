
var tWe = (...e) => {
    let t = e.filter((s) => s !== void 0);
    if (t.length === 0) return;
    if (t.length === 1 && Object.values(t[0]).every((s) => s !== void 0)) return t[0];
    let r = {};
    for (let s of t)
      for (let [a, H] of Object.entries(s)) {
        if (H === void 0) continue;
        r[a] = K_(r[a]) && K_(H) ? tWe(r[a], H) : H;
      }
    return Object.keys(r).length === 0 ? void 0 : r;
  },
  FEn = (...e) => {
    let t = e.filter((s) => s !== void 0);
    if (t.length === 0) return;
    if (t.length === 1) return t[0];
    let r = Object.fromEntries(t.flatMap((s) => Object.entries(s).filter((a) => a[1] !== void 0)));
    return Object.keys(r).length === 0 ? void 0 : r;
  },
  vnr,
  bnr = (...e) => {
    let t = {};
    for (let r of e) {
      if (!r) continue;
      for (let [s, a] of Object.entries(r)) {
        let H = tWe(t[s], a);
        if (H) t[s] = H;
      }
    }
    return Object.keys(t).length === 0 ? void 0 : t;
  },
  dw,
  jnr = (...e) => {
    let t = tWe(...e.map((a) => a?.body)),
      r = FEn(...e.map((a) => a?.headers)),
      s = FEn(...e.map((a) => a?.query));
    if (!t && !r && !s) return;
    return new dw({ body: t, headers: r, query: s });
  },
  mw,
  vse = (e, t) => e.findLast((r) => r?.[t] !== void 0)?.[t],
  Pnr = (...e) => {
    let t = new mw({
      maxTokens: vse(e, "maxTokens"),
      temperature: vse(e, "temperature"),
      topP: vse(e, "topP"),
      topK: vse(e, "topK"),
      frequencyPenalty: vse(e, "frequencyPenalty"),
      presencePenalty: vse(e, "presencePenalty"),
      seed: vse(e, "seed"),
      stop: vse(e, "stop"),
    });
    return Object.values(t).some((r) => r !== void 0) ? t : void 0;
  },
  hY,
  xMe,
  LKs,
  SMe,
  u_t,
  LY,
  $Ks,
  BEn;