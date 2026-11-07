
function xs(e, t) {
  let n = Math.min(1120, e.width),
    i = Math.min(670, e.height);
  return {
    x: e.x + Math.floor((e.width - n) / 2),
    y: e.y + Math.floor((e.height - i) / 2),
    width: n,
    height: i,
    minWidth: Math.min(720, e.width),
    minHeight: Math.min(520, e.height),
    frame: !1,
    resizable: !0,
    thickFrame: !0,
    show: !1,
    minimizable: !0,
    maximizable: !0,
    closable: !0,
    backgroundColor: "#111111",
    title: "Jac Code",
    icon: t.icon,
    autoHideMenuBar: !0,
    webPreferences: {
      preload: t.preload,
      sandbox: !0,
      contextIsolation: !0,
      nodeIntegration: !1,
      webSecurity: !0,
      spellcheck: !1,
      devTools: !t.packaged,
      webviewTag: !1,
    },
  };
}