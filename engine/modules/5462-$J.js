
function $J(e, t) {
  if (e < 65) return e === 36;
  if (e < 91) return !0;
  if (e < 97) return e === 95;
  if (e < 123) return !0;
  if (e <= 65535) return e >= 170 && PJa.test(String.fromCharCode(e));
  if (t === !1) return !1;
  return Kjr(e, zXi);
}