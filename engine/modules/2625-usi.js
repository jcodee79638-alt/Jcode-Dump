
var usi = Ie(function (Dpc, Asi) {
  Asi.exports = (e, t = process.argv) => {
    let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
      s = t.indexOf(r + e),
      a = t.indexOf("--");
    return s !== -1 && (a === -1 || s < a);
  };
});