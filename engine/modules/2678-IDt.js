
var IDt = Ie(function (UHi) {
  Object.defineProperty(UHi, "__esModule", { value: !0 });
  UHi.BUNDLE_V03_MEDIA_TYPE =
    UHi.BUNDLE_V03_LEGACY_MEDIA_TYPE =
    UHi.BUNDLE_V02_MEDIA_TYPE =
    UHi.BUNDLE_V01_MEDIA_TYPE =
      void 0;
  UHi.isBundleWithCertificateChain = H5o;
  UHi.isBundleWithPublicKey = c5o;
  UHi.isBundleWithMessageSignature = A5o;
  UHi.isBundleWithDsseEnvelope = u5o;
  UHi.BUNDLE_V01_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle+json;version=0.1";
  UHi.BUNDLE_V02_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle+json;version=0.2";
  UHi.BUNDLE_V03_LEGACY_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle+json;version=0.3";
  UHi.BUNDLE_V03_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle.v0.3+json";
  function H5o(e) {
    return e.verificationMaterial.content.$case === "x509CertificateChain";
  }
  function c5o(e) {
    return e.verificationMaterial.content.$case === "publicKey";
  }
  function A5o(e) {
    return e.content.$case === "messageSignature";
  }
  function u5o(e) {
    return e.content.$case === "dsseEnvelope";
  }
});