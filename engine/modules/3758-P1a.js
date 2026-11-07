
function P1a(e) {
  let t = e.toLowerCase(),
    r = t.indexOf("%");
  if (r !== -1) t = t.slice(0, r);
  let s = t.split("::");
  if (s.length > 2) return null;
  let a = (u) => {
      if (u === "") return [];
      let f = [],
        d = u.split(":");
      for (let _ = 0; _ < d.length; _++) {
        let L = d[_];
        if (L.includes(".")) {
          if (_ !== d.length - 1 || !zIr(L)) return null;
          let [I, D, S, T] = L.split(".").map(Number);
          f.push((I << 8) | D, (S << 8) | T);
          continue;
        }
        if (!/^[0-9a-f]{1,4}$/.test(L)) return null;
        f.push(parseInt(L, 16));
      }
      return f;
    },
    H = a(s[0]);
  if (H === null) return null;
  if (s.length === 2) {
    let u = a(s[1]);
    if (u === null) return null;
    let f = 8 - H.length - u.length;
    if (f < 0) return null;
    return [...H, ...Array(f).fill(0), ...u];
  }
  return H.length === 8 ? H : null;
}