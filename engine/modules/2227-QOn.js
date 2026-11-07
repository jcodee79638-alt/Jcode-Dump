
var QOn = Ie(function (KOn) {
  Object.defineProperty(KOn, "__esModule", { value: !0 });
  KOn.globalErrorHandler = KOn.setGlobalErrorHandler = void 0;
  var XOn = icr(),
    JOn = XOn.loggingErrorHandler();
  function zLo(e) {
    JOn = e;
  }
  KOn.setGlobalErrorHandler = zLo;
  function QLo(e) {
    try {
      JOn(e);
    } catch {}
  }
  KOn.globalErrorHandler = QLo;
});