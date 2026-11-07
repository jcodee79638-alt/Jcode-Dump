
var iLi = Ie(function (XV) {
  var coa =
      (XV && XV.__createBinding) ||
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
    Aoa =
      (XV && XV.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    uoa =
      (XV && XV.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") coa(r, t, s[a]);
          }
          return (Aoa(r, t), r);
        };
      })(),
    jve,
    $g;
  Object.defineProperty(XV, "__esModule", { value: !0 });
  XV.FIELDS = void 0;
  XV.default = moa;
  var uc = uoa(k_r()),
    loa =
      ((jve = {}), (jve[uc.tab] = !0), (jve[uc.newline] = !0), (jve[uc.cr] = !0), (jve[uc.feed] = !0), jve),
    foa =
      (($g = {}),
      ($g[uc.space] = !0),
      ($g[uc.tab] = !0),
      ($g[uc.newline] = !0),
      ($g[uc.cr] = !0),
      ($g[uc.feed] = !0),
      ($g[uc.ampersand] = !0),
      ($g[uc.asterisk] = !0),
      ($g[uc.bang] = !0),
      ($g[uc.comma] = !0),
      ($g[uc.colon] = !0),
      ($g[uc.semicolon] = !0),
      ($g[uc.openParenthesis] = !0),
      ($g[uc.closeParenthesis] = !0),
      ($g[uc.openSquare] = !0),
      ($g[uc.closeSquare] = !0),
      ($g[uc.singleQuote] = !0),
      ($g[uc.doubleQuote] = !0),
      ($g[uc.plus] = !0),
      ($g[uc.pipe] = !0),
      ($g[uc.tilde] = !0),
      ($g[uc.greaterThan] = !0),
      ($g[uc.equals] = !0),
      ($g[uc.dollar] = !0),
      ($g[uc.caret] = !0),
      ($g[uc.slash] = !0),
      $g),
    O_r = {},
    nLi = "0123456789abcdefABCDEF";
  for (Lqe = 0; Lqe < nLi.length; Lqe++) O_r[nLi.charCodeAt(Lqe)] = !0;
  var Lqe;
  function poa(e, t) {
    var r = t,
      s;
    do
      if (((s = e.charCodeAt(r)), foa[s])) return r - 1;
      else if (s === uc.backslash) r = doa(e, r) + 1;
      else r++;
    while (r < e.length);
    return r - 1;
  }
  function doa(e, t) {
    var r = t,
      s = e.charCodeAt(r + 1);
    if (loa[s]);
    else if (O_r[s]) {
      var a = 0;
      do (r++, a++, (s = e.charCodeAt(r + 1)));
      while (O_r[s] && a < 6);
      if (a < 6 && s === uc.space) r++;
    } else r++;
    return r;
  }
  XV.FIELDS = { TYPE: 0, START_LINE: 1, START_COL: 2, END_LINE: 3, END_COL: 4, START_POS: 5, END_POS: 6 };
  function moa(e) {
    var t = [],
      r = e.css.valueOf(),
      s = r.length,
      a = -1,
      H = 1,
      u = 0,
      f = 0,
      d,
      _,
      L,
      I,
      D,
      S,
      T,
      C,
      O,
      B,
      V,
      q,
      Z;
    function se(ae, z) {
      if (e.safe) ((r += z), (O = r.length - 1));
      else throw e.error("Unclosed " + ae, H, u - a, u);
    }
    while (u < s) {
      if (((d = r.charCodeAt(u)), d === uc.newline)) ((a = u), (H += 1));
      switch (d) {
        case uc.space:
        case uc.tab:
        case uc.newline:
        case uc.cr:
        case uc.feed:
          O = u;
          do if (((O += 1), (d = r.charCodeAt(O)), d === uc.newline)) ((a = O), (H += 1));
          while (d === uc.space || d === uc.newline || d === uc.tab || d === uc.cr || d === uc.feed);
          ((Z = uc.space), (I = H), (L = O - a - 1), (f = O));
          break;
        case uc.plus:
        case uc.greaterThan:
        case uc.tilde:
        case uc.pipe:
          O = u;
          do ((O += 1), (d = r.charCodeAt(O)));
          while (d === uc.plus || d === uc.greaterThan || d === uc.tilde || d === uc.pipe);
          ((Z = uc.combinator), (I = H), (L = u - a), (f = O));
          break;
        case uc.asterisk:
        case uc.ampersand:
        case uc.bang:
        case uc.comma:
        case uc.equals:
        case uc.dollar:
        case uc.caret:
        case uc.openSquare:
        case uc.closeSquare:
        case uc.colon:
        case uc.semicolon:
        case uc.openParenthesis:
        case uc.closeParenthesis:
          ((O = u), (Z = d), (I = H), (L = u - a), (f = O + 1));
          break;
        case uc.singleQuote:
        case uc.doubleQuote:
          ((q = d === uc.singleQuote ? "'" : '"'), (O = u));
          do {
            if (((D = !1), (O = r.indexOf(q, O + 1)), O === -1)) se("quote", q);
            S = O;
            while (r.charCodeAt(S - 1) === uc.backslash) ((S -= 1), (D = !D));
          } while (D);
          ((Z = uc.str), (I = H), (L = u - a), (f = O + 1));
          break;
        default:
          if (d === uc.slash && r.charCodeAt(u + 1) === uc.asterisk) {
            if (((O = r.indexOf("*/", u + 2) + 1), O === 0)) se("comment", "*/");
            if (
              ((_ = r.slice(u, O + 1)),
              (C = _.split(`
`)),
              (T = C.length - 1),
              T > 0)
            )
              ((B = H + T), (V = O - C[T].length));
            else ((B = H), (V = a));
            ((Z = uc.comment), (H = B), (I = B), (L = O - V));
          } else if (d === uc.slash) ((O = u), (Z = d), (I = H), (L = u - a), (f = O + 1));
          else ((O = poa(r, u)), (Z = uc.word), (I = H), (L = O - a));
          f = O + 1;
          break;
      }
      if ((t.push([Z, H, u - a, I, L, u, f]), V)) ((a = V), (V = null));
      u = f;
    }
    return t;
  }
});