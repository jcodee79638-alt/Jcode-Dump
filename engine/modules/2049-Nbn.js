
var Nbn = Ie(function (qYH, Ubn) {
  var zAo = ix();
  function QAo(e) {
    if (e === null) return !1;
    if (e.length === 0) return !1;
    var t = e,
      r = /\/([gim]*)$/.exec(e),
      s = "";
    if (t[0] === "/") {
      if (r) s = r[1];
      if (s.length > 3) return !1;
      if (t[t.length - s.length - 1] !== "/") return !1;
    }
    return !0;
  }
  function YAo(e) {
    var t = e,
      r = /\/([gim]*)$/.exec(e),
      s = "";
    if (t[0] === "/") {
      if (r) s = r[1];
      t = t.slice(1, t.length - s.length - 1);
    }
    return new RegExp(t, s);
  }
  function ZAo(e) {
    var t = "/" + e.source + "/";
    if (e.global) t += "g";
    if (e.multiline) t += "m";
    if (e.ignoreCase) t += "i";
    return t;
  }
  function euo(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }
  Ubn.exports = new zAo("tag:yaml.org,2002:js/regexp", {
    kind: "scalar",
    resolve: QAo,
    construct: YAo,
    predicate: euo,
    represent: ZAo,
  });
});