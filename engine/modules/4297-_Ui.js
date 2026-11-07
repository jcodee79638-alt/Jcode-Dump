
function _Ui(e, t) {
  let r = { ...e };
  for (let s in t) {
    let a = s,
      H = t[a];
    if (H === void 0) continue;
    let u = r[a];
    if (mUi(u) && mUi(H)) r[a] = { ...u, ...H };
    else r[a] = H;
  }
  return r;
}