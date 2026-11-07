
var bdi = Ie(function (vdi) {
  Object.defineProperty(vdi, "__esModule", { value: !0 });
  vdi.verifyTLogBody = MZo;
  vdi.verifyTLogInclusion = xZo;
  var Oyt = Sdr(),
    hve = aP(),
    mve = ldi(),
    _ve = pdi(),
    Mdi = mdi(),
    xdi = Ldi(),
    Sdi = gdi(),
    Tdi = ydi();
  function MZo(e, t) {
    let { kind: r, version: s } = e.kindVersion,
      a = JSON.parse(e.canonicalizedBody.toString("utf8"));
    if (r !== a.kind || s !== a.apiVersion)
      throw new hve.VerificationError({
        code: "TLOG_BODY_ERROR",
        message: `kind/version mismatch - expected: ${r}/${s}, received: ${a.kind}/${a.apiVersion}`,
      });
    switch (r) {
      case "dsse":
        if (s == mve.DSSE_API_VERSION_V1) return mve.verifyDSSETLogBody(a, t);
        else {
          let H = Oyt.Entry.fromJSON(a);
          return mve.verifyDSSETLogBodyV2(H, t);
        }
      case "intoto":
        return Mdi.verifyIntotoTLogBody(a, t);
      case "hashedrekord":
        if (s == _ve.HASHEDREKORD_API_VERSION_V1) return _ve.verifyHashedRekordTLogBody(a, t);
        else {
          let H = Oyt.Entry.fromJSON(a);
          return _ve.verifyHashedRekordTLogBodyV2(H, t);
        }
      default:
        throw new hve.VerificationError({ code: "TLOG_BODY_ERROR", message: `unsupported kind: ${r}` });
    }
  }
  function xZo(e, t) {
    let r = !1;
    if (SZo(e)) (Tdi.verifyTLogSET(e, t), (r = !0));
    if (TZo(e)) {
      let s = xdi.verifyCheckpoint(e, t);
      (Sdi.verifyMerkleInclusion(e, s), (r = !0));
    }
    if (!r)
      throw new hve.VerificationError({
        code: "TLOG_MISSING_INCLUSION_ERROR",
        message: "inclusion could not be verified",
      });
    return;
  }
  function SZo(e) {
    return e.inclusionPromise !== void 0;
  }
  function TZo(e) {
    return e.inclusionProof !== void 0;
  }
});