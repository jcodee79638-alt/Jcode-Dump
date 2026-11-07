
function Wu(e, t, r, s) {
  var a,
    H,
    u,
    f,
    d,
    _,
    L,
    I,
    D,
    S = e.constructor;
  e: if (t != null) {
    if (((I = e.d), !I)) return e;
    for (a = 1, f = I[0]; f >= 10; f /= 10) a++;
    if (((H = t - a), H < 0))
      ((H += Cl), (u = t), (L = I[(D = 0)]), (d = ((L / lx(10, a - u - 1)) % 10) | 0));
    else if (((D = Math.ceil((H + 1) / Cl)), (f = I.length), D >= f))
      if (s) {
        for (; f++ <= D;) I.push(0);
        ((L = d = 0), (a = 1), (H %= Cl), (u = H - Cl + 1));
      } else break e;
    else {
      L = f = I[D];
      for (a = 1; f >= 10; f /= 10) a++;
      ((H %= Cl), (u = H - Cl + a), (d = u < 0 ? 0 : ((L / lx(10, a - u - 1)) % 10) | 0));
    }
    if (
      ((s = s || t < 0 || I[D + 1] !== void 0 || (u < 0 ? L : L % lx(10, a - u - 1))),
      (_ =
        r < 4
          ? (d || s) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : d > 5 ||
            (d == 5 &&
              (r == 4 ||
                s ||
                (r == 6 && ((H > 0 ? (u > 0 ? L / lx(10, a - u) : 0) : I[D - 1]) % 10) & 1) ||
                r == (e.s < 0 ? 8 : 7)))),
      t < 1 || !I[0])
    ) {
      if (((I.length = 0), _)) ((t -= e.e + 1), (I[0] = lx(10, (Cl - (t % Cl)) % Cl)), (e.e = -t || 0));
      else I[0] = e.e = 0;
      return e;
    }
    if (H == 0) ((I.length = D), (f = 1), D--);
    else
      ((I.length = D + 1),
        (f = lx(10, Cl - H)),
        (I[D] = u > 0 ? (((L / lx(10, a - u)) % lx(10, u)) | 0) * f : 0));
    if (_)
      for (;;)
        if (D == 0) {
          for (H = 1, u = I[0]; u >= 10; u /= 10) H++;
          u = I[0] += f;
          for (f = 1; u >= 10; u /= 10) f++;
          if (H != f) {
            if ((e.e++, I[0] == _7)) I[0] = 1;
          }
          break;
        } else {
          if (((I[D] += f), I[D] != _7)) break;
          ((I[D--] = 0), (f = 1));
        }
    for (H = I.length; I[--H] === 0;) I.pop();
  }
  if (Uf) {
    if (e.e > S.maxE) ((e.d = null), (e.e = NaN));
    else if (e.e < S.minE) ((e.e = 0), (e.d = [0]));
  }
  return e;
}