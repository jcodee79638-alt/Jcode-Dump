
var VNi = Ie(function (wKc, WNi) {
  var RHe = (WNi.exports = function (e, t, r) {
    if (typeof t == "function") ((r = t), (t = {}));
    r = t.cb || r;
    var s = typeof r == "function" ? r : r.pre || function () {},
      a = r.post || function () {};
    ebt(t, s, a, e, "", e);
  });
  RHe.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0,
  };
  RHe.arrayKeywords = { items: !0, allOf: !0, anyOf: !0, oneOf: !0 };
  RHe.propsKeywords = { $defs: !0, definitions: !0, properties: !0, patternProperties: !0, dependencies: !0 };
  RHe.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0,
  };
  function ebt(e, t, r, s, a, H, u, f, d, _) {
    if (s && typeof s == "object" && !Array.isArray(s)) {
      t(s, a, H, u, f, d, _);
      for (var L in s) {
        var I = s[L];
        if (Array.isArray(I)) {
          if (L in RHe.arrayKeywords)
            for (var D = 0; D < I.length; D++) ebt(e, t, r, I[D], a + "/" + L + "/" + D, H, a, L, s, D);
        } else if (L in RHe.propsKeywords) {
          if (I && typeof I == "object")
            for (var S in I) ebt(e, t, r, I[S], a + "/" + L + "/" + i6a(S), H, a, L, s, S);
        } else if (L in RHe.keywords || (e.allKeys && !(L in RHe.skipKeywords)))
          ebt(e, t, r, I, a + "/" + L, H, a, L, s);
      }
      r(s, a, H, u, f, d, _);
    }
  }
  function i6a(e) {
    return e.replace(/~/g, "~0").replace(/\//g, "~1");
  }
});