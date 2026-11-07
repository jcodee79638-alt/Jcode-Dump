
function xGa(e) {
  if (!e) return;
  let t = e.textDocumentSync;
  if (typeof t === "number") return t;
  return t?.change;
}