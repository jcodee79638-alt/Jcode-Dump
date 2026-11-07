
function tva(e) {
  if (!e?.permission) return !1;
  return IHe("task", "*", e.permission).action !== "deny";
}