
function mr(c) {
  if (c instanceof URL) return c;
  if (typeof c == "string") {
    if (mt) {
      if (/^[a-z][a-z0-9\-+.]+:/i.test(c)) return new URL(c);
      const e = process.getBuiltinModule("url");
      return new URL(e.pathToFileURL(c));
    }
    const t = URL.parse(c, window.location);
    if (t) return t;
  }
  throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
}