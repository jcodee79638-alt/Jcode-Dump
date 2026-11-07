
var kft = ne(() => {
  BH();
  KH();
  R_();
  jW();
  g1e();
  I2s = {
    [Pft]: Pft,
    pipe() {
      return vA(this, arguments);
    },
    annotate(e) {
      return this.rebuild(zye(this.ast, e));
    },
    annotateKey(e) {
      return this.rebuild(Wlt(this.ast, e));
    },
    check(...e) {
      return this.rebuild(Qye(this.ast, e));
    },
  };
  lG = class lG {
    [Cft] = Cft;
    _tag = "SchemaError";
    name = "SchemaError";
    issue;
    constructor(e) {
      this.issue = e;
    }
    get message() {
      return this.issue.toString();
    }
    toString() {
      return `SchemaError(${this.message})`;
    }
  };
  wft = sZt(D2s);
});