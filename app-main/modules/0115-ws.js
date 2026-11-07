
function ws() {
  let e = new Map();
  return {
    async create(t) {
      if (t.url) {
        let s = new URL(t.url);
        if (
          s.protocol !== "http:" ||
          !["127.0.0.1", "localhost", "[::1]"].includes(s.hostname) ||
          !s.port ||
          s.username ||
          s.password ||
          s.hash
        )
          throw Error("Choose a local preview URL.");
        return { url: s.href, kind: "local" };
      }
      if (!/\.html?$/i.test(t.path || "index.html")) return null;
      let n = await Fn(t.directory, t.path || "index.html", !0),
        i = dn.randomUUID(),
        r = dn.randomUUID();
      if (e.size >= 16) e.delete(e.keys().next().value);
      return (
        e.set(i, { root: n.root, entry: n.relative, nonce: r }),
        {
          url: `jac-preview://${i}/${n.relative.split("/").map(encodeURIComponent).join("/")}`,
          kind: "html",
          nonce: r,
        }
      );
    },
    async file(t) {
      let n = new URL(t),
        i = e.get(n.hostname);
      if (!i) throw Error("Preview is unavailable.");
      let r = decodeURIComponent(n.pathname.slice(1)),
        s = await Fn(i.root, r),
        o = await oe.open(s.target, Bn.constants.O_RDONLY | (Bn.constants.O_NOFOLLOW ?? 0)),
        l = await (async () => {
          let h = await o.stat();
          if (
            !h.isFile() ||
            h.nlink !== 1 ||
            h.size > ln.fileBytes ||
            h.dev !== s.info.dev ||
            h.ino !== s.info.ino
          )
            throw Error("Preview is unavailable.");
          let m = await o.readFile();
          if (m.length > ln.fileBytes) throw Error("Preview is unavailable.");
          return m;
        })().finally(() => o.close());
      if (!/\.html?$/i.test(s.target)) return { filename: s.target, bytes: l };
      let u = da(i.nonce, i.entry),
        p = l.toString("utf8"),
        w = /<head(?:\s[^>]*)?>/i.exec(p) ?? /<!doctype[^>]*>/i.exec(p),
        f = w ? w.index + w[0].length : 0;
      return { filename: s.target, bytes: Buffer.from(p.slice(0, f) + u + p.slice(f), "utf8") };
    },
  };
}