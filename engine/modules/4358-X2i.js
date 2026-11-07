
var X2i = Ie(function (G2i) {
  Object.defineProperty(G2i, "__esModule", { value: !0 });
  var q2i = x_(),
    lNa = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword: e, parentSchema: t, it: r }) {
        if (t.if === void 0) q2i.checkStrictMode(r, `"${e}" without "if" is ignored`);
      },
    };
  G2i.default = lNa;
});