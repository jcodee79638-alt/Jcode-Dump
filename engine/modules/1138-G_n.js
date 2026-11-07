
var G_n = ne(() => {
  Ba();
  q_n = class {
    static [Gr] = "ColumnBuilder";
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
  };
});