
async function Yt(e) {
  let t = Y.get(e);
  if (!t || t.sending || t.settling) return;
  t.settling = !0;
  try {
    let n = await Tt({ id: e, directory: t.task.directory });
    if (n.status !== "idle" || n.permissions.length || n.questions.length) return;
    if (
      j(await A.call("executionIdle", { id: e, directory: t.task.directory })).idle !== !0 ||
      A.connection().state !== "connected"
    )
      return;
    let r = Ls({ ...t, executionIdle: !0 }, n, A.connection());
    if (!r.state) return;
    let s = r.messages,
      o = await Promise.all(
        n.children.map((w) =>
          Tt({ id: w.id, directory: w.directory }).catch(() => {
            return;
          }),
        ),
      );
    if (r.state === "interrupted") await Xe.pause(!0);
    let l = r.state,
      u = await Os(
        Y,
        e,
        t,
        () =>
          ue.finish(t.task.id, {
            state: l,
            checks: zs([
              ...s,
              ...o.flatMap((w) => w?.messages.filter((f) => f.createdAt >= t.task.startedAt) ?? []),
            ]),
          }),
        async () => {
          (await Xe.pause(!0),
            de({
              type: "error",
              sessionId: e,
              message:
                "Your task stopped, but its local report could not be saved. Your conversation is kept. Review saved work before continuing.",
            }));
        },
      );
    if (!u.released) return;
    let p = u.report;
    if (
      (A.call("taskSupport", { sessionId: e, supportId: t.task.supportId, clear: !0 }).catch(() => {
        return;
      }),
      or.delete(e),
      (Ie.at = 0),
      En.tick().catch(() => {
        return;
      }),
      Ao(
        p?.state === "completed"
          ? "Your task finished. View its files and checks."
          : "Your task stopped. Saved work is ready to review.",
        e,
        t.task.directory,
      ),
      de({ type: "refresh", sessionId: e }),
      ve.status === "available")
    )
      Sn();
  } catch {
  } finally {
    t.settling = !1;
  }
}