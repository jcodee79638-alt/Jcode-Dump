
var J_ = ne(() => {
  L2();
  Fj();
  Ba();
  Hw();
  A3e();
  bdn();
  sY();
  ((y1 = class {
    static [Gr] = "StringChunk";
    value;
    constructor(e) {
      this.value = Array.isArray(e) ? e : [e];
    }
    getSQL() {
      return new pH([this]);
    }
  }),
    (pH = class e {
      static [Gr] = "SQL";
      decoder = lse;
      shouldInlineParams = !1;
      usedTables = [];
      constructor(t) {
        this.queryChunks = t;
        for (let r of t)
          if (vi(r, TH)) {
            let s = r[TH.Symbol.Schema];
            this.usedTables.push(s === void 0 ? r[TH.Symbol.Name] : s + "." + r[TH.Symbol.Name]);
          }
      }
      append(t) {
        return (this.queryChunks.push(...t.queryChunks), this);
      }
      toQuery(t) {
        return vdn.startActiveSpan("drizzle.buildSQL", (r) => {
          let s = this.buildQueryFromSourceParams(this.queryChunks, t);
          return (
            r?.setAttributes({
              "drizzle.query.text": s.sql,
              "drizzle.query.params": JSON.stringify(s.params),
            }),
            s
          );
        });
      }
      buildQueryFromSourceParams(t, r) {
        let s = Object.assign({}, r, {
            inlineParams: r.inlineParams || this.shouldInlineParams,
            paramStartIndex: r.paramStartIndex || { value: 0 },
          }),
          {
            escapeName: a,
            escapeParam: H,
            codecs: u,
            inlineParams: f,
            paramStartIndex: d,
            invokeSource: _,
          } = s,
          L = t.map((I) => {
            if (vi(I, y1)) return { sql: I.value.join(""), params: [] };
            if (vi(I, u3e)) return { sql: a(I.value), params: [] };
            if (I === void 0) return { sql: "", params: [] };
            if (Array.isArray(I)) {
              let D = [new y1("(")];
              for (let [S, T] of I.entries()) if ((D.push(T), S < I.length - 1)) D.push(new y1(", "));
              return (D.push(new y1(")")), this.buildQueryFromSourceParams(D, s));
            }
            if (vi(I, e))
              return this.buildQueryFromSourceParams(I.queryChunks, {
                ...s,
                inlineParams: f || I.shouldInlineParams,
              });
            if (vi(I, TH)) {
              let D = I[TH.Symbol.Schema],
                S = I[TH.Symbol.Name];
              if (_ === "mssql-view-with-schemabinding")
                return { sql: (D === void 0 ? a("dbo") : a(D)) + "." + a(S), params: [] };
              return { sql: D === void 0 || I[use] ? a(S) : a(D) + "." + a(S), params: [] };
            }
            if (vi(I, Kl)) {
              let D = I.name;
              if (r.invokeSource === "indexes") return { sql: a(D), params: [] };
              let S = _ === "mssql-check" ? void 0 : I.table[TH.Symbol.Schema];
              return {
                sql: I.isAlias
                  ? a(I.name)
                  : I.table[use] || S === void 0
                    ? a(I.table[TH.Symbol.Name]) + "." + a(D)
                    : a(S) + "." + a(I.table[TH.Symbol.Name]) + "." + a(D),
                params: [],
              };
            }
            if (vi(I, xy)) {
              let D = I[Am].schema,
                S = I[Am].name;
              return { sql: D === void 0 || I[Am].isAlias ? a(S) : a(D) + "." + a(S), params: [] };
            }
            if (vi(I, My)) {
              if (vi(I.value, e)) return this.buildQueryFromSourceParams([I.value], s);
              let D = u && vi(I.encoder, Kl);
              if (vi(I.value, sV)) {
                let C = H(d.value++, I);
                return (
                  (I.codec = D ? (O) => u.apply(I.encoder, "normalizeParam", O) : void 0),
                  { sql: D ? u.apply(I.encoder, "castParam", C) : C, params: [I] }
                );
              }
              let S;
              if (I.value === null) S = I.value;
              else {
                if (
                  ((S = I.encoder.mapToDriverValue.isNoop ? I.value : I.encoder.mapToDriverValue(I.value)),
                  vi(S, e))
                )
                  return this.buildQueryFromSourceParams([S], s);
                if (D) S = u.apply(I.encoder, "normalizeParam", S);
              }
              if (f) return { sql: this.mapInlineParam(S, s), params: [] };
              let T = H(d.value++, S);
              return { sql: D ? u.apply(I.encoder, "castParam", T) : T, params: [S] };
            }
            if (vi(I, sV)) return { sql: H(d.value++, I), params: [I] };
            if (vi(I, e.Aliased) && I.fieldAlias !== void 0)
              return { sql: (I.origin !== void 0 ? a(I.origin) + "." : "") + a(I.fieldAlias), params: [] };
            if (vi(I, X_)) {
              if (I._.isWith) return { sql: a(I._.alias), params: [] };
              return this.buildQueryFromSourceParams(
                [new y1("("), I._.sql, new y1(") "), new u3e(I._.alias)],
                s,
              );
            }
            if (typeof I === "function" && "enumName" in I) {
              if ("schema" in I && I.schema) return { sql: a(I.schema) + "." + a(I.enumName), params: [] };
              return { sql: a(I.enumName), params: [] };
            }
            if (oY(I)) {
              if (I.shouldOmitSQLParens?.()) return this.buildQueryFromSourceParams([I.getSQL()], s);
              return this.buildQueryFromSourceParams([new y1("("), I.getSQL(), new y1(")")], s);
            }
            if (f) return { sql: this.mapInlineParam(I, s), params: [] };
            return { sql: H(d.value++, I), params: [I] };
          });
        if (r.tagged) return TVs(L);
        return SVs(L);
      }
      mapInlineParam(t, { escapeString: r }) {
        if (t === null) return "null";
        if (typeof t === "number" || typeof t === "boolean" || typeof t === "bigint") return t.toString();
        if (typeof t === "string") return r(t);
        if (typeof t === "object") {
          let s = t.toString();
          if (s === "[object Object]") return r(JSON.stringify(t));
          return r(s);
        }
        throw Error("Unexpected param value: " + t);
      }
      getSQL() {
        return this;
      }
      as(t) {
        if (t === void 0) return this;
        return new e.Aliased(this, t);
      }
      mapWith(t) {
        return ((this.decoder = typeof t === "function" ? { mapFromDriverValue: t } : t), this);
      }
      inlineParams() {
        return ((this.shouldInlineParams = !0), this);
      }
      if(t) {
        return t ? this : void 0;
      }
    }),
    (u3e = class {
      static [Gr] = "Name";
      brand;
      constructor(e) {
        this.value = e;
      }
      getSQL() {
        return new pH([this]);
      }
    }));
  lse = { mapFromDriverValue: (e) => e };
  lse.mapFromDriverValue.isNoop = !0;
  l3e = { mapToDriverValue: (e) => e };
  l3e.mapToDriverValue.isNoop = !0;
  ((jdn = { ...lse, ...l3e }),
    (My = class {
      static [Gr] = "Param";
      brand;
      constructor(e, t = l3e, r) {
        ((this.value = e), (this.encoder = t), (this.codec = r));
      }
      getSQL() {
        return new pH([this]);
      }
    }));
  (function (e) {
    function t() {
      return new pH([]);
    }
    e.empty = t;
    function r(_) {
      return new pH(_);
    }
    e.fromList = r;
    function s(_) {
      return new pH([new y1(_)]);
    }
    e.raw = s;
    function a(_, L) {
      let I = [];
      for (let [D, S] of _.entries()) {
        if (D > 0 && L !== void 0) I.push(L);
        I.push(S);
      }
      return new pH(I);
    }
    e.join = a;
    function H(_) {
      return new u3e(_);
    }
    e.identifier = H;
    function u(_) {
      return new sV(_);
    }
    e.placeholder = u;
    function f(_, L) {
      return new My(_, L);
    }
    e.param = f;
    function d(_) {
      let L = Y1e(_);
      if (!L.length) return;
      return Zt.raw(L);
    }
    e.comment = d;
  })(Zt || (Zt = {}));
  (function (e) {
    function t(H, u) {
      let f;
      if (typeof H === "object" && typeof u === "object") f = r({ ...H, ...u });
      else if (H && u) f = [r(H), r(u)].filter((d) => d.length).join(",");
      else if (u) f = r(u);
      else if (H) f = r(H);
      else return "";
      if (!f.length) return "";
      return `/*${f}*/`;
    }
    e.merge = t;
    function r(H) {
      if (typeof H === "string") {
        if (!H.length) return H;
        return a(H);
      }
      let u = [];
      for (let [f, d] of Object.entries(H)) {
        if (d === null || d === void 0 || d === "") continue;
        let _ = s(f),
          L = s(String(d));
        u.push(`${_}='${L}'`);
      }
      if (!u.length) return "";
      return u.sort().join(",");
    }
    e.encodeInput = r;
    function s(H) {
      return encodeURIComponent(H).replace(/'/g, "\\'");
    }
    e.sanitizeObjectElement = s;
    function a(H) {
      return H.replace(/\/\*/g, "/ *").replace(/\*\//g, "* /");
    }
    e.sanitizeStringInput = a;
  })(Y1e || (Y1e = {}));
  (function (e) {
    class t {
      static [Gr] = "SQL.Aliased";
      isSelectionField = !1;
      origin;
      constructor(r, s) {
        ((this.sql = r), (this.fieldAlias = s));
      }
      getSQL() {
        return this.sql;
      }
      clone() {
        return new t(this.sql, this.fieldAlias);
      }
    }
    e.Aliased = t;
  })(pH || (pH = {}));
  sV = class {
    static [Gr] = "Placeholder";
    constructor(e) {
      this.name = e;
    }
    getSQL() {
      return new pH([this]);
    }
  };
  ((vVs = Symbol.for("drizzle:IsDrizzleView")),
    (xy = class {
      static [Gr] = "View";
      [Am];
      [vVs] = !0;
      get [R6]() {
        return this[Am].name;
      }
      get [iY]() {
        return this[Am].schema;
      }
      get [use]() {
        return this[Am].isAlias;
      }
      get [fde]() {
        return this[Am].originalName;
      }
      get [$2]() {
        return this[Am].selectedFields;
      }
      constructor({ name: e, schema: t, selectedFields: r, query: s }) {
        this[Am] = {
          name: e,
          originalName: e,
          schema: t,
          selectedFields: r,
          query: s,
          isExisting: !s,
          isAlias: !1,
        };
      }
    }));
  Kl.prototype.getSQL = function () {
    return new pH([this]);
  };
  X_.prototype.getSQL = function () {
    return new pH([this]);
  };
});