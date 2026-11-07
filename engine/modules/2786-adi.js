
var adi = Ie(function (odi) {
  Object.defineProperty(odi, "__esModule", { value: !0 });
  odi.verifyRFC3161Timestamp = UYo;
  var fve = L8(),
    Pyt = aP(),
    idi = cmr(),
    sdi = uve();
  function UYo(e, t, r) {
    let s = e.signingTime;
    if (
      ((r = sdi.filterCertAuthorities(r, s)),
      (r = FYo(r, { serialNumber: e.signerSerialNumber, issuer: e.signerIssuer })),
      !r.some((H) => {
        try {
          return (NYo(e, t, H), !0);
        } catch (u) {
          return !1;
        }
      }))
    )
      throw new Pyt.VerificationError({
        code: "TIMESTAMP_ERROR",
        message: "timestamp could not be verified",
      });
  }
  function NYo(e, t, r) {
    let [s, ...a] = r.certChain,
      H = fve.crypto.createPublicKey(s.publicKey),
      u = e.signingTime;
    try {
      new idi.CertificateChainVerifier({ untrustedCert: s, trustedCerts: a, timestamp: u }).verify();
    } catch (f) {
      throw new Pyt.VerificationError({ code: "TIMESTAMP_ERROR", message: "invalid certificate chain" });
    }
    e.verify(t, H);
  }
  function FYo(e, t) {
    return e.filter(
      (r) =>
        r.certChain.length > 0 &&
        fve.crypto.bufferEqual(r.certChain[0].serialNumber, t.serialNumber) &&
        fve.crypto.bufferEqual(r.certChain[0].issuer, t.issuer),
    );
  }
});