
function Es(e) {
  let t = Lt.default.resolve(Lt.default.dirname(e.execPath), "../.."),
    n = e.packaged
      ? Lt.default.join(t, "jac.ico")
      : Lt.default.resolve(e.appPath, "../installer-v3/assets/jac.ico");
  return {
    iconPath: n,
    details: {
      appId: Br,
      appIconPath: n,
      appIconIndex: 0,
      relaunchCommand: e.packaged
        ? `"${Lt.default.join(t, "jac.exe")}" --home`
        : `"${e.execPath}" "${e.appPath}" --home`,
      relaunchDisplayName: "Jac Code",
    },
  };
}