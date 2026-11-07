
var NMt = (e) => {
    if (Array.isArray(e)) return e.map(NMt);
    if (!K_(e)) return e;
    let t = Object.fromEntries(
      Object.entries(e)
        .filter(([s]) => s !== "anyOf")
        .map(([s, a]) => [s, NMt(a)]),
    );
    if (!Array.isArray(e.anyOf)) return t;
    let r = e.anyOf.filter((s) => !K_(s) || s.type !== "null").map(NMt);
    if (r.length === 1 && K_(r[0])) return { ...t, ...r[0] };
    return { ...t, anyOf: r };
  },
  bIi = (e) => {
    let t = e.map(FMt);
    if (t.length === 0) return {};
    if (t.length === 1) return t[0];
    return { anyOf: t };
  },
  FMt = (e) => {
    if (Array.isArray(e)) return e.map(FMt);
    if (!K_(e)) return e;
    if (typeof e.$ref === "string") return { $ref: e.$ref };
    return Object.fromEntries(
      Object.entries(e).flatMap(([t, r]) => {
        if (t === "items" && Array.isArray(r)) return [[t, bIi(r)]];
        if (t === "prefixItems") {
          if ("items" in e) return [];
          return [["items", bIi(Array.isArray(r) ? r : [])]];
        }
        if (t === "unevaluatedItems") return [];
        return [[t, FMt(r)]];
      }),
    );
  },
  jIi = (e) => {
    let t = FMt(e);
    return K_(t) ? t : {};
  },
  Sla = (e) => {
    let t = Array.isArray(e.anyOf) ? e.anyOf.filter(K_) : [],
      r =
        t.length === 0
          ? { ...e, type: "object" }
          : {
              ...Object.fromEntries(Object.entries(e).filter(([a]) => a !== "anyOf")),
              type: "object",
              properties: t.reduce((a, H) => ({ ...(K_(H.properties) ? H.properties : {}), ...a }), {}),
              additionalProperties: !1,
            },
      s = NMt(r);
    return K_(s) ? s : { type: "object" };
  },
  PIi = (e) => xla(e) ?? {},
  Tla = (e, t) => {
    if (t === void 0) return e;
    switch (t) {
      case "gemini":
        return PIi(e);
      case "moonshot":
        return jIi(e);
    }
  },
  Kae;