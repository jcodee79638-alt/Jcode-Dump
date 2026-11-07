
function wan(e) {
  switch (e._tag) {
    case "Literal":
      return $lt(globalThis.String(e.literal));
    case "String":
      return eYt;
    case "Number":
      return SBe;
    case "BigInt":
      return Nan;
    case "TemplateLiteral":
      return Can(e, !1);
    case "Union":
      return e.types.map(wan).join("|");
  }
}