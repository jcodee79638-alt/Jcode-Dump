
function Wde(e, t) {
  return (r) =>
    t
      .run(Lh("git", r, { cwd: e, extendEnv: !0, stdin: "ignore" }))
      .pipe(
        Vn((s) => ({
          exitCode: s.exitCode,
          text: s.stdout.toString("utf8"),
          stderr: s.stderr.toString("utf8"),
        })),
      );
}