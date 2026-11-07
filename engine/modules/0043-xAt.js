
function xAt(e) {
  if (e === null || typeof e === "string" || typeof e === "number" || typeof e === "boolean") return !0;
  if (Array.isArray(e)) return e.every(xAt);
  if (typeof e === "object")
    return Object.entries(e).every(([t, r]) => typeof t === "string" && (r === void 0 || xAt(r)));
  return !1;
}