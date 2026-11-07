
var Fce = Ie(function (nGi) {
  Object.defineProperty(nGi, "__esModule", { value: !0 });
  var njr;
  function ijr() {
    if (njr === void 0) throw Error("No runtime abstraction layer installed");
    return njr;
  }
  (function (e) {
    function t(r) {
      if (r === void 0) throw Error("No runtime abstraction layer provided");
      njr = r;
    }
    e.install = t;
  })(ijr || (ijr = {}));
  nGi.default = ijr;
});