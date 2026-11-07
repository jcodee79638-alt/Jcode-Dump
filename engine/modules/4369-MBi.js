
var MBi = Ie(function (yBi) {
  Object.defineProperty(yBi, "__esModule", { value: !0 });
  yBi.formatLimitDefinition = void 0;
  var DBi = tMr(),
    VD = fd(),
    tce = VD.operators,
    vbt = {
      formatMaximum: { okStr: "<=", ok: tce.LTE, fail: tce.GT },
      formatMinimum: { okStr: ">=", ok: tce.GTE, fail: tce.LT },
      formatExclusiveMaximum: { okStr: "<", ok: tce.LT, fail: tce.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: tce.GT, fail: tce.LTE },
    },
    L9a = {
      message: ({ keyword: e, schemaCode: t }) => VD.str`should be ${vbt[e].okStr} ${t}`,
      params: ({ keyword: e, schemaCode: t }) => VD._`{comparison: ${vbt[e].okStr}, limit: ${t}}`,
    };
  yBi.formatLimitDefinition = {
    keyword: Object.keys(vbt),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: L9a,
    code(e) {
      let { gen: t, data: r, schemaCode: s, keyword: a, it: H } = e,
        { opts: u, self: f } = H;
      if (!u.validateFormats) return;
      let d = new DBi.KeywordCxt(H, f.RULES.all.format.definition, "format");
      if (d.$data) _();
      else L();
      function _() {
        let D = t.scopeValue("formats", { ref: f.formats, code: u.code.formats }),
          S = t.const("fmt", VD._`${D}[${d.schemaCode}]`);
        e.fail$data(
          VD.or(
            VD._`typeof ${S} != "object"`,
            VD._`${S} instanceof RegExp`,
            VD._`typeof ${S}.compare != "function"`,
            I(S),
          ),
        );
      }
      function L() {
        let D = d.schema,
          S = f.formats[D];
        if (!S || S === !0) return;
        if (typeof S != "object" || S instanceof RegExp || typeof S.compare != "function")
          throw Error(`"${a}": format "${D}" does not define "compare" function`);
        let T = t.scopeValue("formats", {
          key: D,
          ref: S,
          code: u.code.formats ? VD._`${u.code.formats}${VD.getProperty(D)}` : void 0,
        });
        e.fail$data(I(T));
      }
      function I(D) {
        return VD._`${D}.compare(${r}, ${s}) ${vbt[a].fail} 0`;
      }
    },
    dependencies: ["format"],
  };
  var $9a = (e) => (e.addKeyword(yBi.formatLimitDefinition), e);
  yBi.default = $9a;
});