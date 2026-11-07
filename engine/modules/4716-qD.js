
class qD {
  constructor({
    baseURL: e = VJe("ANTHROPIC_BASE_URL"),
    apiKey: t = VJe("ANTHROPIC_API_KEY") ?? null,
    authToken: r = VJe("ANTHROPIC_AUTH_TOKEN") ?? null,
    ...s
  } = {}) {
    (DSr.add(this), Xjt.set(this, void 0));
    let a = { apiKey: t, authToken: r, ...s, baseURL: e || "https://api.anthropic.com" };
    if (!a.dangerouslyAllowBrowser && HWi())
      throw new Cu(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);
    ((this.baseURL = a.baseURL),
      (this.timeout = a.timeout ?? ySr.DEFAULT_TIMEOUT),
      (this.logger = a.logger ?? console));
    let H = "warn";
    ((this.logLevel = H),
      (this.logLevel =
        Nxr(a.logLevel, "ClientOptions.logLevel", this) ??
        Nxr(VJe("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ??
        H),
      (this.fetchOptions = a.fetchOptions),
      (this.maxRetries = a.maxRetries ?? 2),
      (this.fetch = a.fetch ?? AWi()),
      Ic(this, Xjt, lWi, "f"),
      (this._options = a),
      (this.apiKey = typeof t === "string" ? t : null),
      (this.authToken = r));
  }
  withOptions(e) {
    return new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      authToken: this.authToken,
      ...e,
    });
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values: e, nulls: t }) {
    if (e.get("x-api-key") || e.get("authorization")) return;
    if (this.apiKey && e.get("x-api-key")) return;
    if (t.has("x-api-key")) return;
    if (this.authToken && e.get("authorization")) return;
    if (t.has("authorization")) return;
    throw Error(
      'Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted',
    );
  }
  async authHeaders(e) {
    return Zf([await this.apiKeyAuth(e), await this.bearerAuth(e)]);
  }
  async apiKeyAuth(e) {
    if (this.apiKey == null) return;
    return Zf([{ "X-Api-Key": this.apiKey }]);
  }
  async bearerAuth(e) {
    if (this.authToken == null) return;
    return Zf([{ Authorization: `Bearer ${this.authToken}` }]);
  }
  stringifyQuery(e) {
    return Object.entries(e)
      .filter(([t, r]) => typeof r < "u")
      .map(([t, r]) => {
        if (typeof r === "string" || typeof r === "number" || typeof r === "boolean")
          return `${encodeURIComponent(t)}=${encodeURIComponent(r)}`;
        if (r === null) return `${encodeURIComponent(t)}=`;
        throw new Cu(
          `Cannot stringify type ${typeof r}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join("&");
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${uce}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${jxr()}`;
  }
  makeStatusError(e, t, r, s) {
    return mx.generate(e, t, r, s);
  }
  buildURL(e, t, r) {
    let s = (!Ps(this, DSr, "m", qWi).call(this) && r) || this.baseURL,
      a = eWi(e) ? new URL(e) : new URL(s + (s.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)),
      H = this.defaultQuery();
    if (!tWi(H)) t = { ...H, ...t };
    if (typeof t === "object" && t && !Array.isArray(t)) a.search = this.stringifyQuery(t);
    return a.toString();
  }
  _calculateNonstreamingTimeout(e) {
    if ((3600 * e) / 128000 > 600)
      throw new Cu(
        "Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details",
      );
    return 600000;
  }
  async prepareOptions(e) {}
  async prepareRequest(e, { url: t, options: r }) {}
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, r) {
    return this.request(Promise.resolve(r).then((s) => ({ method: e, path: t, ...s })));
  }
  request(e, t = null) {
    return new lLe(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, r) {
    let s = await e,
      a = s.maxRetries ?? this.maxRetries;
    if (t == null) t = a;
    await this.prepareOptions(s);
    let { req: H, url: u, timeout: f } = await this.buildRequest(s, { retryCount: a - t });
    await this.prepareRequest(H, { url: u, options: s });
    let d = "log_" + ((Math.random() * 16777216) | 0).toString(16).padStart(6, "0"),
      _ = r === void 0 ? "" : `, retryOf: ${r}`,
      L = Date.now();
    if (
      (yT(this).debug(
        `[${d}] sending request`,
        yee({ retryOfRequestLogID: r, method: s.method, url: u, options: s, headers: H.headers }),
      ),
      s.signal?.aborted)
    )
      throw new SP();
    let I = new AbortController(),
      D = await this.fetchWithTimeout(u, H, f, I).catch(iJe),
      S = Date.now();
    if (D instanceof globalThis.Error) {
      let O = `retrying, ${t} attempts remaining`;
      if (s.signal?.aborted) throw new SP();
      let B = Dee(D) || /timed? ?out/i.test(String(D) + ("cause" in D ? String(D.cause) : ""));
      if (t)
        return (
          yT(this).info(`[${d}] connection ${B ? "timed out" : "failed"} - ${O}`),
          yT(this).debug(
            `[${d}] connection ${B ? "timed out" : "failed"} (${O})`,
            yee({ retryOfRequestLogID: r, url: u, durationMs: S - L, message: D.message }),
          ),
          this.retryRequest(s, t, r ?? d)
        );
      if (
        (yT(this).info(`[${d}] connection ${B ? "timed out" : "failed"} - error; no more retries left`),
        yT(this).debug(
          `[${d}] connection ${B ? "timed out" : "failed"} (error; no more retries left)`,
          yee({ retryOfRequestLogID: r, url: u, durationMs: S - L, message: D.message }),
        ),
        B)
      )
        throw new sJe();
      throw new ALe({ cause: D });
    }
    let T = [...D.headers.entries()]
        .filter(([O]) => O === "request-id")
        .map(([O, B]) => ", " + O + ": " + JSON.stringify(B))
        .join(""),
      C = `[${d}${_}${T}] ${H.method} ${u} ${D.ok ? "succeeded" : "failed"} with status ${D.status} in ${S - L}ms`;
    if (!D.ok) {
      let O = await this.shouldRetry(D);
      if (t && O) {
        let ae = `retrying, ${t} attempts remaining`;
        return (
          await uWi(D.body),
          yT(this).info(`${C} - ${ae}`),
          yT(this).debug(
            `[${d}] response error (${ae})`,
            yee({
              retryOfRequestLogID: r,
              url: D.url,
              status: D.status,
              headers: D.headers,
              durationMs: S - L,
            }),
          ),
          this.retryRequest(s, t, r ?? d, D.headers)
        );
      }
      let B = O ? "error; no more retries left" : "error; not retryable";
      yT(this).info(`${C} - ${B}`);
      let V = await D.text().catch((ae) => iJe(ae).message),
        q = Ejt(V),
        Z = q ? void 0 : V;
      throw (
        yT(this).debug(
          `[${d}] response error (${B})`,
          yee({
            retryOfRequestLogID: r,
            url: D.url,
            status: D.status,
            headers: D.headers,
            message: Z,
            durationMs: Date.now() - L,
          }),
        ),
        this.makeStatusError(D.status, q, Z, D.headers)
      );
    }
    return (
      yT(this).info(C),
      yT(this).debug(
        `[${d}] response start`,
        yee({ retryOfRequestLogID: r, url: D.url, status: D.status, headers: D.headers, durationMs: S - L }),
      ),
      { response: D, options: s, controller: I, requestLogID: d, retryOfRequestLogID: r, startTime: L }
    );
  }
  getAPIList(e, t, r) {
    return this.requestAPIList(t, { method: "get", path: e, ...r });
  }
  requestAPIList(e, t) {
    let r = this.makeRequest(t, null, void 0);
    return new vjt(this, r, e);
  }
  async fetchWithTimeout(e, t, r, s) {
    let { signal: a, method: H, ...u } = t || {};
    if (a) a.addEventListener("abort", () => s.abort());
    let f = setTimeout(() => s.abort(), r),
      d =
        (globalThis.ReadableStream && u.body instanceof globalThis.ReadableStream) ||
        (typeof u.body === "object" && u.body !== null && Symbol.asyncIterator in u.body),
      _ = { signal: s.signal, ...(d ? { duplex: "half" } : {}), method: "GET", ...u };
    if (H) _.method = H.toUpperCase();
    try {
      return await this.fetch.call(void 0, e, _);
    } finally {
      clearTimeout(f);
    }
  }
  async shouldRetry(e) {
    let t = e.headers.get("x-should-retry");
    if (t === "true") return !0;
    if (t === "false") return !1;
    if (e.status === 408) return !0;
    if (e.status === 409) return !0;
    if (e.status === 429) return !0;
    if (e.status >= 500) return !0;
    return !1;
  }
  async retryRequest(e, t, r, s) {
    let a,
      H = s?.get("retry-after-ms");
    if (H) {
      let f = parseFloat(H);
      if (!Number.isNaN(f)) a = f;
    }
    let u = s?.get("retry-after");
    if (u && !a) {
      let f = parseFloat(u);
      if (!Number.isNaN(f)) a = f * 1000;
      else a = Date.parse(u) - Date.now();
    }
    if (!(a && 0 <= a && a < 60000)) {
      let f = e.maxRetries ?? this.maxRetries;
      a = this.calculateDefaultRetryTimeoutMillis(t, f);
    }
    return (await iWi(a), this.makeRequest(e, t - 1, r));
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    let a = t - e,
      H = Math.min(0.5 * Math.pow(2, a), 8),
      u = 1 - Math.random() * 0.25;
    return H * u * 1000;
  }
  calculateNonstreamingTimeout(e, t) {
    if ((3600000 * e) / 128000 > 600000 || (t != null && e > t))
      throw new Cu(
        "Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details",
      );
    return 600000;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    let r = { ...e },
      { method: s, path: a, query: H, defaultBaseURL: u } = r,
      f = this.buildURL(a, H, u);
    if ("timeout" in r) nWi("timeout", r.timeout);
    r.timeout = r.timeout ?? this.timeout;
    let { bodyHeaders: d, body: _ } = this.buildBody({ options: r }),
      L = await this.buildHeaders({ options: e, method: s, bodyHeaders: d, retryCount: t });
    return {
      req: {
        method: s,
        headers: L,
        ...(r.signal && { signal: r.signal }),
        ...(globalThis.ReadableStream && _ instanceof globalThis.ReadableStream && { duplex: "half" }),
        ...(_ && { body: _ }),
        ...(this.fetchOptions ?? {}),
        ...(r.fetchOptions ?? {}),
      },
      url: f,
      timeout: r.timeout,
    };
  }
  async buildHeaders({ options: e, method: t, bodyHeaders: r, retryCount: s }) {
    let a = {};
    if (this.idempotencyHeader && t !== "get") {
      if (!e.idempotencyKey) e.idempotencyKey = this.defaultIdempotencyKey();
      a[this.idempotencyHeader] = e.idempotencyKey;
    }
    let H = Zf([
      a,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(s),
        ...(e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1000)) } : {}),
        ...cWi(),
        ...(this._options.dangerouslyAllowBrowser
          ? { "anthropic-dangerous-direct-browser-access": "true" }
          : void 0),
        "anthropic-version": "2023-06-01",
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      r,
      e.headers,
    ]);
    return (this.validateHeaders(H), H.values);
  }
  buildBody({ options: { body: e, headers: t } }) {
    if (!e) return { bodyHeaders: void 0, body: void 0 };
    let r = Zf([t]);
    if (
      ArrayBuffer.isView(e) ||
      e instanceof ArrayBuffer ||
      e instanceof DataView ||
      (typeof e === "string" && r.values.has("content-type")) ||
      (globalThis.Blob && e instanceof globalThis.Blob) ||
      e instanceof FormData ||
      e instanceof URLSearchParams ||
      (globalThis.ReadableStream && e instanceof globalThis.ReadableStream)
    )
      return { bodyHeaders: void 0, body: e };
    else if (
      typeof e === "object" &&
      (Symbol.asyncIterator in e || (Symbol.iterator in e && "next" in e && typeof e.next === "function"))
    )
      return { bodyHeaders: void 0, body: Ijt(e) };
    else return Ps(this, Xjt, "f").call(this, { body: e, headers: r });
  }
}