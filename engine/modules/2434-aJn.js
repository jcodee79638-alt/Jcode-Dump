
var aJn = Ie(function (kcc, oJn) {
  oJn.exports = yCo;
  function yCo(...e) {
    let t = e;
    if (e.length === 1 && (Array.isArray(e[0]) || typeof e[0] === "string")) t = [].concat(e[0]);
    for (let a = 0, H = t.length; a < H; a++) t[a] = typeof t[a] === "string" ? t[a] : String(t[a]);
    t = t.sort(MCo);
    let r = {},
      s = "";
    for (let a = 0, H = t.length; a < H; a++) {
      let u = t[a],
        f = t[a + 1] || "",
        d = !0,
        _ = !0;
      if (u === f) continue;
      let L = 0,
        I = u.length;
      for (; L < I; L++) {
        let D = u.charAt(L);
        if (((d = d && D === f.charAt(L)), (_ = _ && D === s.charAt(L)), !d && !_)) {
          L++;
          break;
        }
      }
      if (((s = u), L === I)) {
        r[u] = u;
        continue;
      }
      for (let D = u.slice(0, L); L <= I; L++) ((r[D] = u), (D += u.charAt(L)));
    }
    return r;
  }
  function MCo(e, t) {
    return e === t ? 0 : e > t ? 1 : -1;
  }
});