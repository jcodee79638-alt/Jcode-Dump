
function ntn(e, t) {
  if (
    !wJt(e) ||
    Object.keys(e).some(
      (a) =>
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
        ].includes(a),
    )
  )
    throw xj();
  if (
    e.version !== 1 ||
    typeof e.id !== "string" ||
    !uQ(e.id) ||
    (t !== void 0 && e.id !== t) ||
    typeof e.partial !== "boolean"
  )
    throw xj();
  for (let a of ["createdAt", "conversations", "attachments", "skipped"])
    if (!Number.isSafeInteger(e[a]) || Number(e[a]) < 0) throw xj();
  if (
    !Array.isArray(e.scopes) ||
    !Array.isArray(e.warnings) ||
    [...e.scopes, ...e.warnings].some((a) => typeof a !== "string" || a.length > 600) ||
    e.scopes.length > 20 ||
    e.warnings.length > 30
  )
    throw xj();
  if (
    !Array.isArray(e.files) ||
    e.files.length < 2 ||
    e.files.length > Ch.files ||
    typeof e.seal !== "string" ||
    !/^[a-f0-9]{64}$/.test(e.seal)
  )
    throw xj();
  let r = new Set(),
    s = 0;
  for (let a of e.files) {
    if (
      !wJt(a) ||
      Object.keys(a).sort().join(",") !== "bytes,path,sha256" ||
      typeof a.path !== "string" ||
      !j8s(a.path) ||
      r.has(a.path) ||
      !Number.isSafeInteger(a.bytes) ||
      Number(a.bytes) < 0 ||
      Number(a.bytes) > ttn(a.path) ||
      typeof a.sha256 !== "string" ||
      !/^[a-f0-9]{64}$/.test(a.sha256)
    )
      throw xj();
    (r.add(a.path), (s += Number(a.bytes)));
  }
  if (!r.has("database.sqlite") || !r.has("settings.json") || s + Ch.manifest > Ch.snapshot) throw xj();
  if (
    e.attachments !==
    e.files.filter((a) => wJt(a) && typeof a.path === "string" && /^attachments\/[^.]+$/.test(a.path)).length
  )
    throw xj();
  return e;
}