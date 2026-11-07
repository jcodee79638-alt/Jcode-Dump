
class Zd {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Tee(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: Tee(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new TP(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Tee(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    let t = this._parse(e);
    if (XJe(t)) throw Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    let t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    let r = this.safeParse(e, t);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    let r = {
        common: { issues: [], async: t?.async ?? !1, contextualErrorMap: t?.errorMap },
        path: t?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: Tee(e),
      },
      s = this._parseSync({ data: e, path: r.path, parent: r });
    return YWi(r, s);
  }
  "~validate"(e) {
    let t = {
      common: { issues: [], async: !!this["~standard"].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Tee(e),
    };
    if (!this["~standard"].async)
      try {
        let r = this._parseSync({ data: e, path: [], parent: t });
        return LLe(r) ? { value: r.value } : { issues: t.common.issues };
      } catch (r) {
        if (r?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = !0;
        t.common = { issues: [], async: !0 };
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((r) =>
      LLe(r) ? { value: r.value } : { issues: t.common.issues },
    );
  }
  async parseAsync(e, t) {
    let r = await this.safeParseAsync(e, t);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    let r = {
        common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
        path: t?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: Tee(e),
      },
      s = this._parse({ data: e, path: r.path, parent: r }),
      a = await (XJe(s) ? s : Promise.resolve(s));
    return YWi(r, a);
  }
  refine(e, t) {
    let r = (s) => {
      if (typeof t === "string" || typeof t > "u") return { message: t };
      else if (typeof t === "function") return t(s);
      else return t;
    };
    return this._refinement((s, a) => {
      let H = e(s),
        u = () => a.addIssue({ code: Ga.custom, ...r(s) });
      if (typeof Promise < "u" && H instanceof Promise)
        return H.then((f) => {
          if (!f) return (u(), !1);
          else return !0;
        });
      if (!H) return (u(), !1);
      else return !0;
    });
  }
  refinement(e, t) {
    return this._refinement((r, s) => {
      if (!e(r)) return (s.addIssue(typeof t === "function" ? t(r, s) : t), !1);
      else return !0;
    });
  }
  _refinement(e) {
    return new oJ({ schema: this, typeName: pf.ZodEffects, effect: { type: "refinement", refinement: e } });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    ((this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this["~standard"] = { version: 1, vendor: "zod", validate: (t) => this["~validate"](t) }));
  }
  optional() {
    return sJ.create(this, this._def);
  }
  nullable() {
    return hce.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return iJ.create(this);
  }
  promise() {
    return WPe.create(this, this._def);
  }
  or(e) {
    return YJe.create([this, e], this._def);
  }
  and(e) {
    return ZJe.create(this, e, this._def);
  }
  transform(e) {
    return new oJ({
      ...Up(this._def),
      schema: this,
      typeName: pf.ZodEffects,
      effect: { type: "transform", transform: e },
    });
  }
  default(e) {
    let t = typeof e === "function" ? e : () => e;
    return new nKe({ ...Up(this._def), innerType: this, defaultValue: t, typeName: pf.ZodDefault });
  }
  brand() {
    return new CSr({ typeName: pf.ZodBranded, type: this, ...Up(this._def) });
  }
  catch(e) {
    let t = typeof e === "function" ? e : () => e;
    return new iKe({ ...Up(this._def), innerType: this, catchValue: t, typeName: pf.ZodCatch });
  }
  describe(e) {
    return new this.constructor({ ...this._def, description: e });
  }
  pipe(e) {
    return iPt.create(this, e);
  }
  readonly() {
    return sKe.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}