
function J8s(e, t, r) {
  let s = cKt.has(e),
    a = AKt.has(t);
  if (s && a) return !0;
  if (s || a) return !1;
  (cKt.add(e), AKt.add(t));
  let H = r();
  return (cKt.delete(e), AKt.delete(t), H);
}