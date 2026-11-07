
function Oft(e) {
  switch (e._tag) {
    case "Literal":
      return $lt(globalThis.String(e.literal));
    case "String":
      return eYt;
    case "Number":
      return SBe;
    case "TemplateLiteral":
      return e.parts.map(Oft).join("");
    case "Union":
      return e.types.map(Oft).join("|");
    default:
      throw new globalThis.Error("Unsupported part", { cause: e });
  }
}