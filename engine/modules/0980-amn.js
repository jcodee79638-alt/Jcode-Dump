
function amn(e, t) {
  let { name: r, config: s } = Pf(e, t);
  if (s.mode === "number") return new d7s(r);
  if (s.mode === "string") return new L7s(r);
  return new _7s(r);
}