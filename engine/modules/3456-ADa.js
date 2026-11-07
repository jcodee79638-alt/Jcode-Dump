
function ADa(e, t) {
  if (!t?._zod?.def)
    throw Error(
      "Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.",
    );
  if (e._zod.def.checks?.length)
    throw Error(
      ".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.",
    );
  let r = {};
  (Ehe(r, e, Reflect.ownKeys(qZ(e))), Ehe(r, t, Reflect.ownKeys(qZ(t))));
  let s = kN(e._zod.def, {
    shape: r,
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? [],
  });
  return H7(e, s);
}