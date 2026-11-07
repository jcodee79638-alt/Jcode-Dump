
function JsH(e) {
  let t = e.components?.schemas;
  if (!t) return;
  for (let r of Object.keys(t)) {
    let s = KsH(r);
    if (s === r) continue;
    if (t[s]) {
      if (mkt(t[r], t) === mkt(t[s], t)) (fYe(e, r, s), delete t[r]);
      continue;
    }
    ((t[s] = t[r]), fYe(e, r, s), delete t[r]);
  }
}