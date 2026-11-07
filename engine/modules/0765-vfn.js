
var vfn = ne(() => {
  BH();
  Dd();
  PW();
  Sfn();
  Upt();
  Npt();
  Tfn = bf(
    Mfn,
    xfn({
      args: jn(() => process.argv.slice(2)),
      stdout: (e) =>
        ase({
          evaluate: () => process.stdout,
          onError: (t) => YC({ module: "Stdio", method: "stdout", _tag: "Unknown", cause: t }),
          endOnDone: e?.endOnDone ?? !1,
        }),
      stderr: (e) =>
        ase({
          evaluate: () => process.stderr,
          onError: (t) => YC({ module: "Stdio", method: "stderr", _tag: "Unknown", cause: t }),
          endOnDone: e?.endOnDone ?? !1,
        }),
      stdin: B6({
        evaluate: () => process.stdin,
        onError: (e) => YC({ module: "Stdio", method: "stdin", _tag: "Unknown", cause: e }),
        closeOnDone: !1,
      }),
    }),
  );
});