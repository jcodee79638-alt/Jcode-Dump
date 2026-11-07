
var AWe,
  vIn = 16384,
  azs = 2,
  bIn = 500,
  Jnr = 1e4,
  cWe = "<redacted>",
  jIn =
    "authorization|api[-_]?key|access[-_]?token|refresh[-_]?token|id[-_]?token|token|secret|credential|signature|x-amz-signature",
  PIn,
  Hzs,
  CIn,
  czs,
  Azs,
  wIn = (e) => PIn.test(e),
  kIn = (e) => wIn(e) || Hzs.test(e),
  OIn = (e, t) => Object.fromEntries(Object.entries(Yie(e, [...t, PIn])).map(([r, s]) => [r, String(s)])),
  UIn = (e) => {
    if (!URL.canParse(e)) return cWe;
    let t = new URL(e);
    return (
      t.searchParams.forEach((r, s) => {
        if (kIn(s)) t.searchParams.set(s, cWe);
      }),
      t.toString()
    );
  },
  uzs = (e) => Object.fromEntries(Object.entries(e).map(([t, r]) => [t.toLowerCase(), r])),
  lzs = (e) =>
    e["x-request-id"] ??
    e["request-id"] ??
    e["x-amzn-requestid"] ??
    e["x-amz-request-id"] ??
    e["x-goog-request-id"] ??
    e["cf-ray"],
  fzs = (e) => e === 429 || e === 503 || e === 504 || e === 529,
  pzs = (e) => {
    let t = Number(e["retry-after-ms"]);
    if (Number.isFinite(t)) return Math.max(0, t);
    let r = e["retry-after"];
    if (!r) return;
    let s = Number(r);
    if (Number.isFinite(s)) return Math.max(0, s * 1000);
    let a = Date.parse(r);
    if (!Number.isNaN(a)) return Math.max(0, a - Date.now());
    return;
  },
  kMe = (e, t, r) => {
    if (t.length > 0) e[t] = r;
  },
  dzs = (e, t) => {
    let r = {},
      s = {},
      a = {};
    if (
      (Object.entries(e).forEach(([H, u]) => {
        let f = /^x-ratelimit-limit-(.+)$/.exec(H)?.[1];
        if (f) return kMe(r, f, u);
        let d = /^x-ratelimit-remaining-(.+)$/.exec(H)?.[1];
        if (d) return kMe(s, d, u);
        let _ = /^x-ratelimit-reset-(.+)$/.exec(H)?.[1];
        if (_) return kMe(a, _, u);
        let L = /^anthropic-ratelimit-(.+)-(limit|remaining|reset)$/.exec(H);
        if (!L) return;
        if (L[2] === "limit") return kMe(r, L[1], u);
        if (L[2] === "remaining") return kMe(s, L[1], u);
        return kMe(a, L[1], u);
      }),
      t === void 0 &&
        Object.keys(r).length === 0 &&
        Object.keys(s).length === 0 &&
        Object.keys(a).length === 0)
    )
      return;
    return new sWe({
      retryAfterMs: t,
      limit: Object.keys(r).length === 0 ? void 0 : r,
      remaining: Object.keys(s).length === 0 ? void 0 : s,
      reset: Object.keys(a).length === 0 ? void 0 : a,
    });
  },
  NIn = (e, t) => new f_t({ method: e.method, url: UIn(e.url), headers: OIn(e.headers, t) }),
  mzs = (e, t) => new p_t({ status: e.status, headers: OIn(e.headers, t) }),
  _zs = (e) => {
    let t = new Set(),
      r = (s) => {
        if (s.length < 4) return;
        (t.add(s), t.add(encodeURIComponent(s)));
      };
    if (
      (Object.entries(e.headers).forEach(([s, a]) => {
        if (!wIn(s)) return;
        r(a);
        let H = /^Bearer\s+(.+)$/i.exec(a)?.[1];
        if (H) r(H);
      }),
      !URL.canParse(e.url))
    )
      return t;
    return (
      new URL(e.url).searchParams.forEach((s, a) => {
        if (kIn(a)) r(s);
      }),
      t
    );
  },
  hzs = (e, t) =>
    Array.from(_zs(t)).reduce(
      (r, s) => r.split(s).join(cWe),
      e.replace(czs, `$1"${cWe}"`).replace(Azs, `$1${cWe}`),
    ),
  Lzs = (e, t) => {
    if (e === void 0) return {};
    let r = hzs(e, t);
    if (r.length <= vIn) return { body: r };
    return { body: r.slice(0, vIn), bodyTruncated: !0 };
  },
  $zs = (e, t) => {
    if (t.body && t.body.length <= 500) return `Provider request failed with HTTP ${e}: ${t.body}`;
    return `Provider request failed with HTTP ${e}`;
  },
  gzs = (e) =>
    new M2({
      request: NIn(e.request, e.redactedNames),
      response: mzs(e.response, e.redactedNames),
      ...e.body,
      requestId: e.requestId,
      rateLimit: e.rateLimit,
    }),
  Ezs = (e) => {
    let t = e.http.body ?? "";
    if (/content[-_\s]?policy|content_filter|safety/i.test(t))
      return new __t({ message: e.message, http: e.http });
    if (e.status === 401) return new Ude({ message: e.message, kind: "invalid", http: e.http });
    if (e.status === 403)
      return new Ude({ message: e.message, kind: "insufficient-permissions", http: e.http });
    if (e.status === 429) {
      if (/insufficient[-_\s]?quota|quota[-_\s]?exceeded/i.test(t))
        return new m_t({ message: e.message, http: e.http });
      return new d_t({
        message: e.message,
        retryAfterMs: e.retryAfterMs,
        rateLimit: e.rateLimit,
        http: e.http,
      });
    }
    if (e.status === 400 || e.status === 404 || e.status === 409 || e.status === 413 || e.status === 422)
      return new bse({
        message: e.message,
        classification: EY(t) ? "context-overflow" : void 0,
        http: e.http,
      });
    if (e.status >= 500 || fzs(e.status))
      return new h_t({ message: e.message, status: e.status, retryAfterMs: e.retryAfterMs, http: e.http });
    return new L_t({ message: e.message, status: e.status, http: e.http });
  },
  Izs = (e, t) => (r) =>
    ft(function* () {
      if (r.status < 400) return r;
      let s = yield* r.text.pipe($s(() => ti)),
        a = uzs(r.headers),
        H = pzs(a),
        u = dzs(a, H),
        f = Lzs(s, e);
      return yield* new MD({
        module: "RequestExecutor",
        method: "execute",
        reason: Ezs({
          status: r.status,
          message: $zs(r.status, f),
          retryAfterMs: H,
          rateLimit: u,
          http: gzs({ request: e, response: r, redactedNames: t, body: f, requestId: lzs(a), rateLimit: u }),
        }),
      });
    }),
  Dzs = (e) => (t) => {
    let r = (a) =>
      new MD({
        module: "RequestExecutor",
        method: "execute",
        reason: new TMe({
          message: a.message,
          kind: a.kind,
          url: a.request ? UIn(a.request.url) : void 0,
          http: a.request ? new M2({ request: NIn(a.request, e) }) : void 0,
        }),
      });
    if (tQt(t)) return r({ message: t.message, kind: "Timeout" });
    if (!S1e(t)) return r({ message: "HTTP transport failed" });
    let s = "request" in t ? t.request : void 0;
    if (t.reason._tag === "TransportError")
      return r({ message: t.reason.description ?? "HTTP transport failed", kind: t.reason._tag, request: s });
    return r({ message: `HTTP transport failed: ${t.reason._tag}`, kind: t.reason._tag, request: s });
  },
  yzs = (e, t) => {
    if (e.retryAfterMs !== void 0) return Jt(Math.min(e.retryAfterMs, Jnr));
    return UWs(Math.min(bIn * 2 ** t * 0.8, Jnr), Math.min(bIn * 2 ** t * 1.2, Jnr)).pipe(
      Vn((r) => Math.round(r)),
    );
  },
  FIn = (e, t = azs, r = 0) =>
    EA(e, "LLM.Error", (s) => {
      if (!s.retryable || t <= 0) return bn(s);
      return yzs(s, r).pipe(
        Hi((a) => Qq(a)),
        Hi(() => FIn(e, t - 1, r + 1)),
      );
    }),
  BIn,
  YRH;