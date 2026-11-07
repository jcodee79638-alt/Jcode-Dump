
var JB = Ie(function (vNi) {
  Object.defineProperty(vNi, "__esModule", { value: !0 });
  vNi.validateUnion =
    vNi.validateArray =
    vNi.usePattern =
    vNi.callValidateCode =
    vNi.schemaProperties =
    vNi.allSchemaProperties =
    vNi.noPropertyInData =
    vNi.propertyInData =
    vNi.isOwnProperty =
    vNi.hasPropFunc =
    vNi.reportMissingProp =
    vNi.checkMissingProp =
    vNi.checkReportMissingProp =
      void 0;
  var Vl = fd(),
    Cje = x_(),
    BHe = dee(),
    xNi = x_();
  function Eka(e, t) {
    let { gen: r, data: s, it: a } = e;
    r.if(j1r(r, s, t, a.opts.ownProperties), () => {
      (e.setParams({ missingProperty: Vl._`${t}` }, !0), e.error());
    });
  }
  vNi.checkReportMissingProp = Eka;
  function Ika({ gen: e, data: t, it: { opts: r } }, s, a) {
    return Vl.or(...s.map((H) => Vl.and(j1r(e, t, H, r.ownProperties), Vl._`${a} = ${H}`)));
  }
  vNi.checkMissingProp = Ika;
  function Dka(e, t) {
    (e.setParams({ missingProperty: t }, !0), e.error());
  }
  vNi.reportMissingProp = Dka;
  function SNi(e) {
    return e.scopeValue("func", {
      ref: Object.prototype.hasOwnProperty,
      code: Vl._`Object.prototype.hasOwnProperty`,
    });
  }
  vNi.hasPropFunc = SNi;
  function b1r(e, t, r) {
    return Vl._`${SNi(e)}.call(${t}, ${r})`;
  }
  vNi.isOwnProperty = b1r;
  function yka(e, t, r, s) {
    let a = Vl._`${t}${Vl.getProperty(r)} !== undefined`;
    return s ? Vl._`${a} && ${b1r(e, t, r)}` : a;
  }
  vNi.propertyInData = yka;
  function j1r(e, t, r, s) {
    let a = Vl._`${t}${Vl.getProperty(r)} === undefined`;
    return s ? Vl.or(a, Vl.not(b1r(e, t, r))) : a;
  }
  vNi.noPropertyInData = j1r;
  function TNi(e) {
    return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
  }
  vNi.allSchemaProperties = TNi;
  function Mka(e, t) {
    return TNi(t).filter((r) => !Cje.alwaysValidSchema(e, t[r]));
  }
  vNi.schemaProperties = Mka;
  function xka(
    { schemaCode: e, data: t, it: { gen: r, topSchemaRef: s, schemaPath: a, errorPath: H }, it: u },
    f,
    d,
    _,
  ) {
    let L = _ ? Vl._`${e}, ${t}, ${s}${a}` : t,
      I = [
        [BHe.default.instancePath, Vl.strConcat(BHe.default.instancePath, H)],
        [BHe.default.parentData, u.parentData],
        [BHe.default.parentDataProperty, u.parentDataProperty],
        [BHe.default.rootData, BHe.default.rootData],
      ];
    if (u.opts.dynamicRef) I.push([BHe.default.dynamicAnchors, BHe.default.dynamicAnchors]);
    let D = Vl._`${L}, ${r.object(...I)}`;
    return d !== Vl.nil ? Vl._`${f}.call(${d}, ${D})` : Vl._`${f}(${D})`;
  }
  vNi.callValidateCode = xka;
  var Ska = Vl._`new RegExp`;
  function Tka({ gen: e, it: { opts: t } }, r) {
    let s = t.unicodeRegExp ? "u" : "",
      { regExp: a } = t.code,
      H = a(r, s);
    return e.scopeValue("pattern", {
      key: H.toString(),
      ref: H,
      code: Vl._`${a.code === "new RegExp" ? Ska : xNi.useFunc(e, a)}(${r}, ${s})`,
    });
  }
  vNi.usePattern = Tka;
  function vka(e) {
    let { gen: t, data: r, keyword: s, it: a } = e,
      H = t.name("valid");
    if (a.allErrors) {
      let f = t.let("valid", !0);
      return (u(() => t.assign(f, !1)), f);
    }
    return (t.var(H, !0), u(() => t.break()), H);
    function u(f) {
      let d = t.const("len", Vl._`${r}.length`);
      t.forRange("i", 0, d, (_) => {
        (e.subschema({ keyword: s, dataProp: _, dataPropType: Cje.Type.Num }, H), t.if(Vl.not(H), f));
      });
    }
  }
  vNi.validateArray = vka;
  function bka(e) {
    let { gen: t, schema: r, keyword: s, it: a } = e;
    if (!Array.isArray(r)) throw Error("ajv implementation error");
    if (r.some((d) => Cje.alwaysValidSchema(a, d)) && !a.opts.unevaluated) return;
    let u = t.let("valid", !1),
      f = t.name("_valid");
    (t.block(() =>
      r.forEach((d, _) => {
        let L = e.subschema({ keyword: s, schemaProp: _, compositeRule: !0 }, f);
        if ((t.assign(u, Vl._`${u} || ${f}`), !e.mergeValidEvaluated(L, f))) t.if(Vl.not(u));
      }),
    ),
      e.result(
        u,
        () => e.reset(),
        () => e.error(!0),
      ));
  }
  vNi.validateUnion = bka;
});