
var VFi = Ie(function (WFi) {
  Object.defineProperty(WFi, "__esModule", { value: !0 });
  var Wje = fd(),
    RFi = x_(),
    oUa = hbt(),
    aUa = {
      message: "must be equal to constant",
      params: ({ schemaCode: e }) => Wje._`{allowedValue: ${e}}`,
    },
    HUa = {
      keyword: "const",
      $data: !0,
      error: aUa,
      code(e) {
        let { gen: t, data: r, $data: s, schemaCode: a, schema: H } = e;
        if (s || (H && typeof H == "object")) e.fail$data(Wje._`!${RFi.useFunc(t, oUa.default)}(${r}, ${a})`);
        else e.fail(Wje._`${H} !== ${r}`);
      },
    };
  WFi.default = HUa;
});