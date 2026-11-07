
var Hae = Ie(function (CD) {
  var $Jo =
      (CD && CD.__createBinding) ||
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
    gJo =
      (CD && CD.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    pAi =
      (CD && CD.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") $Jo(r, t, s[a]);
          }
          return (gJo(r, t), r);
        };
      })();
  Object.defineProperty(CD, "__esModule", { value: !0 });
  CD.ua = CD.oidc = CD.pem = CD.json = CD.encoding = CD.dsse = CD.crypto = void 0;
  var q4e = L8();
  Object.defineProperty(CD, "crypto", {
    enumerable: !0,
    get: function () {
      return q4e.crypto;
    },
  });
  Object.defineProperty(CD, "dsse", {
    enumerable: !0,
    get: function () {
      return q4e.dsse;
    },
  });
  Object.defineProperty(CD, "encoding", {
    enumerable: !0,
    get: function () {
      return q4e.encoding;
    },
  });
  Object.defineProperty(CD, "json", {
    enumerable: !0,
    get: function () {
      return q4e.json;
    },
  });
  Object.defineProperty(CD, "pem", {
    enumerable: !0,
    get: function () {
      return q4e.pem;
    },
  });
  CD.oidc = pAi(AAi());
  CD.ua = pAi(fAi());
});