
var MAr = Ie(function (NAc, GKn) {
  class P0t extends Error {
    shouldRetry() {
      return !1;
    }
  }
  class WKn extends P0t {
    constructor() {
      super("A git connection error occurred");
    }
    shouldRetry(e) {
      return e < 3;
    }
  }
  class VKn extends P0t {
    constructor() {
      super("The git reference could not be found");
    }
  }
  class qKn extends P0t {
    constructor() {
      super("An unknown git error occurred");
    }
  }
  GKn.exports = { GitConnectionError: WKn, GitPathspecError: VKn, GitUnknownError: qKn };
});