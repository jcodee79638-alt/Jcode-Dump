
function $n(e, n) {
  if (et) return e();
  let i = !1;
  (n || (et = []), Pt ? (i = !0) : (Pt = []), Wn++);
  try {
    const s = e();
    return (oa(i), s);
  } catch (s) {
    (i || (Pt = null), (et = null), pi(s));
  }
}