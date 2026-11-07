
var x_ = Ie(function (KUi) {
  Object.defineProperty(KUi, "__esModule", { value: !0 });
  KUi.checkStrictMode =
    KUi.getErrorPath =
    KUi.Type =
    KUi.useFunc =
    KUi.setEvaluated =
    KUi.evaluatedPropsToName =
    KUi.mergeEvaluated =
    KUi.eachItem =
    KUi.unescapeJsonPointer =
    KUi.escapeJsonPointer =
    KUi.escapeFragment =
    KUi.unescapeFragment =
    KUi.schemaRefOrVal =
    KUi.schemaHasRulesButRef =
    KUi.schemaHasRules =
    KUi.checkUnknownRules =
    KUi.alwaysValidSchema =
    KUi.toHash =
      void 0;
  var el = fd(),
    WUi = bXe();
  function cwa(e) {
    let t = {};
    for (let r of e) t[r] = !0;
    return t;
  }
  KUi.toHash = cwa;
  function Awa(e, t) {
    if (typeof t == "boolean") return t;
    if (Object.keys(t).length === 0) return !0;
    return (VUi(e, t), !qUi(t, e.self.RULES.all));
  }
  KUi.alwaysValidSchema = Awa;
  function VUi(e, t = e.schema) {
    let { opts: r, self: s } = e;
    if (!r.strictSchema) return;
    if (typeof t === "boolean") return;
    let a = s.RULES.keywords;
    for (let H in t) if (!a[H]) JUi(e, `unknown keyword: "${H}"`);
  }
  KUi.checkUnknownRules = VUi;
  function qUi(e, t) {
    if (typeof e == "boolean") return !e;
    for (let r in e) if (t[r]) return !0;
    return !1;
  }
  KUi.schemaHasRules = qUi;
  function uwa(e, t) {
    if (typeof e == "boolean") return !e;
    for (let r in e) if (r !== "$ref" && t.all[r]) return !0;
    return !1;
  }
  KUi.schemaHasRulesButRef = uwa;
  function lwa({ topSchemaRef: e, schemaPath: t }, r, s, a) {
    if (!a) {
      if (typeof r == "number" || typeof r == "boolean") return r;
      if (typeof r == "string") return el._`${r}`;
    }
    return el._`${e}${t}${el.getProperty(s)}`;
  }
  KUi.schemaRefOrVal = lwa;
  function fwa(e) {
    return GUi(decodeURIComponent(e));
  }
  KUi.unescapeFragment = fwa;
  function pwa(e) {
    return encodeURIComponent(I1r(e));
  }
  KUi.escapeFragment = pwa;
  function I1r(e) {
    if (typeof e == "number") return `${e}`;
    return e.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  KUi.escapeJsonPointer = I1r;
  function GUi(e) {
    return e.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  KUi.unescapeJsonPointer = GUi;
  function dwa(e, t) {
    if (Array.isArray(e)) for (let r of e) t(r);
    else t(e);
  }
  KUi.eachItem = dwa;
  function BUi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: s }) {
    return (a, H, u, f) => {
      let d =
        u === void 0
          ? H
          : u instanceof el.Name
            ? (H instanceof el.Name ? e(a, H, u) : t(a, H, u), u)
            : H instanceof el.Name
              ? (t(a, u, H), H)
              : r(H, u);
      return f === el.Name && !(d instanceof el.Name) ? s(a, d) : d;
    };
  }
  KUi.mergeEvaluated = {
    props: BUi({
      mergeNames: (e, t, r) =>
        e.if(el._`${r} !== true && ${t} !== undefined`, () => {
          e.if(
            el._`${t} === true`,
            () => e.assign(r, !0),
            () => e.assign(r, el._`${r} || {}`).code(el._`Object.assign(${r}, ${t})`),
          );
        }),
      mergeToName: (e, t, r) =>
        e.if(el._`${r} !== true`, () => {
          if (t === !0) e.assign(r, !0);
          else (e.assign(r, el._`${r} || {}`), D1r(e, r, t));
        }),
      mergeValues: (e, t) => (e === !0 ? !0 : { ...e, ...t }),
      resultToName: XUi,
    }),
    items: BUi({
      mergeNames: (e, t, r) =>
        e.if(el._`${r} !== true && ${t} !== undefined`, () =>
          e.assign(r, el._`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`),
        ),
      mergeToName: (e, t, r) =>
        e.if(el._`${r} !== true`, () => e.assign(r, t === !0 ? !0 : el._`${r} > ${t} ? ${r} : ${t}`)),
      mergeValues: (e, t) => (e === !0 ? !0 : Math.max(e, t)),
      resultToName: (e, t) => e.var("items", t),
    }),
  };
  function XUi(e, t) {
    if (t === !0) return e.var("props", !0);
    let r = e.var("props", el._`{}`);
    if (t !== void 0) D1r(e, r, t);
    return r;
  }
  KUi.evaluatedPropsToName = XUi;
  function D1r(e, t, r) {
    Object.keys(r).forEach((s) => e.assign(el._`${t}${el.getProperty(s)}`, !0));
  }
  KUi.setEvaluated = D1r;
  var RUi = {};
  function mwa(e, t) {
    return e.scopeValue("func", { ref: t, code: RUi[t.code] || (RUi[t.code] = new WUi._Code(t.code)) });
  }
  KUi.useFunc = mwa;
  var E1r;
  (function (e) {
    ((e[(e.Num = 0)] = "Num"), (e[(e.Str = 1)] = "Str"));
  })(E1r || (KUi.Type = E1r = {}));
  function _wa(e, t, r) {
    if (e instanceof el.Name) {
      let s = t === E1r.Num;
      return r
        ? s
          ? el._`"[" + ${e} + "]"`
          : el._`"['" + ${e} + "']"`
        : s
          ? el._`"/" + ${e}`
          : el._`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return r ? el.getProperty(e).toString() : "/" + I1r(e);
  }
  KUi.getErrorPath = _wa;
  function JUi(e, t, r = e.opts.strictSchema) {
    if (!r) return;
    if (((t = `strict mode: ${t}`), r === !0)) throw Error(t);
    e.self.logger.warn(t);
  }
  KUi.checkStrictMode = JUi;
});