
var sHi = Ie(function (fdc, iHi) {
  var yGo = j0t();
  iHi.exports = (e, t, r, s, a) => {
    let H = e.endsWith(".js"),
      u = H ? process.execPath : e,
      f = (H ? [e] : []).concat(t);
    return yGo(u, f, { cwd: r, env: s }, a);
  };
});