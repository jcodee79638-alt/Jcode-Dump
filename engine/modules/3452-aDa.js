
function aDa(e, t) {
  let r = e._zod.def,
    s = r.checks;
  if (s && s.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
  let H = new Set(xSt(e, t)),
    u = {};
  return (
    Ehe(
      u,
      e,
      Reflect.ownKeys(qZ(e)).filter((f) => !H.has(f)),
    ),
    H7(e, kN(r, { shape: u, checks: [] }))
  );
}