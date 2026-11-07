
function Pbe(e) {
  let t = new Set(e.error);
  for (let r of e.middlewares) {
    let s = r;
    for (let a of s.error) t.add(a);
  }
  return Array.from(t);
}