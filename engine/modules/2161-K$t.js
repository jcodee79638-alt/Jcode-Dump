
function K$t(e, t = "", r = new WeakSet()) {
  if (r.has(e)) return [[t, "[Circular]"]];
  r.add(e);
  let s = Object.entries(e);
  if (s.length === 0 && t) return [[t, e]];
  return s.flatMap(([a, H]) => {
    let u = t ? `${t}.${a}` : a;
    return Bwn(H) ? K$t(H, u, r) : [[u, H]];
  });
}