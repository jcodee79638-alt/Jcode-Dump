
function wBa() {
  if (typeof Deno < "u" && Deno.build != null) return "deno";
  if (typeof EdgeRuntime < "u") return "edge";
  if (
    Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) ===
    "[object process]"
  )
    return "node";
  return "unknown";
}