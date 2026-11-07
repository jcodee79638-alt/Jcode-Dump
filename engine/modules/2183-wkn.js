
var wkn = Ie(function (Pkn) {
  Object.defineProperty(Pkn, "__esModule", { value: !0 });
  Pkn.DiagConsoleLogger = void 0;
  var pHr = [
    { n: "error", c: "error" },
    { n: "warn", c: "warn" },
    { n: "info", c: "info" },
    { n: "debug", c: "debug" },
    { n: "verbose", c: "trace" },
  ];
  class jkn {
    constructor() {
      function e(t) {
        return function (...r) {
          if (console) {
            let s = console[t];
            if (typeof s !== "function") s = console.log;
            if (typeof s === "function") return s.apply(console, r);
          }
        };
      }
      for (let t = 0; t < pHr.length; t++) this[pHr[t].n] = e(pHr[t].c);
    }
  }
  Pkn.DiagConsoleLogger = jkn;
});