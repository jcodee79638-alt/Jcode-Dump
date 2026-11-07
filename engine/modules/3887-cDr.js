
function cDr(e, ...t) {
  let r = e,
    s = t.map((H) => ("lazy" in H ? dxa(H) : void 0)),
    a = 0;
  for (; a < t.length;) {
    if (s[a] === void 0 || !mxa(r)) {
      let d = t[a];
      ((r = d(r)), (a += 1));
      continue;
    }
    let H = [];
    for (let d = a; d < t.length; d++) {
      let _ = s[d];
      if (_ === void 0 || (H.push(_), _.isSingle)) break;
    }
    let u = [];
    for (let d of r) if (Lki(d, u, H)) break;
    let { isSingle: f } = H.at(-1);
    ((r = f ? u[0] : u), (a += H.length));
  }
  return r;
}