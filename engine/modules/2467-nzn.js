
var nzn = Ie(function (RAc, rzn) {
  var tzn = Jht(),
    SAr;
  try {
    SAr = tzn.sync("git");
  } catch {}
  rzn.exports = (e = {}) => {
    if (e.git) return e.git;
    if (!SAr || e.git === !1) return Object.assign(Error("No git binary found in $PATH"), { code: "ENOGIT" });
    return SAr;
  };
});