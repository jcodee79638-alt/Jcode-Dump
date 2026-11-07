
function dH(e, t = {}) {
  let { name: r, config: s } = Pf(e, t);
  if (s.mode === "json") return new fhn(r);
  return new uhn(r, s);
}