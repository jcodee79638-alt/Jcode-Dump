
var O7n = Ie(function (w7n) {
  Object.defineProperty(w7n, "__esModule", { value: !0 });
  w7n.hostDetector = void 0;
  var nSe = t7e(),
    Ogt = cr("os"),
    j7n = T7n(),
    P7n = _cr();
  class C7n {
    detect(e) {
      return {
        attributes: {
          [nSe.ATTR_HOST_NAME]: Ogt.hostname(),
          [nSe.ATTR_HOST_ARCH]: P7n.normalizeArch(Ogt.arch()),
          [nSe.ATTR_HOST_ID]: j7n.getMachineId(),
        },
      };
    }
  }
  w7n.hostDetector = new C7n();
});