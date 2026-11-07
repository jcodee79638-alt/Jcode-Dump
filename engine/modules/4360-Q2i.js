
var Q2i = Ie(function (z2i) {
  Object.defineProperty(z2i, "__esModule", { value: !0 });
  var Op = fd(),
    jNa = {
      message: ({ schemaCode: e }) => Op.str`must match format "${e}"`,
      params: ({ schemaCode: e }) => Op._`{format: ${e}}`,
    },
    PNa = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: !0,
      error: jNa,
      code(e, t) {
        let { gen: r, data: s, $data: a, schema: H, schemaCode: u, it: f } = e,
          { opts: d, errSchemaPath: _, schemaEnv: L, self: I } = f;
        if (!d.validateFormats) return;
        if (a) D();
        else S();
        function D() {
          let T = r.scopeValue("formats", { ref: I.formats, code: d.code.formats }),
            C = r.const("fDef", Op._`${T}[${u}]`),
            O = r.let("fType"),
            B = r.let("format");
          (r.if(
            Op._`typeof ${C} == "object" && !(${C} instanceof RegExp)`,
            () => r.assign(O, Op._`${C}.type || "string"`).assign(B, Op._`${C}.validate`),
            () => r.assign(O, Op._`"string"`).assign(B, C),
          ),
            e.fail$data(Op.or(V(), q())));
          function V() {
            if (d.strictSchema === !1) return Op.nil;
            return Op._`${u} && !${B}`;
          }
          function q() {
            let Z = L.$async ? Op._`(${C}.async ? await ${B}(${s}) : ${B}(${s}))` : Op._`${B}(${s})`,
              se = Op._`(typeof ${B} == "function" ? ${Z} : ${B}.test(${s}))`;
            return Op._`${B} && ${B} !== true && ${O} === ${t} && !${se}`;
          }
        }
        function S() {
          let T = I.formats[H];
          if (!T) {
            V();
            return;
          }
          if (T === !0) return;
          let [C, O, B] = q(T);
          if (C === t) e.pass(Z());
          function V() {
            if (d.strictSchema === !1) {
              I.logger.warn(se());
              return;
            }
            throw Error(se());
            function se() {
              return `unknown format "${H}" ignored in schema at path "${_}"`;
            }
          }
          function q(se) {
            let ae =
                se instanceof RegExp
                  ? Op.regexpCode(se)
                  : d.code.formats
                    ? Op._`${d.code.formats}${Op.getProperty(H)}`
                    : void 0,
              z = r.scopeValue("formats", { key: H, ref: se, code: ae });
            if (typeof se == "object" && !(se instanceof RegExp))
              return [se.type || "string", se.validate, Op._`${z}.validate`];
            return ["string", se, z];
          }
          function Z() {
            if (typeof T == "object" && !(T instanceof RegExp) && T.async) {
              if (!L.$async) throw Error("async format in sync schema");
              return Op._`await ${B}(${s})`;
            }
            return typeof O == "function" ? Op._`${B}(${s})` : Op._`${B}.test(${s})`;
          }
        }
      },
    };
  z2i.default = PNa;
});