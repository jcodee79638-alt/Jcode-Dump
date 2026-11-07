
function tla(e, t) {
  let r = t.findLast((s) => XG(e, s.action));
  return r?.resource === "*" && r.effect === "deny";
}