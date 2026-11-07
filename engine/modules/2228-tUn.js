
var tUn = Ie(function (ZOn) {
  Object.defineProperty(ZOn, "__esModule", { value: !0 });
  ZOn.getStringListFromEnv = ZOn.getBooleanFromEnv = ZOn.getStringFromEnv = ZOn.getNumberFromEnv = void 0;
  var Lgt = kf(),
    $gt = cr("util");
  function ZLo(e) {
    let t = process.env[e];
    if (t == null || t.trim() === "") return;
    let r = Number(t);
    if (isNaN(r)) {
      Lgt.diag.warn(`Unknown value ${$gt.inspect(t)} for ${e}, expected a number, using defaults`);
      return;
    }
    return r;
  }
  ZOn.getNumberFromEnv = ZLo;
  function YOn(e) {
    let t = process.env[e];
    if (t == null || t.trim() === "") return;
    return t;
  }
  ZOn.getStringFromEnv = YOn;
  function e$o(e) {
    let t = process.env[e]?.trim().toLowerCase();
    if (t == null || t === "") return !1;
    if (t === "true") return !0;
    else if (t === "false") return !1;
    else
      return (
        Lgt.diag.warn(
          `Unknown value ${$gt.inspect(t)} for ${e}, expected 'true' or 'false', falling back to 'false' (default)`,
        ),
        !1
      );
  }
  ZOn.getBooleanFromEnv = e$o;
  function t$o(e) {
    return YOn(e)
      ?.split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
  }
  ZOn.getStringListFromEnv = t$o;
});