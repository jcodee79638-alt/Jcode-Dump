
var OY = ne(() => {
  Gt();
  ud = class ud extends Error {
    static hasName(e, t) {
      return typeof e === "object" && e !== null && "name" in e && e.name === t;
    }
    static create(e, t) {
      return ud.createSchemaClass(e, GW(t) ? t : nt(t));
    }
    static createSchemaClass(e, t) {
      let r = nt({ name: ri(e), data: t }).annotate({ identifier: e }),
        s = class extends ud {
          data;
          static Schema = r;
          static EffectSchema = r;
          static tag = e;
          name = e;
          constructor(a, H) {
            super(e, H);
            this.data = a;
            this.name = e;
          }
          static isInstance(a) {
            return ud.hasName(a, e);
          }
          schema() {
            return r;
          }
          toObject() {
            return { name: e, data: this.data };
          }
        };
      return (Object.defineProperty(s, "name", { value: e }), s);
    }
    static Unknown = ud.create("UnknownError", { message: re, ref: be(re) });
  };
});