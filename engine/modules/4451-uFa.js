
function uFa(e) {
  let t = globalThis.DOMException;
  return typeof t == "function" ? new t(e, "SyntaxError") : SyntaxError(e);
}