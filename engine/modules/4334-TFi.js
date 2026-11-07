
var TFi = Ie(function (SFi) {
  Object.defineProperty(SFi, "__esModule", { value: !0 });
  var MFi = JB(),
    xFi = x_(),
    KB = fd(),
    WOa = {
      message: ({ schemaCode: e }) => KB.str`must match pattern "${e}"`,
      params: ({ schemaCode: e }) => KB._`{pattern: ${e}}`,
    },
    VOa = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: !0,
      error: WOa,
      code(e) {
        let { gen: t, data: r, $data: s, schema: a, schemaCode: H, it: u } = e,
          f = u.opts.unicodeRegExp ? "u" : "";
        if (s) {
          let { regExp: d } = u.opts.code,
            _ = d.code === "new RegExp" ? KB._`new RegExp` : xFi.useFunc(t, d),
            L = t.let("valid");
          (t.try(
            () => t.assign(L, KB._`${_}(${H}, ${f}).test(${r})`),
            () => t.assign(L, !1),
          ),
            e.fail$data(KB._`!${L}`));
        } else {
          let d = MFi.usePattern(e, a);
          e.fail$data(KB._`!${d}.test(${r})`);
        }
      },
    };
  SFi.default = VOa;
});