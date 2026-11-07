
var wSe = Ie(function (Kuc, Kur) {
  var BNo = Xur()["cache-version"].content,
    RNo = Jur(),
    yEt = cr("path"),
    aei = BV();
  Kur.exports = WNo;
  function WNo(e, t) {
    let r = aei.parse(t, { single: !0 });
    return yEt.join(Hei(e), r.algorithm, ...RNo(r.hexDigest()));
  }
  Kur.exports.contentDir = Hei;
  function Hei(e) {
    return yEt.join(e, `content-v${BNo}`);
  }
});