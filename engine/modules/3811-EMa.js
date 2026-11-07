
function EMa(e, t) {
  if (e.catchall._def.typeName !== "ZodNever")
    return YL(e.catchall._def, { ...t, currentPath: [...t.currentPath, "additionalProperties"] });
  switch (e.unknownKeys) {
    case "passthrough":
      return t.allowedAdditionalProperties;
    case "strict":
      return t.rejectedAdditionalProperties;
    case "strip":
      return t.removeAdditionalStrategy === "strict"
        ? t.allowedAdditionalProperties
        : t.rejectedAdditionalProperties;
  }
}