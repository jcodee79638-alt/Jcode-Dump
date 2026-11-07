
var KJi = Ie(function (rza) {
  function mPr(e, t, r) {
    var s = e[t];
    ((e[t] = e[r]), (e[r] = s));
  }
  function tza(e, t) {
    return Math.round(e + Math.random() * (t - e));
  }
  function _Pr(e, t, r, s) {
    if (r < s) {
      var a = tza(r, s),
        H = r - 1;
      mPr(e, a, s);
      var u = e[s];
      for (var f = r; f < s; f++) if (t(e[f], u) <= 0) ((H += 1), mPr(e, H, f));
      mPr(e, H + 1, f);
      var d = H + 1;
      (_Pr(e, t, r, d - 1), _Pr(e, t, d + 1, s));
    }
  }
  rza.quickSort = function (e, t) {
    _Pr(e, t, 0, e.length - 1);
  };
});