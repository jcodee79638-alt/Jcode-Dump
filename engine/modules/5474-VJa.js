
function VJa(e, t) {
  var r = t.key.name,
    s = e[r],
    a = "true";
  if (t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set"))
    a = (t.static ? "s" : "i") + t.kind;
  if (
    (s === "iget" && a === "iset") ||
    (s === "iset" && a === "iget") ||
    (s === "sget" && a === "sset") ||
    (s === "sset" && a === "sget")
  )
    return ((e[r] = "true"), !1);
  else if (!s) return ((e[r] = a), !1);
  else return !0;
}