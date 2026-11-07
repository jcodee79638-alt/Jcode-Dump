
async function Vt(e = !1) {
  if (ge || Te) return;
  if (Re && !e) {
    de({ type: "error", message: "Wait for Jac Code to finish installing its verified update." });
    return;
  }
  if (lt) {
    de({ type: "error", message: "Wait for this workspace change to finish before closing Jac Code." });
    return;
  }
  Te = !0;
  try {
    if (Ne) {
      ((ge = !0), await A.stop(), R?.destroy(), P.app.quit());
      return;
    }
    if (R && !vn) (await new Promise((r) => setTimeout(r, 500)), await lr());
    if (Se > 0) throw Error("A message is still being prepared.");
    let t = e ? await A.activity() : await A.activity().catch(() => ({ busy: !1, sessions: [] })),
      n = [...Y.values()].map((r) => ({ id: r.task.sessionId, directory: r.task.directory })),
      i = {
        busy: t.busy || n.length > 0 || Oe.size > 0,
        sessions: [...t.sessions, ...n.filter((r) => !t.sessions.some((s) => s.id === r.id))],
      };
    if (i.busy && e) return;
    if (i.busy) {
      if (
        (
          await P.dialog.showMessageBox(R, {
            type: "question",
            buttons: ["Keep working", "Cancel work and close"],
            defaultId: 0,
            cancelId: 0,
            message: "Jac Code is still working.",
            detail:
              "Keep this window open to let your work finish, or cancel the active sessions and close. Your saved chats and drafts are kept.",
          })
        ).response !== 1
      )
        return;
      await Promise.allSettled(
        i.sessions.map((s) => A.request("POST", `/session/${N(s.id)}/abort`, s.directory)),
      );
    }
    ((ge = !0),
      clearTimeout(cr),
      Ue?.stop(),
      clearInterval(kn),
      await En.stop(),
      await ai.close(),
      await A.stop(),
      R?.destroy(),
      P.app.quit());
  } catch {
    de({ type: "error", message: "Jac Code is still saving your draft. Try closing again." });
  } finally {
    Te = !1;
  }
}