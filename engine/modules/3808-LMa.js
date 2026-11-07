
function LMa(e, t) {
  if (
    ["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(e.innerType._def.typeName) &&
    (!e.innerType._def.checks || !e.innerType._def.checks.length)
  )
    return { type: [XIr[e.innerType._def.typeName], "null"] };
  let r = YL(e.innerType._def, { ...t, currentPath: [...t.currentPath, "anyOf", "0"] });
  return r && { anyOf: [r, { type: "null" }] };
}