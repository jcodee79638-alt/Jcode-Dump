
var Wvn = Ie(function ($YH, Rvn) {
  var Bvn = Fvn();
  Rvn.exports = function (t) {
    if (!Bvn(t)) t = {};
    var r = arguments.length;
    for (var s = 1; s < r; s++) {
      var a = arguments[s];
      if (Bvn(a)) Lco(t, a);
    }
    return t;
  };
  function Lco(e, t) {
    for (var r in t) if ($co(t, r)) e[r] = t[r];
  }
  function $co(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
});