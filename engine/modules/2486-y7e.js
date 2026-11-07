
var y7e = Ie(function (auc, Kzn) {
  var { basename: Jzn, dirname: T6o } = cr("path"),
    v6o = (e, t) => (e.charAt(0) === "@" ? `${e}/${t}` : t);
  Kzn.exports = (e) => (e ? v6o(Jzn(T6o(e)), Jzn(e)) : !1);
});