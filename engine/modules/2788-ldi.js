
var ldi = Ie(function (udi) {
  Object.defineProperty(udi, "__esModule", { value: !0 });
  udi.DSSE_API_VERSION_V1 = void 0;
  udi.verifyDSSETLogBody = GYo;
  udi.verifyDSSETLogBodyV2 = XYo;
  var cT = aP();
  udi.DSSE_API_VERSION_V1 = "0.0.1";
  function GYo(e, t) {
    switch (e.apiVersion) {
      case udi.DSSE_API_VERSION_V1:
        return JYo(e, t);
      default:
        throw new cT.VerificationError({
          code: "TLOG_BODY_ERROR",
          message: `unsupported dsse version: ${e.apiVersion}`,
        });
    }
  }
  function XYo(e, t) {
    let r = e.spec?.spec;
    if (!r) throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "missing dsse spec" });
    switch (r.$case) {
      case "dsseV002":
        return KYo(r.dsseV002, t);
      default:
        throw new cT.VerificationError({
          code: "TLOG_BODY_ERROR",
          message: `unsupported version: ${r.$case}`,
        });
    }
  }
  function JYo(e, t) {
    if (e.spec.signatures?.length !== 1)
      throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "signature count mismatch" });
    let r = e.spec.signatures[0].signature;
    if (!t.compareSignature(Buffer.from(r, "base64")))
      throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "tlog entry signature mismatch" });
    let s = e.spec.payloadHash?.value || "";
    if (!t.compareDigest(Buffer.from(s, "hex")))
      throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "DSSE payload hash mismatch" });
  }
  function KYo(e, t) {
    if (e.signatures?.length !== 1)
      throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "signature count mismatch" });
    let r = e.signatures[0].content;
    if (!t.compareSignature(r))
      throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "tlog entry signature mismatch" });
    let s = e.payloadHash?.digest || Buffer.from("");
    if (!t.compareDigest(s))
      throw new cT.VerificationError({ code: "TLOG_BODY_ERROR", message: "DSSE payload hash mismatch" });
  }
});