
var c5n = Ie(function (a5n) {
  Object.defineProperty(a5n, "__esModule", { value: !0 });
  a5n.createLoggingPartialSuccessResponseHandler = void 0;
  var o5n = kf();
  function APo(e) {
    return Object.prototype.hasOwnProperty.call(e, "partialSuccess");
  }
  function uPo() {
    return {
      handleResponse(e) {
        if (e == null || !APo(e) || e.partialSuccess == null || Object.keys(e.partialSuccess).length === 0)
          return;
        o5n.diag.warn("Received Partial Success response:", JSON.stringify(e.partialSuccess));
      },
    };
  }
  a5n.createLoggingPartialSuccessResponseHandler = uPo;
});