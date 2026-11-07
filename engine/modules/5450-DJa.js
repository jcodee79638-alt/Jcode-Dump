
function DJa(e, t) {
  let r = [...e];
  for (let s = t.length - 1; s >= 0; s--) {
    let [a, H, u] = t[s];
    r.splice(a, H);
    for (let f = 0; f < u.length; f++) r.splice(a + f, 0, u[f]);
  }
  return r;
}