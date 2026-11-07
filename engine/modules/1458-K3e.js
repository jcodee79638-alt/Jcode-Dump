
function K3e(e, t, r, s, a, H) {
  let u = [],
    f = 0;
  for (let d = 0; d < e.length; d++)
    for (let _ = 0; _ < r.length; _++) {
      if (u.length >= s) return u;
      let L = e[d] + t + r[_];
      if (H && !L) continue;
      if (f + L.length > a) return u;
      (u.push(L), (f += L.length));
    }
  return u;
}