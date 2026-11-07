
var MEn = ne(() => {
  mEn();
  ((eKs = /^https?:\/\/.*?\//), (Inr = /(\/:[^/()]*?)\?(\/?)/));
  ynr = class ynr extends Dnr {
    staticChildren = {};
    findStaticMatchingChild(e, t) {
      let r = this.staticChildren[e.charAt(t)];
      if (r === void 0 || !r.matchPrefix(e, t)) return;
      return r;
    }
    getStaticChild(e, t = 0) {
      if (e.length === t) return this;
      let r = this.findStaticMatchingChild(e, t);
      if (r === void 0) return;
      return r.getStaticChild(e, t + r.prefix.length);
    }
    createStaticChild(e) {
      if (e.length === 0) return this;
      let t = this.staticChildren[e.charAt(0)];
      if (t) {
        let s = 1;
        for (; s < t.prefix.length; s++)
          if (e.charCodeAt(s) !== t.prefix.charCodeAt(s)) {
            t = t.split(this, s);
            break;
          }
        return t.createStaticChild(e.slice(s));
      }
      let r = e.charAt(0);
      return ((this.staticChildren[r] = new Z3e(e)), this.staticChildren[r]);
    }
  };
  Z3e = class Z3e extends ynr {
    _tag = "StaticNode";
    constructor(e) {
      super();
      this.setPrefix(e);
    }
    prefix;
    matchPrefix;
    parametricChildren = [];
    wildcardChild;
    setPrefix(e) {
      if (((this.prefix = e), e.length === 1)) this.matchPrefix = (t, r) => !0;
      else {
        let t = e.length;
        this.matchPrefix = function (r, s) {
          for (let a = 1; a < t; a++) if (r.charCodeAt(s + a) !== this.prefix.charCodeAt(a)) return !1;
          return !0;
        };
      }
    }
    getParametricChild(e) {
      if (e === void 0) return this.parametricChildren.find((r) => r.isRegex === !1);
      let t = e.source;
      return this.parametricChildren.find((r) => {
        if (r.regex === void 0) return !1;
        return r.regex.source === t;
      });
    }
    createParametricChild(e, t, r) {
      let s = this.getParametricChild(e);
      if (s !== void 0) return (s.nodePaths.add(r), s);
      return (
        (s = new IEn(e, t, r)),
        this.parametricChildren.push(s),
        this.parametricChildren.sort((a, H) => {
          if (!a.isRegex) return 1;
          if (!H.isRegex) return -1;
          if (a.staticSuffix === void 0) return 1;
          if (H.staticSuffix === void 0) return -1;
          if (H.staticSuffix.endsWith(a.staticSuffix)) return 1;
          if (a.staticSuffix.endsWith(H.staticSuffix)) return -1;
          return 0;
        }),
        s
      );
    }
    createWildcardChild() {
      if (this.wildcardChild === void 0) this.wildcardChild = new DEn();
      return this.wildcardChild;
    }
    split(e, t) {
      let r = this.prefix.slice(0, t),
        s = this.prefix.slice(t);
      this.setPrefix(s);
      let a = new Z3e(r);
      return ((a.staticChildren[s.charAt(0)] = this), (e.staticChildren[r.charAt(0)] = a), a);
    }
    getNextNode(e, t, r, s) {
      let a = this.findStaticMatchingChild(e, t),
        H = 0;
      if (a === void 0) {
        if (this.parametricChildren.length === 0) return this.wildcardChild;
        ((a = this.parametricChildren[0]), (H = 1));
      }
      if (this.wildcardChild !== void 0)
        r.push({ paramsCount: s, brotherPathIndex: t, brotherNode: this.wildcardChild });
      for (let u = this.parametricChildren.length - 1; u >= H; u--)
        r.push({ paramsCount: s, brotherPathIndex: t, brotherNode: this.parametricChildren[u] });
      return a;
    }
  };
  IEn = class IEn extends ynr {
    regex;
    staticSuffix;
    _tag = "ParametricNode";
    constructor(e, t, r) {
      super();
      ((this.regex = e), (this.staticSuffix = t), (this.isRegex = !!e), (this.nodePaths = new Set([r])));
    }
    isRegex;
    nodePaths;
    getNextNode(e, t) {
      return this.findStaticMatchingChild(e, t);
    }
  };
  DEn = class DEn extends Dnr {
    _tag = "WildcardNode";
    getNextNode(e, t, r, s) {
      return;
    }
  };
  aKs = [
    "ACL",
    "BIND",
    "CHECKOUT",
    "CONNECT",
    "COPY",
    "DELETE",
    "GET",
    "HEAD",
    "LINK",
    "LOCK",
    "M-SEARCH",
    "MERGE",
    "MKACTIVITY",
    "MKCALENDAR",
    "MKCOL",
    "MOVE",
    "NOTIFY",
    "OPTIONS",
    "PATCH",
    "POST",
    "PROPFIND",
    "PROPPATCH",
    "PURGE",
    "PUT",
    "REBIND",
    "REPORT",
    "SEARCH",
    "SOURCE",
    "SUBSCRIBE",
    "TRACE",
    "UNBIND",
    "UNLINK",
    "UNLOCK",
    "UNSUBSCRIBE",
  ];
});