
function Pan(e) {
  switch (e._tag) {
    case "Undefined":
      return !0;
    case "Union":
      return e.types.some(Pan);
    default:
      return !1;
  }
}