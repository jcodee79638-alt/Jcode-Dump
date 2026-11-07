
function St(e, t) {
  let n = W.default.relative(se(e), se(t));
  return !n || (!n.startsWith(`..${W.default.sep}`) && n !== ".." && !W.default.isAbsolute(n));
}