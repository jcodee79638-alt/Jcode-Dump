
class Ybt {
  mcpName;
  serverUrl;
  config;
  callbacks;
  auth;
  constructor(e, t, r, s, a) {
    this.mcpName = e;
    this.serverUrl = t;
    this.config = r;
    this.callbacks = s;
    this.auth = a;
  }
  get redirectUrl() {
    if (this.config.redirectUri) return this.config.redirectUri;
    return `http://127.0.0.1:${this.config.callbackPort ?? uPe}${ice}`;
  }
  get clientMetadata() {
    return {
      redirect_uris: [this.redirectUrl],
      client_name: "OpenCode",
      client_uri: "https://opencode.ai",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: this.config.clientSecret ? "client_secret_post" : "none",
      ...(this.config.scope ? { scope: this.config.scope } : {}),
    };
  }
  async clientInformation() {
    if (this.config.clientId) {
      if (this.config.clientSecret)
        throw Error(
          "Reconnect this MCP server using dynamic registration. Unbound OAuth client secrets are disabled.",
        );
      return { client_id: this.config.clientId, client_secret: this.config.clientSecret };
    }
    let e = await oL(this.auth.getForUrl(this.mcpName, this.serverUrl));
    if (e?.clientInfo?.issuer) {
      if (e.clientInfo.clientSecretExpiresAt && e.clientInfo.clientSecretExpiresAt < Date.now() / 1000)
        return;
      return {
        issuer: e.clientInfo.issuer,
        client_id: e.clientInfo.clientId,
        client_secret: e.clientInfo.clientSecret,
      };
    }
    return;
  }
  async saveClientInformation(e) {
    await oL(
      this.auth.updateClientInfo(
        this.mcpName,
        {
          issuer: e.issuer,
          clientId: e.client_id,
          clientSecret: e.client_secret,
          clientIdIssuedAt: e.client_id_issued_at,
          clientSecretExpiresAt: e.client_secret_expires_at,
        },
        this.serverUrl,
      ),
    );
  }
  async tokens() {
    let e = await oL(this.auth.getForUrl(this.mcpName, this.serverUrl));
    if (!e?.tokens?.issuer) return;
    return {
      issuer: e.tokens.issuer,
      access_token: e.tokens.accessToken,
      token_type: "Bearer",
      refresh_token: e.tokens.refreshToken,
      expires_in: e.tokens.expiresAt
        ? Math.max(0, Math.floor(e.tokens.expiresAt - Date.now() / 1000))
        : void 0,
      scope: e.tokens.scope,
    };
  }
  async saveTokens(e) {
    await oL(
      this.auth.updateTokens(
        this.mcpName,
        {
          issuer: e.issuer,
          accessToken: e.access_token,
          refreshToken: e.refresh_token,
          expiresAt: e.expires_in ? Date.now() / 1000 + e.expires_in : void 0,
          scope: e.scope,
        },
        this.serverUrl,
      ),
    );
  }
  async redirectToAuthorization(e) {
    if (e.protocol !== "http:" && e.protocol !== "https:")
      throw Error(
        `MCP server "${this.serverUrl}" returned a ${e.protocol} authorization URL; only http and https are supported`,
      );
    await this.callbacks.onRedirect(e);
  }
  async saveCodeVerifier(e) {
    await oL(this.auth.updateCodeVerifier(this.mcpName, e));
  }
  async codeVerifier() {
    let e = await oL(this.auth.get(this.mcpName));
    if (!e?.codeVerifier) throw Error(`No code verifier saved for MCP server: ${this.mcpName}`);
    return e.codeVerifier;
  }
  async saveState(e) {
    await oL(this.auth.updateOAuthState(this.mcpName, e));
  }
  async state() {
    let e = await oL(this.auth.get(this.mcpName));
    if (e?.oauthState) return e.oauthState;
    let t = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((r) => r.toString(16).padStart(2, "0"))
      .join("");
    return (await oL(this.auth.updateOAuthState(this.mcpName, t)), t);
  }
  async invalidateCredentials(e) {
    let t = await oL(this.auth.get(this.mcpName));
    if (!t) return;
    switch (e) {
      case "all":
        await oL(this.auth.remove(this.mcpName));
        break;
      case "client":
        (delete t.clientInfo, await oL(this.auth.set(this.mcpName, t)));
        break;
      case "tokens":
        (delete t.tokens, await oL(this.auth.set(this.mcpName, t)));
        break;
    }
  }
}