
var nde = "~effect/http/HttpServerRequest",
  Md,
  ose,
  hln = (e, t) => {
    let r = G_(e);
    return Hi(Md, (s) => r(s.cookies, t));
  },
  Lln = (e, t) => {
    let r = G_(e);
    return Hi(Md, (s) => r(s.headers, t));
  },
  $ln = (e, t) => {
    let r = G_(e);
    return Hi(ose, (s) => r(s, t));
  },
  gln = (e) => new $er(e, i3s(e.url)),
  i3s = (e) => {
    if (e[0] === "/") return e;
    let t = e.indexOf("/", e.indexOf("//") + 2);
    return t === -1 ? "/" : e.slice(t);
  },
  $er,
  ger = (e) => {
    let t = e.headers.host ?? "localhost",
      r = e.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    try {
      return Lo(new URL(e.url, `${r}://${t}`));
    } catch {
      return eH();
    }
  };