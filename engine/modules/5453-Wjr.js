
function Wjr(e, t, r, s = !1) {
  if (t.length === 0) return -1;
  let a = bCt(e, t, r, (d, _) => d === _, s);
  if (a !== -1) return a;
  let H = bCt(e, t, r, (d, _) => d.trimEnd() === _.trimEnd(), s);
  if (H !== -1) return H;
  let u = bCt(e, t, r, (d, _) => d.trim() === _.trim(), s);
  if (u !== -1) return u;
  return bCt(e, t, r, (d, _) => BXi(d.trim()) === BXi(_.trim()), s);
}