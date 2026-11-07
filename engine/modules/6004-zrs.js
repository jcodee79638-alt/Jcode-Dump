
var zrs = Ie(function (BBA, gkt) {
  function Brs(e) {
    return Array.isArray(e) ? e : [e];
  }
  var uoH = void 0,
    xwr = "",
    Nrs = " ",
    Mwr = "\\",
    loH = /^\s+$/,
    foH = /(?:[^\\]|^)\\$/,
    poH = /^\\!/,
    doH = /^\\#/,
    moH = /\r?\n/g,
    _oH = /^\.{0,2}\/|^\.{1,2}$/,
    hoH = /\/$/,
    Zwe = "/",
    Rrs = "node-ignore";
  if (typeof Symbol < "u") Rrs = Symbol.for("node-ignore");
  var Wrs = Rrs,
    eke = (e, t, r) => (Object.defineProperty(e, t, { value: r }), r),
    LoH = /([0-z])-([0-z])/g,
    Vrs = () => !1,
    $oH = (e) => e.replace(LoH, (t, r, s) => (r.charCodeAt(0) <= s.charCodeAt(0) ? t : xwr)),
    goH = (e) => {
      let { length: t } = e;
      return e.slice(0, t - (t % 2));
    },
    EoH = [
      [/^\uFEFF/, () => xwr],
      [/((?:\\\\)*?)(\\?\s+)$/, (e, t, r) => t + (r.indexOf("\\") === 0 ? Nrs : xwr)],
      [
        /(\\+?)\s/g,
        (e, t) => {
          let { length: r } = t;
          return t.slice(0, r - (r % 2)) + Nrs;
        },
      ],
      [/[\\$.|*+(){^]/g, (e) => `\\${e}`],
      [/(?!\\)\?/g, () => "[^/]"],
      [/^\//, () => "^"],
      [/\//g, () => "\\/"],
      [/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"],
      [
        /^(?=[^^])/,
        function () {
          return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
        },
      ],
      [/\\\/\\\*\\\*(?=\\\/|$)/g, (e, t, r) => (t + 6 < r.length ? "(?:\\/[^\\/]+)*" : "\\/.+")],
      [
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        (e, t, r) => {
          let s = r.replace(/\\\*/g, "[^\\/]*");
          return t + s;
        },
      ],
      [/\\\\\\(?=[$.|*+(){^])/g, () => Mwr],
      [/\\\\/g, () => Mwr],
      [
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (e, t, r, s, a) =>
          t === Mwr
            ? `\\[${r}${goH(s)}${a}`
            : a === "]"
              ? s.length % 2 === 0
                ? `[${$oH(r)}${s}]`
                : "[]"
              : "[]",
      ],
      [/(?:[^*])$/, (e) => (/\/$/.test(e) ? `${e}$` : `${e}(?=$|\\/$)`)],
    ],
    IoH = /(^|\\\/)?\\\*$/,
    pYe = "regex",
    Lkt = "checkRegex",
    Frs = "_",
    DoH = {
      [pYe](e, t) {
        return `${t ? `${t}[^/]+` : "[^/]*"}(?=$|\\/$)`;
      },
      [Lkt](e, t) {
        return `${t ? `${t}[^/]*` : "[^/]*"}(?=$|\\/$)`;
      },
    },
    yoH = (e) => EoH.reduce((t, [r, s]) => t.replace(r, s.bind(e)), e),
    $kt = (e) => typeof e === "string",
    MoH = (e) => e && $kt(e) && !loH.test(e) && !foH.test(e) && e.indexOf("#") !== 0,
    xoH = (e) => e.split(moH).filter(Boolean);
  class qrs {
    constructor(e, t, r, s, a, H) {
      ((this.pattern = e),
        (this.mark = t),
        (this.negative = a),
        eke(this, "body", r),
        eke(this, "ignoreCase", s),
        eke(this, "regexPrefix", H));
    }
    get regex() {
      let e = Frs + pYe;
      if (this[e]) return this[e];
      return this._make(pYe, e);
    }
    get checkRegex() {
      let e = Frs + Lkt;
      if (this[e]) return this[e];
      return this._make(Lkt, e);
    }
    _make(e, t) {
      let r = this.regexPrefix.replace(IoH, DoH[e]),
        s = this.ignoreCase ? new RegExp(r, "i") : new RegExp(r);
      return eke(this, t, s);
    }
  }
  var SoH = ({ pattern: e, mark: t }, r) => {
    let s = !1,
      a = e;
    if (a.indexOf("!") === 0) ((s = !0), (a = a.substr(1)));
    a = a.replace(poH, "!").replace(doH, "#");
    let H = yoH(a);
    return new qrs(e, t, a, r, s, H);
  };
  class Grs {
    constructor(e) {
      ((this._ignoreCase = e), (this._rules = []));
    }
    _add(e) {
      if (e && e[Wrs]) {
        ((this._rules = this._rules.concat(e._rules._rules)), (this._added = !0));
        return;
      }
      if ($kt(e)) e = { pattern: e };
      if (MoH(e.pattern)) {
        let t = SoH(e, this._ignoreCase);
        ((this._added = !0), this._rules.push(t));
      }
    }
    add(e) {
      return ((this._added = !1), Brs($kt(e) ? xoH(e) : e).forEach(this._add, this), this._added);
    }
    test(e, t, r) {
      let s = !1,
        a = !1,
        H;
      this._rules.forEach((f) => {
        let { negative: d } = f;
        if ((a === d && s !== a) || (d && !s && !a && !t)) return;
        if (!f[r].test(e)) return;
        ((s = !d), (a = d), (H = d ? uoH : f));
      });
      let u = { ignored: s, unignored: a };
      if (H) u.rule = H;
      return u;
    }
  }
  var ToH = (e, t) => {
      throw new t(e);
    },
    ote = (e, t, r) => {
      if (!$kt(e)) return r(`path must be a string, but got \`${t}\``, TypeError);
      if (!e) return r("path must not be empty", TypeError);
      if (ote.isNotRelative(e))
        return r(`path should be a \`path.relative()\`d string, but got "${t}"`, RangeError);
      return !0;
    },
    Xrs = (e) => _oH.test(e);
  ote.isNotRelative = Xrs;
  ote.convert = (e) => e;
  class Jrs {
    constructor({ ignorecase: e = !0, ignoreCase: t = e, allowRelativePaths: r = !1 } = {}) {
      (eke(this, Wrs, !0), (this._rules = new Grs(t)), (this._strictPathCheck = !r), this._initCache());
    }
    _initCache() {
      ((this._ignoreCache = Object.create(null)), (this._testCache = Object.create(null)));
    }
    add(e) {
      if (this._rules.add(e)) this._initCache();
      return this;
    }
    addPattern(e) {
      return this.add(e);
    }
    _test(e, t, r, s) {
      let a = e && ote.convert(e);
      return (ote(a, e, this._strictPathCheck ? ToH : Vrs), this._t(a, t, r, s));
    }
    checkIgnore(e) {
      if (!hoH.test(e)) return this.test(e);
      let t = e.split(Zwe).filter(Boolean);
      if ((t.pop(), t.length)) {
        let r = this._t(t.join(Zwe) + Zwe, this._testCache, !0, t);
        if (r.ignored) return r;
      }
      return this._rules.test(e, !1, Lkt);
    }
    _t(e, t, r, s) {
      if (e in t) return t[e];
      if (!s) s = e.split(Zwe).filter(Boolean);
      if ((s.pop(), !s.length)) return (t[e] = this._rules.test(e, r, pYe));
      let a = this._t(s.join(Zwe) + Zwe, t, r, s);
      return (t[e] = a.ignored ? a : this._rules.test(e, r, pYe));
    }
    ignores(e) {
      return this._test(e, this._ignoreCache, !1).ignored;
    }
    createFilter() {
      return (e) => !this.ignores(e);
    }
    filter(e) {
      return Brs(e).filter(this.createFilter());
    }
    test(e) {
      return this._test(e, this._testCache, !0);
    }
  }
  var Swr = (e) => new Jrs(e),
    voH = (e) => ote(e && ote.convert(e), e, Vrs),
    Krs = () => {
      let e = (r) => (/^\\\\\?\\/.test(r) || /["<>|\u0000-\u001F]+/u.test(r) ? r : r.replace(/\\/g, "/"));
      ote.convert = e;
      let t = /^[a-z]:\//i;
      ote.isNotRelative = (r) => t.test(r) || Xrs(r);
    };
  if (typeof process < "u") Krs();
  gkt.exports = Swr;
  Swr.default = Swr;
  gkt.exports.isPathValid = voH;
  eke(gkt.exports, Symbol.for("setupWindows"), Krs);
});
import x$e from "path";