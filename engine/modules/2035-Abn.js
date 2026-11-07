
var Abn = Ie(function (vYH, cbn) {
  var zco = ix();
  function Qco(e) {
    if (e === null) return !0;
    var t = e.length;
    return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
  }
  function Yco() {
    return null;
  }
  function Zco(e) {
    return e === null;
  }
  cbn.exports = new zco("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: Qco,
    construct: Yco,
    predicate: Zco,
    represent: {
      canonical: function () {
        return "~";
      },
      lowercase: function () {
        return "null";
      },
      uppercase: function () {
        return "NULL";
      },
      camelcase: function () {
        return "Null";
      },
    },
    defaultStyle: "lowercase",
  });
});