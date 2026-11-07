
var sSi = "webfetch",
  oSi = 5242880,
  Wga = 30,
  HSi = 120,
  Vga = `Fetch content from an HTTP or HTTPS URL and return it as text, markdown, or HTML. Markdown is the default.

Use a more targeted tool when one is available. This tool is read-only. Large text results may be replaced with a preview while the complete output is retained in managed storage.`,
  qga,
  cSi,
  Gga,
  Xga = (e) => {
    switch (e) {
      case "markdown":
        return "text/markdown;q=1.0, text/x-markdown;q=0.9, text/plain;q=0.8, text/html;q=0.7, */*;q=0.1";
      case "text":
        return "text/plain;q=1.0, text/markdown;q=0.9, text/html;q=0.8, */*;q=0.1";
      case "html":
        return "text/html;q=1.0, application/xhtml+xml;q=0.9, text/plain;q=0.8, text/markdown;q=0.7, */*;q=0.1";
    }
    return "*/*";
  },
  Jga = (e, t) => ({ "User-Agent": t, Accept: Xga(e), "Accept-Language": "en-US,en;q=0.9" }),
  ASi =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
  Kga = (e) => {
    if (!e || typeof e !== "object" || !("reason" in e)) return !1;
    let t = e.reason;
    if (!t || typeof t !== "object" || !("_tag" in t) || t._tag !== "StatusCodeError" || !("response" in t))
      return !1;
    let r = t.response;
    return r.status === 403 && r.headers["cf-mitigated"] === "challenge";
  },
  zga = (e, t, r = ASi) => KM(e).pipe(YW(Jga(t, r))),
  Qga = (e) => {
    if (e.protocol !== "http:" && e.protocol !== "https:") throw Error("URL must use http:// or https://");
  },
  aSi = (e, t, r, s = ASi) => e.execute(zga(t, r, s)).pipe(Hi(opt)),
  Yga = (e) => Xxt(e, oSi, () => Error(`Response too large (exceeds ${oSi} byte limit)`)),
  Zga = (e) => e.split(";", 1)[0]?.trim().toLowerCase() ?? "",
  e0a = (e) => e.startsWith("image/") && e !== "image/svg+xml" && e !== "image/vnd.fastbidsheet",
  t0a = (e) =>
    !e ||
    e.startsWith("text/") ||
    e === "application/json" ||
    e.endsWith("+json") ||
    e === "application/xml" ||
    e.endsWith("+xml") ||
    e === "application/javascript" ||
    e === "application/x-javascript",
  r0a = (e, t, r) => {
    if (!t.includes("text/html")) return e;
    if (r === "markdown") return o0a(e);
    if (r === "text") return s0a(e);
    return e;
  },
  n0a,
  i0a;