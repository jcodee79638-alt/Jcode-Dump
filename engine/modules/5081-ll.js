
class ll {
  constructor({
    baseURL: e = cJ("OPENAI_BASE_URL"),
    apiKey: t = cJ("OPENAI_API_KEY") ?? null,
    adminAPIKey: r = cJ("OPENAI_ADMIN_KEY") ?? null,
    organization: s = cJ("OPENAI_ORG_ID") ?? null,
    project: a = cJ("OPENAI_PROJECT_ID") ?? null,
    webhookSecret: H = cJ("OPENAI_WEBHOOK_SECRET") ?? null,
    workloadIdentity: u,
    ...f
  } = {}) {
    (ubr.add(this),
      FPt.set(this, void 0),
      (this.completions = new sCe(this)),
      (this.chat = new xLe(this)),
      (this.embeddings = new aCe(this)),
      (this.files = new cCe(this)),
      (this.images = new fCe(this)),
      (this.audio = new Nee(this)),
      (this.moderations = new dCe(this)),
      (this.models = new pCe(this)),
      (this.fineTuning = new lJ(this)),
      (this.graders = new NLe(this)),
      (this.vectorStores = new Tce(this)),
      (this.webhooks = new $Ce(this)),
      (this.beta = new uJ(this)),
      (this.batches = new rCe(this)),
      (this.uploads = new FLe(this)),
      (this.admin = new TLe(this)),
      (this.responses = new xce(this)),
      (this.realtime = new yce(this)),
      (this.conversations = new OLe(this)),
      (this.evals = new ULe(this)),
      (this.containers = new kLe(this)),
      (this.skills = new Sce(this)),
      (this.videos = new hCe(this)));
    let d = {
      apiKey: t,
      adminAPIKey: r,
      organization: s,
      project: a,
      webhookSecret: H,
      workloadIdentity: u,
      ...f,
      baseURL: e || "https://api.openai.com/v1",
    };
    if (t && u) throw new bc("The `apiKey` and `workloadIdentity` options are mutually exclusive");
    if (!t && !r && !u)
      throw new bc(
        "Missing credentials. Please pass an `apiKey`, `workloadIdentity`, `adminAPIKey`, or set the `OPENAI_API_KEY` or `OPENAI_ADMIN_KEY` environment variable.",
      );
    if (!d.dangerouslyAllowBrowser && lVi())
      throw new bc(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
    ((this.baseURL = d.baseURL),
      (this.timeout = d.timeout ?? lbr.DEFAULT_TIMEOUT),
      (this.logger = d.logger ?? console));
    let _ = "warn";
    ((this.logLevel = _),
      (this.logLevel =
        eTr(d.logLevel, "ClientOptions.logLevel", this) ??
        eTr(cJ("OPENAI_LOG"), "process.env['OPENAI_LOG']", this) ??
        _),
      (this.fetchOptions = d.fetchOptions),
      (this.maxRetries = d.maxRetries ?? 2),
      (this.fetch = d.fetch ?? HPt()),
      wu(this, FPt, dVi, "f"));
    let L = cJ("OPENAI_CUSTOM_HEADERS");
    if (L) {
      let I = {};
      for (let D of L.split(`
`)) {
        let S = D.indexOf(":");
        if (S >= 0) I[D.substring(0, S).trim()] = D.substring(S + 1).trim();
      }
      d.defaultHeaders = Xa([I, d.defaultHeaders]);
    }
    if (((this._options = d), u)) this._workloadIdentityAuth = new iTr(u, this.fetch);
    ((this.apiKey = typeof t === "string" ? t : null),
      (this.adminAPIKey = r),
      (this.organization = s),
      (this.project = a),
      (this.webhookSecret = H));
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
      apiKey: this._options.apiKey,
      adminAPIKey: this.adminAPIKey,
      workloadIdentity: this._options.workloadIdentity,
      organization: this.organization,
      project: this.project,
      webhookSecret: this.webhookSecret,
      ...e,
    });
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values: e, nulls: t }, r = { bearerAuth: !0, adminAPIKeyAuth: !0 }) {
    if (e.get("authorization") || e.get("api-key")) return;
    if (t.has("authorization") || t.has("api-key")) return;
    if (this._workloadIdentityAuth && r.bearerAuth) return;
    throw Error(
      'Could not resolve authentication method. Expected either apiKey or adminAPIKey to be set. Or for one of the "Authorization" or "api-key" headers to be explicitly omitted',
    );
  }
  async authHeaders(e, t = { bearerAuth: !0, adminAPIKeyAuth: !0 }) {
    return Xa([
      t.bearerAuth ? await this.bearerAuth(e) : null,
      t.adminAPIKeyAuth ? await this.adminAPIKeyAuth(e) : null,
    ]);
  }
  async bearerAuth(e) {
    if (this._workloadIdentityAuth)
      return Xa([{ Authorization: `Bearer ${await this._workloadIdentityAuth.getToken()}` }]);
    if (this.apiKey == null) return;
    return Xa([{ Authorization: `Bearer ${this.apiKey}` }]);
  }
  async adminAPIKeyAuth(e) {
    if (this.adminAPIKey == null) return;
    return Xa([{ Authorization: `Bearer ${this.adminAPIKey}` }]);
  }
  stringifyQuery(e) {
    return MVi(e);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${Lce}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${USr()}`;
  }
  makeStatusError(e, t, r, s) {
    return CI.generate(e, t, r, s);
  }
  async _callApiKey() {
    let e = this._options.apiKey;
    if (typeof e !== "function") return !1;
    let t;
    try {
      t = await e();
    } catch (r) {
      if (r instanceof bc) throw r;
      throw new bc(`Failed to get token from 'apiKey' function: ${r.message}`, { cause: r });
    }
    if (typeof t !== "string" || !t)
      throw new bc(`Expected 'apiKey' function argument to return a string but it returned ${t}`);
    return ((this.apiKey = t), !0);
  }
  buildURL(e, t, r) {
    let s = (!us(this, ubr, "m", M7i).call(this) && r) || this.baseURL,
      a = sVi(e) ? new URL(e) : new URL(s + (s.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)),
      H = this.defaultQuery(),
      u = Object.fromEntries(a.searchParams);
    if (!FSr(H) || !FSr(u)) t = { ...u, ...H, ...t };
    if (typeof t === "object" && t && !Array.isArray(t)) a.search = this.stringifyQuery(t);
    return a.toString();
  }
  async prepareOptions(e) {
    if ((e.__security ?? { bearerAuth: !0 }).bearerAuth) await this._callApiKey();
  }
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
    return new DLe(this, this.makeRequest(e, t, void 0));
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
      (Wy(this).debug(
        `[${d}] sending request`,
        kee({ retryOfRequestLogID: r, method: s.method, url: u, options: s, headers: H.headers }),
      ),
      s.signal?.aborted)
    )
      throw new hx();
    let I = s.__security ?? { bearerAuth: !0 },
      D = new AbortController(),
      S = await this.fetchWithAuth(u, H, f, D, I).catch(aKe),
      T = Date.now();
    if (S instanceof globalThis.Error) {
      let B = `retrying, ${t} attempts remaining`;
      if (s.signal?.aborted) throw new hx();
      let V = oKe(S) || /timed? ?out/i.test(String(S) + ("cause" in S ? String(S.cause) : ""));
      if (t)
        return (
          Wy(this).info(`[${d}] connection ${V ? "timed out" : "failed"} - ${B}`),
          Wy(this).debug(
            `[${d}] connection ${V ? "timed out" : "failed"} (${B})`,
            kee({ retryOfRequestLogID: r, url: u, durationMs: T - L, message: S.message }),
          ),
          this.retryRequest(s, t, r ?? d)
        );
      if (
        (Wy(this).info(`[${d}] connection ${V ? "timed out" : "failed"} - error; no more retries left`),
        Wy(this).debug(
          `[${d}] connection ${V ? "timed out" : "failed"} (error; no more retries left)`,
          kee({ retryOfRequestLogID: r, url: u, durationMs: T - L, message: S.message }),
        ),
        S instanceof VPe || S instanceof oPt)
      )
        throw S;
      if (V) throw new ILe();
      throw new ELe({ message: NWa(S), cause: S });
    }
    let C = [...S.headers.entries()]
        .filter(([B]) => B === "x-request-id")
        .map(([B, V]) => ", " + B + ": " + JSON.stringify(V))
        .join(""),
      O = `[${d}${_}${C}] ${H.method} ${u} ${S.ok ? "succeeded" : "failed"} with status ${S.status} in ${T - L}ms`;
    if (!S.ok) {
      if (
        S.status === 401 &&
        this._workloadIdentityAuth &&
        I.bearerAuth &&
        !s.__metadata?.hasStreamingBody &&
        !s.__metadata?.workloadIdentityTokenRefreshed
      )
        return (
          await VSr(S.body),
          this._workloadIdentityAuth.invalidateToken(),
          this.makeRequest(
            { ...s, __metadata: { ...s.__metadata, workloadIdentityTokenRefreshed: !0 } },
            t,
            r ?? d,
          )
        );
      let B = await this.shouldRetry(S);
      if (t && B) {
        let z = `retrying, ${t} attempts remaining`;
        return (
          await VSr(S.body),
          Wy(this).info(`${O} - ${z}`),
          Wy(this).debug(
            `[${d}] response error (${z})`,
            kee({
              retryOfRequestLogID: r,
              url: S.url,
              status: S.status,
              headers: S.headers,
              durationMs: T - L,
            }),
          ),
          this.retryRequest(s, t, r ?? d, S.headers)
        );
      }
      let V = B ? "error; no more retries left" : "error; not retryable";
      Wy(this).info(`${O} - ${V}`);
      let q = await S.text().catch((z) => aKe(z).message),
        Z = HVi(q),
        se = Z ? void 0 : q;
      throw (
        Wy(this).debug(
          `[${d}] response error (${V})`,
          kee({
            retryOfRequestLogID: r,
            url: S.url,
            status: S.status,
            headers: S.headers,
            message: se,
            durationMs: Date.now() - L,
          }),
        ),
        this.makeStatusError(S.status, Z, se, S.headers)
      );
    }
    return (
      Wy(this).info(O),
      Wy(this).debug(
        `[${d}] response start`,
        kee({ retryOfRequestLogID: r, url: S.url, status: S.status, headers: S.headers, durationMs: T - L }),
      ),
      { response: S, options: s, controller: D, requestLogID: d, retryOfRequestLogID: r, startTime: L }
    );
  }
  getAPIList(e, t, r) {
    return this.requestAPIList(
      t,
      r && "then" in r ? r.then((s) => ({ method: "get", path: e, ...s })) : { method: "get", path: e, ...r },
    );
  }
  requestAPIList(e, t) {
    let r = this.makeRequest(t, null, void 0);
    return new mPt(this, r, e);
  }
  async fetchWithAuth(e, t, r, s, a = { bearerAuth: !0, adminAPIKeyAuth: !0 }) {
    if (this._workloadIdentityAuth && a.bearerAuth) {
      let u = t.headers,
        f = u.get("Authorization");
      if (!f || f === `Bearer ${UWa}`) {
        let d = await this._workloadIdentityAuth.getToken();
        u.set("Authorization", `Bearer ${d}`);
      }
    }
    return await this.fetchWithTimeout(e, t, r, s);
  }
  async fetchWithTimeout(e, t, r, s) {
    let { signal: a, method: H, ...u } = t || {},
      f = this._makeAbort(s);
    if (a) a.addEventListener("abort", f, { once: !0 });
    let d = setTimeout(f, r),
      _ =
        (globalThis.ReadableStream && u.body instanceof globalThis.ReadableStream) ||
        (typeof u.body === "object" && u.body !== null && Symbol.asyncIterator in u.body),
      L = { signal: s.signal, ...(_ ? { duplex: "half" } : {}), method: "GET", ...u };
    if (H) L.method = H.toUpperCase();
    try {
      return await this.fetch.call(void 0, e, L);
    } finally {
      clearTimeout(d);
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
    if (a === void 0) {
      let f = e.maxRetries ?? this.maxRetries;
      a = this.calculateDefaultRetryTimeoutMillis(t, f);
    }
    return (await aJ(a), this.makeRequest(e, t - 1, r));
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    let a = t - e,
      H = Math.min(0.5 * Math.pow(2, a), 8),
      u = 1 - Math.random() * 0.25;
    return H * u * 1000;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    let r = { ...e },
      { method: s, path: a, query: H, defaultBaseURL: u } = r,
      f = this.buildURL(a, H, u);
    if ("timeout" in r) aVi("timeout", r.timeout);
    r.timeout = r.timeout ?? this.timeout;
    let { bodyHeaders: d, body: _, isStreamingBody: L } = this.buildBody({ options: r });
    if (L) e.__metadata = { ...e.__metadata, hasStreamingBody: !0 };
    let I = await this.buildHeaders({ options: e, method: s, bodyHeaders: d, retryCount: t });
    return {
      req: {
        method: s,
        headers: I,
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
    let H = Xa([
      a,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(s),
        ...(e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1000)) } : {}),
        ...fVi(),
        "OpenAI-Organization": this.organization,
        "OpenAI-Project": this.project,
      },
      await this.authHeaders(e, e.__security ?? { bearerAuth: !0 }),
      this._options.defaultHeaders,
      r,
      e.headers,
    ]);
    return (this.validateHeaders(H, e.__security ?? { bearerAuth: !0 }), H.values);
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({ options: { body: e, headers: t } }) {
    if (!e) return { bodyHeaders: void 0, body: void 0, isStreamingBody: !1 };
    let r = Xa([t]),
      s = typeof globalThis.ReadableStream < "u" && e instanceof globalThis.ReadableStream,
      a =
        !s &&
        (typeof e === "string" ||
          e instanceof ArrayBuffer ||
          ArrayBuffer.isView(e) ||
          (typeof globalThis.Blob < "u" && e instanceof globalThis.Blob) ||
          e instanceof URLSearchParams ||
          e instanceof FormData);
    if (
      ArrayBuffer.isView(e) ||
      e instanceof ArrayBuffer ||
      e instanceof DataView ||
      (typeof e === "string" && r.values.has("content-type")) ||
      (globalThis.Blob && e instanceof globalThis.Blob) ||
      e instanceof FormData ||
      e instanceof URLSearchParams ||
      s
    )
      return { bodyHeaders: void 0, body: e, isStreamingBody: !a };
    else if (
      typeof e === "object" &&
      (Symbol.asyncIterator in e || (Symbol.iterator in e && "next" in e && typeof e.next === "function"))
    )
      return { bodyHeaders: void 0, body: cPt(e), isStreamingBody: !0 };
    else if (typeof e === "object" && r.values.get("content-type") === "application/x-www-form-urlencoded")
      return {
        bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
        body: this.stringifyQuery(e),
        isStreamingBody: !1,
      };
    else return { ...us(this, FPt, "f").call(this, { body: e, headers: r }), isStreamingBody: !1 };
  }
}