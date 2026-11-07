
var YAi = Ie(function (zAi) {
  Object.defineProperty(zAi, "__esModule", { value: !0 });
  zAi.CAClient = void 0;
  var XAi = kTe(),
    JAi = GAi();
  class KAi {
    fulcio;
    constructor(e) {
      this.fulcio = new JAi.Fulcio({ baseURL: e.fulcioBaseURL, retry: e.retry, timeout: e.timeout });
    }
    async createSigningCertificate(e, t, r) {
      let s = qJo(e, t, r);
      try {
        let a = await this.fulcio.createSigningCertificate(s);
        return (
          a.signedCertificateEmbeddedSct ? a.signedCertificateEmbeddedSct : a.signedCertificateDetachedSct
        ).chain.certificates;
      } catch (a) {
        XAi.internalError(a, "CA_CREATE_SIGNING_CERTIFICATE_ERROR", "error creating signing certificate");
      }
    }
  }
  zAi.CAClient = KAi;
  function qJo(e, t, r) {
    return {
      credentials: { oidcIdentityToken: e },
      publicKeyRequest: {
        publicKey: { algorithm: "ECDSA", content: t },
        proofOfPossession: r.toString("base64"),
      },
    };
  }
});