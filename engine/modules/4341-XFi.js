
var XFi = Ie(function (GFi) {
  Object.defineProperty(GFi, "__esModule", { value: !0 });
  var KX = fd(),
    qFi = x_(),
    AUa = hbt(),
    uUa = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: e }) => KX._`{allowedValues: ${e}}`,
    },
    lUa = {
      keyword: "enum",
      schemaType: "array",
      $data: !0,
      error: uUa,
      code(e) {
        let { gen: t, data: r, $data: s, schema: a, schemaCode: H, it: u } = e;
        if (!s && a.length === 0) throw Error("enum must have non-empty array");
        let f = a.length >= u.opts.loopEnum,
          d,
          _ = () => (d !== null && d !== void 0 ? d : (d = qFi.useFunc(t, AUa.default))),
          L;
        if (f || s) ((L = t.let("valid")), e.block$data(L, I));
        else {
          if (!Array.isArray(a)) throw Error("ajv implementation error");
          let S = t.const("vSchema", H);
          L = KX.or(...a.map((T, C) => D(S, C)));
        }
        e.pass(L);
        function I() {
          (t.assign(L, !1),
            t.forOf("v", H, (S) => t.if(KX._`${_()}(${r}, ${S})`, () => t.assign(L, !0).break())));
        }
        function D(S, T) {
          let C = a[T];
          return typeof C === "object" && C !== null ? KX._`${_()}(${r}, ${S}[${T}])` : KX._`${r} === ${C}`;
        }
      },
    };
  GFi.default = lUa;
});