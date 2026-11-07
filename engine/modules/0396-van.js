
function van(e) {
  switch (e._tag) {
    case "Literal":
      return { literals: RAt(e.literal) ? [e.literal] : [], parameters: [] };
    case "UniqueSymbol":
      return { literals: [e.symbol], parameters: [] };
    case "String":
    case "Number":
    case "Symbol":
    case "TemplateLiteral":
      return { literals: [], parameters: [e] };
    case "Union": {
      let t = { literals: [], parameters: [] };
      for (let r = 0; r < e.types.length; r++) {
        let s = van(e.types[r]);
        ((t.literals = t.literals.concat(s.literals)), (t.parameters = t.parameters.concat(s.parameters)));
      }
      return t;
    }
  }
  return { literals: [], parameters: [] };
}