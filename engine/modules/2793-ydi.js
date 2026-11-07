
var ydi = Ie(function (Ddi) {
  Object.defineProperty(Ddi, "__esModule", { value: !0 });
  Ddi.verifyTLogSET = IZo;
  var kyt = L8(),
    Edi = aP(),
    Idi = uve();
  function IZo(e, t) {
    if (
      !Idi.filterTLogAuthorities(t, {
        logID: e.logId.keyId,
        targetDate: new Date(Number(e.integratedTime) * 1000),
      }).some((a) => {
        let H = DZo(e),
          u = Buffer.from(kyt.json.canonicalize(H), "utf8"),
          f = e.inclusionPromise.signedEntryTimestamp;
        return kyt.crypto.verify(u, a.publicKey, f);
      })
    )
      throw new Edi.VerificationError({
        code: "TLOG_INCLUSION_PROMISE_ERROR",
        message: "inclusion promise could not be verified",
      });
  }
  function DZo(e) {
    let { integratedTime: t, logIndex: r, logId: s, canonicalizedBody: a } = e;
    return {
      body: a.toString("base64"),
      integratedTime: Number(t),
      logIndex: Number(r),
      logID: s.keyId.toString("hex"),
    };
  }
});