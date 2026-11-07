
function Kn(e, t) {
  let n = L.default.relative(e, t);
  return n === "" || (!n.startsWith("..") && !L.default.isAbsolute(n));
}