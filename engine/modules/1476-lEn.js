
var lEn = ne(() => {
  R0n();
  nEn();
  ((LMe = new Map()),
    (cEn =
      typeof process === "object" && process
        ? process.env?.__MINIMATCH_TESTING_PLATFORM__ || "win32"
        : "posix"),
    (iEn = { win32: { sep: "\\" }, posix: { sep: "/" } }),
    (XJs = cEn === "win32" ? iEn.win32.sep : iEn.posix.sep));
  pw.sep = XJs;
  QM = Symbol("globstar **");
  pw.GLOBSTAR = QM;
  pw.filter = JJs;
  pw.defaults = KJs;
  pw.braceExpand = AEn;
  pw.match = zJs;
  ((sEn = /[?*]|[+@!]\(.*?\)|\[|\]/), ($nr = {}));
  pw.Minimatch = n_t;
  pw.escape = dnr;
  pw.unescape = mnr;
});