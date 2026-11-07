
var ELi = Ie(function (IZ, gLi) {
  var Eaa =
      (IZ && IZ.__createBinding) ||
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
    Iaa =
      (IZ && IZ.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Daa =
      (IZ && IZ.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) if (Object.prototype.hasOwnProperty.call(r, a)) s[s.length] = a;
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) {
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") Eaa(r, t, s[a]);
          }
          return (Iaa(r, t), r);
        };
      })(),
    yaa =
      (IZ && IZ.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      },
    Maa = yaa(lLi()),
    xaa = Daa($Li()),
    X_r = function (e) {
      return new Maa.default(e);
    };
  Object.assign(X_r, xaa);
  delete X_r.__esModule;
  gLi.exports = X_r;
});