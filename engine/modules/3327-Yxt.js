
function Yxt(e, t) {
  if (t.has(e)) return !1;
  t.add(e);
  let r = ME(e);
  if (r !== e) return Yxt(r, t);
  if (qye(e)) return e.literal === jSi;
  if (vpe(e)) return e.types.some((s) => Yxt(s, t));
  if (WQt(e)) return Yxt(e.thunk(), t);
  return !1;
}