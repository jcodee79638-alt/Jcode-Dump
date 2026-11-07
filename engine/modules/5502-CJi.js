
var CJi = Ie(function (fKa) {
  var PJi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  fKa.encode = function (e) {
    if (0 <= e && e < PJi.length) return PJi[e];
    throw TypeError("Must be between 0 and 63: " + e);
  };
  fKa.decode = function (e) {
    var t = 65,
      r = 90,
      s = 97,
      a = 122,
      H = 48,
      u = 57,
      f = 43,
      d = 47,
      _ = 26,
      L = 52;
    if (t <= e && e <= r) return e - t;
    if (s <= e && e <= a) return e - s + _;
    if (H <= e && e <= u) return e - H + L;
    if (e == f) return 62;
    if (e == d) return 63;
    return -1;
  };
});