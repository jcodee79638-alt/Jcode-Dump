
var T2i = Ie(function (S2i) {
  Object.defineProperty(S2i, "__esModule", { value: !0 });
  var Ibt = JB(),
    YHe = fd(),
    Dbt = x_(),
    ybt = x_(),
    YUa = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(e) {
        let { gen: t, schema: r, data: s, parentSchema: a, it: H } = e,
          { opts: u } = H,
          f = Ibt.allSchemaProperties(r),
          d = f.filter((C) => Dbt.alwaysValidSchema(H, r[C]));
        if (f.length === 0 || (d.length === f.length && (!H.opts.unevaluated || H.props === !0))) return;
        let _ = u.strictSchema && !u.allowMatchingProperties && a.properties,
          L = t.name("valid");
        if (H.props !== !0 && !(H.props instanceof YHe.Name)) H.props = ybt.evaluatedPropsToName(t, H.props);
        let { props: I } = H;
        D();
        function D() {
          for (let C of f) {
            if (_) S(C);
            if (H.allErrors) T(C);
            else (t.var(L, !0), T(C), t.if(L));
          }
        }
        function S(C) {
          for (let O in _)
            if (new RegExp(C).test(O))
              Dbt.checkStrictMode(H, `property ${O} matches pattern ${C} (use allowMatchingProperties)`);
        }
        function T(C) {
          t.forIn("key", s, (O) => {
            t.if(YHe._`${Ibt.usePattern(e, C)}.test(${O})`, () => {
              let B = d.includes(C);
              if (!B)
                e.subschema(
                  { keyword: "patternProperties", schemaProp: C, dataProp: O, dataPropType: ybt.Type.Str },
                  L,
                );
              if (H.opts.unevaluated && I !== !0) t.assign(YHe._`${I}[${O}]`, !0);
              else if (!B && !H.allErrors) t.if(YHe.not(L), () => t.break());
            });
          });
        }
      },
    };
  S2i.default = YUa;
});