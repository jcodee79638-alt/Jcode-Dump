
var LDn = Ie(function (Y3H, uir) {
  var hDn = (e = {}) => {
    let t = e.env || process.env;
    if ((e.platform || "win32") !== "win32") return "PATH";
    return (
      Object.keys(t)
        .reverse()
        .find((s) => s.toUpperCase() === "PATH") || "Path"
    );
  };
  uir.exports = hDn;
  uir.exports.default = hDn;
});