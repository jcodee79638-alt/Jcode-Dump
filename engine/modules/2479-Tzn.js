
var Tzn = Ie(function (euc, Szn) {
  var r6o = OAr(),
    { dirname: n6o } = cr("path");
  Szn.exports = async ({ cwd: e = process.cwd(), root: t } = {}) => {
    while (!0) {
      if (await r6o({ cwd: e })) return e;
      let r = n6o(e);
      if (e === t || e === r) return null;
      e = r;
    }
  };
});