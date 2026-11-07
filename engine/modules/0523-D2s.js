
function D2s(e) {
  switch (e._tag) {
    case "BigInt":
    case "Symbol":
    case "UniqueSymbol":
      return 0;
    default:
      return 1;
  }
}