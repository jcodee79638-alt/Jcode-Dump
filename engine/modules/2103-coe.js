
var coe = Ie(function (Tec, RPn) {
  var BPn = Zv(),
    Lpo = (e, t, r = !1) => {
      if (e instanceof BPn) return e;
      try {
        return new BPn(e, t);
      } catch (s) {
        if (!r) return null;
        throw s;
      }
    };
  RPn.exports = Lpo;
});