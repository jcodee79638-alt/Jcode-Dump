
var u2a,
  l2a,
  f2a = async () => `${await l2a()}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`,
  ajt,
  FRi,
  RRi = async () => (
    (FRi ??= (async () => {
      try {
        let e = await ajt();
        return (await YMr.access(e, BRi.X_OK), !0);
      } catch {
        return !1;
      }
    })()),
    FRi
  ),
  WRi = async () => {
    let e = await ajt(),
      t = String.raw`(Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice").ProgId`,
      { stdout: r } = await sLe(t, { powerShellPath: e, cwd: H2a.dirname(e) });
    return r.trim();
  },
  p2a = (e) => /^[a-z]+:\/\//i.test(e),
  VRi = async (e) => {
    let t = Array.isArray(e),
      r = t ? e : [e],
      s = [],
      a = [];
    for (let [u, f] of r.entries()) if (!p2a(f)) (s.push(u), a.push(f));
    let H = [...r];
    if (a.length > 0)
      try {
        let { stdout: u } = await u2a("wslpath", ["-aw", ...a], { encoding: "utf8" }),
          f = u.split(/\r?\n/).filter(Boolean);
        for (let [d, _] of s.entries()) H[_] = f[d] ?? r[_];
      } catch {}
    return t ? H : H[0];
  };