
var jpi = Ie(function (bpi) {
  Object.defineProperty(bpi, "__esModule", { value: !0 });
  bpi.toSignedEntity = oYo;
  bpi.signatureContent = vpi;
  var cve = L8(),
    Spi = Ipi(),
    Tpi = xpi();
  function oYo(e, t) {
    let { tlogEntries: r, timestampVerificationData: s } = e.verificationMaterial,
      a = [];
    for (let H of r)
      if (H.integratedTime && H.integratedTime !== "0") a.push({ $case: "transparency-log", tlogEntry: H });
    for (let H of s?.rfc3161Timestamps ?? [])
      a.push({
        $case: "timestamp-authority",
        timestamp: cve.RFC3161Timestamp.parse(Buffer.from(H.signedTimestamp)),
      });
    return { signature: vpi(e, t), key: aYo(e), tlogEntries: r, timestamps: a };
  }
  function vpi(e, t) {
    switch (e.content.$case) {
      case "dsseEnvelope":
        return new Spi.DSSESignatureContent(e.content.dsseEnvelope);
      case "messageSignature":
        return new Tpi.MessageSignatureContent(e.content.messageSignature, t);
    }
  }
  function aYo(e) {
    switch (e.verificationMaterial.content.$case) {
      case "publicKey":
        return { $case: "public-key", hint: e.verificationMaterial.content.publicKey.hint };
      case "x509CertificateChain":
        return {
          $case: "certificate",
          certificate: cve.X509Certificate.parse(
            Buffer.from(e.verificationMaterial.content.x509CertificateChain.certificates[0].rawBytes),
          ),
        };
      case "certificate":
        return {
          $case: "certificate",
          certificate: cve.X509Certificate.parse(
            Buffer.from(e.verificationMaterial.content.certificate.rawBytes),
          ),
        };
    }
  }
});