
var i1n = ne(() => {
  cV();
  YMe();
  $w = z0("credential", {
    id: dH().$type().primaryKey(),
    integration_id: dH().$type(),
    label: dH().notNull(),
    value: dH({ mode: "json" }).$type().notNull(),
    connector_id: dH(),
    method_id: dH(),
    active: Wd({ mode: "boolean" }),
    ...Lw,
  });
});