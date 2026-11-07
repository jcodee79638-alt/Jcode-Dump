
function Ut(e, t) {
  return typeof e === "string" && e.length <= t && !e.includes("\x00");
}