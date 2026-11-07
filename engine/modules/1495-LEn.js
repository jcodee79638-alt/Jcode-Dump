
function LEn(e) {
  let t = e.indexOf("%");
  if (t === -1) return e;
  let r = "",
    s = t;
  for (let a = t; a < e.length; a++)
    if (e.charCodeAt(a) === 37) {
      let H = e.charCodeAt(a + 1),
        u = e.charCodeAt(a + 2),
        f = yEn(H, u);
      ((r += e.slice(s, a) + f), (s = a + 3));
    }
  return e.slice(0, t) + r + e.slice(s);
}