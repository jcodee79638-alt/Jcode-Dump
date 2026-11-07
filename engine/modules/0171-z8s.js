
function z8s(e, t, r) {
  let s = qAt.get(e);
  if (!s) ((s = new WeakMap()), qAt.set(e, s));
  else if (s.has(t)) return s.get(t);
  let a = r(e, t);
  s.set(t, a);
  let H = qAt.get(t);
  if (!H) ((H = new WeakMap()), qAt.set(t, H));
  return (H.set(e, a), a);
}