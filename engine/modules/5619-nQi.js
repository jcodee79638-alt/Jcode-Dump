
function nQi(e, t) {
  let r = sQi(e, t);
  if (r) return r;
  throw Error(`${t} is required`);
}