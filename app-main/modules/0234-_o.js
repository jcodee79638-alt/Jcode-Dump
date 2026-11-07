
function _o() {
  if (Qe || ge || Te || vn) return;
  vn = (async () => {
    let e = !1;
    try {
      if (!(await Zt("status")).enabled) {
        if (!Qe) ((ge = !0), P.app.quit());
        return;
      }
      if (Qe || ge) return;
      if (((kt = await A.start(fr, pr, P.app.getPath("home"))), Qe || ge)) return;
      let t = await Ro();
      if (!Qe && t.status === "available") e = (await ci()).status === "error";
      else e = t.status === "error";
    } catch {
      e = !0;
    } finally {
      if (!ge) await A.stop();
      if (!Qe) ur(e);
    }
  })().finally(() => {
    vn = void 0;
  });
}
P.ipcMain.handle("jac:invoke", async (e, t, n) => {
  if (!To(e) || typeof t !== "string" || !Object.hasOwn(Kt, t)) throw Error("Unsupported desktop operation.");
  try {
    if (t !== "bootstrap" && t !== "window") {
      if ((await yn, Ne && t !== "reconnect" && t !== "connection")) throw Error(Ne);
    }
    return await Kt[t](n);
  } catch (i) {
    let r =
      i instanceof Error &&
      /^(Choose|Write|Confirm|Wait|This |The Jac Code engine|Jac Code|Sign in|No banked|Upgrade paused|Your Jac Code database|Close other)/.test(
        i.message,
      )
        ? i.message
        : mi(i);
    throw Error(r);
  }
});
if (
  !P.app.requestSingleInstanceLock({
    launch: Object.fromEntries(Object.entries(ct).filter(([, e]) => e !== void 0)),
    continue: pr.some((e) => e === "-c" || e === "--continue"),
    signIn: gn,
  })
)
  P.app.quit();
