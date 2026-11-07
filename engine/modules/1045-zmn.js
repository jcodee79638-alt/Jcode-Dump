
function zmn(e, t) {
  let { name: r, config: s } = Pf(e, t);
  if (!s?.mode || s.mode === "tuple") return new l4s(r);
  return new p4s(r);
}