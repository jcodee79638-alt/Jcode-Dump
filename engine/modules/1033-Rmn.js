
function Rmn(e, t) {
  let { name: r, config: s } = Pf(e, t);
  if (!s?.mode || s.mode === "tuple") return new Y7s(r);
  return new e4s(r);
}