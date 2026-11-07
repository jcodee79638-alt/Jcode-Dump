
var eN = ne(async () => {
  OH();
  Gt();
  jA();
  BA();
  Jse();
  Jse();
  await Jn([eN(), qd(), zht()]);
  ((B5H = nt({ path: du })),
    (qro = nt({
      uri: re,
      name: re.pipe(be),
      content: re,
      encoding: Jo(["utf8", "base64"]),
      mime: re,
    }).annotate({ identifier: "FileSystem.Content" })),
    (R5H = nt({ path: du.pipe(be) })));
  Jsr = class Jsr extends (
    Pa("FileSystem.GlobInput")({ pattern: re, path: du.pipe(be), limit: qc.pipe(be) })
  ) {};
  Yht = class Yht extends (
    Pa("FileSystem.GrepInput")({ pattern: re, path: du.pipe(be), include: re.pipe(be), limit: qc.pipe(be) })
  ) {};
  Zht = $xn;
  w2 = class w2 extends _i()("@opencode/v2/FileSystem") {};
  ((Gro = Es(
    w2,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* bm,
        r = yield* Kse,
        s = yield* e.realPath(t.directory).pipe(on),
        a = ni(function* (H) {
          let u = Qht.resolve(t.directory, H ?? ".");
          if (!ui.contains(t.directory, u)) return yield* No(Error("Path escapes the location"));
          let f = yield* e.realPath(u).pipe(on);
          if (!ui.contains(s, f)) return yield* No(Error("Path escapes the location"));
          return { absolute: u, real: f, directory: t.directory, root: s };
        });
      return w2.of({
        find: r.find,
        glob: r.glob,
        grep: r.grep,
        read: Ge("FileSystem.read")(function* (H) {
          let u = yield* a(H.path);
          if ((yield* e.stat(u.real).pipe(on)).type !== "File") return yield* No(Error("Path is not a file"));
          return { content: yield* e.readFile(u.real).pipe(on), mime: ui.mimeType(u.real) };
        }),
        list: Ge("FileSystem.list")(function* (H = {}) {
          let u = yield* a(H.path);
          if ((yield* e.stat(u.real).pipe(on)).type !== "Directory")
            return yield* No(Error("Path is not a directory"));
          return yield* e.readDirectoryEntries(u.real).pipe(
            on,
            Vn((d) =>
              d
                .flatMap((_) => {
                  if (_.type !== "file" && _.type !== "directory") return [];
                  let L = Qht.join(u.absolute, _.name),
                    I = Qht.relative(u.directory, L);
                  return [
                    xD.make({ path: du.make(I + (_.type === "directory" ? Qht.sep : "")), type: _.type }),
                  ];
                })
                .sort((_, L) =>
                  _.type === L.type ? _.path.localeCompare(L.path) : _.type === "directory" ? -1 : 1,
                ),
            ),
          );
        }),
      });
    }),
  )),
    (Rxn = Ua({ service: w2, layer: Gro, deps: [ui.node, KS, Bxn] })));
});