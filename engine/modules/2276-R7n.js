
var R7n = Ie(function (F7n) {
  Object.defineProperty(F7n, "__esModule", { value: !0 });
  F7n.osDetector = void 0;
  var Ugt = t7e(),
    Ngt = cr("os"),
    U7n = _cr();
  class N7n {
    detect(e) {
      return {
        attributes: {
          [Ugt.ATTR_OS_TYPE]: U7n.normalizeType(Ngt.platform()),
          [Ugt.ATTR_OS_VERSION]: Ngt.release(),
        },
      };
    }
  }
  F7n.osDetector = new N7n();
});