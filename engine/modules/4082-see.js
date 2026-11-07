
async function see(e, t, r, s) {
  let a = [t],
    H = t;
  while (!0) {
    if (r === H) break;
    let d = QTt(H);
    if (d === H) break;
    (a.push(d), (H = d));
  }
  let u = Array.isArray(e) ? e : [e],
    f = [];
  for (let d of s?.rootFirst ? a.toReversed() : a)
    for (let _ of u) {
      let L = F8i(d, _);
      if (await Ax(L)) f.push(L);
    }
  return f;
}