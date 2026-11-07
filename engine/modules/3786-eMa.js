
function eMa(e, t) {
  var r, s, a;
  let H = { type: "array" };
  if (
    ((r = e.type) == null ? void 0 : r._def) &&
    ((a = (s = e.type) == null ? void 0 : s._def) == null ? void 0 : a.typeName) !== oH.ZodAny
  )
    H.items = YL(e.type._def, { ...t, currentPath: [...t.currentPath, "items"] });
  if (e.minLength) H.minItems = e.minLength.value;
  if (e.maxLength) H.maxItems = e.maxLength.value;
  if (e.exactLength) ((H.minItems = e.exactLength.value), (H.maxItems = e.exactLength.value));
  return H;
}