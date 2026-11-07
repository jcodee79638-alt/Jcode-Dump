
function pAn(e, t) {
  let r = x2s(t);
  if (r.length === 0) return null;
  let s = r[r.length - 1],
    a = [],
    H = e;
  for (let u = 0; u < r.length - 1; u++) {
    let f = r[u];
    if (H == null) return null;
    if (Array.isArray(H)) {
      let d = pZt(f);
      if (d < 0 || d >= H.length) return null;
      (a.push({ container: H, token: d }), (H = H[d]));
      continue;
    }
    if (H && typeof H === "object") {
      if (!Object.hasOwn(H, f)) return null;
      (a.push({ container: H, token: f }), (H = H[f]));
      continue;
    }
    return null;
  }
  return { stack: a, parent: H, lastToken: s };
}