
var PXe = Ie(function (tNi) {
  Object.defineProperty(tNi, "__esModule", { value: !0 });
  tNi.extendErrors =
    tNi.resetErrorsCount =
    tNi.reportExtraError =
    tNi.reportError =
    tNi.keyword$DataError =
    tNi.keywordError =
      void 0;
  var aA = fd(),
    FHe = x_(),
    Kw = dee();
  tNi.keywordError = { message: ({ keyword: e }) => aA.str`must pass "${e}" keyword validation` };
  tNi.keyword$DataError = {
    message: ({ keyword: e, schemaType: t }) =>
      t ? aA.str`"${e}" keyword must be ${t} ($data)` : aA.str`"${e}" keyword is invalid ($data)`,
  };
  function Owa(e, t = tNi.keywordError, r, s) {
    let { it: a } = e,
      { gen: H, compositeRule: u, allErrors: f } = a,
      d = eNi(e, t, r);
    if (s !== null && s !== void 0 ? s : u || f) YUi(H, d);
    else ZUi(a, aA._`[${d}]`);
  }
  tNi.reportError = Owa;
  function Uwa(e, t = tNi.keywordError, r) {
    let { it: s } = e,
      { gen: a, compositeRule: H, allErrors: u } = s,
      f = eNi(e, t, r);
    if ((YUi(a, f), !(H || u))) ZUi(s, Kw.default.vErrors);
  }
  tNi.reportExtraError = Uwa;
  function Nwa(e, t) {
    (e.assign(Kw.default.errors, t),
      e.if(aA._`${Kw.default.vErrors} !== null`, () =>
        e.if(
          t,
          () => e.assign(aA._`${Kw.default.vErrors}.length`, t),
          () => e.assign(Kw.default.vErrors, null),
        ),
      ));
  }
  tNi.resetErrorsCount = Nwa;
  function Fwa({ gen: e, keyword: t, schemaValue: r, data: s, errsCount: a, it: H }) {
    if (a === void 0) throw Error("ajv implementation error");
    let u = e.name("err");
    e.forRange("i", a, Kw.default.errors, (f) => {
      if (
        (e.const(u, aA._`${Kw.default.vErrors}[${f}]`),
        e.if(aA._`${u}.instancePath === undefined`, () =>
          e.assign(aA._`${u}.instancePath`, aA.strConcat(Kw.default.instancePath, H.errorPath)),
        ),
        e.assign(aA._`${u}.schemaPath`, aA.str`${H.errSchemaPath}/${t}`),
        H.opts.verbose)
      )
        (e.assign(aA._`${u}.schema`, r), e.assign(aA._`${u}.data`, s));
    });
  }
  tNi.extendErrors = Fwa;
  function YUi(e, t) {
    let r = e.const("err", t);
    (e.if(
      aA._`${Kw.default.vErrors} === null`,
      () => e.assign(Kw.default.vErrors, aA._`[${r}]`),
      aA._`${Kw.default.vErrors}.push(${r})`,
    ),
      e.code(aA._`${Kw.default.errors}++`));
  }
  function ZUi(e, t) {
    let { gen: r, validateName: s, schemaEnv: a } = e;
    if (a.$async) r.throw(aA._`new ${e.ValidationError}(${t})`);
    else (r.assign(aA._`${s}.errors`, t), r.return(!1));
  }
  var Khe = {
    keyword: new aA.Name("keyword"),
    schemaPath: new aA.Name("schemaPath"),
    params: new aA.Name("params"),
    propertyName: new aA.Name("propertyName"),
    message: new aA.Name("message"),
    schema: new aA.Name("schema"),
    parentSchema: new aA.Name("parentSchema"),
  };
  function eNi(e, t, r) {
    let { createErrors: s } = e.it;
    if (s === !1) return aA._`{}`;
    return Bwa(e, t, r);
  }
  function Bwa(e, t, r = {}) {
    let { gen: s, it: a } = e,
      H = [Rwa(a, r), Wwa(e, r)];
    return (Vwa(e, t, H), s.object(...H));
  }
  function Rwa({ errorPath: e }, { instancePath: t }) {
    let r = t ? aA.str`${e}${FHe.getErrorPath(t, FHe.Type.Str)}` : e;
    return [Kw.default.instancePath, aA.strConcat(Kw.default.instancePath, r)];
  }
  function Wwa({ keyword: e, it: { errSchemaPath: t } }, { schemaPath: r, parentSchema: s }) {
    let a = s ? t : aA.str`${t}/${e}`;
    if (r) a = aA.str`${a}${FHe.getErrorPath(r, FHe.Type.Str)}`;
    return [Khe.schemaPath, a];
  }
  function Vwa(e, { params: t, message: r }, s) {
    let { keyword: a, data: H, schemaValue: u, it: f } = e,
      { opts: d, propertyName: _, topSchemaRef: L, schemaPath: I } = f;
    if ((s.push([Khe.keyword, a], [Khe.params, typeof t == "function" ? t(e) : t || aA._`{}`]), d.messages))
      s.push([Khe.message, typeof r == "function" ? r(e) : r]);
    if (d.verbose) s.push([Khe.schema, u], [Khe.parentSchema, aA._`${L}${I}`], [Kw.default.data, H]);
    if (_) s.push([Khe.propertyName, _]);
  }
});