
function Bwn(e) {
  if (e === null || typeof e !== "object" || Array.isArray(e)) return !1;
  let t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}