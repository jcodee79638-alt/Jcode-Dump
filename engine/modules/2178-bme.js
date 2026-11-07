
var bme = Ie(function (_kn) {
  Object.defineProperty(_kn, "__esModule", { value: !0 });
  _kn.DiagAPI = void 0;
  var dkn = Akn(),
    mkn = pkn(),
    Q$t = z$t(),
    Aoe = vme(),
    Y_o = "diag";
  class lHr {
    constructor() {
      function e(s) {
        return function (...a) {
          let H = Aoe.getGlobal("diag");
          if (!H) return;
          return H[s](...a);
        };
      }
      let t = this,
        r = (s, a = { logLevel: Q$t.DiagLogLevel.INFO }) => {
          var H, u, f;
          if (s === t) {
            let L = Error(
              "Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation",
            );
            return (t.error((H = L.stack) !== null && H !== void 0 ? H : L.message), !1);
          }
          if (typeof a === "number") a = { logLevel: a };
          let d = Aoe.getGlobal("diag"),
            _ = mkn.createLogLevelDiagLogger(
              (u = a.logLevel) !== null && u !== void 0 ? u : Q$t.DiagLogLevel.INFO,
              s,
            );
          if (d && !a.suppressOverrideMessage) {
            let L = (f = Error().stack) !== null && f !== void 0 ? f : "<failed to generate stacktrace>";
            (d.warn(`Current logger will be overwritten from ${L}`),
              _.warn(`Current logger will overwrite one already registered from ${L}`));
          }
          return Aoe.registerGlobal("diag", _, t, !0);
        };
      ((t.setLogger = r),
        (t.disable = () => {
          Aoe.unregisterGlobal(Y_o, t);
        }),
        (t.createComponentLogger = (s) => new dkn.DiagComponentLogger(s)),
        (t.verbose = e("verbose")),
        (t.debug = e("debug")),
        (t.info = e("info")),
        (t.warn = e("warn")),
        (t.error = e("error")));
    }
    static instance() {
      if (!this._instance) this._instance = new lHr();
      return this._instance;
    }
  }
  _kn.DiagAPI = lHr;
});