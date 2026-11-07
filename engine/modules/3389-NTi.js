
var NTi = Ie(function (UTi) {
  Object.defineProperty(UTi, "__esModule", { value: !0 });
  UTi.default = (e, t) => {
    if (t === void 0) return !0;
    let r = e.txt,
      s = Object.entries(t).map(([a, H]) => {
        let u = r[a];
        if (u === void 0) return !1;
        if (H != u) return !1;
        return !0;
      });
    if (s.length == 0) return !0;
    if (s.includes(!1)) return !1;
    return !0;
  };
});