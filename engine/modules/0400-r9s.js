
function r9s(e, t) {
  let r = t,
    s = r.length,
    a = r[s - 1],
    H = [new S$(kQ(x$(e, void 0)), r[0].transformation.flip())];
  for (let f = 1; f < s; f++) H.unshift(new S$(kQ(r[f - 1].to), r[f].transformation.flip()));
  let u = kQ(a.to);
  if (u.encoding) return x$(u, [...u.encoding, ...H]);
  else return x$(u, H);
}