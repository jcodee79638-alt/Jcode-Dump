
function u2s(e) {
  let t = {};
  for (let [r, s] of Object.entries(e)) {
    if (s === void 0) continue;
    let a = r.split("_"),
      H = t;
    for (let u of a) ((H.children ??= {}), (H = H.children[u] ??= {}));
    H.value = s;
  }
  return t;
}