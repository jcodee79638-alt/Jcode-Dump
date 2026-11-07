
var psi = Ie(function (ypc, fsi) {
  var lsi = cr("os"),
    bIt = cr("tty"),
    cB = usi(),
    { env: HT } = process,
    Goe;
  if (cB("no-color") || cB("no-colors") || cB("color=false") || cB("color=never")) Goe = 0;
  else if (cB("color") || cB("colors") || cB("color=true") || cB("color=always")) Goe = 1;
  if ("FORCE_COLOR" in HT)
    if (HT.FORCE_COLOR === "true") Goe = 1;
    else if (HT.FORCE_COLOR === "false") Goe = 0;
    else Goe = HT.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(HT.FORCE_COLOR, 10), 3);
  function tpr(e) {
    if (e === 0) return !1;
    return { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
  }
  function rpr(e, t) {
    if (Goe === 0) return 0;
    if (cB("color=16m") || cB("color=full") || cB("color=truecolor")) return 3;
    if (cB("color=256")) return 2;
    if (e && !t && Goe === void 0) return 0;
    let r = Goe || 0;
    if (HT.TERM === "dumb") return r;
    {
      let s = lsi.release().split(".");
      if (Number(s[0]) >= 10 && Number(s[2]) >= 10586) return Number(s[2]) >= 14931 ? 3 : 2;
      return 1;
    }
    if ("CI" in HT) {
      if (
        ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((s) => s in HT) ||
        HT.CI_NAME === "codeship"
      )
        return 1;
      return r;
    }
    if ("TEAMCITY_VERSION" in HT) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(HT.TEAMCITY_VERSION) ? 1 : 0;
    if (HT.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in HT) {
      let s = parseInt((HT.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (HT.TERM_PROGRAM) {
        case "iTerm.app":
          return s >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(HT.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(HT.TERM)) return 1;
    if ("COLORTERM" in HT) return 1;
    return r;
  }
  function RWo(e) {
    let t = rpr(e, e && e.isTTY);
    return tpr(t);
  }
  fsi.exports = {
    supportsColor: RWo,
    stdout: tpr(rpr(!0, bIt.isatty(1))),
    stderr: tpr(rpr(!0, bIt.isatty(2))),
  };
});