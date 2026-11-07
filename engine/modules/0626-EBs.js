
function EBs(e) {
  switch (e._tag) {
    default:
      return e;
    case "Declaration":
    case "Arrays":
    case "Objects":
    case "Union":
    case "Suspend":
      return e.recur(GAn);
  }
}