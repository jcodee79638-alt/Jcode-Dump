
var En = Vs({
    queue: Xe,
    ready: async () =>
      !lt &&
      !dt &&
      !Re &&
      !Te &&
      ve.status === "current" &&
      A.connection().state === "connected" &&
      !Oe.size &&
      Y.size + Se < 3,
    eligible: async (e) => {
      let t = await F(e.directory);
      if (
        sr.has(t.toLowerCase()) ||
        [...Y.values()].some((r) => r.task.directory.toLowerCase() === t.toLowerCase())
      )
        return !1;
      let n = await Tt({ id: e.sessionId, directory: t });
      if (n.status !== "idle" || n.permissions.length || n.questions.length) return !1;
      if (Date.now() - Ie.at >= 60000) ((Ie.value = await A.call("account")), (Ie.at = Date.now()));
      let i = Ie.value;
      return !!i?.admission.allowed && !i.globalPaused && i.active < i.concurrentLimit;
    },
    access: async (e) =>
      pt(j(await A.call("applyAccess", { id: e.sessionId, directory: await F(e.directory) })).mode),
    send: (e) =>
      Kt.send({
        id: e.sessionId,
        directory: e.directory,
        text: e.text,
        attachments: e.attachments,
        thinking: e.thinking,
        model: e.model ?? "jaccoder-5.5",
      }).then(() => {
        return;
      }),
    changed: () => de({ type: "refresh" }),
  }),
  Ue;