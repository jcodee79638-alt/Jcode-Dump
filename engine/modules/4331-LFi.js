
var LFi = Ie(function (hFi) {
  Object.defineProperty(hFi, "__esModule", { value: !0 });
  var VX = fd(),
    wOa = {
      message: ({ schemaCode: e }) => VX.str`must be multiple of ${e}`,
      params: ({ schemaCode: e }) => VX._`{multipleOf: ${e}}`,
    },
    kOa = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: !0,
      error: wOa,
      code(e) {
        let { gen: t, data: r, schemaCode: s, it: a } = e,
          H = a.opts.multipleOfPrecision,
          u = t.let("res"),
          f = H ? VX._`Math.abs(Math.round(${u}) - ${u}) > 1e-${H}` : VX._`${u} !== parseInt(${u})`;
        e.fail$data(VX._`(${s} === 0 || (${u} = ${r}/${s}, ${f}))`);
      },
    };
  hFi.default = kOa;
});