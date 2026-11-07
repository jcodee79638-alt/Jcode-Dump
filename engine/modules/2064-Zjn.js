
var Zjn = Ie(function (nZH, Yjn) {
  var efo = yar(),
    tfo = xVe();
  Yjn.exports = function (e, t, r) {
    let s = tfo(r),
      a = efo(e, s);
    if (typeof a.parse !== "function") throw TypeError('expected "' + e + '.parse" to be a function');
    return a.parse(t, s);
  };
});