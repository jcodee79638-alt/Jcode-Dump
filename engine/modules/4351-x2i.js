
var x2i = Ie(function (M2i) {
  Object.defineProperty(M2i, "__esModule", { value: !0 });
  var y2i = kXe(),
    Ebt = JB(),
    Gje = x_(),
    D2i = Z1r(),
    zUa = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(e) {
        let { gen: t, schema: r, parentSchema: s, data: a, it: H } = e;
        if (H.opts.removeAdditional === "all" && s.additionalProperties === void 0)
          D2i.default.code(new y2i.KeywordCxt(H, D2i.default, "additionalProperties"));
        let u = Ebt.allSchemaProperties(r);
        for (let I of u) H.definedProperties.add(I);
        if (H.opts.unevaluated && u.length && H.props !== !0)
          H.props = Gje.mergeEvaluated.props(t, Gje.toHash(u), H.props);
        let f = u.filter((I) => !Gje.alwaysValidSchema(H, r[I]));
        if (f.length === 0) return;
        let d = t.name("valid");
        for (let I of f) {
          if (_(I)) L(I);
          else {
            if ((t.if(Ebt.propertyInData(t, a, I, H.opts.ownProperties)), L(I), !H.allErrors))
              t.else().var(d, !0);
            t.endIf();
          }
          (e.it.definedProperties.add(I), e.ok(d));
        }
        function _(I) {
          return H.opts.useDefaults && !H.compositeRule && r[I].default !== void 0;
        }
        function L(I) {
          e.subschema({ keyword: "properties", schemaProp: I, dataProp: I }, d);
        }
      },
    };
  M2i.default = zUa;
});