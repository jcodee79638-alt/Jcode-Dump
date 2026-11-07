
var Odi = Ie(function (wdi) {
  Object.defineProperty(wdi, "__esModule", { value: !0 });
  wdi.Verifier = void 0;
  var Pdi = cr("util"),
    IB = aP(),
    Uyt = tdi(),
    Lve = ndi(),
    Nyt = Adi(),
    Fyt = bdi();
  class Cdi {
    trustMaterial;
    options;
    constructor(e, t = {}) {
      ((this.trustMaterial = e),
        (this.options = {
          ctlogThreshold: t.ctlogThreshold ?? 1,
          tlogThreshold: t.tlogThreshold ?? 1,
          timestampThreshold: t.timestampThreshold ?? t.tsaThreshold ?? 1,
          tsaThreshold: 0,
        }));
    }
    verify(e, t) {
      let r = this.verifyTimestamps(e),
        s = this.verifySigningKey(e, r);
      if ((this.verifyTLogs(e), this.verifySignature(e, s), t)) this.verifyPolicy(t, s.identity || {});
      return s;
    }
    verifyTimestamps(e) {
      let t = [];
      for (let r of e.timestamps)
        switch (r.$case) {
          case "timestamp-authority":
            t.push(
              Nyt.getTSATimestamp(
                r.timestamp,
                e.signature.signature,
                this.trustMaterial.timestampAuthorities,
              ),
            );
            break;
          case "transparency-log": {
            let s = Nyt.getTLogTimestamp(r.tlogEntry);
            if (s) t.push(s);
            break;
          }
        }
      if (jdi(t)) throw new IB.VerificationError({ code: "TIMESTAMP_ERROR", message: "duplicate timestamp" });
      if (t.length < this.options.timestampThreshold)
        throw new IB.VerificationError({
          code: "TIMESTAMP_ERROR",
          message: `expected ${this.options.timestampThreshold} timestamps, got ${t.length}`,
        });
      return t.map((r) => r.timestamp);
    }
    verifySigningKey({ key: e }, t) {
      switch (e.$case) {
        case "public-key":
          return Uyt.verifyPublicKey(e.hint, t, this.trustMaterial);
        case "certificate": {
          let r = Uyt.verifyCertificate(e.certificate, t, this.trustMaterial);
          if (jdi(r.scts))
            throw new IB.VerificationError({ code: "CERTIFICATE_ERROR", message: "duplicate SCT" });
          if (r.scts.length < this.options.ctlogThreshold)
            throw new IB.VerificationError({
              code: "CERTIFICATE_ERROR",
              message: `expected ${this.options.ctlogThreshold} SCTs, got ${r.scts.length}`,
            });
          return r.signer;
        }
      }
    }
    verifyTLogs({ signature: e, tlogEntries: t }) {
      let r = 0;
      if (
        (t.forEach((s) => {
          (r++, Fyt.verifyTLogInclusion(s, this.trustMaterial.tlogs), Fyt.verifyTLogBody(s, e));
        }),
        r < this.options.tlogThreshold)
      )
        throw new IB.VerificationError({
          code: "TLOG_ERROR",
          message: `expected ${this.options.tlogThreshold} tlog entries, got ${r}`,
        });
    }
    verifySignature(e, t) {
      if (!e.signature.verifySignature(t.key))
        throw new IB.VerificationError({ code: "SIGNATURE_ERROR", message: "signature verification failed" });
    }
    verifyPolicy(e, t) {
      if (e.subjectAlternativeName)
        Lve.verifySubjectAlternativeName(e.subjectAlternativeName, t.subjectAlternativeName);
      if (e.extensions) Lve.verifyExtensions(e.extensions, t.extensions);
      if (e.oids) Lve.verifyOIDs(e.oids, t.oids);
    }
  }
  wdi.Verifier = Cdi;
  function jdi(e) {
    for (let t = 0; t < e.length; t++)
      for (let r = t + 1; r < e.length; r++) if (Pdi.isDeepStrictEqual(e[t], e[r])) return !0;
    return !1;
  }
});