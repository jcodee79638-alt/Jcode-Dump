
class iTr {
  constructor(e, t) {
    ((this.cachedToken = null),
      (this.refreshPromise = null),
      (this.tokenExchangeUrl = "https://auth.openai.com/oauth/token"),
      (this.config = e),
      (this.fetch = t ?? HPt()));
  }
  async getToken() {
    if (!this.cachedToken || this.isTokenExpired(this.cachedToken)) {
      if (this.refreshPromise) return await this.refreshPromise;
      this.refreshPromise = this.refreshToken();
      try {
        return await this.refreshPromise;
      } finally {
        this.refreshPromise = null;
      }
    }
    if (this.needsRefresh(this.cachedToken) && !this.refreshPromise)
      this.refreshPromise = this.refreshToken().finally(() => {
        this.refreshPromise = null;
      });
    return this.cachedToken.token;
  }
  async refreshToken() {
    let e = await this.config.provider.getToken(),
      t = {
        grant_type: t3a,
        subject_token: e,
        subject_token_type: e3a[this.config.provider.tokenType],
        identity_provider_id: this.config.identityProviderId,
        service_account_id: this.config.serviceAccountId,
      };
    if (this.config.clientId) t.client_id = this.config.clientId;
    let r = await this.fetch(this.tokenExchangeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    if (!r.ok) {
      let u = await r.text(),
        f = void 0;
      try {
        f = JSON.parse(u);
      } catch {}
      if (r.status === 400 || r.status === 401 || r.status === 403) throw new VPe(r.status, f, r.headers);
      throw CI.generate(r.status, f, `Token exchange failed with status ${r.status}`, r.headers);
    }
    let s = await r.json(),
      a = s.expires_in || 3600,
      H = Date.now() + a * 1000;
    return ((this.cachedToken = { token: s.access_token, expiresAt: H }), s.access_token);
  }
  isTokenExpired(e) {
    return Date.now() >= e.expiresAt;
  }
  needsRefresh(e) {
    let r = (this.config.refreshBufferSeconds ?? 1200) * 1000;
    return Date.now() >= e.expiresAt - r;
  }
  invalidateToken() {
    ((this.cachedToken = null), (this.refreshPromise = null));
  }
}