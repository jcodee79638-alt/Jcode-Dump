
var aFi = Ie(function (mee) {
  Object.defineProperty(mee, "__esModule", { value: !0 });
  mee.CodeGen = mee.Name = mee.nil = mee.stringify = mee.str = mee._ = mee.KeywordCxt = void 0;
  var tOa = kXe();
  Object.defineProperty(mee, "KeywordCxt", {
    enumerable: !0,
    get: function () {
      return tOa.KeywordCxt;
    },
  });
  var Fje = fd();
  Object.defineProperty(mee, "_", {
    enumerable: !0,
    get: function () {
      return Fje._;
    },
  });
  Object.defineProperty(mee, "str", {
    enumerable: !0,
    get: function () {
      return Fje.str;
    },
  });
  Object.defineProperty(mee, "stringify", {
    enumerable: !0,
    get: function () {
      return Fje.stringify;
    },
  });
  Object.defineProperty(mee, "nil", {
    enumerable: !0,
    get: function () {
      return Fje.nil;
    },
  });
  Object.defineProperty(mee, "Name", {
    enumerable: !0,
    get: function () {
      return Fje.Name;
    },
  });
  Object.defineProperty(mee, "CodeGen", {
    enumerable: !0,
    get: function () {
      return Fje.CodeGen;
    },
  });
  var rOa = nbt(),
    rFi = OXe(),
    nFi = M1r(),
    RX = obt(),
    iFi = fd(),
    WX = wXe(),
    VHe = CXe(),
    Nje = x_(),
    Y9i = g9i(),
    nOa = Q9i(),
    sFi = (e, t) => new RegExp(e, t);
  sFi.code = "new RegExp";
  var iOa = ["removeAdditional", "useDefaults", "coerceTypes"],
    sOa = new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error",
    ]),
    oOa = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now.",
    },
    aOa = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.',
    },
    Z9i = 200;
  function HOa(e) {
    var t, r, s, a, H, u, f, d, _, L, I, D, S, T, C, O, B, V, q, Z, se, ae, z, Ae, le;
    let Be = e.strict,
      Te = (t = e.code) === null || t === void 0 ? void 0 : t.optimize,
      Lt = Te === !0 || Te === void 0 ? 1 : Te || 0,
      Ht = (s = (r = e.code) === null || r === void 0 ? void 0 : r.regExp) !== null && s !== void 0 ? s : sFi,
      Se = (a = e.uriResolver) !== null && a !== void 0 ? a : nOa.default;
    return {
      strictSchema:
        (u = (H = e.strictSchema) !== null && H !== void 0 ? H : Be) !== null && u !== void 0 ? u : !0,
      strictNumbers:
        (d = (f = e.strictNumbers) !== null && f !== void 0 ? f : Be) !== null && d !== void 0 ? d : !0,
      strictTypes:
        (L = (_ = e.strictTypes) !== null && _ !== void 0 ? _ : Be) !== null && L !== void 0 ? L : "log",
      strictTuples:
        (D = (I = e.strictTuples) !== null && I !== void 0 ? I : Be) !== null && D !== void 0 ? D : "log",
      strictRequired:
        (T = (S = e.strictRequired) !== null && S !== void 0 ? S : Be) !== null && T !== void 0 ? T : !1,
      code: e.code ? { ...e.code, optimize: Lt, regExp: Ht } : { optimize: Lt, regExp: Ht },
      loopRequired: (C = e.loopRequired) !== null && C !== void 0 ? C : Z9i,
      loopEnum: (O = e.loopEnum) !== null && O !== void 0 ? O : Z9i,
      meta: (B = e.meta) !== null && B !== void 0 ? B : !0,
      messages: (V = e.messages) !== null && V !== void 0 ? V : !0,
      inlineRefs: (q = e.inlineRefs) !== null && q !== void 0 ? q : !0,
      schemaId: (Z = e.schemaId) !== null && Z !== void 0 ? Z : "$id",
      addUsedSchema: (se = e.addUsedSchema) !== null && se !== void 0 ? se : !0,
      validateSchema: (ae = e.validateSchema) !== null && ae !== void 0 ? ae : !0,
      validateFormats: (z = e.validateFormats) !== null && z !== void 0 ? z : !0,
      unicodeRegExp: (Ae = e.unicodeRegExp) !== null && Ae !== void 0 ? Ae : !0,
      int32range: (le = e.int32range) !== null && le !== void 0 ? le : !0,
      uriResolver: Se,
    };
  }
  class fbt {
    constructor(e = {}) {
      ((this.schemas = {}),
        (this.refs = {}),
        (this.formats = Object.create(null)),
        (this._compilations = new Set()),
        (this._loading = {}),
        (this._cache = new Map()),
        (e = this.opts = { ...e, ...HOa(e) }));
      let { es5: t, lines: r } = this.opts.code;
      ((this.scope = new iFi.ValueScope({ scope: {}, prefixes: sOa, es5: t, lines: r })),
        (this.logger = pOa(e.logger)));
      let s = e.validateFormats;
      if (
        ((e.validateFormats = !1),
        (this.RULES = nFi.getRules()),
        eFi.call(this, oOa, e, "NOT SUPPORTED"),
        eFi.call(this, aOa, e, "DEPRECATED", "warn"),
        (this._metaOpts = lOa.call(this)),
        e.formats)
      )
        AOa.call(this);
      if ((this._addVocabularies(), this._addDefaultMetaSchema(), e.keywords)) uOa.call(this, e.keywords);
      if (typeof e.meta == "object") this.addMetaSchema(e.meta);
      (cOa.call(this), (e.validateFormats = s));
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      let { $data: e, meta: t, schemaId: r } = this.opts,
        s = Y9i;
      if (r === "id") ((s = { ...Y9i }), (s.id = s.$id), delete s.$id);
      if (t && e) this.addMetaSchema(s, s[r], !1);
    }
    defaultMeta() {
      let { meta: e, schemaId: t } = this.opts;
      return (this.opts.defaultMeta = typeof e == "object" ? e[t] || e : void 0);
    }
    validate(e, t) {
      let r;
      if (typeof e == "string") {
        if (((r = this.getSchema(e)), !r)) throw Error(`no schema with key or ref "${e}"`);
      } else r = this.compile(e);
      let s = r(t);
      if (!("$async" in r)) this.errors = r.errors;
      return s;
    }
    compile(e, t) {
      let r = this._addSchema(e, t);
      return r.validate || this._compileSchemaEnv(r);
    }
    compileAsync(e, t) {
      if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
      let { loadSchema: r } = this.opts;
      return s.call(this, e, t);
      async function s(_, L) {
        await a.call(this, _.$schema);
        let I = this._addSchema(_, L);
        return I.validate || H.call(this, I);
      }
      async function a(_) {
        if (_ && !this.getSchema(_)) await s.call(this, { $ref: _ }, !0);
      }
      async function H(_) {
        try {
          return this._compileSchemaEnv(_);
        } catch (L) {
          if (!(L instanceof rFi.default)) throw L;
          return (u.call(this, L), await f.call(this, L.missingSchema), H.call(this, _));
        }
      }
      function u({ missingSchema: _, missingRef: L }) {
        if (this.refs[_]) throw Error(`AnySchema ${_} is loaded but ${L} cannot be resolved`);
      }
      async function f(_) {
        let L = await d.call(this, _);
        if (!this.refs[_]) await a.call(this, L.$schema);
        if (!this.refs[_]) this.addSchema(L, _, t);
      }
      async function d(_) {
        let L = this._loading[_];
        if (L) return L;
        try {
          return await (this._loading[_] = r(_));
        } finally {
          delete this._loading[_];
        }
      }
    }
    addSchema(e, t, r, s = this.opts.validateSchema) {
      if (Array.isArray(e)) {
        for (let H of e) this.addSchema(H, void 0, r, s);
        return this;
      }
      let a;
      if (typeof e === "object") {
        let { schemaId: H } = this.opts;
        if (((a = e[H]), a !== void 0 && typeof a != "string")) throw Error(`schema ${H} must be string`);
      }
      return (
        (t = WX.normalizeId(t || a)),
        this._checkUnique(t),
        (this.schemas[t] = this._addSchema(e, r, t, s, !0)),
        this
      );
    }
    addMetaSchema(e, t, r = this.opts.validateSchema) {
      return (this.addSchema(e, t, !0, r), this);
    }
    validateSchema(e, t) {
      if (typeof e == "boolean") return !0;
      let r;
      if (((r = e.$schema), r !== void 0 && typeof r != "string")) throw Error("$schema must be a string");
      if (((r = r || this.opts.defaultMeta || this.defaultMeta()), !r))
        return (this.logger.warn("meta-schema not available"), (this.errors = null), !0);
      let s = this.validate(r, e);
      if (!s && t) {
        let a = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log") this.logger.error(a);
        else throw Error(a);
      }
      return s;
    }
    getSchema(e) {
      let t;
      while (typeof (t = tFi.call(this, e)) == "string") e = t;
      if (t === void 0) {
        let { schemaId: r } = this.opts,
          s = new RX.SchemaEnv({ schema: {}, schemaId: r });
        if (((t = RX.resolveSchema.call(this, s, e)), !t)) return;
        this.refs[e] = t;
      }
      return t.validate || this._compileSchemaEnv(t);
    }
    removeSchema(e) {
      if (e instanceof RegExp)
        return (this._removeAllSchemas(this.schemas, e), this._removeAllSchemas(this.refs, e), this);
      switch (typeof e) {
        case "undefined":
          return (
            this._removeAllSchemas(this.schemas),
            this._removeAllSchemas(this.refs),
            this._cache.clear(),
            this
          );
        case "string": {
          let t = tFi.call(this, e);
          if (typeof t == "object") this._cache.delete(t.schema);
          return (delete this.schemas[e], delete this.refs[e], this);
        }
        case "object": {
          let t = e;
          this._cache.delete(t);
          let r = e[this.opts.schemaId];
          if (r) ((r = WX.normalizeId(r)), delete this.schemas[r], delete this.refs[r]);
          return this;
        }
        default:
          throw Error("ajv.removeSchema: invalid parameter");
      }
    }
    addVocabulary(e) {
      for (let t of e) this.addKeyword(t);
      return this;
    }
    addKeyword(e, t) {
      let r;
      if (typeof e == "string") {
        if (((r = e), typeof t == "object"))
          (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), (t.keyword = r));
      } else if (typeof e == "object" && t === void 0) {
        if (((t = e), (r = t.keyword), Array.isArray(r) && !r.length))
          throw Error("addKeywords: keyword must be string or non-empty array");
      } else throw Error("invalid addKeywords parameters");
      if ((mOa.call(this, r, t), !t)) return (Nje.eachItem(r, (a) => z1r.call(this, a)), this);
      hOa.call(this, t);
      let s = { ...t, type: VHe.getJSONTypes(t.type), schemaType: VHe.getJSONTypes(t.schemaType) };
      return (
        Nje.eachItem(
          r,
          s.type.length === 0
            ? (a) => z1r.call(this, a, s)
            : (a) => s.type.forEach((H) => z1r.call(this, a, s, H)),
        ),
        this
      );
    }
    getKeyword(e) {
      let t = this.RULES.all[e];
      return typeof t == "object" ? t.definition : !!t;
    }
    removeKeyword(e) {
      let { RULES: t } = this;
      (delete t.keywords[e], delete t.all[e]);
      for (let r of t.rules) {
        let s = r.rules.findIndex((a) => a.keyword === e);
        if (s >= 0) r.rules.splice(s, 1);
      }
      return this;
    }
    addFormat(e, t) {
      if (typeof t == "string") t = new RegExp(t);
      return ((this.formats[e] = t), this);
    }
    errorsText(e = this.errors, { separator: t = ", ", dataVar: r = "data" } = {}) {
      if (!e || e.length === 0) return "No errors";
      return e.map((s) => `${r}${s.instancePath} ${s.message}`).reduce((s, a) => s + t + a);
    }
    $dataMetaSchema(e, t) {
      let r = this.RULES.all;
      e = JSON.parse(JSON.stringify(e));
      for (let s of t) {
        let a = s.split("/").slice(1),
          H = e;
        for (let u of a) H = H[u];
        for (let u in r) {
          let f = r[u];
          if (typeof f != "object") continue;
          let { $data: d } = f.definition,
            _ = H[u];
          if (d && _) H[u] = oFi(_);
        }
      }
      return e;
    }
    _removeAllSchemas(e, t) {
      for (let r in e) {
        let s = e[r];
        if (!t || t.test(r)) {
          if (typeof s == "string") delete e[r];
          else if (s && !s.meta) (this._cache.delete(s.schema), delete e[r]);
        }
      }
    }
    _addSchema(e, t, r, s = this.opts.validateSchema, a = this.opts.addUsedSchema) {
      let H,
        { schemaId: u } = this.opts;
      if (typeof e == "object") H = e[u];
      else if (this.opts.jtd) throw Error("schema must be object");
      else if (typeof e != "boolean") throw Error("schema must be object or boolean");
      let f = this._cache.get(e);
      if (f !== void 0) return f;
      r = WX.normalizeId(H || r);
      let d = WX.getSchemaRefs.call(this, e, r);
      if (
        ((f = new RX.SchemaEnv({ schema: e, schemaId: u, meta: t, baseId: r, localRefs: d })),
        this._cache.set(f.schema, f),
        a && !r.startsWith("#"))
      ) {
        if (r) this._checkUnique(r);
        this.refs[r] = f;
      }
      if (s) this.validateSchema(e, !0);
      return f;
    }
    _checkUnique(e) {
      if (this.schemas[e] || this.refs[e]) throw Error(`schema with key or id "${e}" already exists`);
    }
    _compileSchemaEnv(e) {
      if (e.meta) this._compileMetaSchema(e);
      else RX.compileSchema.call(this, e);
      if (!e.validate) throw Error("ajv implementation error");
      return e.validate;
    }
    _compileMetaSchema(e) {
      let t = this.opts;
      this.opts = this._metaOpts;
      try {
        RX.compileSchema.call(this, e);
      } finally {
        this.opts = t;
      }
    }
  }
  fbt.ValidationError = rOa.default;
  fbt.MissingRefError = rFi.default;
  mee.default = fbt;
  function eFi(e, t, r, s = "error") {
    for (let a in e) {
      let H = a;
      if (H in t) this.logger[s](`${r}: option ${a}. ${e[H]}`);
    }
  }
  function tFi(e) {
    return ((e = WX.normalizeId(e)), this.schemas[e] || this.refs[e]);
  }
  function cOa() {
    let e = this.opts.schemas;
    if (!e) return;
    if (Array.isArray(e)) this.addSchema(e);
    else for (let t in e) this.addSchema(e[t], t);
  }
  function AOa() {
    for (let e in this.opts.formats) {
      let t = this.opts.formats[e];
      if (t) this.addFormat(e, t);
    }
  }
  function uOa(e) {
    if (Array.isArray(e)) {
      this.addVocabulary(e);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (let t in e) {
      let r = e[t];
      if (!r.keyword) r.keyword = t;
      this.addKeyword(r);
    }
  }
  function lOa() {
    let e = { ...this.opts };
    for (let t of iOa) delete e[t];
    return e;
  }
  var fOa = { log() {}, warn() {}, error() {} };
  function pOa(e) {
    if (e === !1) return fOa;
    if (e === void 0) return console;
    if (e.log && e.warn && e.error) return e;
    throw Error("logger must implement log, warn and error methods");
  }
  var dOa = /^[a-z_$][a-z0-9_$:-]*$/i;
  function mOa(e, t) {
    let { RULES: r } = this;
    if (
      (Nje.eachItem(e, (s) => {
        if (r.keywords[s]) throw Error(`Keyword ${s} is already defined`);
        if (!dOa.test(s)) throw Error(`Keyword ${s} has invalid name`);
      }),
      !t)
    )
      return;
    if (t.$data && !("code" in t || "validate" in t))
      throw Error('$data keyword must have "code" or "validate" function');
  }
  function z1r(e, t, r) {
    var s;
    let a = t === null || t === void 0 ? void 0 : t.post;
    if (r && a) throw Error('keyword with "post" flag cannot have "type"');
    let { RULES: H } = this,
      u = a ? H.post : H.rules.find(({ type: d }) => d === r);
    if (!u) ((u = { type: r, rules: [] }), H.rules.push(u));
    if (((H.keywords[e] = !0), !t)) return;
    let f = {
      keyword: e,
      definition: { ...t, type: VHe.getJSONTypes(t.type), schemaType: VHe.getJSONTypes(t.schemaType) },
    };
    if (t.before) _Oa.call(this, u, f, t.before);
    else u.rules.push(f);
    ((H.all[e] = f), (s = t.implements) === null || s === void 0 || s.forEach((d) => this.addKeyword(d)));
  }
  function _Oa(e, t, r) {
    let s = e.rules.findIndex((a) => a.keyword === r);
    if (s >= 0) e.rules.splice(s, 0, t);
    else (e.rules.push(t), this.logger.warn(`rule ${r} is not defined`));
  }
  function hOa(e) {
    let { metaSchema: t } = e;
    if (t === void 0) return;
    if (e.$data && this.opts.$data) t = oFi(t);
    e.validateSchema = this.compile(t, !0);
  }
  var LOa = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
  function oFi(e) {
    return { anyOf: [e, LOa] };
  }
});