
function Tcr(e, t) {
  if (e == null) return !0;
  if (typeof e === "string" || typeof e === "number" || typeof e === "boolean") return !0;
  if (e instanceof Uint8Array) return !0;
  if (typeof e === "object") {
    if (t.has(e)) return !1;
    if ((t.add(e), Array.isArray(e))) return e.every((s) => Tcr(s, t));
    let r = e;
    if (r.constructor !== Object && r.constructor !== void 0) return !1;
    return Object.values(r).every((s) => Tcr(s, t));
  }
  return !1;
}