
var a$r = ne(() => {
  RDi = class RDi extends ext {
    constructor() {
      super(...arguments);
      this.tokenize = lma;
    }
    equals(e, t, r) {
      if (r.ignoreWhitespace) {
        if (
          !r.newlineIsToken ||
          !e.includes(`
`)
        )
          e = e.trim();
        if (
          !r.newlineIsToken ||
          !t.includes(`
`)
        )
          t = t.trim();
      } else if (r.ignoreNewlineAtEof && !r.newlineIsToken) {
        if (
          e.endsWith(`
`)
        )
          e = e.slice(0, -1);
        if (
          t.endsWith(`
`)
        )
          t = t.slice(0, -1);
      }
      return super.equals(e, t, r);
    }
  };
  WDi = new RDi();
});