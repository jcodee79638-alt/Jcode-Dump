
var pdi = Ie(function (fdi) {
  Object.defineProperty(fdi, "__esModule", { value: !0 });
  fdi.HASHEDREKORD_API_VERSION_V1 = void 0;
  fdi.verifyHashedRekordTLogBody = YYo;
  fdi.verifyHashedRekordTLogBodyV2 = ZYo;
  var E8 = aP();
  fdi.HASHEDREKORD_API_VERSION_V1 = "0.0.1";
  function YYo(e, t) {
    switch (e.apiVersion) {
      case fdi.HASHEDREKORD_API_VERSION_V1:
        return eZo(e, t);
      default:
        throw new E8.VerificationError({
          code: "TLOG_BODY_ERROR",
          message: `unsupported hashedrekord version: ${e.apiVersion}`,
        });
    }
  }
  function ZYo(e, t) {
    let r = e.spec?.spec;
    if (!r) throw new E8.VerificationError({ code: "TLOG_BODY_ERROR", message: "missing dsse spec" });
    switch (r.$case) {
      case "hashedRekordV002":
        return tZo(r.hashedRekordV002, t);
      default:
        throw new E8.VerificationError({
          code: "TLOG_BODY_ERROR",
          message: `unsupported version: ${r.$case}`,
        });
    }
  }
  function eZo(e, t) {
    let r = e.spec.signature.content || "";
    if (!t.compareSignature(Buffer.from(r, "base64")))
      throw new E8.VerificationError({ code: "TLOG_BODY_ERROR", message: "signature mismatch" });
    let s = e.spec.data.hash?.value || "";
    if (!t.compareDigest(Buffer.from(s, "hex")))
      throw new E8.VerificationError({ code: "TLOG_BODY_ERROR", message: "digest mismatch" });
  }
  function tZo(e, t) {
    let r = e.signature?.content || Buffer.from("");
    if (!t.compareSignature(r))
      throw new E8.VerificationError({ code: "TLOG_BODY_ERROR", message: "signature mismatch" });
    let s = e.data?.digest || Buffer.from("");
    if (!t.compareDigest(s))
      throw new E8.VerificationError({ code: "TLOG_BODY_ERROR", message: "digest mismatch" });
  }
});