
function Rr(c, t, e, s, i, n, r, a) {
  const o = t.coords,
    l = t.colors,
    h = c.data,
    d = c.width * 4;
  let u;
  (o[e * 2 + 1] > o[s * 2 + 1] && ((u = e), (e = s), (s = u), (u = n), (n = r), (r = u)),
    o[s * 2 + 1] > o[i * 2 + 1] && ((u = s), (s = i), (i = u), (u = r), (r = a), (a = u)),
    o[e * 2 + 1] > o[s * 2 + 1] && ((u = e), (e = s), (s = u), (u = n), (n = r), (r = u)));
  const f = (o[e * 2] + t.offsetX) * t.scaleX,
    p = (o[e * 2 + 1] + t.offsetY) * t.scaleY,
    g = (o[s * 2] + t.offsetX) * t.scaleX,
    m = (o[s * 2 + 1] + t.offsetY) * t.scaleY,
    b = (o[i * 2] + t.offsetX) * t.scaleX,
    y = (o[i * 2 + 1] + t.offsetY) * t.scaleY;
  if (p >= y) return;
  const A = l[n * 4],
    w = l[n * 4 + 1],
    v = l[n * 4 + 2],
    S = l[r * 4],
    x = l[r * 4 + 1],
    _ = l[r * 4 + 2],
    E = l[a * 4],
    P = l[a * 4 + 1],
    C = l[a * 4 + 2],
    R = Math.round(p),
    L = Math.round(y);
  let O, W, I, F, et, it, Ht, ot;
  for (let q = R; q <= L; q++) {
    if (q < m) {
      const J = q < p ? 0 : (p - q) / (p - m);
      ((O = f - (f - g) * J), (W = A - (A - S) * J), (I = w - (w - x) * J), (F = v - (v - _) * J));
    } else {
      let J;
      (q > y ? (J = 1) : m === y ? (J = 0) : (J = (m - q) / (m - y)),
        (O = g - (g - b) * J),
        (W = S - (S - E) * J),
        (I = x - (x - P) * J),
        (F = _ - (_ - C) * J));
    }
    let X;
    (q < p ? (X = 0) : q > y ? (X = 1) : (X = (p - q) / (p - y)),
      (et = f - (f - b) * X),
      (it = A - (A - E) * X),
      (Ht = w - (w - P) * X),
      (ot = v - (v - C) * X));
    const Ut = Math.round(Math.min(O, et)),
      Nt = Math.round(Math.max(O, et));
    let Pt = d * q + Ut * 4;
    for (let J = Ut; J <= Nt; J++)
      ((X = (O - J) / (O - et)),
        X < 0 ? (X = 0) : X > 1 && (X = 1),
        (h[Pt++] = (W - (W - it) * X) | 0),
        (h[Pt++] = (I - (I - Ht) * X) | 0),
        (h[Pt++] = (F - (F - ot) * X) | 0),
        (h[Pt++] = 255));
  }
}