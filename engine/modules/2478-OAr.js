
var OAr = Ie(function (ZAc, xzn) {
  var { stat: t6o } = cr("fs/promises");
  xzn.exports = ({ cwd: e = process.cwd() } = {}) =>
    t6o(e + "/.git").then(
      () => !0,
      () => !1,
    );
});