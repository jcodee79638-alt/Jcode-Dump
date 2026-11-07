
function wRa(e, t) {
  if (!gRa.test(e)) return !1;
  try {
    let [r] = e.split(".");
    if (!r) return !1;
    let s = r
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(r.length + ((4 - (r.length % 4)) % 4), "="),
      a = JSON.parse(atob(s));
    if (typeof a !== "object" || a === null) return !1;
    if ("typ" in a && a?.typ !== "JWT") return !1;
    if (!a.alg) return !1;
    if (t && a.alg !== t) return !1;
    return !0;
  } catch {
    return !1;
  }
}