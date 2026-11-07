
var bxe = Ie(function (EYH, Jvn) {
  function gVe(e, t) {
    if (
      (Error.call(this),
      (this.name = "YAMLException"),
      (this.reason = e),
      (this.mark = t),
      (this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "")),
      Error.captureStackTrace)
    )
      Error.captureStackTrace(this, this.constructor);
    else this.stack = Error().stack || "";
  }
  gVe.prototype = Object.create(Error.prototype);
  gVe.prototype.constructor = gVe;
  gVe.prototype.toString = function (t) {
    var r = this.name + ": ";
    if (((r += this.reason || "(unknown reason)"), !t && this.mark)) r += " " + this.mark.toString();
    return r;
  };
  Jvn.exports = gVe;
});