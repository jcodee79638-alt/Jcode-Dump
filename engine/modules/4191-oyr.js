
function oyr(e) {
  if (typeof e === "string")
    try {
      let t = JSON.parse(e);
      if (t && typeof t === "object") return t;
      return;
    } catch {
      return;
    }
  if (typeof e === "object" && e !== null) return e;
  return;
}