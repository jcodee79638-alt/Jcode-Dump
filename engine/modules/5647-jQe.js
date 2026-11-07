
var jQe = Ie(function (jvA, SQi) {
  var JYa =
    typeof process === "object" &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)
      ? (...e) => console.error("SEMVER", ...e)
      : () => {};
  SQi.exports = JYa;
});