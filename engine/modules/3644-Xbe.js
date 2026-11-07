
var Xbe = (e, t, r) => {
    if (e[t] === void 0 || r > e[t]) e[t] = r;
  },
  Jbe = (e, t, r) => {
    if (e[t] === void 0 || r < e[t]) e[t] = r;
  },
  zPi = (e, t) => {
    (Xbe(e, "minimum", t), Jbe(e, "maximum", t));
  },
  tCi = (e, t) => {
    if ((e.multipleOf ?? (e.multipleOf = []), !e.multipleOf.includes(t))) e.multipleOf.push(t);
  },
  rCi = (e, t) => {
    (e.patterns ?? (e.patterns = new Set()), e.patterns.add(t));
  },
  nCi = (e, t) => {
    e.mime = e.mime ? e.mime.filter((r) => t.includes(r)) : [...t];
  },
  iCi = (e, t) => {
    if (((e.format = t), t.includes("int"))) e.isInt = !0;
  },
  QPi = (e, t) => Xbe(e, "minimum", t.minimum),
  YPi = (e, t) => Jbe(e, "maximum", t.maximum),
  ZPi = (e) => (t, r) => {
    iCi(t, r.format);
    let [s, a] = e[r.format];
    (Xbe(t, "minimum", s), Jbe(t, "maximum", a));
  },
  QDa,
  YDa,
  ZDa,
  sCi = (e) => ZDa.get(e) ?? e,
  QEr = (e, t, r, s) => {
    let a = r;
    a.type = "string";
    let { minimum: H, maximum: u, format: f, patterns: d, contentEncoding: _, laxFormat: L } = N8(e);
    if (typeof H === "number") a.minLength = H;
    if (typeof u === "number") a.maxLength = u;
    if (f) {
      if (((a.format = YDa[f] ?? f), a.format === "")) delete a.format;
      if (f === "time" || L) delete a.format;
    }
    if (_) a.contentEncoding = _;
    if (d && d.size > 0) {
      let I = [...d].map(sCi);
      if (I.length === 1) a.pattern = I[0].source;
      else if (I.length > 1)
        a.allOf = [
          ...I.map((D) => ({
            ...(t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0"
              ? { type: "string" }
              : {}),
            pattern: D.source,
          })),
        ];
    }
  },
  YEr = (e, t, r, s) => {
    let a = r,
      { minimum: H, maximum: u, multipleOf: f, exclusiveMaximum: d, exclusiveMinimum: _, isInt: L } = N8(e);
    a.type = L ? "integer" : "number";
    let I = typeof _ === "number" && _ >= (H ?? Number.NEGATIVE_INFINITY),
      D = typeof d === "number" && d <= (u ?? Number.POSITIVE_INFINITY),
      S = t.target === "draft-04" || t.target === "openapi-3.0";
    if (I)
      if (S) ((a.minimum = _), (a.exclusiveMinimum = !0));
      else a.exclusiveMinimum = _;
    else if (typeof H === "number") a.minimum = H;
    if (D)
      if (S) ((a.maximum = d), (a.exclusiveMaximum = !0));
      else a.exclusiveMaximum = d;
    else if (typeof u === "number") a.maximum = u;
    if (f) {
      let T = new Set();
      for (let B of f)
        if (Number.isFinite(B) && B !== 0) T.add(Math.abs(B));
        else LT(e, t, a, s, `A multipleOf divisor of ${B} cannot be represented in JSON Schema`);
      let [C, ...O] = T;
      if (C !== void 0) a.multipleOf = C;
      if (O.length) a.allOf = [...(a.allOf ?? []), ...O.map((B) => ({ multipleOf: B }))];
    }
  },
  ZEr = (e, t, r, s) => {
    r.type = "boolean";
  },
  oCi = (e, t, r, s) => {
    LT(e, t, r, s, "BigInt cannot be represented in JSON Schema");
  },
  aCi = (e, t, r, s) => {
    LT(e, t, r, s, "Symbols cannot be represented in JSON Schema");
  },
  eIr = (e, t, r, s) => {
    if (t.target === "openapi-3.0") ((r.type = "string"), (r.nullable = !0), (r.enum = [null]));
    else r.type = "null";
  },
  HCi = (e, t, r, s) => {
    LT(e, t, r, s, "Undefined cannot be represented in JSON Schema");
  },
  cCi = (e, t, r, s) => {
    LT(e, t, r, s, "Void cannot be represented in JSON Schema");
  },
  tIr = (e, t, r, s) => {
    r.not = {};
  },
  rIr = (e, t, r, s) => {},
  nIr = (e, t, r, s) => {},
  ACi = (e, t, r, s) => {
    LT(e, t, r, s, "Date cannot be represented in JSON Schema");
  },
  iIr = (e, t, r, s) => {
    let a = e._zod.def,
      H = QGe(a.entries);
    if (H.length === 0) {
      r.not = {};
      return;
    }
    if (H.every((u) => typeof u === "number")) r.type = "number";
    if (H.every((u) => typeof u === "string")) r.type = "string";
    r.enum = H;
  },
  sIr = (e, t, r, s) => {
    let a = e._zod.def;
    if (a.values.length === 0) {
      r.not = {};
      return;
    }
    let H = [];
    for (let u of a.values)
      if (u === void 0) {
        if (LT(e, t, r, s, "Literal `undefined` cannot be represented in JSON Schema")) return;
      } else if (typeof u === "bigint") {
        if (LT(e, t, r, s, "BigInt literals cannot be represented in JSON Schema")) return;
        H.push(Number(u));
      } else H.push(u);
    if (H.length === 0);
    else if (H.length === 1) {
      let u = H[0];
      if (((r.type = u === null ? "null" : typeof u), t.target === "draft-04" || t.target === "openapi-3.0"))
        r.enum = [u];
      else r.const = u;
    } else {
      if (H.every((u) => typeof u === "number")) r.type = "number";
      if (H.every((u) => typeof u === "string")) r.type = "string";
      if (H.every((u) => typeof u === "boolean")) r.type = "boolean";
      if (H.every((u) => u === null)) r.type = "null";
      r.enum = H;
    }
  },
  uCi = (e, t, r, s) => {
    LT(e, t, r, s, "NaN cannot be represented in JSON Schema");
  },
  lCi = (e, t, r, s) => {
    let a = r,
      H = e._zod.pattern;
    if (!H) throw Error("Pattern not found in template literal");
    ((a.type = "string"), (a.pattern = H.source));
  },
  fCi = (e, t, r, s) => {
    let a = r;
    ((a.type = "string"), (a.format = "binary"), (a.contentEncoding = "binary"));
    let { minimum: H, maximum: u, mime: f } = N8(e);
    if (H !== void 0) a.minLength = H;
    if (u !== void 0) a.maxLength = u;
    if (!f) return;
    if (f.length === 0) a.not = {};
    else if (f.length === 1) a.contentMediaType = f[0];
    else a.anyOf = f.map((d) => ({ contentMediaType: d }));
  },
  pCi = (e, t, r, s) => {
    r.type = "boolean";
  },
  oIr = (e, t, r, s) => {
    LT(e, t, r, s, "Custom types cannot be represented in JSON Schema");
  },
  dCi = (e, t, r, s) => {
    LT(e, t, r, s, "Function types cannot be represented in JSON Schema");
  },
  aIr = (e, t, r, s) => {
    LT(e, t, r, s, "Transforms cannot be represented in JSON Schema");
  },
  mCi = (e, t, r, s) => {
    LT(e, t, r, s, "Map cannot be represented in JSON Schema");
  },
  _Ci = (e, t, r, s) => {
    LT(e, t, r, s, "Set cannot be represented in JSON Schema");
  },
  HIr = (e, t, r, s) => {
    let a = r,
      H = e._zod.def,
      { minimum: u, maximum: f } = N8(e);
    if (typeof u === "number") a.minItems = u;
    if (typeof f === "number") a.maxItems = f;
    ((a.type = "array"), (a.items = Dg(H.element, t, { ...s, path: [...s.path, "items"] })));
  },
  cIr = (e, t, r, s) => {
    let a = r,
      H = e._zod.def,
      u = H.shape;
    if (
      Object.getOwnPropertySymbols(u).length &&
      LT(e, t, a, s, "Symbol keys cannot be represented in JSON Schema")
    )
      return;
    ((a.type = "object"), (a.properties = {}));
    for (let _ in u) wN(a.properties, _, Dg(u[_], t, { ...s, path: [...s.path, "properties", _] }));
    let d = [];
    for (let _ of Object.keys(u)) {
      let L = H.shape[_];
      if (t.io === "input" ? m5e(L) === void 0 : L._zod.optout === void 0) d.push(_);
    }
    if (d.length > 0) a.required = d;
    if (H.catchall?._zod.def.type === "never") a.additionalProperties = !1;
    else if (!H.catchall) {
      if (t.io === "output") a.additionalProperties = !1;
    } else if (H.catchall)
      a.additionalProperties = Dg(H.catchall, t, { ...s, path: [...s.path, "additionalProperties"] });
  },
  AIr = (e, t, r, s) => {
    let a = e._zod.def,
      H = a.inclusive === !1,
      u = a.options.map((f, d) => Dg(f, t, { ...s, path: [...s.path, H ? "oneOf" : "anyOf", d] }));
    if (H) r.oneOf = u;
    else r.anyOf = u;
  },
  uIr = (e, t, r, s) => {
    let a = e._zod.def,
      H = Dg(a.left, t, { ...s, path: [...s.path, "allOf", 0] }),
      u = Dg(a.right, t, { ...s, path: [...s.path, "allOf", 1] }),
      f = (_) => "allOf" in _ && Object.keys(_).length === 1,
      d = [...(f(H) ? H.allOf : [H]), ...(f(u) ? u.allOf : [u])];
    ((r.allOf = d), t.intersections.push(d));
  },
  hCi = (e, t, r, s) => {
    let a = r,
      H = e._zod.def;
    a.type = "array";
    let u = t.target === "draft-2020-12" ? "prefixItems" : "items",
      f = t.target === "draft-2020-12" ? "items" : t.target === "openapi-3.0" ? "items" : "additionalItems",
      d = H.items.map((C, O) => Dg(C, t, { ...s, path: [...s.path, u, O] })),
      _ = H.rest
        ? Dg(H.rest, t, {
            ...s,
            path: [...s.path, f, ...(t.target === "openapi-3.0" ? [H.items.length] : [])],
          })
        : null,
      L = H.items.length;
    while (L > 0) {
      let C = H.items[L - 1];
      if (!(t.io === "input" ? m5e(C) !== void 0 : C._zod.optout === "optional")) break;
      L--;
    }
    let I = H.items.length,
      D = !H.rest;
    if (t.target === "draft-2020-12") {
      if (((a.prefixItems = d), D)) a.items = !1;
      else if (_) a.items = _;
      if (L > 0) a.minItems = L;
      if (D) a.maxItems = I;
    } else if (t.target === "openapi-3.0") {
      if (((a.items = { anyOf: d }), _)) a.items.anyOf.push(_);
      if (L > 0) a.minItems = L;
      if (D) a.maxItems = I;
    } else {
      if (((a.items = d), D)) a.additionalItems = !1;
      else if (_) a.additionalItems = _;
      if (L > 0) a.minItems = L;
      if (D) a.maxItems = I;
    }
    let { minimum: S, maximum: T } = N8(e);
    if (typeof S === "number") a.minItems = S;
    if (typeof T === "number") a.maxItems = T;
  },
  zEr,
  lIr = (e, t, r, s) => {
    let a = r,
      H = e._zod.def;
    a.type = "object";
    let u = H.keyType,
      f = N8(u).patterns;
    if (H.mode === "loose" && f && f.size > 0) {
      let L = Dg(H.valueType, t, { ...s, path: [...s.path, "patternProperties", "*"] });
      a.patternProperties = {};
      for (let I of f) wN(a.patternProperties, sCi(I).source, L);
    } else {
      if (t.target === "draft-07" || t.target === "draft-2020-12") {
        a.propertyNames = Dg(H.keyType, t, { ...s, path: [...s.path, "propertyNames"] });
        let L = zEr.get(t);
        if (!L) ((L = []), zEr.set(t, L), t.deferred.push(() => eya(t)));
        L.push(e);
      }
      a.additionalProperties = Dg(H.valueType, t, { ...s, path: [...s.path, "additionalProperties"] });
    }
    let d = u._zod.values,
      _ = t.io === "input" && m5e(H.valueType) !== void 0;
    if (d && !H.partial && !_) {
      let L = [...d].filter((I) => typeof I === "string" || typeof I === "number");
      if (L.length > 0) a.required = L.map(String);
    }
  },
  fIr = (e, t, r, s) => {
    let a = e._zod.def,
      H = Dg(a.innerType, t, s),
      u = t.seen.get(e);
    if (t.target === "openapi-3.0") ((u.ref = a.innerType), (r.nullable = !0));
    else r.anyOf = [H, { type: "null" }];
  },
  pIr = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    H.ref = a.innerType;
  },
  dIr,
  mIr = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    H.ref = a.innerType;
    let u = LCi(a.defaultValue, e, t, r, s);
    if (u !== dIr) r.default = u;
  },
  _Ir = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    if (((H.ref = a.innerType), t.io !== "input")) return;
    let u = LCi(a.defaultValue, e, t, r, s);
    if (u !== dIr) r._prefault = u;
  },
  hIr = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    H.ref = a.innerType;
    let u;
    try {
      u = a.catchValue(void 0);
    } catch {
      LT(e, t, r, s, "Dynamic catch values are not supported in JSON Schema");
      return;
    }
    r.default = u;
  },
  LIr = (e, t, r, s) => {
    let a = e._zod.def,
      H = a.in._zod.traits.has("$ZodTransform"),
      u = t.io === "input" ? (H ? a.out : a.in) : a.out;
    Dg(u, t, s);
    let f = t.seen.get(e);
    f.ref = u;
  },
  $Ir = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    ((H.ref = a.innerType), (r.readOnly = !0));
  },
  $Ci = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    H.ref = a.innerType;
  },
  rTt = (e, t, r, s) => {
    let a = e._zod.def;
    Dg(a.innerType, t, s);
    let H = t.seen.get(e);
    H.ref = a.innerType;
  },
  gIr = (e, t, r, s) => {
    let a = e._zod.innerType;
    Dg(a, t, s);
    let H = t.seen.get(e);
    H.ref = a;
  },
  eCi;