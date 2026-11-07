
var icr = Ie(function (qOn) {
  Object.defineProperty(qOn, "__esModule", { value: !0 });
  qOn.loggingErrorHandler = void 0;
  var VOn = kf();
  function XLo() {
    return (e) => {
      VOn.diag.error(JLo(e));
    };
  }
  qOn.loggingErrorHandler = XLo;
  function JLo(e) {
    if (typeof e === "string") return e;
    else return JSON.stringify(KLo(e));
  }
  function KLo(e) {
    let t = {},
      r = e;
    while (r !== null)
      (Object.getOwnPropertyNames(r).forEach((s) => {
        if (t[s]) return;
        let a = r[s];
        if (a) t[s] = String(a);
      }),
        (r = Object.getPrototypeOf(r)));
    return t;
  }
});