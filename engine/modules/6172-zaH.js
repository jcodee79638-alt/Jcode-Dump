
async function zaH(e, t) {
  let r = t === void 0 ? {} : $v(t);
  if (e === "init") {
    if (Hte || tkr) throw Error("Already initialized");
    ((tkr = !0), $$(r, ["password", "parentPid", "args", "cwd", "userData"]));
    let s = iL(r.password, 256);
    if (!/^[a-f0-9]{64}$/.test(s) || !Number.isSafeInteger(r.parentPid) || Number(r.parentPid) < 1)
      throw Error("Invalid startup");
    ((rss = Number(r.parentPid)),
      (Skt = "data lock"),
      (T$e = Array.isArray(r.args) ? r.args.map((d) => iL(d)) : []),
      (_Ye = iL(r.cwd)),
      (rkr = T$e.length === 1 && T$e[0] === "--startup"),
      await Ywr(SR.dirname(process.execPath)));
    let a = await Ywr(ate.data).catch(async () => {
      let { mkdir: d } = await import("fs/promises");
      return (await d(ate.data, { recursive: !0 }), Ywr(ate.data));
    });
    if (
      ((rke = ess(SR.join(SR.dirname(process.execPath), "JacDesktopLock.exe"), ["transaction", a], {
        windowsHide: !0,
        shell: !1,
        stdio: ["pipe", "pipe", "ignore"],
      })),
      (await Zwr(rke)).ready !== !0)
    )
      throw Error("Close other Jac Code sessions and try again.");
    if (
      (rke.once("exit", () => {
        LYe().finally(() => process.exit(1));
      }),
      r.userData !== void 0)
    ) {
      tke = { data: ate.data, state: ate.state, userData: lW(r.userData) };
      await Promise.resolve().then(() => qFe());
      await FAt(tke);
    }
    let H = await lZr(ate.data);
    ((Skt = "server initialization"),
      (process.env.OPENCODE_SERVER_USERNAME = "jac-desktop"),
      (process.env.OPENCODE_SERVER_PASSWORD = s),
      (process.env.JAC_DESKTOP_MCP = "1"));
    await Promise.resolve().then(() => pW());
    g$.on("event", (d) => {
      let _ = d.payload;
      if (!_ || typeof _ !== "object") return;
      let L = _;
      if (L.type !== "session.status") return;
      let I = $v(L.properties),
        D = typeof I.sessionID === "string" ? I.sessionID : "";
      if ($v(I.status).type === "idle") B7.delete(D);
      else if (d.directory) B7.set(D, d.directory);
    });
    await ykt();
    if (
      ((Hte = await $aH({ port: 0, hostname: "127.0.0.1", mdns: !1, cors: [] })),
      (Skt = "database preservation"),
      await fZr(ate.data, H),
      !rkr)
    ) {
      await Promise.resolve().then(() => WFe());
      (RFe({ kind: "heartbeat" }),
        (Tkt = setInterval(() => {
          RFe({ kind: "heartbeat" });
        }, 60000)),
        Tkt.unref());
    }
    return { port: Hte.port, version: h_ };
  }
  if (e === "stop") return ($$(r, []), await LYe(), setTimeout(() => process.exit(0), 10), !0);
  if (!Hte || tss) throw Error("Not initialized");
  if (e === "promptAdmission") {
    $$(r, ["id"]);
    await Promise.resolve().then(() => qFe());
    if (!(await dtn(ate.data, kq(r.id))))
      throw Error(
        "This conversation contains restored pending work. Review it and branch into a new chat before continuing; no model work has been replayed.",
      );
    return !0;
  }
  if (e === "backupSnapshot" || e === "backupRestore") {
    if (($$(r, ["id", "directory"]), !tke || B7.size || hYe))
      throw Error("Wait for current work to finish before creating or restoring a backup.");
    await Promise.resolve().then(() => BJt());
    let u = iL(r.id, 36);
    if (!uQ(u)) throw Error("Invalid backup");
    let f = SR.join(tke.userData, "backups-v6"),
      d = SR.resolve(lW(r.directory)),
      _ = SR.join(f, e === "backupSnapshot" ? ".pending-" + u : u);
    if (d.toLowerCase() !== _.toLowerCase()) throw Error("Invalid backup");
    if ((await p6(f), e === "backupSnapshot")) {
      await Promise.resolve().then(() => qFe());
      return (await JJt(tke, d, u), !0);
    }
    (await Xfe(d, u), (tss = !0), clearInterval(Tkt), await Hte.stop(!0), (Hte = void 0));
    await Ikt();
    await kis().dispose();
    await Oce();
    await o9.dispose();
    await Promise.resolve().then(() => qFe());
    return _tn(tke, d, u).catch(() => ({ restored: !1, restart: !0 }));
  }
  if (e === "activity")
    return ($$(r, []), { busy: B7.size > 0, sessions: [...B7].map(([s, a]) => ({ id: s, directory: a })) });
  if (e === "executionIdle") {
    $$(r, ["id", "directory"]);
    await Promise.resolve().then(() => Nis());
    return Uis({ id: kq(r.id), directory: lW(r.directory) });
  }
  if (e === "taskSupport") {
    $$(r, ["sessionId", "supportId", "clear"]);
    await Promise.resolve().then(() => WFe());
    if (r.clear === !0) return (zen(kq(r.sessionId), iL(r.supportId, 36)), !0);
    return (Jen(kq(r.sessionId), r.supportId === void 0 ? void 0 : iL(r.supportId, 36)), !0);
  }
  if (e === "branchChat") {
    $$(r, ["id", "directory", "destination"]);
    await Promise.resolve().then(() => Bis());
    return Fis({ id: kq(r.id), directory: lW(r.directory), destination: lW(r.destination), activity: B7 });
  }
  if (["mcpServers", "saveMcp", "mcpAction", "mcpCatalog", "mcpRead", "mcpPrompt", "mcpSync"].includes(e)) {
    $$(
      r,
      e === "saveMcp"
        ? ["directory", "name", "config", "enabled"]
        : e === "mcpAction"
          ? ["directory", "name", "action"]
          : e === "mcpRead"
            ? ["directory", "server", "uri"]
            : e === "mcpPrompt"
              ? ["directory", "server", "name", "args"]
              : ["directory"],
    );
    await Bbr();
    return Fbr(e, r);
  }
  if (e === "history") {
    $$(r, ["id", "directory"]);
    let s = kq(r.id),
      a = lW(r.directory);
    await ykt();
    return vZr(async (u) => {
      let f = new URLSearchParams({ directory: a, limit: "10", ...(u ? { before: u } : {}) }),
        d = await LaH().app.fetch(
          new Request(`http://localhost/session/${s}/message?${f}`, {
            headers: {
              authorization: `Basic ${Buffer.from(`jac-desktop:${process.env.OPENCODE_SERVER_PASSWORD}`).toString("base64")}`,
            },
          }),
        );
      if (!d.ok) throw Error("Conversation unavailable");
      let _ = await d.json();
      if (!Array.isArray(_)) throw Error("Invalid history");
      return { items: _, cursor: d.headers.get("x-next-cursor") ?? void 0 };
    });
  }
  if (e === "settings") return ($$(r, []), xkt.read());
  if (e === "applyAccess" || e === "chooseAccess") {
    if (
      ($$(r, e === "chooseAccess" ? ["id", "directory", "mode"] : ["id", "directory"]),
      e === "chooseAccess" && B7.size)
    )
      throw Error("Wait for the current work to finish before changing access.");
    if ((r.id === void 0) !== (r.directory === void 0) || (e === "applyAccess" && r.id === void 0))
      throw Error("Invalid conversation");
    let s = await xkt.read(),
      a = e === "chooseAccess" ? HZr(r.mode) : (s.accessMode ?? "ask"),
      H =
        r.id === void 0
          ? { mode: a }
          : await (async () => {
              await Promise.resolve().then(() => Vis());
              return Wis({
                id: kq(r.id),
                directory: lW(r.directory),
                mode: e === "chooseAccess" ? a : void 0,
                defaultMode: s.accessMode ?? "ask",
                activity: B7,
              });
            })();
    if (e === "chooseAccess") await xkt.save({ accessMode: a });
    return H;
  }
  if (e === "saveSettings") {
    if (
      ($$(r, [
        "model",
        "theme",
        "thinking",
        "launchAtLogin",
        "sidebarCollapsed",
        "projectsCollapsed",
        "collapsedProjects",
        "drafts",
        "tutorialVersion",
      ]),
      r.tutorialVersion !== void 0 && r.tutorialVersion !== 0 && r.tutorialVersion !== 1)
    )
      throw Error("Invalid tutorial state");
    if (r.theme !== void 0 && !/^[A-Za-z0-9_-]{1,40}$/.test(iL(r.theme))) throw Error("Invalid theme");
    if (r.model !== void 0) zDe(r.model);
    if (r.thinking !== void 0) mZr(r.thinking);
    if (r.launchAtLogin !== void 0) Gne(r.launchAtLogin);
    if (r.sidebarCollapsed !== void 0) Gne(r.sidebarCollapsed);
    if (r.projectsCollapsed !== void 0) Gne(r.projectsCollapsed);
    if (r.collapsedProjects !== void 0) {
      let s = $v(r.collapsedProjects);
      if (Object.keys(s).length > 2000) throw Error("Too many project preferences");
      Object.entries(s).forEach(([a, H]) => {
        (iL(a, 512), Gne(H));
      });
    }
    if (r.drafts !== void 0) {
      let s = $v(r.drafts);
      if ((bZr(s), Object.keys(s).length > 200)) throw Error("Too many drafts");
      Object.entries(s).forEach(([a, H]) => {
        iL(a, 4096);
        let u = $$($v(H), ["text", "attachments"]);
        if ((iL(u.text, 200000), !Array.isArray(u.attachments) || u.attachments.length > 10))
          throw Error("Invalid attachments");
        u.attachments.forEach((f) => {
          let d = $$($v(f), ["id", "filename", "mime", "size"]);
          if (
            (kq(d.id),
            iL(d.filename, 260),
            iL(d.mime, 150),
            !Number.isSafeInteger(d.size) || Number(d.size) < 0 || Number(d.size) > 1e7)
          )
            throw Error("Invalid attachment");
        });
      });
    }
    return xkt.save(r);
  }
  if (e === "login" || e === "register" || e === "changePassword" || e === "logout") {
    let s = await Promise.resolve().then(() => (Kne(), {}));
    if (e === "logout") return ($$(r, []), (S$e = void 0), await h8s(), !0);
    $$(r, e === "changePassword" ? ["password"] : ["email", "password"]);
    let a = iL(r.password, 128);
    if (e === "changePassword") {
      if (!S$e || S$e.expires <= Date.now()) throw Error("Password change expired");
      return (
        await p8s(S$e.value, a),
        (S$e = void 0),
        { ok: !0, message: "Password changed. Sign in with your new password." }
      );
    }
    let H = iL(r.email, 320).trim();
    try {
      if (e === "register") await _8s(H, a);
      if (e === "login") await m8s(H, a);
      return ((S$e = void 0), { ok: !0, signedIn: !0 });
    } catch (u) {
      if (u instanceof Sc && u.kind === "throttled")
        return { ok: !1, message: u.message, retryAfter: u.retryAfter };
      if (!(u instanceof BFe)) throw u;
      return (
        (S$e = { value: u.challenge, expires: Date.now() + u.expiresIn * 1000 }),
        { ok: !1, passwordChangeRequired: !0, message: "Change your temporary password to continue." }
      );
    }
  }
  if (e === "planKey") {
    let s = await Promise.resolve().then(() => (qis(), {}));
    return baH(r);
  }
  if (e === "account" || e === "redeemReset") {
    if (($$(r, e === "redeemReset" ? ["confirmed"] : ["announcements"]), r.announcements !== void 0))
      Gne(r.announcements);
    let s = await Promise.resolve().then(() => (Kis(), {}));
    if (e === "redeemReset") {
      if (r.confirmed !== !0) throw Error("Confirmation required");
      await UaH(!0);
    }
    return TZr(await OaH({ announcements: r.announcements !== !1 }));
  }
  if (e === "announcements" || e === "acknowledge" || e === "announcementSeen") {
    $$(r, e === "announcements" ? [] : ["id"]);
    let s = await Promise.resolve().then(() => (Xwr(), {}));
    if (e === "acknowledge") return (await CaH(iL(r.id, 200)), !0);
    if (e === "announcementSeen") return (await waH(iL(r.id, 200)), !0);
    return PaH();
  }
  if (e === "checkUpdate") {
    ($$(r, []), v$e({ status: "checking", current: h_ }));
    let s = await Promise.resolve().then(() => (Qwr(), {})),
      a = await Zis().catch((H) => {
        throw (
          nkr({ status: "error", current: h_ }, H instanceof UP ? "verification" : "network").catch(() => {
            return;
          }),
          H
        );
      });
    return v$e({
      status: Mkt(a.version, h_) > 0 ? "available" : "current",
      current: h_,
      latest: a.version,
      required: Mkt(a.minimumVersion, h_) > 0,
    });
  }
  if (e === "updateLaunch") {
    if (($$(r, ["args", "cwd"]), !Array.isArray(r.args) || r.args.length > 128))
      throw Error("Invalid startup");
    let s = r.args.map((H) => iL(H)),
      a = lW(r.cwd);
    return ((T$e = s), (_Ye = a), !0);
  }
  if (e === "installUpdate") {
    if (($$(r, []), B7.size || hYe))
      throw Error("Wait for the current work to finish before installing an update.");
    hYe = !0;
    let s = "network";
    try {
      let a = await Promise.resolve().then(() => (Qwr(), {})),
        H = await Zis();
      if (Mkt(H.version, h_) <= 0) return v$e({ status: "current", current: h_ });
      v$e({ status: "downloading", current: h_, latest: H.version, progress: 0 });
      let u = await XaH(SR.join(qaH.tmpdir(), "jac-update-")),
        f = await VaH(H, u, fetch, (C) =>
          v$e({ status: "downloading", current: h_, latest: H.version, progress: C }),
        );
      ((s = "installation"), v$e({ status: "verifying", current: h_, latest: H.version }));
      let d = SR.join(u, "JacDesktopUpdate.exe");
      await GaH(SR.join(SR.dirname(process.execPath), "JacDesktopUpdate.exe"), d);
      let _ = ess(d, ["update"], {
          detached: !0,
          windowsHide: !0,
          shell: !1,
          stdio: ["pipe", "pipe", "ignore"],
        }),
        L = SR.resolve(SR.dirname(process.execPath), "../../..");
      if (B7.size)
        throw (
          _.stdin?.end(),
          (hYe = !1),
          Error("Wait for the current work to finish before installing an update.")
        );
      let I = T$e,
        D = _Ye,
        S = await Zwr(_, {
          op: "prepare",
          parentPid: rss,
          enginePid: process.pid,
          directory: L,
          installer: f,
          size: H.size,
          sha256: H.sha256,
          version: H.version,
          args: I,
          cwd: D,
        }),
        T = { op: "commit", ...(I === T$e && D === _Ye ? {} : { args: T$e, cwd: _Ye }) };
      if (S.ready !== !0 || B7.size > 0 || (await Zwr(_, T)).committed !== !0)
        throw (_.stdin?.end(), Error("Update could not prepare"));
      return (
        _.stdin?.end(),
        _.stdout?.destroy(),
        _.unref(),
        v$e({
          status: "ready",
          current: h_,
          latest: H.version,
          message: "Update verified. Restarting Jac Code.",
        })
      );
    } catch (a) {
      throw (
        nkr(
          { status: "error", current: h_, ...(vkt.latest ? { latest: vkt.latest } : {}) },
          a instanceof Error && a.name === "UpdateError" ? "verification" : s,
        ).catch(() => {
          return;
        }),
        a
      );
    } finally {
      hYe = !1;
    }
  }
  throw Error("Unsupported operation");
}