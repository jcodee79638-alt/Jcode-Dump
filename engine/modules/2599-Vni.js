
var Vni = Ie(function (Yfc, Wni) {
  var { URL: Cfr } = cr("url"),
    { Minipass: kRo } = Ny(),
    wfr = _It(),
    { exportNodeCompatibleHeaders: ORo } = wfr,
    Rni = mIt(),
    { clone: URo, extractContentType: NRo, getTotalBytes: FRo } = Rni,
    BRo = Bni().version,
    RRo = `minipass-fetch/${BRo} (+https://github.com/isaacs/minipass-fetch)`,
    WV = Symbol("Request internals"),
    LIt = (e) => typeof e === "object" && typeof e[WV] === "object",
    WRo = (e) => {
      let t = e && typeof e === "object" && Object.getPrototypeOf(e);
      return !!(t && t.constructor.name === "AbortSignal");
    };
  class $It extends Rni {
    constructor(e, t = {}) {
      let r = LIt(e) ? new Cfr(e.url) : e && e.href ? new Cfr(e.href) : new Cfr(`${e}`);
      if (LIt(e)) t = { ...e[WV], ...t };
      else if (!e || typeof e === "string") e = {};
      let s = (t.method || e.method || "GET").toUpperCase(),
        a = s === "GET" || s === "HEAD";
      if (((t.body !== null && t.body !== void 0) || (LIt(e) && e.body !== null)) && a)
        throw TypeError("Request with GET/HEAD method cannot have body");
      let H = t.body !== null && t.body !== void 0 ? t.body : LIt(e) && e.body !== null ? URo(e) : null;
      super(H, { timeout: t.timeout || e.timeout || 0, size: t.size || e.size || 0 });
      let u = new wfr(t.headers || e.headers || {});
      if (H !== null && H !== void 0 && !u.has("Content-Type")) {
        let le = NRo(H);
        if (le) u.append("Content-Type", le);
      }
      let f = "signal" in t ? t.signal : null;
      if (f !== null && f !== void 0 && !WRo(f))
        throw TypeError("Expected signal must be an instanceof AbortSignal");
      let {
        ca: d,
        cert: _,
        ciphers: L,
        clientCertEngine: I,
        crl: D,
        dhparam: S,
        ecdhCurve: T,
        family: C,
        honorCipherOrder: O,
        key: B,
        passphrase: V,
        pfx: q,
        rejectUnauthorized: Z = process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0",
        secureOptions: se,
        secureProtocol: ae,
        servername: z,
        sessionIdContext: Ae,
      } = t;
      ((this[WV] = {
        method: s,
        redirect: t.redirect || e.redirect || "follow",
        headers: u,
        parsedURL: r,
        signal: f,
        ca: d,
        cert: _,
        ciphers: L,
        clientCertEngine: I,
        crl: D,
        dhparam: S,
        ecdhCurve: T,
        family: C,
        honorCipherOrder: O,
        key: B,
        passphrase: V,
        pfx: q,
        rejectUnauthorized: Z,
        secureOptions: se,
        secureProtocol: ae,
        servername: z,
        sessionIdContext: Ae,
      }),
        (this.follow = t.follow !== void 0 ? t.follow : e.follow !== void 0 ? e.follow : 20),
        (this.compress = t.compress !== void 0 ? t.compress : e.compress !== void 0 ? e.compress : !0),
        (this.counter = t.counter || e.counter || 0),
        (this.agent = t.agent || e.agent));
    }
    get method() {
      return this[WV].method;
    }
    get url() {
      return this[WV].parsedURL.toString();
    }
    get headers() {
      return this[WV].headers;
    }
    get redirect() {
      return this[WV].redirect;
    }
    get signal() {
      return this[WV].signal;
    }
    clone() {
      return new $It(this);
    }
    get [Symbol.toStringTag]() {
      return "Request";
    }
    static getNodeRequestOptions(e) {
      let t = e[WV].parsedURL,
        r = new wfr(e[WV].headers);
      if (!r.has("Accept")) r.set("Accept", "*/*");
      if (!/^https?:$/.test(t.protocol)) throw TypeError("Only HTTP(S) protocols are supported");
      if (e.signal && kRo.isStream(e.body) && typeof e.body.destroy !== "function")
        throw Error("Cancellation of streamed requests with AbortSignal is not supported");
      let s =
        (e.body === null || e.body === void 0) && /^(POST|PUT)$/i.test(e.method)
          ? "0"
          : e.body !== null && e.body !== void 0
            ? FRo(e)
            : null;
      if (s) r.set("Content-Length", s + "");
      if (!r.has("User-Agent")) r.set("User-Agent", RRo);
      if (e.compress && !r.has("Accept-Encoding")) r.set("Accept-Encoding", "gzip,deflate");
      let a = typeof e.agent === "function" ? e.agent(t) : e.agent;
      if (!r.has("Connection") && !a) r.set("Connection", "close");
      let {
        ca: H,
        cert: u,
        ciphers: f,
        clientCertEngine: d,
        crl: _,
        dhparam: L,
        ecdhCurve: I,
        family: D,
        honorCipherOrder: S,
        key: T,
        passphrase: C,
        pfx: O,
        rejectUnauthorized: B,
        secureOptions: V,
        secureProtocol: q,
        servername: Z,
        sessionIdContext: se,
      } = e[WV];
      return {
        ...{
          auth: t.username || t.password ? `${t.username}:${t.password}` : "",
          host: t.host,
          hostname: t.hostname,
          path: `${t.pathname}${t.search}`,
          port: t.port,
          protocol: t.protocol,
        },
        method: e.method,
        headers: ORo(r),
        agent: a,
        ca: H,
        cert: u,
        ciphers: f,
        clientCertEngine: d,
        crl: _,
        dhparam: L,
        ecdhCurve: I,
        family: D,
        honorCipherOrder: S,
        key: T,
        passphrase: C,
        pfx: O,
        rejectUnauthorized: B,
        secureOptions: V,
        secureProtocol: q,
        servername: Z,
        sessionIdContext: se,
        timeout: e.timeout,
      };
    }
  }
  Wni.exports = $It;
  Object.defineProperties($It.prototype, {
    method: { enumerable: !0 },
    url: { enumerable: !0 },
    headers: { enumerable: !0 },
    redirect: { enumerable: !0 },
    clone: { enumerable: !0 },
    signal: { enumerable: !0 },
  });
});