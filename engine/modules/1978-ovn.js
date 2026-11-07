
var ovn = ne(() => {
  cV();
  YMe();
  yY();
  vxe = z0(
    "permission",
    {
      id: dH().$type().primaryKey(),
      project_id: dH()
        .$type()
        .notNull()
        .references(() => If.id, { onDelete: "cascade" }),
      action: dH().notNull(),
      resource: dH().notNull(),
      ...Lw,
    },
    (e) => [uY("permission_project_action_resource_idx").on(e.project_id, e.action, e.resource)],
  );
});