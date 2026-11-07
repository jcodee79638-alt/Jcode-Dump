
var BNi = Ie(function (NNi) {
  Object.defineProperty(NNi, "__esModule", { value: !0 });
  NNi.extendSubschemaMode = NNi.extendSubschemaData = NNi.getSubschema = void 0;
  var K1 = fd(),
    Zvt = x_();
  function Zka(
    e,
    { keyword: t, schemaProp: r, schema: s, schemaPath: a, errSchemaPath: H, topSchemaRef: u },
  ) {
    if (t !== void 0 && s !== void 0) throw Error('both "keyword" and "schema" passed, only one allowed');
    if (t !== void 0) {
      let f = e.schema[t];
      return r === void 0
        ? {
            schema: f,
            schemaPath: K1._`${e.schemaPath}${K1.getProperty(t)}`,
            errSchemaPath: `${e.errSchemaPath}/${t}`,
          }
        : {
            schema: f[r],
            schemaPath: K1._`${e.schemaPath}${K1.getProperty(t)}${K1.getProperty(r)}`,
            errSchemaPath: `${e.errSchemaPath}/${t}/${Zvt.escapeFragment(r)}`,
          };
    }
    if (s !== void 0) {
      if (a === void 0 || H === void 0 || u === void 0)
        throw Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return { schema: s, schemaPath: a, topSchemaRef: u, errSchemaPath: H };
    }
    throw Error('either "keyword" or "schema" must be passed');
  }
  NNi.getSubschema = Zka;
  function e6a(e, t, { dataProp: r, dataPropType: s, data: a, dataTypes: H, propertyName: u }) {
    if (a !== void 0 && r !== void 0) throw Error('both "data" and "dataProp" passed, only one allowed');
    let { gen: f } = t;
    if (r !== void 0) {
      let { errorPath: _, dataPathArr: L, opts: I } = t,
        D = f.let("data", K1._`${t.data}${K1.getProperty(r)}`, !0);
      (d(D),
        (e.errorPath = K1.str`${_}${Zvt.getErrorPath(r, s, I.jsPropertySyntax)}`),
        (e.parentDataProperty = K1._`${r}`),
        (e.dataPathArr = [...L, e.parentDataProperty]));
    }
    if (a !== void 0) {
      let _ = a instanceof K1.Name ? a : f.let("data", a, !0);
      if ((d(_), u !== void 0)) e.propertyName = u;
    }
    if (H) e.dataTypes = H;
    function d(_) {
      ((e.data = _),
        (e.dataLevel = t.dataLevel + 1),
        (e.dataTypes = []),
        (t.definedProperties = new Set()),
        (e.parentData = t.data),
        (e.dataNames = [...t.dataNames, _]));
    }
  }
  NNi.extendSubschemaData = e6a;
  function t6a(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: s, createErrors: a, allErrors: H }) {
    if (s !== void 0) e.compositeRule = s;
    if (a !== void 0) e.createErrors = a;
    if (H !== void 0) e.allErrors = H;
    ((e.jtdDiscriminator = t), (e.jtdMetadata = r));
  }
  NNi.extendSubschemaMode = t6a;
});