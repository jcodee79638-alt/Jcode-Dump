
var Wpr = Ie(function (THi) {
  Object.defineProperty(THi, "__esModule", { value: !0 });
  THi.Bundle = THi.VerificationMaterial = THi.TimestampVerificationData = void 0;
  var LDt = pDt(),
    U1 = dZ(),
    $Dt = Fpr();
  THi.TimestampVerificationData = {
    fromJSON(e) {
      return {
        rfc3161Timestamps: globalThis.Array.isArray(e?.rfc3161Timestamps)
          ? e.rfc3161Timestamps.map((t) => U1.RFC3161SignedTimestamp.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.rfc3161Timestamps?.length)
        t.rfc3161Timestamps = e.rfc3161Timestamps.map((r) => U1.RFC3161SignedTimestamp.toJSON(r));
      return t;
    },
  };
  THi.VerificationMaterial = {
    fromJSON(e) {
      return {
        content: tae(e.publicKey)
          ? { $case: "publicKey", publicKey: U1.PublicKeyIdentifier.fromJSON(e.publicKey) }
          : tae(e.x509CertificateChain)
            ? {
                $case: "x509CertificateChain",
                x509CertificateChain: U1.X509CertificateChain.fromJSON(e.x509CertificateChain),
              }
            : tae(e.certificate)
              ? { $case: "certificate", certificate: U1.X509Certificate.fromJSON(e.certificate) }
              : void 0,
        tlogEntries: globalThis.Array.isArray(e?.tlogEntries)
          ? e.tlogEntries.map((t) => $Dt.TransparencyLogEntry.fromJSON(t))
          : [],
        timestampVerificationData: tae(e.timestampVerificationData)
          ? THi.TimestampVerificationData.fromJSON(e.timestampVerificationData)
          : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.content?.$case === "publicKey") t.publicKey = U1.PublicKeyIdentifier.toJSON(e.content.publicKey);
      else if (e.content?.$case === "x509CertificateChain")
        t.x509CertificateChain = U1.X509CertificateChain.toJSON(e.content.x509CertificateChain);
      else if (e.content?.$case === "certificate")
        t.certificate = U1.X509Certificate.toJSON(e.content.certificate);
      if (e.tlogEntries?.length) t.tlogEntries = e.tlogEntries.map((r) => $Dt.TransparencyLogEntry.toJSON(r));
      if (e.timestampVerificationData !== void 0)
        t.timestampVerificationData = THi.TimestampVerificationData.toJSON(e.timestampVerificationData);
      return t;
    },
  };
  THi.Bundle = {
    fromJSON(e) {
      return {
        mediaType: tae(e.mediaType) ? globalThis.String(e.mediaType) : "",
        verificationMaterial: tae(e.verificationMaterial)
          ? THi.VerificationMaterial.fromJSON(e.verificationMaterial)
          : void 0,
        content: tae(e.messageSignature)
          ? { $case: "messageSignature", messageSignature: U1.MessageSignature.fromJSON(e.messageSignature) }
          : tae(e.dsseEnvelope)
            ? { $case: "dsseEnvelope", dsseEnvelope: LDt.Envelope.fromJSON(e.dsseEnvelope) }
            : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.mediaType !== "") t.mediaType = e.mediaType;
      if (e.verificationMaterial !== void 0)
        t.verificationMaterial = THi.VerificationMaterial.toJSON(e.verificationMaterial);
      if (e.content?.$case === "messageSignature")
        t.messageSignature = U1.MessageSignature.toJSON(e.content.messageSignature);
      else if (e.content?.$case === "dsseEnvelope")
        t.dsseEnvelope = LDt.Envelope.toJSON(e.content.dsseEnvelope);
      return t;
    },
  };
  function tae(e) {
    return e !== null && e !== void 0;
  }
});