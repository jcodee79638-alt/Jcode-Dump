
function Ojr(e) {
  if (Array.isArray(e)) return e.some(Ojr);
  if (!rk(e)) return !1;
  if (typeof e.$ref === "string" && (e.$ref.startsWith("#/$defs/") || e.$ref.startsWith("#/definitions/")))
    return !0;
  return Object.values(e).some(Ojr);
}