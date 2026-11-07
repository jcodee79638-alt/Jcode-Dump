
var Swe = Ie(function (xJ, TQi) {
  var { MAX_SAFE_COMPONENT_LENGTH: tCr, MAX_SAFE_BUILD_LENGTH: KYa, MAX_LENGTH: zYa } = xwe(),
    QYa = jQe();
  xJ = TQi.exports = {};
  var YYa = (xJ.re = []),
    ZYa = (xJ.safeRe = []),
    HA = (xJ.src = []),
    eZa = (xJ.safeSrc = []),
    cA = (xJ.t = {}),
    tZa = 0,
    rCr = "[a-zA-Z0-9-]",
    rZa = [
      ["\\s", 1],
      ["\\d", zYa],
      [rCr, KYa],
    ],
    nZa = (e) => {
      for (let [t, r] of rZa) e = e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);
      return e;
    },
    yp = (e, t, r) => {
      let s = nZa(t),
        a = tZa++;
      (QYa(e, a, t),
        (cA[e] = a),
        (HA[a] = t),
        (eZa[a] = s),
        (YYa[a] = new RegExp(t, r ? "g" : void 0)),
        (ZYa[a] = new RegExp(s, r ? "g" : void 0)));
    };
  yp("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  yp("NUMERICIDENTIFIERLOOSE", "\\d+");
  yp("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${rCr}*`);
  yp(
    "MAINVERSION",
    `(${HA[cA.NUMERICIDENTIFIER]})\\.(${HA[cA.NUMERICIDENTIFIER]})\\.(${HA[cA.NUMERICIDENTIFIER]})`,
  );
  yp(
    "MAINVERSIONLOOSE",
    `(${HA[cA.NUMERICIDENTIFIERLOOSE]})\\.(${HA[cA.NUMERICIDENTIFIERLOOSE]})\\.(${HA[cA.NUMERICIDENTIFIERLOOSE]})`,
  );
  yp("PRERELEASEIDENTIFIER", `(?:${HA[cA.NONNUMERICIDENTIFIER]}|${HA[cA.NUMERICIDENTIFIER]})`);
  yp("PRERELEASEIDENTIFIERLOOSE", `(?:${HA[cA.NONNUMERICIDENTIFIER]}|${HA[cA.NUMERICIDENTIFIERLOOSE]})`);
  yp("PRERELEASE", `(?:-(${HA[cA.PRERELEASEIDENTIFIER]}(?:\\.${HA[cA.PRERELEASEIDENTIFIER]})*))`);
  yp(
    "PRERELEASELOOSE",
    `(?:-?(${HA[cA.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${HA[cA.PRERELEASEIDENTIFIERLOOSE]})*))`,
  );
  yp("BUILDIDENTIFIER", `${rCr}+`);
  yp("BUILD", `(?:\\+(${HA[cA.BUILDIDENTIFIER]}(?:\\.${HA[cA.BUILDIDENTIFIER]})*))`);
  yp("FULLPLAIN", `v?${HA[cA.MAINVERSION]}${HA[cA.PRERELEASE]}?${HA[cA.BUILD]}?`);
  yp("FULL", `^${HA[cA.FULLPLAIN]}$`);
  yp("LOOSEPLAIN", `[v=\\s]*${HA[cA.MAINVERSIONLOOSE]}${HA[cA.PRERELEASELOOSE]}?${HA[cA.BUILD]}?`);
  yp("LOOSE", `^${HA[cA.LOOSEPLAIN]}$`);
  yp("GTLT", "((?:<|>)?=?)");
  yp("XRANGEIDENTIFIERLOOSE", `${HA[cA.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  yp("XRANGEIDENTIFIER", `${HA[cA.NUMERICIDENTIFIER]}|x|X|\\*`);
  yp(
    "XRANGEPLAIN",
    `[v=\\s]*(${HA[cA.XRANGEIDENTIFIER]})(?:\\.(${HA[cA.XRANGEIDENTIFIER]})(?:\\.(${HA[cA.XRANGEIDENTIFIER]})(?:${HA[cA.PRERELEASE]})?${HA[cA.BUILD]}?)?)?`,
  );
  yp(
    "XRANGEPLAINLOOSE",
    `[v=\\s]*(${HA[cA.XRANGEIDENTIFIERLOOSE]})(?:\\.(${HA[cA.XRANGEIDENTIFIERLOOSE]})(?:\\.(${HA[cA.XRANGEIDENTIFIERLOOSE]})(?:${HA[cA.PRERELEASELOOSE]})?${HA[cA.BUILD]}?)?)?`,
  );
  yp("XRANGE", `^${HA[cA.GTLT]}\\s*${HA[cA.XRANGEPLAIN]}$`);
  yp("XRANGELOOSE", `^${HA[cA.GTLT]}\\s*${HA[cA.XRANGEPLAINLOOSE]}$`);
  yp("COERCEPLAIN", `(^|[^\\d])(\\d{1,${tCr}})(?:\\.(\\d{1,${tCr}}))?(?:\\.(\\d{1,${tCr}}))?`);
  yp("COERCE", `${HA[cA.COERCEPLAIN]}(?:$|[^\\d])`);
  yp("COERCEFULL", HA[cA.COERCEPLAIN] + `(?:${HA[cA.PRERELEASE]})?(?:${HA[cA.BUILD]})?(?:$|[^\\d])`);
  yp("COERCERTL", HA[cA.COERCE], !0);
  yp("COERCERTLFULL", HA[cA.COERCEFULL], !0);
  yp("LONETILDE", "(?:~>?)");
  yp("TILDETRIM", `(\\s*)${HA[cA.LONETILDE]}\\s+`, !0);
  xJ.tildeTrimReplace = "$1~";
  yp("TILDE", `^${HA[cA.LONETILDE]}${HA[cA.XRANGEPLAIN]}$`);
  yp("TILDELOOSE", `^${HA[cA.LONETILDE]}${HA[cA.XRANGEPLAINLOOSE]}$`);
  yp("LONECARET", "(?:\\^)");
  yp("CARETTRIM", `(\\s*)${HA[cA.LONECARET]}\\s+`, !0);
  xJ.caretTrimReplace = "$1^";
  yp("CARET", `^${HA[cA.LONECARET]}${HA[cA.XRANGEPLAIN]}$`);
  yp("CARETLOOSE", `^${HA[cA.LONECARET]}${HA[cA.XRANGEPLAINLOOSE]}$`);
  yp("COMPARATORLOOSE", `^${HA[cA.GTLT]}\\s*(${HA[cA.LOOSEPLAIN]})$|^$`);
  yp("COMPARATOR", `^${HA[cA.GTLT]}\\s*(${HA[cA.FULLPLAIN]})$|^$`);
  yp("COMPARATORTRIM", `(\\s*)${HA[cA.GTLT]}\\s*(${HA[cA.LOOSEPLAIN]}|${HA[cA.XRANGEPLAIN]})`, !0);
  xJ.comparatorTrimReplace = "$1$2$3";
  yp("HYPHENRANGE", `^\\s*(${HA[cA.XRANGEPLAIN]})\\s+-\\s+(${HA[cA.XRANGEPLAIN]})\\s*$`);
  yp("HYPHENRANGELOOSE", `^\\s*(${HA[cA.XRANGEPLAINLOOSE]})\\s+-\\s+(${HA[cA.XRANGEPLAINLOOSE]})\\s*$`);
  yp("STAR", "(<|>)?=?\\s*\\*");
  yp("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  yp("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});