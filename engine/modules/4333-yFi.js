
var yFi = Ie(function (DFi) {
  Object.defineProperty(DFi, "__esModule", { value: !0 });
  var J8 = fd(),
    IFi = x_(),
    NOa = EFi(),
    FOa = {
      message({ keyword: e, schemaCode: t }) {
        return J8.str`must NOT have ${e === "maxLength" ? "more" : "fewer"} than ${t} characters`;
      },
      params: ({ schemaCode: e }) => J8._`{limit: ${e}}`,
    },
    BOa = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: !0,
      error: FOa,
      code(e) {
        let { keyword: t, data: r, schemaCode: s, it: a } = e,
          H = t === "maxLength" ? J8.operators.GT : J8.operators.LT,
          u = a.opts.unicode === !1 ? J8._`${r}.length` : J8._`${IFi.useFunc(e.gen, NOa.default)}(${r})`;
        e.fail$data(J8._`${u} ${H} ${s}`);
      },
    };
  DFi.default = BOa;
});