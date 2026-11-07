
var hoi = Ie(function (f8) {
  var a4o =
      (f8 && f8.__createBinding) ||
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
    H4o =
      (f8 && f8.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    c4o =
      (f8 && f8.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) a4o(t, e, r);
        }
        return (H4o(t, e), t);
      };
  Object.defineProperty(f8, "__esModule", { value: !0 });
  f8.ADDRESS_BOUNDARY = void 0;
  f8.groupPossibilities = FIt;
  f8.padGroup = NIt;
  f8.simpleRegularExpression = u4o;
  f8.possibleElisions = l4o;
  var A4o = c4o(fpr());
  function FIt(e) {
    return `(${e.join("|")})`;
  }
  function NIt(e) {
    if (e.length < 4) return `0{0,${4 - e.length}}${e}`;
    return e;
  }
  f8.ADDRESS_BOUNDARY = "[^A-Fa-f0-9:]";
  function u4o(e) {
    let t = [];
    e.forEach((s, a) => {
      if (parseInt(s, 16) === 0) t.push(a);
    });
    let r = t.map((s) =>
      e
        .map((a, H) => {
          if (H === s) {
            let u = H === 0 || H === A4o.GROUPS - 1 ? ":" : "";
            return FIt([NIt(a), u]);
          }
          return NIt(a);
        })
        .join(":"),
    );
    return (r.push(e.map(NIt).join(":")), FIt(r));
  }
  function l4o(e, t, r) {
    let s = t ? "" : ":",
      a = r ? "" : ":",
      H = [];
    if (!t && !r) H.push("::");
    if (t && r) H.push("");
    if ((r && !t) || (!r && t)) H.push(":");
    (H.push(`${s}(:0{1,4}){1,${e - 1}}`),
      H.push(`(0{1,4}:){1,${e - 1}}${a}`),
      H.push(`(0{1,4}:){${e - 1}}0{1,4}`));
    for (let u = 1; u < e - 1; u++)
      for (let f = 1; f < e - u; f++) H.push(`(0{1,4}:){${f}}:(0{1,4}:){${e - f - u - 1}}0{1,4}`);
    return FIt(H);
  }
});