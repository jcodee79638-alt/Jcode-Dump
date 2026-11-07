
function kAt(e, t, r, s, a) {
  if (
    r === "session_share" &&
    s === "current" &&
    !Zne(t, "SELECT name FROM sqlite_master WHERE type='table' AND name='session'")
  )
    return;
  let H = NAt(e, r),
    u = NAt(t, r);
  if (H.some((L) => !u.includes(L))) throw Ap();
  let f = t.prepare(
      `INSERT ${s === "current" ? "OR REPLACE " : ""}INTO ${wAt(r)} (${H.map(wAt).join(",")}) VALUES (${H.map(() => "?").join(",")})`,
    ),
    d = e.prepare(`SELECT * FROM ${wAt(r)}`),
    _ = r === "session_share" && s === "current" ? t.prepare("SELECT id FROM session WHERE id=?") : void 0;
  try {
    for (let L of d.iterate()) {
      if (_ && !_.get(L.session_id)) continue;
      if (++a.rows > Ch.rows) throw Ap();
      let I = H.map((D) => {
        let S = r === "session" && D === "permission" && s !== "current" ? null : L[D];
        if (
          ((a.bytes += typeof S === "string" ? Buffer.byteLength(S) : S instanceof Uint8Array ? S.length : 8),
          a.bytes > Ch.database)
        )
          throw Ap();
        return S;
      });
      f.run(...I);
    }
  } finally {
    (d.finalize(), f.finalize(), _?.finalize());
  }
}