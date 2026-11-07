
var pcr = Ie(function (jVn) {
  Object.defineProperty(jVn, "__esModule", { value: !0 });
  jVn._clearDefaultServiceNameCache = jVn.defaultServiceName = void 0;
  var ZVe;
  function Fvo() {
    if (ZVe === void 0)
      try {
        let e = globalThis.process.argv0;
        ZVe = e ? `unknown_service:${e}` : "unknown_service";
      } catch {
        ZVe = "unknown_service";
      }
    return ZVe;
  }
  jVn.defaultServiceName = Fvo;
  function Bvo() {
    ZVe = void 0;
  }
  jVn._clearDefaultServiceNameCache = Bvo;
});