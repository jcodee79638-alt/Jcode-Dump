
function Ra(e, t) {
  if (!/^\d{1,5}\.\d{1,5}\.\d{1,5}$/.test(t) || !e || typeof e !== "object" || Array.isArray(e))
    throw Error("Invalid integrity record");
  let n = e;
  if (
    Object.keys(n).sort().join() !== "files,kind,schema,version" ||
    n.schema !== 1 ||
    n.kind !== "jaccode-client-integrity" ||
    n.version !== t ||
    !Array.isArray(n.files) ||
    !n.files.length ||
    n.files.length > 128
  )
    throw Error("Invalid integrity record");
  let i = new Set(),
    r = n.files.map((s) => {
      if (!s || typeof s !== "object" || Array.isArray(s)) throw Error("Invalid integrity file");
      let o = s;
      if (
        Object.keys(o).sort().join() !== "path,sha256,size" ||
        typeof o.path !== "string" ||
        o.path.length > 512 ||
        !/^[a-zA-Z0-9_./ -]+$/.test(o.path) ||
        o.path.startsWith("/") ||
        o.path.split("/").some((l) => !l || l === "." || l === ".." || /[. ]$/.test(l)) ||
        typeof o.sha256 !== "string" ||
        !/^[a-f0-9]{64}$/.test(o.sha256) ||
        typeof o.size !== "number" ||
        !Number.isSafeInteger(o.size) ||
        o.size < 0 ||
        o.size > 268435456
      )
        throw Error("Invalid integrity file");
      if (o.path === `versions/${t}/${Qr}` || i.has(o.path.toLowerCase()))
        throw Error("Duplicate integrity file");
      if (
        !o.path.startsWith(`versions/${t}/`) &&
        !["jac.exe", "JacAuth.exe", "Uninstall.exe", "jac.ico", "GETTING-STARTED.txt"].includes(o.path) &&
        !o.path.startsWith("legal/")
      )
        throw Error("Unexpected integrity scope");
      return (i.add(o.path.toLowerCase()), { path: o.path, size: o.size, sha256: o.sha256 });
    });
  for (let s of [
    "jac.exe",
    `versions/${t}/Jac Code.exe`,
    `versions/${t}/resources/app.asar`,
    `versions/${t}/resources/jac-engine.exe`,
    `versions/${t}/resources/JacAuth.exe`,
    `versions/${t}/resources/JacDesktopUpdate.exe`,
  ])
    if (!i.has(s.toLowerCase())) throw Error("Incomplete integrity coverage");
  if (r.reduce((s, o) => s + o.size, 0) > 805306368) throw Error("Integrity scope too large");
  return r;
}