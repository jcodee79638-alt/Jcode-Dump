
var blr = Ie(function (lfc, Gti) {
  var qti = cr("util"),
    ZEt = cr("fs"),
    { stat: W2o } = ZEt.promises || { stat: qti.promisify(ZEt.stat) };
  async function V2o(e) {
    return await W2o(`${e}/binding.gyp`)
      .then((t) => t.isFile())
      .catch(() => !1);
  }
  Gti.exports = { isNodeGypPackage: V2o, defaultGypInstallScript: "node-gyp rebuild" };
});