
async function WaH(e, t = Qis) {
  let r = Jwr(e);
  Kwr(r, ["payload", "signature"]);
  let s = zwr(r.payload),
    a = zwr(r.signature);
  if (s.byteLength > 65536 || a.byteLength !== 64) throw new UP();
  let H = await crypto.subtle.importKey("raw", zwr(t), "Ed25519", !1, ["verify"]);
  if (!(await crypto.subtle.verify("Ed25519", H, a, s))) throw new UP();
  let u = Jwr(JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s)));
  if (
    (Kwr(u, ["schema", "version", "minimumVersion", "platform", "size", "sha256", "chunks"]),
    u.schema !== 1 ||
      u.platform !== "windows-x64" ||
      typeof u.version !== "string" ||
      typeof u.minimumVersion !== "string" ||
      Mkt(u.version, u.minimumVersion) < 0 ||
      !Number.isSafeInteger(u.size) ||
      Number(u.size) < 1 ||
      Number(u.size) > 200 * zis ||
      typeof u.sha256 !== "string" ||
      !/^[a-f0-9]{64}$/.test(u.sha256) ||
      !Array.isArray(u.chunks) ||
      u.chunks.length < 1 ||
      u.chunks.length > 32)
  )
    throw new UP();
  let f = u.chunks.map((d, _) => {
    let L = Jwr(d);
    if (
      (Kwr(L, ["url", "size", "sha256"]),
      typeof L.url !== "string" ||
        L.url !== `${O0}/updates/${u.version}/${u.sha256}/part-${String(_).padStart(3, "0")}.bin` ||
        !Number.isSafeInteger(L.size) ||
        Number(L.size) < 1 ||
        Number(L.size) > 8 * zis ||
        typeof L.sha256 !== "string" ||
        !/^[a-f0-9]{64}$/.test(L.sha256))
    )
      throw new UP();
    return { url: L.url, size: Number(L.size), sha256: L.sha256 };
  });
  if (f.reduce((d, _) => d + _.size, 0) !== u.size) throw new UP();
  return {
    schema: 1,
    version: u.version,
    minimumVersion: u.minimumVersion,
    platform: "windows-x64",
    size: Number(u.size),
    sha256: u.sha256,
    chunks: f,
  };
}