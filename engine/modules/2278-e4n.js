
var e4n = Ie(function (Y7n) {
  Object.defineProperty(Y7n, "__esModule", { value: !0 });
  Y7n.serviceInstanceIdDetector = void 0;
  var K7n = t7e(),
    z7n = cr("crypto");
  class Q7n {
    detect(e) {
      return { attributes: { [K7n.ATTR_SERVICE_INSTANCE_ID]: z7n.randomUUID() } };
    }
  }
  Y7n.serviceInstanceIdDetector = new Q7n();
});