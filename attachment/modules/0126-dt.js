
function dt(c) {
  if (c instanceof zt || c instanceof Cs || c instanceof _s || c instanceof Xe || c instanceof fs) return c;
  switch (
    (c instanceof Error ||
      (typeof c == "object" && c !== null) ||
      $('wrapReason: Expected "reason" to be a (possibly cloned) Error.'),
    c.name)
  ) {
    case "AbortException":
      return new zt(c.message);
    case "InvalidPDFException":
      return new Cs(c.message);
    case "PasswordException":
      return new _s(c.message, c.code);
    case "ResponseException":
      return new Xe(c.message, c.status, c.missing);
    case "UnknownErrorException":
      return new fs(c.message, c.details);
  }
  return new fs(c.message, c.toString());
}