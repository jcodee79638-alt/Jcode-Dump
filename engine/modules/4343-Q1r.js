
var Q1r = Ie(function (QFi) {
  Object.defineProperty(QFi, "__esModule", { value: !0 });
  QFi.validateAdditionalItems = void 0;
  var K8 = fd(),
    Vje = x_(),
    MUa = {
      message: ({ params: { len: e } }) => K8.str`must NOT have more than ${e} items`,
      params: ({ params: { len: e } }) => K8._`{limit: ${e}}`,
    },
    xUa = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error: MUa,
      code(e) {
        let { parentSchema: t, it: r } = e,
          { items: s } = t;
        if (!Array.isArray(s)) {
          Vje.checkStrictMode(r, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        zFi(e, s);
      },
    };
  function zFi(e, t) {
    let { gen: r, schema: s, data: a, keyword: H, it: u } = e;
    u.items = !0;
    let f = r.const("len", K8._`${a}.length`);
    if (s === !1) (e.setParams({ len: t.length }), e.pass(K8._`${f} <= ${t.length}`));
    else if (typeof s == "object" && !Vje.alwaysValidSchema(u, s)) {
      let _ = r.var("valid", K8._`${f} <= ${t.length}`);
      (r.if(K8.not(_), () => d(_)), e.ok(_));
    }
    function d(_) {
      r.forRange("i", t.length, f, (L) => {
        if ((e.subschema({ keyword: H, dataProp: L, dataPropType: Vje.Type.Num }, _), !u.allErrors))
          r.if(K8.not(_), () => r.break());
      });
    }
  }
  QFi.validateAdditionalItems = zFi;
  QFi.default = xUa;
});