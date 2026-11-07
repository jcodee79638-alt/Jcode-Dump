
var B8 = class {
    constructor() {
      ((this.status = { type: "pending" }), (this._resolve = void 0), (this._reject = void 0));
    }
    get promise() {
      if (this._promise) return this._promise;
      return (
        (this._promise = new Promise((e, t) => {
          if (this.status.type === "resolved") e(this.status.value);
          else if (this.status.type === "rejected") t(this.status.error);
          ((this._resolve = e), (this._reject = t));
        })),
        this._promise
      );
    }
    resolve(e) {
      var t;
      if (((this.status = { type: "resolved", value: e }), this._promise))
        (t = this._resolve) == null || t.call(this, e);
    }
    reject(e) {
      var t;
      if (((this.status = { type: "rejected", error: e }), this._promise))
        (t = this._reject) == null || t.call(this, e);
    }
    isResolved() {
      return this.status.type === "resolved";
    }
    isRejected() {
      return this.status.type === "rejected";
    }
    isPending() {
      return this.status.type === "pending";
    }
  },
  S1a,
  T1a,
  Swi = "AI_DownloadError",
  Twi,
  v1a,
  Lwi,
  $wi,
  $T,
  VIr,
  U1a,
  F1a = 10,
  B1a,
  jTt = 2147483648,
  DX = ({
    prefix: e,
    size: t = 16,
    alphabet: r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    separator: s = "-",
  } = {}) => {
    let a = () => {
      let H = r.length,
        u = Array(t);
      for (let f = 0; f < t; f++) u[f] = r[(Math.random() * H) | 0];
      return u.join("");
    };
    if (e == null) return a;
    if (r.includes(s))
      throw new SAt({
        argument: "separator",
        message: `The separator "${s}" must not be part of the alphabet "${r}".`,
      });
    return () => `${e}${s}${a()}`;
  },
  rje,
  V1a,
  q1a,
  J1a = "4.0.62",
  K1a,
  z1a,
  Y1a,
  Dwi,
  Z1a = (e) => (typeof e === "string" ? { ...Dwi, name: e } : { ...Dwi, ...e }),
  nMa = (e, t) => YL(e.innerType._def, t),
  iMa = (e) => {
    let t = { type: "integer", format: "unix-time" };
    for (let r of e.checks)
      switch (r.kind) {
        case "min":
          t.minimum = r.value;
          break;
        case "max":
          t.maximum = r.value;
          break;
      }
    return t;
  },
  HMa = (e) => {
    if ("type" in e && e.type === "string") return !1;
    return "allOf" in e;
  },
  qIr = void 0,
  A7,
  uMa,
  XIr,
  hMa = (e, t) => {
    let r = (e.options instanceof Map ? Array.from(e.options.values()) : e.options)
      .map((s, a) => YL(s._def, { ...t, currentPath: [...t.currentPath, "anyOf", `${a}`] }))
      .filter((s) => !!s && (!t.strictUnions || (typeof s === "object" && Object.keys(s).length > 0)));
    return r.length ? { anyOf: r } : void 0;
  },
  DMa = (e, t) => {
    var r;
    if (t.currentPath.toString() === ((r = t.propertyPath) == null ? void 0 : r.toString()))
      return YL(e.innerType._def, t);
    let s = YL(e.innerType._def, { ...t, currentPath: [...t.currentPath, "anyOf", "1"] });
    return s ? { anyOf: [{ not: NN() }, s] } : NN();
  },
  yMa = (e, t) => {
    if (t.pipeStrategy === "input") return YL(e.in._def, t);
    else if (t.pipeStrategy === "output") return YL(e.out._def, t);
    let r = YL(e.in._def, { ...t, currentPath: [...t.currentPath, "allOf", "0"] }),
      s = YL(e.out._def, { ...t, currentPath: [...t.currentPath, "allOf", r ? "1" : "0"] });
    return { allOf: [r, s].filter((a) => a !== void 0) };
  },
  bMa = (e, t) => YL(e.innerType._def, t),
  jMa = (e, t, r) => {
    switch (t) {
      case oH.ZodString:
        return Uwi(e, r);
      case oH.ZodNumber:
        return $Ma(e);
      case oH.ZodObject:
        return gMa(e, r);
      case oH.ZodBigInt:
        return tMa(e);
      case oH.ZodBoolean:
        return rMa();
      case oH.ZodDate:
        return Owi(e, r);
      case oH.ZodUndefined:
        return TMa();
      case oH.ZodNull:
        return mMa();
      case oH.ZodArray:
        return eMa(e, r);
      case oH.ZodUnion:
      case oH.ZodDiscriminatedUnion:
        return _Ma(e, r);
      case oH.ZodIntersection:
        return cMa(e, r);
      case oH.ZodTuple:
        return SMa(e, r);
      case oH.ZodRecord:
        return Nwi(e, r);
      case oH.ZodLiteral:
        return AMa(e);
      case oH.ZodEnum:
        return aMa(e);
      case oH.ZodNativeEnum:
        return pMa(e);
      case oH.ZodNullable:
        return LMa(e, r);
      case oH.ZodOptional:
        return DMa(e, r);
      case oH.ZodMap:
        return fMa(e, r);
      case oH.ZodSet:
        return xMa(e, r);
      case oH.ZodLazy:
        return () => e.getter()._def;
      case oH.ZodPromise:
        return MMa(e, r);
      case oH.ZodNaN:
      case oH.ZodNever:
        return dMa();
      case oH.ZodEffects:
        return oMa(e, r);
      case oH.ZodAny:
        return NN();
      case oH.ZodUnknown:
        return vMa();
      case oH.ZodDefault:
        return sMa(e, r);
      case oH.ZodBranded:
        return kwi(e, r);
      case oH.ZodReadonly:
        return bMa(e, r);
      case oH.ZodCatch:
        return nMa(e, r);
      case oH.ZodPipeline:
        return yMa(e, r);
      case oH.ZodFunction:
      case oH.ZodVoid:
      case oH.ZodSymbol:
        return;
      default:
        return ((s) => {
          return;
        })(t);
    }
  },
  PMa = (e, t) => {
    let r = 0;
    for (; r < e.length && r < t.length; r++) if (e[r] !== t[r]) break;
    return [(e.length - r).toString(), ...t.slice(r)].join("/");
  },
  CMa = (e, t) => {
    switch (t.$refStrategy) {
      case "root":
        return { $ref: e.path.join("/") };
      case "relative":
        return { $ref: PMa(t.currentPath, e.path) };
      case "none":
      case "seen": {
        if (e.path.length < t.currentPath.length && e.path.every((r, s) => t.currentPath[s] === r))
          return (
            console.warn(`Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`),
            NN()
          );
        return t.$refStrategy === "seen" ? NN() : void 0;
      }
    }
  },
  wMa = (e, t, r) => {
    if (e.description) r.description = e.description;
    return r;
  },
  kMa = (e) => {
    let t = Z1a(e),
      r = t.name !== void 0 ? [...t.basePath, t.definitionPath, t.name] : t.basePath;
    return {
      ...t,
      currentPath: r,
      propertyPath: void 0,
      seen: new Map(
        Object.entries(t.definitions).map(([s, a]) => [
          a._def,
          { def: a._def, path: [...t.basePath, t.definitionPath, s], jsonSchema: void 0 },
        ]),
      ),
    };
  },
  OMa = (e, t) => {
    var r;
    let s = kMa(t),
      a =
        typeof t === "object" && t.definitions
          ? Object.entries(t.definitions).reduce((_, [L, I]) => {
              var D;
              return {
                ..._,
                [L]:
                  (D = YL(I._def, { ...s, currentPath: [...s.basePath, s.definitionPath, L] }, !0)) != null
                    ? D
                    : NN(),
              };
            }, {})
          : void 0,
      H =
        typeof t === "string"
          ? t
          : (t == null ? void 0 : t.nameStrategy) === "title"
            ? void 0
            : t == null
              ? void 0
              : t.name,
      u =
        (r = YL(
          e._def,
          H === void 0 ? s : { ...s, currentPath: [...s.basePath, s.definitionPath, H] },
          !1,
        )) != null
          ? r
          : NN(),
      f = typeof t === "object" && t.name !== void 0 && t.nameStrategy === "title" ? t.name : void 0;
    if (f !== void 0) u.title = f;
    let d =
      H === void 0
        ? a
          ? { ...u, [s.definitionPath]: a }
          : u
        : {
            $ref: [...(s.$refStrategy === "relative" ? [] : s.basePath), s.definitionPath, H].join("/"),
            [s.definitionPath]: { ...a, [H]: u },
          };
    return ((d.$schema = "http://json-schema.org/draft-07/schema#"), d);
  },
  JIr,
  qMa = () => globalThis.fetch,
  yX = async ({
    url: e,
    headers: t,
    body: r,
    failedResponseHandler: s,
    successfulResponseHandler: a,
    abortSignal: H,
    fetch: u,
  }) =>
    Rwi({
      url: e,
      headers: { "Content-Type": "application/json", ...t },
      body: { content: JSON.stringify(r), values: r },
      failedResponseHandler: s,
      successfulResponseHandler: a,
      abortSignal: H,
      fetch: u,
    }),
  Bwi = async ({
    url: e,
    headers: t,
    formData: r,
    failedResponseHandler: s,
    successfulResponseHandler: a,
    abortSignal: H,
    fetch: u,
  }) =>
    Rwi({
      url: e,
      headers: t,
      body: { content: r, values: Object.fromEntries(r.entries()) },
      failedResponseHandler: s,
      successfulResponseHandler: a,
      abortSignal: H,
      fetch: u,
    }),
  Rwi = async ({
    url: e,
    headers: t = {},
    body: r,
    successfulResponseHandler: s,
    failedResponseHandler: a,
    abortSignal: H,
    fetch: u = qMa(),
  }) => {
    try {
      let f = await u(e, {
          method: "POST",
          headers: gHe(t, `ai-sdk/provider-utils/${J1a}`, YIr()),
          body: r.content,
          signal: H,
        }),
        d = TTt(f);
      if (!f.ok) {
        let _;
        try {
          _ = await a({ response: f, url: e, requestBodyValues: r.values });
        } catch (L) {
          if ($He(L) || U0.isInstance(L)) throw L;
          throw new U0({
            message: "Failed to process error response",
            cause: L,
            statusCode: f.status,
            url: e,
            responseHeaders: d,
            requestBodyValues: r.values,
          });
        }
        throw _.value;
      }
      try {
        return await s({ response: f, url: e, requestBodyValues: r.values });
      } catch (_) {
        if (_ instanceof Error) {
          if ($He(_) || U0.isInstance(_)) throw _;
        }
        throw new U0({
          message: "Failed to process successful response",
          cause: _,
          statusCode: f.status,
          url: e,
          responseHeaders: d,
          requestBodyValues: r.values,
        });
      }
    } catch (f) {
      throw Pwi({ error: f, url: e, requestBodyValues: r.values });
    }
  },
  GMa,
  ZZ =
    ({ errorSchema: e, errorToMessage: t, isRetryable: r }) =>
    async ({ response: s, url: a, requestBodyValues: H }) => {
      let u = await Wwi({ response: s, url: a }),
        f = TTt(s);
      if (u.trim() === "")
        return {
          responseHeaders: f,
          value: new U0({
            message: s.statusText,
            url: a,
            requestBodyValues: H,
            statusCode: s.status,
            responseHeaders: f,
            responseBody: u,
            isRetryable: r == null ? void 0 : r(s),
          }),
        };
      try {
        let d = await VMa({ text: u, schema: e });
        return {
          responseHeaders: f,
          value: new U0({
            message: t(d),
            url: a,
            requestBodyValues: H,
            statusCode: s.status,
            responseHeaders: f,
            responseBody: u,
            data: d,
            isRetryable: r == null ? void 0 : r(s, d),
          }),
        };
      } catch (d) {
        return {
          responseHeaders: f,
          value: new U0({
            message: s.statusText,
            url: a,
            requestBodyValues: H,
            statusCode: s.status,
            responseHeaders: f,
            responseBody: u,
            isRetryable: r == null ? void 0 : r(s),
          }),
        };
      }
    },
  wTt =
    (e) =>
    async ({ response: t, url: r, requestBodyValues: s }) => {
      let a = TTt(t);
      if (t.body == null) throw new xJt({});
      return {
        responseHeaders: a,
        value: Fwi({
          stream: XMa({
            stream: t.body,
            url: r,
            requestBodyValues: s,
            statusCode: t.status,
            responseHeaders: a,
          }),
          schema: e,
        }),
      };
    },
  eee =
    (e) =>
    async ({ response: t, url: r, requestBodyValues: s }) => {
      let a = await Wwi({ response: t, url: r }),
        H = await LP({ text: a, schema: e }),
        u = TTt(t);
      if (!H.success)
        throw new U0({
          message: "Invalid JSON response",
          cause: H.error,
          statusCode: t.status,
          responseHeaders: u,
          responseBody: a,
          url: r,
          requestBodyValues: s,
        });
      return { responseHeaders: u, value: H.value, rawValue: H.rawValue };
    };