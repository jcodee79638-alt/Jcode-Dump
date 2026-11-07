
var fFi = Ie(function (uFi) {
  Object.defineProperty(uFi, "__esModule", { value: !0 });
  uFi.callRef = uFi.getValidate = void 0;
  var DOa = OXe(),
    dbt = JB(),
    V$ = fd(),
    Bje = dee(),
    mbt = obt(),
    qHe = x_(),
    yOa = {
      keyword: "$ref",
      schemaType: "string",
      code(e) {
        let { gen: t, schema: r, it: s } = e,
          { baseId: a, schemaEnv: H, validateName: u, opts: f, self: d } = s,
          { root: _ } = H;
        if ((r === "#" || r === "#/") && a === _.baseId) return I();
        let L = mbt.resolveRef.call(d, _, a, r);
        if (L === void 0) throw new DOa.default(s.opts.uriResolver, a, r);
        if (L instanceof mbt.SchemaEnv) return D(L);
        return S(L);
        function I() {
          if (H === _) return pbt(e, u, H, H.$async);
          let T = t.scopeValue("root", { ref: _ });
          return pbt(e, V$._`${T}.validate`, _, _.$async);
        }
        function D(T) {
          let C = AFi(e, T);
          pbt(e, C, T, T.$async);
        }
        function S(T) {
          let C = t.scopeValue(
              "schema",
              f.code.source === !0 ? { ref: T, code: V$.stringify(T) } : { ref: T },
            ),
            O = t.name("valid"),
            B = e.subschema(
              { schema: T, dataTypes: [], schemaPath: V$.nil, topSchemaRef: C, errSchemaPath: r },
              O,
            );
          (e.mergeEvaluated(B), e.ok(O));
        }
      },
    };
  function AFi(e, t) {
    let { gen: r } = e;
    return t.validate
      ? r.scopeValue("validate", { ref: t.validate })
      : V$._`${r.scopeValue("wrapper", { ref: t })}.validate`;
  }
  uFi.getValidate = AFi;
  function pbt(e, t, r, s) {
    let { gen: a, it: H } = e,
      { allErrors: u, schemaEnv: f, opts: d } = H,
      _ = d.passContext ? Bje.default.this : V$.nil;
    if (s) L();
    else I();
    function L() {
      if (!f.$async) throw Error("async schema referenced by sync schema");
      let T = a.let("valid");
      (a.try(
        () => {
          if ((a.code(V$._`await ${dbt.callValidateCode(e, t, _)}`), S(t), !u)) a.assign(T, !0);
        },
        (C) => {
          if ((a.if(V$._`!(${C} instanceof ${H.ValidationError})`, () => a.throw(C)), D(C), !u))
            a.assign(T, !1);
        },
      ),
        e.ok(T));
    }
    function I() {
      e.result(
        dbt.callValidateCode(e, t, _),
        () => S(t),
        () => D(t),
      );
    }
    function D(T) {
      let C = V$._`${T}.errors`;
      (a.assign(
        Bje.default.vErrors,
        V$._`${Bje.default.vErrors} === null ? ${C} : ${Bje.default.vErrors}.concat(${C})`,
      ),
        a.assign(Bje.default.errors, V$._`${Bje.default.vErrors}.length`));
    }
    function S(T) {
      var C;
      if (!H.opts.unevaluated) return;
      let O =
        (C = r === null || r === void 0 ? void 0 : r.validate) === null || C === void 0
          ? void 0
          : C.evaluated;
      if (H.props !== !0)
        if (O && !O.dynamicProps) {
          if (O.props !== void 0) H.props = qHe.mergeEvaluated.props(a, O.props, H.props);
        } else {
          let B = a.var("props", V$._`${T}.evaluated.props`);
          H.props = qHe.mergeEvaluated.props(a, B, H.props, V$.Name);
        }
      if (H.items !== !0)
        if (O && !O.dynamicItems) {
          if (O.items !== void 0) H.items = qHe.mergeEvaluated.items(a, O.items, H.items);
        } else {
          let B = a.var("items", V$._`${T}.evaluated.items`);
          H.items = qHe.mergeEvaluated.items(a, B, H.items, V$.Name);
        }
    }
  }
  uFi.callRef = pbt;
  uFi.default = yOa;
});