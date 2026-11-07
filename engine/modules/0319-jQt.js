
var jQt = "~effect/SchemaIssue/Issue",
  i2,
  wQt,
  kQt,
  v6,
  _Be,
  Mlt,
  XM,
  OU,
  hy,
  hBe,
  xlt,
  OQt,
  yon = (e) => {
    let t = mBe(e);
    if (t !== void 0) return t;
    switch (e._tag) {
      case "InvalidType":
        return CQt(hlt(e.ast), Eon(e.actual));
      case "InvalidValue":
        return `Invalid data ${Eon(e.actual)}`;
      case "MissingKey":
        return "Missing key";
      case "UnexpectedKey":
        return `Unexpected key with value ${af(e.actual)}`;
      case "Forbidden":
        return "Forbidden operation";
      case "OneOf":
        return `Expected exactly one member to match the input ${af(e.actual)}`;
    }
  },
  Mon = (e) => mBe(e.issue) ?? mBe(e),
  TNs;