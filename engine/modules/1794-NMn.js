
function NMn(e, t) {
  if (t === 0 || e === 0) return [];
  let r = [],
    s = G6(e);
  for (let a = 0; a < t; a++) {
    let H = ha.ptr(s, a * 8);
    r.push(by(H) ?? "");
  }
  return r;
}