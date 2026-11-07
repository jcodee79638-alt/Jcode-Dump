
var Qvn = Ie(function (IYH, zvn) {
  var Kvn = gme();
  function Aar(e, t, r, s, a) {
    ((this.name = e), (this.buffer = t), (this.position = r), (this.line = s), (this.column = a));
  }
  Aar.prototype.getSnippet = function (t, r) {
    var s, a, H, u, f;
    if (!this.buffer) return null;
    ((t = t || 4), (r = r || 75), (s = ""), (a = this.position));
    while (
      a > 0 &&
      `\x00\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(a - 1)) === -1
    )
      if (((a -= 1), this.position - a > r / 2 - 1)) {
        ((s = " ... "), (a += 5));
        break;
      }
    ((H = ""), (u = this.position));
    while (
      u < this.buffer.length &&
      `\x00\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(u)) === -1
    )
      if (((u += 1), u - this.position > r / 2 - 1)) {
        ((H = " ... "), (u -= 5));
        break;
      }
    return (
      (f = this.buffer.slice(a, u)),
      Kvn.repeat(" ", t) +
        s +
        f +
        H +
        `
` +
        Kvn.repeat(" ", t + this.position - a + s.length) +
        "^"
    );
  };
  Aar.prototype.toString = function (t) {
    var r,
      s = "";
    if (this.name) s += 'in "' + this.name + '" ';
    if (((s += "at line " + (this.line + 1) + ", column " + (this.column + 1)), !t)) {
      if (((r = this.getSnippet()), r))
        s +=
          `:
` + r;
    }
    return s;
  };
  zvn.exports = Aar;
});