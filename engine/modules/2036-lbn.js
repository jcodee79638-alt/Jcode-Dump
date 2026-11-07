
var lbn = Ie(function (bYH, ubn) {
  var eAo = ix();
  function tAo(e) {
    if (e === null) return !1;
    var t = e.length;
    return (
      (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
      (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
    );
  }
  function rAo(e) {
    return e === "true" || e === "True" || e === "TRUE";
  }
  function nAo(e) {
    return Object.prototype.toString.call(e) === "[object Boolean]";
  }
  ubn.exports = new eAo("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: tAo,
    construct: rAo,
    predicate: nAo,
    represent: {
      lowercase: function (e) {
        return e ? "true" : "false";
      },
      uppercase: function (e) {
        return e ? "TRUE" : "FALSE";
      },
      camelcase: function (e) {
        return e ? "True" : "False";
      },
    },
    defaultStyle: "lowercase",
  });
});