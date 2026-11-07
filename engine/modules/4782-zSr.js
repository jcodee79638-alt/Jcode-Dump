
function zSr(e, t) {
  if (vP(e)) {
    let r = [];
    for (let s = 0; s < e.length; s += 1) r.push(t(e[s]));
    return r;
  }
  return t(e);
}