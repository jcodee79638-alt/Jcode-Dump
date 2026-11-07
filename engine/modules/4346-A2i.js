
var A2i = Ie(function (c2i) {
  Object.defineProperty(c2i, "__esModule", { value: !0 });
  var $bt = fd(),
    o2i = x_(),
    a2i = JB(),
    H2i = Q1r(),
    PUa = {
      message: ({ params: { len: e } }) => $bt.str`must NOT have more than ${e} items`,
      params: ({ params: { len: e } }) => $bt._`{limit: ${e}}`,
    },
    CUa = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error: PUa,
      code(e) {
        let { schema: t, parentSchema: r, it: s } = e,
          { prefixItems: a } = r;
        if (((s.items = !0), o2i.alwaysValidSchema(s, t))) return;
        if (a) H2i.validateAdditionalItems(e, a);
        else e.ok(a2i.validateArray(e));
      },
    };
  c2i.default = CUa;
});