
function oDa(e, t) {
  let r = e._zod.def,
    s = r.checks;
  if (s && s.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
  let H = {};
  return (Ehe(H, e, xSt(e, t)), H7(e, kN(r, { shape: H, checks: [] })));
}