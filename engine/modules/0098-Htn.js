
function Htn(e, t = !0) {
  let r = new OAt(e, { readonly: t, strict: !0 });
  try {
    r.exec("PRAGMA busy_timeout=5000; PRAGMA trusted_schema=OFF; PRAGMA foreign_keys=OFF");
    let s = Number(Zne(r, "PRAGMA page_count")?.page_count) * Number(Zne(r, "PRAGMA page_size")?.page_size);
    if (!Number.isFinite(s) || s > 268435456) throw Ap();
    return r;
  } catch (s) {
    throw (r.close(!0), s);
  }
}