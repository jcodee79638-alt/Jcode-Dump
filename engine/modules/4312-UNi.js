
var UNi = Ie(function (kNi) {
  Object.defineProperty(kNi, "__esModule", { value: !0 });
  kNi.validateKeywordUsage = kNi.validSchemaType = kNi.funcKeywordCode = kNi.macroKeywordCode = void 0;
  var $L = fd(),
    zhe = dee(),
    PNi = JB(),
    CNi = PXe();
  function Vka(e, t) {
    let { gen: r, keyword: s, schema: a, parentSchema: H, it: u } = e,
      f = t.macro.call(u.self, a, H, u),
      d = wNi(r, s, f);
    if (u.opts.validateSchema !== !1) u.self.validateSchema(f, !0);
    let _ = r.name("valid");
    (e.subschema(
      {
        schema: f,
        schemaPath: $L.nil,
        errSchemaPath: `${u.errSchemaPath}/${s}`,
        topSchemaRef: d,
        compositeRule: !0,
      },
      _,
    ),
      e.pass(_, () => e.error(!0)));
  }
  kNi.macroKeywordCode = Vka;
  function qka(e, t) {
    var r;
    let { gen: s, keyword: a, schema: H, parentSchema: u, $data: f, it: d } = e;
    Xka(d, t);
    let _ = !f && t.compile ? t.compile.call(d.self, H, u, d) : t.validate,
      L = wNi(s, a, _),
      I = s.let("valid");
    (e.block$data(I, D), e.ok((r = t.valid) !== null && r !== void 0 ? r : I));
    function D() {
      if (t.errors === !1) {
        if ((C(), t.modifying)) jNi(e);
        O(() => e.error());
      } else {
        let B = t.async ? S() : T();
        if (t.modifying) jNi(e);
        O(() => Gka(e, B));
      }
    }
    function S() {
      let B = s.let("ruleErrs", null);
      return (
        s.try(
          () => C($L._`await `),
          (V) =>
            s.assign(I, !1).if(
              $L._`${V} instanceof ${d.ValidationError}`,
              () => s.assign(B, $L._`${V}.errors`),
              () => s.throw(V),
            ),
        ),
        B
      );
    }
    function T() {
      let B = $L._`${L}.errors`;
      return (s.assign(B, null), C($L.nil), B);
    }
    function C(B = t.async ? $L._`await ` : $L.nil) {
      let V = d.opts.passContext ? zhe.default.this : zhe.default.self,
        q = !(("compile" in t && !f) || t.schema === !1);
      s.assign(I, $L._`${B}${PNi.callValidateCode(e, L, V, q)}`, t.modifying);
    }
    function O(B) {
      var V;
      s.if($L.not((V = t.valid) !== null && V !== void 0 ? V : I), B);
    }
  }
  kNi.funcKeywordCode = qka;
  function jNi(e) {
    let { gen: t, data: r, it: s } = e;
    t.if(s.parentData, () => t.assign(r, $L._`${s.parentData}[${s.parentDataProperty}]`));
  }
  function Gka(e, t) {
    let { gen: r } = e;
    r.if(
      $L._`Array.isArray(${t})`,
      () => {
        (r
          .assign(
            zhe.default.vErrors,
            $L._`${zhe.default.vErrors} === null ? ${t} : ${zhe.default.vErrors}.concat(${t})`,
          )
          .assign(zhe.default.errors, $L._`${zhe.default.vErrors}.length`),
          CNi.extendErrors(e));
      },
      () => e.error(),
    );
  }
  function Xka({ schemaEnv: e }, t) {
    if (t.async && !e.$async) throw Error("async keyword in sync schema");
  }
  function wNi(e, t, r) {
    if (r === void 0) throw Error(`keyword "${t}" failed to compile`);
    return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: $L.stringify(r) });
  }
  function Jka(e, t, r = !1) {
    return (
      !t.length ||
      t.some((s) =>
        s === "array"
          ? Array.isArray(e)
          : s === "object"
            ? e && typeof e == "object" && !Array.isArray(e)
            : typeof e == s || (r && typeof e > "u"),
      )
    );
  }
  kNi.validSchemaType = Jka;
  function Kka({ schema: e, opts: t, self: r, errSchemaPath: s }, a, H) {
    if (Array.isArray(a.keyword) ? !a.keyword.includes(H) : a.keyword !== H)
      throw Error("ajv implementation error");
    let u = a.dependencies;
    if (u === null || u === void 0 ? void 0 : u.some((f) => !Object.prototype.hasOwnProperty.call(e, f)))
      throw Error(`parent schema must have dependencies of ${H}: ${u.join(",")}`);
    if (a.validateSchema) {
      if (!a.validateSchema(e[H])) {
        let d = `keyword "${H}" value is invalid at path "${s}": ` + r.errorsText(a.validateSchema.errors);
        if (t.validateSchema === "log") r.logger.error(d);
        else throw Error(d);
      }
    }
  }
  kNi.validateKeywordUsage = Kka;
});