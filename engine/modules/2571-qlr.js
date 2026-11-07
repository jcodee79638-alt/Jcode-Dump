
var qlr = Ie(function (Mfc, Rri) {
  class Bri extends Error {
    constructor(e, t, r) {
      super(e);
      if (((this.code = "FETCH_ERROR"), r)) Object.assign(this, r);
      ((this.errno = this.code),
        (this.type = this.code === "EBADSIZE" && this.found > this.expect ? "max-size" : t),
        (this.message = e),
        Error.captureStackTrace(this, this.constructor));
    }
    get name() {
      return "FetchError";
    }
    set name(e) {}
    get [Symbol.toStringTag]() {
      return "FetchError";
    }
  }
  Rri.exports = Bri;
});