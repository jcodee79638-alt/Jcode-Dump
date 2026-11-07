
var Vdt = ne(() => {
  Ba();
  _tr();
  L2();
  Hw();
  Fj();
  J_();
  sY();
  ((HMe = class {
    static [Gr] = "ColumnTableAliasProxyHandler";
    constructor(e, t) {
      ((this.table = e), (this.ignoreColumnAlias = t));
    }
    get(e, t) {
      if (t === "table") return this.table;
      if (t === "isAlias" && this.ignoreColumnAlias) return !1;
      return e[t];
    }
  }),
    (N_n = class {
      static [Gr] = "ViewSelectionAliasProxyHandler";
      constructor(e, t, r) {
        ((this.view = e), (this.selection = t), (this.ignoreColumnAlias = r));
      }
      get(e, t) {
        let r = e[t];
        if (vi(r, Kl)) return new Proxy(r, new HMe(this.view, this.ignoreColumnAlias));
        if (vi(r, X_) || vi(r, pH) || vi(r, pH.Aliased) || oY(r) || typeof r !== "object" || r === null)
          return r;
        return new Proxy(r, this);
      }
    }),
    (Wdt = class {
      static [Gr] = "TableAliasProxyHandler";
      constructor(e, t, r) {
        ((this.alias = e), (this.replaceOriginalName = t), (this.ignoreColumnAlias = r));
      }
      get(e, t) {
        if (t === TH.Symbol.IsAlias) return !0;
        if (t === TH.Symbol.Name) return this.alias;
        if (this.replaceOriginalName && t === TH.Symbol.OriginalName) return this.alias;
        if (t === Am)
          return {
            ...e[Am],
            name: this.alias,
            isAlias: !0,
            selectedFields: new Proxy(
              e[Am].selectedFields,
              new N_n(new Proxy(e, this), e[Am].selectedFields, this.ignoreColumnAlias),
            ),
          };
        if (t === TH.Symbol.Columns) {
          let s = e[TH.Symbol.Columns];
          if (!s) return s;
          if (vi(e, xy))
            return new Proxy(
              e[TH.Symbol.Columns],
              new N_n(new Proxy(e, this), e[TH.Symbol.Columns], this.ignoreColumnAlias),
            );
          let a = {};
          return (
            Object.keys(s).map((H) => {
              a[H] = new Proxy(s[H], new HMe(new Proxy(e, this), this.ignoreColumnAlias));
            }),
            a
          );
        }
        let r = e[t];
        if (vi(r, Kl)) return new Proxy(r, new HMe(new Proxy(e, this), this.ignoreColumnAlias));
        return r;
      }
    }),
    (tqs = class {
      static [Gr] = "ColumnAliasProxyHandler";
      constructor(e) {
        this.alias = e;
      }
      get(e, t) {
        if (t === "isAlias") return !0;
        if (t === "name") return this.alias;
        if (t === "keyAsName") return !1;
        if (t === c3e) return () => e;
        return e[t];
      }
    }));
  Kl.prototype.as = function (e) {
    return rqs(this, e);
  };
});