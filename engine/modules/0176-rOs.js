
function rOs(e) {
  return function (r, s) {
    for (let a of r) {
      let H = !1;
      for (let u of s)
        if (e(a, u)) {
          H = !0;
          break;
        }
      if (!H) return !1;
    }
    return !0;
  };
}