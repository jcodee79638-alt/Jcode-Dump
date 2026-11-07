
class Jbt {
  constructor(e, t) {
    if (
      ((this._hasCompletedAuthFlow = !1),
      (this._url = e),
      (this._resourceMetadataUrl = void 0),
      (this._scope = void 0),
      (this._requestInit = t?.requestInit),
      (this._authProvider = t?.authProvider),
      (this._fetch = t?.fetch),
      (this._fetchWithInit = jbt(t?.fetch, t?.requestInit)),
      (this._followRedirects = t?.redirectPolicy === "follow"),
      this._followRedirects)
    )
      ((this._fetch = Qje(this._fetch)), (this._fetchWithInit = Qje(this._fetchWithInit)));
    ((this._sessionId = t?.sessionId), (this._reconnectionOptions = t?.reconnectionOptions ?? AFa));
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
    return await this._startOrAuthSse({ resumptionToken: void 0 });
  }
  async _commonHeaders() {
    let e = {};
    if (this._authProvider) {
      let r = await this._authProvider.tokens();
      if (r) e.Authorization = `Bearer ${r.access_token}`;
    }
    if (this._sessionId) e["mcp-session-id"] = this._sessionId;
    if (this._protocolVersion) e["mcp-protocol-version"] = this._protocolVersion;
    let t = zje(this._requestInit?.headers);
    return new Headers({ ...e, ...t });
  }
  async _startOrAuthSse(e) {
    let { resumptionToken: t } = e;
    try {
      let r = await this._commonHeaders();
      if ((r.set("Accept", "text/event-stream"), t)) r.set("last-event-id", t);
      let s = this._fetch ?? fetch,
        a = { method: "GET", headers: r, signal: this._abortController?.signal },
        H = await s(this._url, this._followRedirects ? a : { ...a, redirect: "manual" }),
        u = this._followRedirects ? void 0 : Pbt(s, this._url, a, H);
      if (u) H = await u;
      if (!H.ok) {
        if ((await H.body?.cancel(), H.status === 401 && this._authProvider))
          return await this._authThenStart();
        if (H.status === 405) return;
        throw new ZX(
          H.status,
          `Failed to open SSE stream: ${this._unfollowedRedirect(H, this._url) ?? H.statusText}`,
        );
      }
      this._handleSseStream(H.body, e, !0);
    } catch (r) {
      throw (this.onerror?.(r), r);
    }
  }
  _getNextReconnectionDelay(e) {
    if (this._serverRetryMs !== void 0) return this._serverRetryMs;
    let t = this._reconnectionOptions.initialReconnectionDelay,
      r = this._reconnectionOptions.reconnectionDelayGrowFactor,
      s = this._reconnectionOptions.maxReconnectionDelay;
    return Math.min(t * Math.pow(r, e), s);
  }
  _scheduleReconnection(e, t = 0) {
    let r = this._reconnectionOptions.maxRetries;
    if (t >= r) {
      this.onerror?.(Error(`Maximum reconnection attempts (${r}) exceeded.`));
      return;
    }
    let s = this._getNextReconnectionDelay(t);
    this._reconnectionTimeout = setTimeout(() => {
      this._startOrAuthSse(e).catch((a) => {
        (this.onerror?.(
          Error(`Failed to reconnect SSE stream: ${a instanceof Error ? a.message : String(a)}`),
        ),
          this._scheduleReconnection(e, t + 1));
      });
    }, s);
  }
  _handleSseStream(e, t, r) {
    if (!e) return;
    let { onresumptiontoken: s, replayMessageId: a } = t,
      H,
      u = !1,
      f = !1;
    (async () => {
      try {
        let _ = e
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(
            new P5e({
              onRetry: (D) => {
                this._serverRetryMs = D;
              },
            }),
          )
          .getReader();
        while (!0) {
          let { value: D, done: S } = await _.read();
          if (S) break;
          if (D.id) ((H = D.id), (u = !0), s?.(D.id));
          if (!D.data) continue;
          if (!D.event || D.event === "message")
            try {
              let T = wHe.parse(JSON.parse(D.data));
              if (qhe(T) || Dvt(T)) {
                if (((f = !0), a !== void 0)) T.id = a;
              }
              this.onmessage?.(T);
            } catch (T) {
              this.onerror?.(T);
            }
        }
        if ((r || u) && !f && this._abortController && !this._abortController.signal.aborted)
          this._scheduleReconnection({ resumptionToken: H, onresumptiontoken: s, replayMessageId: a }, 0);
      } catch (_) {
        if (
          (this.onerror?.(Error(`SSE stream disconnected: ${_}`)),
          (r || u) && !f && this._abortController && !this._abortController.signal.aborted)
        )
          try {
            this._scheduleReconnection({ resumptionToken: H, onresumptiontoken: s, replayMessageId: a }, 0);
          } catch (D) {
            this.onerror?.(Error(`Failed to reconnect: ${D instanceof Error ? D.message : String(D)}`));
          }
      }
    })();
  }
  async start() {
    if (this._abortController)
      throw Error(
        "StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.",
      );
    this._abortController = new AbortController();
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
    if (this._reconnectionTimeout)
      (clearTimeout(this._reconnectionTimeout), (this._reconnectionTimeout = void 0));
    (this._abortController?.abort(), this.onclose?.());
  }
  async send(e, t) {
    return this._send(e, t, !1);
  }
  async _recoverSession(e) {
    if (this._sessionRecovery) return (await this._sessionRecovery, !0);
    if (this._sessionId !== e) return !0;
    ((this._sessionId = void 0),
      (this._sessionRecovery = Promise.resolve().then(() => this.onsessionexpired?.())));
    try {
      await this._sessionRecovery;
    } catch (t) {
      throw ((this._sessionId = void 0), await this.close(), t);
    } finally {
      this._sessionRecovery = void 0;
    }
    return !0;
  }
  async _send(e, t, r) {
    try {
      if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
      if (this._sessionRecovery && !nUi(e) && !Mvt(e)) {
        if ((await this._sessionRecovery, t?.isRequestActive?.() === !1))
          throw Error("Request is no longer active");
      }
      let { resumptionToken: s, onresumptiontoken: a } = t || {};
      if (s) {
        this._startOrAuthSse({ resumptionToken: s, replayMessageId: $Xe(e) ? e.id : void 0 }).catch((T) =>
          this.onerror?.(T),
        );
        return;
      }
      let H = await this._commonHeaders();
      if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
      let u = H.get("mcp-session-id") ?? void 0;
      (H.set("content-type", "application/json"), H.set("accept", "application/json, text/event-stream"));
      let f = {
          ...this._requestInit,
          method: "POST",
          headers: H,
          body: JSON.stringify(e),
          signal: this._abortController?.signal,
        },
        d = await YX(this._fetch ?? fetch)(this._url, f),
        _ = d.headers.get("mcp-session-id");
      if (_ && (u === void 0 || this._sessionId === u)) this._sessionId = _;
      if (!d.ok) {
        let T = await d.text().catch(() => null);
        if (d.status === 404 && u && !r && !Mvt(e)) {
          let C = await this._recoverSession(u);
          if (t?.isRequestActive?.() === !1) throw Error("Request is no longer active");
          if (
            C &&
            [
              "ping",
              "tools/list",
              "resources/list",
              "resources/read",
              "resources/templates/list",
              "prompts/list",
              "prompts/get",
            ].includes(e.method)
          )
            return this._send(e, t, !0);
          throw new ZX(
            404,
            "MCP session expired during a non-replayable request; its result is unknown. Review the remote action before retrying.",
          );
        }
        if (d.status === 401 && this._authProvider) {
          if (this._hasCompletedAuthFlow)
            throw new ZX(401, "Server returned 401 after successful authentication");
          let { resourceMetadataUrl: C, scope: O } = nPe(d);
          if (((this._resourceMetadataUrl = C), (this._scope = O), t?.isRequestActive?.() === !1))
            throw Error("Request is no longer active");
          if (
            (await _ee(this._authProvider, {
              serverUrl: this._url,
              resourceMetadataUrl: this._resourceMetadataUrl,
              scope: this._scope,
              fetchFn: this._fetchWithInit,
            })) !== "AUTHORIZED"
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
            throw new ZX(
              d.status,
              "MCP authentication changed during a non-replayable request; its result is unknown. Review the remote action before retrying.",
            );
          return ((this._hasCompletedAuthFlow = !0), this._send(e, t, r));
        }
        if (d.status === 403 && this._authProvider) {
          let { resourceMetadataUrl: C, scope: O, error: B } = nPe(d);
          if (B === "insufficient_scope") {
            let V = d.headers.get("WWW-Authenticate");
            if (this._lastUpscopingHeader === V)
              throw new ZX(403, "Server returned 403 after trying upscoping");
            if (O) this._scope = O;
            if (C) this._resourceMetadataUrl = C;
            if (((this._lastUpscopingHeader = V ?? void 0), t?.isRequestActive?.() === !1))
              throw Error("Request is no longer active");
            if (
              (await _ee(this._authProvider, {
                serverUrl: this._url,
                resourceMetadataUrl: this._resourceMetadataUrl,
                scope: this._scope,
                fetchFn: this._fetch,
              })) !== "AUTHORIZED"
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
              throw new ZX(
                d.status,
                "MCP authentication changed during a non-replayable request; its result is unknown. Review the remote action before retrying.",
              );
            return this._send(e, t, r);
          }
        }
        throw new ZX(d.status, `Error POSTing to endpoint: ${this._unfollowedRedirect(d, this._url) ?? T}`);
      }
      if (((this._hasCompletedAuthFlow = !1), (this._lastUpscopingHeader = void 0), d.status === 202)) {
        if ((await d.body?.cancel(), Mvt(e)))
          this._startOrAuthSse({ resumptionToken: void 0 }).catch((T) => this.onerror?.(T));
        return;
      }
      let I =
          (Array.isArray(e) ? e : [e]).filter((T) => "method" in T && "id" in T && T.id !== void 0).length >
          0,
        D = d.headers.get("content-type"),
        S = BBi(D);
      if (I)
        if (S === "text/event-stream") this._handleSseStream(d.body, { onresumptiontoken: a }, !1);
        else if (S === "application/json") {
          let T = await d.json(),
            C = Array.isArray(T) ? T.map((O) => wHe.parse(O)) : [wHe.parse(T)];
          for (let O of C) this.onmessage?.(O);
        } else throw (await d.body?.cancel(), new ZX(-1, `Unexpected content type: ${D}`));
      else await d.body?.cancel();
    } catch (s) {
      throw (this.onerror?.(s), s);
    }
  }
  get sessionId() {
    return this._sessionId;
  }
  async terminateSession() {
    if (!this._sessionId) return;
    try {
      let e = await this._commonHeaders(),
        t = { ...this._requestInit, method: "DELETE", headers: e, signal: this._abortController?.signal },
        r = await YX(this._fetch ?? fetch)(this._url, t);
      if ((await r.body?.cancel(), !r.ok && r.status !== 405))
        throw new ZX(
          r.status,
          `Failed to terminate session: ${this._unfollowedRedirect(r, this._url) ?? r.statusText}`,
        );
      this._sessionId = void 0;
    } catch (e) {
      throw (this.onerror?.(e), e);
    }
  }
  setProtocolVersion(e) {
    this._protocolVersion = e;
  }
  get protocolVersion() {
    return this._protocolVersion;
  }
  async resumeStream(e, t) {
    await this._startOrAuthSse({ resumptionToken: e, onresumptiontoken: t?.onresumptiontoken });
  }
}