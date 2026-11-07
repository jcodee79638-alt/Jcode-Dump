
var a2a,
  QMr = () =>
    `${ORi.env.SYSTEMROOT || ORi.env.windir || String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`,
  sLe = async (e, t = {}) => {
    let { powerShellPath: r, ...s } = t,
      a = sLe.encodeCommand(e);
    return a2a(r ?? QMr(), [...sLe.argumentsPrefix, a], { encoding: "utf8", ...s });
  };