else {
  P.app.on("second-instance", (n, i, r, s) => {
    (async () => {
      let o = _(j(s), ["launch", "continue", "signIn"]);
      if (o.signIn === !0) return;
      let l = _(j(o.launch), ["directory", "sessionId", "prompt"]),
        u = {
          directory: l.directory === void 0 ? void 0 : et(l.directory),
          sessionId: l.sessionId === void 0 ? void 0 : N(l.sessionId),
          prompt: l.prompt === void 0 ? void 0 : q(l.prompt, 200000),
        };
      if (gn) {
        if (
          ((Qe = !0),
          (rr =
            u.directory || u.sessionId || u.prompt || o.continue === !0
              ? [
                  ...(u.directory ? [`--dir=${u.directory}`] : []),
                  ...(u.sessionId ? [`--session=${u.sessionId}`] : []),
                  ...(u.prompt ? [`--prompt=${u.prompt}`] : []),
                  ...(o.continue === !0 ? ["--continue"] : []),
                ]
              : ["--home"]),
          (Xr = re.default.isAbsolute(r) ? r : process.cwd()),
          Re)
        )
          A.call("updateLaunch", { args: rr, cwd: Xr }).catch(() => {});
      }
      if (!(await e) || ge) return;
      if (gn) clearTimeout(cr);
      if ((t(), R?.isMinimized())) R.restore();
      if ((R?.focus(), await yn, ge || Ne)) return;
      if (u.directory) u.directory = await bt(u.directory);
      if (o.continue === !0) {
        let p = (await ii()).items[0];
        if (p) ((u.directory = p.directory), (u.sessionId = p.id));
      }
      ((ct = u), de({ type: "launch", launch: u }));
    })().catch(() => de({ type: "error", message: "Choose a valid project folder." }));
  });
  let e = P.app.whenReady().then(async () => {
    if (P.app.isPackaged) {
      await Promise.resolve().then(() => go());
      try {
        await mo(xo, P.app.getVersion());
      } catch (r) {
        if (!Qe) return (P.app.exit(1), !1);
        let s = wo(r);
        if (
          (
            await P.dialog.showMessageBox({
              type: "error",
              title: "Jac Code needs repair",
              message: s.message,
              detail: `Repair code: ${s.code}

Your projects, chats and sign-in are kept. Get the latest authentic installer to repair the app. If it happens again, send this repair code to Jac.`,
              buttons: ["Get repair installer", "Close"],
              defaultId: 0,
              cancelId: 1,
              noLink: !0,
            })
          ).response === 0
        )
          await P.shell
            .openExternal("https://jaccoder-private-gateway.jaccoder-private-gateway.workers.dev/download")
            .catch(() => {});
        return (P.app.exit(1), !1);
      }
    }
    return (
      P.protocol.handle("jac-preview", async (n) => {
        try {
          let i = await Eo.file(n.url),
            r = re.default.extname(i.filename).toLowerCase(),
            s =
              {
                ".html": "text/html",
                ".htm": "text/html",
                ".js": "text/javascript",
                ".mjs": "text/javascript",
                ".cjs": "text/javascript",
                ".css": "text/css",
                ".svg": "image/svg+xml",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".webp": "image/webp",
              }[r] ?? "application/octet-stream";
          return new Response(new Uint8Array(i.bytes).buffer, {
            headers: {
              "content-type": s,
              "content-security-policy":
                "sandbox allow-scripts; default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'none'; object-src 'none'; form-action 'none'; base-uri 'none'",
              "x-content-type-options": "nosniff",
            },
          });
        } catch {
          return new Response("Preview unavailable", { status: 404 });
        }
      }),
      P.session.defaultSession.setPermissionRequestHandler((n, i, r) => r(!1)),
      P.session.defaultSession.setPermissionCheckHandler(() => !1),
      P.session.defaultSession.webRequest.onBeforeRequest((n, i) => {
        let r = new URL(n.url),
          s =
            r.protocol === "file:" &&
            (r.href === Gt ||
              r.href.startsWith(si.pathToFileURL(re.default.join(xn, "renderer") + re.default.sep).href));
        i({
          cancel:
            !s &&
            r.protocol !== "jac-preview:" &&
            r.protocol !== "data:" &&
            r.protocol !== "blob:" &&
            !Co.has(r.origin),
        });
      }),
      P.session.defaultSession.webRequest.onHeadersReceived((n, i) =>
        i({
          responseHeaders: {
            ...n.responseHeaders,
            ...(n.url === Gt ? { "Content-Security-Policy": [ks] } : {}),
          },
        }),
      ),
      !0
    );
  });
  async function t() {
    if (R || ge) return;
    let n = Es({ packaged: P.app.isPackaged, appPath: P.app.getAppPath(), execPath: process.execPath }),
      i = P.nativeImage.createFromPath(n.iconPath);
    if (
      ((R = new P.BrowserWindow(
        xs(P.screen.getPrimaryDisplay().workArea, {
          preload: re.default.join(xn, "preload.cjs"),
          packaged: P.app.isPackaged,
          icon: i.isEmpty() ? void 0 : n.iconPath,
        }),
      )),
      process.platform === "win32")
    )
      R.setAppDetails({ ...n.details, appIconPath: i.isEmpty() ? process.execPath : n.iconPath });
    (R.show(),
      R.webContents.setWindowOpenHandler(() => ({ action: "deny" })),
      R.webContents.once("did-finish-load", () => {
        ((oi = !0), yn.then(() => Sn()).catch(() => {}));
      }),
      R.webContents.on("will-navigate", (r, s) => {
        if (s !== Gt && !s.startsWith(Gt + "#")) r.preventDefault();
      }),
      R.webContents.on("will-attach-webview", (r) => r.preventDefault()),
      R.webContents.once("preload-error", () => {
        ((Ne =
          "Jac Code could not open its interface. Run the installer to repair the app. Your saved work is kept."),
          P.dialog.showMessageBox(R, { type: "error", message: Ne, buttons: ["Close"] }).then(() => Vt()));
      }),
      R.on("close", (r) => {
        if (!ge) (r.preventDefault(), Vt());
      }),
      R.on("closed", () => {
        ((R = void 0), P.app.quit());
      }),
      (yn = (async () => {
        try {
          if ((await vn, ge)) return;
          if (ct.directory) ct.directory = await bt(ct.directory);
          let r = await je(P.app.getPath("userData"));
          ((kt = await A.start(fr, rr, Xr, r)),
            await Na().catch(() => {}),
            await ue.initialize(),
            await Xe.list(),
            (Ue = jo(r)),
            Ue.start(),
            Io());
          let s = await Kt.checkUpdate();
          ur(s.status === "error");
        } catch (r) {
          Ne = r instanceof Error ? r.message : "Jac Code could not start. Close and reopen the app.";
        }
      })()),
      await R.loadURL(Gt).catch(async () => {
        ((Ne =
          "Jac Code could not open its interface. Run the installer to repair the app. Your saved work is kept."),
          await P.dialog.showMessageBox(R, { type: "error", message: Ne, buttons: ["Close"] }),
          await Vt());
      }));
  }
  (e.then((n) => {
    if (n)
      if (Qe) t();
      else _o();
  }),
    P.app.on("before-quit", (n) => {
      if (ge) return;
      (n.preventDefault(), Vt());
    }),
    P.app.on("window-all-closed", () => P.app.quit()));
}
