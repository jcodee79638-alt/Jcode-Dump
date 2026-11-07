
var Adi = Ie(function (cdi) {
  Object.defineProperty(cdi, "__esModule", { value: !0 });
  cdi.getTSATimestamp = RYo;
  cdi.getTLogTimestamp = WYo;
  var Hdi = adi();
  function RYo(e, t, r) {
    return (
      Hdi.verifyRFC3161Timestamp(e, t, r),
      { type: "timestamp-authority", logID: e.signerSerialNumber, timestamp: e.signingTime }
    );
  }
  function WYo(e) {
    if (!e.inclusionPromise) return;
    return {
      type: "transparency-log",
      logID: e.logId.keyId,
      timestamp: new Date(Number(e.integratedTime) * 1000),
    };
  }
});