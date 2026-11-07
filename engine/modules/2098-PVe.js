
var PVe = Ie(function (yec, PPn) {
  var ipo =
    typeof process === "object" &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)
      ? (...e) => console.error("SEMVER", ...e)
      : () => {};
  PPn.exports = ipo;
});