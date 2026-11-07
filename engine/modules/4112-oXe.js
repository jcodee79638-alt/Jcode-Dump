
function oXe(e, t, r, s) {
  var a, H, u, f;
  for (H = e[0]; H >= 10; H /= 10) --t;
  if (--t < 0) ((t += Cl), (a = 0));
  else ((a = Math.ceil((t + 1) / Cl)), (t %= Cl));
  if (((H = lx(10, Cl - t)), (f = (e[a] % H) | 0), s == null))
    if (t < 3) {
      if (t == 0) f = (f / 100) | 0;
      else if (t == 1) f = (f / 10) | 0;
      u = (r < 4 && f == 99999) || (r > 3 && f == 49999) || f == 50000 || f == 0;
    } else
      u =
        (((r < 4 && f + 1 == H) || (r > 3 && f + 1 == H / 2)) &&
          ((e[a + 1] / H / 100) | 0) == lx(10, t - 2) - 1) ||
        ((f == H / 2 || f == 0) && ((e[a + 1] / H / 100) | 0) == 0);
  else if (t < 4) {
    if (t == 0) f = (f / 1000) | 0;
    else if (t == 1) f = (f / 100) | 0;
    else if (t == 2) f = (f / 10) | 0;
    u = ((s || r < 4) && f == 9999) || (!s && r > 3 && f == 4999);
  } else
    u =
      (((s || r < 4) && f + 1 == H) || (!s && r > 3 && f + 1 == H / 2)) &&
      ((e[a + 1] / H / 1000) | 0) == lx(10, t - 3) - 1;
  return u;
}