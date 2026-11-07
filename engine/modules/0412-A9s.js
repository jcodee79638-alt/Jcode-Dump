
function A9s(e) {
  let t = new Set();
  return r(e);
  function r(s) {
    if (s === void 0 || typeof s === "string") return !0;
    if (typeof s !== "object" || s === null) return !1;
    if (t.has(s)) return !1;
    if ((t.add(s), Array.isArray(s))) return s.every(r);
    return Object.keys(s).every((a) => r(s[a]));
  }
}