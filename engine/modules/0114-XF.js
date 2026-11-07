
function XF(e, t, r) {
  let s =
    t === "database"
      ? Pu.join(e.data, "opencode.db")
      : t === "wal"
        ? Pu.join(e.data, "opencode.db-wal")
        : t === "shm"
          ? Pu.join(e.data, "opencode.db-shm")
          : t === "rollback"
            ? Pu.join(e.data, "opencode.db-journal")
            : t === "settings"
              ? Pu.join(e.state, "desktop-v3.json")
              : t === "projects"
                ? Pu.join(e.userData, "projects.json")
                : t === "attachments"
                  ? Pu.join(e.userData, "attachments")
                  : Pu.join(e.data, "restored-inputs-v6.json");
  return {
    target: s,
    before: Pu.join(Pu.dirname(s), `.${Pu.basename(s)}.restore-${r}.old`),
    after: Pu.join(Pu.dirname(s), `.${Pu.basename(s)}.restore-${r}.new`),
  };
}