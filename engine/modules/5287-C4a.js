
function C4a(e, t) {
  if (e.startsWith("(") || e.startsWith("@(")) return !0;
  if (e.includes("$(") || e.includes("${") || e.includes("`")) return !0;
  if (t) return /\$(?!env:)/i.test(e);
  return e.includes("$");
}