
function ryr(e, t, r, s) {
  var a,
    H,
    u,
    f,
    d,
    _,
    L,
    I,
    D,
    S = e.constructor,
    T = r !== void 0;
  if (T)
    if ((V8(r, 1, SHe), s === void 0)) s = S.rounding;
    else V8(s, 0, 8);
  else ((r = S.precision), (s = S.rounding));
  if (!e.isFinite()) L = HOi(e);
  else {
    if (((L = CX(e)), (u = L.indexOf(".")), T)) {
      if (((a = 2), t == 16)) r = r * 4 - 3;
      else if (t == 8) r = r * 3 - 2;
    } else a = t;
    if (u >= 0)
      ((L = L.replace(".", "")),
        (D = new S(1)),
        (D.e = L.length - u),
        (D.d = rvt(CX(D), 10, a)),
        (D.e = D.d.length));
    ((I = rvt(L, 10, a)), (H = d = I.length));
    for (; I[--d] == 0;) I.pop();
    if (!I[0]) L = T ? "0p+0" : "0";
    else {
      if (u < 0) H--;
      else
        ((e = new S(e)), (e.d = I), (e.e = H), (e = yg(e, D, r, s, 0, a)), (I = e.d), (H = e.e), (_ = eOi));
      if (
        ((u = I[r]),
        (f = a / 2),
        (_ = _ || I[r + 1] !== void 0),
        (_ =
          s < 4
            ? (u !== void 0 || _) && (s === 0 || s === (e.s < 0 ? 3 : 2))
            : u > f || (u === f && (s === 4 || _ || (s === 6 && I[r - 1] & 1) || s === (e.s < 0 ? 8 : 7)))),
        (I.length = r),
        _)
      ) {
        for (; ++I[--r] > a - 1;) if (((I[r] = 0), !r)) (++H, I.unshift(1));
      }
      for (d = I.length; !I[d - 1]; --d);
      for (u = 0, L = ""; u < d; u++) L += YDr.charAt(I[u]);
      if (T) {
        if (d > 1)
          if (t == 16 || t == 8) {
            u = t == 16 ? 4 : 3;
            for (--d; d % u; d++) L += "0";
            I = rvt(L, a, t);
            for (d = I.length; !I[d - 1]; --d);
            for (u = 1, L = "1."; u < d; u++) L += YDr.charAt(I[u]);
          } else L = L.charAt(0) + "." + L.slice(1);
        L = L + (H < 0 ? "p" : "p+") + H;
      } else if (H < 0) {
        for (; ++H;) L = "0" + L;
        L = "0." + L;
      } else if (++H > d) for (H -= d; H--;) L += "0";
      else if (H < d) L = L.slice(0, H) + "." + L.slice(H);
    }
    L = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + L;
  }
  return e.s < 0 ? "-" + L : L;
}