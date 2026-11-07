
function fKt(e) {
  try {
    return e.toISOString();
  } catch {
    return "Invalid Date";
  }
}