
function Kce(e, t) {
  if (e < 48) return e === 36;
  if (e < 58) return !0;
  if (e < 65) return !1;
  if (e < 91) return !0;
  if (e < 97) return e === 95;
  if (e < 123) return !0;
  if (e <= 65535) return e >= 170 && CJa.test(String.fromCharCode(e));
  if (t === !1) return !1;
  return Kjr(e, zXi) || Kjr(e, TJa);
}