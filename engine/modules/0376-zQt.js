
function zQt(e) {
  switch (e._tag) {
    case "Declaration":
    case "Arrays":
    case "Objects":
    case "Union":
      return e.encodingChecks;
    default:
      return;
  }
}