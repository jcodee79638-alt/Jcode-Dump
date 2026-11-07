
var Ngi = Ie(function (G$c, Ugi) {
  var Ogi = cr("crypto"),
    { dirname: Rca, basename: Wca, resolve: Vca } = cr("path"),
    qca = (e) =>
      Ogi.createHash("sha1")
        .update(e)
        .digest("base64")
        .replace(/[^a-zA-Z0-9]+/g, "")
        .slice(0, 8),
    Gca = (e) => {
      let t = Rca(e),
        r = Wca(e),
        s = qca(e);
      return Vca(t, `.${r}-${s}`);
    };
  Ugi.exports = Gca;
});