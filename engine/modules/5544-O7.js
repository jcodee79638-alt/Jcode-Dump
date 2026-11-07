
var O7 = ne(() => {
  k7 = Symbol("codemode.optional-short-circuit");
  is = class is extends Error {
    kind;
    suggestions;
    node;
    errorName = "Error";
    constructor(e, t, r = "ExecutionFailure", s) {
      super(e);
      this.kind = r;
      this.suggestions = s;
      if (((this.name = "InterpreterRuntimeError"), t)) this.node = t;
    }
    as(e) {
      return ((this.errorName = e), this);
    }
  };
});