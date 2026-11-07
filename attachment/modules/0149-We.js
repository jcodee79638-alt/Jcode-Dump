
function We(c, t) {
  if (!t) return;
  const e = t[2] - t[0],
    s = t[3] - t[1],
    i = new Path2D();
  (i.rect(t[0], t[1], e, s), c.clip(i));
}