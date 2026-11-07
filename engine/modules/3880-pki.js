
function pki(e, t) {
  let r = { ...e, ...t };
  for (let s in t) {
    if (!(s in e)) continue;
    let { [s]: a } = e;
    if (!HDr(a)) continue;
    let { [s]: H } = t;
    HDr(H) && (r[s] = pki(a, H));
  }
  return r;
}