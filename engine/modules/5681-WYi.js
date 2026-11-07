
var WYi = Ie(function (ubA, RYi) {
  var OeH = Mb(),
    UeH = ER(),
    NeH = (e, t, r) => {
      let s = null,
        a = null,
        H = null;
      try {
        H = new UeH(t, r);
      } catch (u) {
        return null;
      }
      return (
        e.forEach((u) => {
          if (H.test(u)) {
            if (!s || a.compare(u) === -1) ((s = u), (a = new OeH(s, r)));
          }
        }),
        s
      );
    };
  RYi.exports = NeH;
});