
function lLt(e) {
  let t,
    r = !1;
  return () => {
    if (r) return t;
    return ((r = !0), (t = e()), t);
  };
}