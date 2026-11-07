
var sw = "~effect/http/HttpIncomingMessage",
  l2 = (e, t) => {
    let r = _Zt(wj(e));
    return (s) => Hi(s.json, (a) => r(a, t));
  },
  C1e,
  w1e = (e, t) => {
    let r = e.headers["content-type"] ?? "",
      s;
    if (r.includes("application/json"))
      try {
        s = Yg(e.json);
      } catch (H) {}
    else if (r.includes("text/") || r.includes("urlencoded"))
      try {
        s = Yg(e.text);
      } catch (H) {}
    let a = { ...t, headers: DU(e.headers), remoteAddress: e.remoteAddress };
    if (s !== void 0) a.body = s;
    return a;
  };