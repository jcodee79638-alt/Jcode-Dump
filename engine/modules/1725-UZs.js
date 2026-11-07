
function UZs(e) {
  if (typeof e !== "object" || e === null || Array.isArray(e)) return !1;
  return Object.keys(e).some((t) => OZs.has(t));
}