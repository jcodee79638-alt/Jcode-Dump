
function sQi(e, t) {
  let r = e[t];
  if (r === void 0 || r === null || r === "") return;
  if (typeof r !== "string") throw Error(`${t} must be a string`);
  return r;
}