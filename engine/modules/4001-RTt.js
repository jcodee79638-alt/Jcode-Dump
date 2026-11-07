
function RTt(e, t) {
  if (e === t) return !0;
  if (e == null || t == null) return !1;
  if (typeof e !== "object" && typeof t !== "object") return e === t;
  if (e.constructor !== t.constructor) return !1;
  if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
  if (Array.isArray(e)) {
    if (e.length !== t.length) return !1;
    for (let a = 0; a < e.length; a++) if (!RTt(e[a], t[a])) return !1;
    return !0;
  }
  let r = Object.keys(e),
    s = Object.keys(t);
  if (r.length !== s.length) return !1;
  for (let a of r) {
    if (!s.includes(a)) return !1;
    if (!RTt(e[a], t[a])) return !1;
  }
  return !0;
}