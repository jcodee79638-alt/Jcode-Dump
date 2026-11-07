
function Z6i({ output: e, schema: t, enumValues: r }) {
  switch (e) {
    case "object":
      return wTa(Rw(t));
    case "array":
      return kTa(Rw(t));
    case "enum":
      return OTa(r);
    case "no-schema":
      return CTa;
    default:
      throw Error(`Unsupported output: ${e}`);
  }
}