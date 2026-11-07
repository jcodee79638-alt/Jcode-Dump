
function Ian(e) {
  switch (e._tag) {
    case "Null":
      return ["null"];
    case "Undefined":
    case "Void":
      return ["undefined"];
    case "String":
    case "TemplateLiteral":
      return ["string"];
    case "Number":
      return ["number"];
    case "Boolean":
      return ["boolean"];
    case "Symbol":
    case "UniqueSymbol":
      return ["symbol"];
    case "BigInt":
      return ["bigint"];
    case "Arrays":
      return ["array"];
    case "ObjectKeyword":
      return ["object", "array", "function"];
    case "Objects":
      return e.propertySignatures.length || e.indexSignatures.length ? ["object"] : ["object", "array"];
    case "Enum":
      return Array.from(new Set(e.enums.map(([, t]) => typeof t)));
    case "Literal":
      return [typeof e.literal];
    case "Union":
      return Array.from(new Set(e.types.flatMap(Ian)));
    default:
      return [
        "null",
        "undefined",
        "string",
        "number",
        "boolean",
        "symbol",
        "bigint",
        "object",
        "array",
        "function",
      ];
  }
}