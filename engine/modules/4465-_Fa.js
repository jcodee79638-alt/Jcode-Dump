
function _Fa() {
  let e = {};
  for (let t of mFa) {
    let r = wMr.env[t];
    if (r === void 0) continue;
    if (r.startsWith("()")) continue;
    e[t] = r;
  }
  return e;
}