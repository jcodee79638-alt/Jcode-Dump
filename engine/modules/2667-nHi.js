
var nHi = Ie(function (ldc, rHi) {
  var DGo = (e, t) => {
    if (e.hosted) {
      let r = e.hosted,
        s = { noCommittish: !0 };
      return `${r.https && r.auth ? r.https(s) : r.shortcut(s)}#${t}`;
    } else {
      let r = e.rawSpec.indexOf("#");
      return `${r === -1 ? e.rawSpec : e.rawSpec.slice(0, r)}#${t}`;
    }
  };
  rHi.exports = DGo;
});