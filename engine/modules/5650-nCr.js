
var nCr = Ie(function (CvA, PQi) {
  var bQi = /^[0-9]+$/,
    jQi = (e, t) => {
      if (typeof e === "number" && typeof t === "number") return e === t ? 0 : e < t ? -1 : 1;
      let r = bQi.test(e),
        s = bQi.test(t);
      if (r && s) ((e = +e), (t = +t));
      return e === t ? 0 : r && !s ? -1 : s && !r ? 1 : e < t ? -1 : 1;
    },
    aZa = (e, t) => jQi(t, e);
  PQi.exports = { compareIdentifiers: jQi, rcompareIdentifiers: aZa };
});