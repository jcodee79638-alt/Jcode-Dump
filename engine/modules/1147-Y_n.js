
var Y_n = ne(() => {
  hse();
  Ba();
  Ym();
  ((aqs = class extends RS {
    static [Gr] = "SQLiteBigIntBuilder";
    constructor(e) {
      super(e, "bigint int64", "SQLiteBigInt");
    }
    build(e) {
      return new Hqs(e, this.config);
    }
  }),
    (Hqs = class extends gD {
      static [Gr] = "SQLiteBigInt";
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue = (e) => {
        if (typeof e === "string") return BigInt(z_n(e));
        if (typeof Buffer < "u" && Buffer.from) {
          let t = Buffer.isBuffer(e)
            ? e
            : e instanceof ArrayBuffer
              ? Buffer.from(e)
              : e.buffer
                ? Buffer.from(e.buffer, e.byteOffset, e.byteLength)
                : Buffer.from(e);
          return BigInt(t.toString("utf8"));
        }
        return BigInt(jtr.decode(e));
      };
      mapToDriverValue = (e) => Buffer.from(e.toString());
    }),
    (cqs = class extends RS {
      static [Gr] = "SQLiteBlobJsonBuilder";
      constructor(e) {
        super(e, "object json", "SQLiteBlobJson");
      }
      build(e) {
        return new Aqs(e, this.config);
      }
    }),
    (Aqs = class extends gD {
      static [Gr] = "SQLiteBlobJson";
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue = (e) => {
        if (typeof e === "string") return JSON.parse(z_n(e));
        if (typeof Buffer < "u" && Buffer.from) {
          let t = Buffer.isBuffer(e)
            ? e
            : e instanceof ArrayBuffer
              ? Buffer.from(e)
              : e.buffer
                ? Buffer.from(e.buffer, e.byteOffset, e.byteLength)
                : Buffer.from(e);
          return JSON.parse(t.toString("utf8"));
        }
        return JSON.parse(jtr.decode(e));
      };
      mapToDriverValue = (e) => Buffer.from(JSON.stringify(e));
    }),
    (uqs = class extends RS {
      static [Gr] = "SQLiteBlobBufferBuilder";
      constructor(e) {
        super(e, "object buffer", "SQLiteBlobBuffer");
      }
      build(e) {
        return new lqs(e, this.config);
      }
    }),
    (lqs = class extends gD {
      static [Gr] = "SQLiteBlobBuffer";
      mapFromDriverValue = (e) => {
        if (Buffer.isBuffer(e)) return e;
        if (typeof e === "string") return Buffer.from(e, "hex");
        return Buffer.from(e);
      };
      getSQLType() {
        return "blob";
      }
    }));
});