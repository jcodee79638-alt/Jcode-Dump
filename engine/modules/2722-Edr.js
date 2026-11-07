
var Edr = Ie(function (BDt) {
  Object.defineProperty(BDt, "__esModule", { value: !0 });
  BDt.FulcioSigner = BDt.DEFAULT_FULCIO_URL = void 0;
  var uui = Aui();
  Object.defineProperty(BDt, "DEFAULT_FULCIO_URL", {
    enumerable: !0,
    get: function () {
      return uui.DEFAULT_FULCIO_URL;
    },
  });
  Object.defineProperty(BDt, "FulcioSigner", {
    enumerable: !0,
    get: function () {
      return uui.FulcioSigner;
    },
  });
});