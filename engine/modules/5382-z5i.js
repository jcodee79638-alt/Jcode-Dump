
var z5i = ne(async () => {
  Gt();
  Ql();
  jA();
  Vce();
  X5i();
  await Jn([P2(), Vy()]);
  ((DXa = nt({
    pattern: re.annotate({ description: "The regex pattern to search for in file contents" }),
    path: be(re).annotate({
      description: "The directory to search in. Defaults to the current working directory.",
    }),
    include: be(re).annotate({
      description: 'File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")',
    }),
  })),
    (K5i = t_(
      "grep",
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* SV;
        return {
          description: J5i,
          parameters: DXa,
          execute: (r, s) =>
            ft(function* () {
              let a = { title: r.pattern, metadata: { matches: 0, truncated: !1 }, output: "No files found" };
              if (!r.pattern) throw Error("pattern is required");
              yield* s.ask({
                permission: "grep",
                patterns: [r.pattern],
                always: ["*"],
                metadata: { pattern: r.pattern, path: r.path, include: r.include },
              });
              let H = yield* Jc,
                u = oQe.isAbsolute(r.path ?? H.directory)
                  ? (r.path ?? H.directory)
                  : oQe.join(H.directory, r.path ?? "."),
                f = yield* e.stat(u).pipe($s(() => Jt(void 0)));
              yield* tk(s, u, { bypass: !1, kind: f?.type === "Directory" ? "directory" : "file" });
              let d = ui.resolve(u),
                L = (yield* e.stat(d).pipe($s(() => Jt(void 0))))?.type === "Directory" ? d : oQe.dirname(d),
                I = yield* t.grep({ cwd: L, pattern: r.pattern, include: r.include, limit: 100 });
              if (I.length === 0) return a;
              let D = I.map((Z) => ({
                  path: oQe.resolve(f?.type === "Directory" ? u : oQe.dirname(u), Z.entry.path),
                  line: Z.line,
                  text: Z.text,
                })),
                S = 100,
                T = D.length === S,
                C = D;
              if (C.length === 0) return a;
              let O = D.length,
                B = T || I.length === S,
                V = [`Found ${O} matches${B ? " (more matches available)" : ""}`],
                q = "";
              for (let Z of C) {
                if (q !== Z.path) {
                  if (q !== "") V.push("");
                  ((q = Z.path), V.push(`${Z.path}:`));
                }
                V.push(`  Line ${Z.line}: ${Z.text}`);
              }
              if (T)
                (V.push(""), V.push("(Results truncated. Consider using a more specific path or pattern.)"));
              return {
                title: r.pattern,
                metadata: { matches: O, truncated: T },
                output: V.join(`
`),
              };
            }).pipe(on),
        };
      }),
    )));
});