
var Rdt = ne(() => {
  Ba();
  ((aY = class extends Error {
    static [Gr] = "DrizzleError";
    constructor({ message: e, cause: t }) {
      super(e);
      ((this.name = "DrizzleError"), (this.cause = t));
    }
  }),
    (Lde = class e extends Error {
      static [Gr] = "DrizzleQueryError";
      constructor(t, r, s) {
        super(`Failed query: ${t}
params: ${r}`);
        if (
          ((this.query = t),
          (this.params = r),
          (this.cause = s),
          (this.name = "DrizzleQueryError"),
          Error.captureStackTrace(this, e),
          s)
        )
          this.cause = s;
      }
    }),
    (U_n = class extends aY {
      static [Gr] = "TransactionRollbackError";
      constructor() {
        super({ message: "Rollback" });
        this.name = "TransactionRollbackError";
      }
    }));
});