
async function Na() {
  if (!P.app.isPackaged || !(await Zt("status")).pending) return;
  let e = await A.call("settings");
  await Zt(e.launchAtLogin ? "migrate-enable" : "migrate-disable");
}