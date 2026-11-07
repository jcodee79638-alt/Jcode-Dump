
function oOi(e, t, r, s) {
  var a,
    H = new e(1),
    u = Math.ceil(s / Cl + 4);
  Uf = !1;
  for (;;) {
    if (r % 2) {
      if (((H = H.times(t)), Y8i(H.d, u))) a = !0;
    }
    if (((r = EP(r / 2)), r === 0)) {
      if (((r = H.d.length - 1), a && H.d[r] === 0)) ++H.d[r];
      break;
    }
    ((t = t.times(t)), Y8i(t.d, u));
  }
  return ((Uf = !0), H);
}