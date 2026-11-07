
function XsH(e) {
  let t = e.components?.schemas;
  if (!t) return;
  for (let r of Object.keys(t)) {
    let s = r.replace(/\d+$/, "");
    if (s === r || !t[s]) continue;
    if (mkt(t[r], t) !== mkt(t[s], t)) continue;
    (fYe(e, r, s), delete t[r]);
  }
}