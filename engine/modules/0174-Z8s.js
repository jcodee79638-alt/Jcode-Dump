
function Z8s(e, t) {
  let r = JFe(e),
    s = JFe(t);
  if (r.size !== s.size) return !1;
  for (let a of r) if (!s.has(a) || !zfe(e[a], t[a])) return !1;
  return !0;
}