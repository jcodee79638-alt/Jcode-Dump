
var BFi = Ie(function (FFi) {
  Object.defineProperty(FFi, "__esModule", { value: !0 });
  var Rje = CXe(),
    S_ = fd(),
    NFi = x_(),
    rUa = hbt(),
    nUa = {
      message: ({ params: { i: e, j: t } }) =>
        S_.str`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
      params: ({ params: { i: e, j: t } }) => S_._`{i: ${e}, j: ${t}}`,
    },
    iUa = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: !0,
      error: nUa,
      code(e) {
        let { gen: t, data: r, $data: s, schema: a, parentSchema: H, schemaCode: u, it: f } = e;
        if (!s && !a) return;
        let d = t.let("valid"),
          _ = H.items ? Rje.getSchemaTypes(H.items) : [];
        (e.block$data(d, L, S_._`${u} === false`), e.ok(d));
        function L() {
          let T = t.let("i", S_._`${r}.length`),
            C = t.let("j");
          (e.setParams({ i: T, j: C }), t.assign(d, !0), t.if(S_._`${T} > 1`, () => (I() ? D : S)(T, C)));
        }
        function I() {
          return _.length > 0 && !_.some((T) => T === "object" || T === "array");
        }
        function D(T, C) {
          let O = t.name("item"),
            B = Rje.checkDataTypes(_, O, f.opts.strictNumbers, Rje.DataType.Wrong),
            V = t.const("indices", S_._`{}`);
          t.for(S_._`;${T}--;`, () => {
            if ((t.let(O, S_._`${r}[${T}]`), t.if(B, S_._`continue`), _.length > 1))
              t.if(S_._`typeof ${O} == "string"`, S_._`${O} += "_"`);
            t.if(S_._`typeof ${V}[${O}] == "number"`, () => {
              (t.assign(C, S_._`${V}[${O}]`), e.error(), t.assign(d, !1).break());
            }).code(S_._`${V}[${O}] = ${T}`);
          });
        }
        function S(T, C) {
          let O = NFi.useFunc(t, rUa.default),
            B = t.name("outer");
          t.label(B).for(S_._`;${T}--;`, () =>
            t.for(S_._`${C} = ${T}; ${C}--;`, () =>
              t.if(S_._`${O}(${r}[${T}], ${r}[${C}])`, () => {
                (e.error(), t.assign(d, !1).break(B));
              }),
            ),
          );
        }
      },
    };
  FFi.default = iUa;
});