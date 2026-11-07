
var Zm = ne(() => {
  Ba();
  L2();
  omn();
  Tdn();
  ((tu = class {
    static [Gr] = "PgColumnBuilder";
    foreignKeyConfigs = [];
    config;
    constructor(e, t, r) {
      this.config = {
        name: e,
        keyAsName: e === "",
        notNull: !1,
        default: void 0,
        hasDefault: !1,
        primaryKey: !1,
        isUnique: !1,
        uniqueName: void 0,
        uniqueType: void 0,
        dataType: t,
        columnType: r,
        generated: void 0,
        defaultFn: void 0,
        onUpdateFn: void 0,
        generatedIdentity: void 0,
      };
    }
    $type() {
      return this;
    }
    notNull() {
      return ((this.config.notNull = !0), this);
    }
    default(e) {
      return ((this.config.default = e), (this.config.hasDefault = !0), this);
    }
    $defaultFn(e) {
      return ((this.config.defaultFn = e), (this.config.hasDefault = !0), this);
    }
    $default = this.$defaultFn;
    $onUpdateFn(e) {
      return ((this.config.onUpdateFn = e), (this.config.hasDefault = !0), this);
    }
    $onUpdate = this.$onUpdateFn;
    primaryKey() {
      return ((this.config.primaryKey = !0), (this.config.notNull = !0), this);
    }
    setName(e, t) {
      if (this.config.name !== "") return;
      this.config.name = t(e);
    }
    array(e) {
      let t = e ?? "[]";
      return ((this.config.dimensions = t.length / 2), this);
    }
    references(e, t = {}) {
      return (this.foreignKeyConfigs.push({ ref: e, config: t }), this);
    }
    unique(e, t) {
      return (
        (this.config.isUnique = !0),
        (this.config.uniqueName = e),
        (this.config.uniqueType = t?.nulls),
        this
      );
    }
    generatedAlwaysAs(e) {
      return ((this.config.generated = { as: e, type: "always", mode: "stored" }), this);
    }
    buildForeignKeys(e, t) {
      return this.foreignKeyConfigs.map(({ ref: r, config: s }) =>
        Sdn(
          (a, H) => {
            let u = new smn(() => {
              let f = a();
              return { name: H.name, columns: [e], foreignColumns: [f] };
            });
            if (H.onUpdate) u.onUpdate(H.onUpdate);
            if (H.onDelete) u.onDelete(H.onDelete);
            return u.build(t);
          },
          r,
          s,
        ),
      );
    }
    buildExtraConfigColumn(e) {
      return new p7s(e, { ...this.config, dimensions: this.config.dimensions ?? 0 });
    }
  }),
    (dc = class extends Kl {
      static [Gr] = "PgColumn";
      table;
      dimensions;
      constructor(e, t) {
        super(e, t);
        ((this.table = e), (this.dimensions = t.dimensions ?? 0));
      }
      postBuild() {
        if (this.dimensions) {
          let e = this.mapFromDriverValue.bind(this),
            t = this.mapToDriverValue.bind(this);
          ((this.mapFromDriverValue = this.mapFromDriverValue.isNoop
            ? this.mapFromDriverValue
            : (r) => this.mapArrayElements(r, e, this.dimensions)),
            (this.mapToDriverValue = this.mapToDriverValue.isNoop
              ? this.mapToDriverValue
              : (r) => this.mapArrayElements(r, t, this.dimensions)));
        }
        return this;
      }
      mapArrayElements(e, t, r) {
        if (r > 0 && Array.isArray(e))
          return e.map((s) => (s === null ? null : this.mapArrayElements(s, t, r - 1)));
        return t(e);
      }
    }),
    (p7s = class extends dc {
      static [Gr] = "ExtraConfigColumn";
      codec = void 0;
      getSQLType() {
        return this.getSQLType();
      }
      indexConfig = {
        order: this.config.order ?? "asc",
        nulls: this.config.nulls ?? "last",
        opClass: this.config.opClass,
      };
      defaultConfig = { order: "asc", nulls: "last", opClass: void 0 };
      asc() {
        return ((this.indexConfig.order = "asc"), this);
      }
      desc() {
        return ((this.indexConfig.order = "desc"), this);
      }
      nullsFirst() {
        return ((this.indexConfig.nulls = "first"), this);
      }
      nullsLast() {
        return ((this.indexConfig.nulls = "last"), this);
      }
      op(e) {
        return ((this.indexConfig.opClass = e), this);
      }
    }));
});