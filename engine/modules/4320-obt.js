
var obt = Ie(function (L9i) {
  Object.defineProperty(L9i, "__esModule", { value: !0 });
  L9i.resolveSchema = L9i.getCompilingSchema = L9i.resolveRef = L9i.compileSchema = L9i.SchemaEnv = void 0;
  var BD = fd(),
    V6a = nbt(),
    Qhe = dee(),
    RD = wXe(),
    ibt = x_(),
    _9i = kXe();
  class UXe {
    constructor(e) {
      var t;
      ((this.refs = {}), (this.dynamicAnchors = {}));
      let r;
      if (typeof e.schema == "object") r = e.schema;
      ((this.schema = e.schema),
        (this.schemaId = e.schemaId),
        (this.root = e.root || this),
        (this.baseId =
          (t = e.baseId) !== null && t !== void 0
            ? t
            : RD.normalizeId(r === null || r === void 0 ? void 0 : r[e.schemaId || "$id"])),
        (this.schemaPath = e.schemaPath),
        (this.localRefs = e.localRefs),
        (this.meta = e.meta),
        (this.$async = r === null || r === void 0 ? void 0 : r.$async),
        (this.refs = {}));
    }
  }
  L9i.SchemaEnv = UXe;
  function U1r(e) {
    let t = h9i.call(this, e);
    if (t) return t;
    let r = RD.getFullPath(this.opts.uriResolver, e.root.baseId),
      { es5: s, lines: a } = this.opts.code,
      { ownProperties: H } = this.opts,
      u = new BD.CodeGen(this.scope, { es5: s, lines: a, ownProperties: H }),
      f;
    if (e.$async)
      f = u.scopeValue("Error", {
        ref: V6a.default,
        code: BD._`require("ajv/dist/runtime/validation_error").default`,
      });
    let d = u.scopeName("validate");
    e.validateName = d;
    let _ = {
        gen: u,
        allErrors: this.opts.allErrors,
        data: Qhe.default.data,
        parentData: Qhe.default.parentData,
        parentDataProperty: Qhe.default.parentDataProperty,
        dataNames: [Qhe.default.data],
        dataPathArr: [BD.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: u.scopeValue(
          "schema",
          this.opts.code.source === !0 ? { ref: e.schema, code: BD.stringify(e.schema) } : { ref: e.schema },
        ),
        validateName: d,
        ValidationError: f,
        schema: e.schema,
        schemaEnv: e,
        rootId: r,
        baseId: e.baseId || r,
        schemaPath: BD.nil,
        errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: BD._`""`,
        opts: this.opts,
        self: this,
      },
      L;
    try {
      (this._compilations.add(e), _9i.validateFunctionCode(_), u.optimize(this.opts.code.optimize));
      let I = u.toString();
      if (((L = `${u.scopeRefs(Qhe.default.scope)}return ${I}`), this.opts.code.process))
        L = this.opts.code.process(L, e);
      let S = Function(`${Qhe.default.self}`, `${Qhe.default.scope}`, L)(this, this.scope.get());
      if (
        (this.scope.value(d, { ref: S }),
        (S.errors = null),
        (S.schema = e.schema),
        (S.schemaEnv = e),
        e.$async)
      )
        S.$async = !0;
      if (this.opts.code.source === !0)
        S.source = { validateName: d, validateCode: I, scopeValues: u._values };
      if (this.opts.unevaluated) {
        let { props: T, items: C } = _;
        if (
          ((S.evaluated = {
            props: T instanceof BD.Name ? void 0 : T,
            items: C instanceof BD.Name ? void 0 : C,
            dynamicProps: T instanceof BD.Name,
            dynamicItems: C instanceof BD.Name,
          }),
          S.source)
        )
          S.source.evaluated = BD.stringify(S.evaluated);
      }
      return ((e.validate = S), e);
    } catch (I) {
      if ((delete e.validate, delete e.validateName, L))
        this.logger.error("Error compiling schema, function code:", L);
      throw I;
    } finally {
      this._compilations.delete(e);
    }
  }
  L9i.compileSchema = U1r;
  function q6a(e, t, r) {
    var s;
    r = RD.resolveUrl(this.opts.uriResolver, t, r);
    let a = e.refs[r];
    if (a) return a;
    let H = J6a.call(this, e, r);
    if (H === void 0) {
      let u = (s = e.localRefs) === null || s === void 0 ? void 0 : s[r],
        { schemaId: f } = this.opts;
      if (u) H = new UXe({ schema: u, schemaId: f, root: e, baseId: t });
    }
    if (H === void 0) return;
    return (e.refs[r] = G6a.call(this, H));
  }
  L9i.resolveRef = q6a;
  function G6a(e) {
    if (RD.inlineRef(e.schema, this.opts.inlineRefs)) return e.schema;
    return e.validate ? e : U1r.call(this, e);
  }
  function h9i(e) {
    for (let t of this._compilations) if (X6a(t, e)) return t;
  }
  L9i.getCompilingSchema = h9i;
  function X6a(e, t) {
    return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
  }
  function J6a(e, t) {
    let r;
    while (typeof (r = this.refs[t]) == "string") t = r;
    return r || this.schemas[t] || sbt.call(this, e, t);
  }
  function sbt(e, t) {
    let r = this.opts.uriResolver.parse(t),
      s = RD._getFullPath(this.opts.uriResolver, r),
      a = RD.getFullPath(this.opts.uriResolver, e.baseId, void 0);
    if (Object.keys(e.schema).length > 0 && s === a) return O1r.call(this, r, e);
    let H = RD.normalizeId(s),
      u = this.refs[H] || this.schemas[H];
    if (typeof u == "string") {
      let f = sbt.call(this, e, u);
      if (typeof (f === null || f === void 0 ? void 0 : f.schema) !== "object") return;
      return O1r.call(this, r, f);
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.schema) !== "object") return;
    if (!u.validate) U1r.call(this, u);
    if (H === RD.normalizeId(t)) {
      let { schema: f } = u,
        { schemaId: d } = this.opts,
        _ = f[d];
      if (_) a = RD.resolveUrl(this.opts.uriResolver, a, _);
      return new UXe({ schema: f, schemaId: d, root: e, baseId: a });
    }
    return O1r.call(this, r, u);
  }
  L9i.resolveSchema = sbt;
  var K6a = new Set(["properties", "patternProperties", "enum", "dependencies", "definitions"]);
  function O1r(e, { baseId: t, schema: r, root: s }) {
    var a;
    if (((a = e.fragment) === null || a === void 0 ? void 0 : a[0]) !== "/") return;
    for (let f of e.fragment.slice(1).split("/")) {
      if (typeof r === "boolean") return;
      let d = r[ibt.unescapeFragment(f)];
      if (d === void 0) return;
      r = d;
      let _ = typeof r === "object" && r[this.opts.schemaId];
      if (!K6a.has(f) && _) t = RD.resolveUrl(this.opts.uriResolver, t, _);
    }
    let H;
    if (typeof r != "boolean" && r.$ref && !ibt.schemaHasRulesButRef(r, this.RULES)) {
      let f = RD.resolveUrl(this.opts.uriResolver, t, r.$ref);
      H = sbt.call(this, s, f);
    }
    let { schemaId: u } = this.opts;
    if (((H = H || new UXe({ schema: r, schemaId: u, root: s, baseId: t })), H.schema !== H.root.schema))
      return H;
    return;
  }
});