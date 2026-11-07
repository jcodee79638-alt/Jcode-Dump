
var JKn = Ie(function (FAc, XKn) {
  var { GitConnectionError: Xwo, GitPathspecError: Jwo, GitUnknownError: Kwo } = MAr(),
    zwo = new RegExp(
      [
        "remote error: Internal Server Error",
        "The remote end hung up unexpectedly",
        "Connection timed out",
        "Operation timed out",
        "Failed to connect to .* Timed out",
        "Connection reset by peer",
        "SSL_ERROR_SYSCALL",
        "The requested URL returned error: 503",
      ].join("|"),
    ),
    Qwo = /pathspec .* did not match any file\(s\) known to git/;
  function Ywo(e) {
    let t = e.stderr,
      r;
    if (zwo.test(t)) r = new Xwo(t);
    else if (Qwo.test(t)) r = new Jwo(t);
    else r = new Kwo(t);
    return Object.assign(r, e);
  }
  XKn.exports = Ywo;
});