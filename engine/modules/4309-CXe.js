
var CXe = Ie(function ($Ni) {
  Object.defineProperty($Ni, "__esModule", { value: !0 });
  $Ni.reportTypeError =
    $Ni.checkDataTypes =
    $Ni.checkDataType =
    $Ni.coerceAndCheckDataType =
    $Ni.getJSONTypes =
    $Ni.getSchemaTypes =
    $Ni.DataType =
      void 0;
  var dNi = M1r(),
    mNi = x1r(),
    _Ni = PXe(),
    RH = fd(),
    Yvt = x_(),
    Pje;
  (function (e) {
    ((e[(e.Correct = 0)] = "Correct"), (e[(e.Wrong = 1)] = "Wrong"));
  })(Pje || ($Ni.DataType = Pje = {}));
  function Hka(e) {
    let t = hNi(e.type);
    if (t.includes("null")) {
      if (e.nullable === !1) throw Error("type: null contradicts nullable: false");
    } else {
      if (!t.length && e.nullable !== void 0) throw Error('"nullable" cannot be used without "type"');
      if (e.nullable === !0) t.push("null");
    }
    return t;
  }
  $Ni.getSchemaTypes = Hka;
  function hNi(e) {
    let t = Array.isArray(e) ? e : e ? [e] : [];
    if (t.every(dNi.isJSONType)) return t;
    throw Error("type must be JSONType or JSONType[]: " + t.join(","));
  }
  $Ni.getJSONTypes = hNi;
  function cka(e, t) {
    let { gen: r, data: s, opts: a } = e,
      H = Aka(t, a.coerceTypes),
      u = t.length > 0 && !(H.length === 0 && t.length === 1 && mNi.schemaHasRulesForType(e, t[0]));
    if (u) {
      let f = T1r(t, s, a.strictNumbers, Pje.Wrong);
      r.if(f, () => {
        if (H.length) uka(e, t, H);
        else v1r(e);
      });
    }
    return u;
  }
  $Ni.coerceAndCheckDataType = cka;
  var LNi = new Set(["string", "number", "integer", "boolean", "null"]);
  function Aka(e, t) {
    return t ? e.filter((r) => LNi.has(r) || (t === "array" && r === "array")) : [];
  }
  function uka(e, t, r) {
    let { gen: s, data: a, opts: H } = e,
      u = s.let("dataType", RH._`typeof ${a}`),
      f = s.let("coerced", RH._`undefined`);
    if (H.coerceTypes === "array")
      s.if(RH._`${u} == 'object' && Array.isArray(${a}) && ${a}.length == 1`, () =>
        s
          .assign(a, RH._`${a}[0]`)
          .assign(u, RH._`typeof ${a}`)
          .if(T1r(t, a, H.strictNumbers), () => s.assign(f, a)),
      );
    s.if(RH._`${f} !== undefined`);
    for (let _ of r) if (LNi.has(_) || (_ === "array" && H.coerceTypes === "array")) d(_);
    (s.else(),
      v1r(e),
      s.endIf(),
      s.if(RH._`${f} !== undefined`, () => {
        (s.assign(a, f), lka(e, f));
      }));
    function d(_) {
      switch (_) {
        case "string":
          s.elseIf(RH._`${u} == "number" || ${u} == "boolean"`)
            .assign(f, RH._`"" + ${a}`)
            .elseIf(RH._`${a} === null`)
            .assign(f, RH._`""`);
          return;
        case "number":
          s.elseIf(
            RH._`${u} == "boolean" || ${a} === null
              || (${u} == "string" && ${a} && ${a} == +${a})`,
          ).assign(f, RH._`+${a}`);
          return;
        case "integer":
          s.elseIf(
            RH._`${u} === "boolean" || ${a} === null
              || (${u} === "string" && ${a} && ${a} == +${a} && !(${a} % 1))`,
          ).assign(f, RH._`+${a}`);
          return;
        case "boolean":
          s.elseIf(RH._`${a} === "false" || ${a} === 0 || ${a} === null`)
            .assign(f, !1)
            .elseIf(RH._`${a} === "true" || ${a} === 1`)
            .assign(f, !0);
          return;
        case "null":
          (s.elseIf(RH._`${a} === "" || ${a} === 0 || ${a} === false`), s.assign(f, null));
          return;
        case "array":
          s.elseIf(
            RH._`${u} === "string" || ${u} === "number"
              || ${u} === "boolean" || ${a} === null`,
          ).assign(f, RH._`[${a}]`);
      }
    }
  }
  function lka({ gen: e, parentData: t, parentDataProperty: r }, s) {
    e.if(RH._`${t} !== undefined`, () => e.assign(RH._`${t}[${r}]`, s));
  }
  function S1r(e, t, r, s = Pje.Correct) {
    let a = s === Pje.Correct ? RH.operators.EQ : RH.operators.NEQ,
      H;
    switch (e) {
      case "null":
        return RH._`${t} ${a} null`;
      case "array":
        H = RH._`Array.isArray(${t})`;
        break;
      case "object":
        H = RH._`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
        break;
      case "integer":
        H = u(RH._`!(${t} % 1) && !isNaN(${t})`);
        break;
      case "number":
        H = u();
        break;
      default:
        return RH._`typeof ${t} ${a} ${e}`;
    }
    return s === Pje.Correct ? H : RH.not(H);
    function u(f = RH.nil) {
      return RH.and(RH._`typeof ${t} == "number"`, f, r ? RH._`isFinite(${t})` : RH.nil);
    }
  }
  $Ni.checkDataType = S1r;
  function T1r(e, t, r, s) {
    if (e.length === 1) return S1r(e[0], t, r, s);
    let a,
      H = Yvt.toHash(e);
    if (H.array && H.object) {
      let u = RH._`typeof ${t} != "object"`;
      ((a = H.null ? u : RH._`!${t} || ${u}`), delete H.null, delete H.array, delete H.object);
    } else a = RH.nil;
    if (H.number) delete H.integer;
    for (let u in H) a = RH.and(a, S1r(u, t, r, s));
    return a;
  }
  $Ni.checkDataTypes = T1r;
  var fka = {
    message: ({ schema: e }) => `must be ${e}`,
    params: ({ schema: e, schemaValue: t }) =>
      typeof e == "string" ? RH._`{type: ${e}}` : RH._`{type: ${t}}`,
  };
  function v1r(e) {
    let t = pka(e);
    _Ni.reportError(t, fka);
  }
  $Ni.reportTypeError = v1r;
  function pka(e) {
    let { gen: t, data: r, schema: s } = e,
      a = Yvt.schemaRefOrVal(e, s, "type");
    return {
      gen: t,
      keyword: "type",
      data: r,
      schema: s.type,
      schemaCode: a,
      schemaValue: a,
      parentSchema: s,
      params: {},
      it: e,
    };
  }
});