
function HDa(e, t) {
  if (!Ihe(t)) throw Error("Invalid input to extend: expected a plain object");
  let r = e._zod.def.checks;
  if (r && r.length > 0) {
    let a = qZ(e);
    for (let H of Reflect.ownKeys(t))
      if (Object.getOwnPropertyDescriptor(a, H) !== void 0)
        throw Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
  }
  return H7(e, kN(e._zod.def, { shape: bvi(e, t) }));
}