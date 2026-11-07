
var r$r = ne(async () => {
  OH();
  Gt();
  MZ();
  ibe();
  jA();
  await Jn([r$r(), qd(), t$r(), um()]);
  ((Zda = zg(
    ft(function* () {
      let e = yield* bm,
        t = yield* K_e,
        r = [
          "<env>",
          `  Working directory: ${e.directory}`,
          `  Workspace root folder: ${e.project.directory}`,
          `  Is directory a git repo: ${e.vcs?.type === "git" ? "yes" : "no"}`,
          "  Platform: win32",
          "</env>",
        ].join(`
`),
        s = hLr([
          Fqe({
            key: QV.make("core/environment"),
            codec: wj(re),
            load: Jt(r),
            baseline: (a) =>
              ["Here is some useful information about the environment you are running in:", a].join(`
`),
            update: (a, H) =>
              ["The environment you are running in is now:", H].join(`
`),
          }),
          Fqe({
            key: QV.make("core/date"),
            codec: wj(re),
            load: DNs.pipe(Vn((a) => a.toDateString())),
            baseline: (a) => `Today's date: ${a}`,
            update: (a, H) => `Today's date is now: ${H}`,
          }),
        ]);
      yield* t.register({ key: QV.make("core/builtins"), load: Jt(s) });
    }),
  )),
    (ema = Ua({ name: "system-context-builtins", layer: Zda, deps: [KS, DMt, Yda, ui.node, lw] })));
});
import n$r from "path";