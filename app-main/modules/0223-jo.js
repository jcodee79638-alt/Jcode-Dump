
function jo(e) {
  return co(re.default.join(e, "backups-v6"), {
    idle: () =>
      dr().then(
        () => !0,
        () => !1,
      ),
    snapshot: (t, n) =>
      It(async () => {
        (await lr(), await A.call("backupSnapshot", { directory: t, id: n }, 120000));
      }),
    restore: async (t, n) => {
      (await lr(), await Xe.pause(!0), Ue.stop(), clearInterval(kn));
      let i = await A.call("backupRestore", { directory: t, id: n }, 120000)
        .then((r) => j(r))
        .catch(() => ({ restored: !1, restart: !0 }));
      if (i.restored !== !0)
        await P.dialog.showMessageBox(R, {
          type: "warning",
          buttons: ["Restart"],
          message: "This backup could not be restored.",
          detail:
            "Jac Code will restart to reopen its current data safely. Recoverable originals have been kept.",
        });
      return (
        setImmediate(
          () =>
            void (async () => {
              ((ge = !0),
                await En.stop(),
                await ai.close(),
                P.app.relaunch(gn ? { args: rr } : void 0),
                await A.stop(),
                R?.destroy(),
                P.app.quit());
            })(),
        ),
        { restored: i.restored === !0, restart: !0 }
      );
    },
  });
}