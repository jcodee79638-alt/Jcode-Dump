
function T9a(e) {
  var t;
  if (typeof e.getHeader === "function") t = e.getHeader("content-type");
  else if (typeof e.headers === "object") t = e.headers && e.headers["content-type"];
  if (typeof t !== "string") throw TypeError("content-type header is missing from object");
  return t;
}