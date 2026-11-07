
function c9s(e) {
  let t = new Set(),
    r = new Set();
  return s(e);
  function s(a) {
    if (a === null || typeof a === "string" || typeof a === "boolean") return !0;
    if (typeof a === "number") return globalThis.Number.isFinite(a);
    if (typeof a !== "object" || a === void 0) return !1;
    if (t.has(a)) return !1;
    if (r.has(a)) return !0;
    t.add(a);
    let H = Array.isArray(a) ? a.every(s) : Object.keys(a).every((u) => s(a[u]));
    if ((t.delete(a), H)) r.add(a);
    return H;
  }
}