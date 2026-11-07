
var l2i = Ie(function (u2i) {
  Object.defineProperty(u2i, "__esModule", { value: !0 });
  var FE = fd(),
    KHe = x_(),
    kUa = {
      message: ({ params: { min: e, max: t } }) =>
        t === void 0
          ? FE.str`must contain at least ${e} valid item(s)`
          : FE.str`must contain at least ${e} and no more than ${t} valid item(s)`,
      params: ({ params: { min: e, max: t } }) =>
        t === void 0 ? FE._`{minContains: ${e}}` : FE._`{minContains: ${e}, maxContains: ${t}}`,
    },
    OUa = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: !0,
      error: kUa,
      code(e) {
        let { gen: t, schema: r, parentSchema: s, data: a, it: H } = e,
          u,
          f,
          { minContains: d, maxContains: _ } = s;
        if (H.opts.next) ((u = d === void 0 ? 1 : d), (f = _));
        else u = 1;
        let L = t.const("len", FE._`${a}.length`);
        if ((e.setParams({ min: u, max: f }), f === void 0 && u === 0)) {
          KHe.checkStrictMode(H, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
          return;
        }
        if (f !== void 0 && u > f) {
          (KHe.checkStrictMode(H, '"minContains" > "maxContains" is always invalid'), e.fail());
          return;
        }
        if (KHe.alwaysValidSchema(H, r)) {
          let C = FE._`${L} >= ${u}`;
          if (f !== void 0) C = FE._`${C} && ${L} <= ${f}`;
          e.pass(C);
          return;
        }
        H.items = !0;
        let I = t.name("valid");
        if (f === void 0 && u === 1) S(I, () => t.if(I, () => t.break()));
        else if (u === 0) {
          if ((t.let(I, !0), f !== void 0)) t.if(FE._`${a}.length > 0`, D);
        } else (t.let(I, !1), D());
        e.result(I, () => e.reset());
        function D() {
          let C = t.name("_valid"),
            O = t.let("count", 0);
          S(C, () => t.if(C, () => T(O)));
        }
        function S(C, O) {
          t.forRange("i", 0, L, (B) => {
            (e.subschema(
              { keyword: "contains", dataProp: B, dataPropType: KHe.Type.Num, compositeRule: !0 },
              C,
            ),
              O());
          });
        }
        function T(C) {
          if ((t.code(FE._`${C}++`), f === void 0)) t.if(FE._`${C} >= ${u}`, () => t.assign(I, !0).break());
          else if ((t.if(FE._`${C} > ${f}`, () => t.assign(I, !1).break()), u === 1)) t.assign(I, !0);
          else t.if(FE._`${C} >= ${u}`, () => t.assign(I, !0));
        }
      },
    };
  u2i.default = OUa;
});