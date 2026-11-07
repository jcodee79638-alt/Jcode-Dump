
var mrr = ne(() => {
  Ba();
  ((jqs = class {
    static [Gr] = "ConsoleLogWriter";
    write(e) {
      console.log(e);
    }
  }),
    (rLn = class {
      static [Gr] = "DefaultLogger";
      writer;
      constructor(e) {
        this.writer = e?.writer ?? new jqs();
      }
      logQuery(e, t) {
        let r = t.map((a) => {
            try {
              return JSON.stringify(a);
            } catch {
              return String(a);
            }
          }),
          s = r.length ? ` -- params: [${r.join(", ")}]` : "";
        this.writer.write(`Query: ${e}${s}`);
      }
    }),
    (nLn = class {
      static [Gr] = "NoopLogger";
      logQuery() {}
    }));
});