
var p0r,
  TGe,
  d0r,
  wbe,
  m0r,
  iSt,
  _0r,
  h0r,
  sSt,
  L0r,
  vGe,
  f0r,
  bGe,
  oEa = (e) => {
    let t = Object.entries(e);
    return (r) => {
      let s = Hg();
      for (let [a, H] of t) if (r[a] !== void 0) s = Oh(s, H, r[a]);
      return s;
    };
  },
  Fn,
  GSi,
  aEa = "effect/httpapi/stream/failure",
  zSi,
  cEa = (e) => {
    let t = {};
    switch (
      (R1(e.annotations, wbe, (r) => {
        t.description = r;
      }),
      e._tag)
    ) {
      case "Basic":
        return { ...t, type: "http", scheme: "basic" };
      case "Http": {
        let r = LQ(e.annotations, h0r).pipe(
          YF((s) => ({ bearerFormat: s })),
          OL,
        );
        return { ...t, type: "http", scheme: e.scheme, ...r };
      }
      case "ApiKey":
        return { ...t, type: "apiKey", name: e.key, in: e.in };
    }
  };