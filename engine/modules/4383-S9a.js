
function S9a(e) {
  if (!e) throw TypeError("argument string is required");
  var t = typeof e === "object" ? T9a(e) : e;
  if (typeof t !== "string") throw TypeError("argument string is required to be a string");
  var r = t.indexOf(";"),
    s = r !== -1 ? t.slice(0, r).trim() : t.trim();
  if (!x9a.test(s)) throw TypeError("invalid media type");
  var a = new v9a(s.toLowerCase());
  if (r !== -1) {
    var H, u, f;
    UBi.lastIndex = r;
    while ((u = UBi.exec(t))) {
      if (u.index !== r) throw TypeError("invalid parameter format");
      if (((r += u[0].length), (H = u[1].toLowerCase()), (f = u[2]), f.charCodeAt(0) === 34)) {
        if (((f = f.slice(1, -1)), f.indexOf("\\") !== -1)) f = f.replace(M9a, "$1");
      }
      a.parameters[H] = f;
    }
    if (r !== t.length) throw TypeError("invalid parameter format");
  }
  return a;
}