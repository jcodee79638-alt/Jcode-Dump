
var Zrs = ne(async () => {
  Ql();
  jA();
  BA();
  Gt();
  $H();
  await Jn([eN(), jZ(), P2(), qd(), Jy()]);
  ((Qrs = Tl(zrs(), 1)),
    (Yrs = Kd(eh, "file", (e) =>
      ft(function* () {
        let t = yield* SV,
          r = yield* Xj,
          s = ni(function* (L) {
            return yield* L.pipe(vj(r.get(Rv.make({ directory: bo.make((yield* Jc).directory) }))));
          }),
          a = Ge("FileHttpApi.findText")(function* (L) {
            return (yield* t
              .grep({ cwd: (yield* Jc).directory, pattern: L.query.pattern, limit: 10 })
              .pipe(on)).map((I) => ({
              path: { text: I.entry.path },
              lines: { text: I.text },
              line_number: I.line,
              absolute_offset: I.offset,
              submatches: I.submatches.map((D) => ({ match: { text: D.text }, start: D.start, end: D.end })),
            }));
          }),
          H = Ge("FileHttpApi.findFile")(function* (L) {
            let I = (yield* Jc).directory,
              D = L.query.limit ?? 10,
              S = L.query.type ?? (L.query.dirs === "false" ? "file" : void 0),
              T = performance.now(),
              C = yield* s(w2.use((O) => O.find({ query: L.query.query, limit: D, type: S })));
            return (
              yield* fH("find file", {
                query: L.query.query,
                type: S,
                directory: I,
                limit: D,
                results: C.length,
                duration: Math.round(performance.now() - T),
              }),
              C.map((O) => O.path)
            );
          }),
          u = Ge("FileHttpApi.findSymbol")(function* () {
            return [];
          }),
          f = Ge("FileHttpApi.list")(function* (L) {
            let I = (yield* Jc).directory;
            return yield* s(
              ft(function* () {
                let D = yield* w2,
                  S = yield* ui.Service,
                  T = yield* bm,
                  C = Qrs.default(),
                  O = yield* S.readFileString(x$e.join(T.project.directory, ".gitignore")).pipe(
                    $s(() => Jt("")),
                  );
                if (O) C.add(O);
                let B = yield* S.readFileString(x$e.join(T.project.directory, ".ignore")).pipe(
                  $s(() => Jt("")),
                );
                if (B) C.add(B);
                return (yield* D.list({ path: du.make(L.query.path) })).map((V) => ({
                  name: x$e.basename(V.path),
                  path: V.path,
                  absolute: x$e.resolve(T.directory, V.path),
                  type: V.type,
                  ignored: C.ignores(
                    x$e.relative(T.project.directory, x$e.resolve(T.directory, V.path)) +
                      (V.type === "directory" ? "/" : ""),
                  ),
                }));
              }),
            );
          }),
          d = Ge("FileHttpApi.content")(function* (L) {
            let I = (yield* Jc).directory,
              D = x$e.resolve(I, L.query.path);
            if (!ui.contains(I, D)) return yield* No(Error("Path escapes the location"));
            if (!(yield* ui.Service.use((S) => S.existsSafe(D)))) return { type: "text", content: "" };
            return yield* s(w2.use((S) => S.read({ path: du.make(L.query.path) }))).pipe(
              Hi((S) =>
                ft(function* () {
                  let T = S.content.includes(0)
                    ? eH()
                    : yield* jn(() => new TextDecoder("utf-8", { fatal: !0 }).decode(S.content)).pipe(hQt);
                  return { item: S, text: T };
                }),
              ),
              Vn(({ item: S, text: T }) =>
                Nu(T)
                  ? { type: "text", content: T.value.trim() }
                  : {
                      type: "binary",
                      content: Buffer.from(S.content).toString("base64"),
                      encoding: "base64",
                      mimeType: S.mime,
                    },
              ),
            );
          }),
          _ = Ge("FileHttpApi.status")(function* () {
            return [];
          });
        return e
          .handle("findText", a)
          .handle("findFile", H)
          .handle("findSymbol", u)
          .handle("list", f)
          .handle("content", d)
          .handle("status", _);
      }),
    ).pipe(ou(bZ))));
});