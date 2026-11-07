
var mzi,
  _zi,
  hzi,
  pQa,
  Lzi,
  c$e = (e, t) => vd(q$(e, t)),
  twt = (e, t, r) => {
    let s = c$e(t[0], `${e.name} input`);
    try {
      switch (e.name) {
        case "encodeURI":
          return encodeURI(s);
        case "encodeURIComponent":
          return encodeURIComponent(s);
        case "decodeURI":
          return decodeURI(s);
        case "decodeURIComponent":
          return decodeURIComponent(s);
      }
    } catch (a) {
      throw new is(
        `${e.name} received malformed URI data: ${a instanceof Error ? a.message : String(a)}`,
        r,
      ).as("URIError");
    }
  },
  MQe = (e, t) => (e instanceof Z1 ? e.url.href : c$e(e, t)),
  $zi = (e, t, r) => {
    if (!pQa.has(e)) throw new is(`URL.${e} is not available in CodeMode.`, r);
    if (t.length === 0) throw new is(`URL.${e} requires a URL argument.`, r).as("TypeError");
    let s = MQe(t[0], `URL.${e} input`),
      a = t[1] === void 0 ? void 0 : MQe(t[1], `URL.${e} base`);
    try {
      let H = new URL(s, a);
      return e === "canParse" ? !0 : new Z1(H);
    } catch {
      return e === "canParse" ? !1 : null;
    }
  },
  gzi = (e, t, r) => {
    if (t === "toString" || t === "toJSON") return e.url.href;
    throw new is(`URL method '${t}' is not available in CodeMode.`, r);
  };