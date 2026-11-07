
function HDr(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}