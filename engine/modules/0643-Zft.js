
function Zft(e) {
  let t = {},
    r = e.length,
    s = 0,
    a = 0;
  while (!0) {
    if (a === r) break;
    if (((a = e.indexOf(";", s)), a === -1)) a = r;
    let H = e.indexOf("=", s);
    if (H === -1) break;
    if (H > a) {
      s = a + 1;
      continue;
    }
    let u = e.substring(s, H++).trim();
    if (t[u] === void 0) {
      let f = e.charCodeAt(H) === 34 ? e.substring(H + 1, a - 1).trim() : e.substring(H, a).trim();
      t[u] = f.indexOf("%") !== -1 ? eun(f) : f;
    }
    s = a + 1;
  }
  return t;
}