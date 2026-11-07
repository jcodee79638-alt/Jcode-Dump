
var HAr = Ie(function (Ucc, lJn) {
  var aAr = cr("url"),
    p7e = cr("path"),
    cJn = cr("stream").Stream,
    AJn = cr("os"),
    uJn = oAr();
  function xCo(e, t, r) {
    e[t] = String(r);
  }
  function SCo(e, t, r) {
    if (r === !0) return !1;
    if (r === null) return !0;
    r = String(r);
    let a = /^~(\/|\\)/,
      H = AJn.homedir();
    if (H && r.match(a)) e[t] = p7e.resolve(H, r.slice(2));
    else e[t] = p7e.resolve(r);
    return !0;
  }
  function TCo(e, t, r) {
    if ((uJn("validate Number %j %j %j", t, r, isNaN(r)), isNaN(r))) return !1;
    e[t] = +r;
  }
  function vCo(e, t, r) {
    let s = Date.parse(r);
    if ((uJn("validate Date %j %j %j", t, r, s), isNaN(s))) return !1;
    e[t] = new Date(r);
  }
  function bCo(e, t, r) {
    if (typeof r === "string")
      if (!isNaN(r)) r = !!+r;
      else if (r === "null" || r === "false") r = !1;
      else r = !0;
    else r = !!r;
    e[t] = r;
  }
  function jCo(e, t, r) {
    if (((r = aAr.parse(String(r))), !r.host)) return !1;
    e[t] = r.href;
  }
  function PCo(e, t, r) {
    if (!(r instanceof cJn)) return !1;
    e[t] = r;
  }
  lJn.exports = {
    String: { type: String, validate: xCo },
    Boolean: { type: Boolean, validate: bCo },
    url: { type: aAr, validate: jCo },
    Number: { type: Number, validate: TCo },
    path: { type: p7e, validate: SCo },
    Stream: { type: cJn, validate: PCo },
    Date: { type: Date, validate: vCo },
    Array: { type: Array },
  };
});