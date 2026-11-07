
function RTn(e) {
  if (!NY(e) || ULt(e)) return e;
  let t = e[Iw],
    r,
    s = !0;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0),
      (r = xor(e, t.scope_.immer_.useStrictShallowCopy_)),
      (s = t.scope_.immer_.shouldUseStrictIteration()));
  } else r = xor(e, !0);
  if (
    (CLt(
      r,
      (a, H) => {
        TLt(r, a, RTn(H));
      },
      s,
    ),
    t)
  )
    t.finalized_ = !1;
  return r;
}