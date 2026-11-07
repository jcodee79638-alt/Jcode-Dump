
async function O8s(e, t, r) {
  await ctn(Pu.join(e.data, "opencode.db"));
  let s = Htn(Pu.join(e.data, "opencode.db"), !1);
  try {
    let a = OAt.deserialize(t, { readonly: !0 });
    try {
      a.exec("PRAGMA trusted_schema=OFF; PRAGMA foreign_keys=OFF");
      let H = new OAt(r, { create: !0, strict: !0 });
      try {
        if (Zne(s, "PRAGMA wal_checkpoint(TRUNCATE)")?.busy) throw Ap();
        (s.exec("BEGIN"),
          a.exec("BEGIN"),
          H.exec("PRAGMA journal_mode=DELETE; PRAGMA foreign_keys=OFF; PRAGMA trusted_schema=OFF; BEGIN"));
        let u = UAt(s),
          f = UAt(a);
        if (f.some((_) => !VFe.has(_.name) || !u.some((L) => L.name === _.name))) throw Ap();
        for (let _ of u) H.exec(_.sql);
        let d = { rows: 0, bytes: 0 };
        for (let _ of f.filter((L) => !otn.has(L.name))) kAt(a, H, _.name, "restore", d);
        for (let _ of u.filter((L) => !VFe.has(L.name) || otn.has(L.name))) kAt(s, H, _.name, "current", d);
        for (let _ of ["project", "project_directory"])
          if (u.some((L) => L.name === _)) kAt(s, H, _, "current", d);
        if (u.some((_) => _.name === "session") && NAt(s, "session").includes("permission")) {
          let _ = H.prepare("UPDATE session SET permission=? WHERE id=?");
          try {
            for (let L of Nq(s, "SELECT id,permission FROM session")) _.run(L.permission, L.id);
          } finally {
            _.finalize();
          }
        }
        if (u.some((_) => _.name === "session") && NAt(s, "session").includes("metadata")) {
          let _ = new Map(Nq(s, "SELECT id,metadata FROM session").map((S) => [S.id, S.metadata])),
            L = await GJt(e),
            I = L.accessMode === "read" || L.accessMode === "full" ? L.accessMode : "ask",
            D = H.prepare("UPDATE session SET metadata=? WHERE id=?");
          try {
            for (let S of Nq(H, "SELECT id,metadata FROM session")) {
              let T = S.metadata ? JSON.parse(S.metadata) : {},
                C = _.get(S.id) ? JSON.parse(_.get(S.id)) : {};
              if (!NM(T) || !NM(C)) throw Ap();
              let O = ["read", "ask", "full"].includes(String(C.jac_access_mode)) ? C.jac_access_mode : I;
              D.run(JSON.stringify({ ...T, jac_access_mode: O }), S.id);
            }
          } finally {
            D.finalize();
          }
        }
        for (let _ of Nq(s, "SELECT sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL"))
          H.exec(_.sql);
        if (
          (H.exec("COMMIT"),
          Zne(H, "PRAGMA integrity_check")?.integrity_check !== "ok" ||
            Nq(H, "PRAGMA foreign_key_check").length)
        )
          throw Ap();
        if (u.some((_) => _.name === "session_input"))
          return Nq(
            H,
            "SELECT session_id AS sessionId,id AS inputId FROM session_input WHERE promoted_seq IS NULL LIMIT 20001",
          );
        return [];
      } finally {
        H.close(!0);
      }
    } finally {
      a.close(!0);
    }
  } finally {
    s.close(!0);
  }
}