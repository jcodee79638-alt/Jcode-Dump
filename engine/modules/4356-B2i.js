
var B2i = Ie(function (F2i) {
  Object.defineProperty(F2i, "__esModule", { value: !0 });
  var N2i = x_(),
    aNa = {
      keyword: "allOf",
      schemaType: "array",
      code(e) {
        let { gen: t, schema: r, it: s } = e;
        if (!Array.isArray(r)) throw Error("ajv implementation error");
        let a = t.name("valid");
        r.forEach((H, u) => {
          if (N2i.alwaysValidSchema(s, H)) return;
          let f = e.subschema({ keyword: "allOf", schemaProp: u }, a);
          (e.ok(a), e.mergeEvaluated(f));
        });
      },
    };
  F2i.default = aNa;
});