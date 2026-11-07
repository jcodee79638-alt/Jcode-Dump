
function m5e(e) {
  let t = e._zod.def;
  if (t.type === "pipe" && t.in._zod.traits.has("$ZodTransform")) return m5e(t.out);
  if (t.type === "catch") return m5e(t.innerType);
  return e._zod.optin;
}