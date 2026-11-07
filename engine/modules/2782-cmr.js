
var cmr = Ie(function (Vpi) {
  Object.defineProperty(Vpi, "__esModule", { value: !0 });
  Vpi.CertificateChainVerifier = void 0;
  Vpi.verifyCertificateChain = LYo;
  var HP = aP(),
    Wpi = uve();
  function LYo(e, t, r) {
    let s = Wpi.filterCertAuthorities(r, e),
      a;
    for (let H of s)
      try {
        return new Hmr({ trustedCerts: H.certChain, untrustedCert: t, timestamp: e }).verify();
      } catch (u) {
        a = u;
      }
    throw new HP.VerificationError({
      code: "CERTIFICATE_ERROR",
      message: "Failed to verify certificate chain",
      cause: a,
    });
  }
  class Hmr {
    untrustedCert;
    trustedCerts;
    localCerts;
    timestamp;
    constructor(e) {
      ((this.untrustedCert = e.untrustedCert),
        (this.trustedCerts = e.trustedCerts),
        (this.localCerts = $Yo([...e.trustedCerts, e.untrustedCert])),
        (this.timestamp = e.timestamp));
    }
    verify() {
      let e = this.sort();
      if ((this.checkPath(e), !e.every((r) => r.validForDate(this.timestamp))))
        throw new HP.VerificationError({
          code: "CERTIFICATE_ERROR",
          message: "certificate is not valid or expired at the specified date",
        });
      return e;
    }
    sort() {
      let e = this.untrustedCert,
        t = this.buildPaths(e);
      if (((t = t.filter((s) => s.some((a) => this.trustedCerts.includes(a)))), t.length === 0))
        throw new HP.VerificationError({
          code: "CERTIFICATE_ERROR",
          message: "no trusted certificate path found",
        });
      let r = t.reduce((s, a) => (s.length < a.length ? s : a));
      return [e, ...r].slice(0, -1);
    }
    buildPaths(e) {
      let t = [],
        r = this.findIssuer(e);
      if (r.length === 0)
        throw new HP.VerificationError({
          code: "CERTIFICATE_ERROR",
          message: "no valid certificate path found",
        });
      for (let s = 0; s < r.length; s++) {
        let a = r[s];
        if (a.equals(e)) {
          t.push([e]);
          continue;
        }
        let H = this.buildPaths(a);
        for (let u = 0; u < H.length; u++) t.push([a, ...H[u]]);
      }
      return t;
    }
    findIssuer(e) {
      let t = [],
        r;
      if (e.subject.equals(e.issuer)) {
        if (e.verify()) return [e];
      }
      if (e.extAuthorityKeyID) r = e.extAuthorityKeyID.keyIdentifier;
      return (
        this.localCerts.forEach((s) => {
          if (r) {
            if (s.extSubjectKeyID) {
              if (s.extSubjectKeyID.keyIdentifier.equals(r)) t.push(s);
              return;
            }
          }
          if (s.subject.equals(e.issuer)) t.push(s);
        }),
        (t = t.filter((s) => {
          try {
            return e.verify(s);
          } catch (a) {
            return !1;
          }
        })),
        t
      );
    }
    checkPath(e) {
      if (e.length < 1)
        throw new HP.VerificationError({
          code: "CERTIFICATE_ERROR",
          message: "certificate chain must contain at least one certificate",
        });
      if (!e.slice(1).every((r) => r.isCA))
        throw new HP.VerificationError({
          code: "CERTIFICATE_ERROR",
          message: "intermediate certificate is not a CA",
        });
      for (let r = e.length - 2; r >= 0; r--)
        if (!e[r].issuer.equals(e[r + 1].subject))
          throw new HP.VerificationError({
            code: "CERTIFICATE_ERROR",
            message: "incorrect certificate name chaining",
          });
      for (let r = 0; r < e.length; r++) {
        let s = e[r];
        if (s.extBasicConstraints?.isCA) {
          let a = s.extBasicConstraints.pathLenConstraint;
          if (a !== void 0 && a < r - 1)
            throw new HP.VerificationError({
              code: "CERTIFICATE_ERROR",
              message: "path length constraint exceeded",
            });
        }
      }
    }
  }
  Vpi.CertificateChainVerifier = Hmr;
  function $Yo(e) {
    for (let t = 0; t < e.length; t++)
      for (let r = t + 1; r < e.length; r++) if (e[t].equals(e[r])) (e.splice(r, 1), r--);
    return e;
  }
});