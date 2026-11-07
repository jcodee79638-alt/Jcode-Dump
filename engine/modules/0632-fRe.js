
function fRe(e) {
  switch (e._tag) {
    case "MissingKey":
      return !0;
    case "InvalidType":
    case "InvalidValue":
      return vl(e.actual) || (Nu(e.actual) && e.actual.value === void 0);
    case "OneOf":
      return e.actual === void 0;
    case "Encoding":
      return vl(e.actual) || (Nu(e.actual) && e.actual.value === void 0) ? !0 : fRe(e.issue);
    case "Pointer":
      return fRe(e.issue);
    case "Filter":
    case "UnexpectedKey":
    case "Forbidden":
      return !1;
    case "Composite":
      return e.issues.every(fRe);
    case "AnyOf":
      if (e.issues.length === 0) return e.actual === void 0;
      return e.issues.every(fRe);
  }
}