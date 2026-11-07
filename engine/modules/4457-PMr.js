
class PMr {
  constructor(e, t) {
    if (
      ((this._url = e),
      (this._resourceMetadataUrl = void 0),
      (this._scope = void 0),
      (this._eventSourceInit = t?.eventSourceInit),
      (this._requestInit = t?.requestInit),
      (this._authProvider = t?.authProvider),
      (this._fetch = t?.fetch),
      (this._fetchWithInit = jbt(t?.fetch, t?.requestInit)),
      (this._followRedirects = t?.redirectPolicy === "follow"),
      this._followRedirects)
    )
      ((this._fetch = Qje(this._fetch)), (this._fetchWithInit = Qje(this._fetchWithInit)));
  }
  _unfollowedRedirect(e, t) {
    let r = Yje(e, t);
    return r && !this._followRedirects ? `${r} (redirectPolicy: 'same-origin')` : r;
  }
  async _authThenStart() {
    if (!this._authProvider) throw new Lb("No auth provider");
    let e;
    try {
      e = await _ee(this._authProvider, {
        serverUrl: this._url,
        resourceMetadataUrl: this._resourceMetadataUrl,
        scope: this._scope,
        fetchFn: this._fetchWithInit,
      });
    } catch (t) {
      throw (this.onerror?.(t), t);
    }
    if (e !== "AUTHORIZED") throw new Lb();
    return await this._startOrAuth();
  }
  async _commonHeaders() {
    let e = {};
    if (this._authProvider) {
      let r = await this._authProvider.tokens();
      if (r) e.Authorization = `Bearer ${r.access_token}`;
    }
    if (this._protocolVersion) e["mcp-protocol-version"] = this._protocolVersion;
    let t = zje(this._requestInit?.headers);
    return new Headers({ ...e, ...t });
  }
  _startOrAuth() {
    let e = this?._eventSourceInit?.fetch ?? this._fetch ?? fetch,
      t = this._followRedirects ? e : YX(e),
      r;
    return new Promise((s, a) => {
      ((this._eventSource = new cPe(this._url.href, {
        ...this._eventSourceInit,
        fetch: async (H, u) => {
          let f = await this._commonHeaders();
          f.set("Accept", "text/event-stream");
          let d = await t(H, { ...u, headers: f });
          if (((r = this._unfollowedRedirect(d, H)), d.status === 401 && d.headers.has("www-authenticate"))) {
            let { resourceMetadataUrl: _, scope: L } = nPe(d);
            ((this._resourceMetadataUrl = _), (this._scope = L));
          }
          return d;
        },
      })),
        (this._abortController = new AbortController()),
        (this._eventSource.onerror = (H) => {
          if (H.code === 401 && this._authProvider) {
            this._authThenStart().then(s, a);
            return;
          }
          let u = new pRi(H.code, r ?? H.message, H);
          (a(u), this.onerror?.(u));
        }),
        (this._eventSource.onopen = () => {}),
        this._eventSource.addEventListener("endpoint", (H) => {
          let u = H;
          try {
            if (((this._endpoint = new URL(u.data, this._url)), this._endpoint.origin !== this._url.origin))
              throw Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`);
          } catch (f) {
            (a(f), this.onerror?.(f), this.close());
            return;
          }
          s();
        }),
        (this._eventSource.onmessage = (H) => {
          let u = H,
            f;
          try {
            f = wHe.parse(JSON.parse(u.data));
          } catch (d) {
            this.onerror?.(d);
            return;
          }
          this.onmessage?.(f);
        }));
    });
  }
  async start() {
    if (this._eventSource)
      throw Error(
        "SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.",
      );
    return await this._startOrAuth();
  }
  async finishAuth(e) {
    if (!this._authProvider) throw new Lb("No auth provider");
    if (
      (await _ee(this._authProvider, {
        serverUrl: this._url,
        authorizationCode: e,
        resourceMetadataUrl: this._resourceMetadataUrl,
        scope: this._scope,
        fetchFn: this._fetchWithInit,
      })) !== "AUTHORIZED"
    )
      throw new Lb("Failed to authorize");
  }
  async close() {
    (this._abortController?.abort(), this._eventSource?.close(), this.onclose?.());
  }
  async send(e, t) {
    return this._send(e, t, !1);
  }
  async _send(e, t, r) {
    if (!this._endpoint) throw Error("Not connected");
    try {
      if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
      let s = await this._commonHeaders();
      if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
      s.set("content-type", "application/json");
      let a = {
          ...this._requestInit,
          method: "POST",
          headers: s,
          body: JSON.stringify(e),
          signal: this._abortController?.signal,
        },
        H = await YX(this._fetch ?? fetch)(this._endpoint, a);
      if (!H.ok) {
        let u = await H.text().catch(() => null);
        if (H.status === 401 && this._authProvider) {
          if (r) throw Error("Server returned 401 after successful authentication");
          if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
          let { resourceMetadataUrl: f, scope: d } = nPe(H);
          if (
            ((this._resourceMetadataUrl = f),
            (this._scope = d),
            (await _ee(this._authProvider, {
              serverUrl: this._url,
              resourceMetadataUrl: this._resourceMetadataUrl,
              scope: this._scope,
              fetchFn: this._fetchWithInit,
            })) !== "AUTHORIZED")
          )
            throw new Lb();
          if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
          if (
            ![
              "initialize",
              "notifications/initialized",
              "ping",
              "tools/list",
              "resources/list",
              "resources/read",
              "resources/templates/list",
              "prompts/list",
              "prompts/get",
            ].includes(e.method)
          )
            throw Error(
              "MCP authentication changed during a non-replayable request; its result is unknown. Review the remote action before retrying.",
            );
          return this._send(e, t, !0);
        }
        throw Error(
          `Error POSTing to endpoint (HTTP ${H.status}): ${this._unfollowedRedirect(H, this._endpoint) ?? u}`,
        );
      }
      await H.body?.cancel();
    } catch (s) {
      throw (this.onerror?.(s), s);
    }
  }
  setProtocolVersion(e) {
    this._protocolVersion = e;
  }
}