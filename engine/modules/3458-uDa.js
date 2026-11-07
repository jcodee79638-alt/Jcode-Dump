
function uDa(e, t, r) {
  let s = r ? new Set(xSt(t, r)) : void 0,
    a = {};
  return (
    Ehe(a, t, Reflect.ownKeys(qZ(t)), (H, u) =>
      s && !s.has(u) ? H : new e({ type: "nonoptional", innerType: H }),
    ),
    H7(t, kN(t._zod.def, { shape: a }))
  );
}