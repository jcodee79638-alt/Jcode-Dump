
var kXe = Ie(function (u9i) {
  Object.defineProperty(u9i, "__esModule", { value: !0 });
  u9i.getData = u9i.KeywordCxt = u9i.validateFunctionCode = void 0;
  var rbt = HNi(),
    tbt = CXe(),
    Oje = x1r(),
    WHe = CXe(),
    e9i = MNi(),
    BX = UNi(),
    kje = BNi(),
    Oo = fd(),
    Nf = dee(),
    t9i = wXe(),
    DT = x_(),
    FX = PXe();
  function L6a(e) {
    if (i9i(e)) {
      if ((s9i(e), n9i(e))) {
        E6a(e);
        return;
      }
    }
    r9i(e, () => rbt.topBoolOrEmptySchema(e));
  }
  u9i.validateFunctionCode = L6a;
  function r9i({ gen: e, validateName: t, schema: r, schemaEnv: s, opts: a }, H) {
    if (a.code.es5)
      e.func(t, Oo._`${Nf.default.data}, ${Nf.default.valCxt}`, s.$async, () => {
        (e.code(Oo._`"use strict"; ${QNi(r, a)}`), g6a(e, a), e.code(H));
      });
    else e.func(t, Oo._`${Nf.default.data}, ${$6a(a)}`, s.$async, () => e.code(QNi(r, a)).code(H));
  }
  function $6a(e) {
    return Oo._`{${Nf.default.instancePath}="", ${Nf.default.parentData}, ${Nf.default.parentDataProperty}, ${Nf.default.rootData}=${Nf.default.data}${e.dynamicRef ? Oo._`, ${Nf.default.dynamicAnchors}={}` : Oo.nil}}={}`;
  }
  function g6a(e, t) {
    e.if(
      Nf.default.valCxt,
      () => {
        if (
          (e.var(Nf.default.instancePath, Oo._`${Nf.default.valCxt}.${Nf.default.instancePath}`),
          e.var(Nf.default.parentData, Oo._`${Nf.default.valCxt}.${Nf.default.parentData}`),
          e.var(Nf.default.parentDataProperty, Oo._`${Nf.default.valCxt}.${Nf.default.parentDataProperty}`),
          e.var(Nf.default.rootData, Oo._`${Nf.default.valCxt}.${Nf.default.rootData}`),
          t.dynamicRef)
        )
          e.var(Nf.default.dynamicAnchors, Oo._`${Nf.default.valCxt}.${Nf.default.dynamicAnchors}`);
      },
      () => {
        if (
          (e.var(Nf.default.instancePath, Oo._`""`),
          e.var(Nf.default.parentData, Oo._`undefined`),
          e.var(Nf.default.parentDataProperty, Oo._`undefined`),
          e.var(Nf.default.rootData, Nf.default.data),
          t.dynamicRef)
        )
          e.var(Nf.default.dynamicAnchors, Oo._`{}`);
      },
    );
  }
  function E6a(e) {
    let { schema: t, opts: r, gen: s } = e;
    r9i(e, () => {
      if (r.$comment && t.$comment) a9i(e);
      if ((x6a(e), s.let(Nf.default.vErrors, null), s.let(Nf.default.errors, 0), r.unevaluated)) I6a(e);
      (o9i(e), v6a(e));
    });
    return;
  }
  function I6a(e) {
    let { gen: t, validateName: r } = e;
    ((e.evaluated = t.const("evaluated", Oo._`${r}.evaluated`)),
      t.if(Oo._`${e.evaluated}.dynamicProps`, () => t.assign(Oo._`${e.evaluated}.props`, Oo._`undefined`)),
      t.if(Oo._`${e.evaluated}.dynamicItems`, () => t.assign(Oo._`${e.evaluated}.items`, Oo._`undefined`)));
  }
  function QNi(e, t) {
    let r = typeof e == "object" && e[t.schemaId];
    return r && (t.code.source || t.code.process) ? Oo._`/*# sourceURL=${r} */` : Oo.nil;
  }
  function D6a(e, t) {
    if (i9i(e)) {
      if ((s9i(e), n9i(e))) {
        y6a(e, t);
        return;
      }
    }
    rbt.boolOrEmptySchema(e, t);
  }
  function n9i({ schema: e, self: t }) {
    if (typeof e == "boolean") return !e;
    for (let r in e) if (t.RULES.all[r]) return !0;
    return !1;
  }
  function i9i(e) {
    return typeof e.schema != "boolean";
  }
  function y6a(e, t) {
    let { schema: r, gen: s, opts: a } = e;
    if (a.$comment && r.$comment) a9i(e);
    (S6a(e), T6a(e));
    let H = s.const("_errs", Nf.default.errors);
    (o9i(e, H), s.var(t, Oo._`${H} === ${Nf.default.errors}`));
  }
  function s9i(e) {
    (DT.checkUnknownRules(e), M6a(e));
  }
  function o9i(e, t) {
    if (e.opts.jtd) return YNi(e, [], !1, t);
    let r = tbt.getSchemaTypes(e.schema),
      s = tbt.coerceAndCheckDataType(e, r);
    YNi(e, r, !s, t);
  }
  function M6a(e) {
    let { schema: t, errSchemaPath: r, opts: s, self: a } = e;
    if (t.$ref && s.ignoreKeywordsWithRef && DT.schemaHasRulesButRef(t, a.RULES))
      a.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
  }
  function x6a(e) {
    let { schema: t, opts: r } = e;
    if (t.default !== void 0 && r.useDefaults && r.strictSchema)
      DT.checkStrictMode(e, "default is ignored in the schema root");
  }
  function S6a(e) {
    let t = e.schema[e.opts.schemaId];
    if (t) e.baseId = t9i.resolveUrl(e.opts.uriResolver, e.baseId, t);
  }
  function T6a(e) {
    if (e.schema.$async && !e.schemaEnv.$async) throw Error("async schema in sync schema");
  }
  function a9i({ gen: e, schemaEnv: t, schema: r, errSchemaPath: s, opts: a }) {
    let H = r.$comment;
    if (a.$comment === !0) e.code(Oo._`${Nf.default.self}.logger.log(${H})`);
    else if (typeof a.$comment == "function") {
      let u = Oo.str`${s}/$comment`,
        f = e.scopeValue("root", { ref: t.root });
      e.code(Oo._`${Nf.default.self}.opts.$comment(${H}, ${u}, ${f}.schema)`);
    }
  }
  function v6a(e) {
    let { gen: t, schemaEnv: r, validateName: s, ValidationError: a, opts: H } = e;
    if (r.$async)
      t.if(
        Oo._`${Nf.default.errors} === 0`,
        () => t.return(Nf.default.data),
        () => t.throw(Oo._`new ${a}(${Nf.default.vErrors})`),
      );
    else {
      if ((t.assign(Oo._`${s}.errors`, Nf.default.vErrors), H.unevaluated)) b6a(e);
      t.return(Oo._`${Nf.default.errors} === 0`);
    }
  }
  function b6a({ gen: e, evaluated: t, props: r, items: s }) {
    if (r instanceof Oo.Name) e.assign(Oo._`${t}.props`, r);
    if (s instanceof Oo.Name) e.assign(Oo._`${t}.items`, s);
  }
  function YNi(e, t, r, s) {
    let { gen: a, schema: H, data: u, allErrors: f, opts: d, self: _ } = e,
      { RULES: L } = _;
    if (H.$ref && (d.ignoreKeywordsWithRef || !DT.schemaHasRulesButRef(H, L))) {
      a.block(() => c9i(e, "$ref", L.all.$ref.definition));
      return;
    }
    if (!d.jtd) j6a(e, t);
    a.block(() => {
      for (let D of L.rules) I(D);
      I(L.post);
    });
    function I(D) {
      if (!Oje.shouldUseGroup(H, D)) return;
      if (D.type) {
        if (
          (a.if(WHe.checkDataType(D.type, u, d.strictNumbers)),
          ZNi(e, D),
          t.length === 1 && t[0] === D.type && r)
        )
          (a.else(), WHe.reportTypeError(e));
        a.endIf();
      } else ZNi(e, D);
      if (!f) a.if(Oo._`${Nf.default.errors} === ${s || 0}`);
    }
  }
  function ZNi(e, t) {
    let {
      gen: r,
      schema: s,
      opts: { useDefaults: a },
    } = e;
    if (a) e9i.assignDefaults(e, t.type);
    r.block(() => {
      for (let H of t.rules) if (Oje.shouldUseRule(s, H)) c9i(e, H.keyword, H.definition, t.type);
    });
  }
  function j6a(e, t) {
    if (e.schemaEnv.meta || !e.opts.strictTypes) return;
    if ((P6a(e, t), !e.opts.allowUnionTypes)) C6a(e, t);
    w6a(e, e.dataTypes);
  }
  function P6a(e, t) {
    if (!t.length) return;
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    (t.forEach((r) => {
      if (!H9i(e.dataTypes, r)) w1r(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }),
      O6a(e, t));
  }
  function C6a(e, t) {
    if (t.length > 1 && !(t.length === 2 && t.includes("null")))
      w1r(e, "use allowUnionTypes to allow union type keyword");
  }
  function w6a(e, t) {
    let r = e.self.RULES.all;
    for (let s in r) {
      let a = r[s];
      if (typeof a == "object" && Oje.shouldUseRule(e.schema, a)) {
        let { type: H } = a.definition;
        if (H.length && !H.some((u) => k6a(t, u))) w1r(e, `missing type "${H.join(",")}" for keyword "${s}"`);
      }
    }
  }
  function k6a(e, t) {
    return e.includes(t) || (t === "number" && e.includes("integer"));
  }
  function H9i(e, t) {
    return e.includes(t) || (t === "integer" && e.includes("number"));
  }
  function O6a(e, t) {
    let r = [];
    for (let s of e.dataTypes)
      if (H9i(t, s)) r.push(s);
      else if (t.includes("integer") && s === "number") r.push("integer");
    e.dataTypes = r;
  }
  function w1r(e, t) {
    let r = e.schemaEnv.baseId + e.errSchemaPath;
    ((t += ` at "${r}" (strictTypes)`), DT.checkStrictMode(e, t, e.opts.strictTypes));
  }
  class k1r {
    constructor(e, t, r) {
      if (
        (BX.validateKeywordUsage(e, t, r),
        (this.gen = e.gen),
        (this.allErrors = e.allErrors),
        (this.keyword = r),
        (this.data = e.data),
        (this.schema = e.schema[r]),
        (this.$data = t.$data && e.opts.$data && this.schema && this.schema.$data),
        (this.schemaValue = DT.schemaRefOrVal(e, this.schema, r, this.$data)),
        (this.schemaType = t.schemaType),
        (this.parentSchema = e.schema),
        (this.params = {}),
        (this.it = e),
        (this.def = t),
        this.$data)
      )
        this.schemaCode = e.gen.const("vSchema", A9i(this.$data, e));
      else if (
        ((this.schemaCode = this.schemaValue),
        !BX.validSchemaType(this.schema, t.schemaType, t.allowUndefined))
      )
        throw Error(`${r} value must be ${JSON.stringify(t.schemaType)}`);
      if ("code" in t ? t.trackErrors : t.errors !== !1)
        this.errsCount = e.gen.const("_errs", Nf.default.errors);
    }
    result(e, t, r) {
      this.failResult(Oo.not(e), t, r);
    }
    failResult(e, t, r) {
      if ((this.gen.if(e), r)) r();
      else this.error();
      if (t) {
        if ((this.gen.else(), t(), this.allErrors)) this.gen.endIf();
      } else if (this.allErrors) this.gen.endIf();
      else this.gen.else();
    }
    pass(e, t) {
      this.failResult(Oo.not(e), void 0, t);
    }
    fail(e) {
      if (e === void 0) {
        if ((this.error(), !this.allErrors)) this.gen.if(!1);
        return;
      }
      if ((this.gen.if(e), this.error(), this.allErrors)) this.gen.endIf();
      else this.gen.else();
    }
    fail$data(e) {
      if (!this.$data) return this.fail(e);
      let { schemaCode: t } = this;
      this.fail(Oo._`${t} !== undefined && (${Oo.or(this.invalid$data(), e)})`);
    }
    error(e, t, r) {
      if (t) {
        (this.setParams(t), this._error(e, r), this.setParams({}));
        return;
      }
      this._error(e, r);
    }
    _error(e, t) {
      (e ? FX.reportExtraError : FX.reportError)(this, this.def.error, t);
    }
    $dataError() {
      FX.reportError(this, this.def.$dataError || FX.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0) throw Error('add "trackErrors" to keyword definition');
      FX.resetErrorsCount(this.gen, this.errsCount);
    }
    ok(e) {
      if (!this.allErrors) this.gen.if(e);
    }
    setParams(e, t) {
      if (t) Object.assign(this.params, e);
      else this.params = e;
    }
    block$data(e, t, r = Oo.nil) {
      this.gen.block(() => {
        (this.check$data(e, r), t());
      });
    }
    check$data(e = Oo.nil, t = Oo.nil) {
      if (!this.$data) return;
      let { gen: r, schemaCode: s, schemaType: a, def: H } = this;
      if ((r.if(Oo.or(Oo._`${s} === undefined`, t)), e !== Oo.nil)) r.assign(e, !0);
      if (a.length || H.validateSchema) {
        if ((r.elseIf(this.invalid$data()), this.$dataError(), e !== Oo.nil)) r.assign(e, !1);
      }
      r.else();
    }
    invalid$data() {
      let { gen: e, schemaCode: t, schemaType: r, def: s, it: a } = this;
      return Oo.or(H(), u());
      function H() {
        if (r.length) {
          if (!(t instanceof Oo.Name)) throw Error("ajv implementation error");
          let f = Array.isArray(r) ? r : [r];
          return Oo._`${WHe.checkDataTypes(f, t, a.opts.strictNumbers, WHe.DataType.Wrong)}`;
        }
        return Oo.nil;
      }
      function u() {
        if (s.validateSchema) {
          let f = e.scopeValue("validate$data", { ref: s.validateSchema });
          return Oo._`!${f}(${t})`;
        }
        return Oo.nil;
      }
    }
    subschema(e, t) {
      let r = kje.getSubschema(this.it, e);
      (kje.extendSubschemaData(r, this.it, e), kje.extendSubschemaMode(r, e));
      let s = { ...this.it, ...r, items: void 0, props: void 0 };
      return (D6a(s, t), s);
    }
    mergeEvaluated(e, t) {
      let { it: r, gen: s } = this;
      if (!r.opts.unevaluated) return;
      if (r.props !== !0 && e.props !== void 0) r.props = DT.mergeEvaluated.props(s, e.props, r.props, t);
      if (r.items !== !0 && e.items !== void 0) r.items = DT.mergeEvaluated.items(s, e.items, r.items, t);
    }
    mergeValidEvaluated(e, t) {
      let { it: r, gen: s } = this;
      if (r.opts.unevaluated && (r.props !== !0 || r.items !== !0))
        return (s.if(t, () => this.mergeEvaluated(e, Oo.Name)), !0);
    }
  }
  u9i.KeywordCxt = k1r;
  function c9i(e, t, r, s) {
    let a = new k1r(e, r, t);
    if ("code" in r) r.code(a, s);
    else if (a.$data && r.validate) BX.funcKeywordCode(a, r);
    else if ("macro" in r) BX.macroKeywordCode(a, r);
    else if (r.compile || r.validate) BX.funcKeywordCode(a, r);
  }
  var U6a = /^\/(?:[^~]|~0|~1)*$/,
    N6a = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function A9i(e, { dataLevel: t, dataNames: r, dataPathArr: s }) {
    let a, H;
    if (e === "") return Nf.default.rootData;
    if (e[0] === "/") {
      if (!U6a.test(e)) throw Error(`Invalid JSON-pointer: ${e}`);
      ((a = e), (H = Nf.default.rootData));
    } else {
      let _ = N6a.exec(e);
      if (!_) throw Error(`Invalid JSON-pointer: ${e}`);
      let L = +_[1];
      if (((a = _[2]), a === "#")) {
        if (L >= t) throw Error(d("property/index", L));
        return s[t - L];
      }
      if (L > t) throw Error(d("data", L));
      if (((H = r[t - L]), !a)) return H;
    }
    let u = H,
      f = a.split("/");
    for (let _ of f)
      if (_) ((H = Oo._`${H}${Oo.getProperty(DT.unescapeJsonPointer(_))}`), (u = Oo._`${u} && ${H}`));
    return u;
    function d(_, L) {
      return `Cannot access ${_} ${L} levels up, current level is ${t}`;
    }
  }
  u9i.getData = A9i;
});