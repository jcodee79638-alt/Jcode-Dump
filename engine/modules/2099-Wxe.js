
var Wxe = Ie(function (H5, CPn) {
  var { MAX_SAFE_COMPONENT_LENGTH: Far, MAX_SAFE_BUILD_LENGTH: spo, MAX_LENGTH: opo } = Rxe(),
    apo = PVe();
  H5 = CPn.exports = {};
  var Hpo = (H5.re = []),
    cpo = (H5.safeRe = []),
    sA = (H5.src = []),
    Apo = (H5.safeSrc = []),
    oA = (H5.t = {}),
    upo = 0,
    Bar = "[a-zA-Z0-9-]",
    lpo = [
      ["\\s", 1],
      ["\\d", opo],
      [Bar, spo],
    ],
    fpo = (e) => {
      for (let [t, r] of lpo) e = e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);
      return e;
    },
    Ep = (e, t, r) => {
      let s = fpo(t),
        a = upo++;
      (apo(e, a, t),
        (oA[e] = a),
        (sA[a] = t),
        (Apo[a] = s),
        (Hpo[a] = new RegExp(t, r ? "g" : void 0)),
        (cpo[a] = new RegExp(s, r ? "g" : void 0)));
    };
  Ep("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  Ep("NUMERICIDENTIFIERLOOSE", "\\d+");
  Ep("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${Bar}*`);
  Ep(
    "MAINVERSION",
    `(${sA[oA.NUMERICIDENTIFIER]})\\.(${sA[oA.NUMERICIDENTIFIER]})\\.(${sA[oA.NUMERICIDENTIFIER]})`,
  );
  Ep(
    "MAINVERSIONLOOSE",
    `(${sA[oA.NUMERICIDENTIFIERLOOSE]})\\.(${sA[oA.NUMERICIDENTIFIERLOOSE]})\\.(${sA[oA.NUMERICIDENTIFIERLOOSE]})`,
  );
  Ep("PRERELEASEIDENTIFIER", `(?:${sA[oA.NONNUMERICIDENTIFIER]}|${sA[oA.NUMERICIDENTIFIER]})`);
  Ep("PRERELEASEIDENTIFIERLOOSE", `(?:${sA[oA.NONNUMERICIDENTIFIER]}|${sA[oA.NUMERICIDENTIFIERLOOSE]})`);
  Ep("PRERELEASE", `(?:-(${sA[oA.PRERELEASEIDENTIFIER]}(?:\\.${sA[oA.PRERELEASEIDENTIFIER]})*))`);
  Ep(
    "PRERELEASELOOSE",
    `(?:-?(${sA[oA.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${sA[oA.PRERELEASEIDENTIFIERLOOSE]})*))`,
  );
  Ep("BUILDIDENTIFIER", `${Bar}+`);
  Ep("BUILD", `(?:\\+(${sA[oA.BUILDIDENTIFIER]}(?:\\.${sA[oA.BUILDIDENTIFIER]})*))`);
  Ep("FULLPLAIN", `v?${sA[oA.MAINVERSION]}${sA[oA.PRERELEASE]}?${sA[oA.BUILD]}?`);
  Ep("FULL", `^${sA[oA.FULLPLAIN]}$`);
  Ep("LOOSEPLAIN", `[v=\\s]*${sA[oA.MAINVERSIONLOOSE]}${sA[oA.PRERELEASELOOSE]}?${sA[oA.BUILD]}?`);
  Ep("LOOSE", `^${sA[oA.LOOSEPLAIN]}$`);
  Ep("GTLT", "((?:<|>)?=?)");
  Ep("XRANGEIDENTIFIERLOOSE", `${sA[oA.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  Ep("XRANGEIDENTIFIER", `${sA[oA.NUMERICIDENTIFIER]}|x|X|\\*`);
  Ep(
    "XRANGEPLAIN",
    `[v=\\s]*(${sA[oA.XRANGEIDENTIFIER]})(?:\\.(${sA[oA.XRANGEIDENTIFIER]})(?:\\.(${sA[oA.XRANGEIDENTIFIER]})(?:${sA[oA.PRERELEASE]})?${sA[oA.BUILD]}?)?)?`,
  );
  Ep(
    "XRANGEPLAINLOOSE",
    `[v=\\s]*(${sA[oA.XRANGEIDENTIFIERLOOSE]})(?:\\.(${sA[oA.XRANGEIDENTIFIERLOOSE]})(?:\\.(${sA[oA.XRANGEIDENTIFIERLOOSE]})(?:${sA[oA.PRERELEASELOOSE]})?${sA[oA.BUILD]}?)?)?`,
  );
  Ep("XRANGE", `^${sA[oA.GTLT]}\\s*${sA[oA.XRANGEPLAIN]}$`);
  Ep("XRANGELOOSE", `^${sA[oA.GTLT]}\\s*${sA[oA.XRANGEPLAINLOOSE]}$`);
  Ep("COERCEPLAIN", `(^|[^\\d])(\\d{1,${Far}})(?:\\.(\\d{1,${Far}}))?(?:\\.(\\d{1,${Far}}))?`);
  Ep("COERCE", `${sA[oA.COERCEPLAIN]}(?:$|[^\\d])`);
  Ep("COERCEFULL", sA[oA.COERCEPLAIN] + `(?:${sA[oA.PRERELEASE]})?(?:${sA[oA.BUILD]})?(?:$|[^\\d])`);
  Ep("COERCERTL", sA[oA.COERCE], !0);
  Ep("COERCERTLFULL", sA[oA.COERCEFULL], !0);
  Ep("LONETILDE", "(?:~>?)");
  Ep("TILDETRIM", `(\\s*)${sA[oA.LONETILDE]}\\s+`, !0);
  H5.tildeTrimReplace = "$1~";
  Ep("TILDE", `^${sA[oA.LONETILDE]}${sA[oA.XRANGEPLAIN]}$`);
  Ep("TILDELOOSE", `^${sA[oA.LONETILDE]}${sA[oA.XRANGEPLAINLOOSE]}$`);
  Ep("LONECARET", "(?:\\^)");
  Ep("CARETTRIM", `(\\s*)${sA[oA.LONECARET]}\\s+`, !0);
  H5.caretTrimReplace = "$1^";
  Ep("CARET", `^${sA[oA.LONECARET]}${sA[oA.XRANGEPLAIN]}$`);
  Ep("CARETLOOSE", `^${sA[oA.LONECARET]}${sA[oA.XRANGEPLAINLOOSE]}$`);
  Ep("COMPARATORLOOSE", `^${sA[oA.GTLT]}\\s*(${sA[oA.LOOSEPLAIN]})$|^$`);
  Ep("COMPARATOR", `^${sA[oA.GTLT]}\\s*(${sA[oA.FULLPLAIN]})$|^$`);
  Ep("COMPARATORTRIM", `(\\s*)${sA[oA.GTLT]}\\s*(${sA[oA.LOOSEPLAIN]}|${sA[oA.XRANGEPLAIN]})`, !0);
  H5.comparatorTrimReplace = "$1$2$3";
  Ep("HYPHENRANGE", `^\\s*(${sA[oA.XRANGEPLAIN]})\\s+-\\s+(${sA[oA.XRANGEPLAIN]})\\s*$`);
  Ep("HYPHENRANGELOOSE", `^\\s*(${sA[oA.XRANGEPLAINLOOSE]})\\s+-\\s+(${sA[oA.XRANGEPLAINLOOSE]})\\s*$`);
  Ep("STAR", "(<|>)?=?\\s*\\*");
  Ep("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  Ep("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});