
var Kv = ne(async () => {
  OH();
  E1n();
  Gt();
  nY();
  jA();
  BA();
  yht();
  tsr();
  rsr();
  Mht();
  asr();
  Hsr();
  csr();
  Asr();
  Dht();
  Tht();
  fsr();
  psr();
  kht();
  await Jn([Kv(), um(), qd(), oxe(), xht(), CWe()]);
  Oht = class Oht extends (
    Pa("Config.Info")({
      $schema: be(re).annotate({ description: "JSON schema reference for configuration validation" }),
      shell: re
        .pipe(be)
        .annotate({ description: "Default shell to use for terminal and shell tool execution" }),
      model: re
        .pipe(be)
        .annotate({ description: "Default model to use when no session or agent model is selected" }),
      default_agent: re
        .pipe(be)
        .annotate({ description: "Default primary agent to use when no session agent is selected" }),
      autoupdate: Io([Vi, ri("notify")])
        .pipe(be)
        .annotate({ description: "Automatically update or notify when a new version is available" }),
      share: Jo(["manual", "auto", "disabled"])
        .pipe(be)
        .annotate({
          description: "Control whether sessions may be shared manually, automatically, or not at all",
        }),
      enterprise: nt({ url: re.pipe(be) })
        .pipe(be)
        .annotate({ description: "Enterprise sharing service configuration" }),
      username: re
        .pipe(be)
        .annotate({ description: "Username displayed in conversations and used for telemetry identity" }),
      permissions: i3e
        .pipe(be)
        .annotate({ description: "Ordered tool permission rules applied to agent tool use" }),
      agents: ks(re, Zir)
        .pipe(be)
        .annotate({ description: "Named built-in agent overrides and custom agent definitions" }),
      snapshots: Vi.pipe(be).annotate({ description: "Enable snapshots used for undo and revert behavior" }),
      watcher: K1n.pipe(be).annotate({ description: "Filesystem watcher configuration" }),
      formatter: KYs.pipe(be).annotate({
        description: "Enable built-in formatters or configure formatter overrides",
      }),
      lsp: YYs.pipe(be).annotate({
        description: "Enable built-in language servers or configure server overrides",
      }),
      attachments: S1n.pipe(be).annotate({ description: "Attachment processing configuration" }),
      tool_output: X1n.pipe(be).annotate({ description: "Tool output truncation thresholds" }),
      mcp: B1n.pipe(be).annotate({ description: "MCP server configuration" }),
      compaction: b1n.pipe(be).annotate({ description: "Conversation compaction behavior" }),
      skills: re.pipe(On, be).annotate({ description: "Additional paths or URLs to discover skills from" }),
      commands: ks(re, nsr).pipe(be).annotate({ description: "Named slash command definitions" }),
      instructions: re
        .pipe(On, be)
        .annotate({ description: "Additional paths or URLs supplying ambient instructions" }),
      references: usr
        .pipe(be)
        .annotate({
          description: "Named local directories or Git repositories available as external context",
        }),
      plugins: tZs.pipe(be).annotate({ description: "Ordered external plugin packages to load" }),
      experimental: P1n.pipe(be),
      providers: ks(re, M1n).pipe(be),
    })
  ) {};
  bsr = class bsr extends Pa("Config.Document")({ type: ri("document"), path: re.pipe(be), info: Oht }) {};
  IMn = class IMn extends Pa("Config.Directory")({ type: ri("directory"), path: bo }) {};
  ZM = class ZM extends _i()("@opencode/v2/Config") {};
  ((DMn = Es(
    ZM,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* M1,
        r = yield* bm,
        s = yield* sxe,
        a = ["opencode.json", "opencode.jsonc"],
        H = { errors: "all", onExcessProperty: "ignore", propertyOrder: "original" },
        u = kv(Oht, H),
        f = kv(Qde, H),
        d = ni(function* (V) {
          let q = yield* e.readFileStringSafe(V);
          if (!q) return;
          let Z = [],
            se = g1n(q, Z, { allowTrailingComma: !0 });
          if (Z.length) return;
          let ae = OL(UZs(se) ? f(se).pipe(YF(NZs), f2e(u)) : u(se));
          if (!ae) return;
          return new bsr({ type: "document", path: V, info: ae });
        }),
        _ = ni(function* (V) {
          return [
            ...(yield* ja(a, (q) => d(OWe.join(V, q))).pipe(Vn((q) => q.filter((Z) => Z !== void 0)))),
            new IMn({ type: "directory", path: V }),
          ];
        }),
        L = bo.make(t.config),
        D =
          OWe.resolve(r.directory) === OWe.resolve(t.config)
            ? []
            : yield* e
                .up({
                  targets: [".opencode", ...a.toReversed()],
                  start: r.directory,
                  stop: r.project.directory,
                })
                .pipe(on),
        S = [
          L,
          ...D.filter((V) => OWe.basename(V) === ".opencode")
            .toReversed()
            .map((V) => bo.make(V)),
        ],
        T = D.filter((V) => OWe.basename(V) !== ".opencode").toReversed(),
        C = yield* ja(T, d).pipe(
          on,
          Vn((V) => V.filter((q) => q !== void 0)),
        ),
        O = yield* ja(S, _).pipe(on),
        B = [...(O[0] ?? []), ...C, ...O.slice(1).flat()];
      return (
        yield* s.load(
          B.filter((V) => V.type === "document")
            .toReversed()
            .flatMap((V) => V.info.experimental?.policies ?? []),
        ),
        ZM.of({
          entries: Ge("Config.entries")(function* () {
            return B;
          }),
        })
      );
    }),
  )),
    (Nht = DMn.pipe(Jm(n1n))),
    (PY = Ua({ service: ZM, layer: DMn, deps: [ui.node, lw, KS, Nir] })));
});
import { dirname as XZs } from "path";