
var Y1r = Ie(function (t2i) {
  Object.defineProperty(t2i, "__esModule", { value: !0 });
  t2i.validateTuple = void 0;
  var Lbt = fd(),
    JHe = x_(),
    ZFi = JB(),
    TUa = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(e) {
        let { schema: t, it: r } = e;
        if (Array.isArray(t)) return e2i(e, "additionalItems", t);
        if (((r.items = !0), JHe.alwaysValidSchema(r, t))) return;
        e.ok(ZFi.validateArray(e));
      },
    };
  function e2i(e, t, r = e.schema) {
    let { gen: s, parentSchema: a, data: H, keyword: u, it: f } = e;
    if ((L(a), f.opts.unevaluated && r.length && f.items !== !0))
      f.items = JHe.mergeEvaluated.items(s, r.length, f.items);
    let d = s.name("valid"),
      _ = s.const("len", Lbt._`${H}.length`);
    r.forEach((I, D) => {
      if (JHe.alwaysValidSchema(f, I)) return;
      (s.if(Lbt._`${_} > ${D}`, () => e.subschema({ keyword: u, schemaProp: D, dataProp: D }, d)), e.ok(d));
    });
    function L(I) {
      let { opts: D, errSchemaPath: S } = f,
        T = r.length,
        C = T === I.minItems && (T === I.maxItems || I[t] === !1);
      if (D.strictTuples && !C) {
        let O = `"${u}" is ${T}-tuple, but minItems or maxItems/${t} are not specified or different at path "${S}"`;
        JHe.checkStrictMode(f, O, D.strictTuples);
      }
    }
  }
  t2i.validateTuple = e2i;
  t2i.default = TUa;
});