
function Psr() {
  let e = xMn(),
    t = eeo[e];
  if (!t) throw Error(`No npm package available for platform: ${e}`);
  return t;
}