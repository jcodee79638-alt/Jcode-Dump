
var yVi = ne(() => {
  LVi();
  JSr();
  wee();
  ((gVi = {
    brackets(e) {
      return String(e) + "[]";
    },
    comma: "comma",
    indices(e, t) {
      return String(e) + "[" + t + "]";
    },
    repeat(e) {
      return String(e);
    },
  }),
    (Lx = {
      addQueryPrefix: !1,
      allowDots: !1,
      allowEmptyArrays: !1,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: !1,
      delimiter: "&",
      encode: !0,
      encodeDotInKeys: !1,
      encoder: _Vi,
      encodeValuesOnly: !1,
      format: qSr,
      formatter: GSr,
      indices: !1,
      serializeDate(e) {
        return ($Vi ?? ($Vi = Function.prototype.call.bind(Date.prototype.toISOString)))(e);
      },
      skipNulls: !1,
      strictNullHandling: !1,
    }));
  QSr = {};
});