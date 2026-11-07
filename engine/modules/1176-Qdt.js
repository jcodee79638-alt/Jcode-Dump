
var Qdt = ne(() => {
  _de();
  Ba();
  Hw();
  sY();
  Fj();
  L2();
  Ym();
  J_();
  Ptr();
  Bdt();
  Rdt();
  lMe();
  Vdt();
  V_n();
  K_n();
  cY();
  Ehn();
  ((D3e = class {
    static [Gr] = "SQLiteDialect";
    constructor(e) {}
    escapeName(e) {
      return `"${e.replace(/"/g, '""')}"`;
    }
    escapeParam(e) {
      return "?";
    }
    escapeString(e) {
      return `'${e.replace(/'/g, "''")}'`;
    }
    buildWithCTE(e) {
      if (!e?.length) return;
      let t = [Zt`with `];
      for (let [r, s] of e.entries())
        if ((t.push(Zt`${Zt.identifier(s._.alias)} as (${s._.sql})`), r < e.length - 1)) t.push(Zt`, `);
      return (t.push(Zt` `), Zt.join(t));
    }
    buildDeleteQuery({ table: e, where: t, returning: r, withList: s, limit: a, orderBy: H }) {
      let u = this.buildWithCTE(s),
        f = r ? Zt` returning ${this.buildSelection(r, { isSingleTable: !0 })}` : void 0;
      return Zt`${u}delete from ${e}${t ? Zt` where ${t}` : void 0}${f}${this.buildOrderBy(H)}${this.buildLimit(a)}`;
    }
    buildUpdateSet(e, t) {
      let r = e[TH.Symbol.Columns],
        s = Object.keys(r).filter((H) => t[H] !== void 0 || r[H]?.onUpdateFn !== void 0),
        a = s.length;
      return Zt.join(
        s.flatMap((H, u) => {
          let f = r[H],
            d = f.onUpdateFn?.(),
            _ = t[H] ?? (vi(d, pH) ? d : Zt.param(d, f)),
            L = Zt`${Zt.identifier(f.name)} = ${_}`;
          if (u < a - 1) return [L, Zt.raw(", ")];
          return [L];
        }),
      );
    }
    buildUpdateQuery({
      table: e,
      set: t,
      where: r,
      returning: s,
      withList: a,
      joins: H,
      from: u,
      limit: f,
      orderBy: d,
    }) {
      let _ = this.buildWithCTE(a),
        L = this.buildUpdateSet(e, t),
        I = u && Zt.join([Zt.raw(" from "), this.buildFromTable(u)]),
        D = this.buildJoins(H),
        S = s ? Zt` returning ${this.buildSelection(s, { isSingleTable: !0 })}` : void 0;
      return Zt`${_}update ${e} set ${L}${I}${D}${r ? Zt` where ${r}` : void 0}${S}${this.buildOrderBy(d)}${this.buildLimit(f)}`;
    }
    buildSelection(e, { isSingleTable: t = !1 } = {}) {
      let r = e.length,
        s = e.flatMap(({ field: a }, H) => {
          let u = [];
          if (vi(a, pH.Aliased) && a.isSelectionField) {
            if (!t && a.origin !== void 0) u.push(Zt.identifier(a.origin), Zt.raw("."));
            u.push(Zt.identifier(a.fieldAlias));
          } else if (vi(a, pH.Aliased) || vi(a, pH)) {
            let f = vi(a, pH.Aliased) ? a.sql : a;
            if (t) {
              let d = new pH(
                f.queryChunks.map((_) => {
                  if (vi(_, Kl)) return Zt.identifier(_.name);
                  return _;
                }),
              );
              u.push(f.shouldInlineParams ? d.inlineParams() : d);
            } else u.push(f);
            if (vi(a, pH.Aliased)) u.push(Zt` as ${Zt.identifier(a.fieldAlias)}`);
          } else if (vi(a, Kl))
            if (a.columnType === "SQLiteNumericBigInt")
              if (t)
                u.push(
                  a.isAlias
                    ? Zt`cast(${Zt.identifier(g3e(a).name)} as text) as ${a}`
                    : Zt`cast(${Zt.identifier(a.name)} as text)`,
                );
              else u.push(a.isAlias ? Zt`cast(${g3e(a)} as text) as ${a}` : Zt`cast(${a} as text)`);
            else if (t) u.push(a.isAlias ? Zt`${Zt.identifier(g3e(a).name)} as ${a}` : Zt.identifier(a.name));
            else u.push(a.isAlias ? Zt`${g3e(a)} as ${a}` : a);
          else if (vi(a, X_)) {
            let f = Object.entries(a._.selectedFields);
            if (f.length === 1) {
              let d = f[0][1],
                _ = vi(d, pH)
                  ? d.decoder
                  : vi(d, Kl)
                    ? { mapFromDriverValue: (L) => d.mapFromDriverValue(L) }
                    : d.sql.decoder;
              if (_) a._.sql.decoder = _;
            }
            u.push(a);
          }
          if (H < r - 1) u.push(Zt`, `);
          return u;
        });
      return Zt.join(s);
    }
    buildJoins(e) {
      if (!e || e.length === 0) return;
      let t = [];
      if (e)
        for (let [r, s] of e.entries()) {
          if (r === 0) t.push(Zt` `);
          let a = s.table,
            H = s.on ? Zt` on ${s.on}` : void 0;
          if (vi(a, ED)) {
            let u = a[ED.Symbol.Name],
              f = a[ED.Symbol.Schema],
              d = a[ED.Symbol.OriginalName],
              _ = u === d ? void 0 : s.alias;
            t.push(
              Zt`${Zt.raw(s.joinType)} join ${f ? Zt`${Zt.identifier(f)}.` : void 0}${Zt.identifier(d)}${_ && Zt` ${Zt.identifier(_)}`}${H}`,
            );
          } else t.push(Zt`${Zt.raw(s.joinType)} join ${a}${H}`);
          if (r < e.length - 1) t.push(Zt` `);
        }
      return Zt.join(t);
    }
    buildLimit(e) {
      return typeof e === "object" || (typeof e === "number" && e >= 0) ? Zt` limit ${e}` : void 0;
    }
    buildOrderBy(e) {
      let t = [];
      if (e) {
        for (let [r, s] of e.entries()) if ((t.push(s), r < e.length - 1)) t.push(Zt`, `);
      }
      return t.length > 0 ? Zt` order by ${Zt.join(t)}` : void 0;
    }
    buildFromTable(e) {
      if (vi(e, TH) && e[TH.Symbol.IsAlias])
        return Zt`${Zt`${Zt.identifier(e[TH.Symbol.Schema] ?? "")}.`.if(e[TH.Symbol.Schema])}${Zt.identifier(e[TH.Symbol.OriginalName])} ${Zt.identifier(e[TH.Symbol.Name])}`;
      if (vi(e, xy) && e[Am].isAlias) {
        let t = Zt`${Zt.identifier(e[Am].originalName)}`;
        if (e[Am].schema) t = Zt`${Zt.identifier(e[Am].schema)}.${t}`;
        return Zt`${t} ${Zt.identifier(e[Am].name)}`;
      }
      return e;
    }
    buildSelectQuery({
      withList: e,
      fields: t,
      fieldsFlat: r,
      where: s,
      having: a,
      table: H,
      joins: u,
      orderBy: f,
      groupBy: d,
      limit: _,
      offset: L,
      distinct: I,
      setOperators: D,
    }) {
      let S = r ?? I2(t);
      for (let Ae of S)
        if (
          vi(Ae.field, Kl) &&
          iV(Ae.field.table) !==
            (vi(H, X_) ? H._.alias : vi(H, E2) ? H[Am].name : vi(H, pH) ? void 0 : iV(H)) &&
          !((le) =>
            u?.some(({ alias: Be }) => Be === (le[TH.Symbol.IsAlias] ? iV(le) : le[TH.Symbol.BaseName])))(
            Ae.field.table,
          )
        ) {
          let le = iV(Ae.field.table);
          throw Error(
            `Your "${Ae.path.join("->")}" field references a column "${le}"."${Ae.field.name}", but the table "${le}" is not part of the query! Did you forget to join it?`,
          );
        }
      let T = !u || u.length === 0,
        C = this.buildWithCTE(e),
        O = I ? Zt` distinct` : void 0,
        B = this.buildSelection(S, { isSingleTable: T }),
        V = this.buildFromTable(H),
        q = this.buildJoins(u),
        Z = s ? Zt` where ${s}` : void 0,
        se = a ? Zt` having ${a}` : void 0,
        ae = [];
      if (d) {
        for (let [Ae, le] of d.entries()) if ((ae.push(le), Ae < d.length - 1)) ae.push(Zt`, `);
      }
      let z = Zt`${C}select${O} ${B} from ${V}${q}${Z}${ae.length > 0 ? Zt` group by ${Zt.join(ae)}` : void 0}${se}${this.buildOrderBy(f)}${this.buildLimit(_)}${L ? Zt` offset ${L}` : void 0}`;
      if (D.length > 0) return this.buildSetOperations(z, D);
      return z;
    }
    buildSetOperations(e, t) {
      let [r, ...s] = t;
      if (!r) throw Error("Cannot pass undefined values to any set operator");
      if (s.length === 0) return this.buildSetOperationQuery({ leftSelect: e, setOperator: r });
      return this.buildSetOperations(this.buildSetOperationQuery({ leftSelect: e, setOperator: r }), s);
    }
    buildSetOperationQuery({
      leftSelect: e,
      setOperator: { type: t, isAll: r, rightSelect: s, limit: a, orderBy: H, offset: u },
    }) {
      let f = Zt`${e.getSQL()} `,
        d = Zt`${s.getSQL()}`,
        _;
      if (H && H.length > 0) {
        let S = [];
        for (let T of H)
          if (vi(T, gD)) S.push(Zt.identifier(T.name));
          else if (vi(T, pH)) {
            for (let C = 0; C < T.queryChunks.length; C++) {
              let O = T.queryChunks[C];
              if (vi(O, gD)) T.queryChunks[C] = Zt.identifier(O.name);
            }
            S.push(Zt`${T}`);
          } else S.push(Zt`${T}`);
        _ = Zt` order by ${Zt.join(S, Zt`, `)}`;
      }
      let L = typeof a === "object" || (typeof a === "number" && a >= 0) ? Zt` limit ${a}` : void 0,
        I = Zt.raw(`${t} ${r ? "all " : ""}`),
        D = u ? Zt` offset ${u}` : void 0;
      return Zt`${f}${I}${d}${_}${L}${D}`;
    }
    buildInsertQuery({ table: e, values: t, onConflict: r, returning: s, withList: a, select: H }) {
      let u = [],
        f = e[TH.Symbol.Columns],
        d = Object.entries(f).filter(([S, T]) => !T.shouldDisableInsert()),
        _ = d.map(([, S]) => Zt.identifier(S.name));
      if (H) {
        let S = t;
        if (vi(S, pH)) u.push(S);
        else u.push(S.getSQL());
      } else {
        let S = t;
        u.push(Zt.raw("values "));
        for (let [T, C] of S.entries()) {
          let O = [];
          for (let [B, V] of d) {
            let q = C[B];
            if (q === void 0 || (vi(q, My) && q.value === void 0)) {
              let Z;
              if (V.default !== null && V.default !== void 0)
                Z = vi(V.default, pH) ? V.default : Zt.param(V.default, V);
              else if (V.defaultFn !== void 0) {
                let se = V.defaultFn();
                Z = vi(se, pH) ? se : Zt.param(se, V);
              } else if (!V.default && V.onUpdateFn !== void 0) {
                let se = V.onUpdateFn();
                Z = vi(se, pH) ? se : Zt.param(se, V);
              } else Z = Zt`null`;
              O.push(Z);
            } else O.push(q);
          }
          if ((u.push(O), T < S.length - 1)) u.push(Zt`, `);
        }
      }
      let L = this.buildWithCTE(a),
        I = Zt.join(u),
        D = s ? Zt` returning ${this.buildSelection(s, { isSingleTable: !0 })}` : void 0;
      return Zt`${L}insert into ${e} ${_} ${I}${r?.length ? Zt.join(r) : void 0}${D}`;
    }
    sqlToQuery(e, t) {
      return e.toQuery({
        escapeName: this.escapeName,
        escapeParam: this.escapeParam,
        escapeString: this.escapeString,
        invokeSource: t,
      });
    }
    _buildRelationalQuery({
      fullSchema: e,
      schema: t,
      tableNamesMap: r,
      table: s,
      tableConfig: a,
      queryConfig: H,
      tableAlias: u,
      nestedQueryRelation: f,
      joinOn: d,
    }) {
      let _ = [],
        L,
        I,
        D = [],
        S,
        T = [];
      if (H === !0)
        _ = Object.entries(a.columns).map(([O, B]) => ({
          dbKey: B.name,
          tsKey: O,
          field: bG(B, u),
          relationTableTsKey: void 0,
          isJson: !1,
          selection: [],
        }));
      else {
        let O = Object.fromEntries(Object.entries(a.columns).map(([ae, z]) => [ae, bG(z, u)]));
        if (H.where) {
          let ae = typeof H.where === "function" ? H.where(O, P_n()) : H.where;
          S = ae && $3e(ae, u);
        }
        let B = [],
          V = [];
        if (H.columns) {
          let ae = !1;
          for (let [z, Ae] of Object.entries(H.columns)) {
            if (Ae === void 0) continue;
            if (z in a.columns) {
              if (!ae && Ae === !0) ae = !0;
              V.push(z);
            }
          }
          if (V.length > 0)
            V = ae
              ? V.filter((z) => H.columns?.[z] === !0)
              : Object.keys(a.columns).filter((z) => !V.includes(z));
        } else V = Object.keys(a.columns);
        for (let ae of V) {
          let z = a.columns[ae];
          B.push({ tsKey: ae, value: z });
        }
        let q = [];
        if (H.with)
          q = Object.entries(H.with)
            .filter((ae) => !!ae[1])
            .map(([ae, z]) => ({ tsKey: ae, queryConfig: z, relation: a.relations[ae] }));
        let Z;
        if (H.extras) {
          Z = typeof H.extras === "function" ? H.extras(O, { sql: Zt }) : H.extras;
          for (let [ae, z] of Object.entries(Z)) B.push({ tsKey: ae, value: Btr(z, u) });
        }
        for (let { tsKey: ae, value: z } of B)
          _.push({
            dbKey: vi(z, pH.Aliased) ? z.fieldAlias : a.columns[ae].name,
            tsKey: ae,
            field: vi(z, Kl) ? bG(z, u) : z,
            relationTableTsKey: void 0,
            isJson: !1,
            selection: [],
          });
        let se = typeof H.orderBy === "function" ? H.orderBy(O, C_n()) : (H.orderBy ?? []);
        if (!Array.isArray(se)) se = [se];
        ((D = se.map((ae) => {
          if (vi(ae, Kl)) return bG(ae, u);
          return $3e(ae, u);
        })),
          (L = H.limit),
          (I = H.offset));
        for (let { tsKey: ae, queryConfig: z, relation: Ae } of q) {
          let le = k_n(t, r, Ae),
            Be = r[pde(Ae.referencedTable)],
            Te = `${u}_${ae}`,
            Lt = Gc(...le.fields.map((_e, we) => Pi(bG(le.references[we], Te), bG(_e, u)))),
            Ht = this._buildRelationalQuery({
              fullSchema: e,
              schema: t,
              tableNamesMap: r,
              table: e[Be],
              tableConfig: t[Be],
              queryConfig: vi(Ae, aMe) ? (z === !0 ? { limit: 1 } : { ...z, limit: 1 }) : z,
              tableAlias: Te,
              joinOn: Lt,
              nestedQueryRelation: Ae,
            }),
            Se = Zt`(${Ht.sql})`.as(ae);
          _.push({
            dbKey: ae,
            tsKey: ae,
            field: Se,
            relationTableTsKey: Be,
            isJson: !0,
            selection: Ht.selection,
          });
        }
      }
      if (_.length === 0)
        throw new aY({
          message: `No fields selected for table "${a.tsName}" ("${u}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`,
        });
      let C;
      if (((S = Gc(d, S)), f)) {
        let O = Zt`json_array(${Zt.join(
          _.map(({ field: V }) => (vi(V, gD) ? Zt.identifier(V.name) : vi(V, pH.Aliased) ? V.sql : V)),
          Zt`, `,
        )})`;
        if (vi(f, Ntr)) O = Zt`coalesce(json_group_array(${O}), json_array())`;
        let B = [
          {
            dbKey: "data",
            tsKey: "data",
            field: O.as("data"),
            isJson: !0,
            relationTableTsKey: a.tsName,
            selection: _,
          },
        ];
        if (L !== void 0 || I !== void 0 || D.length > 0)
          ((C = this.buildSelectQuery({
            table: vG(s, u),
            fields: {},
            fieldsFlat: [{ path: [], field: Zt.raw("*") }],
            where: S,
            limit: L,
            offset: I,
            orderBy: D,
            setOperators: [],
          })),
            (S = void 0),
            (L = void 0),
            (I = void 0),
            (D = void 0));
        else C = vG(s, u);
        C = this.buildSelectQuery({
          table: vi(C, ED) ? C : new X_(C, {}, u),
          fields: {},
          fieldsFlat: B.map(({ field: V }) => ({ path: [], field: vi(V, Kl) ? bG(V, u) : V })),
          joins: T,
          where: S,
          limit: L,
          offset: I,
          orderBy: D,
          setOperators: [],
        });
      } else
        C = this.buildSelectQuery({
          table: vG(s, u),
          fields: {},
          fieldsFlat: _.map(({ field: O }) => ({ path: [], field: vi(O, Kl) ? bG(O, u) : O })),
          joins: T,
          where: S,
          limit: L,
          offset: I,
          orderBy: D,
          setOperators: [],
        });
      return { tableTsKey: a.tsName, sql: C, selection: _ };
    }
    nestedSelectionerror() {
      throw new aY({
        message: "Views with nested selections are not supported by the relational query builder",
      });
    }
    buildRqbColumn(e, t, r) {
      if (vi(t, Kl)) {
        let s = Zt`${e}.${Zt.identifier(t.name)}`;
        switch (t.columnType) {
          case "SQLiteBigInt":
          case "SQLiteBlobJson":
          case "SQLiteBlobBuffer":
            return Zt`hex(${s}) as ${Zt.identifier(r)}`;
          case "SQLiteNumeric":
          case "SQLiteNumericNumber":
          case "SQLiteNumericBigInt":
            return Zt`cast(${s} as text) as ${Zt.identifier(r)}`;
          case "SQLiteCustomColumn":
            return Zt`${t.jsonSelectIdentifier(s, Zt)} as ${Zt.identifier(r)}`;
          default:
            return Zt`${s} as ${Zt.identifier(r)}`;
        }
      }
      return Zt`${e}.${vi(t, pH.Aliased) ? Zt.identifier(t.fieldAlias) : oY(t) ? Zt.identifier(r) : this.nestedSelectionerror()} as ${Zt.identifier(r)}`;
    }
    unwrapAllColumns = (e, t) =>
      Zt.join(
        Object.entries(e[$2]).map(([r, s]) => (t.push({ key: r, field: s }), this.buildRqbColumn(e, s, r))),
        Zt`, `,
      );
    getSelectedTableColumns = (e, t) => {
      let r = [],
        s = e[$2],
        a = Object.entries(t),
        H;
      for (let [u, f] of a) {
        if (f === void 0) continue;
        if (((H = H || f), f)) {
          let d = s[u];
          r.push({ column: d, tsName: u });
        }
      }
      if (H === !1)
        for (let [u, f] of Object.entries(s)) {
          if (t[u] === !1) continue;
          r.push({ column: f, tsName: u });
        }
      return r;
    };
    buildColumns = (e, t, r) =>
      r?.columns
        ? (() => {
            let s = [],
              a = this.getSelectedTableColumns(e, r?.columns);
            for (let { column: H, tsName: u } of a)
              (s.push(this.buildRqbColumn(e, H, u)), t.push({ key: u, field: H }));
            return s.length ? Zt.join(s, Zt`, `) : void 0;
          })()
        : this.unwrapAllColumns(e, t);
    buildRelationalQuery({
      schema: e,
      table: t,
      tableConfig: r,
      queryConfig: s,
      relationWhere: a,
      mode: H,
      isNested: u,
      errorPath: f,
      depth: d,
      throughJoin: _,
      jsonb: L,
    }) {
      let I = [],
        D = H === "first",
        S = s === !0 ? void 0 : s,
        T = f ?? "",
        C = d ?? 0;
      if (!C) t = vG(t, `d${C}`);
      let O = D ? 1 : S?.limit,
        B = S?.offset,
        V = this.buildColumns(t, I, S),
        q =
          S?.where && a
            ? Gc(HY(t, S.where, r.relations, e), a)
            : S?.where
              ? HY(t, S.where, r.relations, e)
              : a,
        Z = S?.orderBy ? R_n(t, S.orderBy) : void 0,
        se = S?.extras ? W_n(t, S.extras) : void 0;
      if (se) I.push(...se.selection);
      let ae = S
          ? (() => {
              let { with: Ae } = S;
              if (!Ae) return;
              let le = Object.entries(Ae).filter(([Be, Te]) => Te);
              if (!le.length) return;
              return Zt.join(
                le.map(([Be, Te]) => {
                  let Lt = r.relations[Be],
                    Ht = vi(Lt, F_n),
                    Se = vG(Lt.targetTable, `d${C + 1}`),
                    _e = Lt.throughTable ? vG(Lt.throughTable, `tr${C}`) : void 0,
                    { filter: we, joinCondition: Pe } = Wtr(Lt, t, Se, _e),
                    ye = _e ? Zt` inner join ${AMe(_e)} on ${Pe}` : void 0,
                    ot = this.buildRelationalQuery({
                      table: Se,
                      mode: Ht ? "first" : "many",
                      schema: e,
                      queryConfig: Te,
                      tableConfig: e[Lt.targetTableName],
                      relationWhere: we,
                      isNested: !0,
                      errorPath: `${T.length ? `${T}.` : ""}${Be}`,
                      depth: C + 1,
                      throughJoin: ye,
                      jsonb: L,
                    });
                  I.push({
                    field: Se,
                    key: Be,
                    selection: ot.selection,
                    isArray: !Ht,
                    isOptional: (Lt.optional ?? !1) || (Te !== !0 && !!Te.where),
                  });
                  let Ee = Zt.join(
                      ot.selection.map(
                        (Fe) =>
                          Zt`${Zt.raw(this.escapeString(Fe.key))}, ${Fe.selection ? Zt`${L}(${Zt.identifier(Fe.key)})` : Zt.identifier(Fe.key)}`,
                      ),
                      Zt`, `,
                    ),
                    Ve = u ? L : Zt`json`;
                  return Ht
                    ? Zt`(select ${Ve}_object(${Ee}) as ${Zt.identifier("r")} from (${ot.sql}) as ${Zt.identifier("t")}) as ${Zt.identifier(Be)}`
                    : Zt`coalesce((select ${Ve}_group_array(json_object(${Ee})) as ${Zt.identifier("r")} from (${ot.sql}) as ${Zt.identifier("t")}), ${L}_array()) as ${Zt.identifier(Be)}`;
                }),
                Zt`, `,
              );
            })()
          : void 0,
        z = [V, se?.sql, ae].filter((Ae) => Ae !== void 0);
      if (!z.length)
        throw new aY({ message: `No fields selected for table "${r.name}"${T ? ` ("${T}")` : ""}` });
      return {
        sql: Zt`select ${Zt.join(z, Zt`, `)} from ${AMe(t)}${_}${Zt` where ${q}`.if(q)}${Zt` order by ${Z}`.if(Z)}${Zt` limit ${O}`.if(O !== void 0)}${Zt` offset ${B}`.if(B !== void 0)}`,
        selection: I,
      };
    }
  }),
    (zdt = class extends D3e {
      static [Gr] = "SQLiteSyncDialect";
      migrate(e, t, r) {
        let s =
            r === void 0
              ? "__drizzle_migrations"
              : typeof r === "string"
                ? "__drizzle_migrations"
                : (r.migrationsTable ?? "__drizzle_migrations"),
          { newDb: a } = $hn(s, t, e);
        if (a) {
          let f = Zt`
			CREATE TABLE IF NOT EXISTS ${Zt.identifier(s)} (
				id INTEGER PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric,
				name text,
				applied_at TEXT
			)`;
          t.run(f);
        }
        let H = t.all(Zt`SELECT id, hash, created_at, name FROM ${Zt.identifier(s)}`);
        if (typeof r === "object" && r.init) {
          if (H.length) return { exitCode: "databaseMigrations" };
          if (e.length > 1) return { exitCode: "localMigrations" };
          let [f] = e;
          if (!f) return;
          t.run(
            Zt`insert into ${Zt.identifier(s)} ("hash", "created_at", "name", "applied_at") values(${f.hash}, ${f.folderMillis}, ${f.name}, ${new Date().toISOString()})`,
          );
          return;
        }
        let u = h3e({ localMigrations: e, dbMigrations: H });
        t.run(Zt`BEGIN`);
        try {
          for (let f of u) {
            for (let d of f.sql) t.run(Zt.raw(d));
            t.run(
              Zt`INSERT INTO ${Zt.identifier(s)} ("hash", "created_at", "name", "applied_at") values(${f.hash}, ${f.folderMillis}, ${f.name}, ${new Date().toISOString()})`,
            );
          }
          t.run(Zt`COMMIT`);
        } catch (f) {
          throw (t.run(Zt`ROLLBACK`), f);
        }
      }
    }),
    (Ihn = class extends D3e {
      static [Gr] = "SQLiteAsyncDialect";
      async migrate(e, t, r) {
        let s =
            r === void 0
              ? "__drizzle_migrations"
              : typeof r === "string"
                ? "__drizzle_migrations"
                : (r.migrationsTable ?? "__drizzle_migrations"),
          { newDb: a } = await ghn(s, t, e);
        if (a) {
          let f = Zt`
			CREATE TABLE IF NOT EXISTS ${Zt.identifier(s)} (
				id INTEGER PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric,
				name text,
				applied_at TEXT
		)
		`;
          await t.session.run(f);
        }
        let H = await t.session.all(Zt`SELECT id, hash, created_at, name FROM ${Zt.identifier(s)};`);
        if (typeof r === "object" && r.init) {
          if (H.length) return { exitCode: "databaseMigrations" };
          if (e.length > 1) return { exitCode: "localMigrations" };
          let [f] = e;
          if (!f) return;
          await t.session.run(
            Zt`insert into ${Zt.identifier(s)} ("hash", "created_at", "name", "applied_at") values(${f.hash}, ${f.folderMillis}, ${f.name}, ${new Date().toISOString()})`,
          );
          return;
        }
        let u = h3e({ localMigrations: e, dbMigrations: H });
        await t.session.transaction(async (f) => {
          for (let d of u) {
            for (let _ of d.sql) await f.run(Zt.raw(_));
            await f.run(
              Zt`insert into ${Zt.identifier(s)} ("hash", "created_at", "name", "applied_at") values(${d.hash}, ${d.folderMillis}, ${d.name}, ${new Date().toISOString()})`,
            );
          }
        });
      }
    }));
});