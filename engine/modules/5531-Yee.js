
var Yee = ne(() => {
  Gt();
  gQe();
  $Ki();
  Yee();
  ((zza = DI.check(gZt(0))),
    (jPr = DI.check(pG(0))),
    (Qza = nt({ query: nw(re), namespace: nw(re), limit: nw(zza), offset: nw(jPr) })),
    (Yza = nt({ path: re, description: re, signature: re })),
    (Zza = nt({ items: On(Yza), remaining: jPr, next: w6(nt({ offset: jPr })) })));
  yx = class yx extends Error {
    kind;
    suggestions;
    constructor(e, t, r = []) {
      super(t);
      this.kind = e;
      this.suggestions = r;
      this.name = "ToolRuntimeError";
    }
  };
  ((eQa = new Set(["__proto__", "constructor", "prototype"])), (iQa = xKi(`${KCt}.search`, SKi([]))));
});