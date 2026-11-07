
var j2i = Ie(function (b2i) {
  Object.defineProperty(b2i, "__esModule", { value: !0 });
  var v2i = x_(),
    eNa = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: !0,
      code(e) {
        let { gen: t, schema: r, it: s } = e;
        if (v2i.alwaysValidSchema(s, r)) {
          e.fail();
          return;
        }
        let a = t.name("valid");
        (e.subschema({ keyword: "not", compositeRule: !0, createErrors: !1, allErrors: !1 }, a),
          e.failResult(
            a,
            () => e.reset(),
            () => e.error(),
          ));
      },
      error: { message: "must NOT be valid" },
    };
  b2i.default = eNa;
});