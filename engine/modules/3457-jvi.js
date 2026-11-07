
function jvi(e, t, r, s = "partial") {
  let H = t._zod.def.checks;
  if (H && H.length > 0) throw Error(`.${s}() cannot be used on object schemas containing refinements`);
  let f = r ? new Set(xSt(t, r)) : void 0,
    d = {};
  return (
    Ehe(
      d,
      t,
      Reflect.ownKeys(qZ(t)),
      e && ((_, L) => (f && !f.has(L) ? _ : new e({ type: "optional", innerType: _ }))),
    ),
    H7(t, kN(t._zod.def, { shape: d, checks: [] }))
  );
}