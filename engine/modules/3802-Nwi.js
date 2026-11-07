
function Nwi(e, t) {
  var r, s, a, H, u, f;
  let d = {
    type: "object",
    additionalProperties:
      (r = YL(e.valueType._def, { ...t, currentPath: [...t.currentPath, "additionalProperties"] })) != null
        ? r
        : t.allowedAdditionalProperties,
  };
  if (
    ((s = e.keyType) == null ? void 0 : s._def.typeName) === oH.ZodString &&
    ((a = e.keyType._def.checks) == null ? void 0 : a.length)
  ) {
    let { type: _, ...L } = Uwi(e.keyType._def, t);
    return { ...d, propertyNames: L };
  } else if (((H = e.keyType) == null ? void 0 : H._def.typeName) === oH.ZodEnum)
    return { ...d, propertyNames: { enum: e.keyType._def.values } };
  else if (
    ((u = e.keyType) == null ? void 0 : u._def.typeName) === oH.ZodBranded &&
    e.keyType._def.type._def.typeName === oH.ZodString &&
    ((f = e.keyType._def.type._def.checks) == null ? void 0 : f.length)
  ) {
    let { type: _, ...L } = kwi(e.keyType._def, t);
    return { ...d, propertyNames: L };
  }
  return d;
}