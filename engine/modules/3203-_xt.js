
var _xt = Ie(function (pLa) {
  pLa.isValidName = lLa;
  pLa.isValidQName = fLa;
  var oLa = /^[_:A-Za-z][-.:\w]+$/,
    aLa = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
    sGe =
      "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
    oGe =
      "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
    Hhe = "[" + sGe + "][" + oGe + "]*",
    G$r = sGe + ":",
    X$r = oGe + ":",
    HLa = new RegExp("^[" + G$r + "][" + X$r + "]*$"),
    cLa = new RegExp("^(" + Hhe + "|" + Hhe + ":" + Hhe + ")$"),
    h1i = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
    L1i = /[\uD800-\uDB7F\uDC00-\uDFFF]/g,
    $1i = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
  sGe += "\uD800-\uDB7F\uDC00-\uDFFF";
  oGe += "\uD800-\uDB7F\uDC00-\uDFFF";
  Hhe = "[" + sGe + "][" + oGe + "]*";
  G$r = sGe + ":";
  X$r = oGe + ":";
  var ALa = new RegExp("^[" + G$r + "][" + X$r + "]*$"),
    uLa = new RegExp("^(" + Hhe + "|" + Hhe + ":" + Hhe + ")$");
  function lLa(e) {
    if (oLa.test(e)) return !0;
    if (HLa.test(e)) return !0;
    if (!h1i.test(e)) return !1;
    if (!ALa.test(e)) return !1;
    var t = e.match(L1i),
      r = e.match($1i);
    return r !== null && 2 * r.length === t.length;
  }
  function fLa(e) {
    if (aLa.test(e)) return !0;
    if (cLa.test(e)) return !0;
    if (!h1i.test(e)) return !1;
    if (!uLa.test(e)) return !1;
    var t = e.match(L1i),
      r = e.match($1i);
    return r !== null && 2 * r.length === t.length;
  }
});