
function vSt(e) {
  if (Array.isArray(e)) return "array";
  if (typeof e === "string") return "string";
  return "unknown";
}