
var L2 = ne(() => {
  Ba();
  _tr();
  htr.isNoop = !0;
  Kl = class {
    static [Gr] = "Column";
    codec;
    name;
    keyAsName;
    primary;
    notNull;
    default;
    defaultFn;
    onUpdateFn;
    hasDefault;
    isUnique;
    uniqueName;
    uniqueType;
    dataType;
    columnType;
    enumValues = void 0;
    generated = void 0;
    generatedIdentity = void 0;
    length;
    isLengthExact;
    isAlias;
    config;
    table;
    onInit() {}
    constructor(e, t) {
      ((this.config = t),
        this.onInit(),
        (this.table = e),
        (this.name = t.name),
        (this.isAlias = !1),
        (this.keyAsName = t.keyAsName),
        (this.notNull = t.notNull),
        (this.default = t.default),
        (this.defaultFn = t.defaultFn),
        (this.onUpdateFn = t.onUpdateFn),
        (this.hasDefault = t.hasDefault),
        (this.primary = t.primaryKey),
        (this.isUnique = t.isUnique),
        (this.uniqueName = t.uniqueName),
        (this.uniqueType = t.uniqueType),
        (this.dataType = t.dataType),
        (this.columnType = t.columnType),
        (this.generated = t.generated),
        (this.generatedIdentity = t.generatedIdentity),
        (this.length = t.length),
        (this.isLengthExact = t.isLengthExact));
    }
    mapFromDriverValue = htr;
    mapToDriverValue = htr;
    postBuild() {
      return this;
    }
    shouldDisableInsert() {
      return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
    }
    [c3e]() {
      return this;
    }
  };
});