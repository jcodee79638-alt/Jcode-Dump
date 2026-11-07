
function lxa(e) {
  if (Hki(e)) return !0;
  if (typeof e != "object" || !Array.isArray(e)) return !1;
  let [t, r, ...s] = e;
  return Hki(t) && typeof r == "string" && r in cki && s.length === 0;
}