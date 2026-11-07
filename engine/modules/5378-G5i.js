
var G5i = ne(async () => {
  Gt();
  Ql();
  jA();
  Vce();
  W5i();
  await Jn([P2(), Vy()]);
  ((EXa = nt({
    pattern: re.annotate({ description: "The glob pattern to match files against" }),
    path: be(re).annotate({
      description:
        'The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.',
    }),
  })),
    (q5i = t_(
      "glob",
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* SV;
        return {
          description: V5i,
          parameters: EXa,
          execute: (r, s) =>
            ft(function* () {
              let a = yield* Jc;
              yield* s.ask({
                permission: "glob",
                patterns: [r.pattern],
                always: ["*"],
                metadata: { pattern: r.pattern, path: r.path },
              });
              let H = r.path ?? a.directory;
              if (
                ((H = xCt.isAbsolute(H) ? H : xCt.resolve(a.directory, H)),
                (yield* e.stat(H).pipe($s(() => Jt(void 0))))?.type === "File")
              )
                throw Error(`glob path must be a directory: ${H}`);
              yield* tk(s, H, { bypass: !1, kind: "directory" });
              let f = 100,
                d = yield* t.glob({ cwd: H, pattern: r.pattern, limit: f }),
                _ = d.length === f,
                L = [];
              if (d.length === 0) L.push("No files found");
              if (d.length > 0) {
                if ((L.push(...d.map((I) => xCt.resolve(H, I.path))), _))
                  (L.push(""),
                    L.push(
                      `(Results are truncated: showing first ${f} results. Consider using a more specific path or pattern.)`,
                    ));
              }
              return {
                title: xCt.relative(a.worktree, H),
                metadata: { count: d.length, truncated: _ },
                output: L.join(`
`),
              };
            }).pipe(on),
        };
      }),
    )));
});