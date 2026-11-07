
var JCn = Ie(function (stc, XCn) {
  var Jdo = Zv(),
    Kdo = V2(),
    zdo = (e, t, r) => {
      let s = null,
        a = null,
        H = null;
      try {
        H = new Kdo(t, r);
      } catch (u) {
        return null;
      }
      return (
        e.forEach((u) => {
          if (H.test(u)) {
            if (!s || a.compare(u) === 1) ((s = u), (a = new Jdo(s, r)));
          }
        }),
        s
      );
    };
  XCn.exports = zdo;
});