
var cpr = Ie(function (noi) {
  Object.defineProperty(noi, "__esModule", { value: !0 });
  noi.shuffleArray = noi.SocksClientError = void 0;
  class roi extends Error {
    constructor(e, t) {
      super(e);
      this.options = t;
    }
  }
  noi.SocksClientError = roi;
  function s7o(e) {
    for (let t = e.length - 1; t > 0; t--) {
      let r = Math.floor(Math.random() * (t + 1));
      [e[t], e[r]] = [e[r], e[t]];
    }
  }
  noi.shuffleArray = s7o;
});