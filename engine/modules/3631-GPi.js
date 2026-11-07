
function GPi(e) {
  let t = e.additionalProperties;
  if (t === void 0 || t === !1 || typeof t !== "object" || t === null) return null;
  return Object.keys(t).length ? t : null;
}