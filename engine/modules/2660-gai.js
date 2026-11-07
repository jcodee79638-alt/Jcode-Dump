
var gai = Ie(function (sdc, $ai) {
  var { FetchError: Dpr, Request: Wqo, isRedirect: Vqo } = uTe(),
    ITe = cr("url"),
    hai = Kfr(),
    ypr = _ai(),
    qqo = JIt(),
    Gqo = (e, t, r) => {
      if (!Vqo(t.status)) return !1;
      if (r.redirect === "manual") return !1;
      if (r.redirect === "error")
        throw new Dpr(`redirect mode is set to error: ${e.url}`, "no-redirect", { code: "ENOREDIRECT" });
      if (!t.headers.has("location"))
        throw new Dpr(`redirect location header missing for: ${e.url}`, "no-location", {
          code: "EINVALIDREDIRECT",
        });
      if (e.counter >= e.follow)
        throw new Dpr(`maximum redirect reached at: ${e.url}`, "max-redirect", { code: "EMAXREDIRECT" });
      return !0;
    },
    Xqo = (e, t, r) => {
      let s = { ...r },
        a = t.headers.get("location"),
        H = new ITe.URL(a, /^https?:/.test(a) ? void 0 : e.url);
      if (new ITe.URL(e.url).hostname !== H.hostname)
        (e.headers.delete("authorization"), e.headers.delete("cookie"));
      if (t.status === 303 || (e.method === "POST" && [301, 302].includes(t.status)))
        ((s.method = "GET"), (s.body = null), e.headers.delete("content-length"));
      return (
        (s.headers = {}),
        e.headers.forEach((f, d) => {
          s.headers[d] = f;
        }),
        (s.counter = ++e.counter),
        { request: new Wqo(ITe.format(H), s), options: s }
      );
    },
    Lai = async (e, t) => {
      let r = hai.storable(e, t) ? await ypr(e, t) : await qqo(e, t);
      if (!["GET", "HEAD"].includes(e.method) && r.status >= 200 && r.status <= 399)
        await ypr.invalidate(e, t);
      if (!Gqo(e, r, t)) return r;
      let s = Xqo(e, r, t);
      return Lai(s.request, s.options);
    };
  $ai.exports = Lai;
});