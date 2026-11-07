
var kFi = Ie(function (wFi) {
  Object.defineProperty(wFi, "__esModule", { value: !0 });
  var JX = fd(),
    YOa = {
      message({ keyword: e, schemaCode: t }) {
        return JX.str`must NOT have ${e === "maxItems" ? "more" : "fewer"} than ${t} items`;
      },
      params: ({ schemaCode: e }) => JX._`{limit: ${e}}`,
    },
    ZOa = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: !0,
      error: YOa,
      code(e) {
        let { keyword: t, data: r, schemaCode: s } = e,
          a = t === "maxItems" ? JX.operators.GT : JX.operators.LT;
        e.fail$data(JX._`${r}.length ${a} ${s}`);
      },
    };
  wFi.default = ZOa;
});