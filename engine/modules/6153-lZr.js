
async function lZr(e, t = Date.now()) {
  let r = qne.join(e, "opencode.db");
  if (
    !(await uZr(r).then(
      (a) => a.isFile(),
      () => !1,
    ))
  )
    return;
  let s = new U6s(r, { readonly: !0, strict: !0 });
  try {
    if (
      (s.exec("PRAGMA busy_timeout=5000"), s.query("PRAGMA integrity_check").get()?.integrity_check !== "ok")
    )
      throw Error(
        "Your Jac Code database needs recovery before upgrading. Your original database has been kept.",
      );
    let H = await O6s(qne.join(e, "backups", "desktop-3-receipt.json"), "utf8")
        .then(JSON.parse)
        .catch(() => {
          return;
        }),
      u = H && typeof H === "object" ? H : {},
      d = s
        .query("SELECT name FROM sqlite_master WHERE type='table'")
        .all()
        .map((T) => T.name)
        .includes("migration")
        ? s
            .query("SELECT id FROM migration")
            .all()
            .map((T) => T.id)
        : [];
    if (
      u.version === "3.0.0" &&
      typeof u.backup === "string" &&
      qne.dirname(u.backup) === qne.join(e, "backups") &&
      d.includes(bFe[0]) &&
      d.includes(bFe[1]) &&
      (await uZr(u.backup).then(
        (T) => T.isFile(),
        () => !1,
      ))
    )
      return u.backup;
    await k6s(qne.join(e, "backups"), { recursive: !0 });
    let _ = qne.join(e, "backups", `before-desktop-3-${t}-${crypto.randomUUID()}.db`);
    s.query("VACUUM INTO ?").run(_);
    let L = s
        .query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
        .all()
        .map((T) => T.name),
      I = new Set(
        L.includes("migration")
          ? s
              .query("SELECT id FROM migration")
              .all()
              .map((T) => T.id)
          : [],
      );
    if (!I.size && L.includes("__drizzle_migrations")) {
      let T = s
        .query("PRAGMA table_info('__drizzle_migrations')")
        .all()
        .map((C) => C.name);
      if (T.includes("name"))
        s.query("SELECT name FROM __drizzle_migrations WHERE name IS NOT NULL")
          .all()
          .forEach((C) => I.add(C.name));
      if (!T.includes("name") && T.includes("created_at"))
        s.query(
          "SELECT strftime('%Y%m%d%H%M%S', created_at / 1000, 'unixepoch') AS prefix FROM __drizzle_migrations",
        )
          .all()
          .forEach((C) => bFe.filter((O) => O.startsWith(C.prefix + "_")).forEach((O) => I.add(O)));
    }
    let D = bFe.filter((T) => !I.has(T));
    if (
      (D.includes(bFe[1])
        ? [
            "session_input",
            "session_message",
            "event",
            "event_sequence",
            "session_context_epoch",
            "workspace",
          ]
        : D.length
          ? ["session_message"]
          : []
      )
        .filter((T) => L.includes(T))
        .some((T) => Number(s.query(`SELECT count(*) AS count FROM "${T}"`).get()?.count) > 0)
    )
      throw Error(
        `Upgrade paused to protect existing chats from a pending historical migration. A consistent backup is saved in ${qne.join(e, "backups")}. Your original data is unchanged; contact Jac for recovery.`,
      );
    return _;
  } finally {
    s.close();
  }
}