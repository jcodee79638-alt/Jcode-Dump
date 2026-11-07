
var Kpi = Ie(function (Jpi) {
  Object.defineProperty(Jpi, "__esModule", { value: !0 });
  Jpi.verifySCTs = EYo;
  var yae = L8(),
    Gpi = aP(),
    Xpi = uve();
  function EYo(e, t, r) {
    let s,
      a = e.clone();
    for (let d = 0; d < a.extensions.length; d++) {
      let _ = a.extensions[d];
      if (_.subs[0].toOID() === yae.EXTENSION_OID_SCT) {
        ((s = new yae.X509SCTExtension(_)), a.extensions.splice(d, 1));
        break;
      }
    }
    if (!s) return [];
    if (s.signedCertificateTimestamps.length === 0) return [];
    let H = new yae.ByteStream(),
      u = yae.crypto.digest("sha256", t.publicKey);
    H.appendView(u);
    let f = a.tbsCertificate.toDER();
    return (
      H.appendUint24(f.length),
      H.appendView(f),
      s.signedCertificateTimestamps.map((d) => {
        if (
          !Xpi.filterTLogAuthorities(r, { logID: d.logID, targetDate: d.datetime }).some((I) =>
            d.verify(H.buffer, I.publicKey),
          )
        )
          throw new Gpi.VerificationError({ code: "CERTIFICATE_ERROR", message: "SCT verification failed" });
        return d.logID;
      })
    );
  }
});