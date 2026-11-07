
function Vee(e) {
  let t = e.split(`
`),
    r = t.filter(
      (H) =>
        (H.startsWith("+") || H.startsWith("-") || H.startsWith(" ")) &&
        !H.startsWith("---") &&
        !H.startsWith("+++"),
    );
  if (r.length === 0) return e;
  let s = 1 / 0;
  for (let H of r) {
    let u = H.slice(1);
    if (u.trim().length > 0) {
      let f = u.match(/^(\s*)/);
      if (f) s = Math.min(s, f[1].length);
    }
  }
  if (s === 1 / 0 || s === 0) return e;
  return t.map((H) => {
    if (
      (H.startsWith("+") || H.startsWith("-") || H.startsWith(" ")) &&
      !H.startsWith("---") &&
      !H.startsWith("+++")
    ) {
      let u = H[0],
        f = H.slice(1);
      return u + f.slice(s);
    }
    return H;
  }).join(`
`);
}