
var GAi = Ie(function (VAi) {
  Object.defineProperty(VAi, "__esModule", { value: !0 });
  VAi.Fulcio = void 0;
  var RAi = X4e();
  class WAi {
    options;
    constructor(e) {
      this.options = e;
    }
    async createSigningCertificate(e) {
      let { baseURL: t, retry: r, timeout: s } = this.options,
        a = `${t}/api/v2/signingCert`;
      return (
        await RAi.fetchWithRetry(a, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
          timeout: s,
          retry: r,
        })
      ).json();
    }
  }
  VAi.Fulcio = WAi;
});