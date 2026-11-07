
var GCn = Ie(function (itc, qCn) {
  var qdo = Zv(),
    Gdo = V2(),
    Xdo = (e, t, r) => {
      let s = null,
        a = null,
        H = null;
      try {
        H = new Gdo(t, r);
      } catch (u) {
        return null;
      }
      return (
        e.forEach((u) => {
          if (H.test(u)) {
            if (!s || a.compare(u) === -1) ((s = u), (a = new qdo(s, r)));
          }
        }),
        s
      );
    };
  qCn.exports = Xdo;
});