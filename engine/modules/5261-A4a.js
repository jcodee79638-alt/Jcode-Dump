
function A4a(e, t) {
  return e.replace(/\$\{(\w+)\}/g, (r, s) => {
    let a = t[s];
    if (a === void 0) throw Error(`Missing shell prompt value: ${s}`);
    return a;
  });
}