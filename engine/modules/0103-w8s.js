
async function w8s(e, t) {
  await ctn(e);
  let r = Htn(e);
  try {
    let s = new OAt(t, { create: !0, strict: !0 });
    try {
      (r.exec("BEGIN"),
        s.exec("PRAGMA journal_mode=DELETE; PRAGMA trusted_schema=OFF; PRAGMA foreign_keys=OFF; BEGIN"));
      let a = UAt(r).filter((_) => VFe.has(_.name));
      for (let _ of a) s.exec(_.sql);
      let H = { rows: 0, bytes: 0 };
      for (let _ of a) kAt(r, s, _.name, "snapshot", H);
      for (let _ of Nq(r, "SELECT tbl_name,sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL"))
        if (VFe.has(_.tbl_name)) s.exec(_.sql);
      s.exec("COMMIT");
      let u = a.some((_) => _.name === "session")
          ? Number(Zne(s, "SELECT count(*) AS count FROM session")?.count ?? 0)
          : 0,
        f = UAt(r).filter((_) => !VFe.has(_.name)).length;
      if (
        Zne(s, "PRAGMA integrity_check")?.integrity_check !== "ok" ||
        Nq(s, "PRAGMA foreign_key_check").length
      )
        throw Ap();
      let d = a.some((_) => _.name === "session_input")
        ? Number(Zne(s, "SELECT count(*) AS count FROM session_input WHERE promoted_seq IS NULL")?.count ?? 0)
        : 0;
      return { conversations: u, skipped: f, pending: d };
    } finally {
      s.close(!0);
    }
  } finally {
    r.close(!0);
  }
}