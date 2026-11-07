
var Cbn = Ie(function (RYH, Pbn) {
  var FAo = ix(),
    BAo = Object.prototype.hasOwnProperty;
  function RAo(e) {
    if (e === null) return !0;
    var t,
      r = e;
    for (t in r)
      if (BAo.call(r, t)) {
        if (r[t] !== null) return !1;
      }
    return !0;
  }
  function WAo(e) {
    return e !== null ? e : {};
  }
  Pbn.exports = new FAo("tag:yaml.org,2002:set", { kind: "mapping", resolve: RAo, construct: WAo });
});