
var SZi = ne(async () => {
  Gt();
  Gw();
  await fjt();
  ((crH = nt({ name: YXe.fields.name, branch: be(w6(re)), directory: re })), (hCr = E1(crH)));
  xZi = {
    name: "Worktree",
    description: "Create a git worktree",
    async configure(e, t) {
      let { AppRuntime: r, Worktree: s } = await Pwt(),
        a = await r.runPromise(
          Cwt(
            s.Service.use((H) => H.makeWorktreeInfo({ detached: !0 })),
            t,
          ),
        );
      return { ...e, name: a.name, directory: a.directory };
    },
    async create(e, t, r, s) {
      let { AppRuntime: a, Worktree: H } = await Pwt(),
        u = hCr(e);
      await a.runPromise(
        Cwt(
          H.Service.use((f) =>
            f.createFromInfo({
              name: u.name,
              directory: u.directory,
              ...(u.branch ? { branch: u.branch } : {}),
            }),
          ),
          s,
        ),
      );
    },
    async list(e) {
      let { AppRuntime: t, Worktree: r } = await Pwt(),
        s = MZi(e);
      return (
        await t.runPromise(
          Cwt(
            r.Service.use((a) => a.list()),
            e,
          ),
        )
      ).map((a) => ({
        type: "worktree",
        name: a.name,
        branch: a.branch,
        directory: a.directory,
        projectID: s.project.id,
      }));
    },
    async remove(e, t) {
      let { AppRuntime: r, Worktree: s } = await Pwt(),
        a = hCr(e);
      await r.runPromise(
        Cwt(
          s.Service.use((H) => H.remove({ directory: a.directory })),
          t,
        ),
      );
    },
    target(e) {
      return { type: "local", directory: hCr(e).directory };
    },
  };
});