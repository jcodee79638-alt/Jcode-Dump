
var pbn = Ie(function (jYH, fbn) {
  var iAo = gme(),
    sAo = ix();
  function oAo(e) {
    return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
  }
  function aAo(e) {
    return 48 <= e && e <= 55;
  }
  function HAo(e) {
    return 48 <= e && e <= 57;
  }
  function cAo(e) {
    if (e === null) return !1;
    var t = e.length,
      r = 0,
      s = !1,
      a;
    if (!t) return !1;
    if (((a = e[r]), a === "-" || a === "+")) a = e[++r];
    if (a === "0") {
      if (r + 1 === t) return !0;
      if (((a = e[++r]), a === "b")) {
        r++;
        for (; r < t; r++) {
          if (((a = e[r]), a === "_")) continue;
          if (a !== "0" && a !== "1") return !1;
          s = !0;
        }
        return s && a !== "_";
      }
      if (a === "x") {
        r++;
        for (; r < t; r++) {
          if (((a = e[r]), a === "_")) continue;
          if (!oAo(e.charCodeAt(r))) return !1;
          s = !0;
        }
        return s && a !== "_";
      }
      for (; r < t; r++) {
        if (((a = e[r]), a === "_")) continue;
        if (!aAo(e.charCodeAt(r))) return !1;
        s = !0;
      }
      return s && a !== "_";
    }
    if (a === "_") return !1;
    for (; r < t; r++) {
      if (((a = e[r]), a === "_")) continue;
      if (a === ":") break;
      if (!HAo(e.charCodeAt(r))) return !1;
      s = !0;
    }
    if (!s || a === "_") return !1;
    if (a !== ":") return !0;
    return /^(:[0-5]?[0-9])+$/.test(e.slice(r));
  }
  function AAo(e) {
    var t = e,
      r = 1,
      s,
      a,
      H = [];
    if (t.indexOf("_") !== -1) t = t.replace(/_/g, "");
    if (((s = t[0]), s === "-" || s === "+")) {
      if (s === "-") r = -1;
      ((t = t.slice(1)), (s = t[0]));
    }
    if (t === "0") return 0;
    if (s === "0") {
      if (t[1] === "b") return r * parseInt(t.slice(2), 2);
      if (t[1] === "x") return r * parseInt(t, 16);
      return r * parseInt(t, 8);
    }
    if (t.indexOf(":") !== -1)
      return (
        t.split(":").forEach(function (u) {
          H.unshift(parseInt(u, 10));
        }),
        (t = 0),
        (a = 1),
        H.forEach(function (u) {
          ((t += u * a), (a *= 60));
        }),
        r * t
      );
    return r * parseInt(t, 10);
  }
  function uAo(e) {
    return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !iAo.isNegativeZero(e);
  }
  fbn.exports = new sAo("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: cAo,
    construct: AAo,
    predicate: uAo,
    represent: {
      binary: function (e) {
        return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
      },
      octal: function (e) {
        return e >= 0 ? "0" + e.toString(8) : "-0" + e.toString(8).slice(1);
      },
      decimal: function (e) {
        return e.toString(10);
      },
      hexadecimal: function (e) {
        return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
      },
    },
    defaultStyle: "decimal",
    styleAliases: { binary: [2, "bin"], octal: [8, "oct"], decimal: [10, "dec"], hexadecimal: [16, "hex"] },
  });
});