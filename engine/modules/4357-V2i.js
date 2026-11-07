
var V2i = Ie(function (W2i) {
  Object.defineProperty(W2i, "__esModule", { value: !0 });
  var ece = fd(),
    Mbt = x_(),
    cNa = {
      message: ({ params: e }) => ece.str`must match "${e.ifClause}" schema`,
      params: ({ params: e }) => ece._`{failingKeyword: ${e.ifClause}}`,
    },
    ANa = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: !0,
      error: cNa,
      code(e) {
        let { gen: t, parentSchema: r, it: s } = e;
        if (r.then === void 0 && r.else === void 0)
          Mbt.checkStrictMode(s, '"if" without "then" and "else" is ignored');
        let a = R2i(s, "then"),
          H = R2i(s, "else");
        if (!a && !H) return;
        let u = t.let("valid", !0),
          f = t.name("_valid");
        if ((d(), e.reset(), a && H)) {
          let L = t.let("ifClause");
          (e.setParams({ ifClause: L }), t.if(f, _("then", L), _("else", L)));
        } else if (a) t.if(f, _("then"));
        else t.if(ece.not(f), _("else"));
        e.pass(u, () => e.error(!0));
        function d() {
          let L = e.subschema({ keyword: "if", compositeRule: !0, createErrors: !1, allErrors: !1 }, f);
          e.mergeEvaluated(L);
        }
        function _(L, I) {
          return () => {
            let D = e.subschema({ keyword: L }, f);
            if ((t.assign(u, f), e.mergeValidEvaluated(D, u), I)) t.assign(I, ece._`${L}`);
            else e.setParams({ ifClause: L });
          };
        }
      },
    };
  function R2i(e, t) {
    let r = e.schema[t];
    return r !== void 0 && !Mbt.alwaysValidSchema(e, r);
  }
  W2i.default = ANa;
});