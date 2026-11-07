
var gVn = Ie(function (LVn) {
  Object.defineProperty(LVn, "__esModule", { value: !0 });
  LVn.diagLogLevelFromString = void 0;
  var eT = kf(),
    hVn = {
      ALL: eT.DiagLogLevel.ALL,
      VERBOSE: eT.DiagLogLevel.VERBOSE,
      DEBUG: eT.DiagLogLevel.DEBUG,
      INFO: eT.DiagLogLevel.INFO,
      WARN: eT.DiagLogLevel.WARN,
      ERROR: eT.DiagLogLevel.ERROR,
      NONE: eT.DiagLogLevel.NONE,
    };
  function Mvo(e) {
    if (e == null) return;
    let t = hVn[e.toUpperCase()];
    if (t == null)
      return (
        eT.diag.warn(`Unknown log level "${e}", expected one of ${Object.keys(hVn)}, using default`),
        eT.DiagLogLevel.INFO
      );
    return t;
  }
  LVn.diagLogLevelFromString = Mvo;
});