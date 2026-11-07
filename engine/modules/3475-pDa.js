
function pDa(e, t) {
  let r = Object.getPrototypeOf(e);
  return t in r ? void 0 : r;
}