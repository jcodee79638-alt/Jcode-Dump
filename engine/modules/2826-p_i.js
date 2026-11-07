
var p_i = Ie(function (mLc, f_i) {
  var { chmod: Umr, mkdir: Dta, readFile: yta, stat: A_i, unlink: Mta, writeFile: Nmr } = cr("fs/promises"),
    { dirname: u_i, relative: xta } = cr("path"),
    l_i = c_i(),
    Sta = /^#!\s*(?:\/usr\/bin\/env\s+(?:-S\s+)?((?:[^ \t=]+=[^ \t=]+\s+)*))?([^ \t]+)(.*)$/,
    Tta = (e, t) =>
      A_i(e).then(
        () => Rmr(e, t),
        () => {},
      ),
    Fmr = (e) => Mta(e).catch(() => {}),
    Rmr = (e, t) => A_i(e).then(() => vta(e, t)),
    vta = (e, t) => Promise.all([Fmr(t), Fmr(t + ".cmd"), Fmr(t + ".ps1")]).then(() => bta(e, t)),
    bta = (e, t) =>
      Dta(u_i(t), { recursive: !0 })
        .then(() => yta(e, "utf8"))
        .then(
          (r) => {
            let a = r.trim().split(/\r*\n/)[0].match(Sta);
            if (!a) return Bmr(e, t);
            let H = a[1] || "",
              u = a[2],
              f = a[3] || "";
            return Bmr(e, t, u, f, H);
          },
          () => Bmr(e, t),
        ),
    Bmr = (e, t, r, s, a) => {
      let H = xta(u_i(t), e),
        u = H.split("/").join("\\"),
        f,
        d = r && r.split("\\").join("/"),
        _,
        L = d && `"${d}$exe"`,
        I;
      if (((H = H.split("\\").join("/")), (s = s || ""), (a = a || ""), !r))
        ((r = `"%dp0%\\${u}"`), (d = `"$basedir/${H}"`), (L = d), (s = ""), (u = ""), (H = ""));
      else
        ((f = `"%dp0%\\${r}.exe"`),
          (_ = `"$basedir/${r}"`),
          (I = `"$basedir/${r}$exe"`),
          (u = `"%dp0%\\${u}"`),
          (H = `"$basedir/${H}"`));
      let D = `@ECHO off\r
GOTO start\r
:find_dp0\r
SET dp0=%~dp0\r
EXIT /b\r
:start\r
SETLOCAL\r
CALL :find_dp0\r
`,
        S;
      if (f) {
        ((_ = _.trim()), (s = s.trim()));
        let O = l_i.convertToSetCommands(a);
        S =
          D +
          O +
          `\r
IF EXIST ${f} (\r
  SET "_prog=${f.replace(/(^")|("$)/g, "")}"\r
) ELSE (\r
  SET "_prog=${r.replace(/(^")|("$)/g, "")}"\r
  SET PATHEXT=%PATHEXT:;.JS;=;%\r
)\r
\r
endLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%" ${s} ${u} %*\r
`;
      } else
        S = `${D}${r} ${s} ${u} %*\r
`;
      let T = `#!/bin/sh
`;
      if (
        ((T =
          T +
          `basedir=$(dirname "$(echo "$0" | sed -e 's,\\\\,/,g')")

case \`uname\` in
    *CYGWIN*|*MINGW*|*MSYS*)
        if command -v cygpath > /dev/null 2>&1; then
            basedir=\`cygpath -w "$basedir"\`
        fi
    ;;
esac

`),
        _)
      )
        T =
          T +
          `if [ -x ${_} ]; then
  exec ${a}${_} ${s} ${H} "$@"
else 
  exec ${a}${d} ${s} ${H} "$@"
fi
`;
      else
        T =
          T +
          `exec ${d} ${s} ${H} "$@"
`;
      let C = `#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
`;
      if (_)
        C =
          C +
          `$ret=0
if (Test-Path ${I}) {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & ${I} ${s} ${H} $args
  } else {
    & ${I} ${s} ${H} $args
  }
  $ret=$LASTEXITCODE
} else {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & ${L} ${s} ${H} $args
  } else {
    & ${L} ${s} ${H} $args
  }
  $ret=$LASTEXITCODE
}
exit $ret
`;
      else
        C =
          C +
          `# Support pipeline input
if ($MyInvocation.ExpectingInput) {
  $input | & ${L} ${s} ${H} $args
} else {
  & ${L} ${s} ${H} $args
}
exit $LASTEXITCODE
`;
      return Promise.all([Nmr(t + ".ps1", C, "utf8"), Nmr(t + ".cmd", S, "utf8"), Nmr(t, T, "utf8")]).then(
        () => jta(t),
      );
    },
    jta = (e) => Promise.all([Umr(e, 493), Umr(e + ".cmd", 493), Umr(e + ".ps1", 493)]);
  f_i.exports = Rmr;
  Rmr.ifExists = Tta;
});