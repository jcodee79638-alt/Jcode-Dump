
function xr(e) {
  if (typeof e == "function" && !e.length) return xr(e());
  if (Array.isArray(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) {
      const s = xr(e[i]);
      Array.isArray(s) ? n.push.apply(n, s) : n.push(s);
    }
    return n;
  }
  return e;
}