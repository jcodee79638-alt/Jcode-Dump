
var pkn = Ie(function (lkn) {
  Object.defineProperty(lkn, "__esModule", { value: !0 });
  lkn.createLogLevelDiagLogger = void 0;
  var ZS = z$t();
  function Q_o(e, t) {
    if (e < ZS.DiagLogLevel.NONE) e = ZS.DiagLogLevel.NONE;
    else if (e > ZS.DiagLogLevel.ALL) e = ZS.DiagLogLevel.ALL;
    t = t || {};
    function r(s, a) {
      let H = t[s];
      if (typeof H === "function" && e >= a) return H.bind(t);
      return function () {};
    }
    return {
      error: r("error", ZS.DiagLogLevel.ERROR),
      warn: r("warn", ZS.DiagLogLevel.WARN),
      info: r("info", ZS.DiagLogLevel.INFO),
      debug: r("debug", ZS.DiagLogLevel.DEBUG),
      verbose: r("verbose", ZS.DiagLogLevel.VERBOSE),
    };
  }
  lkn.createLogLevelDiagLogger = Q_o;
});