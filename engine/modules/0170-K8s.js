
function K8s(e, t) {
  if (ad(e) !== ad(t)) return !1;
  else if (e instanceof Date) {
    if (!(t instanceof Date)) return !1;
    return e.toISOString() === t.toISOString();
  } else if (e instanceof RegExp) {
    if (!(t instanceof RegExp)) return !1;
    return e.toString() === t.toString();
  }
  let r = jtn(e),
    s = jtn(t);
  if (r !== s) return !1;
  let a = r && s;
  if (typeof e === "function" && !a) return !1;
  return J8s(e, t, () => {
    if (a) return e[V_](t);
    else if (Array.isArray(e)) {
      if (!Array.isArray(t) || e.length !== t.length) return !1;
      return Q8s(e, t);
    } else if (ArrayBuffer.isView(e)) {
      if (!ArrayBuffer.isView(t) || e.byteLength !== t.byteLength) return !1;
      return Y8s(e, t);
    } else if (e instanceof Map) {
      if (!(t instanceof Map) || e.size !== t.size) return !1;
      return tOs(e, t);
    } else if (e instanceof Set) {
      if (!(t instanceof Set) || e.size !== t.size) return !1;
      return nOs(e, t);
    }
    return Z8s(e, t);
  });
}