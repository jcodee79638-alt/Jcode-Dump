
var mdi = Ie(function (ddi) {
  Object.defineProperty(ddi, "__esModule", { value: !0 });
  ddi.verifyIntotoTLogBody = iZo;
  var Mae = aP();
  function iZo(e, t) {
    switch (e.apiVersion) {
      case "0.0.2":
        return sZo(e, t);
      default:
        throw new Mae.VerificationError({
          code: "TLOG_BODY_ERROR",
          message: `unsupported intoto version: ${e.apiVersion}`,
        });
    }
  }
  function sZo(e, t) {
    if (e.spec.content.envelope.signatures?.length !== 1)
      throw new Mae.VerificationError({ code: "TLOG_BODY_ERROR", message: "signature count mismatch" });
    let r = oZo(e.spec.content.envelope.signatures[0].sig);
    if (!t.compareSignature(Buffer.from(r, "base64")))
      throw new Mae.VerificationError({ code: "TLOG_BODY_ERROR", message: "tlog entry signature mismatch" });
    let s = e.spec.content.payloadHash?.value || "";
    if (!t.compareDigest(Buffer.from(s, "hex")))
      throw new Mae.VerificationError({ code: "TLOG_BODY_ERROR", message: "DSSE payload hash mismatch" });
  }
  function oZo(e) {
    return Buffer.from(e, "base64").toString("utf-8");
  }
});