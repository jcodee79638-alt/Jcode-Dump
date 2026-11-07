
var tdi = Ie(function (edi) {
  Object.defineProperty(edi, "__esModule", { value: !0 });
  edi.verifyPublicKey = MYo;
  edi.verifyCertificate = xYo;
  var zpi = L8(),
    Qpi = aP(),
    Ypi = cmr(),
    Zpi = Kpi(),
    DYo = "1.3.6.1.4.1.57264.1.1",
    yYo = "1.3.6.1.4.1.57264.1.8";
  function MYo(e, t, r) {
    let s = r.publicKey(e);
    return (
      t.forEach((a) => {
        if (!s.validFor(a))
          throw new Qpi.VerificationError({
            code: "PUBLIC_KEY_ERROR",
            message: `Public key is not valid for timestamp: ${a.toISOString()}`,
          });
      }),
      { key: s.publicKey }
    );
  }
  function xYo(e, t, r) {
    let s = [];
    return (
      t.forEach((a) => {
        s = Ypi.verifyCertificateChain(a, e, r.certificateAuthorities);
      }),
      { scts: Zpi.verifySCTs(s[0], s[1], r.ctlogs), signer: SYo(s[0]) }
    );
  }
  function SYo(e) {
    let t,
      r = e.extension(yYo);
    if (r) t = r.valueObj.subs?.[0]?.value.toString("ascii");
    else t = e.extension(DYo)?.value.toString("ascii");
    let s = e.extensions.map((H) => ({
        oid: { id: H.subs[0].toOID().split(".").map(Number) },
        value: H.subs[H.subs.length - 1].value,
      })),
      a = { extensions: { issuer: t }, subjectAlternativeName: e.subjectAltName, oids: s };
    return { key: zpi.crypto.createPublicKey(e.publicKey), identity: a };
  }
});