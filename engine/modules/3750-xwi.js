
function xwi(e, t = {}) {
  let { useArrayBrackets: r = !0 } = t,
    s = new FormData();
  for (let [a, H] of Object.entries(e)) {
    if (H == null) continue;
    if (Array.isArray(H)) {
      if (H.length === 1) {
        s.append(a, H[0]);
        continue;
      }
      let u = r ? `${a}[]` : a;
      for (let f of H) s.append(u, f);
      continue;
    }
    s.append(a, H);
  }
  return s;
}