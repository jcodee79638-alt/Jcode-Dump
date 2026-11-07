
var cmi = Ie(function (Xhc, Hmi) {
  var { createHash: yea } = cr("crypto");
  Hmi.exports = ({ name: e, source: t }) =>
    yea("sha512")
      .update(JSON.stringify([e, t]))
      .digest("base64");
});