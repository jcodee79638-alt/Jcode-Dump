
var DYn,
  joe,
  IOo,
  yYn = (e) =>
    bl({
      try: async () => {
        let t = new DYn.default({
          npmPath: IOo,
          cwd: e,
          env: { ...process.env },
          argv: [process.execPath, process.execPath],
          execPath: process.execPath,
          platform: "win32",
          definitions: joe.definitions,
          flatten: joe.flatten,
          nerfDarts: joe.nerfDarts,
          shorthands: joe.shorthands,
          warn: !1,
        });
        return (await t.load(), t.flat);
      },
      catch: (t) => t,
    }).pipe(PU(() => ({}))),
  DOo = (e) =>
    yYn(e).pipe(
      Vn((t) => {
        let r = typeof t.registry === "string" ? t.registry : "https://registry.npmjs.org";
        return r.endsWith("/") ? r.slice(0, -1) : r;
      }),
    );