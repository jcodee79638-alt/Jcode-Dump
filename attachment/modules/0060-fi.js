
function fi(c, t) {
  const e = c[0] / 255,
    s = c[1] / 255,
    i = c[2] / 255,
    n = Math.max(e, s, i),
    r = Math.min(e, s, i),
    a = (n + r) / 2;
  if (n === r) t[0] = t[1] = 0;
  else {
    const o = n - r;
    switch (((t[1] = a < 0.5 ? o / (n + r) : o / (2 - n - r)), n)) {
      case e:
        t[0] = ((s - i) / o + (s < i ? 6 : 0)) * 60;
        break;
      case s:
        t[0] = ((i - e) / o + 2) * 60;
        break;
      case i:
        t[0] = ((e - s) / o + 4) * 60;
        break;
    }
  }
  t[2] = a;
}