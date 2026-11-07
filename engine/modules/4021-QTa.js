
function QTa(e) {
  if (e.startsWith("~/")) return XTt.homedir() + e.slice(1);
  if (e === "~") return XTt.homedir();
  if (e.startsWith("$HOME/")) return XTt.homedir() + e.slice(5);
  if (e.startsWith("$HOME")) return XTt.homedir() + e.slice(5);
  return e;
}