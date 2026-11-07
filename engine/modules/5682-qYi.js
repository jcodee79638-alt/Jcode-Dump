
var qYi = Ie(function (lbA, VYi) {
  var FeH = Mb(),
    BeH = ER(),
    ReH = (e, t, r) => {
      let s = null,
        a = null,
        H = null;
      try {
        H = new BeH(t, r);
      } catch (u) {
        return null;
      }
      return (
        e.forEach((u) => {
          if (H.test(u)) {
            if (!s || a.compare(u) === 1) ((s = u), (a = new FeH(s, r)));
          }
        }),
        s
      );
    };
  VYi.exports = ReH;
});