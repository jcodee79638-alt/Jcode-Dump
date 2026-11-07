
var Qyt = Ie(function (tX) {
  var Xea =
      (tX && tX.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    Jea =
      (tX && tX.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Kea =
      (tX && tX.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) Xea(t, e, r);
        }
        return (Jea(t, e), t);
      };
  Object.defineProperty(tX, "__esModule", { value: !0 });
  tX.callLimit = void 0;
  var Dmr = Kea(cr("os")),
    zea =
      "availableParallelism" in Dmr
        ? Math.max(1, Dmr.availableParallelism() - 1)
        : Math.max(1, Dmr.cpus().length - 1),
    Qea = (e, { limit: t = zea, rejectLate: r } = {}) =>
      new Promise((s, a) => {
        let H = 0,
          u = 0,
          f = [],
          d = !1,
          _,
          L = (T) => {
            if (d) return;
            if (((d = !0), (_ ??= T), !r)) a(_);
          },
          I = !1,
          D = () => {
            if (I || H > 0) return;
            ((I = !0), s(f));
          },
          S = () => {
            let T = u++;
            if (T >= e.length) return d ? L() : D();
            H++;
            let C = e[T];
            if (!C) throw Error("walked off queue");
            f[T] = C()
              .then(
                (O) => (H--, (f[T] = O), O),
                (O) => {
                  (H--, L(O));
                },
              )
              .then((O) => {
                if (d && H === 0) return a(_);
                return (S(), O);
              });
          };
        for (let T = 0; T < t; T++) S();
      });
  tX.callLimit = Qea;
});