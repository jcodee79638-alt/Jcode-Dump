
function zCe(e, t = {}) {
  if (e.length === 0) throw Error("Command is required");
  t.abort?.throwIfAborted();
  let r = f5i.default(e[0], e.slice(1), {
      cwd: t.cwd,
      shell: t.shell,
      env: t.env === null ? {} : t.env ? { ...process.env, ...t.env } : void 0,
      stdio: [t.stdin ?? "ignore", t.stdout ?? "ignore", t.stderr ?? "ignore"],
      windowsHide: !0,
    }),
    s = !1,
    a,
    H = () => {
      if (s) return;
      if (r.exitCode !== null || r.signalCode !== null) return;
      ((s = !0), r.kill(t.kill ?? "SIGTERM"));
      let d = t.timeout ?? 5000;
      if (d <= 0) return;
      a = setTimeout(() => r.kill("SIGKILL"), d);
    },
    u = new Promise((d, _) => {
      let L = () => {
        if ((t.abort?.removeEventListener("abort", H), a)) clearTimeout(a);
      };
      (r.once("exit", (I, D) => {
        (L(), d(I ?? (D ? 1 : 0)));
      }),
        r.once("error", (I) => {
          (L(), _(I));
        }));
    });
  if (
    (u.catch(() => {
      return;
    }),
    t.abort)
  ) {
    if ((t.abort.addEventListener("abort", H, { once: !0 }), t.abort.aborted)) H();
  }
  let f = r;
  return ((f.exited = u), f);
}