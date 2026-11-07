
function Aki(e, t) {
  let [r, ...s] = t;
  if (!lxa(r)) {
    let H = oDr(...s);
    return e(r, H);
  }
  let a = oDr(r, ...s);
  return (H) => e(H, a);
}