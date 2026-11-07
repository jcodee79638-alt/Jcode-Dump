
function aOs(e) {
  try {
    let t = e.toString();
    return typeof t === "string" ? t : String(t);
  } catch {
    return "[toString threw]";
  }
}