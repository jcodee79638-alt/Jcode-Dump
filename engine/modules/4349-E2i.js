
var E2i = Ie(function (g2i) {
  Object.defineProperty(g2i, "__esModule", { value: !0 });
  var gbt = fd(),
    $2i = x_(),
    WUa = {
      message: "property name must be valid",
      params: ({ params: e }) => gbt._`{propertyName: ${e.propertyName}}`,
    },
    VUa = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error: WUa,
      code(e) {
        let { gen: t, schema: r, data: s, it: a } = e;
        if ($2i.alwaysValidSchema(a, r)) return;
        let H = t.name("valid");
        (t.forIn("key", s, (u) => {
          (e.setParams({ propertyName: u }),
            e.subschema(
              {
                keyword: "propertyNames",
                data: u,
                dataTypes: ["string"],
                propertyName: u,
                compositeRule: !0,
              },
              H,
            ),
            t.if(gbt.not(H), () => {
              if ((e.error(!0), !a.allErrors)) t.break();
            }));
        }),
          e.ok(H));
      },
    };
  g2i.default = VUa;
});