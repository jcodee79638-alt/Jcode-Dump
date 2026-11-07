
function UDa(e, t = null) {
  try {
    let r = e.split(".");
    if (r.length !== 3) return !1;
    let [s] = r;
    if (!s) return !1;
    let a = JSON.parse(atob(s));
    if ("typ" in a && a?.typ !== "JWT") return !1;
    if (!a.alg) return !1;
    if (t && (!("alg" in a) || a.alg !== t)) return !1;
    return !0;
  } catch {
    return !1;
  }
}