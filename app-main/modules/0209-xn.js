
var xn = re.default.join(P.app.getAppPath(), "out"),
  fr = P.app.isPackaged ? process.resourcesPath : re.default.resolve(xn, "../resources"),
  xo = P.app.isPackaged
    ? re.default.resolve(re.default.dirname(process.execPath), "../..")
    : re.default.resolve(xn, "../../.."),
  Gt = si.pathToFileURL(re.default.join(xn, "renderer", "index.html")).href,
  Eo = ws(),
  So = new Set(),
  Co = new Set(),
  ar = 0,
  A = new Cr((e) => {
    if (e.type === "mcpAuth") {
      za(e.url).catch(() =>
        de({ type: "error", message: "Jac Code could not open MCP sign-in. Try again from MCP settings." }),
      );
      return;
    }
    de(e);
  }),
  R,
  pr = process.argv.slice(P.app.isPackaged ? 1 : 2),
  gn = P.app.isPackaged && ys(pr),
  Qe = !gn,
  rr = process.argv.slice(1),
  Xr = process.cwd(),
  ct = vs(pr, process.cwd()),
  Ne,
  kt = "6.0.0",
  ve = { status: "checking", current: kt },
  yn,
  ge = !1,
  Te = !1,
  Re = !1,
  Se = 0,
  dt = !1,
  lt = !1,
  oi = !1,
  ir,
  cr,
  vn,
  ei = 0,
  yo,
  de = (e) => {
    if (e.type === "update") ve = e.update;
    if (e.type === "part" && e.part.type === "tool") {
      let t = Y.get(e.sessionId);
      if (t)
        ue.observe(t.task.id, {
          id: e.part.id,
          at: Date.now(),
          kind: "tool",
          label: (e.part.tool || "Tool").replace(/[\x00-\x1f]/g, " ").slice(0, 256),
          status: e.part.status === "completed" ? "passed" : e.part.status === "error" ? "failed" : "running",
        }).catch(() => {
          return;
        });
    }
    if (e.type === "connection" && e.connection.state === "stopped" && !ge) {
      for (let [t, n] of Y)
        if (!n.sending)
          ue.finish(n.task.id, { state: "interrupted", checks: [] })
            .then(() => {
              if (Y.get(t) === n) Y.delete(t);
              de({ type: "refresh", sessionId: t });
            })
            .catch(() => {
              return;
            });
    }
    if (R && !R.isDestroyed()) R.webContents.send("jac:event", e);
    if (e.type === "status" && e.status === "busy") {
      let t = Y.get(e.sessionId);
      if (t) {
        if (((t.busy = !0), t.cancelled))
          A.request("POST", `/session/${N(e.sessionId)}/abort`, t.task.directory).catch(() =>
            de({
              type: "error",
              sessionId: e.sessionId,
              message:
                "Jac Code could not confirm cancellation. Close the app to stop this local task safely.",
            }),
          );
      }
    }
    if (e.type === "status" && e.status === "idle") {
      if ((Yt(e.sessionId), ve.status === "available")) Sn();
    }
  },
  vt = (e) => (Array.isArray(e) ? e : []),
  F = async (e) => {
    let t = await ut.realpath(et(e));
    if (!So.has(t.toLowerCase())) throw Error("Choose this project through Open project first.");
    return t;
  },
  bt = async (e) => {
    let t = await ut.realpath(et(e));
    if (!(await ut.stat(t)).isDirectory()) throw Error("Choose an absolute project folder.");
    return (So.add(t.toLowerCase()), t);
  },
  ri = ji(P.app.getPath("userData")),
  Ma = () => re.default.join(P.app.getPath("userData"), "attachments"),
  bn = Ms(Ma(), () => R),
  ue = rs(re.default.join(P.app.getPath("userData"), "tasks-v5")),
  ti = lo(re.default.join(P.app.getPath("userData"), "context-v5")),
  Y = new Map(),
  sr = new Set(),
  or = new Set();