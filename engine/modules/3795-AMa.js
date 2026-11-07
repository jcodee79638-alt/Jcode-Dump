
function AMa(e) {
  let t = typeof e.value;
  if (t !== "bigint" && t !== "number" && t !== "boolean" && t !== "string")
    return { type: Array.isArray(e.value) ? "array" : "object" };
  return { type: t === "bigint" ? "integer" : t, const: e.value };
}