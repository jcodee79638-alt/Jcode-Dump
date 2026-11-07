
var idr = Ie(function (KHi) {
  Object.defineProperty(KHi, "__esModule", { value: !0 });
  KHi.assertBundle = M5o;
  KHi.assertBundleV01 = XHi;
  KHi.isBundleV01 = x5o;
  KHi.assertBundleV02 = S5o;
  KHi.assertBundleLatest = T5o;
  var nae = ndr();
  function M5o(e) {
    let t = DDt(e);
    if (t.length > 0) throw new nae.ValidationError("invalid bundle", t);
  }
  function XHi(e) {
    let t = [];
    if ((t.push(...DDt(e)), t.push(...v5o(e)), t.length > 0))
      throw new nae.ValidationError("invalid v0.1 bundle", t);
  }
  function x5o(e) {
    try {
      return (XHi(e), !0);
    } catch (t) {
      return !1;
    }
  }
  function S5o(e) {
    let t = [];
    if ((t.push(...DDt(e)), t.push(...JHi(e)), t.length > 0))
      throw new nae.ValidationError("invalid v0.2 bundle", t);
  }
  function T5o(e) {
    let t = [];
    if ((t.push(...DDt(e)), t.push(...JHi(e)), t.push(...b5o(e)), t.length > 0))
      throw new nae.ValidationError("invalid bundle", t);
  }
  function DDt(e) {
    let t = [];
    if (
      e.mediaType === void 0 ||
      (!e.mediaType.match(/^application\/vnd\.dev\.sigstore\.bundle\+json;version=\d\.\d/) &&
        !e.mediaType.match(/^application\/vnd\.dev\.sigstore\.bundle\.v\d\.\d\+json/))
    )
      t.push("mediaType");
    if (e.content === void 0) t.push("content");
    else
      switch (e.content.$case) {
        case "messageSignature":
          if (e.content.messageSignature.messageDigest === void 0)
            t.push("content.messageSignature.messageDigest");
          else if (e.content.messageSignature.messageDigest.digest.length === 0)
            t.push("content.messageSignature.messageDigest.digest");
          if (e.content.messageSignature.signature.length === 0) t.push("content.messageSignature.signature");
          break;
        case "dsseEnvelope":
          if (e.content.dsseEnvelope.payload.length === 0) t.push("content.dsseEnvelope.payload");
          if (e.content.dsseEnvelope.signatures.length !== 1) t.push("content.dsseEnvelope.signatures");
          else if (e.content.dsseEnvelope.signatures[0].sig.length === 0)
            t.push("content.dsseEnvelope.signatures[0].sig");
          break;
      }
    if (e.verificationMaterial === void 0) t.push("verificationMaterial");
    else {
      if (e.verificationMaterial.content === void 0) t.push("verificationMaterial.content");
      else
        switch (e.verificationMaterial.content.$case) {
          case "x509CertificateChain":
            if (e.verificationMaterial.content.x509CertificateChain.certificates.length === 0)
              t.push("verificationMaterial.content.x509CertificateChain.certificates");
            e.verificationMaterial.content.x509CertificateChain.certificates.forEach((r, s) => {
              if (r.rawBytes.length === 0)
                t.push(`verificationMaterial.content.x509CertificateChain.certificates[${s}].rawBytes`);
            });
            break;
          case "certificate":
            if (e.verificationMaterial.content.certificate.rawBytes.length === 0)
              t.push("verificationMaterial.content.certificate.rawBytes");
            break;
        }
      if (e.verificationMaterial.tlogEntries === void 0) t.push("verificationMaterial.tlogEntries");
      else if (e.verificationMaterial.tlogEntries.length > 0)
        e.verificationMaterial.tlogEntries.forEach((r, s) => {
          if (r.logId === void 0) t.push(`verificationMaterial.tlogEntries[${s}].logId`);
          if (r.kindVersion === void 0) t.push(`verificationMaterial.tlogEntries[${s}].kindVersion`);
        });
    }
    return t;
  }
  function v5o(e) {
    let t = [];
    if (e.verificationMaterial && e.verificationMaterial.tlogEntries?.length > 0)
      e.verificationMaterial.tlogEntries.forEach((r, s) => {
        if (r.inclusionPromise === void 0) t.push(`verificationMaterial.tlogEntries[${s}].inclusionPromise`);
      });
    return t;
  }
  function JHi(e) {
    let t = [];
    if (e.verificationMaterial && e.verificationMaterial.tlogEntries?.length > 0)
      e.verificationMaterial.tlogEntries.forEach((r, s) => {
        if (r.inclusionProof === void 0) t.push(`verificationMaterial.tlogEntries[${s}].inclusionProof`);
        else if (r.inclusionProof.checkpoint === void 0)
          t.push(`verificationMaterial.tlogEntries[${s}].inclusionProof.checkpoint`);
      });
    return t;
  }
  function b5o(e) {
    let t = [];
    if (e.verificationMaterial?.content?.$case === "x509CertificateChain")
      t.push("verificationMaterial.content.$case");
    return t;
  }
});