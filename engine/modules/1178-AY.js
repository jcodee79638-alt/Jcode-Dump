
var AY = ne(() => {
  Ba();
  L2();
  Hw();
  J_();
  sY();
  Vdt();
  r0 = class e {
    static [Gr] = "SelectionProxyHandler";
    config;
    constructor(t) {
      this.config = { ...t };
    }
    get(t, r) {
      if (r === "_") return { ...t._, selectedFields: new Proxy(t._.selectedFields, this) };
      if (r === Am) return { ...t[Am], selectedFields: new Proxy(t[Am].selectedFields, this) };
      if (typeof r === "symbol") return t[r];
      let s = (vi(t, X_) ? t._.selectedFields : vi(t, xy) ? t[Am].selectedFields : t)[r];
      if (vi(s, pH.Aliased)) {
        if (this.config.sqlAliasedBehavior === "sql" && !s.isSelectionField) return s.sql;
        let a = s.clone();
        return ((a.isSelectionField = !0), (a.origin = this.config.alias), a);
      }
      if (vi(s, pH)) {
        if (this.config.sqlBehavior === "sql") return s;
        throw Error(
          `You tried to reference "${r}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`,
        );
      }
      if (vi(s, Kl)) {
        if (this.config.alias)
          return new Proxy(
            s,
            new HMe(
              new Proxy(s.table, new Wdt(this.config.alias, this.config.replaceOriginalName ?? !1, !0)),
              !0,
            ),
          );
        return s;
      }
      if (typeof s !== "object" || s === null) return s;
      return new Proxy(s, new e(this.config));
    }
  };
});