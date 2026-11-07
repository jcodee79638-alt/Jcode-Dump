
var Qii = Ie(function (mpc, zii) {
  class Kii extends Error {
    constructor(e) {
      super(`request to ${e} failed: cache mode is 'only-if-cached' but no cached response is available.`);
      this.code = "ENOTCACHED";
    }
  }
  zii.exports = { NotCachedError: Kii };
});