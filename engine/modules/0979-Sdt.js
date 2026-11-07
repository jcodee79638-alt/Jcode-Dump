
var Sdt = ne(() => {
  Zm();
  Ba();
  dse = class extends tu {
    static [Gr] = "PgIntColumnBaseBuilder";
    generatedAlwaysAsIdentity(e) {
      if (e) {
        let { name: t, ...r } = e;
        this.config.generatedIdentity = { type: "always", sequenceName: t, sequenceOptions: r };
      } else this.config.generatedIdentity = { type: "always" };
      return ((this.config.hasDefault = !0), (this.config.notNull = !0), this);
    }
    generatedByDefaultAsIdentity(e) {
      if (e) {
        let { name: t, ...r } = e;
        this.config.generatedIdentity = { type: "byDefault", sequenceName: t, sequenceOptions: r };
      } else this.config.generatedIdentity = { type: "byDefault" };
      return ((this.config.hasDefault = !0), (this.config.notNull = !0), this);
    }
  };
});