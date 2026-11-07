
var WHi = Ie(function (RHi) {
  Object.defineProperty(RHi, "__esModule", { value: !0 });
  RHi.toMessageSignatureBundle = L5o;
  RHi.toDSSEBundle = $5o;
  var FHi = _Z(),
    rae = IDt();
  function L5o(e) {
    return {
      mediaType: e.certificateChain ? rae.BUNDLE_V02_MEDIA_TYPE : rae.BUNDLE_V03_MEDIA_TYPE,
      content: {
        $case: "messageSignature",
        messageSignature: {
          messageDigest: { algorithm: FHi.HashAlgorithm.SHA2_256, digest: e.digest },
          signature: e.signature,
        },
      },
      verificationMaterial: BHi(e),
    };
  }
  function $5o(e) {
    return {
      mediaType: e.certificateChain ? rae.BUNDLE_V02_MEDIA_TYPE : rae.BUNDLE_V03_MEDIA_TYPE,
      content: { $case: "dsseEnvelope", dsseEnvelope: g5o(e) },
      verificationMaterial: BHi(e),
    };
  }
  function g5o(e) {
    return { payloadType: e.artifactType, payload: e.artifact, signatures: [E5o(e)] };
  }
  function E5o(e) {
    return { keyid: e.keyHint || "", sig: e.signature };
  }
  function BHi(e) {
    return { content: I5o(e), tlogEntries: [], timestampVerificationData: { rfc3161Timestamps: [] } };
  }
  function I5o(e) {
    if (e.certificate)
      if (e.certificateChain)
        return {
          $case: "x509CertificateChain",
          x509CertificateChain: { certificates: [{ rawBytes: e.certificate }] },
        };
      else return { $case: "certificate", certificate: { rawBytes: e.certificate } };
    else return { $case: "publicKey", publicKey: { hint: e.keyHint || "" } };
  }
});