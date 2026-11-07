
var lMe = ne(() => {
  Ba();
  L2();
  J_();
  Vdt();
  Rdt();
  f3e();
  hdt();
  Ym();
  Fj();
  ((nqs = class {
    static [Gr] = "RelationV2";
    fieldName;
    sourceColumns;
    targetColumns;
    alias;
    where;
    sourceTable;
    targetTable;
    through;
    throughTable;
    isReversed;
    sourceColumnTableNames = [];
    targetColumnTableNames = [];
    constructor(e, t) {
      ((this.targetTableName = t), (this.targetTable = e));
    }
  }),
    (F_n = class extends nqs {
      static [Gr] = "OneV2";
      relationType = "one";
      optional;
      constructor(e, t, r, s) {
        super(t, r);
        if (((this.alias = s?.alias), (this.where = s?.where), s?.from))
          this.sourceColumns = (Array.isArray(s.from) ? s.from : [s.from]).map(
            (a) => (
              (this.throughTable ??= a._.through ? e[a._.through._.tableName] : void 0),
              this.sourceColumnTableNames.push(a._.tableName),
              a._.column
            ),
          );
        if (s?.to)
          this.targetColumns = (Array.isArray(s.to) ? s.to : [s.to]).map(
            (a) => (
              (this.throughTable ??= a._.through ? e[a._.through._.tableName] : void 0),
              this.targetColumnTableNames.push(a._.tableName),
              a._.column
            ),
          );
        if (this.throughTable)
          this.through = {
            source: (Array.isArray(s?.from) ? s.from : s?.from ? [s.from] : []).map((a) => a._.through),
            target: (Array.isArray(s?.to) ? s.to : s?.to ? [s.to] : []).map((a) => a._.through),
          };
        this.optional = s?.optional ?? !0;
      }
    }),
    (cMe = {
      and: Gc,
      between: eMe,
      eq: Pi,
      exists: dde,
      gt: $D,
      gte: aV,
      ilike: nMe,
      inArray: Wv,
      arrayContains: ddt,
      arrayContained: mdt,
      arrayOverlaps: _dt,
      isNull: FS,
      isNotNull: fse,
      like: g2,
      lt: cw,
      lte: TG,
      ne: xG,
      not: SG,
      notBetween: tMe,
      notExists: mde,
      notLike: rMe,
      notIlike: iMe,
      notInArray: Z1e,
      or: K0,
      sql: Zt,
    }),
    (iqs = { sql: Zt, asc: Qm, desc: TE }));
});