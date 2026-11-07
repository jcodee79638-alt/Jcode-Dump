
function et(e) {
  let t = q(e);
  if (!Cn.default.isAbsolute(t) || /[\r\n]/.test(t)) throw Error("Choose an absolute project folder.");
  return Cn.default.resolve(t);
}