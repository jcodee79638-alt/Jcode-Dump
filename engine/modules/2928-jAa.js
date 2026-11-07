
function jAa(e) {
  return typeof e === "string" ? e.startsWith(".") || e.startsWith("/") || e.startsWith("~") : "path" in e;
}