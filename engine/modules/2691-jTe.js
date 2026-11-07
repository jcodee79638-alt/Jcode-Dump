
var jTe = Ie(function (oae) {
  var lXo =
    (oae && oae.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(oae, "__esModule", { value: !0 });
  oae.createPublicKey = fXo;
  oae.digest = pXo;
  oae.verify = dXo;
  oae.bufferEqual = mXo;
  var bTe = lXo(cr("crypto"));
  function fXo(e, t = "spki") {
    if (typeof e === "string")
      if (e.startsWith("-----")) return bTe.default.createPublicKey(e);
      else return bTe.default.createPublicKey({ key: Buffer.from(e, "base64"), format: "der", type: t });
    else return bTe.default.createPublicKey({ key: e, format: "der", type: t });
  }
  function pXo(e, ...t) {
    let r = bTe.default.createHash(e);
    for (let s of t) r.update(s);
    return r.digest();
  }
  function dXo(e, t, r, s) {
    try {
      return bTe.default.verify(s, e, t, r);
    } catch (a) {
      return !1;
    }
  }
  function mXo(e, t) {
    try {
      return bTe.default.timingSafeEqual(e, t);
    } catch {
      return !1;
    }
  }
});