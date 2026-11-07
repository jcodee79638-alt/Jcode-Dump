
function so(e, t) {
  if (
    !tr(e) ||
    Object.keys(e).some(
      (r) =>
        ![
          "version",
          "id",
          "createdAt",
          "conversations",
          "attachments",
          "partial",
          "skipped",
          "scopes",
          "warnings",
          "files",
          "seal",
        ].includes(r),
    )
  )
    throw ae();
  if (
    e.version !== 1 ||
    typeof e.id !== "string" ||
    !er(e.id) ||
    (t !== void 0 && e.id !== t) ||
    typeof e.partial !== "boolean"
  )
    throw ae();
  for (let r of ["createdAt", "conversations", "attachments", "skipped"])
    if (!Number.isSafeInteger(e[r]) || Number(e[r]) < 0) throw ae();
  if (
    !Array.isArray(e.scopes) ||
    !Array.isArray(e.warnings) ||
    [...e.scopes, ...e.warnings].some((r) => typeof r !== "string" || r.length > 600) ||
    e.scopes.length > 20 ||
    e.warnings.length > 30
  )
    throw ae();
  if (
    !Array.isArray(e.files) ||
    e.files.length < 2 ||
    e.files.length > Be.files ||
    typeof e.seal !== "string" ||
    !/^[a-f0-9]{64}$/.test(e.seal)
  )
    throw ae();
  let n = new Set(),
    i = 0;
  for (let r of e.files) {
    if (
      !tr(r) ||
      Object.keys(r).sort().join(",") !== "bytes,path,sha256" ||
      typeof r.path !== "string" ||
      !Pa(r.path) ||
      n.has(r.path) ||
      !Number.isSafeInteger(r.bytes) ||
      Number(r.bytes) < 0 ||
      Number(r.bytes) > io(r.path) ||
      typeof r.sha256 !== "string" ||
      !/^[a-f0-9]{64}$/.test(r.sha256)
    )
      throw ae();
    (n.add(r.path), (i += Number(r.bytes)));
  }
  if (!n.has("database.sqlite") || !n.has("settings.json") || i + Be.manifest > Be.snapshot) throw ae();
  if (
    e.attachments !==
    e.files.filter((r) => tr(r) && typeof r.path === "string" && /^attachments\/[^.]+$/.test(r.path)).length
  )
    throw ae();
  return e;
}