
var zht = ne(async () => {
  OH();
  Gt();
  Jse();
  jA();
  BA();
  uw();
  await Jn([zht(), Rsr(), qd(), P2()]);
  Fxn = Tl(hxn(), 1);
  Kse = class Kse extends _i()("@opencode/v2/FileSystem/Search") {};
  ((Rro = Es(
    Kse,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* bm,
        r = yield* SV,
        s = yield* $f,
        a = { files: [], directories: [] },
        H = new Set();
      return (
        yield* r
          .find({
            cwd: t.directory,
            pattern: "*",
            limit: t.vcs ? Number.MAX_SAFE_INTEGER : 1e5,
            onEntry: (u) =>
              jn(() => {
                a.files.push(u.path);
                let f = u.path.split("/");
                (f.slice(0, -1).forEach((d, _) => H.add(f.slice(0, _ + 1).join("/") + C2.sep)),
                  (a.directories = Array.from(H)));
              }),
          })
          .pipe(on, Qf, zm(s)),
        Kse.of({
          glob: (u) =>
            ft(function* () {
              let f = C2.resolve(t.directory, u.path ?? "."),
                _ = (yield* e.stat(f).pipe(on)).type === "File" ? C2.dirname(f) : f;
              return yield* r
                .glob({ cwd: _, pattern: u.pattern, limit: u.limit ?? Number.MAX_SAFE_INTEGER })
                .pipe(
                  Vn((L) =>
                    L.map((I) =>
                      xD.make({ ...I, path: du.make(C2.relative(t.directory, C2.resolve(_, I.path))) }),
                    ),
                  ),
                  on,
                );
            }),
          grep: (u) =>
            ft(function* () {
              let f = C2.resolve(t.directory, u.path ?? "."),
                d = yield* e.stat(f).pipe(on),
                _ = d.type === "File" ? C2.dirname(f) : f;
              return yield* r
                .grep({
                  cwd: _,
                  pattern: u.pattern,
                  file: d.type === "File" ? C2.basename(f) : void 0,
                  include: u.include,
                  limit: u.limit ?? Number.MAX_SAFE_INTEGER,
                })
                .pipe(
                  Vn((L) =>
                    L.map((I) =>
                      Xse.make({
                        ...I,
                        entry: xD.make({
                          ...I.entry,
                          path: du.make(C2.relative(t.directory, C2.resolve(_, I.entry.path))),
                        }),
                      }),
                    ),
                  ),
                  on,
                );
            }),
          find: (u) =>
            ft(function* () {
              let f =
                u.type === "file"
                  ? a.files
                  : u.type === "directory"
                    ? a.directories
                    : [...a.files, ...a.directories];
              return Fxn.default.go(u.query, f, { limit: u.limit ?? 50 }).map((d) => {
                let _ = d.target,
                  L = _.endsWith(C2.sep) ? "directory" : "file";
                return xD.make({ path: du.make(_), type: L });
              });
            }),
        })
      );
    }),
  )),
    (Wro = Es(
      Kse,
      ft(function* () {
        let e = yield* bm,
          t = yield* ZA({
            try: () =>
              $ro({ basePath: e.directory, aiMode: !0, disableMmapCache: !0, disableContentIndexing: !0 }),
            catch: (r) => r,
          }).pipe($s((r) => lp("failed to initialize fff", { error: r }).pipe(eu(void 0))));
        if (!t?.ok) {
          if (t) yield* lp("failed to initialize fff", { error: t.error });
          return Kse.of({ find: () => Jt([]), glob: () => Jt([]), grep: () => Jt([]) });
        }
        return (
          yield* sL(() => jn(() => t.value.destroy()).pipe(FA)),
          Kse.of({
            glob: (r) =>
              jn(() => {
                let s = r.path?.replaceAll("\\", "/").replace(/\/$/, ""),
                  a = t.value.glob(s ? `${s}/${r.pattern}` : r.pattern, { pageIndex: 0, pageSize: r.limit });
                if (!a.ok) throw a.error;
                return a.value.items.map((H) =>
                  xD.make({ path: du.make(H.relativePath.replaceAll("\\", "/")), type: "file" }),
                );
              }),
            grep: (r) =>
              jn(() => {
                let s = r.path?.replaceAll("\\", "/").replace(/\/$/, ""),
                  a = t.value.grep(
                    [s ? `${s}/**` : void 0, r.include, r.pattern].filter((H) => H !== void 0).join(" "),
                    { mode: "regex", pageSize: r.limit, timeBudgetMs: 1500 },
                  );
                if (!a.ok) throw a.error;
                return a.value.items.map((H) => {
                  let u = Buffer.from(H.lineContent);
                  return Xse.make({
                    entry: xD.make({ path: du.make(H.relativePath.replaceAll("\\", "/")), type: "file" }),
                    line: H.lineNumber,
                    offset: H.byteOffset,
                    text: H.lineContent.length > 2000 ? H.lineContent.slice(0, 2000) + "..." : H.lineContent,
                    submatches: H.matchRanges.map(([f, d]) => ({
                      text: u.subarray(f, d).toString("utf8"),
                      start: f,
                      end: d,
                    })),
                  });
                });
              }),
            find: (r) =>
              jn(() => {
                let s = { pageIndex: 0, pageSize: r.limit ?? 50 };
                return (() => {
                  if (r.type === "file") {
                    let u = t.value.fileSearch(r.query.trim(), s);
                    if (!u.ok) throw u.error;
                    return u.value.items.map((f, d) => ({
                      path: f.relativePath,
                      type: "file",
                      score: u.value.scores[d]?.total ?? 0,
                    }));
                  }
                  if (r.type === "directory") {
                    let u = t.value.directorySearch(r.query.trim(), s);
                    if (!u.ok) throw u.error;
                    return u.value.items.map((f, d) => ({
                      path: f.relativePath,
                      type: "directory",
                      score: u.value.scores[d]?.total ?? 0,
                    }));
                  }
                  let H = t.value.mixedSearch(r.query.trim(), s);
                  if (!H.ok) throw H.error;
                  return H.value.items.map((u, f) => ({
                    path: u.item.relativePath,
                    type: u.type,
                    score: H.value.scores[f]?.total ?? 0,
                  }));
                })()
                  .sort((H, u) => u.score - H.score || H.path.length - u.path.length)
                  .map((H) => {
                    let u = H.path.replaceAll("\\", "/").replace(/\/$/, "");
                    return xD.make({
                      path: du.make(u + (H.type === "directory" ? C2.sep : "")),
                      type: H.type,
                    });
                  });
              }),
          })
        );
      }),
    )),
    (Vro = $ie(jn(() => (Ad.OPENCODE_DISABLE_FFF || !Lro() ? Rro : Wro)))),
    (Bxn = Ua({ service: Kse, layer: Vro, deps: [ui.node, KS, pxe] })));
});
import Qht from "path";