
function Kye(e, t) {
  let r = ME(t);
  switch (r._tag) {
    case "String":
      return Object.keys(e);
    case "TemplateLiteral": {
      let s = n9s(r);
      return Object.keys(e).filter((a) => s.test(a));
    }
    case "Symbol":
      return Object.getOwnPropertySymbols(e);
    case "Number":
      return Object.keys(e).filter((s) => JNs.test(s));
    case "Union":
      return [...new Set(r.types.flatMap((s) => Kye(e, s)))];
    default:
      return [];
  }
}