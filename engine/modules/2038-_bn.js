
var _bn = Ie(function (PYH, mbn) {
  var dbn = gme(),
    lAo = ix(),
    fAo = new RegExp(
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$",
    );
  function pAo(e) {
    if (e === null) return !1;
    if (!fAo.test(e) || e[e.length - 1] === "_") return !1;
    return !0;
  }
  function dAo(e) {
    var t, r, s, a;
    if (
      ((t = e.replace(/_/g, "").toLowerCase()),
      (r = t[0] === "-" ? -1 : 1),
      (a = []),
      "+-".indexOf(t[0]) >= 0)
    )
      t = t.slice(1);
    if (t === ".inf") return r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    else if (t === ".nan") return NaN;
    else if (t.indexOf(":") >= 0)
      return (
        t.split(":").forEach(function (H) {
          a.unshift(parseFloat(H, 10));
        }),
        (t = 0),
        (s = 1),
        a.forEach(function (H) {
          ((t += H * s), (s *= 60));
        }),
        r * t
      );
    return r * parseFloat(t, 10);
  }
  var mAo = /^[-+]?[0-9]+e/;
  function _Ao(e, t) {
    var r;
    if (isNaN(e))
      switch (t) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === e)
      switch (t) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === e)
      switch (t) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (dbn.isNegativeZero(e)) return "-0.0";
    return ((r = e.toString(10)), mAo.test(r) ? r.replace("e", ".e") : r);
  }
  function hAo(e) {
    return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || dbn.isNegativeZero(e));
  }
  mbn.exports = new lAo("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: pAo,
    construct: dAo,
    predicate: hAo,
    represent: _Ao,
    defaultStyle: "lowercase",
  });
});