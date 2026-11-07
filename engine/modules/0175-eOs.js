
function eOs(e, t) {
  return function (s, a) {
    for (let [H, u] of s) {
      let f = !1;
      for (let [d, _] of a)
        if (e(H, d) && t(u, _)) {
          f = !0;
          break;
        }
      if (!f) return !1;
    }
    return !0;
  };
}