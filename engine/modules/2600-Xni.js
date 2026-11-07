
var Xni = Ie(function (Zfc, Gni) {
  class qni extends Error {
    constructor(e) {
      super(e);
      ((this.code = "FETCH_ABORTED"),
        (this.type = "aborted"),
        Error.captureStackTrace(this, this.constructor));
    }
    get name() {
      return "AbortError";
    }
    set name(e) {}
  }
  Gni.exports = qni;
});