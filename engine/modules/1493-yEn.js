
function yEn(e, t) {
  if (e === 50) {
    if (t === 53) return "%";
    if (t === 51) return "#";
    if (t === 52) return "$";
    if (t === 54) return "&";
    if (t === 66) return "+";
    if (t === 98) return "+";
    if (t === 67) return ",";
    if (t === 99) return ",";
    if (t === 70) return "/";
    if (t === 102) return "/";
    return;
  }
  if (e === 51) {
    if (t === 65) return ":";
    if (t === 97) return ":";
    if (t === 66) return ";";
    if (t === 98) return ";";
    if (t === 68) return "=";
    if (t === 100) return "=";
    if (t === 70) return "?";
    if (t === 102) return "?";
    return;
  }
  if (e === 52 && t === 48) return "@";
  return;
}