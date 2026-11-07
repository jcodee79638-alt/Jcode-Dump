
var UQe = ne(async () => {
  au();
  vy();
  Gt();
  YM();
  Cf();
  kGe();
  cee();
  _w();
  LV();
  oEt();
  Twt();
  await Jn([yGe(), rAr(), UQe()]);
  ((IR = Tl(dCr(), 1)),
    (KtH = vwe),
    (NbA = nt({ version: re, latest: re }).annotate({ identifier: "InstallationInfo" })));
  FbA = ztH();
  N7 = class N7 extends ki()("UpgradeFailedError", { stderr: re }) {
    get message() {
      return this.stderr;
    }
  };
  ((YtH = uV === "local" ? "latest" : uV),
    (ZtH = nt({ version: re })),
    (erH = nt({ formulae: On(nt({ versions: nt({ stable: re }) })) })),
    (trH = nt({ d: nt({ results: On(nt({ Version: re })) }) })),
    (rrH = {
      npm: {
        remove: ["npm", "uninstall", "-g", "opencode-ai"],
        install: ["npm", "install", "-g", "@opencode/cli"],
        restore: ["npm", "install", "-g", `opencode-ai@${VL}`],
      },
      pnpm: {
        remove: ["pnpm", "remove", "-g", "opencode-ai"],
        install: ["pnpm", "add", "-g", "--allow-build=@opencode/cli", "@opencode/cli"],
        restore: ["pnpm", "add", "-g", `opencode-ai@${VL}`],
      },
      bun: {
        remove: ["bun", "remove", "-g", "opencode-ai"],
        install: ["bun", "install", "-g", "--trust", "@opencode/cli"],
        restore: ["bun", "install", "-g", `opencode-ai@${VL}`],
      },
      yarn: {
        remove: ["yarn", "global", "remove", "opencode-ai"],
        install: ["yarn", "global", "add", "@opencode/cli"],
        restore: ["yarn", "global", "add", `opencode-ai@${VL}`],
      },
    }));
  d$e = class d$e extends _i()("@opencode/Installation") {};
  ((BbA = vm(d$e)),
    (nrH = Es(
      d$e,
      ft(function* () {
        let e = yield* gy,
          t = RU(AHe(e)),
          r = yield* x2,
          s = ni(
            function* (T, C) {
              return (yield* r.run(
                Lh(T[0], T.slice(1), { cwd: C?.cwd, env: C?.env, extendEnv: !0 }),
              )).stdout.toString("utf8");
            },
            $s(() => Jt("")),
          ),
          a = ni(
            function* (T, C) {
              let O = yield* r.run(Lh(T[0], T.slice(1), { cwd: C?.cwd, env: C?.env, extendEnv: !0 }));
              return {
                code: O.exitCode,
                stdout: O.stdout.toString("utf8"),
                stderr: O.stderr.toString("utf8"),
              };
            },
            $s((T) => Jt({ code: 1, stdout: "", stderr: fx(T) })),
          ),
          H = ni(function* () {
            if ((yield* s(["brew", "list", "--formula", "anomalyco/tap/opencode"])).includes("opencode"))
              return "anomalyco/tap/opencode";
            if ((yield* s(["brew", "list", "--formula", "opencode"])).includes("opencode")) return "opencode";
            return "opencode";
          }),
          u = (T, C) => {
            if (T === "choco") return "not running from an elevated command shell";
            if (C) return `Upgrade failed for ${T} (exit code ${C.code}).`;
            return `Upgrade failed for ${T}.`;
          },
          f = ni(function* () {
            if (yield* s(["bash", "--version"])) return "bash";
            return "sh";
          }),
          d = ni(
            function* (T) {
              let O = yield* (yield* t.execute(KM("https://opencode.ai/install"))).text,
                B = new TextEncoder().encode(O),
                V = yield* f(),
                q = yield* r.run(Lh(V, [], { stdin: c2(B), env: { VERSION: T }, extendEnv: !0 }));
              return {
                code: q.exitCode,
                stdout: q.stdout.toString("utf8"),
                stderr: q.stderr.toString("utf8"),
              };
            },
            Zo(() => new N7({ stderr: u("curl") })),
          ),
          _ = ni(function* (T) {
            if (T === "curl") {
              let q = yield* (yield* t
                .execute(KM("https://opencode.ai/v2/install"))
                .pipe(Zo(() => new N7({ stderr: u("curl") })))).text.pipe(
                Zo(() => new N7({ stderr: u("curl") })),
              );
              return yield* a([yield* f(), "-c", q]);
            }
            if (T === "brew") {
              let V = yield* H(),
                q = { HOMEBREW_NO_AUTO_UPDATE: "1" },
                Z = yield* a(["brew", "uninstall", V], { env: q });
              if (Z.code !== 0) return Z;
              let se = yield* a(["brew", "install", "anomalyco/tap/opencode-v2"], { env: q });
              if (se.code !== 0) yield* a(["brew", "install", V], { env: q });
              return se;
            }
            let C = rrH[T];
            if (!C)
              return yield* new N7({
                stderr: `OpenCode 2 can't be installed automatically with ${T}. See ${gZi}`,
              });
            let O = yield* a(C.remove);
            if (O.code !== 0) return O;
            let B = yield* a(C.install);
            if (B.code !== 0) yield* a(C.restore);
            return B;
          }),
          L = ni(function* () {
            let T = yield* t.execute(KM(`${yield* DOo(process.cwd())}/opencode-ai/${YtH}`).pipe(_G));
            return (yield* l2(ZtH)(T)).version;
          }),
          I = ni(function* (T) {
            let C = yield* t.execute(
              KM(
                `https://community.chocolatey.org/api/v2/Packages?$filter=Id%20eq%20%27opencode%27%20and%20Version%20eq%20%27${encodeURIComponent(T)}%27&$select=Version`,
              ).pipe(YW({ Accept: "application/json;odata=verbose" })),
            );
            return (yield* l2(trH)(C)).d.results.length > 0;
          }),
          D = ni(
            function* (T) {
              let C = yield* s(["brew", "info", "--json=v2", T]);
              return (yield* G_(Cj(erH))(C)).formulae[0].versions.stable;
            },
            PU(() => {
              return;
            }),
          ),
          S = {
            info: Ge("Installation.info")(function* () {
              return { version: VL, latest: yield* S.latest() };
            }),
            method: Ge("Installation.method")(function* () {
              if (process.execPath.includes($Zi.join(".opencode", "bin"))) return "curl";
              if (process.execPath.includes($Zi.join(".local", "bin"))) return "curl";
              let T = process.execPath.toLowerCase(),
                C = [
                  { name: "npm", command: () => s(["npm", "list", "-g", "--depth=0"]) },
                  { name: "yarn", command: () => s(["yarn", "global", "list"]) },
                  { name: "pnpm", command: () => s(["pnpm", "list", "-g", "--depth=0"]) },
                  { name: "bun", command: () => s(["bun", "pm", "ls", "-g"]) },
                  { name: "brew", command: () => s(["brew", "list", "--formula", "opencode"]) },
                  { name: "scoop", command: () => s(["scoop", "list", "opencode"]) },
                  { name: "choco", command: () => s(["choco", "list", "--limit-output", "opencode"]) },
                ];
              C.sort((O, B) => {
                let V = T.includes(O.name),
                  q = T.includes(B.name);
                if (V && !q) return -1;
                if (!V && q) return 1;
                return 0;
              });
              for (let O of C) {
                let B = yield* O.command(),
                  V =
                    O.name === "brew" || O.name === "choco" || O.name === "scoop"
                      ? "opencode"
                      : "opencode-ai";
                if (B.includes(V)) return O.name;
              }
              return "unknown";
            }),
            latest: Ge("Installation.latest")(function* (T) {
              let C = T || (yield* S.method());
              if (C === "brew" && !(yield* H()).includes("/")) return VL;
              return yield* ft(function* () {
                let O = yield* L();
                if (!QtH(VL, O)) return VL;
                if (C === "choco" && !(yield* I(O))) return VL;
                return O;
              }).pipe(vW("10 seconds"));
            }, on),
            upgrade: Ge("Installation.upgrade")(function* (T, C) {
              if (IR.default.valid(C) && IR.default.major(C) >= 2)
                return yield* new N7({
                  stderr: `OpenCode ${C} is OpenCode 2. Upgrade with \`opencode upgrade --major\` or see ${gZi}`,
                });
              let O;
              switch (T) {
                case "curl":
                  O = yield* d(C);
                  break;
                case "npm":
                  O = yield* a(["npm", "install", "-g", `opencode-ai@${C}`]);
                  break;
                case "pnpm":
                  O = yield* a(["pnpm", "install", "-g", `opencode-ai@${C}`]);
                  break;
                case "bun":
                  O = yield* a(["bun", "install", "-g", `opencode-ai@${C}`]);
                  break;
                case "yarn":
                  O = yield* a(["yarn", "global", "add", `opencode-ai@${C}`]);
                  break;
                case "brew": {
                  let B = yield* H(),
                    V = { HOMEBREW_NO_AUTO_UPDATE: "1" };
                  if (!B.includes("/"))
                    return yield* new N7({
                      stderr: `Homebrew Core's opencode formula is OpenCode 2, so Homebrew can't install OpenCode ${C}. Upgrade with \`opencode upgrade --major\`, or reinstall from anomalyco/tap/opencode to stay on OpenCode 1.`,
                    });
                  let q = yield* a(["brew", "tap", "anomalyco/tap"], { env: V });
                  if (q.code !== 0) {
                    O = q;
                    break;
                  }
                  let se = (yield* s(["brew", "--repo", "anomalyco/tap"])).trim();
                  if (se) {
                    let z = yield* a(["git", "pull", "--ff-only"], { cwd: se, env: V });
                    if (z.code !== 0) {
                      O = z;
                      break;
                    }
                  }
                  let ae = yield* D(B);
                  if (!ae || IR.default.major(ae) !== IR.default.major(C) || IR.default.lt(ae, C))
                    return yield* new N7({
                      stderr: `Homebrew can't install OpenCode ${C} yet: ${B} is at ${ae ?? "an unknown version"}. Try again in a few minutes.`,
                    });
                  O = yield* a(["brew", "upgrade", B], { env: V });
                  break;
                }
                case "choco":
                  O = yield* a(["choco", "upgrade", "opencode", `--version=${C}`, "-y"]);
                  break;
                case "scoop":
                  O = yield* a(["scoop", "install", `opencode@${C}`]);
                  break;
                default:
                  return yield* new N7({ stderr: `Unknown installation method: ${T}` });
              }
              if (!O || O.code !== 0) return yield* new N7({ stderr: u(T, O) });
              (yield* fH("upgraded", { method: T, target: C, stdout: O.stdout, stderr: O.stderr }),
                yield* s([process.execPath, "--version"]));
            }),
            upgradeMajor: Ge("Installation.upgradeMajor")(function* (T) {
              let C = yield* _(T);
              if (C.code !== 0) return yield* new N7({ stderr: u(T, C) });
              yield* fH("upgraded major", { method: T, stdout: C.stdout, stderr: C.stderr });
            }),
          };
        return d$e.of(S);
      }),
    )),
    (mCr = Ll({ service: d$e, layer: nrH, deps: [Q0, IY] })),
    ({ runPromise: RbA } = I0t(d$e, n0r(mCr))));
});