
var Z1r = Ie(function (I2i) {
  Object.defineProperty(I2i, "__esModule", { value: !0 });
  var zHe = JB(),
    WD = fd(),
    GUa = dee(),
    QHe = x_(),
    XUa = {
      message: "must NOT have additional properties",
      params: ({ params: e }) => WD._`{additionalProperty: ${e.additionalProperty}}`,
    },
    JUa = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: !0,
      trackErrors: !0,
      error: XUa,
      code(e) {
        let { gen: t, schema: r, parentSchema: s, data: a, errsCount: H, it: u } = e;
        if (!H) throw Error("ajv implementation error");
        let { allErrors: f, opts: d } = u;
        if (((u.props = !0), d.removeAdditional !== "all" && QHe.alwaysValidSchema(u, r))) return;
        let _ = zHe.allSchemaProperties(s.properties),
          L = zHe.allSchemaProperties(s.patternProperties);
        (I(), e.ok(WD._`${H} === ${GUa.default.errors}`));
        function I() {
          t.forIn("key", a, (O) => {
            if (!_.length && !L.length) T(O);
            else t.if(D(O), () => T(O));
          });
        }
        function D(O) {
          let B;
          if (_.length > 8) {
            let V = QHe.schemaRefOrVal(u, s.properties, "properties");
            B = zHe.isOwnProperty(t, V, O);
          } else if (_.length) B = WD.or(..._.map((V) => WD._`${O} === ${V}`));
          else B = WD.nil;
          if (L.length) B = WD.or(B, ...L.map((V) => WD._`${zHe.usePattern(e, V)}.test(${O})`));
          return WD.not(B);
        }
        function S(O) {
          t.code(WD._`delete ${a}[${O}]`);
        }
        function T(O) {
          if (d.removeAdditional === "all" || (d.removeAdditional && r === !1)) {
            S(O);
            return;
          }
          if (r === !1) {
            if ((e.setParams({ additionalProperty: O }), e.error(), !f)) t.break();
            return;
          }
          if (typeof r == "object" && !QHe.alwaysValidSchema(u, r)) {
            let B = t.name("valid");
            if (d.removeAdditional === "failing")
              (C(O, B, !1),
                t.if(WD.not(B), () => {
                  (e.reset(), S(O));
                }));
            else if ((C(O, B), !f)) t.if(WD.not(B), () => t.break());
          }
        }
        function C(O, B, V) {
          let q = { keyword: "additionalProperties", dataProp: O, dataPropType: QHe.Type.Str };
          if (V === !1) Object.assign(q, { compositeRule: !0, createErrors: !1, allErrors: !1 });
          e.subschema(q, B);
        }
      },
    };
  I2i.default = JUa;
});