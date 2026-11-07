
var YTi = ne(() => {
  cV();
  YMe();
  ((CN = z0("account", {
    id: dH().$type().primaryKey(),
    email: dH().notNull(),
    url: dH().notNull(),
    access_token: dH().$type().notNull(),
    refresh_token: dH().$type().notNull(),
    token_expiry: Wd(),
    ...Lw,
  })),
    (Lhe = z0("account_state", {
      id: Wd().primaryKey(),
      active_account_id: dH()
        .$type()
        .references(() => CN.id, { onDelete: "set null" }),
      active_org_id: dH().$type(),
    })),
    (CCc = z0(
      "control_account",
      {
        email: dH().notNull(),
        url: dH().notNull(),
        access_token: dH().$type().notNull(),
        refresh_token: dH().$type().notNull(),
        token_expiry: Wd(),
        active: Wd({ mode: "boolean" })
          .notNull()
          .$default(() => !1),
        ...Lw,
      },
      (e) => [$de({ columns: [e.email, e.url] })],
    )));
});