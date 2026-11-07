
var Yve = ne(() => {
  Yve();
  Gt();
  Hu();
  g_();
  Hu();
  ((Hua = re.check(k6("pty")).pipe(Jl("PtyID"))),
    (ox = Hua.pipe(
      Bl((e) => {
        let t = () => e.make("pty_" + t0());
        return { create: t, ascending: (r) => (r === void 0 ? t() : e.make(r)) };
      }),
    )),
    (X_e = nt({
      id: ox,
      title: re,
      command: re,
      args: On(re),
      cwd: re,
      status: Jo(["running", "exited"]),
      pid: Ko,
      exitCode: Gn(Ko),
    }).annotate({ identifier: "Pty" })),
    (cEi = ua({ type: "pty.created", schema: { info: X_e } })),
    (AEi = ua({ type: "pty.updated", schema: { info: X_e } })),
    (uEi = ua({ type: "pty.exited", schema: { id: ox, exitCode: Ko } })),
    (lEi = ua({ type: "pty.deleted", schema: { id: ox } })),
    (fEi = { Created: cEi, Updated: AEi, Exited: uEi, Deleted: lEi, Definitions: jl(cEi, AEi, uEi, lEi) }),
    (pEi = nt({ command: Gn(re), args: Gn(On(re)), cwd: Gn(re), title: Gn(re), env: Gn(ks(re, re)) })),
    (dEi = nt({ title: Gn(re), size: Gn(nt({ rows: qc, cols: qc })) })));
});