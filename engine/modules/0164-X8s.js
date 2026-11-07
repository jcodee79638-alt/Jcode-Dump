
function X8s(e, t) {
  if (oKt.has(e)) return N0("[Circular]");
  oKt.add(e);
  let r = t();
  return (oKt.delete(e), r);
}