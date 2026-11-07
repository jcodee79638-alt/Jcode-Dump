
function Yn(c, t) {
  t = Y(t ?? 1, 0, 1);
  const e = 255 * (1 - t);
  return c.map((s) => Math.round(s * t + e));
}