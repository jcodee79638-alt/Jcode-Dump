
function Lwr(e, t) {
  if (Array.isArray(e)) return e.some((r) => Lwr(r, t));
  if (!e || typeof e !== "object") return !1;
  if (e.$ref === `#/components/schemas/${t}`) return !0;
  return Object.values(e).some((r) => Lwr(r, t));
}