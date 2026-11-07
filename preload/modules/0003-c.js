
var c = new Set(),
  i = new Map(),
  p = new Map(),
  d = 0,
  t = (e, o) => {
    let r = s.ipcRenderer.invoke("jac:invoke", e, o).catch((n) => {
      throw l(n);
    });
    if (e === "saveSettings" || e === "setAccessMode") {
      let n = ++d,
        u =
          e === "setAccessMode" ? ["accessMode"] : o && typeof o === "object" ? Object.keys(o) : ["settings"];
      (c.add(r),
        r.then(
          () => {
            (u.forEach((a) => {
              if ((p.set(a, Math.max(p.get(a) ?? 0, n)), (i.get(a) ?? 0) <= n)) i.delete(a);
            }),
              c.delete(r));
          },
          () => {
            (u.forEach((a) => {
              if ((p.get(a) ?? 0) < n) i.set(a, Math.max(i.get(a) ?? 0, n));
            }),
              c.delete(r));
          },
        ));
    }
    if (
      [
        "queuePrompt",
        "updateQueuedPrompt",
        "queueAction",
        "pauseQueue",
        "saveRunProfile",
        "removeRunProfile",
        "configureBackups",
        "saveContext",
      ].includes(e)
    )
      (c.add(r), r.finally(() => c.delete(r)).catch(() => {}));
    return r;
  };
s.ipcRenderer.on("jac:flush", () => {
  (async () => {
    await new Promise((e) => setTimeout(e, 500));
    while (c.size) await Promise.allSettled([...c]);
    if (i.size) throw Error("Your latest draft or settings could not be saved. Retry saving before closing.");
    await s.ipcRenderer.invoke("jac:flushed");
  })().catch(() => {});
});