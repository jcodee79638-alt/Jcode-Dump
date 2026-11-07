
var wlr = Ie(function (pfc, Kti) {
  var { stat: J2o } = cr("fs/promises"),
    { resolve: K2o } = cr("path");
  Kti.exports = async (e) => {
    try {
      return (await J2o(K2o(e, "server.js"))).isFile();
    } catch (t) {
      return !1;
    }
  };
});