
var nns = ne(async () => {
  Ql();
  Gt();
  $H();
  await Jn([Jw(), $ee(), P7(), um(), ek(), tte(), h7(), Jy(), AYe(), Ywe()]);
  rns = Kd(eh, "instance", (e) =>
    ft(function* () {
      let t = yield* DP,
        r = yield* EPe,
        s = yield* _J,
        a = yield* fR,
        H = yield* uee,
        u = yield* iAe,
        f = Ge("InstanceHttpApi.dispose")(function* () {
          return (yield* _kt(yield* Jc), !0);
        }),
        d = Ge("InstanceHttpApi.path")(function* () {
          let q = yield* Jc;
          return {
            home: uH.home,
            state: uH.state,
            config: uH.config,
            worktree: q.worktree,
            directory: q.directory,
          };
        }),
        _ = Ge("InstanceHttpApi.vcs")(function* () {
          let [q, Z] = yield* Km([u.branch(), u.defaultBranch()], { concurrency: "unbounded" });
          return { branch: q, default_branch: Z };
        }),
        L = Ge("InstanceHttpApi.vcsStatus")(function* () {
          return yield* u.status();
        }),
        I = Ge("InstanceHttpApi.vcsDiff")(function* (q) {
          return yield* u.diff(q.query.mode, { context: q.query.context });
        }),
        D = Ge("InstanceHttpApi.vcsDiffRaw")(function* () {
          return yield* u.diffRaw();
        }),
        S = Ge("InstanceHttpApi.vcsApply")(function* (q) {
          return yield* u
            .apply(q.payload)
            .pipe(
              Zo((Z) => new lAe({ name: "VcsApplyError", data: { message: Z.message, reason: Z.reason } })),
            );
        }),
        T = Ge("InstanceHttpApi.command")(function* () {
          return yield* r.list();
        }),
        C = Ge("InstanceHttpApi.agent")(function* () {
          return yield* t.list();
        }),
        O = Ge("InstanceHttpApi.skill")(function* () {
          return yield* H.all();
        }),
        B = Ge("InstanceHttpApi.lsp")(function* () {
          return yield* a.status();
        }),
        V = Ge("InstanceHttpApi.formatter")(function* () {
          return yield* s.status();
        });
      return e
        .handle("dispose", f)
        .handle("path", d)
        .handle("vcs", _)
        .handle("vcsStatus", L)
        .handle("vcsDiff", I)
        .handle("vcsDiffRaw", D)
        .handle("vcsApply", S)
        .handle("command", T)
        .handle("agent", C)
        .handle("skill", O)
        .handle("lsp", B)
        .handle("formatter", V);
    }),
  );
});