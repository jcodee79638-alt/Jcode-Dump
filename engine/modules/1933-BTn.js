
function BTn(e, t) {
  if (!(t in e)) return;
  let r = Mxe(e);
  while (r) {
    let s = Object.getOwnPropertyDescriptor(r, t);
    if (s) return s;
    r = Mxe(r);
  }
  return;
}