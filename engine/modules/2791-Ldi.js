
var Ldi = Ie(function (_di) {
  Object.defineProperty(_di, "__esModule", { value: !0 });
  _di.LogCheckpoint = void 0;
  _di.verifyCheckpoint = cZo;
  var Cyt = L8(),
    Y5 = aP(),
    lmr = `

`,
    HZo = /\u2014 (\S+) (\S+)\n/g;
  function cZo(e, t) {
    let r = e.inclusionProof,
      s = fmr.fromString(r.checkpoint.envelope),
      a = wyt.fromString(s.note);
    if (!AZo(s, t))
      throw new Y5.VerificationError({
        code: "TLOG_INCLUSION_PROOF_ERROR",
        message: "invalid checkpoint signature",
      });
    return a;
  }
  function AZo(e, t) {
    let r = Buffer.from(e.note, "utf-8");
    return e.signatures.some((s) => {
      let a = t.find(
        (H) => Cyt.crypto.bufferEqual(H.logID.subarray(0, 4), s.keyHint) && H.baseURL.match(s.name),
      );
      if (!a) return !1;
      return Cyt.crypto.verify(r, a.publicKey, s.signature);
    });
  }
  class fmr {
    note;
    signatures;
    constructor(e, t) {
      ((this.note = e), (this.signatures = t));
    }
    static fromString(e) {
      if (!e.includes(lmr))
        throw new Y5.VerificationError({
          code: "TLOG_INCLUSION_PROOF_ERROR",
          message: "missing checkpoint separator",
        });
      let t = e.indexOf(lmr),
        r = e.slice(0, t + 1),
        a = e.slice(t + lmr.length).matchAll(HZo),
        H = Array.from(a, (u) => {
          let [, f, d] = u,
            _ = Buffer.from(d, "base64");
          if (_.length < 5)
            throw new Y5.VerificationError({
              code: "TLOG_INCLUSION_PROOF_ERROR",
              message: "malformed checkpoint signature",
            });
          return { name: f, keyHint: _.subarray(0, 4), signature: _.subarray(4) };
        });
      if (H.length === 0)
        throw new Y5.VerificationError({
          code: "TLOG_INCLUSION_PROOF_ERROR",
          message: "no signatures found in checkpoint",
        });
      return new fmr(r, H);
    }
  }
  class wyt {
    origin;
    logSize;
    logHash;
    rest;
    constructor(e, t, r, s) {
      ((this.origin = e), (this.logSize = t), (this.logHash = r), (this.rest = s));
    }
    static fromString(e) {
      let t = e.trimEnd().split(`
`);
      if (t.length < 3)
        throw new Y5.VerificationError({
          code: "TLOG_INCLUSION_PROOF_ERROR",
          message: "too few lines in checkpoint header",
        });
      let r = t[0],
        s = BigInt(t[1]),
        a = Buffer.from(t[2], "base64"),
        H = t.slice(3);
      return new wyt(r, s, a, H);
    }
  }
  _di.LogCheckpoint = wyt;
});