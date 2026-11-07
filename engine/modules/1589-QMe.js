
function QMe(e) {
  let t = gir(e);
  if (!FQs.posix.isAbsolute(t) && !JDn(t)) throw Error(`Path is not absolute: ${e}`);
  return t;
}