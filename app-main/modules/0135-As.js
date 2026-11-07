
async function As(e, t, n) {
  let i = fn(e, t);
  if (i === "text/plain")
    return [
      { filename: e, mime: "text/plain", url: "data:text/plain;base64," + Buffer.from(t).toString("base64") },
    ];
  if (Jr) throw new T("busy");
  let { app: r, BrowserWindow: s, ipcMain: o, session: l } = Ts.default;
  Jr = !0;
  let u = l.fromPartition("attachment-" + Bt.randomUUID(), { cache: !1 }),
    p = ee.default.join(r.getAppPath(), "out", "attachment"),
    w = Rs.pathToFileURL(p + ee.default.sep).href;
  (u.setPermissionRequestHandler((m, b, C) => C(!1)),
    u.setPermissionCheckHandler(() => !1),
    u.webRequest.onBeforeRequest((m, b) =>
      b({ cancel: !m.url.startsWith(w) && !m.url.startsWith("blob:file://") && !m.url.startsWith("data:") }),
    ),
    u.on("will-download", (m) => m.preventDefault()));
  let f = new s({
      show: !1,
      parent: n,
      webPreferences: {
        sandbox: !0,
        contextIsolation: !0,
        nodeIntegration: !1,
        webSecurity: !0,
        webgl: !1,
        webviewTag: !1,
        devTools: !1,
        spellcheck: !1,
        backgroundThrottling: !1,
        session: u,
        preload: ee.default.join(r.getAppPath(), "out", "attachment-preload.cjs"),
      },
    }),
    h;
  (f.webContents.setWindowOpenHandler(() => ({ action: "deny" })),
    f.webContents.on("will-navigate", (m) => m.preventDefault()));
  try {
    return await new Promise((m, b) => {
      let C = (y) => y.sender === f.webContents && y.senderFrame === f.webContents.mainFrame,
        g = () => {
          (clearTimeout(c),
            o.removeListener("jac:attachment-ready", a),
            o.removeListener("jac:attachment-output", d));
        },
        k = (y) => {
          (g(), b(new T(y)));
        },
        a = (y) => {
          if (!C(y) || h) return;
          let v = f.webContents.getOSProcessId();
          if (s.getAllWindows().some((x) => x !== f && x.webContents.getOSProcessId() === v))
            return k("document");
          h = _s.spawn(
            ee.default.join(
              r.isPackaged ? process.resourcesPath : ee.default.join(r.getAppPath(), "resources"),
              "JacAttachmentGuard.exe",
            ),
            [String(v), String(process.pid)],
            {
              windowsHide: !0,
              stdio: ["pipe", "pipe", "ignore"],
              env: { SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR },
            },
          );
          let E = "",
            S = !1;
          (h.once("error", () => k("document")),
            h.once("exit", () => {
              if (!S && !f.isDestroyed()) k("document");
            }),
            h.stdout?.on("data", (x) => {
              if (((E += String(x)), E.length > 128)) return k("document");
              if (E.trim() === "GUARDED" && !S)
                ((S = !0), f.webContents.send("jac:attachment-input", { filename: e, kind: i, bytes: t }));
              else if (E.includes("UNAVAILABLE")) k("document");
            }));
        },
        d = (y, v) => {
          if (!C(y)) return;
          if ((g(), !v || typeof v !== "object" || !("ok" in v))) return b(new T("document"));
          if (!v.ok)
            return b(new T("code" in v && typeof v.code === "string" && v.code in vr ? v.code : "document"));
          try {
            m(Un("files" in v ? v.files : void 0));
          } catch {
            b(new T("document"));
          }
        },
        c = setTimeout(() => k("timeout"), le.timeoutMs);
      (o.on("jac:attachment-ready", a),
        o.on("jac:attachment-output", d),
        f.webContents.once("render-process-gone", () => k("document")),
        f.once("closed", () => k("document")),
        f.loadFile(ee.default.join(p, "index.html")).catch(() => k("document")));
    });
  } finally {
    if (!f.isDestroyed()) f.destroy();
    (h?.stdin?.end(),
      (Jr = !1),
      await u.clearStorageData().catch(() => {
        return;
      }));
  }
}