
var bFi = Ie(function (vFi) {
  Object.defineProperty(vFi, "__esModule", { value: !0 });
  var qX = fd(),
    GOa = {
      message({ keyword: e, schemaCode: t }) {
        return qX.str`must NOT have ${e === "maxProperties" ? "more" : "fewer"} than ${t} properties`;
      },
      params: ({ schemaCode: e }) => qX._`{limit: ${e}}`,
    },
    XOa = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: !0,
      error: GOa,
      code(e) {
        let { keyword: t, data: r, schemaCode: s } = e,
          a = t === "maxProperties" ? qX.operators.GT : qX.operators.LT;
        e.fail$data(qX._`Object.keys(${r}).length ${a} ${s}`);
      },
    };
  vFi.default = XOa;
});