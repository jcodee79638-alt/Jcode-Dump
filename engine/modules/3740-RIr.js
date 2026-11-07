
var RIr = ne(() => {
  xTt = class xTt extends Error {
    constructor(e, t) {
      (super(e),
        (this.name = "ParseError"),
        (this.type = t.type),
        (this.field = t.field),
        (this.value = t.value),
        (this.line = t.line));
    }
  };
});