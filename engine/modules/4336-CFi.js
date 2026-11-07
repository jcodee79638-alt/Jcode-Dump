
var CFi = Ie(function (PFi) {
  Object.defineProperty(PFi, "__esModule", { value: !0 });
  var GX = JB(),
    XX = fd(),
    jFi = x_(),
    KOa = {
      message: ({ params: { missingProperty: e } }) => XX.str`must have required property '${e}'`,
      params: ({ params: { missingProperty: e } }) => XX._`{missingProperty: ${e}}`,
    },
    zOa = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: !0,
      error: KOa,
      code(e) {
        let { gen: t, schema: r, schemaCode: s, data: a, $data: H, it: u } = e,
          { opts: f } = u;
        if (!H && r.length === 0) return;
        let d = r.length >= f.loopRequired;
        if (u.allErrors) _();
        else L();
        if (f.strictRequired) {
          let S = e.parentSchema.properties,
            { definedProperties: T } = e.it;
          for (let C of r)
            if ((S === null || S === void 0 ? void 0 : S[C]) === void 0 && !T.has(C)) {
              let O = u.schemaEnv.baseId + u.errSchemaPath,
                B = `required property "${C}" is not defined at "${O}" (strictRequired)`;
              jFi.checkStrictMode(u, B, u.opts.strictRequired);
            }
        }
        function _() {
          if (d || H) e.block$data(XX.nil, I);
          else for (let S of r) GX.checkReportMissingProp(e, S);
        }
        function L() {
          let S = t.let("missing");
          if (d || H) {
            let T = t.let("valid", !0);
            (e.block$data(T, () => D(S, T)), e.ok(T));
          } else (t.if(GX.checkMissingProp(e, r, S)), GX.reportMissingProp(e, S), t.else());
        }
        function I() {
          t.forOf("prop", s, (S) => {
            (e.setParams({ missingProperty: S }),
              t.if(GX.noPropertyInData(t, a, S, f.ownProperties), () => e.error()));
          });
        }
        function D(S, T) {
          (e.setParams({ missingProperty: S }),
            t.forOf(
              S,
              s,
              () => {
                (t.assign(T, GX.propertyInData(t, a, S, f.ownProperties)),
                  t.if(XX.not(T), () => {
                    (e.error(), t.break());
                  }));
              },
              XX.nil,
            ));
        }
      },
    };
  PFi.default = zOa;
});