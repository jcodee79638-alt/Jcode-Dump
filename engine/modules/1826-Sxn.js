
var Sxn = Ie(function (eme) {
  var Wsr = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    gro = Wsr((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.sync = e.isexe = void 0));
      var t = cr("fs"),
        r = cr("fs/promises"),
        s = async (f, d = {}) => {
          let { ignoreErrors: _ = !1 } = d;
          try {
            return H(await (0, r.stat)(f), d);
          } catch (L) {
            let I = L;
            if (_ || I.code === "EACCES") return !1;
            throw I;
          }
        };
      e.isexe = s;
      var a = (f, d = {}) => {
        let { ignoreErrors: _ = !1 } = d;
        try {
          return H((0, t.statSync)(f), d);
        } catch (L) {
          let I = L;
          if (_ || I.code === "EACCES") return !1;
          throw I;
        }
      };
      e.sync = a;
      var H = (f, d) => f.isFile() && u(f, d),
        u = (f, d) => {
          let _ = d.uid ?? process.getuid?.(),
            L = d.groups ?? process.getgroups?.() ?? [],
            I = d.gid ?? process.getgid?.() ?? L[0];
          if (_ === void 0 || I === void 0) throw Error("cannot get uid or gid");
          let D = new Set([I, ...L]),
            { mode: S, uid: T, gid: C } = f,
            O = parseInt("100", 8),
            B = parseInt("010", 8),
            V = parseInt("001", 8),
            q = O | B;
          return !!(S & V || (S & B && D.has(C)) || (S & O && T === _) || (S & q && _ === 0));
        };
    }),
    Ero = Wsr((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.sync = e.isexe = void 0));
      var t = cr("fs"),
        r = cr("fs/promises"),
        s = cr("path"),
        a = async (d, _ = {}) => {
          let { ignoreErrors: L = !1 } = _;
          try {
            return f(await (0, r.stat)(d), d, _);
          } catch (I) {
            let D = I;
            if (L || D.code === "EACCES") return !1;
            throw D;
          }
        };
      e.isexe = a;
      var H = (d, _ = {}) => {
        let { ignoreErrors: L = !1 } = _;
        try {
          return f((0, t.statSync)(d), d, _);
        } catch (I) {
          let D = I;
          if (L || D.code === "EACCES") return !1;
          throw D;
        }
      };
      e.sync = H;
      var u = (d, _) => {
          let { pathExt: L = process.env.PATHEXT || "" } = _,
            I = L.split(s.delimiter);
          if (I.indexOf("") !== -1) return !0;
          for (let D of I) {
            let S = D.toLowerCase(),
              T = d.substring(d.length - S.length).toLowerCase();
            if (S && T === S) return !0;
          }
          return !1;
        },
        f = (d, _, L) => d.isFile() && u(_, L);
    }),
    Iro = Wsr((e) => {
      Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    Exn =
      (eme && eme.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            s === void 0 && (s = r);
            var a = Object.getOwnPropertyDescriptor(t, r);
            ((!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) &&
              (a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              }),
              Object.defineProperty(e, s, a));
          }
        : function (e, t, r, s) {
            (s === void 0 && (s = r), (e[s] = t[r]));
          }),
    Dro =
      (eme && eme.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Ixn =
      (eme && eme.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (s[s.length] = a);
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) for (var s = e(t), a = 0; a < s.length; a++) s[a] !== "default" && Exn(r, t, s[a]);
          return (Dro(r, t), r);
        };
      })(),
    yro =
      (eme && eme.__exportStar) ||
      function (e, t) {
        for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && Exn(t, e, r);
      };
  Object.defineProperty(eme, "__esModule", { value: !0 });
  eme.sync = eme.isexe = eme.posix = eme.win32 = void 0;
  var Dxn = Ixn(gro());
  eme.posix = Dxn;
  var yxn = Ixn(Ero());
  eme.win32 = yxn;
  yro(Iro(), eme);
  var Mro = process.env._ISEXE_TEST_PLATFORM_ || "win32",
    Mxn = Mro === "win32" ? yxn : Dxn;
  eme.isexe = Mxn.isexe;
  eme.sync = Mxn.sync;
});