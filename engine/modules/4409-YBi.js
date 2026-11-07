
function YBi(e) {
  let t = typeof e === "string" ? new URL(e) : new URL(e.href);
  return ((t.hash = ""), t);
}