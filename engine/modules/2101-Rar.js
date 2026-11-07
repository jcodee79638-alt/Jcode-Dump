
var Rar = Ie(function (xec, UPn) {
  var kPn = /^[0-9]+$/,
    OPn = (e, t) => {
      if (typeof e === "number" && typeof t === "number") return e === t ? 0 : e < t ? -1 : 1;
      let r = kPn.test(e),
        s = kPn.test(t);
      if (r && s) ((e = +e), (t = +t));
      return e === t ? 0 : r && !s ? -1 : s && !r ? 1 : e < t ? -1 : 1;
    },
    _po = (e, t) => OPn(t, e);
  UPn.exports = { compareIdentifiers: OPn, rcompareIdentifiers: _po };
});