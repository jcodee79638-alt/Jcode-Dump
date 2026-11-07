
var kzs,
  Ozs,
  Uzs = (e) => {
    if (e === void 0 || e === "auto") return kzs;
    if (e === "none") return Ozs;
    return e;
  },
  Nzs,
  Fzs = (e) => (e !== void 0 ? new LY({ type: "ephemeral", ttlSeconds: e }) : new LY({ type: "ephemeral" })),
  Bzs = (e, t) => {
    if (e.length === 0) return e;
    let r = e.length - 1;
    if (e[r].cache) return e;
    return e.map((s, a) => (a === r ? new Wj({ ...s, cache: t }) : s));
  },
  Rzs = (e, t) => {
    if (e.length === 0) return e;
    let r = e.length - 1;
    if (e[r].cache) return e;
    return e.map((s, a) => (a === r ? { ...s, cache: t } : s));
  },
  JIn = (e, t) => e.findLastIndex((r) => r.role === t),
  tir = (e, t, r) => {
    if (t < 0 || t >= e.length) return e;
    let s = e[t];
    if (s.content.length === 0) return e;
    let a = s.content.findLastIndex((L) => L.type === "text"),
      H = a >= 0 ? a : s.content.length - 1,
      u = s.content[H];
    if ("cache" in u && u.cache) return e;
    let f = s.content.map((L, I) => (I === H ? { ...L, cache: r } : L)),
      d = new fg({ ...s, content: f }),
      _ = e.slice();
    return ((_[t] = d), _);
  },
  Wzs = (e, t, r) => {
    if (e.length === 0) return e;
    if (t === "latest-user-message") return tir(e, JIn(e, "user"), r);
    if (t === "latest-assistant") return tir(e, JIn(e, "assistant"), r);
    let s = Math.max(0, e.length - t.tail),
      a = e;
    for (let H = s; H < e.length; H++) a = tir(a, H, r);
    return a;
  },
  KIn = (e) => {
    if (!Nzs.has(e.model.route.id)) return e;
    let t = Uzs(e.cache);
    if (!t.tools && !t.system && !t.messages) return e;
    let r = Fzs(t.ttlSeconds),
      s = t.tools ? Bzs(e.tools, r) : e.tools,
      a = t.system ? Rzs(e.system, r) : e.system,
      H = t.messages ? Wzs(e.messages, t.messages, r) : e.messages;
    if (s === e.tools && a === e.system && H === e.messages) return e;
    return mV.update(e, { tools: s, system: a, messages: H });
  };