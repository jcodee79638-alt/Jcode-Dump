
var Var = Ie(function (bec, VPn) {
  var Epo = coe(),
    Ipo = (e, t) => {
      let r = Epo(e.trim().replace(/^[=v]+/, ""), t);
      return r ? r.version : null;
    };
  VPn.exports = Ipo;
});