
async function _a(e, t, n) {
  if (!/^\d{1,5}\.\d{1,5}\.\d{1,5}$/.test(t)) throw Error("Invalid integrity version");
  let i = jt.default.resolve(e);
  if ((await Pt.promises.lstat(i)).isSymbolicLink()) throw Error("Linked installation");
  let r = jt.default.join(i, "versions", t, Qr),
    s = await Pt.promises.lstat(r);
  if (!s.isFile() || s.isSymbolicLink() || s.size > 131072 || s.nlink !== 1)
    throw Error("Invalid integrity envelope");
  let o = JSON.parse(await Pt.promises.readFile(r, "utf8"));
  if (!o || typeof o !== "object" || Array.isArray(o) || Object.keys(o).sort().join() !== "payload,signature")
    throw Error("Invalid integrity envelope");
  let l = o,
    u = (g) => {
      if (typeof g !== "string" || !/^[a-zA-Z0-9_-]+$/.test(g)) throw Error("Invalid integrity encoding");
      let k = Buffer.from(g, "base64url");
      if (k.toString("base64url") !== g) throw Error("Invalid integrity encoding");
      return k;
    },
    p = u(l.payload),
    w = u(l.signature),
    f = u(n);
  if (
    f.length !== 32 ||
    w.length !== 64 ||
    !Ht.verify(
      null,
      p,
      Ht.createPublicKey({
        format: "der",
        type: "spki",
        key: Buffer.concat([Buffer.from("302a300506032b6570032100", "hex"), f]),
      }),
      w,
    )
  )
    throw Error("Integrity signature rejected");
  let h = Ra(JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(p)), t);
  for (let g of h) {
    for (let c of g.path.split("/").keys())
      if (
        (await Pt.promises.lstat(jt.default.join(i, ...g.path.split("/").slice(0, c + 1)))).isSymbolicLink()
      )
        throw Error("Linked integrity input");
    let k = jt.default.join(i, g.path),
      a = await Pt.promises.lstat(k);
    if (!a.isFile() || a.size !== g.size || a.nlink !== 1) throw Error("Integrity file changed");
    let d = Ht.createHash("sha256");
    for await (let c of Pt.createReadStream(k, { highWaterMark: 65536 })) d.update(c);
    if (d.digest("hex") !== g.sha256) throw Error("Integrity file changed");
  }
  let m = new Set(h.map((g) => g.path.toLowerCase()));
  m.add(`versions/${t}/${Qr}`.toLowerCase());
  let b = 0;
  async function C(g) {
    for (let k of await Pt.promises.readdir(jt.default.join(i, g), { withFileTypes: !0 })) {
      if (++b > 256 || g.split("/").length > 12) throw Error("Unexpected runtime directory");
      let a = jt.default.posix.join(g, k.name);
      if (k.isSymbolicLink()) throw Error("Linked runtime input");
      if (k.isDirectory()) {
        await C(a);
        continue;
      }
      if (!m.has(a.toLowerCase())) throw Error("Unexpected runtime file");
    }
  }
  return (await C(`versions/${t}`), { files: h.length, version: t });
}