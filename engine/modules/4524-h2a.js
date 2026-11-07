
var h2a,
  L2a = () =>
    `${GRi.env.SYSTEMROOT || GRi.env.windir || String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`,
  XRi,
  JRi = (e) => d2a.from(e, "utf16le").toString("base64"),
  $2a = (e) => `'${String(e).replaceAll(/['\u2018\u2019\u201A\u201B]/g, (t) => t + t)}'`,
  KRi = (e) => [...XRi, JRi(e)],
  g2a = (e) => ({ encoding: "utf8", ...e, shell: !1 }),
  tJ = async (e, t = {}) => {
    let { powerShellPath: r, ...s } = t;
    return h2a(r ?? L2a(), KRi(e), g2a(s));
  };