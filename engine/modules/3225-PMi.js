
var PMi = Ie(function (bMi) {
  Object.defineProperty(bMi, "__esModule", { value: !0 });
  bMi.hyphenate = bMi.parse = void 0;
  function i$a(e) {
    let t = [],
      r = 0,
      s = 0,
      a = 0,
      H = 0,
      u = 0,
      f = null;
    while (r < e.length)
      switch (e.charCodeAt(r++)) {
        case 40:
          s++;
          break;
        case 41:
          s--;
          break;
        case 39:
          if (a === 0) a = 39;
          else if (a === 39 && e.charCodeAt(r - 1) !== 92) a = 0;
          break;
        case 34:
          if (a === 0) a = 34;
          else if (a === 34 && e.charCodeAt(r - 1) !== 92) a = 0;
          break;
        case 58:
          if (!f && s === 0 && a === 0) ((f = vMi(e.substring(u, r - 1).trim())), (H = r));
          break;
        case 59:
          if (f && H > 0 && s === 0 && a === 0) {
            let _ = e.substring(H, r - 1).trim();
            (t.push(f, _), (u = r), (H = 0), (f = null));
          }
          break;
      }
    if (f && H) {
      let d = e.slice(H).trim();
      t.push(f, d);
    }
    return t;
  }
  bMi.parse = i$a;
  function vMi(e) {
    return e.replace(/[a-z][A-Z]/g, (t) => t.charAt(0) + "-" + t.charAt(1)).toLowerCase();
  }
  bMi.hyphenate = vMi;
});