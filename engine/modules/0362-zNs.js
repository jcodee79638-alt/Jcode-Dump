
function zNs(e, t) {
  if (!e) return t.checks;
  if (!t.checks) return e;
  return [...e, ...t.checks];
}