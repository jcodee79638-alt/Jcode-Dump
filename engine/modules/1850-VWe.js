
var VWe = Ie(function (Rno) {
  var tXH = cr("path"),
    {
      REGEX_BACKSLASH: Uno,
      REGEX_REMOVE_BACKSLASH: Nno,
      REGEX_SPECIAL_CHARS: Fno,
      REGEX_SPECIAL_CHARS_GLOBAL: Bno,
    } = WWe();
  Rno.isObject = (e) => e !== null && typeof e === "object" && !Array.isArray(e);
  Rno.hasRegexChars = (e) => Fno.test(e);
  Rno.isRegexChar = (e) => e.length === 1 && Rno.hasRegexChars(e);
  Rno.escapeRegex = (e) => e.replace(Bno, "\\$1");
  Rno.toPosixSlashes = (e) => e.replace(Uno, "/");
  Rno.removeBackslashes = (e) => e.replace(Nno, (t) => (t === "\\" ? "" : t));
  Rno.supportsLookbehinds = () => {
    let e = process.version.slice(1).split(".").map(Number);
    if ((e.length === 3 && e[0] >= 9) || (e[0] === 8 && e[1] >= 10)) return !0;
    return !1;
  };
  Rno.isWindows = (e) => {
    if (e && typeof e.windows === "boolean") return e.windows;
    return !0;
  };
  Rno.escapeLast = (e, t, r) => {
    let s = e.lastIndexOf(t, r);
    if (s === -1) return e;
    if (e[s - 1] === "\\") return Rno.escapeLast(e, t, s - 1);
    return `${e.slice(0, s)}\\${e.slice(s)}`;
  };
  Rno.removePrefix = (e, t = {}) => {
    let r = e;
    if (r.startsWith("./")) ((r = r.slice(2)), (t.prefix = "./"));
    return r;
  };
  Rno.wrapOutput = (e, t = {}, r = {}) => {
    let s = r.contains ? "" : "^",
      a = r.contains ? "" : "$",
      H = `${s}(?:${e})${a}`;
    if (t.negated === !0) H = `(?:^(?!${H}).*$)`;
    return H;
  };
});