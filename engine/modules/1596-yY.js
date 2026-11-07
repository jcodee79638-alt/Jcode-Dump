
var yY = ne(() => {
  cV();
  Dir();
  YMe();
  ((If = z0("project", {
    id: dH().$type().primaryKey(),
    worktree: Iir().notNull(),
    vcs: dH(),
    name: dH(),
    icon_url: dH(),
    icon_url_override: dH(),
    icon_color: dH(),
    ...Lw,
    time_initialized: Wd(),
    sandboxes: QDn().notNull(),
    commands: dH({ mode: "json" }).$type(),
  })),
    (uL = z0(
      "project_directory",
      {
        project_id: dH()
          .$type()
          .notNull()
          .references(() => If.id, { onDelete: "cascade" }),
        directory: Iir().notNull(),
        type: dH().$type(),
        strategy: dH(),
        time_created: Wd()
          .notNull()
          .$default(() => Date.now()),
      },
      (e) => [$de({ columns: [e.project_id, e.directory] })],
    )));
});