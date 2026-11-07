
function He(c, t, e, s, i, n, r, a, o, l) {
  const [h, d, u, f, p, g] = V(c);
  if (d === 0 && u === 0) {
    const y = r * h + p,
      A = Math.round(y),
      w = a * f + g,
      v = Math.round(w),
      S = (r + o) * h + p,
      x = Math.abs(Math.round(S) - A) || 1,
      _ = (a + l) * f + g,
      E = Math.abs(Math.round(_) - v) || 1;
    return (
      c.setTransform(Math.sign(h), 0, 0, Math.sign(f), A, v),
      c.drawImage(t, e, s, i, n, 0, 0, x, E),
      c.setTransform(h, d, u, f, p, g),
      [x, E]
    );
  }
  if (h === 0 && f === 0) {
    const y = a * u + p,
      A = Math.round(y),
      w = r * d + g,
      v = Math.round(w),
      S = (a + l) * u + p,
      x = Math.abs(Math.round(S) - A) || 1,
      _ = (r + o) * d + g,
      E = Math.abs(Math.round(_) - v) || 1;
    return (
      c.setTransform(0, Math.sign(d), Math.sign(u), 0, A, v),
      c.drawImage(t, e, s, i, n, 0, 0, E, x),
      c.setTransform(h, d, u, f, p, g),
      [E, x]
    );
  }
  c.drawImage(t, e, s, i, n, r, a, o, l);
  const m = Math.hypot(h, d),
    b = Math.hypot(u, f);
  return [m * o, b * l];
}