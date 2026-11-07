
function M_(e, t, r) {
  if (!t || !t._zod) return new wCi({ type: "record", keyType: lr(), valueType: e, ...yA(t) });
  return new wCi({ type: "record", keyType: e, valueType: t, ...yA(r) });
}