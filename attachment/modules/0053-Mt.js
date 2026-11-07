
function Mt(c) {
  const { a: t, b: e, c: s, d: i, e: n, f: r } = c.getTransform().invertSelf();
  return [t, e, s, i, n, r];
}