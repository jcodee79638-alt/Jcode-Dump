
function co(e, t) {
  if (!ne.default.isAbsolute(e)) throw ae();
  let n = !1,
    i,
    r,
    s = 0,
    o = !1,
    l,
    u = () =>
      (l ??= (async () => {
        (await ja(e), await Kr(e, !0));
        let g = await ce.opendir(e),
          k = 0;
        for await (let a of g) {
          if (++k > 128) throw ae();
          if (!/^\.pending-[a-f0-9-]{36}$/.test(a.name)) continue;
          let d = ne.default.join(e, a.name);
          (await Wt(d), await ce.rm(d, { recursive: !0 }));
        }
      })()),
    p = async () => {
      let g = await wn(ne.default.join(e, "config.json"), 1024)
        .then((k) => JSON.parse(k.toString("utf8")))
        .catch((k) => {
          if (k.code !== "ENOENT") throw k;
          return;
        });
      if (g === void 0) return { enabled: !0, intervalHours: 24, keep: 3 };
      if (
        !tr(g) ||
        Object.keys(g).sort().join(",") !== "enabled,intervalHours,keep" ||
        typeof g.enabled !== "boolean" ||
        !Number.isInteger(g.keep) ||
        Number(g.keep) < 1 ||
        Number(g.keep) > 10 ||
        !Number.isInteger(g.intervalHours) ||
        Number(g.intervalHours) < 1 ||
        Number(g.intervalHours) > 168
      )
        throw ae();
      return { enabled: g.enabled, intervalHours: Number(g.intervalHours), keep: Number(g.keep) };
    },
    w = async (g = !0) => {
      await u();
      let k = [],
        a = await ce.opendir(e),
        d = 0;
      for await (let c of a) {
        if (++d > 128) throw ae();
        if (!er(c.name)) {
          if (
            ["config.json", ".integrity-v6.key"].includes(c.name) ||
            /^\.pending-[a-f0-9-]{36}$/.test(c.name)
          )
            continue;
          if (g) throw ae();
          i =
            "Some local backups could not be verified. Counts and sizes include verified copies only. Keep the other local files for recovery and contact support.";
          continue;
        }
        let y = await mn(ne.default.join(e, c.name), c.name).catch((v) => {
          if (g) throw v;
          i =
            "Some local backups could not be verified. Counts and sizes include verified copies only. Keep the other local files for recovery and contact support.";
          return;
        });
        if (y) k.push(y.entry);
      }
      return k.sort((c, y) => y.createdAt - c.createdAt || y.id.localeCompare(c.id));
    },
    f = async (g, k = 0) => {
      let a = await w(),
        d = 0;
      for (let [c, y] of a.entries()) {
        if (c < g && d + y.bytes + k <= Be.total - 4096) {
          d += y.bytes;
          continue;
        }
        let v = ne.default.join(e, y.id);
        (await mn(v, y.id), await ce.rm(v, { recursive: !0 }));
      }
    },
    h = async () => {
      await u();
      let g = await p(),
        k = await w(!1).catch(
          () => (
            (i =
              "Local backup usage could not be verified. Counts and sizes below may be incomplete. Keep the local files for recovery and contact support."),
            []
          ),
        );
      return {
        ...g,
        entries: k,
        totalBytes: k.reduce((a, d) => a + d.bytes, 0),
        limitBytes: Be.total,
        ...(i ? { lastError: i } : {}),
      };
    },
    m = async (g) => {
      if (n) throw Error("A local backup operation is already running.");
      n = !0;
      try {
        return await g();
      } finally {
        n = !1;
      }
    },
    b = () =>
      m(async () => {
        if ((await u(), o))
          throw Error(
            "Restart Jac Code to clean up an interrupted local backup before creating another copy.",
          );
        if (t.idle && !(await t.idle()))
          throw Error("Wait for current work to finish before creating or restoring a backup.");
        let g = await p(),
          k = Fe.randomUUID(),
          a = ne.default.join(e, ".pending-" + k);
        (await f(g.keep - 1, Be.snapshot + Be.manifest), await ce.mkdir(a, { mode: 448 }), (s = Date.now()));
        try {
          return (
            await t.snapshot(a, k),
            await Ia(a, e),
            await mn(a, k),
            await ce.rename(a, ne.default.join(e, k)),
            await f(g.keep),
            (i = void 0),
            h()
          );
        } catch (d) {
          throw (
            (i = "The local backup was not completed. Your current data is unchanged."),
            await ce.rm(a, { recursive: !0, force: !0 }).catch(() => {
              o = !0;
            }),
            d
          );
        }
      });
  return {
    backupStatus: h,
    createBackup: b,
    inspectBackup: async (g) => {
      if (!g || Object.keys(g).join(",") !== "id" || !er(g.id)) throw ae();
      let k = await mn(ne.default.join(e, g.id), g.id);
      return {
        entry: k.entry,
        scopes: k.manifest.scopes,
        warnings: [
          ...k.manifest.warnings,
          "Restoring replaces saved conversation history and safe settings/drafts. Current sign-in, access, startup and security settings are retained.",
          "Project folders and current project registrations are retained. Jac Code restarts after restoration.",
        ],
        canRestore: !n && !o && (!t.idle || (await t.idle())),
      };
    },
    configureBackups: (g) =>
      m(async () => {
        if (
          !g ||
          Object.keys(g).sort().join(",") !== "enabled,intervalHours,keep" ||
          typeof g.enabled !== "boolean" ||
          !Number.isInteger(g.intervalHours) ||
          g.intervalHours < 1 ||
          g.intervalHours > 168 ||
          !Number.isInteger(g.keep) ||
          g.keep < 1 ||
          g.keep > 10
        )
          throw Error("Choose 1–10 backup copies and an interval of 1–168 hours.");
        return (await u(), await ao(ne.default.join(e, "config.json"), g), await f(g.keep), h());
      }),
    restoreBackup: (g) =>
      m(async () => {
        if (!g || Object.keys(g).sort().join(",") !== "confirmed,id" || g.confirmed !== !0 || !er(g.id))
          throw Error("Confirm restoration before continuing.");
        if (o)
          throw Error("Restart Jac Code to clean up an interrupted local backup before restoring a copy.");
        if (t.idle && !(await t.idle()))
          throw Error("Wait for current work to finish before creating or restoring a backup.");
        let k = ne.default.join(e, g.id);
        return (await mn(k, g.id), t.restore(k, g.id));
      }),
    start() {
      if (r) return;
      let g = async () => {
        if (n) return;
        let k = await h();
        if (!k.enabled || Date.now() - Math.max(k.entries[0]?.createdAt ?? 0, s) < k.intervalHours * 3600000)
          return;
        if (t.idle && !(await t.idle())) return;
        await b();
      };
      ((r = setInterval(() => {
        g().catch(() => {
          i =
            "The scheduled local backup could not complete. Try creating a backup when current work finishes.";
        });
      }, 60000)),
        r.unref?.(),
        g().catch(() => {
          i =
            "The scheduled local backup could not complete. Try creating a backup when current work finishes.";
        }));
    },
    stop() {
      if (r) clearInterval(r);
      r = void 0;
    },
  };
}