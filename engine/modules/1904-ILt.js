
var ILt = ne(() => {
  cV();
  yY();
  x1 = z0("workspace", {
    id: dH().$type().primaryKey(),
    type: dH().notNull(),
    name: dH().notNull().default(""),
    branch: dH(),
    directory: dH(),
    extra: dH({ mode: "json" }),
    project_id: dH()
      .$type()
      .notNull()
      .references(() => If.id, { onDelete: "cascade" }),
    time_used: Wd()
      .notNull()
      .$default(() => Date.now()),
  });
});