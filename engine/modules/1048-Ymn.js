
function Ymn(e, t) {
  let { name: r, config: s } = Pf(e, t);
  if (!s?.mode || s.mode === "tuple") return new m4s(r, s?.srid);
  return new h4s(r, s?.srid);
}