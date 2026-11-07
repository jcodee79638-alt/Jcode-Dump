
function XHo(e) {
  return e !== "." && e !== ".." && !e.includes(":") && !/[\s/\\]/.test(e);
}