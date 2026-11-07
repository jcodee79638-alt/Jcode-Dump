
async function Zt(e) {
  if (!P.app.isPackaged) return { enabled: (await A.call("settings")).launchAtLogin };
  let t = await ko.promisify(bo.execFile)(re.default.join(fr, "JacDesktopUpdate.exe"), ["startup", xo, e], {
    windowsHide: !0,
    shell: !1,
    timeout: 15000,
    maxBuffer: 4096,
  });
  return j(JSON.parse(t.stdout));
}