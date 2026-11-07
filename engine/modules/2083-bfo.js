
function bfo(e, t) {
  if (e.startsWith("~/")) return t + e.slice(1);
  if (e === "~") return t;
  if (e === "$HOME") return t;
  if (e.startsWith("$HOME/")) return t + e.slice(5);
  if (e.startsWith("$HOME\\")) return t + e.slice(5);
  return e;
}