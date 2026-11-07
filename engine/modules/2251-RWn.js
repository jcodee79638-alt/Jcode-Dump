
var RWn = Ie(function (FWn) {
  Object.defineProperty(FWn, "__esModule", { value: !0 });
  FWn.getRPCMetadata = FWn.deleteRPCMetadata = FWn.setRPCMetadata = FWn.RPCType = void 0;
  var NWn = kf(),
    ucr = NWn.createContextKey("OpenTelemetry SDK Context Key RPC_METADATA"),
    UWn;
  (function (e) {
    e.HTTP = "http";
  })(UWn || (FWn.RPCType = UWn = {}));
  function rvo(e, t) {
    return e.setValue(ucr, t);
  }
  FWn.setRPCMetadata = rvo;
  function nvo(e) {
    return e.deleteValue(ucr);
  }
  FWn.deleteRPCMetadata = nvo;
  function ivo(e) {
    return e.getValue(ucr);
  }
  FWn.getRPCMetadata = ivo;
});