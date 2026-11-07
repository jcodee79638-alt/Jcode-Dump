
var uve = Ie(function (jyt) {
  Object.defineProperty(jyt, "__esModule", { value: !0 });
  jyt.filterTLogAuthorities = jyt.filterCertAuthorities = void 0;
  jyt.toTrustMaterial = dYo;
  var Ave = L8(),
    Q5 = _Z(),
    Bpi = aP(),
    omr = new Date(0),
    amr = new Date(8640000000000000),
    Rpi = Upi();
  Object.defineProperty(jyt, "filterCertAuthorities", {
    enumerable: !0,
    get: function () {
      return Rpi.filterCertAuthorities;
    },
  });
  Object.defineProperty(jyt, "filterTLogAuthorities", {
    enumerable: !0,
    get: function () {
      return Rpi.filterTLogAuthorities;
    },
  });
  function dYo(e, t) {
    let r = typeof t === "function" ? t : mYo(t);
    return {
      certificateAuthorities: e.certificateAuthorities.map(Fpi),
      timestampAuthorities: e.timestampAuthorities.map(Fpi),
      tlogs: e.tlogs.map(Npi),
      ctlogs: e.ctlogs.map(Npi),
      publicKey: r,
    };
  }
  function Npi(e) {
    let t = e.publicKey.keyDetails,
      r =
        t === Q5.PublicKeyDetails.PKCS1_RSA_PKCS1V5 ||
        t === Q5.PublicKeyDetails.PKIX_RSA_PKCS1V5 ||
        t === Q5.PublicKeyDetails.PKIX_RSA_PKCS1V15_2048_SHA256 ||
        t === Q5.PublicKeyDetails.PKIX_RSA_PKCS1V15_3072_SHA256 ||
        t === Q5.PublicKeyDetails.PKIX_RSA_PKCS1V15_4096_SHA256
          ? "pkcs1"
          : "spki";
    return {
      baseURL: e.baseUrl,
      logID: e.checkpointKeyId ? e.checkpointKeyId.keyId : e.logId.keyId,
      publicKey: Ave.crypto.createPublicKey(e.publicKey.rawBytes, r),
      validFor: { start: e.publicKey.validFor?.start || omr, end: e.publicKey.validFor?.end || amr },
    };
  }
  function Fpi(e) {
    return {
      certChain: e.certChain.certificates.map((t) => Ave.X509Certificate.parse(Buffer.from(t.rawBytes))),
      validFor: { start: e.validFor?.start || omr, end: e.validFor?.end || amr },
    };
  }
  function mYo(e) {
    return (t) => {
      let r = (e || {})[t];
      if (!r) throw new Bpi.VerificationError({ code: "PUBLIC_KEY_ERROR", message: `key not found: ${t}` });
      return {
        publicKey: Ave.crypto.createPublicKey(r.rawBytes),
        validFor: (s) => (r.validFor?.start || omr) <= s && (r.validFor?.end || amr) >= s,
      };
    };
  }
});