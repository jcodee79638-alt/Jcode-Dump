
function zfe(e, t) {
  if (e === t) return !0;
  if (e == null || t == null) return !1;
  let r = typeof e;
  if (r !== typeof t) return !1;
  if (r === "number" && e !== e && t !== t) return !0;
  if (r !== "object" && r !== "function") return !1;
  if (KFe.has(e) || KFe.has(t)) return !1;
  return z8s(e, t, K8s);
}