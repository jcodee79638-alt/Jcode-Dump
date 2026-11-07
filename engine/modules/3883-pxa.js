
function pxa(e, t) {
  let r = {};
  for (let [s, a] of Object.entries(e)) {
    let H = t(a, s, e);
    r[s] = H;
  }
  return r;
}