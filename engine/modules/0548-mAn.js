
function mAn(e) {
  return t(e);
  function t(s) {
    return r(
      Nft(s, (a) => a.replace(_An, "#/definitions")),
      !0,
    );
  }
  function r(s, a) {
    if (Array.isArray(s)) return s.map((_) => r(_, !1));
    if (!Dv(s)) return s;
    let H = s,
      u = {},
      f = void 0,
      d = void 0;
    for (let _ of Object.keys(H)) {
      let L = H[_];
      switch (_) {
        case "$ref":
        case "type":
        case "required":
        case "enum":
        case "const":
        case "title":
        case "description":
        case "default":
        case "examples":
        case "format":
        case "pattern":
        case "minimum":
        case "maximum":
        case "exclusiveMinimum":
        case "exclusiveMaximum":
        case "minLength":
        case "maxLength":
        case "minItems":
        case "maxItems":
        case "minProperties":
        case "maxProperties":
        case "multipleOf":
        case "uniqueItems":
          u[_] = L;
          break;
        case "properties":
        case "patternProperties": {
          let I = j2s(L, r);
          u[_] = I ?? L;
          break;
        }
        case "additionalProperties":
        case "propertyNames":
          u[_] = r(L, !1);
          break;
        case "allOf":
        case "anyOf":
        case "oneOf":
          u[_] = Array.isArray(L) ? L.map((I) => r(I, !1)) : L;
          break;
        case "prefixItems":
          f = L;
          break;
        case "items":
          d = L;
          break;
        default:
          break;
      }
    }
    if (f !== void 0)
      if (Array.isArray(f)) {
        if (((u.items = f.map((_) => r(_, !1))), d !== void 0)) u.additionalItems = r(d, !1);
      } else u.items = r(f, !1);
    else if (d !== void 0) u.items = r(d, !1);
    return u;
  }
}