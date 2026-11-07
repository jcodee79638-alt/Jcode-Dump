
var zei = Ie(function (ilc, Kei) {
  var Jei = cr("fs/promises"),
    lFo = wSe(),
    { hasContent: fFo } = slr();
  Kei.exports = pFo;
  async function pFo(e, t) {
    let r = await fFo(e, t);
    if (r && r.sri) return (await Jei.rm(lFo(e, r.sri), { recursive: !0, force: !0 }), !0);
    else return !1;
  }
});