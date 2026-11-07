
function AXe(e) {
  if (e instanceof Error) return e.stack ?? `${e.name}: ${e.message}`;
  if (typeof e === "object" && e !== null)
    try {
      let t = JSON.stringify(e, null, 2);
      if (t === "{}") {
        let r = String(e);
        if (r && r !== "[object Object]") return r;
        let s = e.constructor?.name,
          a = s && s !== "Object" ? s : "Error",
          H = Object.getOwnPropertyNames(e);
        return H.length === 0 ? `${a} (no message)` : `${a} { ${H.join(", ")} }`;
      }
      return t;
    } catch {
      return "Unexpected error (unserializable)";
    }
  return String(e);
}