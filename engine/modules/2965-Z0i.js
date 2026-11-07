
function Z0i(e) {
  return {
    id: Pqe.make("git_worktree"),
    create: Ge("ProjectCopy.GitWorktree.create")(function* (t) {
      let r = yield* e.git.repo.discover(t.sourceDirectory);
      if (!r) return yield* new G_e({ directory: t.sourceDirectory });
      return (
        yield* e.git.worktree.create({ repository: r, directory: t.directory }),
        { directory: yield* e.canonical(t.directory) }
      );
    }),
    remove: Ge("ProjectCopy.GitWorktree.remove")(function* (t) {
      let r = yield* e.git.repo.discover(t.directory);
      if (!r) return yield* new G_e({ directory: t.directory });
      yield* e.git.worktree.remove({ repository: r, directory: t.directory, force: t.force });
    }),
    list: Ge("ProjectCopy.GitWorktree.list")(function* (t) {
      let r = yield* e.git.repo.discover(t);
      if (!r) return yield* new G_e({ directory: t });
      let s = yield* e.git.worktree.list(r);
      return yield* ja(s, (a) =>
        e.canonical(a.directory).pipe(
          Vn((H) => ({ directory: H, type: a.kind === "main" ? "root" : "copy" })),
          EA("ProjectCopy.DirectoryUnavailableError", () => Jt(void 0)),
        ),
      ).pipe(Vn((a) => a.filter((H) => H !== void 0)));
    }),
  };
}