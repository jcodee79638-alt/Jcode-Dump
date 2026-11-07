
var _Fi = Ie(function (mFi) {
  Object.defineProperty(mFi, "__esModule", { value: !0 });
  var XHe = fd(),
    GHe = XHe.operators,
    _bt = {
      maximum: { okStr: "<=", ok: GHe.LTE, fail: GHe.GT },
      minimum: { okStr: ">=", ok: GHe.GTE, fail: GHe.LT },
      exclusiveMaximum: { okStr: "<", ok: GHe.LT, fail: GHe.GTE },
      exclusiveMinimum: { okStr: ">", ok: GHe.GT, fail: GHe.LTE },
    },
    jOa = {
      message: ({ keyword: e, schemaCode: t }) => XHe.str`must be ${_bt[e].okStr} ${t}`,
      params: ({ keyword: e, schemaCode: t }) => XHe._`{comparison: ${_bt[e].okStr}, limit: ${t}}`,
    },
    POa = {
      keyword: Object.keys(_bt),
      type: "number",
      schemaType: "number",
      $data: !0,
      error: jOa,
      code(e) {
        let { keyword: t, data: r, schemaCode: s } = e;
        e.fail$data(XHe._`${r} ${_bt[t].fail} ${s} || isNaN(${r})`);
      },
    };
  mFi.default = POa;
});