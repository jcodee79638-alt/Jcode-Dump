
var Aui = Ie(function (aui) {
  Object.defineProperty(aui, "__esModule", { value: !0 });
  aui.FulcioSigner = aui.DEFAULT_FULCIO_URL = void 0;
  var OTe = kTe(),
    nui = Hae(),
    iui = YAi(),
    sui = rui();
  aui.DEFAULT_FULCIO_URL = "https://fulcio.sigstore.dev";
  class oui {
    ca;
    identityProvider;
    keyHolder;
    constructor(e) {
      ((this.ca = new iui.CAClient({ ...e, fulcioBaseURL: e.fulcioBaseURL || aui.DEFAULT_FULCIO_URL })),
        (this.identityProvider = e.identityProvider),
        (this.keyHolder = e.keyHolder || new sui.EphemeralSigner()));
    }
    async sign(e) {
      let t = await this.getIdentityToken(),
        r;
      try {
        r = nui.oidc.extractJWTSubject(t);
      } catch (u) {
        throw new OTe.InternalError({
          code: "IDENTITY_TOKEN_PARSE_ERROR",
          message: `invalid identity token: ${t}`,
          cause: u,
        });
      }
      let s = await this.keyHolder.sign(Buffer.from(r));
      if (s.key.$case !== "publicKey")
        throw new OTe.InternalError({
          code: "CA_CREATE_SIGNING_CERTIFICATE_ERROR",
          message: "unexpected format for signing key",
        });
      let a = await this.ca.createSigningCertificate(t, s.key.publicKey, s.signature);
      return {
        signature: (await this.keyHolder.sign(e)).signature,
        key: { $case: "x509Certificate", certificate: a[0] },
      };
    }
    async getIdentityToken() {
      try {
        return await this.identityProvider.getToken();
      } catch (e) {
        throw new OTe.InternalError({
          code: "IDENTITY_TOKEN_READ_ERROR",
          message: "error retrieving identity token",
          cause: e,
        });
      }
    }
  }
  aui.FulcioSigner = oui;
});