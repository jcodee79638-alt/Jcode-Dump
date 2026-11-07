
var uBi = Ie(function (ABi) {
  Object.defineProperty(ABi, "__esModule", { value: !0 });
  var zB = fd(),
    Xje = HBi(),
    Sbt = obt(),
    qNa = OXe(),
    cBi = x_(),
    GNa = {
      message: ({ params: { discrError: e, tagName: t } }) =>
        e === Xje.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
      params: ({ params: { discrError: e, tag: t, tagName: r } }) =>
        zB._`{error: ${e}, tag: ${r}, tagValue: ${t}}`,
    },
    XNa = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error: GNa,
      code(e) {
        let { gen: t, data: r, schema: s, parentSchema: a, it: H } = e,
          { oneOf: u } = a;
        if (!H.opts.discriminator) throw Error("discriminator: requires discriminator option");
        let f = s.propertyName;
        if (typeof f != "string") throw Error("discriminator: requires propertyName");
        if (s.mapping) throw Error("discriminator: mapping is not supported");
        if (!u) throw Error("discriminator: requires oneOf keyword");
        let d = t.let("valid", !1),
          _ = t.const("tag", zB._`${r}${zB.getProperty(f)}`);
        (t.if(
          zB._`typeof ${_} == "string"`,
          () => L(),
          () => e.error(!1, { discrError: Xje.DiscrError.Tag, tag: _, tagName: f }),
        ),
          e.ok(d));
        function L() {
          let S = D();
          t.if(!1);
          for (let T in S) (t.elseIf(zB._`${_} === ${T}`), t.assign(d, I(S[T])));
          (t.else(), e.error(!1, { discrError: Xje.DiscrError.Mapping, tag: _, tagName: f }), t.endIf());
        }
        function I(S) {
          let T = t.name("valid"),
            C = e.subschema({ keyword: "oneOf", schemaProp: S }, T);
          return (e.mergeEvaluated(C, zB.Name), T);
        }
        function D() {
          var S;
          let T = {},
            C = B(a),
            O = !0;
          for (let Z = 0; Z < u.length; Z++) {
            let se = u[Z];
            if (
              (se === null || se === void 0 ? void 0 : se.$ref) &&
              !cBi.schemaHasRulesButRef(se, H.self.RULES)
            ) {
              let z = se.$ref;
              if (
                ((se = Sbt.resolveRef.call(H.self, H.schemaEnv.root, H.baseId, z)),
                se instanceof Sbt.SchemaEnv)
              )
                se = se.schema;
              if (se === void 0) throw new qNa.default(H.opts.uriResolver, H.baseId, z);
            }
            let ae =
              (S = se === null || se === void 0 ? void 0 : se.properties) === null || S === void 0
                ? void 0
                : S[f];
            if (typeof ae != "object")
              throw Error(
                `discriminator: oneOf subschemas (or referenced schemas) must have "properties/${f}"`,
              );
            ((O = O && (C || B(se))), V(ae, Z));
          }
          if (!O) throw Error(`discriminator: "${f}" must be required`);
          return T;
          function B({ required: Z }) {
            return Array.isArray(Z) && Z.includes(f);
          }
          function V(Z, se) {
            if (Z.const) q(Z.const, se);
            else if (Z.enum) for (let ae of Z.enum) q(ae, se);
            else throw Error(`discriminator: "properties/${f}" must have "const" or "enum"`);
          }
          function q(Z, se) {
            if (typeof Z != "string" || Z in T)
              throw Error(`discriminator: "${f}" values must be unique strings`);
            T[Z] = se;
          }
        }
      },
    };
  ABi.default = XNa;
});