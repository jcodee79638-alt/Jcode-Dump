
function Y1e(e) {
  let t = Y1e.encodeInput(e);
  if (!t.length) return "";
  return `/*${t}*/`;
}