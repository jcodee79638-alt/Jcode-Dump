
var Po,
  Ie = { at: 0 },
  Oe = new Map(),
  ai = Ws(re.default.join(P.app.getPath("userData"), "project-tools-v6"), {
    guardExecutable: re.default.join(fr, "JacProjectRun.exe"),
    parentPid: process.pid,
    onRun: (e, t) => {
      if (t.state === "running") Oe.set(t.id, { directory: e, run: t });
      else Oe.delete(t.id);
      (Po?.(e, t), de({ type: "refresh" }));
    },
  }),
  Xe = Gs(re.default.join(P.app.getPath("userData"), "queue-v6"));