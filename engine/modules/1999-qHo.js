
function qHo(e) {
  return e
    .trim()
    .replace(/^git\+/, "")
    .replace(/#.*$/, "")
    .replace(/\/+$/, "");
}