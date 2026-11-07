
var Nhe = ne(() => {
  au();
  LV();
  Gt();
  _w();
  Nhe();
  Fba = [
    "--no-optional-locks",
    "-c",
    "core.autocrlf=false",
    "-c",
    "core.fsmonitor=false",
    "-c",
    "core.longpaths=true",
    "-c",
    "core.symlinks=true",
    "-c",
    "core.quotepath=false",
  ];
  Uhe = class Uhe extends _i()("@opencode/Git") {};
  ((Rba = Es(
    Uhe,
    ft(function* () {
      let e = yield* x2,
        t = new TextEncoder(),
        r = (z) => c2(t.encode(z)),
        s = Ge("Git.run")(
          function* (z, Ae) {
            let le = yield* e.run(
              Lh("git", [...Fba, ...z], {
                cwd: Ae.cwd,
                env: Ae.env,
                extendEnv: !0,
                stdin: Ae.stdin ?? "ignore",
                stdout: "pipe",
                stderr: "pipe",
              }),
              { maxOutputBytes: Ae.maxOutputBytes },
            );
            return {
              exitCode: le.exitCode,
              text: () => le.stdout.toString("utf8"),
              stdout: le.stdout,
              stderr: le.stderr,
              truncated: le.stdoutTruncated || le.stderrTruncated,
            };
          },
          $s((z) => Jt(Bba(z))),
        ),
        a = Ge("Git.text")(function* (z, Ae) {
          return (yield* s(z, Ae)).text();
        }),
        H = Ge("Git.lines")(function* (z, Ae) {
          return (yield* a(z, Ae))
            .split(/\r?\n/)
            .map((le) => le.trim())
            .filter(Boolean);
        }),
        u = ni(function* (z) {
          return yield* H(["for-each-ref", "--format=%(refname:short)", "refs/heads"], { cwd: z });
        }),
        f = ni(function* (z, Ae) {
          let le = yield* s(["config", "init.defaultBranch"], { cwd: z }),
            Be = aXe(le);
          if (!Be || !Ae.includes(Be)) return;
          return { name: Be, ref: Be };
        }),
        d = ni(function* (z) {
          let Ae = yield* H(["remote"], { cwd: z });
          if (Ae.includes("origin")) return "origin";
          if (Ae.length === 1) return Ae[0];
          if (Ae.includes("upstream")) return "upstream";
          return Ae[0];
        }),
        _ = Ge("Git.branch")(function* (z) {
          let Ae = yield* s(["symbolic-ref", "--quiet", "--short", "HEAD"], { cwd: z });
          if (Ae.exitCode !== 0) return;
          return aXe(Ae) || void 0;
        }),
        L = Ge("Git.prefix")(function* (z) {
          let Ae = yield* s(["rev-parse", "--show-prefix"], { cwd: z });
          if (Ae.exitCode !== 0) return "";
          return aXe(Ae);
        }),
        I = Ge("Git.defaultBranch")(function* (z) {
          let Ae = yield* d(z);
          if (Ae) {
            let Te = yield* s(["symbolic-ref", `refs/remotes/${Ae}/HEAD`], { cwd: z });
            if (Te.exitCode === 0) {
              let Lt = aXe(Te).replace(/^refs\/remotes\//, ""),
                Ht = Lt.startsWith(`${Ae}/`) ? Lt.slice(`${Ae}/`.length) : "";
              if (Ht) return { name: Ht, ref: Lt };
            }
          }
          let le = yield* u(z),
            Be = yield* f(z, le);
          if (Be) return Be;
          if (le.includes("main")) return { name: "main", ref: "main" };
          if (le.includes("master")) return { name: "master", ref: "master" };
        }),
        D = Ge("Git.hasHead")(function* (z) {
          return (yield* s(["rev-parse", "--verify", "HEAD"], { cwd: z })).exitCode === 0;
        }),
        S = Ge("Git.mergeBase")(function* (z, Ae, le = "HEAD") {
          let Be = yield* s(["merge-base", Ae, le], { cwd: z });
          if (Be.exitCode !== 0) return;
          return aXe(Be) || void 0;
        }),
        T = Ge("Git.show")(function* (z, Ae, le, Be = "") {
          let Te = Be ? `${Be}${le}` : le,
            Lt = yield* s(["show", `${Ae}:${Te}`], { cwd: z });
          if (Lt.exitCode !== 0) return "";
          if (Lt.stdout.includes(0)) return "";
          return Lt.text();
        }),
        C = Ge("Git.status")(function* (z) {
          return nyr(
            yield* a(["status", "--porcelain=v1", "--untracked-files=all", "--no-renames", "-z", "--", "."], {
              cwd: z,
            }),
          ).flatMap((Ae) => {
            let le = Ae.slice(3);
            if (!le) return [];
            let Be = Ae.slice(0, 2);
            return [{ file: le, code: Be, status: lOi(Be) }];
          });
        }),
        O = Ge("Git.diff")(function* (z, Ae) {
          let le = nyr(
            yield* a(["diff", "--no-ext-diff", "--no-renames", "--name-status", "-z", Ae, "--", "."], {
              cwd: z,
            }),
          );
          return le.flatMap((Be, Te) => {
            if (Te % 2 !== 0) return [];
            let Lt = le[Te + 1];
            if (!Be || !Lt) return [];
            return [{ file: Lt, code: Be, status: lOi(Be) }];
          });
        }),
        B = Ge("Git.stats")(function* (z, Ae) {
          return nyr(
            yield* a(["diff", "--no-ext-diff", "--no-renames", "--numstat", "-z", Ae, "--", "."], { cwd: z }),
          ).flatMap((le) => {
            let Be = le.indexOf("\t"),
              Te = le.indexOf("\t", Be + 1);
            if (Be === -1 || Te === -1) return [];
            let Lt = le.slice(Te + 1);
            if (!Lt) return [];
            let Ht = le.slice(0, Be),
              Se = le.slice(Be + 1, Te),
              _e = Ht === "-" ? 0 : Number.parseInt(Ht || "0", 10),
              we = Se === "-" ? 0 : Number.parseInt(Se || "0", 10);
            return [
              { file: Lt, additions: Number.isFinite(_e) ? _e : 0, deletions: Number.isFinite(we) ? we : 0 },
            ];
          });
        }),
        V = Ge("Git.patch")(function* (z, Ae, le, Be) {
          let Te = yield* s(
            [
              "diff",
              "--patch",
              "--no-ext-diff",
              "--no-renames",
              `--unified=${Be?.context ?? 3}`,
              Ae,
              "--",
              le,
            ],
            { cwd: z, maxOutputBytes: Be?.maxOutputBytes },
          );
          return { text: Te.truncated ? "" : Te.text(), truncated: Te.truncated };
        }),
        q = Ge("Git.patchAll")(function* (z, Ae, le) {
          let Be = yield* s(
            [
              "diff",
              "--patch",
              "--no-ext-diff",
              "--no-renames",
              `--unified=${le?.context ?? 3}`,
              Ae,
              "--",
              ".",
            ],
            { cwd: z, maxOutputBytes: le?.maxOutputBytes },
          );
          return { text: Be.text(), truncated: Be.truncated };
        }),
        Z = Ge("Git.patchUntracked")(function* (z, Ae, le) {
          let Be = yield* s(
            [
              "diff",
              "--no-index",
              "--patch",
              "--no-ext-diff",
              "--no-renames",
              `--unified=${le?.context ?? 3}`,
              "--",
              "/dev/null",
              Ae,
            ],
            { cwd: z, maxOutputBytes: le?.maxOutputBytes },
          );
          return { text: Be.truncated ? "" : Be.text(), truncated: Be.truncated };
        }),
        se = Ge("Git.statUntracked")(function* (z, Ae) {
          let le = yield* s(["diff", "--no-index", "--numstat", "--", "/dev/null", Ae], {
            cwd: z,
            maxOutputBytes: 4096,
          });
          if (le.truncated) return;
          let Te = le.text().split("\t");
          if (Te.length < 2) return;
          let Lt = Te[0] === "-" ? 0 : Number.parseInt(Te[0] || "0", 10),
            Ht = Te[1] === "-" ? 0 : Number.parseInt(Te[1] || "0", 10);
          return {
            file: Ae,
            additions: Number.isFinite(Lt) ? Lt : 0,
            deletions: Number.isFinite(Ht) ? Ht : 0,
          };
        }),
        ae = Ge("Git.applyPatch")(function* (z, Ae) {
          return yield* s(["apply", "-"], { cwd: z, stdin: r(Ae) });
        });
      return Uhe.of({
        run: s,
        branch: _,
        prefix: L,
        defaultBranch: I,
        hasHead: D,
        mergeBase: S,
        show: T,
        status: C,
        diff: O,
        stats: B,
        patch: V,
        patchAll: q,
        patchUntracked: Z,
        statUntracked: se,
        applyPatch: ae,
      });
    }),
  )),
    (HXe = Ll({ service: Uhe, layer: Rba, deps: [IY] })));
});
import IP from "path";