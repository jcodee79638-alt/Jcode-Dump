
function H7(e, t, r) {
  let s = new e._zod.constr(t ?? e._zod.def);
  if (!t || r?.parent) s._zod.parent = e;
  return s;
}