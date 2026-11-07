
var oAr = Ie(function (Occ, HJn) {
  HJn.exports = process.env.DEBUG_NOPT || process.env.NOPT_DEBUG ? (...e) => console.error(...e) : () => {};
});