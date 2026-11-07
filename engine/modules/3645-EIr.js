
var EIr = ne(() => {
  s5e();
  IEr();
  tTt();
  k8();
  QDa = {
    greater_than: (e, t) => Xbe(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
    less_than: (e, t) => Jbe(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
    multiple_of: (e, t) => tCi(e, t.value),
    number_format: ZPi(MSt),
    bigint_format: ZPi(Y0r),
    min_length: QPi,
    max_length: YPi,
    length_equals: (e, t) => zPi(e, t.length),
    min_size: QPi,
    max_size: YPi,
    size_equals: (e, t) => zPi(e, t.size),
    string_format: (e, t) => {
      if ((iCi(e, t.format), t.pattern)) rCi(e, t.pattern);
      if (t.format === "base64" || t.format === "base64url") e.contentEncoding = t.format;
      if (t.local || t.precision === -1) e.laxFormat = !0;
    },
    mime_type: (e, t) => nCi(e, t.mime),
  };
  ((YDa = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" }),
    (ZDa = new Map([
      [hEr, dbi],
      [WSt, mbi],
    ])));
  zEr = new WeakMap();
  dIr = Symbol();
  eCi = {
    string: QEr,
    number: YEr,
    boolean: ZEr,
    bigint: oCi,
    symbol: aCi,
    null: eIr,
    undefined: HCi,
    void: cCi,
    never: tIr,
    any: rIr,
    unknown: nIr,
    date: ACi,
    enum: iIr,
    literal: sIr,
    nan: uCi,
    template_literal: lCi,
    file: fCi,
    success: pCi,
    custom: oIr,
    function: dCi,
    transform: aIr,
    map: mCi,
    set: _Ci,
    array: HIr,
    object: cIr,
    union: AIr,
    intersection: uIr,
    tuple: hCi,
    record: lIr,
    nullable: fIr,
    nonoptional: pIr,
    default: mIr,
    prefault: _Ir,
    catch: hIr,
    pipe: LIr,
    readonly: $Ir,
    promise: $Ci,
    optional: rTt,
    lazy: gIr,
  };
});