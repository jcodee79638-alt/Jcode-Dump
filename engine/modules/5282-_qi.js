
function _qi(e) {
  if (e === "~") return Qbr.homedir();
  if (e.startsWith("~/") || e.startsWith("~\\")) return zLe.join(Qbr.homedir(), e.slice(2));
  return e;
}