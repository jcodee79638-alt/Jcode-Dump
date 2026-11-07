
var nWn = Ie(function (tWn) {
  Object.defineProperty(tWn, "__esModule", { value: !0 });
  tWn.SDK_INFO = void 0;
  var Z3n = aUn(),
    poe = foe(),
    eWn = Y3n();
  tWn.SDK_INFO = {
    [poe.ATTR_TELEMETRY_SDK_NAME]: "opentelemetry",
    [eWn.ATTR_PROCESS_RUNTIME_NAME]: "node",
    [poe.ATTR_TELEMETRY_SDK_LANGUAGE]: poe.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
    [poe.ATTR_TELEMETRY_SDK_VERSION]: Z3n.VERSION,
  };
});