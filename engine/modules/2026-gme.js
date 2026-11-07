
var gme = Ie(function (Pco, $me) {
  function Xvn(e) {
    return typeof e > "u" || e === null;
  }
  function Sco(e) {
    return typeof e === "object" && e !== null;
  }
  function Tco(e) {
    if (Array.isArray(e)) return e;
    else if (Xvn(e)) return [];
    return [e];
  }
  function vco(e, t) {
    var r, s, a, H;
    if (t) {
      H = Object.keys(t);
      for (r = 0, s = H.length; r < s; r += 1) ((a = H[r]), (e[a] = t[a]));
    }
    return e;
  }
  function bco(e, t) {
    var r = "",
      s;
    for (s = 0; s < t; s += 1) r += e;
    return r;
  }
  function jco(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  Pco.isNothing = Xvn;
  Pco.isObject = Sco;
  Pco.toArray = Tco;
  Pco.repeat = bco;
  Pco.isNegativeZero = jco;
  Pco.extend = vco;
});