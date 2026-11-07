
function Nlt(e) {
  let t = !1,
    r;
  return () => {
    if (t) return r;
    return ((r = e()), (t = !0), r);
  };
}