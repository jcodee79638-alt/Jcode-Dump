
var UXn = Ie(function (kXn) {
  Object.defineProperty(kXn, "__esModule", { value: !0 });
  kXn.convertLegacyHeaders = void 0;
  var wXn = c7e();
  function fCo(e) {
    if (typeof e.headers === "function") return e.headers;
    return wXn.wrapStaticHeadersInFunction(e.headers);
  }
  kXn.convertLegacyHeaders = fCo;
});