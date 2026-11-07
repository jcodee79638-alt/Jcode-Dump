
function mBe(e) {
  switch (e._tag) {
    case "InvalidType":
    case "OneOf":
    case "Composite":
    case "AnyOf":
      return dBe(e.ast.annotations);
    case "InvalidValue":
    case "Forbidden":
      return dBe(e.annotations);
    case "MissingKey":
      return dBe(e.annotations, "messageMissingKey");
    case "UnexpectedKey":
      return dBe(e.ast.annotations, "messageUnexpectedKey");
    case "Filter":
      return dBe(e.filter.annotations);
    case "Encoding":
      return mBe(e.issue);
  }
}