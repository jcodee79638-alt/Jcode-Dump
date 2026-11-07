
var cwi = (e, t) => {
    if (xhe(t)) return { success: !0, data: t.value };
    else {
      if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
      return {
        success: !1,
        get error() {
          if (this._error) return this._error;
          let r = new UN(e.common.issues);
          return ((this._error = r), this._error);
        },
      };
    }
  },
  s1a,
  o1a,
  a1a,
  H1a,
  c1a,
  A1a,
  u1a,
  l1a,
  f1a = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$",
  OIr,
  p1a,
  d1a,
  m1a,
  _1a,
  h1a,
  L1a,
  Awi =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  $1a,
  zZ,
  Qbe,
  Ybe,
  hTt,
  E5e,
  LTt,
  I5e,
  D5e,
  $Tt,
  She,
  QZ,
  gTt,
  $X,
  ND,
  y5e,
  KZ = (e) => {
    if (e instanceof x5e) return KZ(e.schema);
    else if (e instanceof EX) return KZ(e.innerType());
    else if (e instanceof S5e) return [e.value];
    else if (e instanceof The) return e.options;
    else if (e instanceof T5e) return km.objectValues(e.enum);
    else if (e instanceof v5e) return KZ(e._def.innerType);
    else if (e instanceof I5e) return [void 0];
    else if (e instanceof D5e) return [null];
    else if (e instanceof gX) return [void 0, ...KZ(e.unwrap())];
    else if (e instanceof hHe) return [null, ...KZ(e.unwrap())];
    else if (e instanceof FIr) return KZ(e.unwrap());
    else if (e instanceof j5e) return KZ(e.unwrap());
    else if (e instanceof b5e) return KZ(e._def.innerType);
    else return [];
  },
  NIr,
  M5e,
  YZ,
  ETt,
  ITt,
  Zbe,
  g5e,
  x5e,
  S5e,
  The,
  T5e,
  eje,
  EX,
  gX,
  hHe,
  v5e,
  b5e,
  DTt,
  _8c,
  FIr,
  yTt,
  j5e,
  h8c,
  oH,
  L8c,
  $8c,
  g8c,
  E8c,
  I8c,
  D8c,
  y8c,
  M8c,
  x8c,
  S8c,
  T8c,
  v8c,
  b8c,
  j8c,
  P8c,
  C8c,
  w8c,
  k8c,
  O8c,
  U8c,
  N8c,
  F8c,
  B8c,
  R8c,
  W8c,
  V8c,
  q8c,
  G8c,
  X8c,
  J8c,
  K8c,
  z8c,
  Q8c,
  Y8c;