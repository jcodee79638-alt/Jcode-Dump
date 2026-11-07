
function lo(e) {
  let t = Promise.resolve(),
    n = { base: yt.default.resolve(e), filename: yt.default.join(e, "project-context.json") },
    i = async () => {
      let l = n.base,
        u = yt.default.parse(l).root;
      (await yt.default
        .relative(u, l)
        .split(yt.default.sep)
        .filter(Boolean)
        .reduce(async (w, f) => {
          let h = await w,
            m = yt.default.join(h, f);
          await we.mkdir(m).catch((C) => {
            if (C.code !== "EEXIST") throw C;
          });
          let b = await we.lstat(m);
          if (b.isSymbolicLink() || !b.isDirectory())
            throw Error("Choose a local context folder without links.");
          return m;
        }, Promise.resolve(u)),
        (n.base = await we.realpath(l)),
        (n.filename = yt.default.join(n.base, "project-context.json")));
      let p = await we.lstat(n.filename).catch((w) => {
        if (w.code !== "ENOENT") throw w;
      });
      if (p && (!p.isFile() || p.isSymbolicLink() || p.nlink > 1))
        throw Error("Jac Code project context is unavailable. Your project files are kept.");
    },
    r = async () => {
      await i();
      let l = await we.stat(n.filename).catch(() => {
        return;
      });
      if (!l) return {};
      if (l.size > 2000000)
        throw Error("Jac Code project context is unavailable. Your project files are kept.");
      return JSON.parse(await we.readFile(n.filename, "utf8"));
    },
    s = (l) => nr.createHash("sha256").update(l.toLowerCase()).digest("hex"),
    o = async (l, u = []) => {
      let p = (await De(l)).root,
        w = (await r())[s(p)],
        f = (await we.readdir(p, { withFileTypes: !0 }))
          .filter((b) => !b.isSymbolicLink() && !Ce(b.name))
          .slice(0, 80),
        h = await De(p, "package.json")
          .then(async (b) => {
            if ((await we.stat(b.target)).size > 64000) return "";
            let C = JSON.parse(await we.readFile(b.target, "utf8"));
            return `Package: ${typeof C.name === "string" ? C.name.slice(0, 200) : "unnamed"}. Available scripts: ${Object.keys(
              C.scripts ?? {},
            )
              .filter((g) => /^[\w:-]{1,80}$/.test(g))
              .slice(0, 25)
              .join(", ")}`;
          })
          .catch(() => ""),
        m = u
          .filter((b) => b.directory.toLowerCase() === p.toLowerCase())
          .slice(0, 5)
          .map(
            (b) =>
              `${b.state}: ${b.files
                .slice(0, 10)
                .map((C) => C.path)
                .join(", ")}`,
          ).join(`
`);
      return {
        notes: typeof w?.notes === "string" ? w.notes.slice(0, 8000) : "",
        summary: [
          `Top-level structure: ${f.map((b) => b.name + (b.isDirectory() ? "/" : "")).join(", ")}`,
          h,
          m &&
            `Recent observed changes:
${m}`,
        ]
          .filter(Boolean)
          .join(
            `
`,
          )
          .slice(0, 6000),
        updatedAt: w?.updatedAt ?? 0,
      };
    };
  return {
    get: o,
    save(l, u) {
      let p = t.then(async () => {
        if (typeof u !== "string" || u.length > 8000 || u.includes("\x00"))
          throw Error("Choose project notes shorter than 8,000 characters.");
        let w = (await De(l)).root,
          f = await r();
        if (!f[s(w)] && Object.keys(f).length >= 200)
          throw Error("Jac Code has reached its saved project context limit.");
        ((f[s(w)] = { notes: u, updatedAt: Date.now() }), await i());
        let h = n.filename + "." + nr.randomUUID() + ".tmp",
          m = await we.open(h, "wx", 384);
        try {
          (await m.writeFile(JSON.stringify(f)), await m.sync());
        } finally {
          await m.close();
        }
        return (await we.rename(h, n.filename), o(w));
      });
      return (
        (t = p.then(
          () => {
            return;
          },
          () => {
            return;
          },
        )),
        p
      );
    },
  };
}
P.app.setName("Jac Code");
if (
  P.app.isPackaged &&
  process.argv.some((e) =>
    /^--(?:remote-debugging-(?:port|pipe)|inspect(?:-brk|-port)?|disable-web-security|no-sandbox|disable-gpu-sandbox)(?:=|$)/.test(
      e,
    ),
  )
)
  (P.dialog.showErrorBox(
    "Unsupported launch option",
    "Jac Code cannot start with debugging or sandbox-disabling options. Open it normally from your desktop or Start menu.",
  ),
    P.app.exit(1));
P.app.setAppUserModelId(Br);
P.protocol.registerSchemesAsPrivileged([
  { scheme: "jac-preview", privileges: { standard: !0, secure: !0, supportFetchAPI: !1, corsEnabled: !1 } },
]);