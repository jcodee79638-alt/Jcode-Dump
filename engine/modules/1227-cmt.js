
var cmt = ne(() => {
  Ba();
  Ov();
  ((srr = class extends ki()("EffectDrizzleError", { message: re, cause: PH }) {
    static [Gr] = "EffectDrizzleError";
  }),
    (Vhn = class e extends (
      ki()("EffectDrizzleQueryError", { query: re, params: On(e0).pipe(J0), cause: PH })
    ) {
      static [Gr] = "EffectDrizzleQueryError";
      get message() {
        return `Failed query: ${this.query}
params: ${this.params}`;
      }
      constructor(t) {
        super(t);
        Error.captureStackTrace(this, e);
      }
    }),
    (qhn = class extends ki()("EffectTransactionRollbackError", {}) {
      static [Gr] = "EffectTransactionRollbackError";
      message = "Rollback";
    }),
    (orr = class extends (
      ki()("MigratorInitError", { exitCode: Jo(["databaseMigrations", "localMigrations"]) })
    ) {
      static [Gr] = "MigratorInitError";
    }));
});