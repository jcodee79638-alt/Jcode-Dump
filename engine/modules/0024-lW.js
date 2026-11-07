
function lW(e) {
  let t = iL(e);
  if (!dZr.isAbsolute(t) || /[\r\n]/.test(t)) throw Error("Choose an absolute project folder.");
  return dZr.resolve(t);
}