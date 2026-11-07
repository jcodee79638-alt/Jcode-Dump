
function ski(e, t, r) {
  let s = (a) => e(a, ...t);
  return r === void 0 ? s : Object.assign(s, { lazy: r, lazyArgs: t });
}