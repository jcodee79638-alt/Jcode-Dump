
var fwi = ne(() => {
  dTt();
  mTt();
  Hwi();
  kIr();
  h5e();
  ((s1a = /^c[^\s-]{8,}$/i),
    (o1a = /^[0-9a-z]+$/),
    (a1a = /^[0-9A-HJKMNP-TV-Z]{26}$/i),
    (H1a = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i),
    (c1a = /^[a-z0-9_-]{21}$/i),
    (A1a = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/),
    (u1a =
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/),
    (l1a = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i),
    (p1a =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/),
    (d1a =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/),
    (m1a =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/),
    (_1a =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/),
    (h1a = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/),
    (L1a = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/),
    ($1a = new RegExp(`^${Awi}$`)));
  zZ = class zZ extends Yd {
    _parse(e) {
      if (this._def.coerce) e.data = String(e.data);
      if (this._getType(e) !== Xc.string) {
        let a = this._getOrReturnCtx(e);
        return (mc(a, { code: qa.invalid_type, expected: Xc.string, received: a.parsedType }), Pl);
      }
      let r = new hP(),
        s = void 0;
      for (let a of this._def.checks)
        if (a.kind === "min") {
          if (e.data.length < a.value)
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, {
                code: qa.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !1,
                message: a.message,
              }),
              r.dirty());
        } else if (a.kind === "max") {
          if (e.data.length > a.value)
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, {
                code: qa.too_big,
                maximum: a.value,
                type: "string",
                inclusive: !0,
                exact: !1,
                message: a.message,
              }),
              r.dirty());
        } else if (a.kind === "length") {
          let H = e.data.length > a.value,
            u = e.data.length < a.value;
          if (H || u) {
            if (((s = this._getOrReturnCtx(e, s)), H))
              mc(s, {
                code: qa.too_big,
                maximum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              });
            else if (u)
              mc(s, {
                code: qa.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              });
            r.dirty();
          }
        } else if (a.kind === "email") {
          if (!l1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "email", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "emoji") {
          if (!OIr) OIr = new RegExp(f1a, "u");
          if (!OIr.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "emoji", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "uuid") {
          if (!H1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "uuid", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "nanoid") {
          if (!c1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "nanoid", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "cuid") {
          if (!s1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "cuid", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "cuid2") {
          if (!o1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "cuid2", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "ulid") {
          if (!a1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "ulid", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "url")
          try {
            new URL(e.data);
          } catch {
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "url", code: qa.invalid_string, message: a.message }),
              r.dirty());
          }
        else if (a.kind === "regex") {
          if (((a.regex.lastIndex = 0), !a.regex.test(e.data)))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "regex", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "trim") e.data = e.data.trim();
        else if (a.kind === "includes") {
          if (!e.data.includes(a.value, a.position))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, {
                code: qa.invalid_string,
                validation: { includes: a.value, position: a.position },
                message: a.message,
              }),
              r.dirty());
        } else if (a.kind === "toLowerCase") e.data = e.data.toLowerCase();
        else if (a.kind === "toUpperCase") e.data = e.data.toUpperCase();
        else if (a.kind === "startsWith") {
          if (!e.data.startsWith(a.value))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { code: qa.invalid_string, validation: { startsWith: a.value }, message: a.message }),
              r.dirty());
        } else if (a.kind === "endsWith") {
          if (!e.data.endsWith(a.value))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { code: qa.invalid_string, validation: { endsWith: a.value }, message: a.message }),
              r.dirty());
        } else if (a.kind === "datetime") {
          if (!E1a(a).test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { code: qa.invalid_string, validation: "datetime", message: a.message }),
              r.dirty());
        } else if (a.kind === "date") {
          if (!$1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { code: qa.invalid_string, validation: "date", message: a.message }),
              r.dirty());
        } else if (a.kind === "time") {
          if (!g1a(a).test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { code: qa.invalid_string, validation: "time", message: a.message }),
              r.dirty());
        } else if (a.kind === "duration") {
          if (!u1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "duration", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "ip") {
          if (!I1a(e.data, a.version))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "ip", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "jwt") {
          if (!D1a(e.data, a.alg))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "jwt", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "cidr") {
          if (!y1a(e.data, a.version))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "cidr", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "base64") {
          if (!h1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "base64", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else if (a.kind === "base64url") {
          if (!L1a.test(e.data))
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, { validation: "base64url", code: qa.invalid_string, message: a.message }),
              r.dirty());
        } else km.assertNever(a);
      return { status: r.value, value: e.data };
    }
    _regex(e, t, r) {
      return this.refinement((s) => e.test(s), { validation: t, code: qa.invalid_string, ...cu.errToObj(r) });
    }
    _addCheck(e) {
      return new zZ({ ...this._def, checks: [...this._def.checks, e] });
    }
    email(e) {
      return this._addCheck({ kind: "email", ...cu.errToObj(e) });
    }
    url(e) {
      return this._addCheck({ kind: "url", ...cu.errToObj(e) });
    }
    emoji(e) {
      return this._addCheck({ kind: "emoji", ...cu.errToObj(e) });
    }
    uuid(e) {
      return this._addCheck({ kind: "uuid", ...cu.errToObj(e) });
    }
    nanoid(e) {
      return this._addCheck({ kind: "nanoid", ...cu.errToObj(e) });
    }
    cuid(e) {
      return this._addCheck({ kind: "cuid", ...cu.errToObj(e) });
    }
    cuid2(e) {
      return this._addCheck({ kind: "cuid2", ...cu.errToObj(e) });
    }
    ulid(e) {
      return this._addCheck({ kind: "ulid", ...cu.errToObj(e) });
    }
    base64(e) {
      return this._addCheck({ kind: "base64", ...cu.errToObj(e) });
    }
    base64url(e) {
      return this._addCheck({ kind: "base64url", ...cu.errToObj(e) });
    }
    jwt(e) {
      return this._addCheck({ kind: "jwt", ...cu.errToObj(e) });
    }
    ip(e) {
      return this._addCheck({ kind: "ip", ...cu.errToObj(e) });
    }
    cidr(e) {
      return this._addCheck({ kind: "cidr", ...cu.errToObj(e) });
    }
    datetime(e) {
      if (typeof e === "string")
        return this._addCheck({ kind: "datetime", precision: null, offset: !1, local: !1, message: e });
      return this._addCheck({
        kind: "datetime",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        offset: e?.offset ?? !1,
        local: e?.local ?? !1,
        ...cu.errToObj(e?.message),
      });
    }
    date(e) {
      return this._addCheck({ kind: "date", message: e });
    }
    time(e) {
      if (typeof e === "string") return this._addCheck({ kind: "time", precision: null, message: e });
      return this._addCheck({
        kind: "time",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        ...cu.errToObj(e?.message),
      });
    }
    duration(e) {
      return this._addCheck({ kind: "duration", ...cu.errToObj(e) });
    }
    regex(e, t) {
      return this._addCheck({ kind: "regex", regex: e, ...cu.errToObj(t) });
    }
    includes(e, t) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: t?.position,
        ...cu.errToObj(t?.message),
      });
    }
    startsWith(e, t) {
      return this._addCheck({ kind: "startsWith", value: e, ...cu.errToObj(t) });
    }
    endsWith(e, t) {
      return this._addCheck({ kind: "endsWith", value: e, ...cu.errToObj(t) });
    }
    min(e, t) {
      return this._addCheck({ kind: "min", value: e, ...cu.errToObj(t) });
    }
    max(e, t) {
      return this._addCheck({ kind: "max", value: e, ...cu.errToObj(t) });
    }
    length(e, t) {
      return this._addCheck({ kind: "length", value: e, ...cu.errToObj(t) });
    }
    nonempty(e) {
      return this.min(1, cu.errToObj(e));
    }
    trim() {
      return new zZ({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
    }
    toLowerCase() {
      return new zZ({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
    }
    toUpperCase() {
      return new zZ({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
    }
    get isDatetime() {
      return !!this._def.checks.find((e) => e.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((e) => e.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((e) => e.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((e) => e.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((e) => e.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((e) => e.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((e) => e.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((e) => e.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((e) => e.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((e) => e.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((e) => e.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((e) => e.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((e) => e.kind === "ip");
    }
    get isCIDR() {
      return !!this._def.checks.find((e) => e.kind === "cidr");
    }
    get isBase64() {
      return !!this._def.checks.find((e) => e.kind === "base64");
    }
    get isBase64url() {
      return !!this._def.checks.find((e) => e.kind === "base64url");
    }
    get minLength() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "min") {
          if (e === null || t.value > e) e = t.value;
        }
      return e;
    }
    get maxLength() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "max") {
          if (e === null || t.value < e) e = t.value;
        }
      return e;
    }
  };
  zZ.create = (e) => new zZ({ checks: [], typeName: oH.ZodString, coerce: e?.coerce ?? !1, ...kp(e) });
  Qbe = class Qbe extends Yd {
    constructor() {
      super(...arguments);
      ((this.min = this.gte), (this.max = this.lte), (this.step = this.multipleOf));
    }
    _parse(e) {
      if (this._def.coerce) e.data = Number(e.data);
      if (this._getType(e) !== Xc.number) {
        let a = this._getOrReturnCtx(e);
        return (mc(a, { code: qa.invalid_type, expected: Xc.number, received: a.parsedType }), Pl);
      }
      let r = void 0,
        s = new hP();
      for (let a of this._def.checks)
        if (a.kind === "int") {
          if (!km.isInteger(e.data))
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, { code: qa.invalid_type, expected: "integer", received: "float", message: a.message }),
              s.dirty());
        } else if (a.kind === "min") {
          if (a.inclusive ? e.data < a.value : e.data <= a.value)
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, {
                code: qa.too_small,
                minimum: a.value,
                type: "number",
                inclusive: a.inclusive,
                exact: !1,
                message: a.message,
              }),
              s.dirty());
        } else if (a.kind === "max") {
          if (a.inclusive ? e.data > a.value : e.data >= a.value)
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, {
                code: qa.too_big,
                maximum: a.value,
                type: "number",
                inclusive: a.inclusive,
                exact: !1,
                message: a.message,
              }),
              s.dirty());
        } else if (a.kind === "multipleOf") {
          if (M1a(e.data, a.value) !== 0)
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, { code: qa.not_multiple_of, multipleOf: a.value, message: a.message }),
              s.dirty());
        } else if (a.kind === "finite") {
          if (!Number.isFinite(e.data))
            ((r = this._getOrReturnCtx(e, r)), mc(r, { code: qa.not_finite, message: a.message }), s.dirty());
        } else km.assertNever(a);
      return { status: s.value, value: e.data };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, cu.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, cu.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, cu.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, cu.toString(t));
    }
    setLimit(e, t, r, s) {
      return new Qbe({
        ...this._def,
        checks: [...this._def.checks, { kind: e, value: t, inclusive: r, message: cu.toString(s) }],
      });
    }
    _addCheck(e) {
      return new Qbe({ ...this._def, checks: [...this._def.checks, e] });
    }
    int(e) {
      return this._addCheck({ kind: "int", message: cu.toString(e) });
    }
    positive(e) {
      return this._addCheck({ kind: "min", value: 0, inclusive: !1, message: cu.toString(e) });
    }
    negative(e) {
      return this._addCheck({ kind: "max", value: 0, inclusive: !1, message: cu.toString(e) });
    }
    nonpositive(e) {
      return this._addCheck({ kind: "max", value: 0, inclusive: !0, message: cu.toString(e) });
    }
    nonnegative(e) {
      return this._addCheck({ kind: "min", value: 0, inclusive: !0, message: cu.toString(e) });
    }
    multipleOf(e, t) {
      return this._addCheck({ kind: "multipleOf", value: e, message: cu.toString(t) });
    }
    finite(e) {
      return this._addCheck({ kind: "finite", message: cu.toString(e) });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: cu.toString(e),
      })._addCheck({ kind: "max", inclusive: !0, value: Number.MAX_SAFE_INTEGER, message: cu.toString(e) });
    }
    get minValue() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "min") {
          if (e === null || t.value > e) e = t.value;
        }
      return e;
    }
    get maxValue() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "max") {
          if (e === null || t.value < e) e = t.value;
        }
      return e;
    }
    get isInt() {
      return !!this._def.checks.find(
        (e) => e.kind === "int" || (e.kind === "multipleOf" && km.isInteger(e.value)),
      );
    }
    get isFinite() {
      let e = null,
        t = null;
      for (let r of this._def.checks)
        if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf") return !0;
        else if (r.kind === "min") {
          if (t === null || r.value > t) t = r.value;
        } else if (r.kind === "max") {
          if (e === null || r.value < e) e = r.value;
        }
      return Number.isFinite(t) && Number.isFinite(e);
    }
  };
  Qbe.create = (e) => new Qbe({ checks: [], typeName: oH.ZodNumber, coerce: e?.coerce || !1, ...kp(e) });
  Ybe = class Ybe extends Yd {
    constructor() {
      super(...arguments);
      ((this.min = this.gte), (this.max = this.lte));
    }
    _parse(e) {
      if (this._def.coerce)
        try {
          e.data = BigInt(e.data);
        } catch {
          return this._getInvalidInput(e);
        }
      if (this._getType(e) !== Xc.bigint) return this._getInvalidInput(e);
      let r = void 0,
        s = new hP();
      for (let a of this._def.checks)
        if (a.kind === "min") {
          if (a.inclusive ? e.data < a.value : e.data <= a.value)
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, {
                code: qa.too_small,
                type: "bigint",
                minimum: a.value,
                inclusive: a.inclusive,
                message: a.message,
              }),
              s.dirty());
        } else if (a.kind === "max") {
          if (a.inclusive ? e.data > a.value : e.data >= a.value)
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, {
                code: qa.too_big,
                type: "bigint",
                maximum: a.value,
                inclusive: a.inclusive,
                message: a.message,
              }),
              s.dirty());
        } else if (a.kind === "multipleOf") {
          if (e.data % a.value !== BigInt(0))
            ((r = this._getOrReturnCtx(e, r)),
              mc(r, { code: qa.not_multiple_of, multipleOf: a.value, message: a.message }),
              s.dirty());
        } else km.assertNever(a);
      return { status: s.value, value: e.data };
    }
    _getInvalidInput(e) {
      let t = this._getOrReturnCtx(e);
      return (mc(t, { code: qa.invalid_type, expected: Xc.bigint, received: t.parsedType }), Pl);
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, cu.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, cu.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, cu.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, cu.toString(t));
    }
    setLimit(e, t, r, s) {
      return new Ybe({
        ...this._def,
        checks: [...this._def.checks, { kind: e, value: t, inclusive: r, message: cu.toString(s) }],
      });
    }
    _addCheck(e) {
      return new Ybe({ ...this._def, checks: [...this._def.checks, e] });
    }
    positive(e) {
      return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !1, message: cu.toString(e) });
    }
    negative(e) {
      return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !1, message: cu.toString(e) });
    }
    nonpositive(e) {
      return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !0, message: cu.toString(e) });
    }
    nonnegative(e) {
      return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !0, message: cu.toString(e) });
    }
    multipleOf(e, t) {
      return this._addCheck({ kind: "multipleOf", value: e, message: cu.toString(t) });
    }
    get minValue() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "min") {
          if (e === null || t.value > e) e = t.value;
        }
      return e;
    }
    get maxValue() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "max") {
          if (e === null || t.value < e) e = t.value;
        }
      return e;
    }
  };
  Ybe.create = (e) => new Ybe({ checks: [], typeName: oH.ZodBigInt, coerce: e?.coerce ?? !1, ...kp(e) });
  hTt = class hTt extends Yd {
    _parse(e) {
      if (this._def.coerce) e.data = Boolean(e.data);
      if (this._getType(e) !== Xc.boolean) {
        let r = this._getOrReturnCtx(e);
        return (mc(r, { code: qa.invalid_type, expected: Xc.boolean, received: r.parsedType }), Pl);
      }
      return Fw(e.data);
    }
  };
  hTt.create = (e) => new hTt({ typeName: oH.ZodBoolean, coerce: e?.coerce || !1, ...kp(e) });
  E5e = class E5e extends Yd {
    _parse(e) {
      if (this._def.coerce) e.data = new Date(e.data);
      if (this._getType(e) !== Xc.date) {
        let a = this._getOrReturnCtx(e);
        return (mc(a, { code: qa.invalid_type, expected: Xc.date, received: a.parsedType }), Pl);
      }
      if (Number.isNaN(e.data.getTime())) {
        let a = this._getOrReturnCtx(e);
        return (mc(a, { code: qa.invalid_date }), Pl);
      }
      let r = new hP(),
        s = void 0;
      for (let a of this._def.checks)
        if (a.kind === "min") {
          if (e.data.getTime() < a.value)
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, {
                code: qa.too_small,
                message: a.message,
                inclusive: !0,
                exact: !1,
                minimum: a.value,
                type: "date",
              }),
              r.dirty());
        } else if (a.kind === "max") {
          if (e.data.getTime() > a.value)
            ((s = this._getOrReturnCtx(e, s)),
              mc(s, {
                code: qa.too_big,
                message: a.message,
                inclusive: !0,
                exact: !1,
                maximum: a.value,
                type: "date",
              }),
              r.dirty());
        } else km.assertNever(a);
      return { status: r.value, value: new Date(e.data.getTime()) };
    }
    _addCheck(e) {
      return new E5e({ ...this._def, checks: [...this._def.checks, e] });
    }
    min(e, t) {
      return this._addCheck({ kind: "min", value: e.getTime(), message: cu.toString(t) });
    }
    max(e, t) {
      return this._addCheck({ kind: "max", value: e.getTime(), message: cu.toString(t) });
    }
    get minDate() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "min") {
          if (e === null || t.value > e) e = t.value;
        }
      return e != null ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (let t of this._def.checks)
        if (t.kind === "max") {
          if (e === null || t.value < e) e = t.value;
        }
      return e != null ? new Date(e) : null;
    }
  };
  E5e.create = (e) => new E5e({ checks: [], coerce: e?.coerce || !1, typeName: oH.ZodDate, ...kp(e) });
  LTt = class LTt extends Yd {
    _parse(e) {
      if (this._getType(e) !== Xc.symbol) {
        let r = this._getOrReturnCtx(e);
        return (mc(r, { code: qa.invalid_type, expected: Xc.symbol, received: r.parsedType }), Pl);
      }
      return Fw(e.data);
    }
  };
  LTt.create = (e) => new LTt({ typeName: oH.ZodSymbol, ...kp(e) });
  I5e = class I5e extends Yd {
    _parse(e) {
      if (this._getType(e) !== Xc.undefined) {
        let r = this._getOrReturnCtx(e);
        return (mc(r, { code: qa.invalid_type, expected: Xc.undefined, received: r.parsedType }), Pl);
      }
      return Fw(e.data);
    }
  };
  I5e.create = (e) => new I5e({ typeName: oH.ZodUndefined, ...kp(e) });
  D5e = class D5e extends Yd {
    _parse(e) {
      if (this._getType(e) !== Xc.null) {
        let r = this._getOrReturnCtx(e);
        return (mc(r, { code: qa.invalid_type, expected: Xc.null, received: r.parsedType }), Pl);
      }
      return Fw(e.data);
    }
  };
  D5e.create = (e) => new D5e({ typeName: oH.ZodNull, ...kp(e) });
  $Tt = class $Tt extends Yd {
    constructor() {
      super(...arguments);
      this._any = !0;
    }
    _parse(e) {
      return Fw(e.data);
    }
  };
  $Tt.create = (e) => new $Tt({ typeName: oH.ZodAny, ...kp(e) });
  She = class She extends Yd {
    constructor() {
      super(...arguments);
      this._unknown = !0;
    }
    _parse(e) {
      return Fw(e.data);
    }
  };
  She.create = (e) => new She({ typeName: oH.ZodUnknown, ...kp(e) });
  QZ = class QZ extends Yd {
    _parse(e) {
      let t = this._getOrReturnCtx(e);
      return (mc(t, { code: qa.invalid_type, expected: Xc.never, received: t.parsedType }), Pl);
    }
  };
  QZ.create = (e) => new QZ({ typeName: oH.ZodNever, ...kp(e) });
  gTt = class gTt extends Yd {
    _parse(e) {
      if (this._getType(e) !== Xc.undefined) {
        let r = this._getOrReturnCtx(e);
        return (mc(r, { code: qa.invalid_type, expected: Xc.void, received: r.parsedType }), Pl);
      }
      return Fw(e.data);
    }
  };
  gTt.create = (e) => new gTt({ typeName: oH.ZodVoid, ...kp(e) });
  $X = class $X extends Yd {
    _parse(e) {
      let { ctx: t, status: r } = this._processInputParams(e),
        s = this._def;
      if (t.parsedType !== Xc.array)
        return (mc(t, { code: qa.invalid_type, expected: Xc.array, received: t.parsedType }), Pl);
      if (s.exactLength !== null) {
        let H = t.data.length > s.exactLength.value,
          u = t.data.length < s.exactLength.value;
        if (H || u)
          (mc(t, {
            code: H ? qa.too_big : qa.too_small,
            minimum: u ? s.exactLength.value : void 0,
            maximum: H ? s.exactLength.value : void 0,
            type: "array",
            inclusive: !0,
            exact: !0,
            message: s.exactLength.message,
          }),
            r.dirty());
      }
      if (s.minLength !== null) {
        if (t.data.length < s.minLength.value)
          (mc(t, {
            code: qa.too_small,
            minimum: s.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.minLength.message,
          }),
            r.dirty());
      }
      if (s.maxLength !== null) {
        if (t.data.length > s.maxLength.value)
          (mc(t, {
            code: qa.too_big,
            maximum: s.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.maxLength.message,
          }),
            r.dirty());
      }
      if (t.common.async)
        return Promise.resolve().then(async () => {
          let H = [];
          for (let u = 0; u < t.data.length; u += 16) {
            if (t.common.issues.length >= 100) return Pl;
            H.push(
              ...(await Promise.all(
                t.data.slice(u, u + 16).map((f, d) => s.type._parseAsync(new c7(t, f, t.path, u + d))),
              )),
            );
          }
          return hP.mergeArray(r, H);
        });
      let a = [];
      for (let H = 0; H < t.data.length; H++) {
        if (t.common.issues.length >= 100) return Pl;
        a.push(s.type._parseSync(new c7(t, t.data[H], t.path, H)));
      }
      return hP.mergeArray(r, a);
    }
    get element() {
      return this._def.type;
    }
    min(e, t) {
      return new $X({ ...this._def, minLength: { value: e, message: cu.toString(t) } });
    }
    max(e, t) {
      return new $X({ ...this._def, maxLength: { value: e, message: cu.toString(t) } });
    }
    length(e, t) {
      return new $X({ ...this._def, exactLength: { value: e, message: cu.toString(t) } });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  $X.create = (e, t) =>
    new $X({ type: e, minLength: null, maxLength: null, exactLength: null, typeName: oH.ZodArray, ...kp(t) });
  ND = class ND extends Yd {
    constructor() {
      super(...arguments);
      ((this._cached = null), (this.nonstrict = this.passthrough), (this.augment = this.extend));
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      let e = this._def.shape(),
        t = km.objectKeys(e);
      return ((this._cached = { shape: e, keys: t }), this._cached);
    }
    _parse(e) {
      if (this._getType(e) !== Xc.object) {
        let d = this._getOrReturnCtx(e);
        return (mc(d, { code: qa.invalid_type, expected: Xc.object, received: d.parsedType }), Pl);
      }
      let { status: r, ctx: s } = this._processInputParams(e),
        { shape: a, keys: H } = this._getCached(),
        u = [];
      if (!(this._def.catchall instanceof QZ && this._def.unknownKeys === "strip")) {
        for (let d in s.data) if (!H.includes(d)) u.push(d);
      }
      let f = [];
      for (let d of H) {
        let _ = a[d],
          L = s.data[d];
        f.push({
          key: { status: "valid", value: d },
          value: _._parse(new c7(s, L, s.path, d)),
          alwaysSet: d in s.data,
        });
      }
      if (this._def.catchall instanceof QZ) {
        let d = this._def.unknownKeys;
        if (d === "passthrough")
          for (let _ of u)
            f.push({ key: { status: "valid", value: _ }, value: { status: "valid", value: s.data[_] } });
        else if (d === "strict") {
          if (u.length > 0) (mc(s, { code: qa.unrecognized_keys, keys: u }), r.dirty());
        } else if (d === "strip");
        else throw Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        let d = this._def.catchall;
        for (let _ of u) {
          let L = s.data[_];
          f.push({
            key: { status: "valid", value: _ },
            value: d._parse(new c7(s, L, s.path, _)),
            alwaysSet: _ in s.data,
          });
        }
      }
      if (s.common.async)
        return Promise.resolve()
          .then(async () => {
            let d = [];
            for (let _ of f) {
              let L = await _.key,
                I = await _.value;
              d.push({ key: L, value: I, alwaysSet: _.alwaysSet });
            }
            return d;
          })
          .then((d) => hP.mergeObjectSync(r, d));
      else return hP.mergeObjectSync(r, f);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return (
        cu.errToObj,
        new ND({
          ...this._def,
          unknownKeys: "strict",
          ...(e !== void 0
            ? {
                errorMap: (t, r) => {
                  let s = this._def.errorMap?.(t, r).message ?? r.defaultError;
                  if (t.code === "unrecognized_keys") return { message: cu.errToObj(e).message ?? s };
                  return { message: s };
                },
              }
            : {}),
        })
      );
    }
    strip() {
      return new ND({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new ND({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(e) {
      return new ND({ ...this._def, shape: () => ({ ...this._def.shape(), ...e }) });
    }
    merge(e) {
      return new ND({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
        typeName: oH.ZodObject,
      });
    }
    setKey(e, t) {
      return this.augment({ [e]: t });
    }
    catchall(e) {
      return new ND({ ...this._def, catchall: e });
    }
    pick(e) {
      let t = {};
      for (let r of km.objectKeys(e)) if (e[r] && this.shape[r]) t[r] = this.shape[r];
      return new ND({ ...this._def, shape: () => t });
    }
    omit(e) {
      let t = {};
      for (let r of km.objectKeys(this.shape)) if (!e[r]) t[r] = this.shape[r];
      return new ND({ ...this._def, shape: () => t });
    }
    deepPartial() {
      return zbe(this);
    }
    partial(e) {
      let t = {};
      for (let r of km.objectKeys(this.shape)) {
        let s = this.shape[r];
        if (e && !e[r]) t[r] = s;
        else t[r] = s.optional();
      }
      return new ND({ ...this._def, shape: () => t });
    }
    required(e) {
      let t = {};
      for (let r of km.objectKeys(this.shape))
        if (e && !e[r]) t[r] = this.shape[r];
        else {
          let a = this.shape[r];
          while (a instanceof gX) a = a._def.innerType;
          t[r] = a;
        }
      return new ND({ ...this._def, shape: () => t });
    }
    keyof() {
      return lwi(km.objectKeys(this.shape));
    }
  };
  ND.create = (e, t) =>
    new ND({ shape: () => e, unknownKeys: "strip", catchall: QZ.create(), typeName: oH.ZodObject, ...kp(t) });
  ND.strictCreate = (e, t) =>
    new ND({
      shape: () => e,
      unknownKeys: "strict",
      catchall: QZ.create(),
      typeName: oH.ZodObject,
      ...kp(t),
    });
  ND.lazycreate = (e, t) =>
    new ND({ shape: e, unknownKeys: "strip", catchall: QZ.create(), typeName: oH.ZodObject, ...kp(t) });
  y5e = class y5e extends Yd {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = this._def.options;
      function s(a) {
        for (let u of a) if (u.result.status === "valid") return u.result;
        for (let u of a)
          if (u.result.status === "dirty") return (t.common.issues.push(...u.ctx.common.issues), u.result);
        let H = a.map((u) => new UN(u.ctx.common.issues));
        return (mc(t, { code: qa.invalid_union, unionErrors: H }), Pl);
      }
      if (t.common.async)
        return Promise.all(
          r.map(async (a) => {
            let H = { ...t, common: { ...t.common, issues: [] }, parent: null };
            return { result: await a._parseAsync({ data: t.data, path: t.path, parent: H }), ctx: H };
          }),
        ).then(s);
      else {
        let a = void 0,
          H = [];
        for (let f of r) {
          let d = { ...t, common: { ...t.common, issues: [] }, parent: null },
            _ = f._parseSync({ data: t.data, path: t.path, parent: d });
          if (_.status === "valid") return _;
          else if (_.status === "dirty" && !a) a = { result: _, ctx: d };
          if (d.common.issues.length) H.push(d.common.issues);
        }
        if (a) return (t.common.issues.push(...a.ctx.common.issues), a.result);
        let u = H.map((f) => new UN(f));
        return (mc(t, { code: qa.invalid_union, unionErrors: u }), Pl);
      }
    }
    get options() {
      return this._def.options;
    }
  };
  y5e.create = (e, t) => new y5e({ options: e, typeName: oH.ZodUnion, ...kp(t) });
  NIr = class NIr extends Yd {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== Xc.object)
        return (mc(t, { code: qa.invalid_type, expected: Xc.object, received: t.parsedType }), Pl);
      let r = this.discriminator,
        s = t.data[r],
        a = this.optionsMap.get(s);
      if (!a)
        return (
          mc(t, {
            code: qa.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [r],
          }),
          Pl
        );
      if (t.common.async) return a._parseAsync({ data: t.data, path: t.path, parent: t });
      else return a._parseSync({ data: t.data, path: t.path, parent: t });
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e, t, r) {
      let s = new Map();
      for (let a of t) {
        let H = KZ(a.shape[e]);
        if (!H.length)
          throw Error(
            `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
          );
        for (let u of H) {
          if (s.has(u)) throw Error(`Discriminator property ${String(e)} has duplicate value ${String(u)}`);
          s.set(u, a);
        }
      }
      return new NIr({
        typeName: oH.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: s,
        ...kp(r),
      });
    }
  };
  M5e = class M5e extends Yd {
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e),
        s = (a, H) => {
          if (CIr(a) || CIr(H)) return Pl;
          let u = UIr(a.value, H.value);
          if (!u.valid) return (mc(r, { code: qa.invalid_intersection_types }), Pl);
          if (wIr(a) || wIr(H)) t.dirty();
          return { status: t.value, value: u.data };
        };
      if (r.common.async)
        return Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({ data: r.data, path: r.path, parent: r }),
        ]).then(([a, H]) => s(a, H));
      else
        return s(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r }),
        );
    }
  };
  M5e.create = (e, t, r) => new M5e({ left: e, right: t, typeName: oH.ZodIntersection, ...kp(r) });
  YZ = class YZ extends Yd {
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e);
      if (r.parsedType !== Xc.array)
        return (mc(r, { code: qa.invalid_type, expected: Xc.array, received: r.parsedType }), Pl);
      if (r.data.length < this._def.items.length)
        return (
          mc(r, {
            code: qa.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array",
          }),
          Pl
        );
      if (!this._def.rest && r.data.length > this._def.items.length)
        (mc(r, {
          code: qa.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
          t.dirty());
      let a = [...r.data]
        .map((H, u) => {
          let f = this._def.items[u] || this._def.rest;
          if (!f) return null;
          return f._parse(new c7(r, H, r.path, u));
        })
        .filter((H) => !!H);
      if (r.common.async) return Promise.all(a).then((H) => hP.mergeArray(t, H));
      else return hP.mergeArray(t, a);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new YZ({ ...this._def, rest: e });
    }
  };
  YZ.create = (e, t) => {
    if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new YZ({ items: e, typeName: oH.ZodTuple, rest: null, ...kp(t) });
  };
  ETt = class ETt extends Yd {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e);
      if (r.parsedType !== Xc.object)
        return (mc(r, { code: qa.invalid_type, expected: Xc.object, received: r.parsedType }), Pl);
      let s = [],
        a = this._def.keyType,
        H = this._def.valueType;
      for (let u in r.data)
        s.push({
          key: a._parse(new c7(r, u, r.path, u)),
          value: H._parse(new c7(r, r.data[u], r.path, u)),
          alwaysSet: u in r.data,
        });
      if (r.common.async) return hP.mergeObjectAsync(t, s);
      else return hP.mergeObjectSync(t, s);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, r) {
      if (t instanceof Yd) return new ETt({ keyType: e, valueType: t, typeName: oH.ZodRecord, ...kp(r) });
      return new ETt({ keyType: zZ.create(), valueType: e, typeName: oH.ZodRecord, ...kp(t) });
    }
  };
  ITt = class ITt extends Yd {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e);
      if (r.parsedType !== Xc.map)
        return (mc(r, { code: qa.invalid_type, expected: Xc.map, received: r.parsedType }), Pl);
      let s = this._def.keyType,
        a = this._def.valueType,
        H = [...r.data.entries()].map(([u, f], d) => ({
          key: s._parse(new c7(r, u, r.path, [d, "key"])),
          value: a._parse(new c7(r, f, r.path, [d, "value"])),
        }));
      if (r.common.async) {
        let u = new Map();
        return Promise.resolve().then(async () => {
          for (let f of H) {
            let d = await f.key,
              _ = await f.value;
            if (d.status === "aborted" || _.status === "aborted") return Pl;
            if (d.status === "dirty" || _.status === "dirty") t.dirty();
            u.set(d.value, _.value);
          }
          return { status: t.value, value: u };
        });
      } else {
        let u = new Map();
        for (let f of H) {
          let { key: d, value: _ } = f;
          if (d.status === "aborted" || _.status === "aborted") return Pl;
          if (d.status === "dirty" || _.status === "dirty") t.dirty();
          u.set(d.value, _.value);
        }
        return { status: t.value, value: u };
      }
    }
  };
  ITt.create = (e, t, r) => new ITt({ valueType: t, keyType: e, typeName: oH.ZodMap, ...kp(r) });
  Zbe = class Zbe extends Yd {
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e);
      if (r.parsedType !== Xc.set)
        return (mc(r, { code: qa.invalid_type, expected: Xc.set, received: r.parsedType }), Pl);
      let s = this._def;
      if (s.minSize !== null) {
        if (r.data.size < s.minSize.value)
          (mc(r, {
            code: qa.too_small,
            minimum: s.minSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: s.minSize.message,
          }),
            t.dirty());
      }
      if (s.maxSize !== null) {
        if (r.data.size > s.maxSize.value)
          (mc(r, {
            code: qa.too_big,
            maximum: s.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: s.maxSize.message,
          }),
            t.dirty());
      }
      let a = this._def.valueType;
      function H(f) {
        let d = new Set();
        for (let _ of f) {
          if (_.status === "aborted") return Pl;
          if (_.status === "dirty") t.dirty();
          d.add(_.value);
        }
        return { status: t.value, value: d };
      }
      let u = [...r.data.values()].map((f, d) => a._parse(new c7(r, f, r.path, d)));
      if (r.common.async) return Promise.all(u).then((f) => H(f));
      else return H(u);
    }
    min(e, t) {
      return new Zbe({ ...this._def, minSize: { value: e, message: cu.toString(t) } });
    }
    max(e, t) {
      return new Zbe({ ...this._def, maxSize: { value: e, message: cu.toString(t) } });
    }
    size(e, t) {
      return this.min(e, t).max(e, t);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  Zbe.create = (e, t) =>
    new Zbe({ valueType: e, minSize: null, maxSize: null, typeName: oH.ZodSet, ...kp(t) });
  g5e = class g5e extends Yd {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== Xc.function)
        return (mc(t, { code: qa.invalid_type, expected: Xc.function, received: t.parsedType }), Pl);
      function r(u, f) {
        return _Tt({
          data: u,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, L5e(), _He].filter((d) => !!d),
          issueData: { code: qa.invalid_arguments, argumentsError: f },
        });
      }
      function s(u, f) {
        return _Tt({
          data: u,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, L5e(), _He].filter((d) => !!d),
          issueData: { code: qa.invalid_return_type, returnTypeError: f },
        });
      }
      let a = { errorMap: t.common.contextualErrorMap },
        H = t.data;
      if (this._def.returns instanceof eje) {
        let u = this;
        return Fw(async function (...f) {
          let d = new UN([]),
            _ = await u._def.args.parseAsync(f, a).catch((D) => {
              throw (d.addIssue(r(f, D)), d);
            }),
            L = await Reflect.apply(H, this, _);
          return await u._def.returns._def.type.parseAsync(L, a).catch((D) => {
            throw (d.addIssue(s(L, D)), d);
          });
        });
      } else {
        let u = this;
        return Fw(function (...f) {
          let d = u._def.args.safeParse(f, a);
          if (!d.success) throw new UN([r(f, d.error)]);
          let _ = Reflect.apply(H, this, d.data),
            L = u._def.returns.safeParse(_, a);
          if (!L.success) throw new UN([s(_, L.error)]);
          return L.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new g5e({ ...this._def, args: YZ.create(e).rest(She.create()) });
    }
    returns(e) {
      return new g5e({ ...this._def, returns: e });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, t, r) {
      return new g5e({
        args: e ? e : YZ.create([]).rest(She.create()),
        returns: t || She.create(),
        typeName: oH.ZodFunction,
        ...kp(r),
      });
    }
  };
  x5e = class x5e extends Yd {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
    }
  };
  x5e.create = (e, t) => new x5e({ getter: e, typeName: oH.ZodLazy, ...kp(t) });
  S5e = class S5e extends Yd {
    _parse(e) {
      if (e.data !== this._def.value) {
        let t = this._getOrReturnCtx(e);
        return (mc(t, { received: t.data, code: qa.invalid_literal, expected: this._def.value }), Pl);
      }
      return { status: "valid", value: e.data };
    }
    get value() {
      return this._def.value;
    }
  };
  S5e.create = (e, t) => new S5e({ value: e, typeName: oH.ZodLiteral, ...kp(t) });
  The = class The extends Yd {
    _parse(e) {
      if (typeof e.data !== "string") {
        let t = this._getOrReturnCtx(e),
          r = this._def.values;
        return (mc(t, { expected: km.joinValues(r), received: t.parsedType, code: qa.invalid_type }), Pl);
      }
      if (!this._cache) this._cache = new Set(this._def.values);
      if (!this._cache.has(e.data)) {
        let t = this._getOrReturnCtx(e),
          r = this._def.values;
        return (mc(t, { received: t.data, code: qa.invalid_enum_value, options: r }), Pl);
      }
      return Fw(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let e = {};
      for (let t of this._def.values) e[t] = t;
      return e;
    }
    get Values() {
      let e = {};
      for (let t of this._def.values) e[t] = t;
      return e;
    }
    get Enum() {
      let e = {};
      for (let t of this._def.values) e[t] = t;
      return e;
    }
    extract(e, t = this._def) {
      return The.create(e, { ...this._def, ...t });
    }
    exclude(e, t = this._def) {
      return The.create(
        this.options.filter((r) => !e.includes(r)),
        { ...this._def, ...t },
      );
    }
  };
  The.create = lwi;
  T5e = class T5e extends Yd {
    _parse(e) {
      let t = km.getValidEnumValues(this._def.values),
        r = this._getOrReturnCtx(e);
      if (r.parsedType !== Xc.string && r.parsedType !== Xc.number) {
        let s = km.objectValues(t);
        return (mc(r, { expected: km.joinValues(s), received: r.parsedType, code: qa.invalid_type }), Pl);
      }
      if (!this._cache) this._cache = new Set(km.getValidEnumValues(this._def.values));
      if (!this._cache.has(e.data)) {
        let s = km.objectValues(t);
        return (mc(r, { received: r.data, code: qa.invalid_enum_value, options: s }), Pl);
      }
      return Fw(e.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  T5e.create = (e, t) => new T5e({ values: e, typeName: oH.ZodNativeEnum, ...kp(t) });
  eje = class eje extends Yd {
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== Xc.promise && t.common.async === !1)
        return (mc(t, { code: qa.invalid_type, expected: Xc.promise, received: t.parsedType }), Pl);
      let r = t.parsedType === Xc.promise ? t.data : Promise.resolve(t.data);
      return Fw(
        r.then((s) => this._def.type.parseAsync(s, { path: t.path, errorMap: t.common.contextualErrorMap })),
      );
    }
  };
  eje.create = (e, t) => new eje({ type: e, typeName: oH.ZodPromise, ...kp(t) });
  EX = class EX extends Yd {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === oH.ZodEffects
        ? this._def.schema.sourceType()
        : this._def.schema;
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e),
        s = this._def.effect || null,
        a = {
          addIssue: (H) => {
            if ((mc(r, H), H.fatal)) t.abort();
            else t.dirty();
          },
          get path() {
            return r.path;
          },
        };
      if (((a.addIssue = a.addIssue.bind(a)), s.type === "preprocess")) {
        let H = s.transform(r.data, a);
        if (r.common.async)
          return Promise.resolve(H).then(async (u) => {
            if (t.value === "aborted") return Pl;
            let f = await this._def.schema._parseAsync({ data: u, path: r.path, parent: r });
            if (f.status === "aborted") return Pl;
            if (f.status === "dirty") return Kbe(f.value);
            if (t.value === "dirty") return Kbe(f.value);
            return f;
          });
        else {
          if (t.value === "aborted") return Pl;
          let u = this._def.schema._parseSync({ data: H, path: r.path, parent: r });
          if (u.status === "aborted") return Pl;
          if (u.status === "dirty") return Kbe(u.value);
          if (t.value === "dirty") return Kbe(u.value);
          return u;
        }
      }
      if (s.type === "refinement") {
        let H = (u) => {
          let f = s.refinement(u, a);
          if (r.common.async) return Promise.resolve(f);
          if (f instanceof Promise)
            throw Error(
              "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
            );
          return u;
        };
        if (r.common.async === !1) {
          let u = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
          if (u.status === "aborted") return Pl;
          if (u.status === "dirty") t.dirty();
          return (H(u.value), { status: t.value, value: u.value });
        } else
          return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((u) => {
            if (u.status === "aborted") return Pl;
            if (u.status === "dirty") t.dirty();
            return H(u.value).then(() => ({ status: t.value, value: u.value }));
          });
      }
      if (s.type === "transform")
        if (r.common.async === !1) {
          let H = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
          if (!xhe(H)) return Pl;
          let u = s.transform(H.value, a);
          if (u instanceof Promise)
            throw Error(
              "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
            );
          return { status: t.value, value: u };
        } else
          return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((H) => {
            if (!xhe(H)) return Pl;
            return Promise.resolve(s.transform(H.value, a)).then((u) => ({ status: t.value, value: u }));
          });
      km.assertNever(s);
    }
  };
  EX.create = (e, t, r) => new EX({ schema: e, typeName: oH.ZodEffects, effect: t, ...kp(r) });
  EX.createWithPreprocess = (e, t, r) =>
    new EX({ schema: t, effect: { type: "preprocess", transform: e }, typeName: oH.ZodEffects, ...kp(r) });
  gX = class gX extends Yd {
    _parse(e) {
      if (this._getType(e) === Xc.undefined) return Fw(void 0);
      return this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  gX.create = (e, t) => new gX({ innerType: e, typeName: oH.ZodOptional, ...kp(t) });
  hHe = class hHe extends Yd {
    _parse(e) {
      if (this._getType(e) === Xc.null) return Fw(null);
      return this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  hHe.create = (e, t) => new hHe({ innerType: e, typeName: oH.ZodNullable, ...kp(t) });
  v5e = class v5e extends Yd {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = t.data;
      if (t.parsedType === Xc.undefined) r = this._def.defaultValue();
      return this._def.innerType._parse({ data: r, path: t.path, parent: t });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  v5e.create = (e, t) =>
    new v5e({
      innerType: e,
      typeName: oH.ZodDefault,
      defaultValue: typeof t.default === "function" ? t.default : () => t.default,
      ...kp(t),
    });
  b5e = class b5e extends Yd {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = { ...t, common: { ...t.common, issues: [] } },
        s = this._def.innerType._parse({ data: r.data, path: r.path, parent: { ...r } });
      if ($5e(s))
        return s.then((a) => ({
          status: "valid",
          value:
            a.status === "valid"
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new UN(r.common.issues);
                  },
                  input: r.data,
                }),
        }));
      else
        return {
          status: "valid",
          value:
            s.status === "valid"
              ? s.value
              : this._def.catchValue({
                  get error() {
                    return new UN(r.common.issues);
                  },
                  input: r.data,
                }),
        };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  b5e.create = (e, t) =>
    new b5e({
      innerType: e,
      typeName: oH.ZodCatch,
      catchValue: typeof t.catch === "function" ? t.catch : () => t.catch,
      ...kp(t),
    });
  DTt = class DTt extends Yd {
    _parse(e) {
      if (this._getType(e) !== Xc.nan) {
        let r = this._getOrReturnCtx(e);
        return (mc(r, { code: qa.invalid_type, expected: Xc.nan, received: r.parsedType }), Pl);
      }
      return { status: "valid", value: e.data };
    }
  };
  DTt.create = (e) => new DTt({ typeName: oH.ZodNaN, ...kp(e) });
  _8c = Symbol("zod_brand");
  FIr = class FIr extends Yd {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = t.data;
      return this._def.type._parse({ data: r, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  };
  yTt = class yTt extends Yd {
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e);
      if (r.common.async)
        return (async () => {
          let a = await this._def.in._parseAsync({ data: r.data, path: r.path, parent: r });
          if (a.status === "aborted") return Pl;
          if (a.status === "dirty") return (t.dirty(), Kbe(a.value));
          else return this._def.out._parseAsync({ data: a.value, path: r.path, parent: r });
        })();
      else {
        let s = this._def.in._parseSync({ data: r.data, path: r.path, parent: r });
        if (s.status === "aborted") return Pl;
        if (s.status === "dirty") return (t.dirty(), { status: "dirty", value: s.value });
        else return this._def.out._parseSync({ data: s.value, path: r.path, parent: r });
      }
    }
    static create(e, t) {
      return new yTt({ in: e, out: t, typeName: oH.ZodPipeline });
    }
  };
  j5e = class j5e extends Yd {
    _parse(e) {
      let t = this._def.innerType._parse(e),
        r = (s) => {
          if (xhe(s)) s.value = Object.freeze(s.value);
          return s;
        };
      return $5e(t) ? t.then((s) => r(s)) : r(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  j5e.create = (e, t) => new j5e({ innerType: e, typeName: oH.ZodReadonly, ...kp(t) });
  h8c = { object: ND.lazycreate };
  (function (e) {
    ((e.ZodString = "ZodString"),
      (e.ZodNumber = "ZodNumber"),
      (e.ZodNaN = "ZodNaN"),
      (e.ZodBigInt = "ZodBigInt"),
      (e.ZodBoolean = "ZodBoolean"),
      (e.ZodDate = "ZodDate"),
      (e.ZodSymbol = "ZodSymbol"),
      (e.ZodUndefined = "ZodUndefined"),
      (e.ZodNull = "ZodNull"),
      (e.ZodAny = "ZodAny"),
      (e.ZodUnknown = "ZodUnknown"),
      (e.ZodNever = "ZodNever"),
      (e.ZodVoid = "ZodVoid"),
      (e.ZodArray = "ZodArray"),
      (e.ZodObject = "ZodObject"),
      (e.ZodUnion = "ZodUnion"),
      (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
      (e.ZodIntersection = "ZodIntersection"),
      (e.ZodTuple = "ZodTuple"),
      (e.ZodRecord = "ZodRecord"),
      (e.ZodMap = "ZodMap"),
      (e.ZodSet = "ZodSet"),
      (e.ZodFunction = "ZodFunction"),
      (e.ZodLazy = "ZodLazy"),
      (e.ZodLiteral = "ZodLiteral"),
      (e.ZodEnum = "ZodEnum"),
      (e.ZodEffects = "ZodEffects"),
      (e.ZodNativeEnum = "ZodNativeEnum"),
      (e.ZodOptional = "ZodOptional"),
      (e.ZodNullable = "ZodNullable"),
      (e.ZodDefault = "ZodDefault"),
      (e.ZodCatch = "ZodCatch"),
      (e.ZodPromise = "ZodPromise"),
      (e.ZodBranded = "ZodBranded"),
      (e.ZodPipeline = "ZodPipeline"),
      (e.ZodReadonly = "ZodReadonly"));
  })(oH || (oH = {}));
  ((L8c = zZ.create),
    ($8c = Qbe.create),
    (g8c = DTt.create),
    (E8c = Ybe.create),
    (I8c = hTt.create),
    (D8c = E5e.create),
    (y8c = LTt.create),
    (M8c = I5e.create),
    (x8c = D5e.create),
    (S8c = $Tt.create),
    (T8c = She.create),
    (v8c = QZ.create),
    (b8c = gTt.create),
    (j8c = $X.create),
    (P8c = ND.create),
    (C8c = ND.strictCreate),
    (w8c = y5e.create),
    (k8c = NIr.create),
    (O8c = M5e.create),
    (U8c = YZ.create),
    (N8c = ETt.create),
    (F8c = ITt.create),
    (B8c = Zbe.create),
    (R8c = g5e.create),
    (W8c = x5e.create),
    (V8c = S5e.create),
    (q8c = The.create),
    (G8c = T5e.create),
    (X8c = eje.create),
    (J8c = EX.create),
    (K8c = gX.create),
    (z8c = hHe.create),
    (Q8c = EX.createWithPreprocess),
    (Y8c = yTt.create));
});