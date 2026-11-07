
var bzn = Ie(function (tuc, vzn) {
  var i6o = g7e();
  vzn.exports = (e = {}) =>
    i6o(["status", "--porcelain=v1", "-uno"], e).then(
      (t) =>
        !t.stdout
          .trim()
          .split(/\r?\n+/)
          .map((r) => r.trim())
          .filter((r) => r).length,
    );
});