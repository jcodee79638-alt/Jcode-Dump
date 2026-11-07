
var OMr = ne(() => {
  Gt();
  kMr = class kMr extends Ybt {
    pendingClientInfo;
    pendingTokens;
    async clientInformation() {
      if (!this.config.clientId) return this.pendingClientInfo;
      return super.clientInformation();
    }
    async saveClientInformation(e) {
      this.pendingClientInfo = e;
    }
    async tokens() {
      return this.pendingTokens;
    }
    async saveTokens(e) {
      this.pendingTokens = e;
    }
    async invalidateCredentials(e) {
      if (e === "all" || e === "client") this.pendingClientInfo = void 0;
      if (e === "all" || e === "tokens") this.pendingTokens = void 0;
    }
    async commit() {
      if (!this.pendingTokens) return;
      await oL(
        this.auth.set(
          this.mcpName,
          {
            tokens: {
              issuer: this.pendingTokens.issuer,
              accessToken: this.pendingTokens.access_token,
              refreshToken: this.pendingTokens.refresh_token,
              expiresAt: this.pendingTokens.expires_in
                ? Date.now() / 1000 + this.pendingTokens.expires_in
                : void 0,
              scope: this.pendingTokens.scope,
            },
            clientInfo:
              this.pendingClientInfo && !this.config.clientId
                ? {
                    issuer: this.pendingClientInfo.issuer,
                    clientId: this.pendingClientInfo.client_id,
                    clientSecret: this.pendingClientInfo.client_secret,
                    clientIdIssuedAt: this.pendingClientInfo.client_id_issued_at,
                    clientSecretExpiresAt: this.pendingClientInfo.client_secret_expires_at,
                  }
                : void 0,
          },
          this.serverUrl,
        ),
      );
    }
  };
});