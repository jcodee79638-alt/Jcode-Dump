
var scr = Ie(function (HUn) {
  Object.defineProperty(HUn, "__esModule", { value: !0 });
  HUn.createConstMap = void 0;
  function s$o(e) {
    let t = {},
      r = e.length;
    for (let s = 0; s < r; s++) {
      let a = e[s];
      if (a) t[String(a).toUpperCase().replace(/[-.]/g, "_")] = a;
    }
    return t;
  }
  HUn.createConstMap = s$o;
});