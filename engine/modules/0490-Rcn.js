
function Rcn(e, t, r, s, a, H) {
  if (t > 32) throw Error("HashMap: max depth exceeded");
  let u = Gie(r, t),
    f = Gie(a, t);
  if (u === f) {
    let L = Rcn(e, t + RW, r, s, a, H);
    return new AG(e, u, [L]);
  }
  let d = u | f,
    _ = u >>> 0 < f >>> 0 ? [s, H] : [H, s];
  return new AG(e, d, _);
}