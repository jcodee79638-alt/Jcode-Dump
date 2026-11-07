
var U2i = Ie(function (O2i) {
  Object.defineProperty(O2i, "__esModule", { value: !0 });
  var ZHe = fd(),
    k2i = x_(),
    iNa = {
      message: "must match exactly one schema in oneOf",
      params: ({ params: e }) => ZHe._`{passingSchemas: ${e.passing}}`,
    },
    sNa = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: !0,
      error: iNa,
      code(e) {
        let { gen: t, schema: r, parentSchema: s, it: a } = e;
        if (!Array.isArray(r)) throw Error("ajv implementation error");
        if (a.opts.discriminator && s.discriminator) return;
        let H = r,
          u = t.let("valid", !1),
          f = t.let("passing", null),
          d = t.name("_valid");
        (e.setParams({ passing: f }),
          t.block(_),
          e.result(
            u,
            () => e.reset(),
            () => e.error(!0),
          ));
        function _() {
          H.forEach((L, I) => {
            let D;
            if (k2i.alwaysValidSchema(a, L)) t.var(d, !0);
            else D = e.subschema({ keyword: "oneOf", schemaProp: I, compositeRule: !0 }, d);
            if (I > 0)
              t.if(ZHe._`${d} && ${u}`)
                .assign(u, !1)
                .assign(f, ZHe._`[${f}, ${I}]`)
                .else();
            t.if(d, () => {
              if ((t.assign(u, !0), t.assign(f, I), D)) e.mergeEvaluated(D, ZHe.Name);
            });
          });
        }
      },
    };
  O2i.default = sNa;
});