
var P2 = ne(async () => {
  Gt();
  _w();
  Jse();
  OH();
  LV();
  BA();
  await Jn([P2(), Uxn()]);
  Nro = nt({
    type: ri("match"),
    data: nt({
      path: nt({ text: re }),
      lines: nt({ text: re }),
      line_number: qc,
      absolute_offset: Ko,
      submatches: On(nt({ match: nt({ text: re }), start: Ko, end: Ko })),
    }),
  });
  Gsr = class Gsr extends ki()("Ripgrep.Error", { message: re, cause: be(yd()) }) {};
  qsr = class qsr extends ki()("Ripgrep.InvalidPatternError", { pattern: re, message: re }) {};
  SV = class SV extends _i()("@opencode/v2/Ripgrep") {};
  ((Bro = Es(
    SV,
    ft(function* () {
      let e = yield* x2,
        t = yield* Kht.Service,
        r = (s) => {
          let a = FL(
            ft(function* () {
              let u = yield* e.spawn(
                  Lh(yield* t.filepath, s.args, { cwd: s.cwd, extendEnv: !0, stdin: "ignore" }),
                ),
                f = yield* GMe(u.stderr, Oro).pipe(
                  Vn((S) => S.buffer.toString("utf8")),
                  EI,
                ),
                d = 0,
                _ = yield* C6(u.stdout).pipe(
                  d1e,
                  aG((S) => S.length > 0),
                  f1e(s.parse),
                  aG((S) => S !== void 0),
                  VYt((S) => {
                    if (!s.onItem || d++ >= s.limit) return ti;
                    return s.onItem(S);
                  }),
                  LFs(s.limit + 1),
                  GYt,
                  Vn((S) => [...S]),
                ),
                L = _.length > s.limit;
              if (L) return { items: _.slice(0, s.limit), truncated: L, partial: !1 };
              let I = yield* u.exitCode,
                D = yield* kBe(f);
              if (s.pattern && I === 2 && Fro(D))
                return yield* new qsr({ pattern: s.pattern, message: D.trim() });
              if (I !== 0 && I !== 1 && I !== 2)
                return yield* tme(D.trim() || `ripgrep failed with code ${I}`);
              return { items: I === 1 ? [] : _, truncated: !1, partial: I === 2 };
            }),
          );
          return (s.signal ? a.pipe(Yq(G_t(s.signal))) : a).pipe(
            Zo((u) => (u instanceof Gsr || u instanceof qsr ? u : tme("ripgrep execution failed", u))),
          );
        };
      return SV.of({
        glob: (s) =>
          r({
            cwd: s.cwd,
            limit: s.limit,
            signal: s.signal,
            args: [
              "--no-config",
              "--files",
              ...(s.hidden ? ["--hidden"] : []),
              ...(s.follow ? ["--follow"] : []),
              `--glob=${s.pattern}`,
              "--glob=!**/.git/**",
              ".",
            ],
            parse: (a) =>
              Jt(
                a
                  .replace(/^(?:\.[\\/])+/u, "")
                  .replace(/^[\\/]+/u, "")
                  .replaceAll("\\", "/"),
              ),
          }).pipe(
            Vn((a) => a.items.map((H) => xD.make({ path: du.make(H), type: "file" }))),
            EA("Ripgrep.InvalidPatternError", (a) => bn(tme(a.message, a))),
          ),
        find: (s) =>
          r({
            cwd: s.cwd,
            limit: s.limit,
            signal: s.signal,
            args: [
              "--no-config",
              "--files",
              ...(s.hidden ? ["--hidden"] : []),
              ...(s.follow ? ["--follow"] : []),
              ...(s.pattern === "*" ? [] : [`--glob=${s.pattern}`]),
              "--glob=!**/.git/**",
              ".",
            ],
            parse: (a) => {
              let H = a
                .replace(/^(?:\.[\\/])+/u, "")
                .replace(/^[\\/]+/u, "")
                .replaceAll("\\", "/");
              return Jt(xD.make({ path: du.make(H), type: "file" }));
            },
            onItem: s.onEntry,
          }).pipe(
            Vn((a) => a.items),
            EA("Ripgrep.InvalidPatternError", (a) => bn(tme(a.message, a))),
          ),
        grep: (s) =>
          r({
            ...s,
            args: [
              "--no-config",
              "--json",
              "--hidden",
              "--no-messages",
              ...(s.include ? [`--glob=${s.include}`] : []),
              "--glob=!**/.git/**",
              "--",
              s.pattern,
              s.file ?? ".",
            ],
            parse: (a) =>
              (Buffer.byteLength(a, "utf8") > Nxn
                ? bn(tme(`Ripgrep JSON record exceeded ${Nxn} bytes`))
                : ZA({ try: () => JSON.parse(a), catch: (H) => tme("Invalid ripgrep JSON output", H) })
              ).pipe(
                Hi((H) => {
                  if (!H || typeof H !== "object" || !("type" in H) || H.type !== "match") return Jt(void 0);
                  return G_(Nro)(H).pipe(
                    Vn((u) => ({
                      ...u.data,
                      path: { text: u.data.path.text.replace(/^\.[\\/]/, "") },
                      submatches: u.data.submatches.slice(0, Uro),
                    })),
                    Zo((u) => tme("Invalid ripgrep match output", u)),
                  );
                }),
              ),
          }).pipe(
            Vn((a) =>
              a.items.map((H) => {
                let u = H.path.text
                  .replace(/^(?:\.[\\/])+/u, "")
                  .replace(/^[\\/]+/u, "")
                  .replaceAll("\\", "/");
                return Xse.make({
                  entry: xD.make({ path: du.make(u), type: "file" }),
                  line: H.line_number,
                  offset: H.absolute_offset,
                  text:
                    H.lines.text.length > 2000
                      ? H.lines.text.slice(0, 2000).replace(/[\uD800-\uDBFF]$/, "") + "..."
                      : H.lines.text,
                  submatches: H.submatches.map((f) => ({ text: f.match.text, start: f.start, end: f.end })),
                });
              }),
            ),
          ),
      });
    }),
  )),
    (pxe = iA({ service: SV, layer: Bro, deps: [Kht.node, IY] })));
});
import C2 from "path";