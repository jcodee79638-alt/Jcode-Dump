
function wTn(e) {
  if (!e || !Por(e)) return !1;
  let t = Mxe(e);
  if (t === null || t === oN[PLt]) return !0;
  let r = oN.hasOwnProperty.call(t, xLt) && t[xLt];
  if (r === Object) return !0;
  if (!ume(r)) return !1;
  let s = MTn.get(r);
  if (s === void 0) ((s = Function.toString.call(r)), MTn.set(r, s));
  return s === Kao;
}