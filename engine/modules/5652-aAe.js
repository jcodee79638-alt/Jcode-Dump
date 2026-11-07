
var aAe = Ie(function (kvA, OQi) {
  var kQi = Mb(),
    AZa = (e, t, r = !1) => {
      if (e instanceof kQi) return e;
      try {
        return new kQi(e, t);
      } catch (s) {
        if (!r) return null;
        throw s;
      }
    };
  OQi.exports = AZa;
});